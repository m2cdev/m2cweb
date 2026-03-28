"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 120 }) {
  const mesh = useRef();
  const mouse = useRef([0, 0]);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      temp.push({ x, y, z, vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (Math.abs(p.x) > 1000) p.x *= -0.9;
      if (Math.abs(p.y) > 1000) p.y *= -0.9;

      // Mouse interaction (repel)
      const dx = p.x - state.mouse.x * 1000;
      const dy = p.y - state.mouse.y * 1000;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx += dx / dist * 0.05;
        p.vy += dy / dist * 0.05;
      }

      dummy.position.set(p.x, p.y, p.z);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[2, 8, 8]} />
      <meshBasicMaterial color="#62D2A2" transparent opacity={0.6} />
    </instancedMesh>
  );
}

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1000], fov: 75 }}>
        <Particles />
      </Canvas>
    </div>
  );
}
