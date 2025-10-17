import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/pcs`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load blog details");
        setBlog(data);
      } catch (err) {
        console.error("Error loading blog:", err);
        setError("❌ Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-green-400 mt-10 text-lg">
        ⏳ Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 mt-10 text-lg">
        {error}
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-[#001a00]/70 p-6 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.3)] border border-green-700">
      <h1 className="text-3xl font-extrabold text-green-300 mb-4">
        {blog.name}
      </h1>
      <p className="text-green-400 mb-3">By: {blog.owner_name}</p>
      {blog.image_url && (
        <img
          src={`http://localhost:5050${blog.image_url}`}
          alt={blog.name}
          className="w-full h-64 object-cover rounded-lg border border-green-700 mb-4"
        />
      )}
      <p className="text-green-200 mb-2">{blog.description}</p>
      <p className="text-green-100 mt-4 whitespace-pre-line">
        {blog.full_description}
      </p>
    </div>
  );
}
