import React, { useState, useEffect } from 'react';
import './FamilyEmergency.css';
import EmergencySound from '../components/EmergencySound';

const FamilyEmergency = () => {
  const [activeCase, setActiveCase] = useState('self-use');
  const [selfUseAlertActive, setSelfUseAlertActive] = useState(false);
  const [victimPhoneAlertActive, setVictimPhoneAlertActive] = useState(false);
  const [ownPhoneAlertActive, setOwnPhoneAlertActive] = useState(false);
  const [autoDetectAlertActive, setAutoDetectAlertActive] = useState(false);
  
  const [selectedSeverity, setSelectedSeverity] = useState('moderate');
  const [showAreYouOkModal, setShowAreYouOkModal] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [detectionTimelineActive, setDetectionTimelineActive] = useState(false);

  // Case 1: Self-Use Emergency
  const triggerSelfUseEmergency = () => {
    setSelfUseAlertActive(true);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Case 2A: Lockscreen Emergency (Victim's Phone)
  const triggerVictimPhoneEmergency = () => {
    setVictimPhoneAlertActive(true);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Case 2B: Report using own phone
  const submitAccidentReport = (e) => {
    e.preventDefault();
    setOwnPhoneAlertActive(true);
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  // Case 3: Auto Detection
  const startCrashDetectionDemo = () => {
    setDetectionTimelineActive(true);
    
    setTimeout(() => {
      setShowAreYouOkModal(true);
      setCountdown(10);
    }, 2000);
  };

  // Countdown timer for "Are You Okay?" modal
  useEffect(() => {
    if (showAreYouOkModal && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showAreYouOkModal && countdown === 0) {
      setShowAreYouOkModal(false);
      setAutoDetectAlertActive(true);
    }
  }, [showAreYouOkModal, countdown]);

  const handleImOk = () => {
    setShowAreYouOkModal(false);
    setCountdown(10);
    alert("Emergency alert cancelled. Glad you're safe!");
  };

  const handleNeedHelp = () => {
    setShowAreYouOkModal(false);
    setAutoDetectAlertActive(true);
  };

  return (
    <div className="family-emergency-page">
      <EmergencySound isActive={selfUseAlertActive || victimPhoneAlertActive || ownPhoneAlertActive} />

      {/* Hero Section */}
      <section className="fem-hero">
        <div className="container">
          <h1>🚨 Family Emergency Button</h1>
          <p>Complete emergency response system - works even when the victim cannot operate their phone</p>
        </div>
      </section>

      {/* Case Selector */}
      <section className="fem-content">
        <div className="container">
          <div className="case-selector">
            <div 
              className={`case-card ${activeCase === 'self-use' ? 'active' : ''}`}
              onClick={() => setActiveCase('self-use')}
            >
              <span className="case-icon">👤</span>
              <h3>Case 1: Self-Use</h3>
              <p>You're conscious and can operate your phone</p>
            </div>

            <div 
              className={`case-card ${activeCase === 'bystander' ? 'active' : ''}`}
              onClick={() => setActiveCase('bystander')}
            >
              <span className="case-icon">🤝</span>
              <h3>Case 2: Bystander Help</h3>
              <p>Someone else is unconscious - use their phone or yours</p>
            </div>

            <div 
              className={`case-card ${activeCase === 'auto-detect' ? 'active' : ''}`}
              onClick={() => setActiveCase('auto-detect')}
            >
              <span className="case-icon">🤖</span>
              <h3>Case 3: Auto Detection</h3>
              <p>Automatic crash detection - no manual intervention</p>
            </div>
          </div>

          {/* Case 1: Self-Use Flow */}
          {activeCase === 'self-use' && (
            <div className="case-content active">
              <div className="self-use-flow">
                <div className="flow-intro">
                  <h2>Self-Use Emergency</h2>
                  <p>Press the emergency button to send instant help</p>
                </div>

                <button className="emergency-button-main" onClick={triggerSelfUseEmergency}>
                  <span className="btn-pulse">🆘</span>
                  <span>EMERGENCY</span>
                </button>

                <div className="feature-grid">
                  <div className="feature-item">
                    <span className="f-icon">📍</span>
                    <h4>Live Location</h4>
                    <p>Real-time GPS coordinates</p>
                  </div>
                  <div className="feature-item">
                    <span className="f-icon">🩸</span>
                    <h4>Blood Group</h4>
                    <p>Critical medical info</p>
                  </div>
                  <div className="feature-item">
                    <span className="f-icon">⚠️</span>
                    <h4>Allergies</h4>
                    <p>Alert medical staff</p>
                  </div>
                  <div className="feature-item">
                    <span className="f-icon">📄</span>
                    <h4>Medical History</h4>
                    <p>Complete health profile</p>
                  </div>
                  <div className="feature-item">
                    <span className="f-icon">🚑</span>
                    <h4>Nearest Ambulance</h4>
                    <p>Auto-dispatched</p>
                  </div>
                  <div className="feature-item">
                    <span className="f-icon">🚦</span>
                    <h4>Traffic Clearance</h4>
                    <p>Green corridor activated</p>
                  </div>
                </div>

                {selfUseAlertActive && (
                  <div className="success-alert">
                    <span className="success-icon">✅</span>
                    <h3>Emergency Alert Sent!</h3>
                    <p>Help is on the way. Stay calm.</p>
                    <div className="alert-details">
                      <div className="detail-row">
                        <span>📍 Your Location:</span>
                        <span className="val">Hyderabad, Telangana</span>
                      </div>
                      <div className="detail-row">
                        <span>🚑 Ambulance:</span>
                        <span className="val green">Dispatched - ETA 4 mins</span>
                      </div>
                      <div className="detail-row">
                        <span>🏥 Hospital:</span>
                        <span className="val">Apollo Hospital notified</span>
                      </div>
                      <div className="detail-row">
                        <span>👨‍👩‍👧 Family:</span>
                        <span className="val">3 contacts alerted</span>
                      </div>
                      <div className="detail-row">
                        <span>🚦 Traffic:</span>
                        <span className="val green">Green corridor active</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Case 2: Bystander Flow */}
          {activeCase === 'bystander' && (
            <div className="case-content active">
              <div className="bystander-flow">
                <div className="bystander-option">
                  <div className="option-header">
                    <span className="option-badge">Option A</span>
                    <h3>Using Victim's Phone</h3>
                  </div>
                  <p className="option-desc">
                    The victim is unconscious but their phone is accessible. 
                    You can help without unlocking the device.
                  </p>

                  <div className="lockscreen-demo">
                    <div className="phone-mockup">
                      <div className="phone-header">
                        <span>🔒</span>
                        <span>Lock Screen - No Password Required</span>
                      </div>
                      <button 
                        className="lockscreen-emergency-btn"
                        onClick={triggerVictimPhoneEmergency}
                      >
                        🆘 Emergency Help Available
                      </button>
                    </div>
                  </div>

                  <div className="info-note green">
                    <strong>✓ No Unlock Required</strong>
                    <p>One tap sends victim's medical profile to emergency services</p>
                  </div>

                  {victimPhoneAlertActive && (
                    <div className="success-alert">
                      <span className="success-icon">✅</span>
                      <h3>Victim's Emergency Profile Sent!</h3>
                      <p>Medical team alerted with complete information</p>
                      <div className="alert-details">
                        <div className="detail-row">
                          <span>👤 Victim Name:</span>
                          <span className="val">Rajesh Kumar</span>
                        </div>
                        <div className="detail-row">
                          <span>🩸 Blood Group:</span>
                          <span className="val">O+ Positive</span>
                        </div>
                        <div className="detail-row">
                          <span>⚠️ Allergies:</span>
                          <span className="val">Penicillin</span>
                        </div>
                        <div className="detail-row">
                          <span>📍 Location:</span>
                          <span className="val">Madhapur, Hyderabad</span>
                        </div>
                        <div className="detail-row">
                          <span>🚑 Ambulance:</span>
                          <span className="val green">Dispatched - ETA 5 mins</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bystander-option">
                  <div className="option-header">
                    <span className="option-badge">Option B</span>
                    <h3>Using Your Phone</h3>
                  </div>
                  <p className="option-desc">
                    Victim's phone is damaged or unavailable. 
                    Report the accident using your own device.
                  </p>

                  <form className="report-form" onSubmit={submitAccidentReport}>
                    <div className="form-group">
                      <label>📍 Location (Auto-detected)</label>
                      <input 
                        type="text" 
                        defaultValue="Madhapur, Hyderabad, Telangana" 
                        readOnly 
                      />
                    </div>

                    <div className="form-group">
                      <label>🚨 Severity Level</label>
                      <div className="severity-selector">
                        <div 
                          className={`severity-btn ${selectedSeverity === 'minor' ? 'selected' : ''}`}
                          onClick={() => setSelectedSeverity('minor')}
                        >
                          <span className="sev-icon">🟡</span>
                          <span>Minor</span>
                        </div>
                        <div 
                          className={`severity-btn ${selectedSeverity === 'moderate' ? 'selected' : ''}`}
                          onClick={() => setSelectedSeverity('moderate')}
                        >
                          <span className="sev-icon">🟠</span>
                          <span>Moderate</span>
                        </div>
                        <div 
                          className={`severity-btn ${selectedSeverity === 'critical' ? 'selected' : ''}`}
                          onClick={() => setSelectedSeverity('critical')}
                        >
                          <span className="sev-icon">🔴</span>
                          <span>Critical</span>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>📝 Brief Description (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Vehicle collision, person unconscious" 
                      />
                    </div>

                    <div className="form-group">
                      <label>📸 Photo Evidence (Optional)</label>
                      <input type="file" accept="image/*" />
                    </div>

                    <button type="submit" className="submit-report-btn">
                      🚨 Dispatch Emergency Services
                    </button>
                  </form>

                  {ownPhoneAlertActive && (
                    <div className="success-alert">
                      <span className="success-icon">✅</span>
                      <h3>Accident Reported Successfully!</h3>
                      <p>Emergency services are on their way</p>
                      <div className="alert-details">
                        <div className="detail-row">
                          <span>📍 Location:</span>
                          <span className="val">Madhapur, Hyderabad</span>
                        </div>
                        <div className="detail-row">
                          <span>🚑 Ambulance:</span>
                          <span className="val green">Dispatched - ETA 6 mins</span>
                        </div>
                        <div className="detail-row">
                          <span>🚓 Police:</span>
                          <span className="val">Notified - ETA 8 mins</span>
                        </div>
                        <div className="detail-row">
                          <span>🚨 Severity:</span>
                          <span className="val">{selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)} Priority</span>
                        </div>
                        <div className="detail-row">
                          <span>📞 Status:</span>
                          <span className="val">You'll be contacted if needed</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Case 3: Auto Detection */}
          {activeCase === 'auto-detect' && (
            <div className="case-content active">
              <div className="auto-detect-flow">
                <div className="crash-simulator">
                  <h2>🤖 Automatic Crash Detection Demo</h2>
                  <p>
                    This feature uses your phone's accelerometer and gyroscope to detect 
                    sudden impacts, falls, or crashes. When detected, the system checks 
                    if you're okay before automatically alerting emergency services.
                  </p>

                  <button className="crash-demo-btn" onClick={startCrashDetectionDemo}>
                    ⚡ Simulate Crash Detection
                  </button>

                  <div className="sensor-grid">
                    <div className="sensor-box">
                      <span className="sensor-icon">📊</span>
                      <h4>Sensor Detection</h4>
                      <p>Sudden impact monitoring</p>
                    </div>
                    <div className="sensor-box">
                      <span className="sensor-icon">⏱️</span>
                      <h4>10-Second Check</h4>
                      <p>User response window</p>
                    </div>
                    <div className="sensor-box">
                      <span className="sensor-icon">🚨</span>
                      <h4>Auto Alert</h4>
                      <p>Automatic if no response</p>
                    </div>
                  </div>
                </div>

                {detectionTimelineActive && (
                  <div className="detection-timeline">
                    <div className="timeline-step" style={{animationDelay: '0s'}}>
                      <strong>0:00 - Crash Detected</strong>
                      <p>Sensors detected sudden impact and phone thrown/dropped</p>
                    </div>
                    <div className="timeline-step" style={{animationDelay: '0.3s'}}>
                      <strong>0:01 - Alert Triggered</strong>
                      <p>"Are you okay?" prompt displayed with countdown</p>
                    </div>
                    <div className="timeline-step" style={{animationDelay: '0.6s'}}>
                      <strong>0:10 - No Response</strong>
                      <p>User did not respond within 10 seconds</p>
                    </div>
                    <div className="timeline-step" style={{animationDelay: '0.9s'}}>
                      <strong>0:11 - Emergency Activated</strong>
                      <p>Location, medical profile, and crash data sent</p>
                    </div>
                    <div className="timeline-step" style={{animationDelay: '1.2s'}}>
                      <strong>0:15 - Help Dispatched</strong>
                      <p>Ambulance and police dispatched to crash location</p>
                    </div>
                  </div>
                )}

                {autoDetectAlertActive && (
                  <div className="success-alert">
                    <span className="success-icon">✅</span>
                    <h3>Automatic Emergency Alert Sent!</h3>
                    <p>No response detected - Emergency services dispatched</p>
                    <div className="alert-details">
                      <div className="detail-row">
                        <span>🔍 Detection Type:</span>
                        <span className="val">High-Impact Crash</span>
                      </div>
                      <div className="detail-row">
                        <span>📍 Crash Location:</span>
                        <span className="val">Gachibowli Flyover, Hyderabad</span>
                      </div>
                      <div className="detail-row">
                        <span>⏰ Time:</span>
                        <span className="val">Just now (Auto-detected)</span>
                      </div>
                      <div className="detail-row">
                        <span>🚑 Ambulance:</span>
                        <span className="val green">Dispatched - ETA 4 mins</span>
                      </div>
                      <div className="detail-row">
                        <span>🚓 Police:</span>
                        <span className="val green">Dispatched - ETA 5 mins</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Are You Okay Modal */}
      {showAreYouOkModal && (
        <>
          <div className="modal-overlay" onClick={() => {}}></div>
          <div className="are-you-ok-modal">
            <span className="modal-icon">⚠️</span>
            <h2>Crash Detected! Are You Okay?</h2>
            <p>Emergency services will be alerted if you don't respond</p>
            <div className="countdown-circle">{countdown}</div>
            <div className="modal-buttons">
              <button className="modal-btn ok" onClick={handleImOk}>
                I'm OK - Cancel
              </button>
              <button className="modal-btn help" onClick={handleNeedHelp}>
                I Need Help!
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FamilyEmergency;