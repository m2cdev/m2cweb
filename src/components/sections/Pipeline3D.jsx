"use client";

import React, { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { motion, useTransform, useMotionValueEvent } from "framer-motion";
import { useIsLowTier } from "@/providers/DeviceTierProvider";

const MINT = "#62D2A2";
const DARK_METAL = "#2a3530";
const RADIAL_SEGMENTS = 32;

// Nodes are spaced 70 units apart so clipping hides inactive ones
const NODE_Y = [70, 0, -70];

// ─── SERVICE NODE ────────────────────────────────────────────
// Identical mechanical seal for every service junction.
// Driven ONLY by the junction's scroll progress via window global.
function ServiceNode({ positionY, clippingPlanes, junctionIndex }) {
  const group = useRef();
  const leftSeal = useRef();
  const rightSeal = useRef();
  const leftRail = useRef();
  const rightRail = useRef();
  const mechanism = useRef();
  const coreGlow = useRef();

  useFrame(() => {
    const p = (typeof window !== "undefined") ? (window[`m2c_junction_${junctionIndex}`] || 0) : 0;
    if (group.current) group.current.visible = p > 0.001;

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

    // Internal glow follows the opening motion instead of staying fully hot.
    if (mechanism.current) {
      mechanism.current.material.emissiveIntensity = 12 * openT;
      mechanism.current.material.opacity = openT;
    }

    // Core energy cylinder blooms only while the junction is open.
    if (coreGlow.current) {
      coreGlow.current.scale.set(openT, 1, openT);
      coreGlow.current.material.opacity = openT;
    }
  });

  return (
    <group ref={group} position={[0, positionY, 0]} visible={false}>
      {/* Mechanical Seal - two half-cylinders that split apart */}
      <mesh ref={leftSeal}>
        <cylinderGeometry args={[4.2, 4.2, 3, RADIAL_SEGMENTS, 1, false, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color={DARK_METAL} metalness={1} roughness={0.1} clippingPlanes={clippingPlanes} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={rightSeal}>
        <cylinderGeometry args={[4.2, 4.2, 3, RADIAL_SEGMENTS, 1, false, -Math.PI / 2, Math.PI]} />
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
        <cylinderGeometry args={[2, 2, 15, RADIAL_SEGMENTS]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={6} transparent opacity={0} clippingPlanes={clippingPlanes} />
      </mesh>
    </group>
  );
}

// ─── SCENE ───────────────────────────────────────────────────
function Scene({ scrollProgress, lowTier }) {
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

    // Determine target Y based on which junction is currently active/scrolling
    let targetY;
    if (j2 > 0.01) {
      targetY = -NODE_Y[2]; 
    } else if (j1 > 0.01) {
      targetY = -NODE_Y[1]; 
    } else if (j0 > 0.01) {
      targetY = -NODE_Y[0]; 
    } else {
      // Starting position slightly below first node
      targetY = -NODE_Y[0] - 30; 
    }

    // Weighted Smooth Transition (Elastic-like feel)
    const dist = targetY - sceneGroup.current.position.y;
    sceneGroup.current.position.y += dist * 0.12; // Increased from 0.08 for more snap

    // Subtle rotation based on vertical movement
    sceneGroup.current.rotation.y = THREE.MathUtils.lerp(sceneGroup.current.rotation.y, dist * 0.005, 0.1);

    // Render only while a service junction is actively driving the mechanism.
    sceneGroup.current.visible = totalProgress > 0.05 && totalProgress < 0.85 && (j0 > 0 || j1 > 0 || j2 > 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={35} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
      <pointLight position={[-15, 0, 15]} intensity={1.5} color={MINT} />

      <group ref={sceneGroup} position={[0, -100, 0]}>
        {/* Continuous pipe trunk - tall enough to span all nodes */}
        <mesh position={[0, 0, -0.5]}>
          <cylinderGeometry args={[2.5, 2.5, 300, RADIAL_SEGMENTS]} />
          <meshStandardMaterial color={DARK_METAL} metalness={0.9} roughness={0.15} clippingPlanes={clippingPlanes} />
        </mesh>

        <ServiceNode junctionIndex={0} positionY={NODE_Y[0]} clippingPlanes={clippingPlanes} />
        <ServiceNode junctionIndex={1} positionY={NODE_Y[1]} clippingPlanes={clippingPlanes} />
        <ServiceNode junctionIndex={2} positionY={NODE_Y[2]} clippingPlanes={clippingPlanes} />
      </group>

      {!lowTier && (
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.8} radius={0.6} />
        </EffectComposer>
      )}
      <Environment preset="night" />
    </>
  );
}

export default function Pipeline3D({ scrollProgress }) {
  // Use scrollProgress to drive Canvas opacity smoothly
  // scrollProgress is a motion value from parent
  const opacity = useTransform(
    scrollProgress,
    [0, 0.12, 0.18, 0.88, 0.92], // progress points
    [0, 0, 0.8, 0.8, 0]        // opacity values
  );

  // Only render while the pipeline is actually faded in on screen. Outside the
  // [0.1, 0.92] scroll band it's fully transparent, so rendering is wasted GPU.
  const [tabVisible, setTabVisible] = useState(true);
  const [inBand, setInBand] = useState(false);
  const inBandRef = useRef(false);
  const isLowTier = useIsLowTier();

  const updateInBand = useCallback((v) => {
    const next = v >= 0.1 && v <= 0.92;
    if (next === inBandRef.current) return;
    inBandRef.current = next;
    setInBand(next);
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    Promise.resolve().then(() => updateInBand(scrollProgress.get()));
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [scrollProgress, updateInBand]);
  useMotionValueEvent(scrollProgress, "change", (v) => {
    updateInBand(v);
  });

  return (
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 pointer-events-none z-0 translate-x-[25%] sm:translate-x-[15%] md:translate-x-0"
    >
      <Canvas
        shadows={false}
        frameloop={inBand && tabVisible ? "always" : "never"}
        dpr={isLowTier ? 1 : [1, 2]}
        performance={{ min: 0.5, max: 1 }}
        gl={{ antialias: false, stencil: false, depth: true, localClippingEnabled: true }}
      >
        <Scene scrollProgress={scrollProgress} lowTier={isLowTier} />
      </Canvas>
    </motion.div>
  );
}
