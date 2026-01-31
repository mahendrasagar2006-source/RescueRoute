import React, { useState } from 'react';
import './Demo.css';

const Demo = () => {
  const [demoActive, setDemoActive] = useState(false);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState([]);

  const steps = [
    { title: 'Emergency Triggered', icon: '🚨', time: 0 },
    { title: 'Ambulance Dispatched', icon: '🚑', time: 1500 },
    { title: 'Vehicle Alerts Sent', icon: '📳', time: 2500 },
    { title: 'Signals Turning Green', icon: '🚦', time: 3500 },
    { title: 'Hospital Notified', icon: '🏥', time: 4500 },
    { title: 'Patient Arrives', icon: '✅', time: 6000 }
  ];

  const addLog = (message) => {
    setLogs(prev => [...prev, { message, time: new Date().toLocaleTimeString() }]);
  };

  const startDemo = () => {
    setDemoActive(true);
    setStep(0);
    setLogs([]);

    steps.forEach((s, index) => {
      setTimeout(() => {
        setStep(index + 1);
        addLog(s.title);
      }, s.time);
    });

    setTimeout(() => {
      setDemoActive(false);
    }, 7000);
  };

  return (
    <div className="demo-page">
      <section className="demo-hero">
        <div className="container">
          <h1>Live Demo</h1>
          <p>Watch the entire RescueRoute system in action</p>
          <button onClick={startDemo} className="start-demo-btn" disabled={demoActive}>
            {demoActive ? '🔄 Running Demo...' : '🚀 Start 2-Minute Demo'}
          </button>
        </div>
      </section>

      <section className="demo-simulation">
        <div className="container">
          <div className="demo-grid">
            <div className="timeline-panel">
              <h2>Timeline</h2>
              <div className="timeline-steps">
                {steps.map((s, index) => (
                  <div key={index} className={`timeline-step ${step > index ? 'active' : ''} ${step === index + 1 ? 'current' : ''}`}>
                    <div className="step-icon">{s.icon}</div>
                    <div className="step-content">
                      <h4>{s.title}</h4>
                      <span>{s.time / 1000}s</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="visualization-panel">
              <div className="viz-container">
                <div className={`viz-item patient ${step >= 1 ? 'active' : ''}`}>
                  📍 Patient Location
                </div>
                <div className={`viz-item ambulance ${step >= 2 ? 'active' : ''}`}>
                  🚑 Ambulance Moving
                </div>
                <div className={`viz-item vehicles ${step >= 3 ? 'active' : ''}`}>
                  🚗 Vehicles Alerted
                </div>
                <div className={`viz-item signals ${step >= 4 ? 'active' : ''}`}>
                  🚦 Signals Green
                </div>
                <div className={`viz-item hospital ${step >= 5 ? 'active' : ''}`}>
                  🏥 Hospital Ready
                </div>
                <div className={`viz-route ${step >= 2 ? 'active' : ''}`}></div>
              </div>
            </div>

            <div className="logs-panel">
              <h2>Live Updates</h2>
              <div className="logs-container">
                {logs.length === 0 ? (
                  <p className="no-logs">Press Start Demo to begin</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="log-entry">
                      <span className="log-time">{log.time}</span>
                      <span className="log-msg">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <div className="stat-item">
              <h3>{step > 0 ? '✓' : '—'}</h3>
              <p>Emergency</p>
            </div>
            <div className="stat-item">
              <h3>{step > 1 ? '✓' : '—'}</h3>
              <p>Ambulance</p>
            </div>
            <div className="stat-item">
              <h3>{step > 2 ? '✓' : '—'}</h3>
              <p>Alerts</p>
            </div>
            <div className="stat-item">
              <h3>{step > 3 ? '✓' : '—'}</h3>
              <p>Traffic</p>
            </div>
            <div className="stat-item">
              <h3>{step > 4 ? '✓' : '—'}</h3>
              <p>Hospital</p>
            </div>
            <div className="stat-item">
              <h3>{step >= 6 ? '✓' : '—'}</h3>
              <p>Complete</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;