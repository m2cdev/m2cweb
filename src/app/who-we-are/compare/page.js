"use client";

import React from "react";
import { motion } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const comparisons = [
  {
    category: "Signal & Intent Intelligence Platforms",
    competitor: "Common Room / 6sense",
    leftItems: [
      "Aggregate pre-set buying signals across channels",
      "Surface intent data and account activity",
      "Tell you who to target and when",
    ],
    rightItems: [
      "Surface specific buying signals based on YOUR ICP",
      "Infuse buying intelligence data into your existing stack",
      "Turn intelligence into real pipeline, not just dashboards",
    ],
  },
  {
    category: "Revenue Intelligence & Call Analytics",
    competitor: "Gong",
    leftItems: [
      "Record and transcribe sales calls",
      "Surface deal risks and conversation insights",
      "Tell you what's going wrong in your deals",
    ],
    rightItems: [
      "Analyze rep performance, calls, and deal activity firsthand",
      "Identify exactly where the breakdown is happening",
      "Fix what's breaking, not just flag it",
    ],
  },
  {
    category: "Sales Strategy & Consulting",
    competitor: "Traditional Sales Consultancy",
    leftItems: [
      "Deliver a strategy and a slide deck",
      "Recommend tools and processes",
      "Hand execution back to your team",
    ],
    rightItems: [
      "Build the system inside your stack",
      "Embed alongside your reps in live deals",
      "Scale alongside your motion",
    ],
  },
];

export default function ComparePage() {
  return (
    <div className="flex flex-col w-full bg-[#0A0A0A] min-h-screen text-white antialiased selection:bg-[#62D2A2]/30">

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="w-full pt-36 pb-24 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12">

          {/* Left — text */}
          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-heading font-black text-[11px] text-[#62D2A2] tracking-[0.2em] uppercase mb-6"
            >
              The difference is execution
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading font-black text-[clamp(64px,7vw,110px)] leading-[0.9] tracking-[-0.04em] text-white mb-8"
            >
              How We<br /><span className="text-[#62D2A2]">Stack</span> Up
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-lg md:text-xl text-white max-w-[460px] leading-relaxed"
            >
              Why we're better in every sense. No shallow intent boards. No slide-deck strategies. Just standardized execution that moves the line.
            </motion.p>
          </div>

          {/* Right — full globe, no clipping */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="flex-shrink-0 w-[500px] h-[500px] hidden md:flex items-center justify-center"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
            }}
          >
            <RotatingEarth width={500} height={500} className="w-full h-full" />
          </motion.div>

        </div>
      </section>


      {/* ── Comparison Section ───────────────────────────────────────── */}
      <div className="container-custom py-24 space-y-8">
        {comparisons.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-60px" }}
            className="rounded-3xl bg-[#111111] border border-white/[0.06] overflow-hidden"
          >
            {/* Competitor label row */}
            <div className="px-8 pt-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <span className="font-heading font-black text-[22px] tracking-tight text-white">
                  {block.competitor}
                </span>
                <div className="w-6 h-[1px] bg-white/15" />
                <span className="font-heading font-black text-[13px] tracking-tight text-white">
                  {block.category}
                </span>
              </div>
            </div>

            {/* Two-column body */}
            <div className="grid grid-cols-1 md:grid-cols-2">

              {/* THEY column */}
              <div className="px-8 py-8 border-r border-white/[0.06]">
                <h4 className="font-heading font-black text-[13px] uppercase tracking-[0.15em] text-red-400 mb-8">
                  THEY:
                </h4>
                <ul className="space-y-5">
                  {block.leftItems.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.07 }}
                      viewport={{ once: true, margin: "-60px" }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-[9px] shrink-0" />
                      <p className="font-heading font-black text-[16px] text-red-300/80 leading-[1.75] tracking-tight">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* MAP2CLOSE column */}
              <div className="px-8 py-8 bg-[#0d1a14]">
                <h4 className="font-heading font-black text-[13px] uppercase tracking-[0.15em] text-[#62D2A2] mb-8">
                  THE MAP2CLOSE METHOD
                </h4>
                <ul className="space-y-5">
                  {block.rightItems.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      viewport={{ once: true, margin: "-60px" }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#62D2A2] mt-[9px] shrink-0 shadow-[0_0_8px_rgba(98,210,162,0.5)]" />
                      <p className="font-heading font-black text-[16px] text-white leading-[1.75] tracking-tight">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}
      </div>


      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="container-custom py-40 text-center hide-floating-cta border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="font-heading font-black text-[clamp(40px,5vw,72px)] leading-[1] tracking-[-0.03em] mb-4">
            <span className="block text-white">Still comparing?</span>
            <span className="block text-white">See the difference <span className="text-[#62D2A2]">firsthand.</span></span>
          </h2>

          <p className="font-heading text-white text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed">
            One working session. No commitment. You'll know by the end of it.
          </p>

          <div className="flex justify-center mt-4">
            <a
              href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShimmerButton
                shimmerColor="#62D2A2"
                background="#111"
                className="h-16 px-12 rounded-2xl"
              >
                <span className="font-heading font-black text-xl text-white tracking-tight">Book a working session</span>
              </ShimmerButton>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
