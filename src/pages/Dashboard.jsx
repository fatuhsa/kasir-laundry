import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { orders, services } = useOrders();
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === today
  );
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  const completedOrders = orders.filter(order => order.status === 'completed');
  
  // Statistik per layanan
  const serviceStats = Object.entries(services).map(([key, service]) => {
    const serviceOrders = orders.filter(order => order.serviceType === key);
    const totalWeight = serviceOrders.reduce((sum, order) => sum + order.weight, 0);
    const totalIncome = serviceOrders.reduce((sum, order) => sum + order.price, 0);
    
    return {
      name: service.name,
      count: serviceOrders.length,
      totalWeight,
      totalIncome
    };
  });
  
  return (
    <div className="dashboard">
      <h1>Dashboard Laundry</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Order Hari Ini</h3>
          <p className="stat-number">{todayOrders.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{pendingOrders.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>Sedang Dicuci</h3>
          <p className="stat-number">{processingOrders.length}</p>
        </div>
        
        <div className="stat-card">
          <h3>Selesai</h3>
          <p className="stat-number">{completedOrders.length}</p>
        </div>
      </div>
      
      <h2>Statistik Layanan</h2>
      <div className="service-stats-container">
        {serviceStats.map((stat, index) => (
          <div key={index} className="service-stat-card">
            <h3>{stat.name}</h3>
            <p>Jumlah Order: <span>{stat.count}</span></p>
            <p>Total Berat: <span>{stat.totalWeight.toFixed(1)} kg</span></p>
            <p>Total Pendapatan: <span>Rp {stat.totalIncome.toLocaleString('id-ID')}</span></p>
          </div>
        ))}
      </div>
      
      <Link to="/add-order" className="add-order-btn">
        <span>➕</span> Tambah Order Baru
      </Link>
    </div>
  );
};

export default Dashboard;