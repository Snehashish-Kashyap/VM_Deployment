import React, { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Registering...");
    try {
      const res = await fetch("http://localhost:5050/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
        setFormData({ name: "", email: "", password: "" });
      } else {
        setMessage("❌ " + (data.error || "Failed to register"));
      }
    } catch (error) {
      setMessage("⚠️ Server error. Try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-green-400 p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg border border-green-700 w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-300">
          📝 Register
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />
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
            Register
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-300 font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
