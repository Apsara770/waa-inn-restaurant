import userModel from "../models/userModel.js";

//  Add to cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id; //  From authMiddleware
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId); //  Find user by ID
    //  Check if user exists

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {}; //  Initialize cartData if it doesn't exist

    if (!cartData[itemId]) {
      cartData[itemId] = 1; //  If item doesn't exist in cart, add it with quantity 1
    } else {
      cartData[itemId] += 1;  //  If item exists, increment the quantity
    }

    await userModel.findByIdAndUpdate(userId, { cartData });  //  Update the user's cart in the database
    //  Send response back to the client

    res.json({ message: "Item added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//  Remove from cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.body.itemId;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId]; // optional: remove item completely if quantity is 0
      }
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Item removed from cart", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get cart
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const userData = await userModel.findById(userId);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {}; // Get cart data from user

    res.json({ message: "Cart data fetched", cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { addToCart, removeFromCart, getCart }; //  Export functions for use in routes
