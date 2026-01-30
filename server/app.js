const express = require("express");
const cors = require("cors");

// Import routes
const emergencyRoutes = require("./routes/emergencyRoutes");
const ambulanceRoutes = require("./routes/ambulanceRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const trafficRoutes = require("./routes/trafficRoutes");
const vehicleRoutes = require("./routes/vehicleRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/emergency", emergencyRoutes);
app.use("/api/ambulance", ambulanceRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/traffic", trafficRoutes);
app.use("/api/vehicles", vehicleRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("🚑 RescueRoute API is running");
});

module.exports = app;
