import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Message from './pages/Messages/Message';
import Reviews from './pages/Reviews/Reviews';
import Users from './pages/Users/Users';
import Dashboard from './pages/Dashboard/Dashboard';
import Reports from './pages/Reports/Reports';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const url = "http://localhost:4000"; // Backend URL

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
            <Route path="/messages" element={<Message url={url} />} />
            <Route path="/reviews" element={<Reviews url={url} />} />
            <Route path="/users" element={<Users url={url} />} />
            <Route path="/dashboard" element={<Dashboard url={url} />} />
            <Route path="/reports" element={<Reports url={url} />} />
          
          </Routes>
        </div>
       
      </div>
      
    </div>
    
  );
};

export default App;
