import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { id: 1, title: 'Beranda', icon: '🏠', path: '/' },
    { id: 2, title: 'Pesanan', icon: '📋', path: '/orders' },
    { id: 3, title: 'Laporan', icon: '📊', path: '/reports' },
    { id: 4, title: 'Pengaturan', icon: '⚙️', path: '/settings' }
  ];

  return (
    <div className="bottom-nav">
      {navItems.map(item => (
        <Link 
          key={item.id} 
          to={item.path} 
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <div className="nav-icon">{item.icon}</div>
          <div className="nav-title">{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default BottomNav;