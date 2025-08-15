import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Register = () => {
  const { register } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await register(
        formData.name,
        formData.email,
        formData.password
      );
      if (success) {
        toast.success("Registration successful!");
        navigate("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error(error?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create an Account
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Fill in your details to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
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

          {/* Password */}
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

          {/* Role selection */}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
