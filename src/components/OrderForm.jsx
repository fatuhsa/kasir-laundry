import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    serviceType: 'Cuci Lipat',
    weight: '',
    entryDate: new Date().toISOString().split('T')[0],
    completionDate: ''
  });
  
  const servicePrices = {
    'Cuci Lipat': 7000,
    'Cuci + Setrika': 10000,
    'Dry Clean': 15000
  };
  
  const calculatePrice = () => {
    if (!formData.weight) return 0;
    return formData.weight * servicePrices[formData.serviceType];
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newOrder = {
      ...formData,
      price: calculatePrice(),
      weight: parseFloat(formData.weight)
    };
    
    addOrder(newOrder);
    navigate('/');
  };
  
  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <h2>Tambah Order Baru</h2>
      
      <div className="form-group">
        <label>Nama Pelanggan</label>
        <input
          type="text"
          name="customerName"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Nomor HP</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Jenis Layanan</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
        >
          <option value="Cuci Lipat">Cuci Lipat</option>
          <option value="Cuci + Setrika">Cuci + Setrika</option>
          <option value="Dry Clean">Dry Clean</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Berat (kg)</label>
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          min="0.1"
          step="0.1"
          required
        />
      </div>
      
      <div className="form-group">
        <label>Tanggal Masuk</label>
        <input
          type="date"
          name="entryDate"
          value={formData.entryDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Tanggal Selesai</label>
        <input
          type="date"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="price-display">
        <h3>Total Harga: Rp {calculatePrice().toLocaleString('id-ID')}</h3>
      </div>
      
      <button type="submit" className="submit-btn">Simpan Order</button>
    </form>
  );
};

export default OrderForm;