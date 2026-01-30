exports.sendVehicleAlert = (req, res) => {
  const alertData = {
    alertType: "AMBULANCE_APPROACHING",
    radius: "1.5 km",
    vibration: true,
    sound: true,
  };

  console.log("🚗 Vehicle alert sent:", alertData);

  res.json({
    success: true,
    message: "Vehicle alert broadcasted",
    data: alertData,
  });
};

exports.updateRescueScore = (req, res) => {
  const scoreUpdate = {
    vehicleId: req.body.vehicleId || "UNKNOWN",
    action: req.body.action || "NO_ACTION",
    scoreChange: req.body.score || 0,
  };

  console.log("🏆 Rescue score updated:", scoreUpdate);

  res.json({
    success: true,
    message: "Rescue score updated",
    data: scoreUpdate,
  });
};
