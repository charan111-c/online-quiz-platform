const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
    createQuiz,
    addQuestion,
    getAllQuizzes,
    getQuizById
} = require("../controllers/quizController");

// Create Quiz
router.post("/create", verifyToken, createQuiz);

// Add Question
router.post("/question", verifyToken, addQuestion);

// Get All Quizzes
router.get("/", verifyToken, getAllQuizzes);

router.get("/:id", verifyToken, getQuizById);

module.exports = router;

