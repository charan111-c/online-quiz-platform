import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function ManageQuiz() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/quiz", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuizzes(res.data);
    } catch (err) {
      toast.error("Failed to fetch quizzes");
    }
  };

  const deleteQuestions = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete all questions in this quiz?"
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/quiz/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("All questions deleted successfully");

      fetchQuizzes();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete questions");
    }
  };

  const deleteQuiz = async (id) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Quiz deleted successfully");

      fetchQuizzes();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10">
          Manage Quizzes
        </h1>

        {quizzes.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h2 className="text-2xl font-semibold">
              No quizzes available
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  {quiz.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  {quiz.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <Link
                    to={`/view-questions/${quiz.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View Questions
                  </Link>

                  <Link
                    to={`/add-question/${quiz.id}`}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    Add Question
                  </Link>

                  <button
                    onClick={() => deleteQuestions(quiz.id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  >
                    Delete Questions
                  </button>

                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete Quiz
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default ManageQuiz;