import React, { useState } from "react";
import { motion } from "framer-motion";

export default function StartupAnimation() {
  const [phase, setPhase] = useState("waiting"); // "waiting" → "booting" → "done"

  const handleStart = () => {
    setPhase("booting");

    // 🎵 Boot sound for 4 sec
    const audio = new Audio("/sounds/my-boot-sound.mp3");
    audio.volume = 0.6;
    audio.play().catch(() => console.warn("🔇 Autoplay blocked"));
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 4000); // sound duration 4s

    // 💻 Keep animation visible for 12 seconds
    setTimeout(() => {
      setPhase("done");
    }, 12000);
  };

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black text-green-400">
      {/* 🌐 Matrix-style animated grid background */}
      <div className="absolute inset-0 bg-[#000d00] overflow-hidden">
        <div className="cyber-grid"></div>
      </div>

      {/* ⚡ TAP to Power On */}
      {phase === "waiting" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 cursor-pointer"
          onClick={handleStart}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="text-4xl font-bold drop-shadow-[0_0_30px_rgba(0,255,0,0.9)]"
          >
            ⚡ Tap to Power On PCVerse
          </motion.div>
          <p className="text-green-300 mt-3 text-sm">Enable sound & animation</p>
        </div>
      )}

      {/* 💻 BOOTING Animation (12 sec cinematic slow mode) */}
      {phase === "booting" && (
        <>
          {/* 🌊 Slow ripples */}
          <motion.div
            className="absolute w-72 h-72 rounded-full border-4 border-green-400 opacity-70"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 4, 7], opacity: [1, 0.5, 0] }}
            transition={{ duration: 12, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-72 h-72 rounded-full border-2 border-green-500 opacity-50"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 3.5, 6.5], opacity: [1, 0.5, 0] }}
            transition={{ duration: 12, delay: 1, ease: "easeOut" }}
          />

          {/* ⚡ Central logo */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1
              animate={{
                opacity: [0, 1, 1, 1, 0.8, 0],
                y: [30, 0, 0, 0, -10],
              }}
              transition={{ duration: 12, ease: "easeInOut" }}
              className="text-green-400 text-6xl font-extrabold tracking-[0.15em] drop-shadow-[0_0_40px_rgba(0,255,0,0.9)]"
            >
              ⚡ PCVerse
            </motion.h1>

            <motion.p
              animate={{
                opacity: [0, 1, 1, 1, 0.8, 0],
              }}
              transition={{ duration: 12, delay: 0.5, ease: "easeInOut" }}
              className="text-green-300 text-lg mt-4 tracking-widest"
            >
              System Booting... 💻
            </motion.p>
          </motion.div>

          {/* 🌗 Slow glow fade-out */}
          <motion.div
            className="absolute inset-0 bg-green-500/10 blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* 🕶️ Fade to black at end */}
          <motion.div
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0, 1] }}
            transition={{ duration: 12, ease: "easeInOut" }}
          />
        </>
      )}

      {/* 🧩 Background grid effect */}
      <style>{`
        .cyber-grid {
          position: absolute;
          width: 250%;
          height: 250%;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(0, 255, 0, 0.08) 0px,
              rgba(0, 255, 0, 0.08) 1px,
              transparent 1px,
              transparent 60px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(0, 255, 0, 0.08) 0px,
              rgba(0, 255, 0, 0.08) 1px,
              transparent 1px,
              transparent 60px
            );
          animation: gridDrift 10s linear infinite;
          filter: drop-shadow(0 0 25px rgba(0,255,0,0.4));
          transform: rotateX(40deg) translateZ(-50px);
        }

        @keyframes gridDrift {
          0% { transform: rotateX(40deg) translateY(0); }
          50% { transform: rotateX(42deg) translateY(-30px); }
          100% { transform: rotateX(40deg) translateY(0); }
        }
      `}</style>
    </div>
  );
}
