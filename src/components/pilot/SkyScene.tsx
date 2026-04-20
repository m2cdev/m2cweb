"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sky, Environment, PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { G600Model } from "./G600Model";

export function SkyScene({ 
    progress,
    jetRef
}: { 
  progress: number,
  jetRef: React.RefObject<THREE.Group>
}) {
  return (
    <Canvas
      gl={{ antialias: true, alpha: false, stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor('#05070a');
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
      dpr={[1, 1.5]}
      performance={{ min: 0.5 }}
      className="absolute inset-0 z-10 pointer-events-none"
    >
      <PerspectiveCamera makeDefault fov={38} position={[0, 4, 35]} />
      <SceneContent progress={progress} jetRef={jetRef} />
    </Canvas>
  );
}

function SceneContent({ progress, jetRef }: any) {
  const { camera } = useThree();

  // DRIVE CAMERA WITH SCROLL
  useEffect(() => {
    // Zoom from wide establishing shot into cockpit window
    const startPos = new THREE.Vector3(0, 4, 30);
    const endPos = new THREE.Vector3(6.8, 1.0, 9.4); // Closer to cockpit
    camera.position.lerpVectors(startPos, endPos, progress);

    // Dynamic LookAt
    const startLook = new THREE.Vector3(0, 0, 0);
    const endLook = new THREE.Vector3(5.2, 0.4, 0);
    const currentLook = new THREE.Vector3().lerpVectors(startLook, endLook, progress);
    camera.lookAt(currentLook);

    if (jetRef.current) {
        jetRef.current.position.x = 2 - progress * 2;
        jetRef.current.rotation.z = -progress * 0.08;
    }
  }, [progress, camera, jetRef]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // High-speed vibration shimmy
    const shakeAmount = 0.01 + progress * 0.02;
    camera.position.y += Math.sin(time * 35) * shakeAmount * 0.1;
    camera.position.x += Math.cos(time * 30) * shakeAmount * 0.1;
  });

  return (
    <>
      <fog attach="fog" args={[0x060b14, 20, 80]} />
      
      <Sky
        distance={450000}
        sunPosition={[0, -0.05, -1]} // Original dusk glow
        inclination={0.49}
        azimuth={0.25}
        turbidity={10}
        rayleigh={2}
      />

      <Stars radius={150} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />

      <Environment preset="night" />
      <ambientLight intensity={0.25} color={0xb8c8e8} />
      <directionalLight position={[10, 10, 5]} intensity={1.8} color="#c8d8ff" />
      <pointLight position={[5, 4, 5]} intensity={2} color="#62D2A2" distance={15} /> 

      <group ref={jetRef} position={[2, 0, 0]} rotation={[0, -0.2, 0]}>
        <G600Model progress={progress} />
      </group>
    </>
  );
}
