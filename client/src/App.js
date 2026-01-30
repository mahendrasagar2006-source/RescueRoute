import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import EmergencyButton from "./pages/EmergencyButton";
import VehicleAlerts from "./pages/VehicleAlerts";
import TrafficDashboard from "./pages/TrafficDashboard";
import HospitalDashboard from "./pages/HospitalDashboard";
import AccidentHelp from "./pages/AccidentHelp";
import Demo from "./pages/Demo";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/emergency" element={<EmergencyButton />} />
        <Route path="/vehicles" element={<VehicleAlerts />} />
        <Route path="/traffic" element={<TrafficDashboard />} />
        <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/accident" element={<AccidentHelp />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Router>
  );
}

export default App;
