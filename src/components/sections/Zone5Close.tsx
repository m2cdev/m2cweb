"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Zone5Close() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const ringVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: [0.8, 0], transition: { duration: 2, repeat: Infinity, ease: "easeOut" } }
  };

  const typeVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center pb-32">
      
      {/* Concentric Rings (Radar Ping) */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <motion.div 
          variants={ringVariants} 
          className="absolute w-[300px] h-[300px] rounded-full border border-m2c-mint/80 bg-m2c-mint/5"
        />
        <motion.div 
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1.5, opacity: [0.4, 0], transition: { duration: 2, delay: 0.4, repeat: Infinity, ease: "easeOut" } }
          }} 
          className="absolute w-[300px] h-[300px] rounded-full border border-m2c-mint/40"
        />
        <motion.div 
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 2, opacity: [0.2, 0], transition: { duration: 2, delay: 0.8, repeat: Infinity, ease: "easeOut" } }
          }} 
          className="absolute w-[300px] h-[300px] rounded-full border border-m2c-mint/20"
        />
      </motion.div>

      {/* Destination Marker */}
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.6, duration: 1 }}
        className="relative z-10 flex flex-col items-center justify-center bg-[#050505] w-64 h-64 rounded-full border-4 border-m2c-mint shadow-[0_0_80px_rgba(98,210,162,0.4)]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(98,210,162,0.2)_0%,_transparent_70%)] rounded-full animate-pulse" />
        <span className="text-white font-heading font-black text-3xl mb-2 z-10">CLOSED</span>
        <div className="bg-m2c-mint text-[#050505] px-3 py-1 text-[10px] font-mono font-bold tracking-widest uppercase rounded">
          Destination Reached
        </div>
      </motion.div>

      {/* Celebratory Annotations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }} 
        className="absolute right-[10%] bottom-[20%] flex flex-col gap-6"
      >
        <motion.div variants={typeVariants} className="text-m2c-mint font-mono uppercase tracking-widest bg-[#050505] border border-m2c-mint/40 px-4 py-2 shadow-[0_0_20px_#62D2A2_inset]">
          <span className="text-white">Deal Velocity:</span> +25%
        </motion.div>
        <motion.div variants={typeVariants} className="text-m2c-mint font-mono uppercase tracking-widest bg-[#050505] border border-m2c-mint/40 px-4 py-2">
          <span className="text-white">Revenue:</span> Secured
        </motion.div>
        <motion.div variants={typeVariants} className="text-m2c-mint font-mono uppercase tracking-widest bg-[#050505] border border-m2c-mint/40 px-4 py-2">
          <span className="text-white">Engine:</span> Repeatable
        </motion.div>
      </motion.div>

      {/* Map2Close Cartography Stamp */}
      <div className="absolute bottom-8 right-8 opacity-30 flex flex-col items-end gap-2">
        <Image 
          src="/logo-black.png" 
          alt="Map2Close Logo" 
          width={80} 
          height={20} 
          className="object-contain invert brightness-0"
        />
        <span className="font-mono text-[8px] tracking-[0.3em] uppercase text-white/50">
          Cartography Dept.
        </span>
      </div>

    </div>
  );
}
