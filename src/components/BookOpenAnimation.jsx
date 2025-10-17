import React, { useEffect, useState } from "react";

export default function BookOpenAnimation({ children }) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("bookAnimationPlayed");

    if (!hasPlayed) {
      setShowAnimation(true);
      sessionStorage.setItem("bookAnimationPlayed", "true");

      const t = setTimeout(() => setShowAnimation(false), 3000);
      document.body.style.overflow = "hidden";

      return () => {
        clearTimeout(t);
        document.body.style.overflow = "auto";
      };
    }
  }, []);

  if (showAnimation) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-50 flex items-center justify-center bg-black animate-fadeOut"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div style={{ width: 600, maxWidth: "90%", height: 360 }} className="relative">
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#001a00] to-[#000] rounded-xl shadow-[0_0_80px_rgba(0,255,0,0.2)]"
              style={{ transformOrigin: "left center", animation: "bookOpen 1.2s ease-out forwards" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-l from-[#001a00]/60 to-[#000]/60 rounded-xl"
              style={{ transformOrigin: "right center", animation: "bookOpenRight 1.2s 0.2s ease-out forwards" }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                color: "#bfffcf",
                fontWeight: 800,
                fontSize: 28,
                opacity: 0,
                animation: "titleFade 1s 1.3s forwards",
                textShadow: "0 0 18px rgba(0,255,0,0.2)",
              }}
            >
              ⚡ PCVerse
            </div>
          </div>
        </div>

        <style>{`
          @keyframes bookOpen {
            0% { transform: perspective(800px) rotateY(-90deg); opacity: 0; }
            60% { transform: perspective(800px) rotateY(-15deg); opacity: 1; }
            100% { transform: perspective(800px) rotateY(0deg); opacity: 1; }
          }
          @keyframes bookOpenRight {
            0% { transform: perspective(800px) rotateY(90deg); opacity: 0; }
            60% { transform: perspective(800px) rotateY(15deg); opacity: 1; }
            100% { transform: perspective(800px) rotateY(0deg); opacity: 0.65; }
          }
          @keyframes titleFade {
            0% { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeOut {
            to { opacity: 0; visibility: hidden; }
          }
          .animate-fadeOut {
            animation: fadeOut 0.5s ease 2.5s forwards;
          }
        `}</style>
      </div>
    );
  }

  // Once animation done → render the app
  return <>{children}</>;
}
