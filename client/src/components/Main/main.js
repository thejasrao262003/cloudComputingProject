import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch user data from the backend
      const response = await fetch('http://localhost:3003/dashboard', {
        method: 'GET',
        credentials: 'include' // Include credentials (session cookie)
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Redirect to login page if user is not authenticated
      history.push('/login');
    }
  };

  const handleLogout = () => {
    fetch('http://localhost:3001/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(() => {
      history.push('/login');
    }).catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      {userData && (
        <div className="user-info">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Age:</strong> {userData.age}</p>
          <p><strong>Address:</strong> {userData.address}</p>
        </div>
      )}
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Dashboard;
