import React, { useEffect } from "react";

export default function BubbleBackground() {
  useEffect(() => {
    const canvas = document.getElementById("bubbleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Set full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 💫 Create 40 floating bubbles
    const bubbles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 20 + 5,
      speed: Math.random() * 1 + 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      drift: (Math.random() - 0.5) * 0.5, // small side drift
      color: getRandomColor(),
    }));

    // 🌈 Random color for cyber glow
    function getRandomColor() {
      const colors = [
        "rgba(0,255,0,", // neon green
        "rgba(0,255,255,", // cyan
        "rgba(57,255,20,", // lime
        "rgba(100,255,218,", // teal
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach((b) => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

        // ✨ Glowing bubble style
        ctx.fillStyle = `${b.color}${b.opacity})`;
        ctx.shadowColor = b.color.replace("rgba", "rgb").replace(",", "").split("(")[1];
        ctx.shadowBlur = 15;
        ctx.globalCompositeOperation = "lighter";

        ctx.fill();

        // 🫧 Move bubble upward and sideways
        b.y -= b.speed;
        b.x += b.drift;

        // Reset when off screen
        if (b.y + b.radius < 0) {
          b.y = canvas.height + b.radius;
          b.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(draw);
    }

    draw();

    // 🎯 Resize dynamically
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      id="bubbleCanvas"
      className="fixed top-0 left-0 w-full h-full -z-10"
    ></canvas>
  );
}
