import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../contexts/storeContext.jsx';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const { cartItems, foodList, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/placeOrder');
  };

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-item-titles">
          <p>Image</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
     

        {!Array.isArray(foodList) ? (
          <p>Loading food list...</p>
        ) : (
          foodList.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id}>
                  <div className='cart-item-titles cart-item-item'>
                    <img src={`${url}${item.image}`} alt={item.name} />
                    <p>{item.name}</p>
                    <p>LKR. {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>LKR {item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>X</p>
                  </div>
                
                </div>
              );
            } else {
              return null;
            }
          })
        )}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>LKR.{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR.{getTotalCartAmount() === 0 ? 0 : 350}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 350}</b>
            </div>
          </div>
          <button onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
