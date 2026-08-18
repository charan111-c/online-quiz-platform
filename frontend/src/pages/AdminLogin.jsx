import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

function AdminLogin() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Allow only admins
      if (res.data.user.role !== "ADMIN") {
        toast.error("Please use Student Login.");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Admin Login Successful 🎉");

      navigate("/admin");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center text-red-600 mb-6">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input
            type="email"
            placeholder="Admin Email"
            {...register("email", { required: true })}
            className="w-full border p-3 rounded-lg mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
            className="w-full border p-3 rounded-lg mb-6"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default AdminLogin;