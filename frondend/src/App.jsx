import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Contacts from "./pages/Contacts/Contacts";
import ReviewPage from "./pages/ReviewPage/ReviewPage";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import PlaceOrder from "./pages/placeOrder/placeOrder";
import Verify from "./pages/verify/verify";
import MyOrders from "./pages/MyOrders/MyOrders";

import { ToastContainer} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

 
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
  
      {showLogin && <Login setShowLogin={setShowLogin} />}
      <div className="app">
      <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} /> 
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/reviewpage/:id" element={<ReviewPage />} />
         <Route path="/verify" element={<Verify />} />
         <Route path="/myOrders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
