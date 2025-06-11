import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">About Us</h4>
          <p className="footer-text">
            Waa Inn Family Restaurant offers delicious meals with the best quality ingredients.
            Experience the taste of excellence!
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <p className="footer-text">📧 waainnfam@gmail.com</p>
          <p className="footer-text">📞 076 632 70 39</p>
          <p className="footer-text">📍 Makandura, Sri Lanka</p>
        </div>

        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="social-icons">
            <a href="#" className="social-link">🌐 Facebook</a>
            <a href="#" className="social-link">📸 Instagram</a>
            <a href="#" className="social-link">🐦 Twitter</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Waa Inn Family Restaurant. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
