import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-5">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-blue-600"
        >
          QuizPlatform
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-5">

          {/* Student Login */}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Student Login
          </Link>

          {/* Student Register */}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            Register
          </Link>

          {/* Admin Login */}
          <Link
            to="/admin-login"
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Admin Login
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;