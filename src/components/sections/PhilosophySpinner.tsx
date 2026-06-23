"use client";

import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIsLowTier } from "@/providers/DeviceTierProvider";

gsap.registerPlugin(ScrollTrigger);

/* ─── Pillar data ─── */
const PILLARS = [
  {
    id: "systems",
    num: "01",
    label: "SYSTEMS",
    title: "Systems",
    body: "The infrastructure your team runs on. CRM, tooling, automation built to support the way deals actually move.",
  },
  {
    id: "process",
    num: "02",
    label: "PROCESS",
    title: "Process",
    body: "The oil your sales motion runs on. Clear, repeatable, and designed around how your buyers make decisions.",
  },
  {
    id: "execution",
    num: "03",
    label: "EXECUTION",
    title: "Execution",
    body: "Where most partners tap out. We stay in it coaching reps, supporting live deals, and driving the motion until results show up.",
  },
];

/* ─── Global Config ─── */
const MINT = "#62D2A2";
const DIM = "#1A1A1A";

// Utils
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  if (val <= inMin) return outMin;
  if (val >= inMax) return outMax;
  return outMin + ((val - inMin) / (inMax - inMin)) * (outMax - outMin);
};

export default function PhilosophySpinner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const isLowTier = useIsLowTier();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    // Skip the GSAP scrub entirely on mobile OR low-tier devices.
    // Low-tier: per-frame SVG DOM writes saturate the main thread.
    if (isMobile || isLowTier) return;

    const trigger = triggerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => setProgress(self.progress),
      });
    }, trigger);

    return () => ctx.revert();
  }, [isMobile, isLowTier]);

  /* ─── SVG Geometry Mathematics ─── */
  const CENTER = 200;
  const RADIUS = 120;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const ARC_LENGTH = (105 / 360) * CIRCUMFERENCE;

  const N1 = { x: 200, y: 80 }; // Top (-90 deg)
  const N2 = { x: 303.92, y: 260 }; // Bottom-Right (+30 deg)
  const N3 = { x: 96.08, y: 260 }; // Bottom-Left (+150 deg)

  if (isMobile || isLowTier) {
    return (
      <div className="relative bg-[#050505] py-24 pb-32">
        <div className="flex flex-col items-center max-w-lg mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-[240px] h-[240px] mb-16 relative"
          >
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={MINT} strokeWidth="6" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(-90 ${CENTER} ${CENTER})`} />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={MINT} strokeWidth="6" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(30 ${CENTER} ${CENTER})`} />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={MINT} strokeWidth="6" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(150 ${CENTER} ${CENTER})`} />
              
              <circle cx={N1.x} cy={N1.y} r="14" fill={MINT} />
              <circle cx={N2.x} cy={N2.y} r="14" fill={MINT} />
              <circle cx={N3.x} cy={N3.y} r="14" fill={MINT} />
            </svg>
          </motion.div>

          <div className="flex flex-col gap-24 w-full">
            {PILLARS.map((pillar) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                className="flex flex-col"
              >
                <div className="text-[#62D2A2] font-mono font-medium text-[16px] tracking-[0.15em] uppercase mb-2">
                  {pillar.num} {pillar.label}
                </div>
                <div className="text-white font-heading font-bold text-[36px] mb-3">
                  {pillar.title}
                </div>
                <div className="text-[#AAAAAA] font-body text-[18px] leading-[1.6] max-w-[400px]">
                  {pillar.body}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-32 text-center"
          >
            <p className="text-white font-black text-[24px] tracking-[-0.02em] mb-2">
              Most teams focus on just one.
            </p>
            <h2 className="text-[#62D2A2] font-black text-[32px] tracking-[-0.04em] leading-tight">
              We focus on all three at the same time.
            </h2>
          </motion.div>
        </div>
      </div>
    );
  }

  // --- DESKTOP ANIMATION LOGIC ---
  const node1Active = progress > 0.15;
  const node2Active = progress > 0.40;
  const node3Active = progress > 0.65;

  const arc1Progress = clamp(mapRange(progress, 0.15, 0.35, 0, 1), 0, 1);
  const arc2Progress = clamp(mapRange(progress, 0.40, 0.60, 0, 1), 0, 1);
  const arc3Progress = clamp(mapRange(progress, 0.65, 0.85, 0, 1), 0, 1);

  // Intro fade
  const introOp = progress <= 0.10 ? mapRange(progress, 0.0, 0.05, 0, 1) : mapRange(progress, 0.10, 0.15, 1, 0);

  // Fade texts in and out exactly matched to their arc progress
  const p1Op = (progress >= 0.15 && progress <= 0.38) ? (
    progress <= 0.20 ? mapRange(progress, 0.15, 0.20, 0, 1) : 
    progress >= 0.35 ? mapRange(progress, 0.35, 0.38, 1, 0) : 1
  ) : 0;
  
  const p2Op = (progress >= 0.40 && progress <= 0.63) ? (
    progress <= 0.45 ? mapRange(progress, 0.40, 0.45, 0, 1) : 
    progress >= 0.60 ? mapRange(progress, 0.60, 0.63, 1, 0) : 1
  ) : 0;

  const p3Op = (progress >= 0.65 && progress <= 0.88) ? (
    progress <= 0.70 ? mapRange(progress, 0.65, 0.70, 0, 1) : 
    progress >= 0.85 ? mapRange(progress, 0.85, 0.88, 1, 0) : 1
  ) : 0;

  const closing1Op = progress > 0.90 ? Math.min(1, mapRange(progress, 0.90, 0.92, 0, 1)) : 0;
  const closing2Op = progress > 0.93 ? Math.min(1, mapRange(progress, 0.93, 0.95, 0, 1)) : 0;

  const getGlow = (active: boolean) => active ? `drop-shadow(0 0 16px rgba(98, 210, 162, 0.6))` : 'none';

  return (
    <>
      <div ref={triggerRef} className="relative w-full h-[3000px] bg-[#050505] overflow-visible">
        <div ref={containerRef} className="sticky top-0 w-full h-screen flex items-center justify-center overflow-visible bg-[#050505]">
          
          {/* INTRO TEXT */}
          <div 
            className="absolute top-[18%] left-1/2 -translate-x-1/2 text-center z-10 w-full"
            style={{ opacity: introOp, pointerEvents: introOp > 0 ? 'auto' : 'none' }}
          >
            <p className="text-[#62D2A2] font-mono text-[14px] uppercase tracking-[0.25em]">
              Sales improves when three things work together:
            </p>
          </div>

          {/* MAIN KINETIC LOGO - Reduced size slightly to give more headroom for text headers */}
          <motion.div
            className="absolute z-20 w-[500px] h-[500px] flex items-center justify-center mt-20"
            style={{
              scale: progress > 0.05 && progress < 0.95 ? 1.05 : 1, 
            }}
          >
            <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
              
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={DIM} strokeWidth="3" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(-90 ${CENTER} ${CENTER})`} />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={DIM} strokeWidth="3" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(30 ${CENTER} ${CENTER})`} />
              <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke={DIM} strokeWidth="3" strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} strokeLinecap="round" transform={`rotate(150 ${CENTER} ${CENTER})`} />

              <circle 
                cx={CENTER} cy={CENTER} r={RADIUS} 
                fill="none" stroke={MINT} strokeWidth="3" 
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} 
                strokeDashoffset={ARC_LENGTH - (arc1Progress * ARC_LENGTH)} 
                strokeLinecap="round" 
                transform={`rotate(-90 ${CENTER} ${CENTER})`} 
              />
              <circle 
                cx={CENTER} cy={CENTER} r={RADIUS} 
                fill="none" stroke={MINT} strokeWidth="3" 
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} 
                strokeDashoffset={ARC_LENGTH - (arc2Progress * ARC_LENGTH)} 
                strokeLinecap="round" 
                transform={`rotate(30 ${CENTER} ${CENTER})`} 
              />
              <circle 
                cx={CENTER} cy={CENTER} r={RADIUS} 
                fill="none" stroke={MINT} strokeWidth="3" 
                strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`} 
                strokeDashoffset={ARC_LENGTH - (arc3Progress * ARC_LENGTH)} 
                strokeLinecap="round" 
                transform={`rotate(150 ${CENTER} ${CENTER})`} 
              />

              {/* Node Backgrounds */}
              <circle cx={N1.x} cy={N1.y} r="16" fill={DIM} />
              <circle cx={N2.x} cy={N2.y} r="16" fill={DIM} />
              <circle cx={N3.x} cy={N3.y} r="16" fill={DIM} />

              <circle 
                cx={N1.x} cy={N1.y} r="16" 
                fill={node1Active ? MINT : 'transparent'} 
                style={{ filter: getGlow(node1Active && progress <= 0.40), transition: 'filter 0.5s', opacity: node1Active ? 1 : 0 }} 
              />
              <circle 
                cx={N2.x} cy={N2.y} r="16" 
                fill={node2Active ? MINT : 'transparent'} 
                style={{ filter: getGlow(node2Active && progress <= 0.65), transition: 'filter 0.5s', opacity: node2Active ? 1 : 0 }} 
              />
              <circle 
                cx={N3.x} cy={N3.y} r="16" 
                fill={node3Active ? MINT : 'transparent'} 
                style={{ filter: getGlow(node3Active && progress <= 1.0), transition: 'filter 0.5s', opacity: node3Active ? 1 : 0 }} 
              />
            </svg>
          </motion.div>

          {/* ────── FLOATING TEXT BLOCKS ────── */}
          
          {/* Node 1 Text: Anchored by 'top' to prevent any viewport clipping. Aligned horizontally with top node. */}
          <div 
            className="absolute z-30 px-10"
            style={{ 
              top: 'calc(50% - 220px)', right: '5%',
              opacity: p1Op, 
              pointerEvents: p1Op > 0 ? 'auto' : 'none',
              transform: `translateX(${p1Op === 1 ? 0 : 40}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="max-w-[450px] text-right">
              <div className="text-[#62D2A2] font-mono font-medium text-[16px] tracking-[0.15em] uppercase mb-2">
                {PILLARS[0].num} {PILLARS[0].label}
              </div>
              <div className="text-white font-black text-[48px] tracking-[-0.04em] mb-3 leading-none">
                {PILLARS[0].title}
              </div>
              <div className="text-[#AAAAAA] font-body text-[22px] leading-[1.6]">
                {PILLARS[0].body}
              </div>
            </div>
          </div>

          {/* Node 2 Text: Repositioned higher to avoid collision with bottom-right CTA */}
          <div 
            className="absolute z-30 px-10"
            style={{ 
              top: 'calc(50% + 30px)', right: '5%',
              opacity: p2Op, 
              pointerEvents: p2Op > 0 ? 'auto' : 'none',
              transform: `translateX(${p2Op === 1 ? 0 : 40}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="max-w-[400px] text-right">
              <div className="text-[#62D2A2] font-mono font-medium text-[16px] tracking-[0.15em] uppercase mb-2">
                {PILLARS[1].num} {PILLARS[1].label}
              </div>
              <div className="text-white font-black text-[48px] tracking-[-0.04em] mb-3 leading-none">
                {PILLARS[1].title}
              </div>
              <div className="text-[#AAAAAA] font-body text-[22px] leading-[1.6]">
                {PILLARS[1].body}
              </div>
            </div>
          </div>

          {/* Node 3 Text: Repositioned higher to maintain symmetry with node 2 */}
          <div 
            className="absolute z-30 px-10"
            style={{ 
              top: 'calc(50% + 30px)', left: '5%',
              opacity: p3Op, 
              pointerEvents: p3Op > 0 ? 'auto' : 'none',
              transform: `translateX(${p3Op === 1 ? 0 : -40}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="max-w-[400px]">
              <div className="text-[#62D2A2] font-mono font-medium text-[16px] tracking-[0.15em] uppercase mb-2">
                {PILLARS[2].num} {PILLARS[2].label}
              </div>
              <div className="text-white font-black text-[48px] tracking-[-0.04em] mb-3 leading-none">
                {PILLARS[2].title}
              </div>
              <div className="text-[#AAAAAA] font-body text-[22px] leading-[1.6]">
                {PILLARS[2].body}
              </div>
            </div>
          </div>

          {/* ────── CLOSING TEXT ────── */}
          <div 
            className="absolute left-1/2 w-full text-center z-30 flex flex-col items-center"
            style={{ 
              top: 'calc(50% + 280px)', 
              transform: 'translateX(-50%)' 
            }}
          >
            <p 
              className="text-white font-black text-[32px] md:text-[40px] tracking-[-0.02em] mb-4"
              style={{ opacity: closing1Op, transform: `translateY(${(1-closing1Op)*20}px)` }}
            >
              Most teams focus on just one.
            </p>
            <h2 
              className="text-[#62D2A2] font-black text-[54px] md:text-[72px] tracking-[-0.04em] leading-[0.95]"
              style={{ opacity: closing2Op, transform: `translateY(${(1-closing2Op)*20}px)` }}
            >
              We focus on all three at the same time.
            </h2>
          </div>

        </div>
      </div>
      
      {/* Spacer to guarantee clear reading and unpin release */}
      <div className="h-[40px] w-full bg-[#050505]"></div>
    </>
  );
}
