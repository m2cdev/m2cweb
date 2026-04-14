"use client";

import { motion } from "framer-motion";

export function Zone2Leak() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.5, delayChildren: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" } }
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1, ease: "easeInOut" } }
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 
        We use motion.div with whileInView so it triggers exactly when it enters the viewport during the scroll.
      */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="relative w-[600px] h-[600px] flex items-center justify-center"
      >
        {/* The Crater / Clearing */}
        <div className="absolute inset-0 rounded-full border border-m2c-coral/20 bg-m2c-black/50 backdrop-blur-sm" />
        <div className="absolute inset-[10%] rounded-full border border-m2c-coral/10" />

        {/* Central Pitstop Marker */}
        <motion.div variants={itemVariants} className="absolute flex flex-col items-center">
          <div className="w-16 h-16 border-2 border-m2c-coral flex items-center justify-center rounded-full mb-4 relative shadow-[0_0_30px_rgba(249,107,107,0.4)]">
             {/* Crosshair */}
             <div className="absolute w-full h-[2px] bg-m2c-coral/50" />
             <div className="absolute h-full w-[2px] bg-m2c-coral/50" />
             <div className="w-4 h-4 bg-m2c-coral rounded-full" />
          </div>
          <div className="bg-m2c-coral/10 border border-m2c-coral/50 px-4 py-1 rounded text-m2c-coral font-mono text-xs uppercase tracking-widest font-bold">
            Pitstop 01 — Diagnose
          </div>
        </motion.div>

        {/* Leak Markers (Pins + Lines) */}
        {/* Pin 1: Top Right */}
        <div className="absolute top-[15%] right-[10%] flex items-end">
          <svg className="absolute w-[100px] h-[50px] right-full bottom-2" viewBox="0 0 100 50">
            <motion.path variants={lineVariants} d="M100 45 L50 45 L0 5" fill="none" stroke="#F96B6B" strokeWidth="1" />
          </svg>
          <motion.div variants={itemVariants} className="bg-[#050505] border border-m2c-coral/40 p-3 rounded z-10 w-48 shadow-[0_0_15px_rgba(249,107,107,0.1)]">
            <p className="text-white font-mono text-[10px] uppercase mb-1">Alert</p>
            <p className="text-m2c-coral font-body text-sm font-bold">Pipeline Leak Detected</p>
          </motion.div>
        </div>

        {/* Pin 2: Bottom Right */}
        <div className="absolute top-[70%] right-[-5%] flex items-start">
          <svg className="absolute w-[100px] h-[50px] right-full top-2" viewBox="0 0 100 50">
            <motion.path variants={lineVariants} d="M100 5 L50 5 L0 45" fill="none" stroke="#F96B6B" strokeWidth="1" />
          </svg>
          <motion.div variants={itemVariants} className="bg-[#050505] border border-m2c-coral/40 p-3 rounded z-10 w-48 shadow-[0_0_15px_rgba(249,107,107,0.1)]">
             <div className="flex items-end gap-1 mb-2 opacity-70">
               {/* Broken bar chart */}
               <div className="w-2 h-4 bg-white/40" />
               <div className="w-2 h-6 bg-white/40" />
               <div className="w-2 h-2 bg-m2c-coral" />
               <div className="w-2 h-1 bg-m2c-coral" />
             </div>
             <p className="text-m2c-coral font-body text-sm font-bold">Cycle Time: Critical</p>
          </motion.div>
        </div>

        {/* Pin 3: Bottom Left */}
        <div className="absolute top-[65%] left-[0%] flex items-start flex-row-reverse">
          <svg className="absolute w-[100px] h-[50px] left-full top-2" viewBox="0 0 100 50">
             <motion.path variants={lineVariants} d="M0 5 L50 5 L100 45" fill="none" stroke="#F96B6B" strokeWidth="1" />
          </svg>
          <motion.div variants={itemVariants} className="bg-[#050505] border border-m2c-coral/40 p-3 rounded z-10 w-48 text-right shadow-[0_0_15px_rgba(249,107,107,0.1)]">
             <p className="text-m2c-coral font-body text-sm font-bold">Rep Efficiency: Low</p>
          </motion.div>
        </div>

        {/* Pin 4: Top Left */}
        <div className="absolute top-[25%] left-[-5%] flex items-end flex-row-reverse">
          <svg className="absolute w-[100px] h-[50px] left-full bottom-2" viewBox="0 0 100 50">
             <motion.path variants={lineVariants} d="M0 45 L50 45 L100 5" fill="none" stroke="#F96B6B" strokeWidth="1" />
          </svg>
          <motion.div variants={itemVariants} className="bg-[#050505] border border-m2c-coral/40 p-3 rounded z-10 w-48 text-right shadow-[0_0_15px_rgba(249,107,107,0.1)]">
             <p className="text-m2c-coral font-body text-sm font-bold">Follow-up Gap: 72hrs</p>
          </motion.div>
        </div>

      </motion.div>
    </div>
  );
}
