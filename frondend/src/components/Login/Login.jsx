import React, { useContext, useState } from 'react';
import './Login.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contexts/storeContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setShowLogin }) => {
  const { url, setToken, setUserId } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Login");

  // State to hold form data
  // Using an object to manage multiple fields
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  // Handler for input changes
  // This function updates the state based on input field changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (!data.email || !data.password || (currState === "Register" && !data.name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Email format validation
    // Using a regex to check if the email is valid
    // This regex checks for a basic email format
    // It ensures that the email contains characters before and after the '@' symbol, and a domain with a '.' in it
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (currState === "Register" && data.password.length < 6) {
      toast.error("Password should be at least 6 characters.");
      return;
    }

    // Admin login shortcut
    if (currState === "Login" && data.email === "admin@gmail.com" && data.password === "WaaInn123") {
      localStorage.setItem("isAdmin", "true");
      toast.success("Admin Login Successful");
      window.location.href = "http://localhost:5174/dashboard";
      return;
    }

    // API request
    const endpoint = currState === "Login" ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);
      const resData = response.data;

      if (resData.success) {
        if (currState === "Login") {
          setToken(resData.token);
          setUserId(resData.userId);
          localStorage.setItem("token", resData.token);
          localStorage.setItem("userId", resData.userId);
          toast.success("Login Successful");
          setShowLogin(false);
        } else {
          toast.success("Registration Successful. Please login to continue.");
          setCurrState("Login");
          setData({ name: "", email: "", password: "" });
        }
      } else {
        toast.error(resData.message || `${currState} Failed`);
      }
    } catch (error) {
      console.error("Login/Register Error:", error.response || error.message || error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='login-p'>
      <form onSubmit={onLogin} className="login-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-inputs">
          {currState === "Register" && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text'
              placeholder='Enter Your Name'
              required
            />
          )}

          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type='email'
            placeholder='Enter Your Email'
            required
          />

          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type='password'
            placeholder='Enter a strong Password'
            required
          />
        </div>

        <button type='submit'>
          {currState === "Register" ? "Create Account" : "Login"}
        </button>

        <div className="login-condition">
          <input type='checkbox' required />
          <p>By logging in, you agree to our Terms & Conditions and Privacy Policy.</p>
        </div>

        {currState === "Login" ? (
          <p>Create a new account? <span onClick={() => setCurrState("Register")}>Register</span></p>
        ) : (
          <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login</span></p>
        )}
      </form>
    </div>
  );
};

export default Login;
