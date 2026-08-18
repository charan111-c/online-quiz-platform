import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

function Result() {
  const { state } = useLocation();

  if (!state) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold">No Result Found</h1>
      </div>
    );
  }

  const {
    quizTitle,
    score,
    total,
    percentage,
    questions = [],
    answers = {},
  } = state;

  const [showAnalysis, setShowAnalysis] = useState(false);

  const correctAnswers = score;
  const wrongAnswers = total - score;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-100 flex justify-center items-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-10">

        <h1 className="text-4xl font-bold text-center text-blue-700">
          🎉 Quiz Completed
        </h1>

        <p className="text-center text-gray-500 mt-2 text-lg">
          {quizTitle}
        </p>

        {/* Result Cards */}
        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-blue-100 rounded-xl p-5 text-center">
            <h2 className="text-gray-600">Score</h2>
            <p className="text-4xl font-bold text-blue-700">
              {score}/{total}
            </p>
          </div>

          <div className="bg-green-100 rounded-xl p-5 text-center">
            <h2 className="text-gray-600">Percentage</h2>
            <p className="text-4xl font-bold text-green-700">
              {percentage}%
            </p>
          </div>

          <div className="bg-emerald-100 rounded-xl p-5 text-center">
            <h2 className="text-gray-600">Correct</h2>
            <p className="text-4xl font-bold text-green-600">
              {correctAnswers}
            </p>
          </div>

          <div className="bg-red-100 rounded-xl p-5 text-center">
            <h2 className="text-gray-600">Wrong</h2>
            <p className="text-4xl font-bold text-red-600">
              {wrongAnswers}
            </p>
          </div>

        </div>

        {/* PASS / FAIL */}
        <div className="mt-10 text-center">
          {Number(percentage) >= 40 ? (
            <h2 className="text-3xl font-bold text-green-600">
              ✅ PASS
            </h2>
          ) : (
            <h2 className="text-3xl font-bold text-red-600">
              ❌ FAIL
            </h2>
          )}
        </div>

        {/* View Analysis Button */}
        {questions.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
            >
              {showAnalysis ? "Hide Analysis" : "View Analysis"}
            </button>
          </div>
        )}

        {/* Analysis */}
        {showAnalysis && (
          <div className="mt-10">

            <h2 className="text-3xl font-bold text-center mb-8">
              Question Analysis
            </h2>

            {questions.map((q, index) => {
              const userAnswer = Number(answers[q.id]);

              const correctAnswer = Number(
                q.correctOption ?? q.correct_option
              );

              return (
                <div
                  key={q.id}
                  className="border rounded-xl shadow-lg p-6 mb-8 bg-gray-50"
                >
                  <h3 className="text-xl font-bold mb-5">
                    Q{index + 1}. {q.question}
                  </h3>

                  {[1, 2, 3, 4].map((option) => {

                    let classes =
                      "border rounded-lg p-4 mb-3";

                    if (option === correctAnswer) {
                      classes +=
                        " bg-green-200 border-green-600";
                    }

                    if (
                      option === userAnswer &&
                      userAnswer !== correctAnswer
                    ) {
                      classes +=
                        " bg-red-200 border-red-600";
                    }

                    return (
                      <div
                        key={option}
                        className={classes}
                      >
                        <strong>{option}.</strong>{" "}
                        {q[`option${option}`]}
                      </div>
                    );
                  })}

                  <div className="mt-5 space-y-2">

                    <p>
                      <strong>Your Answer : </strong>
                      {userAnswer
                        ? q[`option${userAnswer}`]
                        : "Not Answered"}
                    </p>

                    <p>
                      <strong>Correct Answer : </strong>
                      {q[`option${correctAnswer}`]}
                    </p>

                    {userAnswer === correctAnswer ? (
                      <p className="text-green-600 font-bold text-lg">
                        ✔ Correct
                      </p>
                    ) : (
                      <p className="text-red-600 font-bold text-lg">
                        ✘ Wrong
                      </p>
                    )}

                  </div>
                </div>
              );
            })}

          </div>
        )}

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <Link
            to="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Result;