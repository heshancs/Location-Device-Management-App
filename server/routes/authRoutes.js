const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  register,
  login,
  logout,
  getUser,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post(
  "/register",
  [
    check("username", "Username is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  register
);

// Login route
router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

// Logout route
router.post("/logout", logout);
router.get("/userData", authMiddleware, getUser);

module.exports = router;
