import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

// ICONS
import ambulanceIcon from '../assets/icons/ambulance.svg';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    //{ path: '/how-it-works', label: 'How It Works' },
    { path: '/vehicle-alerts', label: 'Vehicles' },
    { path: '/traffic', label: 'Traffic' },
    { path: '/hospital', label: 'Hospital' },
    { path: '/accident-help', label: 'Accident' },
    { path: '/family-emergency', label: 'FamilyEmergency' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={ambulanceIcon} alt="RescueRoute" width="100" />
          <span className="logo-text" style={{ marginLeft: 8 }}>ResQ</span>
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
          <Link to="/emergency" className="btn-emergency" onClick={() => setMobileOpen(false)}>
            🚨 Emergency
          </Link>
          <Link to="/demo" className="btn-demo" onClick={() => setMobileOpen(false)}>
            Live Demo
          </Link>
          <Link to="/family-emergency" className="btn-family-emergency" onClick={() => setMobileOpen(false)}>
            🚨 FamilyEmergency
          </Link>
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