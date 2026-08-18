import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  // 90 Minutes Timer
  const [timeLeft, setTimeLeft] = useState(90 * 60);

  // Submit Confirmation
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchQuiz();
  }, []);

  useEffect(() => {
    if (loading || submitted) return;

    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && questions.length > 0) {
      toast.info("Time is up! Quiz submitted automatically.");
      handleSubmitQuiz();
    }
  }, [timeLeft, loading, submitted, questions]);

  const fetchQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(`/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuiz(response.data.quiz);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  // Select Answer
  const handleAnswerSelect = (option) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: option,
    }));
  };

  // Open Confirmation Modal
  const handleSubmitClick = () => {
    setShowSubmitModal(true);
  };

  // Close Modal
  const cancelSubmit = () => {
    setShowSubmitModal(false);
  };

  // Submit Quiz
  const handleSubmitQuiz = async () => {
    if (submitted) return;

    setSubmitted(true);
    setShowSubmitModal(false);

    let score = 0;

    questions.forEach((q) => {
      if (Number(answers[q.id]) === Number(q.correctOption)) {
        score++;
      }
    });

    const percentage = (
      (score / questions.length) *
      100
    ).toFixed(2);

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/result",
        {
          quizId: quiz.id,
          score,
          totalQuestions: questions.length,
          percentage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Quiz Submitted Successfully!");

      navigate("/result", {
  state: {
    quizTitle: quiz.title,
    score,
    total: questions.length,
    percentage,
    questions,
    answers,
  },
});
    } catch (error) {
      console.error(error);
      toast.error("Failed to Save Result");
      setSubmitted(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-bold">
        Loading Quiz...
      </div>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-xl rounded-xl p-10 text-center">
          <h1 className="text-3xl font-bold text-red-600">
            No Questions Available
          </h1>

          <p className="mt-4 text-gray-600">
            This quiz doesn't have any questions yet.
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-blue-600">
              {quiz.title}
            </h1>

            <p className="text-gray-500 mt-2">
              {quiz.description}
            </p>
          </div>

          {/* Timer */}
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg text-2xl font-bold shadow-lg">
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mt-8">
          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="mt-4 font-semibold text-lg">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        {/* Question */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">
            {question.question}
          </h2>

          {[1, 2, 3, 4].map((option) => (
            <button
              key={option}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full border rounded-lg p-4 text-left mb-4 transition ${
                answers[question.id] === option
                  ? "bg-blue-600 text-white"
                  : "hover:bg-blue-100"
              }`}
            >
              {question[`option${option}`]}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-10">

          <button
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((prev) => prev - 1)
            }
            className={`px-6 py-3 rounded-lg text-white ${
              currentQuestion === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmitClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() =>
                setCurrentQuestion((prev) => prev + 1)
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
            >
              Next
            </button>
          )}

        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl shadow-xl p-6 w-96">

            <h2 className="text-2xl font-bold text-center mb-4">
              Submit Quiz
            </h2>

            <p className="text-center text-gray-600 mb-6">
              Are you sure you want to submit your exam?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={cancelSubmit}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                No
              </button>

              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Yes, Submit
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default TakeQuiz;