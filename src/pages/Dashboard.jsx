import { useOrders } from '../context/OrderContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { orders } = useOrders();
  
  const today = new Date().toDateString();
  const todayOrders = orders.filter(order => 
    new Date(order.createdAt).toDateString() === today
  );
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processingOrders = orders.filter(order => order.status === 'processing');
  const completedOrders = orders.filter(order => order.status === 'completed');
  
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
      
      <Link to="/add-order" className="add-order-btn">
        <span>➕</span> Tambah Order Baru
      </Link>
    </div>
  );
};

export default Dashboard;