"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";

const circles = [
  { label: "People", href: "/what-we-do/people", cx: 150, cy: 150, from: { x: -80, y: 0 } },
  { label: "Process", href: "/what-we-do/process", cx: 250, cy: 150, from: { x: 80, y: 0 } },
  { label: "Platforms", href: "/what-we-do/platforms", cx: 200, cy: 235, from: { x: 0, y: 80 } },
];

export default function Triad() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const show = inView || reduce;
  return (
    <div ref={ref} className="mx-auto w-full max-w-[520px]">
      <svg viewBox="0 0 400 340" className="w-full h-auto" role="img" aria-label="People, Process and Platforms overlap">
        <defs>
          <radialGradient id="triad-glow">
            <stop offset="0%" stopColor="#62D2A2" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#62D2A2" stopOpacity="0" />
          </radialGradient>
        </defs>
        {circles.map((c, i) => (
          <motion.g
            key={c.label}
            initial={{ opacity: 0, x: c.from.x, y: c.from.y }}
            animate={show ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: c.from.x, y: c.from.y }}
            transition={{ duration: reduce ? 0 : 0.9, ease: "easeInOut", delay: i * 0.05 }}
          >
            <Link href={c.href}>
              <circle cx={c.cx} cy={c.cy} r="95" fill="rgba(98,210,162,0.04)" stroke="#62D2A2" strokeOpacity="0.7" strokeWidth="1.5" className="cursor-pointer transition-all hover:fill-[rgba(98,210,162,0.12)]" />
            </Link>
          </motion.g>
        ))}
        <motion.circle
          cx="200" cy="180" r="48" fill="url(#triad-glow)"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.9 }}
          pointerEvents="none"
        />
        <motion.text
          x="200" y="190" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="900" letterSpacing="-1"
          initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 1 }} pointerEvents="none"
        >
          M2C
        </motion.text>
        <text x="108" y="140" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" pointerEvents="none">People</text>
        <text x="292" y="140" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" pointerEvents="none">Process</text>
        <text x="200" y="285" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" pointerEvents="none">Platforms</text>
      </svg>
    </div>
  );
}
