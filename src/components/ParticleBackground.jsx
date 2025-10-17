import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
  const particlesInit = async (main) => {
    // console.log("Initializing particles...");
    await loadFull(main);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        background: "transparent",
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: { value: "transparent" },
          },
          fpsLimit: 60,
          particles: {
            color: { value: "#00ff88" },
            links: {
              color: "#00ff88",
              distance: 140,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.7,
              direction: "none",
              outModes: "out",
            },
            number: {
              value: 60,
              density: { enable: true, area: 800 },
            },
            opacity: { value: 0.5 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 3 } },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 120, duration: 0.4 },
              push: { quantity: 4 },
            },
          },
          detectRetina: true,
        }}
      />
    </div>
  );
}
