import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Allow only students
      if (response.data.user.role !== "STUDENT") {
        toast.error("Please use Admin Login.");
        return;
      }

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Student Login Successful 🎉");
      navigate("/dashboard");

    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-lg rounded-xl p-8 w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Student Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full border p-3 rounded-lg"
          />

          <div className="text-right mt-2 mb-6">
            <Link
              to="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>

          <p className="text-center mt-5">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold"
            >
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;