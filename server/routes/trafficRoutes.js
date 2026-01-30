const express = require("express");
const {
  activateGreenCorridor,
} = require("../controllers/trafficController");

const router = express.Router();

// POST /api/traffic/green-corridor
router.post("/green-corridor", activateGreenCorridor);

module.exports = router;
