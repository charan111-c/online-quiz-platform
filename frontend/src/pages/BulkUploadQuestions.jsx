import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function BulkUploadQuestions() {
  const [file, setFile] = useState(null);
  const [quizId, setQuizId] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [uploading, setUploading] = useState(false);

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
      toast.error("Failed to load quizzes");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!quizId) {
      return toast.error("Please select a quiz.");
    }

    if (!file) {
      return toast.error("Please choose an Excel or CSV file.");
    }

    const formData = new FormData();
    formData.append("quizId", quizId);
    formData.append("file", file);

    try {
      setUploading(true);

      const token = localStorage.getItem("token");

      const res = await api.post("/upload/questions", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);

      // Reset form
      setQuizId("");
      setFile(null);

      const fileInput = document.getElementById("excelFile");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
          📂 Bulk Upload Questions
        </h1>

        <form onSubmit={handleUpload}>
          {/* Quiz Dropdown */}
          <label className="block mb-2 font-semibold text-gray-700">
            Select Quiz
          </label>

          <select
            value={quizId}
            onChange={(e) => setQuizId(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg mb-5 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="">Select Quiz</option>

            {quizzes.map((quiz) => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title}
              </option>
            ))}
          </select>

          {/* File Upload */}
          <label className="block mb-2 font-semibold text-gray-700">
            Choose Excel / CSV File
          </label>

          <input
            id="excelFile"
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border border-gray-300 p-3 rounded-lg mb-6"
            required
          />

          {/* Upload Button */}
          <button
            type="submit"
            disabled={uploading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 ${
              uploading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload Questions"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BulkUploadQuestions;