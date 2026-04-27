"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const BackgroundAura = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#030303] [mask-image:linear-gradient(to_bottom,#fff_80%,transparent_100%)]">
      {/* Moving Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#62D2A2]/10 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -80, 0],
          scale: [1, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#F96B6B]/10 blur-[130px]"
      />

      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-white/[0.05] blur-[150px]"
      />

      {/* Concentric Arcs originating from top (Dome effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-start justify-center pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.1,
              ease: "easeOut",
            }}
            className="absolute rounded-full border"
            style={{
              width: `${i * 350}px`,
              height: `${i * 350}px`,
              marginTop: `-${i * 175}px`, // Dome effect: half-circle from top
              borderWidth: `${8 + i * 4}px`,
              borderColor: i % 2 === 0 ? "rgba(98, 210, 162, 0.05)" : "rgba(255, 255, 255, 0.03)",
              filter: "blur(4px)",
            }}
          />
        ))}
      </div>

      {/* Twinkling Stars */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: Math.random() * 0.8 + 0.2,
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%" 
              }}
              animate={{ 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
              className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            />
          ))}
        </div>
      )}

      {/* Grid Pattern (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] opacity-20" />

      {/* Grain / Noise Filter */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
    </div>
  );
};
