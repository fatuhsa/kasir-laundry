// src/context/OrderContext.js
import { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  
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
    <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);