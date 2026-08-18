function QuizCard({ quiz }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <h2 className="text-2xl font-bold text-blue-600">
        {quiz.title}
      </h2>

      <p className="text-gray-600 mt-3">
        {quiz.description}
      </p>

      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Start Quiz
      </button>

    </div>
  );
}

export default QuizCard;