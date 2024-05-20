const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,
} = require("../controllers/locationController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new location
router.post(
  "/",
  authMiddleware,
  [
    check("title", "Title is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
  ],
  createLocation
);

// Get all locations for a user
router.get("/", authMiddleware, getLocations);

// Get a single location by ID
router.get("/:id", authMiddleware, getLocation);

// Update a location by ID
router.put(
  "/:id",
  authMiddleware,
  [
    check("title", "Title is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("status", "Status must be either Active or Inactive").isIn([
      "Active",
      "Inactive",
    ]),
  ],
  updateLocation
);

// Delete a location by ID
router.delete("/:id", authMiddleware, deleteLocation);

module.exports = router;
