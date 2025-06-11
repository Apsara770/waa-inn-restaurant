import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data.reverse()); // Latest first
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      toast.error("An error occurred while fetching orders");
    }
  };

  // Change order status
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(`${url}/api/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders(); // Refresh list
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // Generate Invoice and Send Email
  const generateInvoiceHandler = async (orderId) => {
    try {
      const response = await axios.post(`${url}/api/invoice/generate`, { orderId });
      if (response.data.success) {
        toast.success("Invoice sent to customer!");
      } else {
        toast.error("Invoice generation failed!");
      }
    } catch (error) {
      console.error("Invoice Error:", error);
      toast.error("An error occurred while sending invoice");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-list">
      {orders.map((order, index) => (
        <div key={index} className="order-item">

          {/* Icon */}
          <div className="order-col">
            <img src={assets.parcel_icon} alt="Parcel Icon" className="order-icon" />
          </div>

          {/* Food Items */}
          <div className="order-col order-item-food">
            {order.items.map((item, idx) => (
              <span key={idx}>
                {item.name} x {item.quantity}
                {idx < order.items.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>

          {/* Customer Name */}
          <div className="order-col">
            {order.address.firstname} {order.address.lastname}
          </div>

          {/* Address */}
          <div className="order-col">
            {order.address.address}, {order.address.city}
          </div>

          {/* Phone */}
          <div className="order-col">
            {order.address.phone}
          </div>

          {/* Total Items */}
          <div className="order-col">
            {order.items.length}
          </div>

          {/* Total Amount */}
          <div className="order-col">
            LKR {order.amount}.00
          </div>

          {/* Status Dropdown */}
          <div className="order-col">
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="order-status-dropdown"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          {/* Generate Invoice Button */}
          <div className="order-col">
            <button
              className="invoice-button"
              onClick={() => generateInvoiceHandler(order._id)}
            >
             Send Invoice
            </button>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Orders;
