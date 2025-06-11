import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);

  // Fetch all users from backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:4000/api/user/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.users);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users.");
    }
  };

  // Handle user deletion
  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      // Update the delete endpoint to match the route in the backend
      const res = await axios.delete(`http://localhost:4000/api/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(res.data.message || "User deleted successfully");
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Error deleting user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-users-page">
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
         
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
            
                <td>
                  <p onClick={() => handleDelete(user._id)}> X</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Users;
