import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button className="close-sidebar" onClick={toggleSidebar}>
            ×
          </button>
        </div>
        <ul>
          <li>
            <Link to="/" className="sidebar-item" onClick={toggleSidebar}>
              <span>📊</span> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/orders" className="sidebar-item" onClick={toggleSidebar}>
              <span>📋</span> Orders
            </Link>
          </li>
          <li>
            <Link to="/add-order" className="sidebar-item" onClick={toggleSidebar}>
              <span>➕</span> Add Order
            </Link>
          </li>
          <li>
            <Link to="/reports" className="sidebar-item" onClick={toggleSidebar}>
              <span>📈</span> Reports
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;