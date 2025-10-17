import React, { useEffect, useState } from "react";

export default function PCGrid() {
  const [pcs, setPcs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("all"); // 👈 new toggle state ("all" | "mine")

  const token = localStorage.getItem("token");

  // 🧠 Fetch function (reusable)
  const fetchPCs = async () => {
    setLoading(true);
    setError("");

    try {
      const url =
        view === "mine"
          ? "http://localhost:5050/api/pcs/my"
          : "http://localhost:5050/api/pcs";

      const headers =
        view === "mine"
          ? { Authorization: `Bearer ${token}` }
          : {};

      const res = await fetch(url, { headers });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to load blogs");
      setPcs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("❌ Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPCs();
    // eslint-disable-next-line
  }, [view]);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      {/* 🟩 Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setView("all")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            view === "all"
              ? "bg-green-500 text-black shadow-[0_0_20px_rgba(0,255,0,0.5)]"
              : "bg-black/50 text-green-400 border border-green-700 hover:bg-green-700/20"
          }`}
        >
          🌍 All Blogs
        </button>

        <button
          onClick={() => setView("mine")}
          className={`px-5 py-2 rounded-lg font-semibold transition-all ${
            view === "mine"
              ? "bg-blue-500 text-black shadow-[0_0_20px_rgba(0,150,255,0.5)]"
              : "bg-black/50 text-blue-400 border border-blue-700 hover:bg-blue-700/20"
          }`}
        >
          👤 My Blogs
        </button>
      </div>

      {/* 🧩 Content */}
      {loading ? (
        <div className="text-center text-green-400 mt-10 text-lg">
          ⏳ Loading blogs...
        </div>
      ) : error ? (
        <div className="text-center text-red-400 mt-10 text-lg">{error}</div>
      ) : pcs.length === 0 ? (
        <div className="text-center text-green-400 mt-10 text-lg">
          {view === "mine"
            ? "You haven’t created any blogs yet."
            : "No blogs found."}
        </div>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pcs.map((pc) => (
            <div
              key={pc.id}
              className="p-5 rounded-xl bg-black/60 border border-green-700 
                         shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.6)] 
                         transition-transform hover:scale-[1.03] flex flex-col justify-between"
            >
              {pc.image_url && (
                <img
                  src={
                    pc.image_url.startsWith("http")
                      ? pc.image_url
                      : `http://localhost:5050${pc.image_url}`
                  }
                  alt={pc.name}
                  className="w-full h-48 object-cover rounded-md mb-4 border border-green-800"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x300?text=No+Image";
                  }}
                />
              )}

              <div className="flex-grow">
                <h2 className="text-2xl font-bold text-green-300 mb-2 truncate">
                  {pc.name}
                </h2>
                <p className="text-green-200 mb-3 line-clamp-3 overflow-hidden text-ellipsis">
                  {pc.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-auto pt-2 border-t border-green-800">
                <span className="text-sm text-green-400 truncate">
                  👤 {pc.owner_name || "Unknown"}
                </span>

                {/* 🔗 Open in new tab */}
                <a
                  href={`http://localhost:5173/pc/${pc.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 text-black font-semibold rounded-md 
                            hover:bg-green-400 transition-all whitespace-nowrap"
                >
                  🔍 View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
