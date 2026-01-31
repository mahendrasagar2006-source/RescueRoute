import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <span className="logo-icon">🚨</span>
              <span>RescueRoute</span>
            </div>
            <p>When an ambulance moves, the city moves.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/demo">Live Demo</Link></li>
              <li><Link to="/emergency">Emergency Button</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Dashboards</h4>
            <ul>
              <li><Link to="/hospital">Hospital ER</Link></li>
              <li><Link to="/traffic">Traffic Control</Link></li>
              <li><Link to="/vehicle-alerts">Vehicle Alerts</Link></li>
              <li><Link to="/accident-help">Accident Help</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Technology</h4>
            <ul>
              <li><a href="#tech">Software Only</a></li>
              <li><a href="#tech">API Integration</a></li>
              <li><a href="#tech">Real-time Sync</a></li>
              <li><a href="#tech">Scalable System</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 RescueRoute. A hackathon project that saves lives.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;