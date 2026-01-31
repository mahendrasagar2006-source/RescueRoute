import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
//import HowItWorks from './pages/HowItWorks';
import EmergencyButton from './pages/EmergencyButton';
import VehicleAlerts from './pages/VehicleAlerts';
import TrafficDashboard from './pages/TrafficDashboard';
import HospitalDashboard from './pages/HospitalDashboard';
import AccidentHelp from './pages/AccidentHelp';
import Demo from './pages/Demo';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
           
            <Route path="/emergency" element={<EmergencyButton />} />
            <Route path="/vehicle-alerts" element={<VehicleAlerts />} />
            <Route path="/traffic" element={<TrafficDashboard />} />
            <Route path="/hospital" element={<HospitalDashboard />} />
            <Route path="/accident-help" element={<AccidentHelp />} />
            <Route path="/demo" element={<Demo />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;