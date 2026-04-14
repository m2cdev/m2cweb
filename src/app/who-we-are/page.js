"use client";

import React from "react";
import { motion } from "framer-motion";
import PhilosophySpinner from "@/components/sections/PhilosophySpinner";
import { BackgroundPaths } from "@/components/ui/background-paths";

export default function WhoWeAre() {
  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <BackgroundPaths>
        <div className="container-custom pt-40 pb-20">
          <div className="max-w-5xl mb-16">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-white font-heading"
            >
              Execution over strategy.<br />We <span className="text-primary italic">embed</span> into your sales motion.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 font-body leading-relaxed max-w-3xl"
            >
              We work inside your systems and pipeline to remove friction and help your team close more deals.
            </motion.p>
          </div>
        </div>
      </BackgroundPaths>

      {/* Philosophy Spinner — full-bleed, scroll-linked orbital logo */}
      <PhilosophySpinner />

      {/* spacer below for next sections if any */}
      <div className="h-20" />
    </div>
  );
}
