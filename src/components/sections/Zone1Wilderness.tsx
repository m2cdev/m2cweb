"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Zone1Wilderness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const fadeOut = useTransform(scrollYProgress, [0.5, 1], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-start pt-32">
      {/* YOU ARE HERE Marker */}
      <motion.div style={{ opacity: fadeOut }} className="flex flex-col items-center z-10 w-full max-w-4xl px-8 relative">
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-m2c-coral/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
           <div className="w-16 h-16 border border-m2c-coral/50 rounded-full" />
        </div>
        
        <div className="bg-[#050505] border border-white/10 px-6 py-2 rounded-full mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center gap-3">
          <motion.div 
            animate={{ opacity: [1, 0.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-2.5 h-2.5 bg-m2c-coral rounded-full shadow-[0_0_10px_#F96B6B]" 
          />
          <span className="text-white font-mono text-xs uppercase tracking-widest">
            You Are Here
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-heading font-black text-white text-center mb-6 leading-tight">
          Lost in the <br/><span className="text-m2c-coral">Wilderness?</span>
        </h1>
        <p className="text-m2c-white-muted font-body text-lg max-w-2xl text-center leading-relaxed">
          The terrain is dense, chaotic, and disorienting. Your pipeline is full of noise, and finding the true signal feels impossible.
        </p>
      </motion.div>

      {/* Abstract Chaos Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Simulating clustered dense topography */}
        <svg className="w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M 10 50 Q 30 20 50 50 T 90 50" fill="none" stroke="#F96B6B" strokeWidth="0.5" className="animate-pulse" />
          <path d="M 0 40 Q 40 10 60 60 T 100 40" fill="none" stroke="#ffffff" strokeWidth="0.2" />
          <path d="M 20 60 Q 50 90 80 40 T 120 60" fill="none" stroke="#F96B6B" strokeWidth="0.5" className="opacity-50" />
        </svg>
      </div>
    </div>
  );
}
