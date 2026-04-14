"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";

const MINT = "#62D2A2";

export default function PipelineTerminus() {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center z-10 px-6 overflow-visible">
      {/* 1. Terminal SVG (Funnel & Pings) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] flex justify-center">
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
           {/* The Funnel Shape (Widening from the 2px pipe) */}
           <path 
             d="M 199 0 L 199 50 L 160 150 L 240 150 L 201 50" 
             fill={MINT} 
             fillOpacity="0.1" 
             stroke={MINT} 
             strokeWidth="2"
           />
           
           {/* Radar Pings (Concentric Rings) */}
           <motion.circle 
             cx="200" cy="150" r="40" 
             stroke={MINT} strokeWidth="1" strokeOpacity="0.3"
             animate={{ scale: [1, 2], opacity: [0.3, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
           />
           <motion.circle 
             cx="200" cy="150" r="40" 
             stroke={MINT} strokeWidth="1" strokeOpacity="0.3"
             animate={{ scale: [1, 2.5], opacity: [0.2, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeOut", delay: 0.6 }}
           />

           {/* The Final Destination Point */}
           <circle cx="200" cy="150" r="10" fill={MINT} filter="url(#glow)" />
           <defs>
             <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
               <feGaussianBlur stdDeviation="5" result="blur" />
               <feMerge>
                 <feMergeNode in="blur" />
                 <feMergeNode in="SourceGraphic" />
               </feMerge>
             </filter>
           </defs>
        </svg>
      </div>

      {/* 2. CTA Content */}
      <div className="text-center max-w-4xl relative mt-40">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-gray-500 font-body text-xl mb-12"
        >
          Every service connects back to one thing: <span className="text-white font-bold">more revenue, less noise.</span>
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-7xl font-black tracking-tighter mb-8"
        >
          Not sure which service fits?
        </motion.h2>
        <p className="text-xl text-gray-400 font-body mb-12 max-w-2xl mx-auto">
          Start with a Working Session. We'll diagnose the problem and recommend the right path.
        </p>

        <div className="flex flex-col items-center gap-8">
          <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
            <ShimmerButton 
              shimmerColor="#62D2A2" 
              className="h-16 px-12 rounded-2xl"
            >
              <span className="text-xl font-black text-white px-2">Book a Working Session</span>
            </ShimmerButton>
          </Link>

          <Link href="/pilot" className="group flex items-center gap-2 text-primary hover:text-white transition-colors font-bold tracking-tight py-2 border-b border-primary/30 hover:border-white">
            Or explore the Custom Pilot 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
