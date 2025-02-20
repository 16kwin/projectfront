import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './profile.css'; // Import CSS file

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchData = useCallback(async (token) => {
    try {
      console.log('Fetching data from /api/user/me');
      const response = await axios.get('http://localhost:8080/api/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Data from /api/user/me:', response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      console.log('Error status:', error.response?.status);
      console.log('Error data:', error.response?.data);
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    console.log('useEffect is called');
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token);

    if (!token) {
      console.log('No token found, redirecting to /login');
      navigate('/login');
      return;
    }

    fetchData(token);
  }, [navigate, fetchData]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const handleUserButtonClick = useCallback(() => {
    // Действия для кнопки User
    alert('User button clicked!');
  }, []);

  const handleAdminButtonClick = useCallback(() => {
    if (userData && userData.roleName === 'ADMIN') {
      // Действия для кнопки Admin
      alert('Admin button clicked!');
    } else {
      // Отображаем сообщение об отсутствии прав доступа
      alert('You do not have permission to access this feature.');
    }
  }, [userData]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container"> {/* Apply the profile-container class */}
      <h2>Profile</h2>
      <p>Username: {userData.username}</p>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <button onClick={handleUserButtonClick}>User Button</button>
      <button onClick={handleAdminButtonClick} disabled={userData.roleName !== 'ADMIN'}>Admin Button</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;