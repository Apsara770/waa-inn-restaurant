import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Stripe Initialization

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,       // Gmail
    pass: process.env.EMAIL_PASS        //  App Password (not  Gmail password)
  }
});

// Place Order Controller
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const backend_url = "http://localhost:4000";

  try {
    const { userId, items, amount, address } = req.body;

    // Validate request
    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields.",
      });
    }

    // Save order to DB
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });
    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    // Create Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: {
          name: item.name,
          images: [`${backend_url}${item.image}`], // Add full URL for Stripe
        },
        unit_amount: Math.round(item.price * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Add delivery charges
    line_items.push({
      price_data: {
        currency: "lkr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 35000,
      },
      quantity: 1,
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error(" Order Placement Failed:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred while placing the order.",
    });
  }
};

//  Verify Order (After Stripe Payment)
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      const updatedOrder = await orderModel.findByIdAndUpdate(
        orderId,
        { payment: true },
        { new: true }
      );

      //  Send order confirmation email
      const user = await userModel.findById(updatedOrder.userId);
      if (user?.email) {
        const itemList = updatedOrder.items
          .map(
            (item) =>
              `- ${item.name} (x${item.quantity}) = Rs. ${item.price * item.quantity}`
          )
          .join("\n");

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Waa Inn - Order Confirmation",
          text: `
Hello ${user.name},

Your order has been confirmed!

 Order ID: ${updatedOrder._id}
 Items:
${itemList}

 Delivery Address:
${updatedOrder.address.address}

Total Amount: Rs. ${updatedOrder.amount}.00

Thank you for ordering from Waa Inn Family Restaurant!
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(" Order confirmation email sent to:", user.email);
      }

      res.json({
        success: true,
        message: "Payment verified and order confirmed. Email sent.",
      });
    } else {
      await orderModel.findByIdAndDelete(orderId); // Remove unpaid order
      res.json({ success: false, message: "Payment failed. Order cancelled." });
    }
  } catch (error) {
    console.error(" Order Verification Failed:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error during verification.",
    });
  }
};

//  Get User's Orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(" Fetching Orders Failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error fetching user orders." });
  }
};

//  Get All Orders (For Admin)
const listorders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(" Admin Order Fetch Failed:", error.message);
    res.json({ success: false, message: "Error" });
  }
};

//  Update Order Status (Admin Panel)
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status updated." });
  } catch (error) {
    console.log("Status Update Failed:", error.message);
    res.json({ success: false, message: "Error" });
  }
};

export {
  placeOrder,
  verifyOrder,
  userOrders,
  listorders,
  updateStatus,
};
