"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils"

export const TextReveal = ({ children, className, greenWords = [], redWords = [] }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  })

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string")
  }

  const words = children.split(" ")

  return (
    <div ref={sectionRef} className={cn("relative z-0 h-[400vh]", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-screen max-w-5xl items-center justify-center bg-transparent px-6"
        }>
        <span
          className={
            "flex flex-wrap items-center justify-center text-center p-5 text-3xl font-bold text-white/20 md:p-8 md:text-4xl lg:p-10 lg:text-5xl xl:text-6xl leading-[1.2]"
          }>
          {words.map((word, i) => {
            // Reveal finishes at 50% of the scroll. 
            // The remaining 50% is pure "dwell time"
            const totalWords = words.length;
            const revealEndTrigger = 0.5; 
            const start = (i / totalWords) * revealEndTrigger;
            const end = ((i + 1) / totalWords) * revealEndTrigger;
            
            const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, '');
            
            const isGreen = greenWords.some(hw => cleanWord === hw.toLowerCase());
            const isRed = redWords.some(hw => cleanWord === hw.toLowerCase());
            
            return (
              <Word 
                key={i} 
                progress={scrollYProgress} 
                range={[start, end]}
                isGreen={isGreen}
                isRed={isRed}
              >
                {word}
              </Word>
            );
          })}
        </span>
      </div>
    </div>
  );
}

const Word = ({ children, progress, range, isGreen, isRed }) => {
  const opacity = useTransform(progress, range, [0, 1])
  return (
    <span className="xl:lg-3 relative mx-2 lg:mx-3 my-2">
      <span className="absolute opacity-10">{children}</span>
      <motion.span 
        style={{ opacity: opacity }} 
        className={cn(
          "text-white",
          isGreen && "text-primary italic font-black",
          isRed && "text-[#F96B6B] italic font-black"
        )}
      >
        {children}
      </motion.span>
    </span>
  );
}
