import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Reviews.css";
import { toast } from "react-toastify";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/reviews/");
      setReviews(res.data.reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:4000/api/reviews/${id}`);
        toast.success("Review deleted successfully");
        fetchReviews(); // Refresh list
      } catch (error) {
        console.error("Error deleting review:", error);
        toast.error("Failed to delete review.");
      }
    }
  };

  return (
    <div className="admin-review-container">
    
      <table className="review-table">
        <thead>
          <tr>
            <th>Food</th>
            <th>User Name</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.foodId?.name || "Food Deleted"}</td>
                <td>{review.userName}</td>
                <td>{review.rating}</td>
                <td>{review.comment}</td>
                <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                <td>
                  <p
                    className="delete-button"
                    onClick={() => handleDelete(review._id)} >
                   X
                  </p>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;
