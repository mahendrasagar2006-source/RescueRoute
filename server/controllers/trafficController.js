exports.activateGreenCorridor = (req, res) => {
  const trafficUpdate = {
    corridorId: "GREEN-" + Date.now(),
    signals: ["Signal-A", "Signal-B", "Signal-C"],
    status: "GREEN",
  };

  console.log("🚦 Green corridor activated:", trafficUpdate);

  res.json({
    success: true,
    message: "Traffic signals turned GREEN",
    data: trafficUpdate,
  });
};
