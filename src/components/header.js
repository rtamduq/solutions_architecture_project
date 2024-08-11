import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from "./../Authentication/AuthContext"
import '../assets/styles/header.css';
import { logout } from '../services/authenticate';

const handleLogout=()=>{
  logout();
};

const Header = () => {
  // Get the current location using useLocation
  const location = useLocation();
  const { user, signOut } = useContext(AuthContext)

  return (
    <header>
      <nav>
        <div className="nav-container">
          <h1 className="header-title">Humber Books Collection Application</h1>
          <div className="buttons-container">
            {(location.pathname === '/' || location.pathname === '/signup')  && <Link to="/login" className="btn">Login</Link>}
            {(location.pathname === '/' || location.pathname === '/login') && <Link to="/signup" className="btn">Register</Link>}
            {location.pathname === '/dashboard' && 
              <button className="btn" onClick={signOut}>Logout</button>}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
