import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function StudentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/users/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudent(res.data.student);
      setHistory(res.data.history);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load student details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!student) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Student Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/students")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            ← Back
          </button>

          <h1 className="text-4xl font-bold text-blue-700">
            Student Profile
          </h1>

          <div></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-6">
            Student Information
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500">Student ID</p>
              <h3 className="text-xl font-semibold">
                {student.id}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Full Name</p>
              <h3 className="text-xl font-semibold">
                {student.full_name}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <h3 className="text-xl font-semibold">
                {student.email}
              </h3>
            </div>

            <div>
              <p className="text-gray-500">Role</p>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                {student.role}
              </span>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Quizzes Attempted
            </h3>

            <h1 className="text-4xl font-bold text-blue-600 mt-3">
              {student.quizzesAttempted}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Total Correct
            </h3>

            <h1 className="text-4xl font-bold text-green-600 mt-3">
              {student.totalCorrectAnswers}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Total Wrong
            </h3>

            <h1 className="text-4xl font-bold text-red-600 mt-3">
              {student.totalWrongAnswers}
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Average Score
            </h3>

            <h1 className="text-4xl font-bold text-indigo-600 mt-3">
              {student.averageScore ?? 0}%
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Highest Score
            </h3>

            <h1 className="text-4xl font-bold text-yellow-500 mt-3">
              {student.highestScore}%
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <h3 className="text-gray-500">
              Last Attempt
            </h3>

            <h2 className="text-lg font-bold mt-3">
              {student.lastAttempt
                ? new Date(student.lastAttempt).toLocaleString()
                : "No Attempts"}
            </h2>
          </div>

        </div>

        {/* Quiz History */}

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <div className="bg-blue-600 text-white p-5 text-2xl font-bold">
            Quiz History
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4">Quiz</th>
                <th className="p-4">Score</th>
                <th className="p-4">Percentage</th>
                <th className="p-4">Submitted At</th>

              </tr>

            </thead>

            <tbody>

              {history.length === 0 ? (

                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-8 text-gray-500"
                  >
                    No Quiz History
                  </td>

                </tr>

              ) : (

                history.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-4">
                      {item.title}
                    </td>

                    <td className="p-4">
                      {item.score}/{item.total_questions}
                    </td>

                    <td className="p-4">
                      {item.percentage}%
                    </td>

                    <td className="p-4">
                      {new Date(item.submitted_at).toLocaleString()}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default StudentDetails;