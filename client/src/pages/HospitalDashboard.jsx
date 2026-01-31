import React from 'react';
import './HospitalDashboard.css';
import hospitalImg from "../assets/images/hospital-room.png";
import hospitalIcon from "../assets/icons/hospital.svg";

const HospitalDashboard = () => {
  const patientData = {
    name: 'John Doe',
    age: 45,
    bloodGroup: 'O+',
    allergies: 'Penicillin',
    condition: 'Chest Pain',
    eta: '7 minutes',
    location: 'Main St & 3rd Ave'
  };

  const resources = [
    { name: 'ICU Beds', available: 3, total: 8 },
    { name: 'Operation Theaters', available: 1, total: 4 },
    { name: 'Ventilators', available: 5, total: 12 },
    { name: 'ER Doctors', available: 4, total: 6 }
  ];

  return (
    <div className="hospital-page">
      <section className="hospital-hero">
        <div className="container">
          <h1><img src={hospitalIcon} alt="Hospital icon" className="hospital-icon" /> Hospital ER Dashboard</h1>
          <p>Real-time patient data and resource status</p>
          <img src={hospitalImg} alt="Hospital" className="hospital-illustration" />
        </div>
      </section>

      <section className="hospital-dashboard">
        <div className="container">
          <div className="dashboard-layout">
            <div className="patient-card">
              <h2>Incoming Patient</h2>
              <div className="patient-grid">
                <div className="patient-item">
                  <span className="label">Patient Name:</span>
                  <span className="value">{patientData.name}</span>
                </div>
                <div className="patient-item">
                  <span className="label">Age:</span>
                  <span className="value">{patientData.age} years</span>
                </div>
                <div className="patient-item">
                  <span className="label">Blood Group:</span>
                  <span className="value blood">{patientData.bloodGroup}</span>
                </div>
                <div className="patient-item">
                  <span className="label">Allergies:</span>
                  <span className="value alert">{patientData.allergies}</span>
                </div>
                <div className="patient-item full">
                  <span className="label">Condition:</span>
                  <span className="value">{patientData.condition}</span>
                </div>
                <div className="patient-item full">
                  <span className="label">Current Location:</span>
                  <span className="value">{patientData.location}</span>
                </div>
                <div className="patient-item full eta-item">
                  <span className="label">ETA:</span>
                  <span className="value eta">{patientData.eta}</span>
                </div>
              </div>
            </div>

            <div className="resources-card">
              <h2>Resource Availability</h2>
              <div className="resources-list">
                {resources.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <div className="resource-header">
                      <span className="resource-name">{resource.name}</span>
                      <span className="resource-count">
                        {resource.available}/{resource.total}
                      </span>
                    </div>
                    <div className="resource-bar">
                      <div 
                        className="resource-fill"
                        style={{width: `${(resource.available / resource.total) * 100}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="prep-card">
              <h2>Preparation Checklist</h2>
              <div className="checklist">
                <div className="check-item done">
                  <span className="check-icon">✓</span>
                  <span>ER Team Notified</span>
                </div>
                <div className="check-item done">
                  <span className="check-icon">✓</span>
                  <span>Blood Type Verified</span>
                </div>
                <div className="check-item done">
                  <span className="check-icon">✓</span>
                  <span>ICU Bed Reserved</span>
                </div>
                <div className="check-item pending">
                  <span className="check-icon">⏳</span>
                  <span>Equipment Ready</span>
                </div>
                <div className="check-item pending">
                  <span className="check-icon">⏳</span>
                  <span>Specialist On Standby</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalDashboard;