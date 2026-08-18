import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/quiz/create",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setTitle("");
      setDescription("");

      // Redirect to Admin Dashboard
      navigate("/admin");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create quiz"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-lg rounded-xl p-8 w-[500px]">

        {/* Back Button */}
        <button
          onClick={() => navigate("/admin")}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800 font-semibold"
        >
          ← Back to Admin Dashboard
        </button>

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Quiz
        </h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-3 rounded-lg mb-4"
            required
          />

          <textarea
            placeholder="Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg mb-6"
            rows="4"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Quiz
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateQuiz;