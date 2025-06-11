import React, { useContext, useEffect, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../contexts/storeContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, foodList, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    address: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    const orderItems = foodList
      .filter(item => cartItems[item._id] > 0)
      .map(item => ({
        ...item,
        quantity: cartItems[item._id]
      }));

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID not found. Redirecting to login.");
      navigate('/login');
      return;
    }

    const totalAmount = getTotalCartAmount() + 350;

    const orderData = {
      userId,
      address: data,
      items: orderItems,
      amount: totalAmount,
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Failed to start Stripe checkout session.");
      }
    } catch (err) {
      console.error("Order Error:", err);
      alert("An internal server error occurred.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart');
    }
  }, [token, getTotalCartAmount, navigate]);

  return (
    <form onSubmit={placeOrder} className="placeorder">
      <div className="placeorder-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fields">
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            required
            value={data.firstname}
            onChange={onChangeHandler}
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            required
            value={data.lastname}
            onChange={onChangeHandler}
          />
        </div>

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          required
          value={data.email}
          onChange={onChangeHandler}
        />

        <select name="city" value={data.city} onChange={onChangeHandler} required>
          <option value="">Select City</option>
          <option value="Makandura">Makandura</option>
          <option value="Pannala">Pannala</option>
          <option value="Giriulla">Giriulla</option>
          <option value="Badalgama">Badalgama</option>
          <option value="Sandalankawa">Sandalankawa</option>
          <option value="Dankotuwa">Dankotuwa</option>
          <option value="Daraluwa">Daraluwa</option>
        </select>

        <textarea
          name="address"
          rows="4"
          required
          placeholder="Delivery Address"
          value={data.address}
          onChange={onChangeHandler}
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          required
          value={data.phone}
          onChange={onChangeHandler}
        />
      </div>

      <div className="placeorder-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>LKR. {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR. {getTotalCartAmount() === 0 ? 0 : 350}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR. {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 350}</b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
