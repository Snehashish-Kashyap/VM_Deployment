import React, { useState } from "react";

export default function EditPCForm({ pc, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    name: pc.name || "",
    description: pc.description || "",
    full_description: pc.full_description || "",
    price: pc.price || "",
    image_url: pc.image_url || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ You must be logged in to edit this blog!");
      return;
    }

    try {
      setMessage("⏳ Updating blog...");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/${pc.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ send JWT token
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Blog updated successfully!");
        setTimeout(() => onUpdate(), 1000);
      } else {
        setMessage("⚠️ " + (data.error || "Failed to update blog"));
      }
    } catch (err) {
      console.error("Error updating PC:", err);
      setMessage("⚠️ Server error. Try again later.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div className="bg-gray-900 border border-green-700 rounded-2xl p-6 w-11/12 sm:w-1/2 shadow-[0_0_40px_rgba(0,255,0,0.5)]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-green-400 font-bold">✏️ Edit Blog</h2>
          <button
            onClick={onCancel}
            className="text-red-500 hover:text-red-400 text-xl"
          >
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-green-300">
          <input
            name="name"
            placeholder="PC Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
            required
          />

          <input
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />

          <textarea
            name="full_description"
            placeholder="Full Description"
            value={formData.full_description}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />

          <input
            name="image_url"
            placeholder="Image URL"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-800 border border-green-600"
          />

          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition-all"
          >
            Save Changes
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-300 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
