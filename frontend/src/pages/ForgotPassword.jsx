import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Go to Reset Password page and pass the email
    navigate("/reset-password", {
      state: { email },
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full border p-3 rounded-lg mb-5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Continue
          </button>
        </form>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;