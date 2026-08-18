import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/result/leaderboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLeaders(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">
            🏆 Leaderboard
          </h1>

          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Back
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-4">Rank</th>
                <th>Name</th>
                <th>Quiz</th>
                <th>Score</th>
                <th>Percentage</th>
              </tr>
            </thead>

            <tbody>

              {leaders.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-10"
                  >
                    No Results Found
                  </td>
                </tr>
              ) : (
                leaders.map((leader, index) => (
                  <tr
                    key={index}
                    className="text-center border-b hover:bg-gray-50"
                  >
                    <td className="p-4 font-bold">
                      {index + 1}
                    </td>

                    <td>{leader.full_name}</td>

                    <td>{leader.title}</td>

                    <td>
                      {leader.score}/{leader.total_questions}
                    </td>

                    <td>{leader.percentage}%</td>
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

export default Leaderboard;