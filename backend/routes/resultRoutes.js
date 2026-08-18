const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  saveResult,
  getLeaderboard,
  getUserResults,
} = require("../controllers/resultController");

// Save quiz result
router.post("/", verifyToken, saveResult);

// Leaderboard
router.get("/leaderboard", verifyToken, getLeaderboard);

// User quiz history
router.get("/history", verifyToken, getUserResults);

module.exports = router;