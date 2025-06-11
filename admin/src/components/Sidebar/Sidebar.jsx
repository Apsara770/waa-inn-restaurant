import React from 'react';
import './Sidebar.css';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  List,
  ClipboardList,
  MessageCircle,
  Star,
  Users,
 FileBarChart2 

} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">

        <NavLink to="/dashboard" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <LayoutDashboard className="sidebar-icon" />
          <p>Dashboard</p>
        </NavLink>

        <NavLink to="/add" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <PlusCircle className="sidebar-icon" />
          <p>Add Foods</p>
        </NavLink>

        <NavLink to="/list" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <List className="sidebar-icon" />
          <p>List Foods</p>
        </NavLink>

        <NavLink to="/orders" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <ClipboardList className="sidebar-icon" />
          <p>Orders</p>
        </NavLink>

        <NavLink to="/messages" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <MessageCircle className="sidebar-icon" />
          <p>Messages</p>
        </NavLink>

        <NavLink to="/reviews" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <Star className="sidebar-icon" />
          <p>Reviews</p>
        </NavLink>

        <NavLink to="/users" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          <Users className="sidebar-icon" />
          <p>Users</p>
        </NavLink>

          <NavLink to="/reports" className={({ isActive }) => `sidebar-option ${isActive ? 'active' : ''}`}>
          < FileBarChart2  className="sidebar-icon" />
          <p>Reports</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
