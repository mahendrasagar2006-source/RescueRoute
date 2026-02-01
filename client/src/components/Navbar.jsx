import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

// ICONS
import ambulanceIcon from '../assets/icons/ambulance.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/vehicle-alerts', label: 'Vehicles' },
    { path: '/traffic', label: 'Traffic' },
    { path: '/accident-help', label: 'Accident' },
  ];


  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={ambulanceIcon} alt="RescueRoute" width="100" />
          <span className="logo-text" style={{ marginLeft: 8 }}>Res'Q'</span>
        </Link>

        <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/family-emergency"
            className="btn-emergency"
            onClick={() => setMobileOpen(false)}
          >
            Family Emergency
          </Link>



          <Link
            to="/emergency"
            className="btn-emergency"
            onClick={() => setMobileOpen(false)}
          >
            🚨 Emergency
          </Link>
          <Link
            to="/hospital"
            className="btn-emergency"
            onClick={() => setMobileOpen(false)}
          >
            Hospital
          </Link>



          <Link to="/assistant" className="nav-link" onClick={() => setMobileOpen(false)}>
            Assistant 💬
          </Link>
          <Link to="/demo" className="btn-demo" onClick={() => setMobileOpen(false)}>
            Live Demo
          </Link>

          {isAuthenticated ? (
            <div className="nav-user-info">
              <span className="user-name">Hey, {user.name}</span>
              <button className="btn-logout" onClick={() => { logout(); setMobileOpen(false); }}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-login" onClick={() => setMobileOpen(false)}>
              Login
            </Link>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;