import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    totalStudents: 0,
    totalAttempts: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/quiz/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully 👋");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-red-600 text-white flex justify-between items-center px-10 py-5 shadow-lg">

        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="text-red-100">
            Welcome {user?.fullName}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-white text-red-600 px-5 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Logout
        </button>

      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-10 px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Admin Panel
        </h2>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          <div className="bg-blue-600 text-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-5xl font-bold">
              {stats.totalQuizzes}
            </h2>

            <p className="mt-3 text-lg">
              📚 Total Quizzes
            </p>
          </div>

          <div className="bg-green-600 text-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-5xl font-bold">
              {stats.totalQuestions}
            </h2>

            <p className="mt-3 text-lg">
              ❓ Total Questions
            </p>
          </div>

          <div className="bg-purple-600 text-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-5xl font-bold">
              {stats.totalStudents}
            </h2>

            <p className="mt-3 text-lg">
              👨‍🎓 Total Students
            </p>
          </div>

          <div className="bg-red-600 text-white rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-5xl font-bold">
              {stats.totalAttempts}
            </h2>

            <p className="mt-3 text-lg">
              📝 Quiz Attempts
            </p>
          </div>

        </div>

        {/* Dashboard Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">

          {/* Create Quiz */}
          <Link
            to="/create-quiz"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              ➕ Create Quiz
            </h2>

            <p className="text-gray-600">
              Create new quizzes for students.
            </p>
          </Link>

          {/* Manage Quiz */}
          <Link
            to="/manage-quiz"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-purple-600 mb-4">
              📚 Manage Quizzes
            </h2>

            <p className="text-gray-600">
              View quizzes, add questions, edit questions and delete quizzes.
            </p>
          </Link>

          {/* Bulk Upload Questions */}
          <Link
            to="/bulk-upload"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              📂 Bulk Upload Questions
            </h2>

            <p className="text-gray-600">
              Upload hundreds of questions at once using an Excel (.xlsx) or CSV
              file.
            </p>
          </Link>

          {/* Students */}
          <Link
            to="/students"
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              👨‍🎓 Students
            </h2>

            <p className="text-gray-600">
              View all registered students.
            </p>
          </Link>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;