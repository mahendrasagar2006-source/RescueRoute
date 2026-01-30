const express = require("express");
const {
  sendVehicleAlert,
  updateRescueScore,
} = require("../controllers/vehicleController");

const router = express.Router();

// POST /api/vehicles/alert
router.post("/alert", sendVehicleAlert);

// POST /api/vehicles/score
router.post("/score", updateRescueScore);

module.exports = router;
