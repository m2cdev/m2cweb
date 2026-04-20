"use client";

import React, { useMemo, forwardRef } from "react";
import * as THREE from "three";
import { MeshTransmissionMaterial } from "@react-three/drei";

const MINT = "#62D2A2";

export const JetModel = forwardRef((props: any, ref: any) => {
  const fuselageMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#f0f4f8',
    metalness: 0.6,
    roughness: 0.15,
    envMapIntensity: 2.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    dithering: true
  }), []);

  const engineMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#2a2a2e',
    metalness: 0.9,
    roughness: 0.1,
    envMapIntensity: 2.0,
    dithering: true
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#0a1628',
    transmission: 0.95,
    roughness: 0.0,
    metalness: 0.2,
    transparent: true,
    opacity: 0.3,
    dithering: true
  }), []);

  return (
    <group ref={ref} {...props} scale={[1.2, 1.2, 1.2]}>
      {/* FUSELAGE - Smooth Capsule Shape */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.55, 7.5, 32, 64]} />
        <primitive object={fuselageMaterial} attach="material" />
      </mesh>

      {/* NOSE TAPER */}
      <mesh position={[0, -0.05, 4.8]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
        <cylinderGeometry args={[0, 0.55, 2.5, 32]} />
        <primitive object={fuselageMaterial} attach="material" />
      </mesh>

      {/* TAIL TAPER */}
      <mesh position={[0, 0.1, -4.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.55, 2, 32]} />
        <primitive object={fuselageMaterial} attach="material" />
      </mesh>

      {/* WINGS - High Wing Design (Gulfstream Style) */}
      <group position={[0, 0.15, 0.5]}>
        <mesh rotation={[0, -0.2, -0.08]}>
          <boxGeometry args={[9.5, 0.08, 2.4]} />
          <primitive object={fuselageMaterial} attach="material" />
        </mesh>
        {/* Winglets */}
        <mesh position={[4.75, 0.35, 0.2]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.08, 0.8, 0.4]} />
          <primitive object={fuselageMaterial} attach="material" />
        </mesh>
        <mesh position={[-4.75, 0.35, 0.2]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.08, 0.8, 0.4]} />
          <primitive object={fuselageMaterial} attach="material" />
        </mesh>
      </group>

      {/* ENGINE PODS - Mounted near the tail (Luxury Jet Style) */}
      <group position={[0.7, 0.3, -3.2]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 1.8, 32]} />
            <primitive object={engineMaterial} attach="material" />
         </mesh>
         {/* Engine Exhaust Glow */}
         <pointLight position={[0, 0, -1]} color="#F96B6B" intensity={2} distance={3} />
         <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
            <meshBasicMaterial color="#F96B6B" />
         </mesh>
      </group>
      <group position={[-0.7, 0.3, -3.2]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 1.8, 32]} />
            <primitive object={engineMaterial} attach="material" />
         </mesh>
         <pointLight position={[0, 0, -1]} color="#F96B6B" intensity={2} distance={3} />
         <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} />
            <meshBasicMaterial color="#F96B6B" />
         </mesh>
      </group>

      {/* TAIL FIN (T-Tail) */}
      <mesh position={[0, 1.2, -4.5]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.08, 1.8, 1.4]} />
        <primitive object={fuselageMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 2.0, -4.8]}>
        <boxGeometry args={[3.8, 0.1, 1.0]} />
        <primitive object={fuselageMaterial} attach="material" />
      </mesh>

      {/* COCKPIT INTERIOR - Dashboard and Seat for Robot */}
      <mesh position={[0, 0.15, 4.0]}>
        <boxGeometry args={[1.0, 0.4, 0.5]} />
        <meshStandardMaterial color="#0a0a10" roughness={0.8} />
      </mesh>
      <group position={[0, 0.35, 4.2]}>
          {/* This is where the Robot will be placed */}
          {props.children}
      </group>

      {/* MAIN COCKPIT WINDOW - The Hub for the Spline robot */}
      <mesh ref={props.pilotWindowRef} position={[0, 0.35, 4.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[1.2, 0.45, 0.1]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* SIDE COCKPIT WINDOWS */}
      <mesh position={[0.7, 0.3, 3.7]} rotation={[0, 0.8, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.05]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.7, 0.3, 3.7]} rotation={[0, -0.8, 0]}>
        <boxGeometry args={[0.4, 0.35, 0.05]} />
        <primitive object={glassMaterial} attach="material" />
      </mesh>

      {/* CABIN WINDOWS - Now they glow */}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[0.56, 0, 2.5 - i * 0.7]}>
            <mesh>
                <planeGeometry args={[0.18, 0.12]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>
            <pointLight distance={1} intensity={0.5} color="#white" position={[0.2, 0, 0]} />
        </group>
      ))}
      {[...Array(10)].map((_, i) => (
        <group key={i} position={[-0.56, 0, 2.5 - i * 0.7]}>
            <mesh>
                <planeGeometry args={[0.18, 0.12]} />
                <primitive object={glassMaterial} attach="material" />
            </mesh>
            <pointLight distance={1} intensity={0.5} color="#white" position={[-0.2, 0, 0]} />
        </group>
      ))}

      {/* BRANDING STRIPE */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1.15, 0.025, 12]} />
        <meshStandardMaterial color={MINT} emissive={MINT} emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
});

JetModel.displayName = "JetModel";
