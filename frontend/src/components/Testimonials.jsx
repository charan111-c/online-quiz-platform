import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../services/api";

function Testimonials() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get("/testimonials");
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to load testimonials", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-14">
          What Our Users Say
        </h2>

        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">
            No testimonials available.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">

            {reviews.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl p-8 shadow-lg hover:shadow-xl transition"
              >
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-gray-600 italic">
                  "{item.review}"
                </p>

                <h3 className="mt-6 text-xl font-bold">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.role}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}

export default Testimonials;