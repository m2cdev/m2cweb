"use client";
import { motion, useScroll, useSpring } from "framer-motion";

import { cn } from "@/lib/utils"

export function ScrollProgress({
  className,
  ref,
  ...props
}) {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#63D2A3] to-[#FF6B6B]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props} />
  );
}
