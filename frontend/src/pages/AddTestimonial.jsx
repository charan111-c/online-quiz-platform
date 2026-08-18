import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddTestimonial() {
  const navigate = useNavigate();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/testimonials",
        {
          rating,
          review,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 Thank you for your feedback!");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to submit testimonial"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Write a Testimonial
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block font-semibold mb-2">
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full border rounded-lg p-3"
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Very Good</option>
              <option value={3}>⭐⭐⭐ Good</option>
              <option value={2}>⭐⭐ Fair</option>
              <option value={1}>⭐ Poor</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">
              Your Review
            </label>

            <textarea
              rows="5"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share your experience with our quiz platform..."
              className="w-full border rounded-lg p-3 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTestimonial;