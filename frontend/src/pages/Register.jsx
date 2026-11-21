
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, NotebookPen } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await register(form);

      toast.success("Account created successfully!");
      navigate("/dashboard");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-gray-950 px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-gray-800"
      >
        <div className="flex flex-col items-center mb-8">

          <div className="bg-indigo-600 p-3 rounded-xl text-white mb-4">
            <NotebookPen size={30} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-2 text-center">
            Start organizing your thoughts with NoteMaster.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">
              Full Name
            </label>

            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={19} />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">
              Email Address
            </label>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={19} />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium dark:text-gray-200">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={19} />

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
                className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </motion.div>
    </div>
  );
}
