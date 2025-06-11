import express from "express";
import {
  addReview,
  getReviewsByFood,
  getAllReviews,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Customer Side (no auth)
router.post("/add", addReview);
router.get("/food/:foodId", getReviewsByFood); 

// Admin Side
router.get("/", getAllReviews);
router.delete("/:id", deleteReview);

export default router;
