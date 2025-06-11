import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import { FaShippingFast, FaFire, FaUtensils, FaUserTie } from "react-icons/fa"; // icon names


const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      <section className="intro">
        <h1>About Waa Inn Family Restaurant</h1>
        <p>
          Waa Inn Family Restaurant, established in 2024, offers an unforgettable dining experience with a variety of mouth-watering dishes made from the freshest ingredients. We strive to bring families together with our exceptional food and friendly atmosphere.
        </p>
      </section>

      <section className="mission">
        <h1>Our Mission</h1>
        <p>Our mission is to provide high-quality, delicious meals at affordable prices, ensuring every customer leaves with a smile.</p>
      </section>

      <section className="values">
        <h1>Our Values</h1>
        <ul>
          <li><strong>Quality:</strong> Only the best ingredients for the finest dishes.</li>
          <li><strong>Customer Satisfaction:</strong> Delivering exceptional experiences.</li>
          <li><strong>Community:</strong> Supporting local suppliers and farmers.</li>
        </ul>
      </section>

      <section className="team">
        <h1>Meet the Team</h1>
        <p>Our team of chefs and staff work tirelessly to bring you the best culinary experience. Led by Chef Sandaru, our kitchen ensures every dish is made with love and perfection.</p>
      </section>

      {/*  CTA Section */}
      <section className="cta">
        <div className="cta-title">
          <h2>Why Choose Waa Inn?</h2>
          <p>Experience the best with our handpicked values that define our service!</p>
        </div>

      
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
      
      </section>
    </div>
  );
};

export default About;
