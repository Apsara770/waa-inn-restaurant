import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food item
export const addFood = async (req, res) => {
  try {
    console.log("File Info:", req.file);
    console.log("Body:", req.body);

    const { name, description, price, category } = req.body;

    // Check for required fields
    if (!name || !description || !price || !category ) {
      return res.status(400).json({ success: false, message: "All fields are required!" });
    }

    // Check for image file
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image file is missing!" });
    }

    // Optionally, check for file type (e.g., images only)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ success: false, message: "Invalid image type. Only JPEG, PNG, and GIF are allowed." });
    }

    // Format image path
    const image = `/uploads/${req.file.filename}`;

    // Create new food item
    const newFood = new foodModel({
      name,
      description,
      price,
      category,
      image,
     
    });
    // Save food item to database
    await newFood.save();

    // Send response with success: true
    res.status(201).json({ success: true, message: "Food item added", food: newFood });

  } catch (error) {
    console.error("Server Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// List all food items
export const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("Error fetching food list:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Updated: Remove food item using ID from req.body
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body; //  Get ID from request body

    if (!id) {
      return res.status(400).json({ success: false, message: "Food ID is required" });
    }

    const food = await foodModel.findById(id); //  Find by ID from body

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    const imagePath = `.${food.image}`; // Example: ./uploads/filename.jpg

    // Delete image file from server
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.warn("Could not delete image file:", err.message);
      }
    });

    // Remove food from database
    await foodModel.findByIdAndDelete(id); //  Use the same ID

    res.json({ success: true, message: "Food removed successfully" });

  } catch (error) {
    console.log("Remove Error:", error.message);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
