import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import { StoreContext } from '../../contexts/storeContext';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { BsBagCheck } from 'react-icons/bs';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
      <img src={logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <li><Link to="/" className={currentPath === "/" ? "active" : ""}>Home</Link></li>
        <li><Link to="/menu" className={currentPath === "/menu" ? "active" : ""}>Menu</Link></li>
        <li><Link to="/about" className={currentPath === "/about" ? "active" : ""}>About Us</Link></li>
        <li><Link to="/contacts" className={currentPath === "/contacts" ? "active" : ""}>Contact Us</Link></li>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search-icon">
          <Link to="/cart" className="icon-link">
            <FiShoppingCart className="react-icon" />
            {getTotalCartAmount() !== 0 && <div className="dot"></div>}
          </Link>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Login</button>
        ) : (
          <div className="navbar-profile">
            <FaUserCircle className="react-icon profile-icon" />
            <ul className="nav-profile-dropdown">
              <li>
                <Link to="/myorders" className="dropdown-link">
                  <BsBagCheck className="react-icon" />
                  <p>Orders</p>
                </Link>
              </li>
           
              <li onClick={handleLogout} className="dropdown-link">
                <FiLogOut className="react-icon" />
                <p>Log Out</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
