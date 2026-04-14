"use client";

import { motion } from "framer-motion";

export function Zone4Execution() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const arrowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const chartVariants = {
    hidden: { height: 0 },
    visible: { height: "100%", transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      
      {/* Central Pitstop Marker */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 1 }}
        className="absolute right-1/4 top-1/4 flex flex-col items-center"
      >
        <div className="w-16 h-16 rounded-full border border-m2c-mint bg-m2c-mint/10 flex items-center justify-center mb-4 shadow-[0_0_40px_rgba(98,210,162,0.4)]">
           <div className="w-6 h-6 bg-m2c-mint rounded-full animate-pulse" />
        </div>
        <div className="bg-m2c-mint/20 border border-m2c-mint px-4 py-1 rounded text-m2c-mint font-mono text-xs uppercase tracking-widest font-bold">
          Pitstop 03 — Execute
        </div>
      </motion.div>

      {/* Speed Arrows / Flow Lines */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="absolute left-1/3 top-1/3 flex flex-col gap-8"
      >
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} variants={arrowVariants} className="text-m2c-mint opacity-80 scale-150">
            ↓
          </motion.div>
        ))}
      </motion.div>

      {/* Upward Trend Chart filling */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="absolute left-[15%] bottom-[20%] bg-[#050505] border border-m2c-mint/30 p-6 rounded-xl w-64 shadow-[0_0_30px_rgba(98,210,162,0.15)]"
      >
        <div className="flex items-end justify-between h-24 gap-2 mb-4">
          <div className="w-full bg-white/5 rounded-t relative">
            <motion.div variants={chartVariants} className="absolute bottom-0 w-full bg-m2c-mint/40 rounded-t" style={{ height: '30%' }} />
          </div>
          <div className="w-full bg-white/5 rounded-t relative">
            <motion.div variants={chartVariants} className="absolute bottom-0 w-full bg-m2c-mint/60 rounded-t" style={{ height: '50%' }} />
          </div>
          <div className="w-full bg-white/5 rounded-t relative">
            <motion.div variants={chartVariants} className="absolute bottom-0 w-full bg-m2c-mint/80 rounded-t" style={{ height: '75%' }} />
          </div>
          <div className="w-full bg-white/5 rounded-t relative">
            <motion.div variants={chartVariants} className="absolute bottom-0 w-full bg-m2c-mint rounded-t shadow-[0_0_10px_#62D2A2]" style={{ height: '100%' }} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-m2c-mint rounded-full" />
          <p className="text-white font-mono text-xs uppercase tracking-widest">Velocity Increasing</p>
        </div>
      </motion.div>

      {/* Typing Annotations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }} 
        className="absolute right-[10%] bottom-[30%] flex flex-col gap-6 text-right"
      >
        <motion.div variants={arrowVariants} className="text-m2c-mint font-mono uppercase tracking-widest border-r-2 border-m2c-mint pr-4">
          Outreach Live
        </motion.div>
        <motion.div variants={arrowVariants} className="text-m2c-mint font-mono uppercase tracking-widest border-r-2 border-m2c-mint pr-4">
          Pipeline Flowing
        </motion.div>
        <motion.div variants={arrowVariants} className="text-m2c-mint font-mono uppercase tracking-widest border-r-2 border-m2c-mint pr-4 font-bold">
          Reps Coached
        </motion.div>
      </motion.div>

    </div>
  );
}
