import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Ensure email is unique
    password: { type: String, required: true }, // Store hashed password
    cartData: { type: Object, default: {} }, // Empty cart object by default
  },
  { minimize: false } // Prevent mongoose from removing empty objects
);

// Create and export the user model
const userModel = mongoose.model("User", userSchema);
export default userModel;
