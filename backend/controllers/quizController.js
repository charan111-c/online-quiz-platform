const Question = require("../models/questionModel");
const Quiz = require("../models/quizModel");

const createQuiz = (req, res) => {

    const { title, description } = req.body;

    const createdBy = req.user.id;

    Quiz.createQuiz(title, description, createdBy, (err, result) => {

        if (err) {
            return res.status(500).json({
                message: "Quiz Creation Failed",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Quiz Created Successfully ✅"
        });

    });

};

module.exports = {
    createQuiz
};

const addQuestion = (req, res) => {

    const {
        quizId,
        question,
        option1,
        option2,
        option3,
        option4,
        correctOption
    } = req.body;

    Question.addQuestion(
        quizId,
        question,
        option1,
        option2,
        option3,
        option4,
        correctOption,
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to Add Question",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Question Added Successfully ✅"
            });

        }
    );

};

module.exports = {
    createQuiz,
    addQuestion
};

const getAllQuizzes = (req, res) => {

    Quiz.getAllQuizzes((err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to Fetch Quizzes",
                error: err.message
            });
        }

        res.status(200).json(results);

    });

};

module.exports = {
    createQuiz,
    addQuestion,
    getAllQuizzes
};
const getQuizById = (req, res) => {

    const quizId = req.params.id;

    Quiz.getQuizById(quizId, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Failed to Fetch Quiz",
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Quiz Not Found"
            });
        }

        const quiz = {
            id: results[0].quizId,
            title: results[0].title,
            description: results[0].description
        };

        const questions = results.map(q => ({
            id: q.questionId,
            question: q.question,
            option1: q.option1,
            option2: q.option2,
            option3: q.option3,
            option4: q.option4
        }));

        res.json({
            quiz,
            questions
        });

    });

};

module.exports = {
    createQuiz,
    addQuestion,
    getAllQuizzes,
    getQuizById
};