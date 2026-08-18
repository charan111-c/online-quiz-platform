const Quiz = require("../models/quizModel");
const Question = require("../models/questionModel");

// ===========================
// Create Quiz
// ===========================
const createQuiz = (req, res) => {
  const { title, description } = req.body;
  const createdBy = req.user.id;

  Quiz.createQuiz(title, description, createdBy, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Quiz Creation Failed",
        error: err.message,
      });
    }

    res.status(201).json({
      message: "Quiz Created Successfully ✅",
    });
  });
};

// ===========================
// Add Question
// ===========================
const addQuestion = (req, res) => {
  const {
    quizId,
    question,
    option1,
    option2,
    option3,
    option4,
    correctOption,
  } = req.body;

  Question.addQuestion(
    quizId,
    question,
    option1,
    option2,
    option3,
    option4,
    correctOption,
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Add Question",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Question Added Successfully ✅",
      });
    }
  );
};

// ===========================
// Get All Quizzes
// ===========================
const getAllQuizzes = (req, res) => {
  Quiz.getAllQuizzes((err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Quizzes",
        error: err.message,
      });
    }

    res.status(200).json(results);
  });
};

// ===========================
// Get Quiz By ID
// ===========================
const getQuizById = (req, res) => {
  const quizId = req.params.id;

  Quiz.getQuizById(quizId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Quiz",
        error: err.message,
      });
    }

    if (!results || results.length === 0) {
      return res.status(404).json({
        message: "Quiz Not Found",
      });
    }

    const quiz = {
      id: results[0].quizId,
      title: results[0].title,
      description: results[0].description,
    };

    if (!results[0].questionId) {
      return res.status(200).json({
        quiz,
        questions: [],
      });
    }

    const questions = results.map((q) => ({
      id: q.questionId,
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctOption: q.correct_option,
    }));

    res.status(200).json({
      quiz,
      questions,
    });
  });
};

// ===========================
// Get Questions By Quiz
// ===========================
const getQuestions = (req, res) => {
  const quizId = req.params.id;

  Quiz.getQuizById(quizId, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to Fetch Questions",
        error: err.message,
      });
    }

    if (!results || results.length === 0 || !results[0].questionId) {
      return res.status(200).json([]);
    }

    const questions = results.map((q) => ({
      id: q.questionId,
      question: q.question,
      option1: q.option1,
      option2: q.option2,
      option3: q.option3,
      option4: q.option4,
      correctOption: q.correct_option,
    }));

    res.status(200).json(questions);
  });
};

// ===========================
// Dashboard Statistics
// ===========================
const getDashboardStats = (req, res) => {
  Quiz.getDashboardStats((err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to fetch dashboard statistics",
        error: err.message,
      });
    }

    res.status(200).json(results[0]);
  });
};

// ===========================
// Delete Questions
// ===========================
const deleteQuestions = (req, res) => {
  const { id } = req.params;

  Quiz.deleteQuestions(id, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete questions",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Questions deleted successfully",
    });
  });
};

// ===========================
// Delete Quiz
// ===========================
const deleteQuiz = (req, res) => {
  const quizId = req.params.id;

  Quiz.deleteQuiz(quizId, (err) => {
    if (err) {
      return res.status(500).json({
        message: "Failed to delete quiz",
        error: err.message,
      });
    }

    res.status(200).json({
      message: "Quiz Deleted Successfully ✅",
    });
  });
};

module.exports = {
  createQuiz,
  getAllQuizzes,
  getQuizById,
  addQuestion,
  getQuestions,
  getDashboardStats,
  deleteQuiz,
  deleteQuestions,
};