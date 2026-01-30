exports.dispatchAmbulance = (req, res) => {
  const ambulanceData = {
    ambulanceId: "AMB-" + Math.floor(Math.random() * 1000),
    status: "ON_ROUTE",
    currentLocation: req.body.location || "Base Station",
    eta: "8 minutes",
  };

  console.log("🚑 Ambulance dispatched:", ambulanceData);

  res.json({
    success: true,
    message: "Ambulance dispatched",
    data: ambulanceData,
  });
};

exports.updateAmbulanceLocation = (req, res) => {
  console.log("📍 Ambulance location updated:", req.body);

  res.json({
    success: true,
    message: "Ambulance location updated",
  });
};
