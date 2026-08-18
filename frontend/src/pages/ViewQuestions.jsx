import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function ViewQuestions() {
  const { id } = useParams();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get(`/quiz/${id}/questions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setQuestions(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load questions");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Quiz Questions
        </h1>

        {questions.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-2xl font-semibold">
              No Questions Found
            </h2>
          </div>
        ) : (
          questions.map((q, index) => (
            <div
              key={q.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-6"
            >
              <h2 className="text-xl font-bold mb-4">
                Q{index + 1}. {q.question}
              </h2>

              <p className="mb-2">
                <strong>A.</strong> {q.option1}
              </p>

              <p className="mb-2">
                <strong>B.</strong> {q.option2}
              </p>

              <p className="mb-2">
                <strong>C.</strong> {q.option3}
              </p>

              <p className="mb-2">
                <strong>D.</strong> {q.option4}
              </p>

              <div className="mt-4 bg-green-100 border border-green-500 rounded-lg p-3">
                <p className="text-green-700 font-bold">
                  ✅ Correct Answer:{" "}
                  {q.correctOption == 1
                    ? q.option1
                    : q.correctOption == 2
                    ? q.option2
                    : q.correctOption == 3
                    ? q.option3
                    : q.option4}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewQuestions;