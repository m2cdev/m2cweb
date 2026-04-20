"use client";

import React, { useMemo } from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { RobotCockpit } from "./RobotCockpit";

export function G600Model({ progress }: { progress: number }) {
  // MATERIALS
  const bodyMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0xeef2f5, // Clean luxury white
    metalness: 0.4,
    roughness: 0.15,
    clearcoat: 1.0,
    envMapIntensity: 2,
    dithering: true
  }), []);

  const glassMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: 0x050a12,
    transmission: 0.95,
    roughness: 0.0,
    metalness: 0.2,
    transparent: true,
    opacity: 0.4,
    dithering: true
  }), []);

  const accentMat = useMemo(() => new THREE.MeshBasicMaterial({ color: 0x62D2A2 }));
  const engineMat = useMemo(() => new THREE.MeshPhysicalMaterial({ color: 0x2a2e35, metalness: 0.8, roughness: 0.2 }));

  // Main Fuselage (Continuous)
  const fuselageGeo = useMemo(() => new THREE.CylinderGeometry(0.58, 0.58, 9.5, 32), []);
  
  // Nose (Smooth taper)
  const noseGeo = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
        const t = i / 19;
        const radius = Math.pow(1 - t, 0.6) * 0.58;
        const x = t * 2.5;
        const droop = Math.pow(t, 2) * 0.25;
        points.push(new THREE.Vector2(radius, x - droop));
    }
    return new THREE.LatheGeometry(points, 32);
  }, []);

  // Tail
  const tailGeo = useMemo(() => {
    const points = [];
    for (let i = 0; i < 15; i++) {
        const t = i / 14;
        const radius = (1 - t) * 0.58 * (1 - t * 0.4);
        points.push(new THREE.Vector2(radius, t * 2.8));
    }
    return new THREE.LatheGeometry(points, 32);
  }, []);

  // WINGS (Highly Swept G600)
  const wingGeo = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-2.0, 0); 
    shape.lineTo(-6.5, 5.2); // swept
    shape.lineTo(-5.8, 5.2);
    shape.lineTo(-0.5, 0.4);
    shape.lineTo(0, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false });
  }, []);

  return (
    <group>
      {/* FUSELAGE ASSEMBLY */}
      <group rotation={[0, 0, Math.PI / 2]} scale={[1, 0.84, 1]}>
        <mesh geometry={fuselageGeo} material={bodyMat} />
        <mesh geometry={noseGeo} material={bodyMat} position={[0, 4.75, 0]} />
        <mesh geometry={tailGeo} material={bodyMat} position={[0, -4.75, 0]} rotation={[0, 0, Math.PI]} />
      </group>

      {/* COCKPIT INTERIOR (Dashboard) */}
      <mesh position={[5.2, 0.1, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1, 0.4, 0.8]} />
        <meshStandardMaterial color="#111" />
      </mesh>

      {/* THE PILOT (Integrated inside the cockpit window area) */}
      <group position={[5.4, 0.2, 0]} rotation={[0, 0, 0]}>
        <Html 
            transform 
            scale={0.0022} 
            position={[0, 0, 0.42]} 
            rotation={[0, 1.2, 0]}
            pointerEvents="none"
            style={{ 
                opacity: progress > 0.5 ? Math.min(1, (progress - 0.5) * 4) : 0,
                transition: 'opacity 0.2s'
            }}
        >
            <div style={{ width: 450, height: 400, pointerEvents: 'none' }}>
                <RobotCockpit x={225} y={200} scale={1} opacity={1} />
            </div>
        </Html>
      </group>

      {/* WINDOWS */}
      <mesh material={glassMat} position={[5.1, 0.35, 0.4]} rotation={[0, 0.4, 0]}>
         <boxGeometry args={[0.5, 0.25, 0.02]} />
      </mesh>
      <mesh material={glassMat} position={[5.1, 0.35, -0.4]} rotation={[0, -0.4, 0]}>
         <boxGeometry args={[0.5, 0.25, 0.02]} />
      </mesh>

      {/* WINGS */}
      <mesh geometry={wingGeo} material={bodyMat} position={[0.5, -0.5, 0.05]} rotation={[Math.PI / 2, 0, 0]} />
      <mesh geometry={wingGeo} material={bodyMat} position={[0.5, -0.5, -0.05]} rotation={[-Math.PI / 2, 0, 0]} />

      {/* RAked Winglets */}
      <mesh material={bodyMat} position={[-4.5, -0.1, 5.25]} rotation={[0, 0, 0.2]}>
         <boxGeometry args={[0.8, 1.2, 0.05]} />
      </mesh>
      <mesh material={bodyMat} position={[-4.5, -0.1, -5.25]} rotation={[0, 0, -0.2]}>
         <boxGeometry args={[0.8, 1.2, 0.05]} />
      </mesh>

      {/* ENGINES */}
      <group position={[-3.5, 0.2, 0.85]}>
         <mesh material={engineMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.25, 2.8, 32]} />
         </mesh>
         <pointLight position={[1.5, 0, 0]} color="#F96B6B" intensity={3} distance={5} />
      </group>
      <group position={[-3.5, 0.2, -0.85]}>
         <mesh material={engineMat} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.3, 0.25, 2.8, 32]} />
         </mesh>
         <pointLight position={[1.5, 0, 0]} color="#F96B6B" intensity={3} distance={5} />
      </group>

      {/* ACCENT STRIPE */}
      <mesh material={accentMat} position={[0, 0.2, 0.58]}>
         <boxGeometry args={[11, 0.04, 0.01]} />
      </mesh>
      <mesh material={accentMat} position={[0, 0.2, -0.58]}>
         <boxGeometry args={[11, 0.04, 0.01]} />
      </mesh>

      {/* Horizontal Stabilizers */}
      <mesh material={bodyMat} position={[-5.8, 2.5, 0]} rotation={[0, 0, 0]}>
         <boxGeometry args={[2, 0.1, 5]} />
      </mesh>
      <mesh material={bodyMat} position={[-5.3, 1.2, 0]} rotation={[0, 0, -0.5]}>
         <boxGeometry args={[0.1, 2.8, 1.2]} />
      </mesh>
    </group>
  );
}
