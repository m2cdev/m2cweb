"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextReveal = ({ children, className, greenWords = [], redWords = [] }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothing the scroll progress to prevent "skipping" on mouse wheels
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  const words = children.split(" ");
  // Reveal over 60% of the scroll distance
  const revealEnd = 0.6;

  return (
    <div ref={containerRef} className={cn("relative z-10 h-[250vh]", className)}>
      <div className="sticky top-0 mx-auto flex h-screen max-w-5xl items-center justify-center bg-transparent px-6">
        <p
          className="flex flex-wrap items-center justify-center text-center p-5 text-3xl font-bold md:p-8 md:text-4xl lg:p-10 lg:text-5xl xl:text-6xl leading-[1.4] tracking-tight"
        >
          {words.map((word, i) => {
            // Overlapping reveal ranges for smoother transition
            const start = (i / words.length) * revealEnd;
            const end = Math.min(revealEnd, ((i + 3) / words.length) * revealEnd);
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(smoothProgress, [start, end], [10, 0]);
            
            const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
            const isGreen = greenWords.some((hw) => cleanWord === hw.toLowerCase());
            const isRed   = redWords.some((hw)   => cleanWord === hw.toLowerCase());

            return (
              <span key={i} className="relative mx-1.5 lg:mx-2 my-1.5">
                <motion.span
                  style={{ opacity, y }}
                  className={cn(
                    "block text-white transition-colors duration-500",
                    isGreen && "text-primary italic font-black",
                    isRed   && "text-[#F96B6B] italic font-black"
                  )}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
};
