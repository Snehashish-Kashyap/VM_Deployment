import React from "react";

export default function WaterEffect() {
  return (
    <div className="fixed inset-0 z-[0] pointer-events-none overflow-hidden">
      {/* Base tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#001100] via-[#001a00] to-black opacity-60"></div>

      {/* Ripple pattern layer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/waves.png')] opacity-20 mix-blend-soft-light animate-smooth-ripple"></div>

      {/* Glow shimmer layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,150,0.1),transparent_70%)] blur-md mix-blend-screen"></div>

      <style>{`
        @keyframes smoothRipple {
          0% {
            background-position: 0% 0%;
            transform: scale(1);
            opacity: 0.25;
          }
          50% {
            background-position: 100% 100%;
            transform: scale(1.05);
            opacity: 0.35;
          }
          100% {
            background-position: 0% 0%;
            transform: scale(1);
            opacity: 0.25;
          }
        }

        .animate-smooth-ripple {
          background-size: 300% 300%;
          animation: smoothRipple 20s ease-in-out infinite;
          filter: blur(8px) brightness(1.3);
        }
      `}</style>
    </div>
  );
}
