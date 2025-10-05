import React from 'react';

const Header = () => {
  return (
    <div className="header">
      <div className="app-title">Beranda</div>
      
      <div className="store-info">
        <div className="store-name">MM Laundry Pecenongan</div>
        <div className="store-address">
          JL Batu Tulis I No 6 (Sebrang Hotel Red...)
        </div>
        <div className="store-phone">081287354011</div>
        <button className="change-outlet-btn">Ganti Outlet &gt;</button>
      </div>
    </div>
  );
};

export default Header;