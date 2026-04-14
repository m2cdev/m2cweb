"use client";

import { motion } from "framer-motion";

export function Zone3Blueprint() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", bounce: 0.5 } }
  };

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: { pathLength: 1, transition: { duration: 1 } }
  };

  const typeVariants = {
    hidden: { opacity: 0, width: "0%" },
    visible: { opacity: 1, width: "100%", transition: { duration: 1, ease: "linear" } }
  };

  return (
    <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center pt-20 px-12">
      {/* Container */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        className="relative w-[500px] h-[500px] flex items-center justify-center z-10"
      >
        <div className="absolute inset-0 rounded-full border border-m2c-mint/20 bg-m2c-black/50 backdrop-blur-sm" />

        {/* Central Pitstop Marker */}
        <div className="absolute flex flex-col items-center top-[10%]">
          <div className="w-12 h-12 rounded-full border border-m2c-mint flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(98,210,162,0.3)]">
             <div className="w-3 h-3 bg-m2c-mint rounded-full" />
          </div>
          <div className="bg-m2c-mint/10 border border-m2c-mint/50 px-4 py-1 rounded text-m2c-mint font-mono text-xs uppercase tracking-widest font-bold">
            Pitstop 02 — Map
          </div>
        </div>

        {/* Network Diagram Nodes */}
        {/* Lines */}
        <svg className="absolute w-full h-full" viewBox="0 0 500 500">
           {/* Center to Top-Left */}
           <motion.path variants={lineVariants} d="M 250 250 L 150 150" fill="none" stroke="#62D2A2" strokeWidth="2" strokeDasharray="4 4" />
           {/* Center to Top-Right */}
           <motion.path variants={lineVariants} d="M 250 250 L 350 180" fill="none" stroke="#62D2A2" strokeWidth="2" strokeDasharray="4 4" />
           {/* Center to Bottom-Left */}
           <motion.path variants={lineVariants} d="M 250 250 L 180 350" fill="none" stroke="#62D2A2" strokeWidth="2" strokeDasharray="4 4" />
           {/* Center to Bottom-Right */}
           <motion.path variants={lineVariants} d="M 250 250 L 320 380" fill="none" stroke="#62D2A2" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Nodes */}
        <motion.div variants={nodeVariants} className="absolute left-[calc(50%-20px)] top-[calc(50%-20px)] w-10 h-10 bg-m2c-mint text-black font-bold font-mono rounded-full flex items-center justify-center shadow-[0_0_20px_#62D2A2]">
          DM
        </motion.div>
        
        <motion.div variants={nodeVariants} className="absolute left-[calc(30%-16px)] top-[calc(30%-16px)] w-8 h-8 bg-[#050505] border-2 border-m2c-mint text-m2c-mint font-mono text-xs rounded-full flex items-center justify-center">
          CH
        </motion.div>

        <motion.div variants={nodeVariants} className="absolute left-[calc(70%-16px)] top-[calc(36%-16px)] w-8 h-8 bg-[#050505] border-2 border-m2c-mint text-m2c-mint font-mono text-xs rounded-full flex items-center justify-center">
          VPE
        </motion.div>

        <motion.div variants={nodeVariants} className="absolute left-[calc(36%-16px)] top-[calc(70%-16px)] w-8 h-8 bg-[#050505] border-2 border-m2c-mint text-m2c-mint font-mono text-xs rounded-full flex items-center justify-center">
          CFO
        </motion.div>

        <motion.div variants={nodeVariants} className="absolute left-[calc(64%-16px)] top-[calc(76%-16px)] w-8 h-8 bg-[#050505] border-2 border-m2c-mint text-m2c-mint font-mono text-xs rounded-full flex items-center justify-center">
          PROC
        </motion.div>

        {/* Compass Rose */}
        <motion.div 
          initial={{ rotate: -180, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -right-20 bottom-10 w-24 h-24 border border-m2c-mint/30 rounded-full flex items-center justify-center"
        >
          <div className="absolute w-[1px] h-full bg-m2c-mint/30" />
          <div className="absolute h-[1px] w-full bg-m2c-mint/30" />
          <div className="absolute top-1 text-[8px] font-mono text-m2c-mint">N</div>
        </motion.div>

      </motion.div>

      {/* Typing Annotations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }} 
        className="ml-0 md:ml-32 mt-12 md:mt-0 flex flex-col gap-6"
      >
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div variants={typeVariants} className="border-l-2 border-m2c-mint pl-4 text-white font-mono uppercase tracking-widest">
            &gt; Accounts Mapped
          </motion.div>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div variants={typeVariants} className="border-l-2 border-m2c-mint pl-4 text-white font-mono uppercase tracking-widest">
            &gt; Stakeholders Identified
          </motion.div>
        </div>
        <div className="overflow-hidden whitespace-nowrap">
          <motion.div variants={typeVariants} className="border-l-2 border-m2c-mint pl-4 text-white font-mono uppercase tracking-widest">
            &gt; Playbook Built
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}
