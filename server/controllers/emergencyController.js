const { emitEmergencyUpdate } = require("../sockets/rescueSocket");

exports.triggerEmergency = (req, res) => {
  const emergencyData = {
    id: Date.now(),
    type: "MEDICAL_EMERGENCY",
    location: req.body.location || "Unknown",
    patient: {
      bloodGroup: req.body.bloodGroup || "Unknown",
      allergies: req.body.allergies || "None",
      medicalHistory: req.body.medicalHistory || "Not provided",
    },
    status: "AMBULANCE_DISPATCHED",
    time: new Date().toISOString(),
  };

  console.log("🚨 Emergency triggered:", emergencyData);

  // Notify all systems (vehicles, hospital, traffic)
  emitEmergencyUpdate(emergencyData);

  res.status(200).json({
    success: true,
    message: "Emergency processed successfully",
    data: emergencyData,
  });
};
