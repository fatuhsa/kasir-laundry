import { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const { addOrder, services } = useOrders();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    serviceType: 'reguler',
    weight: '',
    entryDate: new Date().toISOString().split('T')[0],
    entryTime: new Date().toTimeString().slice(0, 5),
    completionDate: ''
  });
  
  const [errors, setErrors] = useState({});
  
  const calculatePrice = () => {
    if (!formData.weight || !formData.serviceType) return 0;
    
    const service = services[formData.serviceType];
    return formData.weight * service.pricePerKg;
  };
  
  const calculateCompletionDate = () => {
    if (!formData.entryDate || !formData.entryTime || !formData.serviceType) return '';
    
    const service = services[formData.serviceType];
    const entryDateTime = new Date(`${formData.entryDate}T${formData.entryTime}`);
    
    let completionDateTime = new Date(entryDateTime);
    
    switch (formData.serviceType) {
      case 'reguler':
        completionDateTime.setDate(completionDateTime.getDate() + 3);
        break;
      case 'express':
        completionDateTime.setDate(completionDateTime.getDate() + 1);
        break;
      case 'kilat':
        completionDateTime.setHours(completionDateTime.getHours() + 6);
        break;
      default:
        break;
    }
    
    return completionDateTime.toISOString().slice(0, 16);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName) {
      newErrors.customerName = 'Nama pelanggan harus diisi';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Nomor HP harus diisi';
    }
    
    if (!formData.weight) {
      newErrors.weight = 'Berat harus diisi';
    } else {
      const service = services[formData.serviceType];
      if (parseFloat(formData.weight) < service.minWeight) {
        newErrors.weight = `Berat minimum untuk layanan ${service.name} adalah ${service.minWeight} kg`;
      }
    }
    
    if (formData.serviceType === 'kilat') {
      const service = services.kilat;
      const [hours, minutes] = formData.entryTime.split(':').map(Number);
      const entryTimeInMinutes = hours * 60 + minutes;
      
      const [startHours, startMinutes] = service.timeRestriction.start.split(':').map(Number);
      const startTimeInMinutes = startHours * 60 + startMinutes;
      
      const [endHours, endMinutes] = service.timeRestriction.end.split(':').map(Number);
      const endTimeInMinutes = endHours * 60 + endMinutes;
      
      if (entryTimeInMinutes < startTimeInMinutes || entryTimeInMinutes > endTimeInMinutes) {
        newErrors.entryTime = `Layanan kilat hanya tersedia antara pukul ${service.timeRestriction.start} - ${service.timeRestriction.end}`;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
      ...(name === 'serviceType' || name === 'entryDate' || name === 'entryTime' 
        ? { completionDate: calculateCompletionDate() } 
        : {})
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newOrder = {
      ...formData,
      price: calculatePrice(),
      weight: parseFloat(formData.weight),
      completionDate: calculateCompletionDate()
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
          className={errors.customerName ? 'error' : ''}
        />
        {errors.customerName && <div className="error-message">{errors.customerName}</div>}
      </div>
      
      <div className="form-group">
        <label>Nomor HP</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className={errors.phoneNumber ? 'error' : ''}
        />
        {errors.phoneNumber && <div className="error-message">{errors.phoneNumber}</div>}
      </div>
      
      <div className="form-group">
        <label>Jenis Layanan</label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
        >
          {Object.entries(services).map(([key, service]) => (
            <option key={key} value={key}>
              {service.name} ({service.description}) - Rp {service.pricePerKg.toLocaleString('id-ID')}/kg (min. {service.minWeight}kg)
            </option>
          ))}
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
          className={errors.weight ? 'error' : ''}
        />
        {errors.weight && <div className="error-message">{errors.weight}</div>}
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Tanggal Masuk</label>
          <input
            type="date"
            name="entryDate"
            value={formData.entryDate}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Jam Masuk</label>
          <input
            type="time"
            name="entryTime"
            value={formData.entryTime}
            onChange={handleChange}
            className={errors.entryTime ? 'error' : ''}
          />
          {errors.entryTime && <div className="error-message">{errors.entryTime}</div>}
        </div>
      </div>
      
      <div className="form-group">
        <label>Perkiraan Selesai</label>
        <input
          type="datetime-local"
          name="completionDate"
          value={formData.completionDate}
          readOnly
          className="readonly"
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