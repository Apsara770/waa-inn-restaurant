// Import mongoose (no need for "trusted" which is not a valid export)
import mongoose from 'mongoose';

// Define the schema for orders
const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },           // ID of the user who placed the order
  items: { type: Array, required: true },             // Array of ordered items
  amount: { type: Number, required: true },           // Total amount of the order
  address: { type: Object, required: true },          // Delivery address object
  status: { type: String, default: "food processing" }, // Order status
  date: { type: Date, default: Date.now },            // Order date (default to now)
  payment: { type: Boolean, default: false }          // Payment status
});

// Register model only if not already registered to avoid overwrite errors in development
const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default orderModel;
