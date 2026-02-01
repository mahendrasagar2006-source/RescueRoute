import React, { useState, useEffect } from 'react';
import { testEmergencyAlert, requestNotificationPermission } from '../components/EmergencySound';
import './VehicleAlerts.css';
import { calculateDistance } from '../utils/haversine';
import { MOCK_SIGNALS } from '../utils/constants';

// Leaflet imports
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';
import { Marker } from 'react-leaflet/Marker';
import { Popup } from 'react-leaflet/Popup';
import { Polyline } from 'react-leaflet/Polyline';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not appearing in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Custom Icons
const vehicleIcon = L.divIcon({
  className: 'custom-vehicle-icon',
  html: `<div class="vehicle-marker-dot">🚗</div>`,
  iconSize: [30, 30],
});

const getSignalIcon = (status) => {
  return L.divIcon({
    className: 'custom-signal-icon',
    html: `<div class="signal-dot ${status}"></div>`,
    iconSize: [20, 20],
  });
};

const VehicleAlerts = () => {
  const [alertActive, setAlertActive] = useState(false);
  const [nearbyVehicles, setNearbyVehicles] = useState(0);
  const [nearbySignals, setNearbySignals] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulate getting current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location error:', error);
          // Use default location for demo (Bangalore near signals)
          setMyLocation({
            lat: 12.9700,
            lng: 77.5930
          });
        }
      );
    } else {
      // Default location for demo (Bangalore near signals)
      setMyLocation({
        lat: 12.9700,
        lng: 77.5930
      });
    }
  }, []);

  const handleTestAlert = async () => {
    // Request notification permission first
    await requestNotificationPermission();

    // Trigger alert on THIS device
    setAlertActive(true);
    testEmergencyAlert();

    // Simulate sending alerts to nearby vehicles
    simulateNearbyVehicleAlerts();

    // Reset alert state after the simulation finishes (matches simulateNearbyVehicleAlerts timeout)
    setTimeout(() => setAlertActive(false), 8000);
  };

  const simulateNearbyVehicleAlerts = () => {
    setIsSimulating(true);

    // Simulate finding 5-15 nearby vehicles
    const vehicleCount = Math.floor(Math.random() * 11) + 5;
    setNearbyVehicles(vehicleCount);

    // Find nearby signals using Haversine algorithm (3km radius)
    if (myLocation) {
      const alertedSignals = MOCK_SIGNALS.filter(signal => {
        const distance = calculateDistance(
          myLocation.lat, myLocation.lng,
          signal.position[0], signal.position[1]
        );
        return distance <= 3.0; // 3km radius
      }).map(signal => ({
        ...signal,
        currentDistance: calculateDistance(
          myLocation.lat, myLocation.lng,
          signal.position[0], signal.position[1]
        ).toFixed(2)
      }));
      setNearbySignals(alertedSignals);
    }

    // Simulate staggered alerts to nearby vehicles
    for (let i = 0; i < vehicleCount; i++) {
      setTimeout(() => {
        console.log(`🚗 Vehicle ${i + 1} received alert`);
      }, i * 100);
    }

    setTimeout(() => {
      setIsSimulating(false);
      setNearbyVehicles(0);
      setNearbySignals([]);
    }, 8000); // Increased time to see results
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

            <button onClick={handleTestAlert} className="test-btn">
              🔊 Test Alert Now
            </button>

            {isSimulating && (
              <div className="simulation-info">
                <div className="sim-header">
                  <span className="sim-icon">📡</span>
                  <strong>Broadcasting Alert...</strong>
                </div>
                <p className="sim-count">
                  Alerting <span className="highlight-number">{nearbyVehicles}</span> nearby vehicles within 500m radius
                </p>
                <div className="sim-status">
                  <div className="status-item">✅ Sound playing on all devices</div>
                  <div className="status-item">✅ Vibration triggered</div>
                  <div className="status-item">✅ Notifications sent</div>
                  {nearbySignals.length > 0 && (
                    <div className="nearby-signals-alert">
                      <div className="alert-divider"></div>
                      <h5>🚦 Nearby Signals Controlled (3km):</h5>
                      {nearbySignals.map(signal => (
                        <div key={signal.id} className="signal-alert-item">
                          <span>🔔 <strong>{signal.name}</strong></span>
                          <span>{signal.currentDistance}km away</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {myLocation && !isSimulating && (
              <div className="location-info">
                <p>📍 Your Location: {myLocation.lat.toFixed(4)}, {myLocation.lng.toFixed(4)}</p>
                <p className="info-note">In production: All vehicles within 500m would receive this alert</p>
              </div>
            )}
          </div>

          <div className="content-right">
            <div className="map-demo-container">
              {myLocation ? (
                <MapContainer center={[myLocation.lat, myLocation.lng]} zoom={14} scrollWheelZoom={false} className="vehicle-map-container">
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* User Vehicle Marker */}
                  <Marker position={[myLocation.lat, myLocation.lng]} icon={vehicleIcon}>
                    <Popup>Your Current Location</Popup>
                  </Marker>

                  {/* Signal Markers and Routes */}
                  {MOCK_SIGNALS.map(signal => {
                    const isNearby = nearbySignals.some(ns => ns.id === signal.id);
                    if (isSimulating && isNearby) {
                      console.log(`Rendering route to signal ${signal.id}: nearby=${isNearby}, active=${alertActive}`);
                    }
                    return (
                      <React.Fragment key={signal.id}>
                        <Marker
                          position={signal.position}
                          icon={getSignalIcon(signal.status)}
                        >
                          <Popup>
                            <strong>{signal.name}</strong><br />
                            Status: {signal.status.toUpperCase()}
                          </Popup>
                        </Marker>

                        {/* Draw route if nearby and alert is active */}
                        {isNearby && alertActive && (
                          <Polyline
                            key={`route-${signal.id}`}
                            positions={[
                              [myLocation.lat, myLocation.lng],
                              signal.position
                            ]}
                            pathOptions={{
                              color: '#00FF00',
                              weight: 6,
                              opacity: 1
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </MapContainer>
              ) : (
                <div className="map-placeholder">
                  <p>Loading GPS coordinates...</p>
                </div>
              )}
            </div>

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
              <h4>How It Works in Production</h4>
              <ol>
                <li>Ambulance driver activates emergency mode</li>
                <li>Backend server receives ambulance GPS location</li>
                <li>Server calculates all vehicles within 500m radius</li>
                <li>Server sends WebSocket alert to nearby vehicles</li>
                <li>Each vehicle's phone plays emergency tone</li>
                <li>Vibration triggers (Long-Short-Long pattern)</li>
                <li>Notification appears even if app is in background</li>
                <li>Driver clears lane instinctively</li>
              </ol>

              <div className="tech-stack">
                <h5>Technology Stack:</h5>
                <ul>
                  <li>🔧 Backend: Node.js + Socket.IO</li>
                  <li>📍 GPS: Geolocation API</li>
                  <li>🔊 Audio: Web Audio API</li>
                  <li>📳 Haptics: Vibration API</li>
                  <li>🔔 Alerts: Push Notification API</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VehicleAlerts;