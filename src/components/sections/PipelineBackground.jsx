"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const MINT = "#62D2A2";

export default function PipelineBackground({ containerRef }) {
  const lineRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // 1. Vertical Line Animation (Glow & Progress)
    const ctx = gsap.context(() => {
      // Create particles
      const particleContainer = particlesRef.current;
      if (!particleContainer) return;

      for (let i = 0; i < 15; i++) {
        const particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        particle.setAttribute("r", "1.5");
        particle.setAttribute("fill", MINT);
        particle.setAttribute("filter", "url(#glow-blur)");
        particleContainer.appendChild(particle);

        // Animate each particle downward
        gsap.set(particle, { x: 50, y: -20 });
        gsap.to(particle, {
          y: "110%",
          duration: 3 + Math.random() * 2,
          repeat: -1,
          ease: "linear",
          delay: Math.random() * 5,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <svg 
        className="w-full h-full opacity-60" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-blur" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="main-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <linearGradient id="pipe-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={MINT} stopOpacity="0" />
            <stop offset="0.05" stopColor={MINT} stopOpacity="1" />
            <stop offset="0.95" stopColor={MINT} stopOpacity="1" />
            <stop offset="1" stopColor={MINT} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* The Vertical Main Line - High Fidelity Depth */}
        <line 
          x1="50%" y1="0" x2="50%" y2="100%" 
          stroke="rgba(98, 210, 162, 0.08)" 
          strokeWidth="12"
          className="blur-[4px]"
        />
        <line 
          x1="50%" y1="0" x2="50%" y2="100%" 
          stroke="url(#pipe-gradient)" 
          strokeWidth="4"
          filter="url(#main-glow)"
        />
        <line 
          x1="50%" y1="0" x2="50%" y2="100%" 
          stroke="rgba(0, 0, 0, 0.4)" 
          strokeWidth="1"
          className="translate-x-[2.5px]"
        />

        {/* Particle Layer */}
        <g ref={particlesRef} />
      </svg>
      
      {/* Subtle Topographic continuation (3-5% opacity) */}
      <div 
        className="absolute inset-0 opacity-[0.03] grayscale invert pointer-events-none"
        style={{
          backgroundImage: `url('https://www.transparenttextures.com/patterns/topography.png')`,
          backgroundSize: '800px',
        }}
      />
    </div>
  );
}
