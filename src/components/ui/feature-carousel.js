"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Layers, 
  Zap 
} from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    id: "execution",
    label: "Execution over theory",
    title: "No Decks. Just Deals.",
    icon: Code2,
    description: "Map2Close was built for teams that do not need another layer of advice. We work inside the motion, pressure-test the process, and stay close enough to the deals to see what is actually breaking.",
  },
  {
    id: "infrastructure",
    label: "Infrastructure first",
    title: "Systems Over Talent.",
    icon: Layers,
    description: "Enterprise motions rarely fail because reps care less. They fail because the CRM, workflows, messaging, and follow-up structure do not support how buyers move through a real deal.",
  },
  {
    id: "movement",
    label: "Measured in movement",
    title: "Move the Line.",
    icon: Zap,
    description: "Every build, coaching layer, and operating change is judged by whether it improves speed, clarity, and execution inside live pipeline, not whether it sounds smart in a meeting.",
  },
];

const AUTO_PLAY_INTERVAL = 5000;
const ITEM_HEIGHT = 80;

const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function FeatureCarousel() {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex = ((step % FEATURES.length) + FEATURES.length) % FEATURES.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index) => {
    const diff = (index - currentIndex + FEATURES.length) % FEATURES.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused]);

  const getCardStatus = (index) => {
    const diff = index - currentIndex;
    const len = FEATURES.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:p-8">
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[4rem] flex flex-col lg:flex-row min-h-[600px] lg:aspect-video border-2 border-white/30 bg-[#0A0A0A] shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        {/* Left Side Navigation */}
        <div className="w-full lg:w-[45%] min-h-[400px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-16 lg:pl-20 bg-[#0D0D0D]">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0D0D0D] to-transparent z-40" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0D0D] to-transparent z-40" />
          
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20">
            {FEATURES.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(FEATURES.length / 2),
                FEATURES.length / 2,
                distance
              );

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "100%",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.4,
                    scale: 1 - Math.abs(wrappedDistance) * 0.05,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start left-0"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-6 px-10 py-6 rounded-2xl transition-all duration-700 text-left group border w-full max-w-md",
                      isActive
                        ? "bg-[#62D2A2] text-white border-[#62D2A2] shadow-[0_20px_40px_rgba(98,210,162,0.15)] z-10"
                        : "bg-transparent text-white/40 border-white/5 hover:border-white/10 hover:text-white"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-500 shrink-0",
                        isActive ? "text-white" : "text-white/20"
                      )}
                    >
                      <feature.icon
                        size={24}
                        strokeWidth={2}
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="font-black text-lg tracking-tight uppercase leading-none">
                        {feature.title}
                      </span>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side Content / Visual */}
        <div className="flex-1 min-h-[500px] lg:h-full relative bg-[#050505] flex items-center justify-center py-16 px-6 md:px-12 lg:px-10 overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />
          
          <div className="relative w-full max-w-[480px] aspect-[4/5] flex items-center justify-center">
            {FEATURES.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -120 : isNext ? 120 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.85 : 0.7,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.3 : 0,
                    rotateY: isPrev ? -15 : isNext ? 15 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  className="absolute inset-0 rounded-[2.5rem] p-10 flex flex-col items-center justify-center border-2 border-white/10 bg-[#62D2A2] origin-center shadow-2xl text-center"
                >
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex flex-col items-center justify-center text-white"
                      >
                        <div className="bg-white text-[#62D2A2] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.25em] w-fit shadow-lg mb-10">
                           {feature.label}
                        </div>
                        
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-8 leading-none">
                           {feature.title}
                        </h3>

                        <p className="text-white font-bold text-lg md:text-xl md:text-2xl leading-relaxed tracking-tight max-w-[90%] mx-auto">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-10 left-10 flex items-center gap-3 transition-opacity duration-500",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                    <span className="text-white text-[10px] font-mono font-bold uppercase tracking-[0.3em] opacity-80">
                      Principle 0{index + 1}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
