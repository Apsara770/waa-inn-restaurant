import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../contexts/storeContext';
import axios from 'axios';
import { assets } from '../../assets/assets.js'; // import images from assets folder

const MyOrders = () => {
  const { url, token, userId } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        { userId },
        { headers: { token } }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchOrders();
    }
  }, [token, userId]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            
            <p>
             {/* order.items is the array name */}
             {order.items.map((item, i) => (
            `${item.name} x ${item.quantity}${i !== order.items.length - 1 ? ', ' : ''}`
             ))}
            </p>

            <p>LKR.{order.amount}.00</p> {/* for display order amount */}
            <p>Items:{order.items.length}</p> 
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>  {/* for display order status , '&#x25cf;' for bullet point*/}
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
