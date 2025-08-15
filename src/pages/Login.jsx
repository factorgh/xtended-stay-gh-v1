import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { login } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Welcome back! Please log into your account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
