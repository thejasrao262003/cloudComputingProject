import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for navigation
import ecommerceImage from './ecommerce-image.jpeg'; // Import your ecommerce image
import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    age: '',
    address: '',
    password: '' // New password field added
  });
  const history = useHistory(); // Initialize useHistory hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);

    // Check if all fields are filled
    if (Object.values(formData).some(field => field === '')) {
      alert('Please fill out all fields.');
      return;
    }

    // Check if email is in valid format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to signup');
      }

      alert('Signup successful!');
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        age: '',
        address: '',
        password: '' // Reset password field after successful signup
      });
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to signup. Please try again.');
    }
  };

  const handleLogin = () => {
    history.push('/login'); // Redirect to /login route
  };

  return (
    <div className="page-container">
      <div>
        <img src={ecommerceImage} alt="Ecommerce" className="ecommerce-image" />
      </div>
      <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit">Signup</button>
        </form>
        <button onClick={handleLogin} className="login-button">Login</button>
      </div>
    </div>
  );
}

export default Signup;
