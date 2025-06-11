import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../../contexts/storeContext';
import { FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const FoodItem = ({ id, name, description, price, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const quantity = cartItems[id] || 0;

  const handleReviewClick = () => {
    navigate(`/reviewpage/${id}`, {
      state: {
        foodId: id,
        name,
        image,
      },
    });
  };

  return (
    <div className="food-item">
      <div className="food-image-container">
        <img src={`http://localhost:4000${image}`} alt={name} />
        <FaRegCommentDots
          className="review-icon"
          onClick={handleReviewClick}
          title="Leave a review"
        />
      </div>
      <div className="food-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="food-price">Rs. {price.toFixed(2)}</div>
        <div className="cart-controls">
          <button onClick={() => removeFromCart(id)} disabled={quantity === 0}>-</button>
          <span>{quantity}</span>
          <button onClick={() => addToCart(id)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
