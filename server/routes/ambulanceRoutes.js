const express = require("express");
const {
  dispatchAmbulance,
  updateAmbulanceLocation,
} = require("../controllers/ambulanceController");

const router = express.Router();

// POST /api/ambulance/dispatch
router.post("/dispatch", dispatchAmbulance);

// POST /api/ambulance/location
router.post("/location", updateAmbulanceLocation);

module.exports = router;
