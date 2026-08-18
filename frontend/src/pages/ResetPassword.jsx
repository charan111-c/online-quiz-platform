import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await api.put("/auth/reset-password", {
        email,
        newPassword,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to reset password"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Registered Email"
            className="w-full border p-3 rounded-lg mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border p-3 rounded-lg mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border p-3 rounded-lg mb-5"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;