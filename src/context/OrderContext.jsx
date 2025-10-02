// src/context/OrderContext.js
import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  
  // Konfigurasi layanan
  const services = {
    'reguler': {
      name: 'Reguler',
      description: '3 hari',
      minWeight: 3,
      pricePerKg: 7000,
      timeRestriction: null
    },
    'express': {
      name: 'Express',
      description: '1 hari',
      minWeight: 3,
      pricePerKg: 8000,
      timeRestriction: null
    },
    'kilat': {
      name: 'Kilat',
      description: '6 jam',
      minWeight: 3,
      pricePerKg: 10000,
      timeRestriction: {
        start: '07:00',
        end: '14:00'
      }
    }
  };
  
  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    setOrders([...orders, newOrder]);
  };
  
  const updateOrderStatus = (id, status) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status } : order
    ));
  };
  
  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      updateOrderStatus,
      services
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);