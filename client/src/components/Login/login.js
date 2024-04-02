import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./login.css"
function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const history = useHistory();

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

    try {
      // Send login data to server
      const response = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Check if login was successful
      if (response.ok) {
        // Redirect to dashboard on successful login
        history.push('/dashboard');
      } else {
        // Handle authentication error
        const data = await response.json();
        alert(data.message); // Display error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Failed to login. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
