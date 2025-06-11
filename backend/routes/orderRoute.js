import express from 'express';
import authMiddleware from '../middleware/auth.js';
import {
  listorders,
  placeOrder,
  updateStatus,
  userOrders,
  verifyOrder,
} from '../controllers/orderController.js';

const orderRouter = express.Router();

//  Place a new order (requires authentication)
orderRouter.post("/place", authMiddleware, placeOrder);

//  Verify payment after Stripe checkout (no auth needed)
orderRouter.post("/verify", verifyOrder);

//  Get orders of a specific user (requires authentication)
orderRouter.post("/userOrders", authMiddleware, userOrders);

//  Get all orders for admin panel (can later secure with admin auth)
orderRouter.get("/list", listorders);

// Update order status (e.g., to 'Delivered', 'Cancelled', etc.)
orderRouter.post("/status", updateStatus);

export default orderRouter;
