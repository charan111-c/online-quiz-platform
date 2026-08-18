import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8">

        <h1 className="text-6xl font-bold leading-tight">
          Practice.
          <br />
          Learn.
          <br />
          Get Hired 🚀
        </h1>

        <p className="mt-6 text-xl text-gray-100 max-w-2xl">
          Improve your programming skills by solving quizzes,
          tracking your progress, and competing with others.
        </p>

        <div className="mt-10 flex flex-wrap gap-5">

          {/* Always Go to Login */}
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:scale-105 duration-300"
          >
            Start Quiz
          </Link>

          {/* Learn More */}
          <a
            href="#features"
            className="border border-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 duration-300"
          >
            Learn More
          </a>

        </div>

      </div>
    </section>
  );
}

export default Hero;