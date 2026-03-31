"use client";

import React, { useState, useEffect } from "react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after 300px scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-8 right-8 z-[999]"
        >
          <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
            <ShimmerButton 
              className="shadow-2xl hover:scale-105 transition-transform" 
              shimmerColor="#62D2A2" 
              background="#000000"
              shimmerSize="0.1em"
            >
              <span className="relative z-10 font-bold text-white tracking-tight">
                Book a Working Session
              </span>
            </ShimmerButton>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
