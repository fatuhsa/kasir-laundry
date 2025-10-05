import { useState } from 'react';
import OrderTable from '../components/OrderTable';

const Orders = () => {
  const [filter, setFilter] = useState('all');
  
  return (
    <div className="page-container">
      <h1>Daftar Order</h1>
      
      <div className="filter-container">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          Semua
        </button>
        <button 
          className={filter === 'pending' ? 'active' : ''} 
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={filter === 'processing' ? 'active' : ''} 
          onClick={() => setFilter('processing')}
        >
          Dicuci
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Selesai
        </button>
      </div>
      
      <OrderTable filter={filter} />
    </div>
  );
};

export default Orders;