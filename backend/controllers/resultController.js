const Result = require("../models/resultModel");

const saveResult = (req, res) => {
  const userId = req.user.id;

  const {
    quizId,
    score,
    totalQuestions,
    percentage,
  } = req.body;

  Result.saveResult(
    userId,
    quizId,
    score,
    totalQuestions,
    percentage,
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to Save Result",
          error: err.message,
        });
      }

      res.status(201).json({
        message: "Result Saved Successfully",
      });
    }
  );
};

const getLeaderboard = (req, res) => {

  Result.getLeaderboard((err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(results);

  });

};

module.exports = {
  saveResult,
  getLeaderboard,
};

const getUserResults = (req, res) => {

  Result.getUserResults(req.user.id, (err, results) => {

    if (err) {
      return res.status(500).json({
        message: "Server Error",
      });
    }

    res.json(results);

  });

};

module.exports = {
  saveResult,
  getLeaderboard,
  getUserResults,
};