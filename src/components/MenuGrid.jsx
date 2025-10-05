import React from 'react';
import { Link } from 'react-router-dom';

const MenuGrid = () => {
  const menuItems = [
    { id: 1, title: 'Buat Pesanan', icon: '📝', path: '/add-order' },
    { id: 2, title: 'Pelanggan', icon: '👥', path: '/customers' },
    { id: 3, title: 'Layanan', icon: '🧺', path: '/services' },
    { id: 4, title: 'Pengeluaran', icon: '💸', path: '/expenses' },
    { id: 5, title: 'Scan Kode QR', icon: '📱', path: '/scan-qr' },
    { id: 6, title: 'Metode Pembayaran', icon: '💳', path: '/payment-methods' }
  ];

  return (
    <div className="menu-grid">
      {menuItems.map(item => (
        <Link key={item.id} to={item.path} className="menu-item">
          <div className="menu-icon">{item.icon}</div>
          <div className="menu-title">{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default MenuGrid;