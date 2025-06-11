import Review from "../models/reviewModel.js";
import Food from "../models/foodModel.js";  // Import Food model to fix populate error

// Add a new review
export const addReview = async (req, res) => {
  try {
    const { foodId, rating, comment, userName } = req.body;

    if (!foodId || !rating || !comment || !userName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newReview = new Review({
      foodId,
      userName,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({ message: "Review submitted successfully." });
  } catch (error) {
    console.error("Error in addReview:", error);
    res.status(500).json({ message: "Server error while submitting review." });
  }
};

// Get reviews for a specific food
export const getReviewsByFood = async (req, res) => {
  try {
    const { foodId } = req.params;
    const reviews = await Review.find({ foodId })
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error in getReviewsByFood:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get all reviews (for Admin)
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 })
      .populate({ path: "foodId", select: "name", strictPopulate: false });
    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error in getAllReviews:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete a review (Admin)
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    await Review.findByIdAndDelete(id);
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error in deleteReview:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
