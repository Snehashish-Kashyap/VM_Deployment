import React, { useState } from "react";

export default function AddPCForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    full_description: "",
    price: "",
    image_url: "",
  });

  const [message, setMessage] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please login to add your blog!");
      return;
    }

    try {
      setMessage("⏳ Adding blog...");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Send JWT token
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Blog added successfully!");
        setFormData({
          name: "",
          description: "",
          full_description: "",
          price: "",
          image_url: "",
        });
        onAdd(); // refresh PC list after add
      } else {
        setMessage("⚠️ " + (data.error || "Failed to add blog"));
      }
    } catch (err) {
      console.error("Error adding PC:", err);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="text-green-300">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-green-300 bg-gray-900 border border-green-700 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,0,0.3)]"
      >
        <input
          name="name"
          placeholder="PC Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          name="description"
          placeholder="Short Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
        />

        <textarea
          name="full_description"
          placeholder="Full Description (Detailed specs, features, etc.)"
          value={formData.full_description}
          onChange={handleChange}
          rows="4"
          className="w-full p-2 rounded bg-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
        />

        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
        />

        <input
          name="image_url"
          placeholder="Image URL (https://...)"
          value={formData.image_url}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 border border-green-600 focus:ring-2 focus:ring-green-400"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded-lg transition-all shadow-[0_0_15px_rgba(0,255,0,0.5)]"
        >
          ➕ Add Blog
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-green-400 font-medium">{message}</p>
      )}
    </div>
  );
}
