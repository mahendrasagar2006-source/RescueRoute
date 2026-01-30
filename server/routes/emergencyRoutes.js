const express = require("express");
const {
  triggerEmergency,
} = require("../controllers/emergencyController");

const router = express.Router();

// POST /api/emergency
router.post("/", triggerEmergency);

module.exports = router;
