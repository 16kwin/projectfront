import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import the CSS file

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username: username,
        password: password
      });

      const token = response.data.token;
      localStorage.setItem('token', token); 
      navigate('/profile'); 
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <div className="login-container"> {/* Apply the login-container class */}
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <button className="register-button" onClick={() => navigate('/register')}>Register</button> {/* Use a styled button for registration */}
    </div>
  );
};

export default Login;