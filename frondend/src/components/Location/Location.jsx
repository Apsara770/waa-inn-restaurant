import React from 'react';
import './Location.css';

const Location = () => {
  return (
    <div className='L-header'>
      <h5>Find Us</h5>
      <div className='Location'>
        <iframe
          title="Google Map of Kapthurupaya Restaurant"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.266590259253!2d79.9807025735108!3d7.323923913347719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2e761ae6b8c5d%3A0xc82c3bd1bf6ffff4!2sKapthurupaya%20Restaurant!5e0!3m2!1sen!2slk!4v1744339794380!5m2!1sen!2slk"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Location;
