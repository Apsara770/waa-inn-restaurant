import React from 'react';
import { useNavigate } from 'react-router-dom'; // import useNavigate
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); // initialize useNavigate

  const handleViewMenu = () => {
    navigate('/menu'); // navigate to Menu.jsx page
  };

  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order Your <span> Favorite Meals </span> Online!</h2>
        <p>
          Welcome to Waa Inn Family Restaurant! Enjoy a seamless online food ordering experience
          with fast delivery, secure payments, and a delicious menu crafted just for you.
          Whether you're dining at home or on the go, we've got your cravings covered.
          Order now and savor the taste of convenience!
        </p>

        {/* navigate to Menu.jsx page */}
        <button onClick={handleViewMenu} className='viewMenu'>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
