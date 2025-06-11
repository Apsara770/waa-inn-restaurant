import React, { useState } from 'react';
import './Contacts.css';
import contactImage from "../../assets/conI.jpg";
import Location from '../../components/Location/Location';
import axios from "axios";

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSend = async () => {
    try {
      await axios.post("http://localhost:4000/api/contact", formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
     
    }
  };

  return (
    <div className='contact-container'>
      <div className="contact-content">
        <div className="contact-form">
          <h2 className="contact-title">Get <span>in</span> Touch</h2>
          <p className="contact-text">
            Send us a message, and we'll get back to you as soon as possible.
          </p>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="input-field"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input-field"
            value={formData.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Write your message here"
            className="input-textarea"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          <button className="send-btn" onClick={handleSend}>Send Message</button>
          {status && <p className="status-message">{status}</p>}
        </div>

        <div className="contact-details">
          <h3>Contact <span>Details</span></h3>
          <p>We're here to help! Reach out to us anytime through the following contact methods, and we'll be happy to assist you.</p>
          <p><strong>Location:</strong> Waa Inn Family Restaurant - Makandura, Gonawila</p>
          <p><strong>Email:</strong> waainnfam@gmail.com</p>
          <p><strong>Phone:</strong> +94 76 6327039</p> <br />
          <div className="contact-image">
            <img src={contactImage} alt="Contact Us" />
          </div>
        </div>
      </div>
    
      <div><Location /></div>
    </div>
  );
};

export default Contacts;
