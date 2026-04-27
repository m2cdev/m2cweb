"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import GenerativeMountainScene from "@/components/ui/mountain-scene";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Check, X, Shield, Zap, Target, Gauge } from "lucide-react";

export default function HowWeCompare() {
  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen text-white">
      {/* Premium Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* The Base Hero Background (Mountain Scene) */}
        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
          <GenerativeMountainScene />
        </Suspense>

        {/* The Globe Section floating in the hero */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-40">
          <RotatingEarth width={1000} height={1000} className="w-full h-full scale-125" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-20 w-full max-w-7xl px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-black text-white tracking-widest uppercase mb-8 leading-none">
              Precision <span className="text-primary ">vs</span> Proximity
            </h1>
            <p className="text-xl md:text-2xl text-white font-body max-w-3xl mx-auto mb-12 tracking-wide leading-relaxed">
              Standardized sales execution for teams that have outgrown &quot;best effort&quot; workflows.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <ShimmerButton 
              shimmerColor="#62D2A2" 
              background="rgba(255,255,255,0.05)" 
              className="h-16 px-12 rounded-2xl border border-white/10 backdrop-blur-3xl"
              onClick={() => document.getElementById('comparison-table')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-lg font-bold text-white tracking-widest uppercase">The Standard</span>
            </ShimmerButton>
          </motion.div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-15" />
      </section>

      {/* Comparison Grid Section */}
      <section id="comparison-table" className="py-32 container-custom relative z-20">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tighter">
            The Map2Close <span className="text-primary">Difference</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Legacy Sales (Left) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[2rem] bg-white/[0.02] border border-white/5 relative group overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-coral/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex items-center gap-4 mb-10 text-coral">
              <X size={32} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest">Legacy Approach</h3>
            </div>

            <ul className="space-y-8 relative z-10">
              {[
                { icon: Shield, text: "Reactive audits and quarterly reviews" },
                { icon: Zap, text: "Fragmented tools with data silos" },
                { icon: Target, text: "High variance in individual rep performance" },
                { icon: Gauge, text: "Guesswork-led pipeline management" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="p-3 rounded-xl bg-coral/10 text-coral mt-1">
                    <item.icon size={20} />
                  </div>
                  <p className="text-lg text-white leading-snug">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Map2Close (Right) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-[2rem] bg-primary/5 border border-primary/20 relative group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent opacity-100" />
            
            <div className="flex items-center gap-4 mb-10 text-primary">
              <Check size={32} />
              <h3 className="text-2xl font-heading font-bold uppercase tracking-widest">The Map2Close Standard</h3>
            </div>

            <ul className="space-y-8 relative z-10">
              {[
                { icon: Shield, text: "Embedded execution and real-time auditing" },
                { icon: Zap, text: "Unified revenue operating systems" },
                { icon: Target, text: "Industrialized performance consistency" },
                { icon: Gauge, text: "Precision-driven account mapping" }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1 shadow-[0_0_15px_rgba(98,210,162,0.1)]">
                    <item.icon size={20} />
                  </div>
                  <p className="text-lg text-white/90 font-medium leading-snug">{item.text}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* spacer below for layout */}
      <div className="h-40" />
    </div>
  );
}
