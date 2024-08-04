// src/components/Login.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../slices/authSlice';
import '../assets/styles/Login.css'; // Ajusta la ruta del archivo CSS


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setError('Both fields are required.');
      return;
    }

    // Aquí iría la lógica de autenticación, si es necesario
    console.log('Username:', username);
    console.log('Password:', password);

    // Simulación de autenticación exitosa
    dispatch(login({ username }));
    navigate('/books'); // Redirige a la página de libros
  };

  return (
    <div className="login-container">
      <h2 style={{color: "#000"}}>Login to the Book Application</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
