import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          {/* ✨ 3D floating holographic grid */}
          <mesh rotation={[0.4, 0.3, 0]}>
            <torusKnotGeometry args={[1, 0.3, 128, 16]} />
            <meshStandardMaterial
              color="#00ff99"
              emissive="#00ff99"
              emissiveIntensity={0.6}
              wireframe
            />
          </mesh>
          {/* 🌌 Add background stars */}
          <Stars radius={100} depth={50} count={8000} factor={4} fade />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
      </Canvas>
    </div>
  );
}
