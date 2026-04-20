"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Sparkles, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { JetModel } from "./JetModel";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MINT = "#62D2A2";
const CORAL = "#F96B6B";

function SceneContent({ mouseParallax }: { mouseParallax: { x: number; y: number } }) {
  const jetGroupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  useGSAP(() => {
    // Initial entrance animation
    if (jetGroupRef.current) {
      // t=0.3 Jet rises from below (-120px Y is roughly -2 units in world space depending on scale)
      gsap.fromTo(jetGroupRef.current.position, 
        { y: -3, x: 2 }, 
        { y: 0, x: 0, duration: 1.4, ease: "expo.out", delay: 0.3 }
      );
      // X rotation from -15deg -> 0deg
      gsap.fromTo(jetGroupRef.current.rotation,
        { x: -0.26 }, // -15 degrees
        { x: 0, duration: 1.4, ease: "expo.out", delay: 0.3 }
      );
    }

    // Gentle float (looping)
    if (jetGroupRef.current) {
        gsap.to(jetGroupRef.current.position, {
            y: "+=0.15",
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        // roll oscillation (roll is Z axis in typical jet coords)
        gsap.to(jetGroupRef.current.rotation, {
            z: 0.035, // ~2 degrees
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
  }, []);

  useFrame((state) => {
    if (!jetGroupRef.current) return;

    // Mouse parallax
    const targetX = -state.mouse.x * 0.5;
    const targetY = -state.mouse.y * 0.3;

    jetGroupRef.current.position.x += (targetX - jetGroupRef.current.position.x) * 0.05;
    jetGroupRef.current.position.y += (targetY - jetGroupRef.current.position.y) * 0.05;
  });

  return (
    <>
      <PerspectiveCamera makeDefault fov={45} position={[0, 0, 8]} />
      <Environment preset="night" />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 3]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-3, -2, -4]} intensity={0.5} color={MINT} />
      
      {/* Rim light from below */}
      <pointLight position={[0, -5, -2]} intensity={5} color={MINT} distance={15} />

      <group ref={jetGroupRef}>
        <JetModel />
      </group>

      <Sparkles
        count={200}
        scale={[15, 10, 10]}
        size={1.5}
        speed={0.4}
        color={MINT}
        opacity={0.4}
      />

      <EffectComposer disableNormalPass multisampling={4}>
        <Bloom luminanceThreshold={0.8} mipmapBlur intensity={1.5} radius={0.4} />
      </EffectComposer>
    </>
  );
}

export function JetScene() {
  return (
    <Canvas
      gl={{ antialias: true, alpha: true, stencil: false, depth: true, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
    >
      <SceneContent mouseParallax={{ x: 0, y: 0 }} />
    </Canvas>
  );
}
