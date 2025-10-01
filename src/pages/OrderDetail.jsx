import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';
import { useState } from 'react';

const OrderDetail = () => {
  const { id } = useParams();
  const { orders, updateOrderStatus } = useOrders();
  const navigate = useNavigate();
  
  const order = orders.find(o => o.id === parseInt(id));
  
  if (!order) {
    return <div>Order tidak ditemukan</div>;
  }
  
  const statusFlow = {
    'pending': 'processing',
    'processing': 'completed',
    'completed': 'picked'
  };
  
  const handleStatusUpdate = () => {
    if (order.status === 'picked') return;
    
    const newStatus = statusFlow[order.status];
    updateOrderStatus(order.id, newStatus);
  };
  
  const handlePrint = () => {
    window.print();
  };
  
  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'processing': 'Dicuci',
      'completed': 'Selesai',
      'picked': 'Diambil'
    };
    return statusMap[status] || status;
  };
  
  return (
    <div className="order-detail">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Kembali
      </button>
      
      <div className="detail-header">
        <h2>Detail Order #{order.id}</h2>
        <div className={`status-badge ${order.status}`}>
          {getStatusText(order.status)}
        </div>
      </div>
      
      <div className="detail-content">
        <div className="detail-section">
          <h3>Informasi Pelanggan</h3>
          <p><strong>Nama:</strong> {order.customerName}</p>
          <p><strong>Nomor HP:</strong> {order.phoneNumber}</p>
        </div>
        
        <div className="detail-section">
          <h3>Informasi Order</h3>
          <p><strong>Layanan:</strong> {order.serviceType}</p>
          <p><strong>Berat:</strong> {order.weight} kg</p>
          <p><strong>Tanggal Masuk:</strong> {new Date(order.entryDate).toLocaleDateString('id-ID')}</p>
          <p><strong>Tanggal Selesai:</strong> {new Date(order.completionDate).toLocaleDateString('id-ID')}</p>
          <p><strong>Total Harga:</strong> Rp {order.price.toLocaleString('id-ID')}</p>
        </div>
      </div>
      
      <div className="detail-actions">
        {order.status !== 'picked' && (
          <button 
            onClick={handleStatusUpdate}
            className="update-status-btn"
          >
            Update ke {getStatusText(statusFlow[order.status])}
          </button>
        )}
        
        <button onClick={handlePrint} className="print-btn">
          Cetak Nota
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;