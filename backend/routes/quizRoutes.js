const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  addQuestion,
  getQuestions,
  getDashboardStats,
  deleteQuiz,
  deleteQuestions,
} = require("../controllers/quizController");

// Create Quiz
router.post("/create", verifyToken, createQuiz);

// Add Question
router.post("/question", verifyToken, addQuestion);

// Dashboard Statistics
router.get("/dashboard/stats", verifyToken, getDashboardStats);

// Get All Quizzes
router.get("/", verifyToken, getAllQuizzes);

// Get Questions
router.get("/:id/questions", verifyToken, getQuestions);

// Delete Questions
router.delete("/:id/questions", verifyToken, deleteQuestions);

// Get Quiz
router.get("/:id", verifyToken, getQuizById);

// Delete Quiz
router.delete("/:id", verifyToken, deleteQuiz);

module.exports = router;