import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Logging in...");

    try {
      const res = await fetch("http://localhost:5050/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Save token to localStorage
        localStorage.setItem("token", data.token);
        setMessage("✅ Login successful!");
        setTimeout(() => navigate("/manage"), 1200); // redirect to Manage page
      } else {
        setMessage("❌ " + (data.error || "Invalid credentials"));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-green-700 w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-300">
          🔐 Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-300 font-medium">
            {message}
          </p>
        )}

        <p className="text-center mt-4 text-green-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-green-300 underline cursor-pointer hover:text-green-200"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
