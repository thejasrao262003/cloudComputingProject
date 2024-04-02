import React, { useState, useEffect } from 'react';
import './orderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3001/orders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setError('Failed to fetch orders. Please try again later.');
    }
  };

  return (
    <div className="order-management">
      <h2>Orders</h2>
      {error && <p className="error-message">{error}</p>}
      {orders.map(order => (
        <div key={order._id} className="order">
          <h3>Customer Name: {order.customerName}</h3>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>{item.productName} - Quantity: {item.quantity} - Price: {item.price}</li>
            ))}
          </ul>
          <p>Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderManagement;
