exports.prepareHospital = (req, res) => {
  const hospitalStatus = {
    hospitalId: "HOSP-101",
    erStatus: "READY",
    icuStatus: "PREPARED",
    doctorAssigned: true,
    etaReceived: req.body.eta || "Unknown",
  };

  console.log("🏥 Hospital prepared:", hospitalStatus);

  res.json({
    success: true,
    message: "Hospital ER prepared in advance",
    data: hospitalStatus,
  });
};
