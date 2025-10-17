import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PCGrid from "./components/PCGrid";
import ManagePCs from "./components/ManagePCs";
import PCDetails from "./components/PCDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import ParticleBackground from "./components/ParticleBackground";
import WaterEffect from "./components/WaterEffect";
import StartupAnimation from "./components/StartupAnimation";
import ThreeBackground from "./components/ThreeBackground";


export default function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [user, setUser] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({ name: decoded.name, email: decoded.email });
      } catch {
        console.error("Invalid token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("🚪 Logged out successfully!");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {showAnimation && <StartupAnimation />} {/* 🔝 Topmost */}

      <ParticleBackground /> {/* ✨ behind main UI */}
      <WaterEffect />
      <ThreeBackground /> {/* 💧 behind everything */}

      <div className="relative z-10 min-h-screen bg-gradient-to-br from-black/90 via-[#020b02]/90 to-[#001000]/90 text-green-400 overflow-hidden">
        {/* 🌟 Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring" }}
          className="sticky top-0 z-20 flex flex-col sm:flex-row items-center justify-between p-4 max-w-6xl mx-auto mt-4 
          rounded-2xl backdrop-blur-md bg-gradient-to-br from-[#001a00]/80 to-[#001a00]/40 
          border border-green-700 shadow-[0_0_25px_rgba(0,255,0,0.5)] hover:shadow-[0_0_45px_rgba(0,255,0,0.9)] 
          transition-all duration-500 transform hover:scale-[1.02]"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-extrabold text-green-300 tracking-wider drop-shadow-[0_0_25px_rgba(0,255,0,0.8)] cursor-pointer select-none"
          >
            ⚡ PC<span className="text-green-400">Verse</span>
          </motion.h1>

          <nav className="flex flex-wrap gap-4 justify-center items-center mt-3 sm:mt-0">
            <CyberButton label="🏠 Home" to="/" color="green" />
            <CyberButton label="🧠 Manage" to="/manage" color="green" />

            {!user ? (
              <>
                <CyberButton label="🔑 Login" to="/login" color="yellow" />
                <CyberButton label="🪪 Register" to="/register" color="cyan" />
              </>
            ) : (
              <>
                <motion.span
                  animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-green-300 font-semibold bg-[#003300]/40 border border-green-600 rounded-xl px-4 py-1 shadow-[0_0_25px_rgba(0,255,0,0.6)]"
                >
                  👋 Hello, <span className="text-green-100">{user.name}</span>
                </motion.span>

                <CyberButton label="⚙️ Profile" to="/profile" color="blue" />

                <motion.button
                  whileHover={{ scale: 1.05, rotateY: 10 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className="px-5 py-2 bg-gradient-to-br from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 
                  text-white font-bold rounded-xl border border-red-700 
                  shadow-[0_0_30px_rgba(255,0,0,0.7)] hover:shadow-[0_0_40px_rgba(255,0,0,1)] transition-all"
                >
                  🚪 Logout
                </motion.button>
              </>
            )}
          </nav>
        </motion.header>

        {/* 🌍 Routes */}
        <main className="max-w-6xl mx-auto p-6 relative z-10">
          <Routes>
            <Route path="/" element={<PCGrid />} />
            <Route path="/manage" element={<ManagePCs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pc/:id" element={<PCDetails />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

/* 🧠 Cyber Button Component */
function CyberButton({ label, to, color }) {
  const colors = {
    green: "from-green-700 to-green-500 hover:from-green-400 hover:to-green-300 border-green-400 shadow-[0_0_25px_rgba(0,255,0,0.5)]",
    blue: "from-blue-700 to-blue-500 hover:from-blue-500 hover:to-blue-400 border-blue-400 shadow-[0_0_25px_rgba(0,150,255,0.6)]",
    yellow: "from-yellow-600 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 border-yellow-300 shadow-[0_0_25px_rgba(255,255,0,0.6)]",
    cyan: "from-cyan-600 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 border-cyan-300 shadow-[0_0_25px_rgba(0,255,255,0.6)]",
  };

  return (
    <motion.div whileHover={{ scale: 1.08, rotateY: 10 }} whileTap={{ scale: 0.9 }}>
      <Link
        to={to}
        className={`px-5 py-2 bg-gradient-to-br ${colors[color]} border rounded-xl text-black font-semibold 
        transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,0,0.9)] transform hover:-translate-y-0.5`}
      >
        {label}
      </Link>
    </motion.div>
  );
}
