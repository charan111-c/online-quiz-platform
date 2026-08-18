import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/result/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          📜 My Quiz History
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg"
        >
          ⬅ Back to Dashboard
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4">Quiz</th>
              <th>Score</th>
              <th>Percentage</th>
              <th>Status</th>
              <th>Date</th>
            </tr>

          </thead>

          <tbody>

            {history.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-8 text-gray-500"
                >
                  No Quiz History Found
                </td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr
                  key={index}
                  className="text-center border-b hover:bg-gray-50"
                >
                  <td className="p-4 font-semibold">
                    {item.title}
                  </td>

                  <td>
                    {item.score}/{item.total_questions}
                  </td>

                  <td>
                    {item.percentage}%
                  </td>

                  <td>
                    {item.percentage >= 40 ? (
                      <span className="text-green-600 font-bold">
                        ✅ Pass
                      </span>
                    ) : (
                      <span className="text-red-600 font-bold">
                        ❌ Fail
                      </span>
                    )}
                  </td>

                  <td>
                    {new Date(item.submitted_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default History;