const express = require("express");
const {
  prepareHospital,
} = require("../controllers/hospitalController");

const router = express.Router();

// POST /api/hospital/prepare
router.post("/prepare", prepareHospital);

module.exports = router;
