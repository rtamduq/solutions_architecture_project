// src/components/Header.js

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación
import '../assets/styles/header.css'; // Asegúrate de que el archivo CSS esté en la ruta correcta

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-container">
          <h1 className="header-title">Humber Books Collection Application</h1>
          <div className="buttons-container">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/books" className="btn">Books</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;


