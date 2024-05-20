const express = require("express");
const router = express.Router();
const {
  createDevice,
  getDevices,
  getDevice,
  updateDevice,
  deleteDevice,
} = require("../controllers/deviceController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new device for a location
router.post("/:locationId/devices", authMiddleware, createDevice);

// Get all devices for a location
router.get("/:locationId/devices", authMiddleware, getDevices);

// Get a single device by ID
router.get("/:locationId/devices/:id", authMiddleware, getDevice);

// Update a device by ID
router.put("/:locationId/devices/:id", authMiddleware, updateDevice);

// Delete a device by ID
router.delete("/:locationId/devices/:id", authMiddleware, deleteDevice);

module.exports = router;
