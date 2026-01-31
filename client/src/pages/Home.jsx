import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// IMAGES
import hero from "../assets/images/hero.png";
import city from "../assets/images/emergency-city.png";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="pulse-circle"></div>
          <div className="pulse-circle delay-1"></div>
          <div className="pulse-circle delay-2"></div>
        </div>

        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              When an Ambulance Moves,
              <span className="highlight"> the City Moves</span>
            </h1>
            <p className="subtitle">
              A city-wide emergency coordination system that clears ambulance routes,
              guides vehicles, prepares hospitals, and saves lives.
            </p>
            <div className="hero-buttons">
              <Link to="/emergency" className="btn btn-red">🚨 Try Emergency Demo</Link>
              <Link to="/hospital" className="btn btn-blue">🏥 Hospital Dashboard</Link>
              <Link to="/traffic" className="btn btn-green">🚦 Traffic Control</Link>
            </div>
            <div className="hero-note">
              <span>💡</span>
              <span>No app installation • Works with existing infrastructure</span>
            </div>
          </div>

          <div className="hero-visual">
            <img src={hero} alt="Hero" className="hero-image" />
            <div className="orb">
              <div className="orb-core"></div>
              <div className="orb-ring r1"></div>
              <div className="orb-ring r2"></div>
              <div className="orb-ring r3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat">
              <h2>45%</h2>
              <p>Faster Response</p>
            </div>
            <div className="stat">
              <h2>100%</h2>
              <p>Route Clearance</p>
            </div>
            <div className="stat">
              <h2>0</h2>
              <p>Hardware Needed</p>
            </div>
            <div className="stat">
              <h2>∞</h2>
              <p>Lives Saved</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="section-head">
            <h2>Key Features</h2>
            <p>Technology that coordinates the entire city</p>
          </div>

          <div className="features-grid">
            <div className="feature-card red">
              <div className="icon">📳</div>
              <h3>Sound + Vibration</h3>
              <p>No screen distraction. Drivers feel unique vibration and hear emergency tone.</p>
              <Link to="/vehicle-alerts">Learn More →</Link>
            </div>

            <div className="feature-card green">
              <div className="icon">🚦</div>
              <h3>Smart Signals</h3>
              <p>API control turns every signal green on ambulance route automatically.</p>
              <Link to="/traffic">View Dashboard →</Link>
            </div>

            <div className="feature-card blue">
              <div className="icon">🏥</div>
              <h3>Hospital Ready</h3>
              <p>Real-time patient data, ETA, blood type sent before arrival.</p>
              <Link to="/hospital">See Dashboard →</Link>
            </div>

            <div className="feature-card amber">
              <div className="icon">🏆</div>
              <h3>Rescue Score</h3>
              <p>Reward system for cooperative drivers. Earn points, save lives.</p>
              <Link to="/">Check Rewards →</Link>
            </div>

            <div className="feature-card purple">
              <div className="icon">🆘</div>
              <h3>Accident Response</h3>
              <p>Lock-screen emergency button for victims, bystander triggers.</p>
              <Link to="/accident-help">Emergency Help →</Link>
            </div>

            <div className="feature-card orange">
              <div className="icon">📍</div>
              <h3>Live Tracking</h3>
              <p>Real-time ambulance location visible to family and hospital.</p>
              <Link to="/demo">Watch Demo →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation */}
      <section className="innovation">
        <div className="container innovation-grid">
          <div className="innovation-content">
            <h2>The Sound of Safety</h2>
            <p>
              Traditional notifications fail because drivers can't safely check phones.
              RescueRoute uses <strong>instinctive alerts</strong> without screens.
            </p>
            <ul>
              <li>✓ Works with screen locked</li>
              <li>✓ Unique vibration pattern</li>
              <li>✓ Universal emergency tone</li>
              <li>✓ No visual distraction</li>
              <li>✓ Instant recognition</li>
            </ul>
            <Link to="/vehicle-alerts" className="btn btn-red">Learn More</Link>
          </div>

          <div className="innovation-visual">
            <div className="waves">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
            <div className="phone">
              <div className="phone-screen">
                <div className="alert">
                  <span className="alert-icon">🚨</span>
                  <p>Ambulance Approaching</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-content">
          <h2>Experience RescueRoute Live</h2>
          <p>See the entire system in action with our 2-minute interactive simulation</p>
          <Link to="/demo" className="btn btn-large">🚀 Launch Full Demo</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;