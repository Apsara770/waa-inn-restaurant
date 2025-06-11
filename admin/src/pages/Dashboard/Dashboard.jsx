import React, { useEffect, useState } from "react";
import "./dashboard.css";

// React Icons
import { FaUsers, FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDashboardData(data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error);
      });
  }, []);

  if (!dashboardData) {
    return <div className="loading">Loading Dashboard...</div>;
  }

  const { totalUsers, totalOrders, totalIncome, recentOrders, recentUsers } = dashboardData;

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card card-users">
          <FaUsers className="card-icon" />
          <h2>Total Users</h2>
          <p>{totalUsers}</p>
        </div>
        <div className="card card-orders">
          <FaShoppingCart className="card-icon" />
          <h2>Total Orders</h2>
          <p>{totalOrders}</p>
        </div>
        <div className="card card-income">
          <FaMoneyBillWave className="card-icon" />
          <h2>Total Income</h2>
          <p>Rs. {totalIncome.toFixed(2)}</p>
        </div>
      </div>

      {/* Tables */}
      <div className="tables">
        {/* Recent Orders */}
        <div className="table-container">
          <h2>Recent Orders & Payments</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(0, 8)}...</td>
                  <td>{order.address.firstname}</td>
                  <td>{order.amount}.00</td>
                  <td>{order.status}</td>
                  <td>{order.address.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent Users */}
        <div className="table-container">
          <h2>Recent Users</h2>
          <table>
            <thead>
              <tr>
                <th>User ID</th>
                <th>User Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user._id.slice(0, 8)}...</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
