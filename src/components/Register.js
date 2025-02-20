import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css'; // Импортируем CSS-файл

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('USER'); // Значение по умолчанию
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        username: username,
        password: password,
        firstName: firstName,
        lastName: lastName,
        role: role // Отправляем выбранную роль на бэкенд
      });

      alert('Registration successful!');
      navigate('/login'); // Перенаправляем на страницу логина
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container"> {/* Apply the auth-container class */}
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      <button className="login-button" onClick={() => navigate('/login')}>Login</button> {/* Use a styled button for Login */}
    </div>
  );
};

export default Register;