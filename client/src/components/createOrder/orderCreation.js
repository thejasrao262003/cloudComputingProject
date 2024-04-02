import React, { useState } from 'react';
import './OrderForm.css';

const OrderForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customerName,
          items,
          total
        })
      });
      if (!response.ok) {
        throw new Error('Failed to add order');
      }
      console.log('Order added successfully');
      // Reset form fields after successful submission
      setCustomerName('');
      setItems([]);
      setTotal(0);
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const handleAddItem = () => {
    const newItem = { productName, quantity, price };
    const updatedItems = [...items, newItem];
    const updatedTotal = total + quantity * price;
    setItems(updatedItems);
    setTotal(updatedTotal);
    setProductName('');
    setQuantity(0);
    setPrice(0);
  };

  return (
    <div className="order-form">
      <h2>Add New Order</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Customer Name:
          <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
        </label>
        <br />
        <label>
          Product Name:
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </label>
        <br />
        <label>
          Quantity:
          <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} required />
        </label>
        <br />
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
        </label>
        <br />
        <button type="button" onClick={handleAddItem}>Add Item</button>
        <br />
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.productName} - Quantity: {item.quantity} - Price: {item.price}</li>
          ))}
        </ul>
        <p>Total: ${total}</p>
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
