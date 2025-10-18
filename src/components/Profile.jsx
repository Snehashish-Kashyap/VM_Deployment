import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [blogCount, setBlogCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("⚠️ Please log in to view your profile");
          window.location.href = "/login";
          return;
        }

        // ✅ Fetch user profile
        const profileRes = await fetch(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profileData = await profileRes.json();
        setUser(profileData);

        // ✅ Fetch total blogs count
        const countRes = await fetch(`${import.meta.env.VITE_API_URL}/api/pcs/my/count`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const countData = await countRes.json();
        setBlogCount(countData.total || 0);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <p className="text-center text-green-400 mt-10">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-center text-red-400 mt-10">User not found or not logged in.</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-12 bg-[#001a00]/70 border border-green-700 rounded-2xl shadow-[0_0_30px_rgba(0,255,0,0.4)] p-8 text-green-300 backdrop-blur-md">
      {/* 👤 Profile Header */}
      <h1 className="text-4xl font-extrabold text-green-400 mb-6 text-center drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]">
        👤 User Profile
      </h1>

      {/* 🧩 User Details */}
      <div className="text-center space-y-3">
        <p className="text-2xl font-bold text-green-300">
          <span className="text-green-400">Name:</span> {user.name}
        </p>
        <p className="text-xl text-green-400">
          <span className="text-green-500">Email:</span> {user.email}
        </p>
      </div>

      {/* 🧮 Stats Section */}
      <div className="mt-10 text-center">
        <div className="inline-block bg-[#002200] border border-green-600 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,255,0,0.4)]">
          <h2 className="text-2xl font-semibold text-green-400">🧩 Total Blogs Created</h2>
          <p className="text-5xl font-extrabold text-green-200 mt-3">{blogCount}</p>
        </div>
      </div>
    </div>
  );
}
