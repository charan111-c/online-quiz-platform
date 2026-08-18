const express = require("express");
const router = express.Router();

const {
  register,
  login,
  makeAdmin,
  makeStudent,
  resetPassword,
} = require("../controllers/authController");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Reset Password
router.put("/reset-password", resetPassword);

// Admin Routes
router.put("/make-admin", makeAdmin);
router.put("/make-student", makeStudent);

module.exports = router;