import mongoose from "mongoose";

// Food data schema
const foodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },

  },
  { timestamps: true } // Adds createdAt & updatedAt
);

const foodModel = mongoose.models.food || mongoose.model("Food", foodSchema); // Check if the model already exists to avoid recompilation

export default foodModel;
