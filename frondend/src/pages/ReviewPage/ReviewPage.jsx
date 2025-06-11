import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "./ReviewPage.css";

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { foodId: paramFoodId } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState({ name: "", image: "", id: "" });
  const [foodId, setFoodId] = useState(paramFoodId);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const foodData = location.state || {};
    const id = foodData.foodId || paramFoodId;
    setFoodId(id);

    if (!foodData.name || !foodData.image) {
      axios
        .get(`http://localhost:4000/api/menu/${id}`)
        .then((res) => {
          const { name, image } = res.data.food;
          setFood({ name, image, id });
        })
        .catch((err) => {
          console.error("Failed to fetch food", err);
          toast.error("Unable to load food details.");
        });
    } else {
      setFood({ ...foodData, id });
    }

    // ✅ Fetch Reviews
    if (id) {
      axios
        .get(`http://localhost:4000/api/reviews/food/${id}`)
        .then((res) => {
          setReviews(res.data.reviews);
        })
        .catch((err) => {
          console.error("Error fetching reviews", err);
          toast.error("Unable to load reviews.");
        });
    }
  }, [location.state, paramFoodId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim()) return toast.error("Name is required.");
    if (!foodId) return toast.error("Food ID is missing.");
    if (rating === 0) return toast.error("Please select a rating.");
    if (!comment.trim()) return toast.error("Comment cannot be empty.");

    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/reviews/add", {
        foodId,
        rating,
        comment,
        userName,
      });

      toast.success("Review submitted successfully!");
      setRating(0);
      setComment("");
      setUserName("");

      // ✅ Reload reviews after submission
      const res = await axios.get(`http://localhost:4000/api/reviews/food/${foodId}`);
      setReviews(res.data.reviews);
    } catch (error) {
      console.log("Error submitting review", error);
      toast.error(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-page-container">
      {/* Back Button */}
      <div className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft className="back-icon" />
        <span>Back</span>
      </div>

      {/* Food Details */}
      <div className="food-details-re">
        {food.image && (
          <img
            src={`http://localhost:4000${food.image}`}
            alt={food.name}
            className="food-image"
          />
        )}
        <h2 className="food-name-r">{food.name}</h2>
      </div>

      {/* Wrapper for Form and Reviews */}
      <div className="review-content-wrapper">
        {/* Review Form (Left) */}
        <form className="review-form" onSubmit={handleSubmit}>
          <h3 className="form-heading">Write Your Review</h3>
          <input
            type="text"
            className="review-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
          />

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? "filled" : ""}`}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="review-input"
            rows="4"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>

          <button type="submit" className="review-submit-button" disabled={loading}>
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>

        {/* Reviews List (Right) */}
        <div className="review-list-section">
          <h3 className="review-list-heading">Customer Reviews</h3>
          {reviews.length === 0 ? (
            <p className="no-reviews-message">No reviews yet for this item.</p>
          ) : (
            <ul className="review-list">
              {reviews.map((review) => (
                <li key={review._id} className="review-card">
                  <strong>{review.userName}</strong>
                  <div className="review-rating">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <span key={i} className="star filled">★</span>
                    ))}
                  </div>
                  <p>{review.comment}</p>
                  <small>{new Date(review.createdAt).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
