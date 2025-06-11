import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

export const getDashboardData = async (req, res) => {
  try {
    // Total Users & Orders
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();

    // ✅ Total Income from paid (online payment) orders
    const paidOrders = await Order.find({ payment: true });
    const totalIncome = paidOrders.reduce((acc, order) => acc + (order.amount || 0), 0);

    // ✅ Get 5 most recent orders (sorted by 'Date' field from schema)
    const recentOrders = await Order.find().sort({ Date: -1 }).limit(5);

    // ✅ Get 5 most recent users (assuming createdAt exists in user schema)
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);

    // ✅ Send JSON response
    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalIncome,
        recentOrders,
        recentUsers,
      },
    });
  } catch (err) {
    console.error("Dashboard Data Error:", err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
