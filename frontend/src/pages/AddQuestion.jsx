import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function AddQuestion() {
  const { id } = useParams(); // Quiz ID from URL

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctOption: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        "/quiz/question",
        {
          quizId: id,
          ...formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(response.data.message);

      setFormData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add question");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[600px]">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Add Question
        </h1>

        <p className="text-center text-blue-600 font-semibold mb-4">
          Quiz ID: {id}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="question"
            placeholder="Question"
            value={formData.question}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="option1"
            placeholder="Option 1"
            value={formData.option1}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="option2"
            placeholder="Option 2"
            value={formData.option2}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="option3"
            placeholder="Option 3"
            value={formData.option3}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="option4"
            placeholder="Option 4"
            value={formData.option4}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <select
            name="correctOption"
            value={formData.correctOption}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          >
            <option value="">Correct Option</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddQuestion;