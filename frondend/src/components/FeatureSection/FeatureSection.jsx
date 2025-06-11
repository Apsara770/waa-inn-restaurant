import React from "react";
import "./FeatureSection.css";
import { FaShippingFast, FaFire, FaUtensils, FaUserTie } from "react-icons/fa"; // icon names

const FeatureSection = () => {
  return (
    <section className="features">
      <div className="feature">
        <FaShippingFast className="icon" />
        <h3>Fast Delivery</h3>
        <h6>Get your order quickly with our reliable and efficient service</h6>
      </div>
      <div className="feature">
        <FaFire className="icon" />
        <h3>Hot Foods</h3>
        <h6>Savor freshly prepared, steaming hot meals delivered straight to you</h6>
      </div>
      <div className="feature">
        <FaUtensils className="icon" /> 
        <h3>Delicious Meals</h3>
        <h6>We serve meals made from the freshest and finest ingredients daily</h6>
      </div>
      <div className="feature">
        <FaUserTie className="icon" />
        <h3>Expert Chefs</h3>
        <h6>Our skilled chefs craft every dish with passion and precision</h6>
      </div>
      
    </section>
  );
};

export default FeatureSection;
