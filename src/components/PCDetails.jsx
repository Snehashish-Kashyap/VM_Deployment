import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PCDetails() {
  const { id } = useParams();
  const [pc, setPc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPc = async () => {
      try {
        const res = await fetch(`/api/pcs/${id}`);

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load blog details");
        setPc(data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("❌ Failed to load blog details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPc();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-green-400 mt-10 text-lg">
        ⏳ Loading blog details...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-400 mt-10 text-lg">{error}</div>
    );

  if (!pc)
    return (
      <div className="text-center text-yellow-400 mt-10 text-lg">
        ⚠️ Blog not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-[#001a00]/70 p-8 rounded-lg border border-green-700 
                    shadow-[0_0_25px_rgba(0,255,0,0.3)] text-green-100">

      {/* ✅ Blog Title */}
      <h1 className="text-4xl font-extrabold text-green-300 mb-2 text-center">
        {pc.name}
      </h1>

      {/* ✅ Owner */}
      <p className="text-center text-green-400 mb-5">
        👤 Written by <span className="font-semibold">{pc.owner_name}</span>
      </p>

      {/* ✅ Blog Image */}
      {pc.image_url && (
        <img
          src={
            pc.image_url.startsWith("http")
              ? pc.image_url
              : `${import.meta.env.VITE_API_URL}${pc.image_url}`


          }
          alt={pc.name}
          className="w-full h-72 object-cover rounded-lg border border-green-800 mb-6 shadow-[0_0_20px_rgba(0,255,0,0.2)]"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/600x400?text=Image+Not+Available";
          }}
        />
      )}

      {/* ✅ Short Description */}
      <p className="text-lg text-green-200 mb-6 leading-relaxed text-center px-3">
        {pc.description}
      </p>

      {/* ✅ Full Description */}
      <div className="bg-black/50 p-5 rounded-md border border-green-800 overflow-y-auto max-h-[400px]">
        <p className="whitespace-pre-line text-green-100 leading-relaxed text-justify">
          {pc.full_description}
        </p>
      </div>

      {/* ✅ Back Button */}
      <div className="text-center mt-8">
        <Link
          to="/"
          className="px-6 py-2 bg-green-500 text-black font-semibold rounded-md 
                     hover:bg-green-400 transition-all duration-300"
        >
          🔙 Back to Home
        </Link>
      </div>
    </div>
  );
}
