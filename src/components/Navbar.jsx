import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="navbar-brand">
          <Link to="/">Laundry App</Link>
        </div>
      </div>
      <div className="navbar-menu">
        <Link to="/" className="navbar-item">Dashboard</Link>
        <Link to="/orders" className="navbar-item">Orders</Link>
        <Link to="/reports" className="navbar-item">Reports</Link>
      </div>
    </nav>
  );
};

export default Navbar;