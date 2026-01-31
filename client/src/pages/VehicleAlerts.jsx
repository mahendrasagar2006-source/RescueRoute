import React, { useState } from 'react';
import './VehicleAlerts.css';

const VehicleAlerts = () => {
  const [alertActive, setAlertActive] = useState(false);

  const testAlert = () => {
    setAlertActive(true);
    if ('vibrate' in navigator) {
      navigator.vibrate([1000, 200, 500, 200, 1000]);
    }
    setTimeout(() => setAlertActive(false), 3000);
  };

  return (
    <div className="vehicle-page">
      <section className="vehicle-hero">
        <div className="container">
          <h1>Vehicle Alert System</h1>
          <p>Sound + Vibration alerts that work without looking at screens</p>
        </div>
      </section>

      <section className="vehicle-content">
        <div className="container content-grid">
          <div className="content-left">
            <h2>The Problem with Traditional Alerts</h2>
            <p>
              Drivers can't safely check their phones while driving. Push notifications
              require looking at screens, causing dangerous distractions.
            </p>

            <h2>The RescueRoute Solution</h2>
            <div className="features-list">
              <div className="feature-item">
                <span className="check">✓</span>
                <div>
                  <h4>Unique Vibration Pattern</h4>
                  <p>Long-Short-Long (1000ms-500ms-1000ms) - instantly recognizable</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="check">✓</span>
                <div>
                  <h4>Universal Emergency Tone</h4>
                  <p>Distinct sound that drivers learn to recognize immediately</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="check">✓</span>
                <div>
                  <h4>Works with Screen Locked</h4>
                  <p>Alert triggers even when phone is in pocket or dashboard</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="check">✓</span>
                <div>
                  <h4>No Visual Distraction</h4>
                  <p>Drivers respond instinctively without taking eyes off road</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="check">✓</span>
                <div>
                  <h4>Bluetooth Integration</h4>
                  <p>Voice announcement through car speakers: "Emergency vehicle approaching"</p>
                </div>
              </div>
            </div>

            <button onClick={testAlert} className="test-btn">
              🔊 Test Alert Now
            </button>
          </div>

          <div className="content-right">
            <div className={`phone-demo ${alertActive ? 'active' : ''}`}>
              <div className="phone-frame">
                <div className="phone-screen-content">
                  {alertActive ? (
                    <div className="alert-active">
                      <div className="alert-icon-large">🚨</div>
                      <h3>Emergency Vehicle Approaching</h3>
                      <p>Please clear the lane</p>
                      <div className="vibration-indicator">
                        <div className="vib-bar"></div>
                        <div className="vib-bar"></div>
                        <div className="vib-bar"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="alert-standby">
                      <div className="standby-icon">📱</div>
                      <p>Waiting for emergency alert...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="info-box">
              <h4>How It Works</h4>
              <ol>
                <li>Ambulance activates emergency mode</li>
                <li>Nearby vehicles (within 500m) receive alert</li>
                <li>Phone vibrates with unique pattern</li>
                <li>Emergency tone plays</li>
                <li>Optional voice announcement via Bluetooth</li>
                <li>Driver clears lane instinctively</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleAlerts;