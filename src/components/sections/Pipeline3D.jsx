"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const MINT = "#62D2A2";
const DARK_METAL = "#2a3530";

// Nodes are spaced 70 units apart so clipping hides inactive ones
const NODE_Y = [70, 0, -70];

// ─── SERVICE NODE ────────────────────────────────────────────
// Identical mechanical seal for every service junction.
// Driven ONLY by the junction's scroll progress via window global.
function ServiceNode({ positionY, clippingPlanes, junctionIndex }) {
  const leftSeal = useRef();
  const rightSeal = useRef();
  const leftRail = useRef();
  const rightRail = useRef();
  const mechanism = useRef();
  const coreGlow = useRef();

  useFrame(() => {
    const p = (typeof window !== "undefined") ? (window[`m2c_junction_${junctionIndex}`] || 0) : 0;

    // YOUR EXACT SEQUENCE:
    // 0.0 → 0.3:  OPENS  (seal splits, rails spread)
    // 0.3 → 0.5:  PAUSED (fully open, text still hidden)
    // 0.5 → 0.85: TEXT   (handled by ServiceJunction.jsx)
    // 0.85→ 0.9:  TEXT FADES (text going away)
    // 0.9 → 1.0:  CLOSES (seal re-joins)

    const openRamp = THREE.MathUtils.smoothstep(p, 0.0, 0.3);
    const closeRamp = 1 - THREE.MathUtils.smoothstep(p, 0.9, 1.0);
    const openT = openRamp * closeRamp;

    // Seal halves split apart
    if (leftSeal.current) leftSeal.current.position.x = -openT * 8;
    if (rightSeal.current) rightSeal.current.position.x = openT * 8;

    // Rails spread wider
    if (leftRail.current) leftRail.current.position.x = -openT * 10;
    if (rightRail.current) rightRail.current.position.x = openT * 10;

    // Internal mechanism glow
    if (mechanism.current) {
      mechanism.current.material.emissiveIntensity = openT * 12;
      mechanism.current.material.opacity = openT;
    }

    // Core energy cylinder
    if (coreGlow.current) {
      coreGlow.current.scale.set(openT, 1, openT);
      coreGlow.current.material.opacity = openT;
    }
  });

  return (
    <group position={[0, positionY, 0]}>
      {/* Mechanical Seal — two half-cylinders that split apart */}
      <mesh ref={leftSeal}>
        <cylinderGeometry args={[4.2, 4.2, 3, 32, 1, false, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} roughness={0.1} clippingPlanes={clippingPlanes} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightSeal}>
        <cylinderGeometry args={[4.2, 4.2, 3, 32, 1, false, -Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} roughness={0.1} clippingPlanes={clippingPlanes} side={THREE.DoubleSide} />
      </mesh>

      {/* Internal locking ring */}
      <mesh ref={mechanism} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.8, 0.12, 16, 64]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={0} transparent opacity={0} clippingPlanes={clippingPlanes} />
      </mesh>

      {/* Heavy Rails */}
      <mesh ref={leftRail}>
        <boxGeometry args={[1.6, 18, 4.2]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} roughness={0.05} clippingPlanes={clippingPlanes} />
      </mesh>
      <mesh ref={rightRail}>
        <boxGeometry args={[1.6, 18, 4.2]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} roughness={0.05} clippingPlanes={clippingPlanes} />
      </mesh>

      {/* Core Energy Cylinder */}
      <mesh ref={coreGlow}>
        <cylinderGeometry args={[2, 2, 15, 32]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={6} transparent opacity={0} clippingPlanes={clippingPlanes} />
      </mesh>
    </group>
  );
}

// ─── SCENE ───────────────────────────────────────────────────
function Scene({ scrollProgress }) {
  const sceneGroup = useRef();

  // Broadened clipping window: only Y = -40 to +40 in world space is visible.
  // This provides more 'runway' for the snap-to-center animation.
  const clippingPlanes = useMemo(() => [
    new THREE.Plane(new THREE.Vector3(0, -1, 0), 40), 
    new THREE.Plane(new THREE.Vector3(0,  1, 0), 40), 
  ], []);

  useFrame(() => {
    if (!sceneGroup.current) return;

    const j0 = (typeof window !== "undefined" ? window.m2c_junction_0 : 0) || 0;
    const j1 = (typeof window !== "undefined" ? window.m2c_junction_1 : 0) || 0;
    const j2 = (typeof window !== "undefined" ? window.m2c_junction_2 : 0) || 0;
    const totalProgress = (scrollProgress && typeof scrollProgress.get === 'function') 
      ? scrollProgress.get() 
      : (typeof scrollProgress === 'number' ? scrollProgress : 0);

    // Determine target Y
    let targetY;
    if (j2 > 0.01) {
      targetY = -NODE_Y[2]; 
    } else if (j1 > 0.01) {
      targetY = -NODE_Y[1]; 
    } else if (j0 > 0.01) {
      targetY = -NODE_Y[0]; 
    } else {
      targetY = -NODE_Y[0] - 20; 
    }

    // Smooth damped transition
    const current = sceneGroup.current.position.y;
    sceneGroup.current.position.y += (targetY - current) * 0.08;

    // Visibility Clamp — specifically avoid Hero (0.1) and Footer (0.8)
    const inActiveRange = totalProgress > 0.05 && totalProgress < 0.85;
    const anyInteraction = j0 > 0 || j1 > 0 || j2 > 0;
    
    sceneGroup.current.visible = inActiveRange && anyInteraction;
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={35} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-15, 0, 15]} intensity={1.5} color={MINT} />

      <group ref={sceneGroup}>
        {/* Continuous pipe trunk — tall enough to span all nodes */}
        <mesh position={[0, 0, -0.5]}>
          <cylinderGeometry args={[2.5, 2.5, 300, 32]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.9} roughness={0.15} clippingPlanes={clippingPlanes} />
        </mesh>

        {/* Three identical service nodes */}
        <ServiceNode junctionIndex={0} positionY={NODE_Y[0]} clippingPlanes={clippingPlanes} />
        <ServiceNode junctionIndex={1} positionY={NODE_Y[1]} clippingPlanes={clippingPlanes} />
        <ServiceNode junctionIndex={2} positionY={NODE_Y[2]} clippingPlanes={clippingPlanes} />
      </group>

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.8} radius={0.6} />
      </EffectComposer>
      <Environment preset="night" />
    </>
  );
}

export default function Pipeline3D({ scrollProgress }) {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas shadows={false} dpr={[1, 2]} gl={{ antialias: false, stencil: false, depth: true, localClippingEnabled: true }}>
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
