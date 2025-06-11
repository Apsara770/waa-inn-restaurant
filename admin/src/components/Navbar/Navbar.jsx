import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets.js';
import { useNavigate } from 'react-router-dom';
import {  FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // or sessionStorage if used
    window.location.href = 'http://localhost:5173';
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="navbar">
      <img className="logo" src={assets.logo} alt="Logo" />
      <span className="admin-text">Welcome Back, Master of Meals!</span>

      <div className="navbar-right" ref={dropdownRef}>
        <img
          className="profile"
          src={assets.profile_image}
          alt="Profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />

        {dropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
                <FiLogOut className="react-icon" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
