import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await api.get("/quiz", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setQuizzes(response.data);
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleLogout = () => {
    // Clear user session
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to Home page
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-blue-600 text-white flex justify-between items-center px-10 py-5 shadow-md">
        <h1 className="text-3xl font-bold">
          Online Quiz Platform
        </h1>

        <div className="flex items-center gap-4">
          {/* Home Button */}
          <Link
            to="/"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg transition"
          >
            🏠 Home
          </Link>

          {/* Leaderboard */}
          <Link
            to="/leaderboard"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg transition"
          >
            🏆 Leaderboard
          </Link>

          {/* History */}
          <Link
            to="/history"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
          >
            📜 My History
          </Link>

          {/* Write Testimonial */}
<Link
  to="/add-testimonial"
  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg transition"
>
  ✍️ Write Testimonial
</Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto p-10">
        <h2 className="text-4xl font-bold">
          Welcome {user?.fullName} 👋
        </h2>

        <p className="text-gray-600 mt-2">
          Email: {user?.email}
        </p>

        <p className="text-gray-600 mb-8">
          Role: {user?.role}
        </p>

        <h2 className="text-3xl font-bold mb-6">
          Available Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold">
              No quizzes available.
            </h3>

            <p className="text-gray-500 mt-2">
              Create quizzes from the Admin panel.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  {quiz.title}
                </h2>

                <p className="text-gray-600 mt-3 min-h-[60px]">
                  {quiz.description}
                </p>

                <Link
                  to={`/quiz/${quiz.id}`}
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  Start Quiz
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;