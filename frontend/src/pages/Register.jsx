import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/auth/register", data);

      toast.success(response.data.message || "Registration Successful!");

      reset();

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            {...register("fullName")}
            placeholder="Full Name"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className="w-full border p-3 rounded mb-4"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full border p-3 rounded mb-6"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;