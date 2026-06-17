"use client";

import React, { Suspense } from "react";
import { motion } from "framer-motion";
import RotatingEarth from "@/components/ui/wireframe-dotted-globe";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import GenerativeMountainScene from "@/components/ui/mountain-scene";

const comparisons = [
  {
    category: "Signal and Intent Intelligence",
    competitor: "Signal and Intent Platforms",
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
    category: "Revenue Intelligence and Call Analytics",
    competitor: "Revenue Intelligence and Call Analytics",
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

const verticalComparisons = [
  {
    dimension: "Depth of Engagement",
    others: "Periodic check-ins, QBRs, and status calls",
    m2c: "Embedded inside live pipeline, present on real calls, real deals",
  },
  {
    dimension: "Execution vs Advice",
    others: "Deliver frameworks, playbooks, and recommendations",
    m2c: "Build the system, train the team, and stay until it's working",
  },
  {
    dimension: "Speed to Impact",
    others: "Weeks of discovery before any output appears",
    m2c: "Revenue-impacting changes deployed within the first engagement",
  },
  {
    dimension: "Proof of Work",
    others: "Slide decks, reports, and strategy documents",
    m2c: "Running automations, trained reps, and measurable pipeline movement",
  },
  {
    dimension: "Rep Adoption",
    others: "Handed off at delivery. Adoption is your team's problem",
    m2c: "We train inside the rebuilt motion and pressure-test it against live deals",
  },
  {
    dimension: "Tech Stack Ownership",
    others: "Tool recommendations without implementation",
    m2c: "Configured, integrated, and optimized inside your existing stack",
  },
];

export default function ComparePage() {
  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen text-white antialiased selection:bg-[#62D2A2]/30">

      {/* ── Hero Section ─────────────────────────────────────────────── */}
      <section className="relative w-full h-[90vh] md:h-screen flex items-center overflow-hidden border-b border-white/10">

        <Suspense fallback={<div className="absolute inset-0 bg-[#050505]" />}>
          <div className="absolute inset-x-0 bottom-0 top-1/4 z-0 opacity-80">
            <GenerativeMountainScene />
          </div>
        </Suspense>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 relative z-10 w-full">

          <div className="flex-1 min-w-0">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono font-bold text-[11px] text-[#62D2A2] tracking-[0.2em] uppercase mb-6"
            >
              The difference is execution
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-black text-[clamp(32px,7vw,110px)] leading-[0.9] tracking-[-0.01em] text-white mb-8"
            >
              How We<br /><span className="text-primary opacity-90">Stack</span> Up
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-body text-xl md:text-2xl text-white max-w-[460px] leading-relaxed"
            >
              Why execution wins here. No shallow intent boards. No slide-deck strategies. Just standardized execution that moves the line.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="flex-shrink-0 w-[500px] h-[500px] hidden md:flex items-center justify-center opacity-80"
            style={{
              maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 50%, transparent 100%)',
            }}
          >
            <RotatingEarth width={500} height={500} className="w-full h-full" />
          </motion.div>

        </div>

        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#050505] to-transparent z-5" />
      </section>


      {/* ── Horizontal Comparison Section ───────────────────────────────────────── */}
      <div className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
          <div className="absolute left-10 top-10 w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
          <div className="absolute right-10 top-10 w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
          <div className="absolute left-10 bottom-10 w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
          <div className="absolute right-10 bottom-10 w-1.5 h-1.5 rounded-full bg-white/20 hidden md:block" />
        </div>

        <div className="container-custom relative z-20 space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-[-0.01em] text-white mb-4">
              The Map2Close <span className="text-primary opacity-90">Standard</span>
            </h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full" />
          </div>

          {comparisons.map((block, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
              className="relative rounded-[2.5rem] bg-white/[0.02] border border-white/[0.06] overflow-hidden backdrop-blur-sm"
            >
              {/* Subtle brand color glow behind each card */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-20 -top-20 w-[300px] h-[300px] rounded-full bg-[#62D2A2]/5 blur-[80px]" />
                <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] rounded-full bg-[#F96B6B]/5 blur-[80px]" />
              </div>

              {/* Competitor label row */}
              <div className="px-10 pt-10 pb-8 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <h3 className="font-heading font-black text-[32px] tracking-tight text-white">
                    {block.competitor}
                  </h3>
                </div>
              </div>

              {/* Two-column body */}
              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* THEY column */}
                <div className="px-10 py-10 border-r border-white/[0.06] bg-coral/[0.02]">
                  <h4 className="font-mono font-black text-[13px] uppercase tracking-[0.15em] text-coral mb-8">
                    THEY:
                  </h4>
                  <ul className="space-y-6">
                    {block.leftItems.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.07 }}
                        viewport={{ once: true, margin: "-60px" }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-coral mt-[9px] shrink-0" />
                        <p className="font-body text-[17px] text-white leading-[1.75] tracking-tight font-medium">
                          {item}
                        </p>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* MAP2CLOSE column */}
                <div className="px-10 py-10 bg-primary/[0.02]">
                  <h4 className="font-mono font-black text-[13px] uppercase tracking-[0.15em] text-[#62D2A2] mb-8">
                    THE MAP2CLOSE METHOD
                  </h4>
                  <ul className="space-y-6">
                    {block.rightItems.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + i * 0.08 }}
                        viewport={{ once: true, margin: "-60px" }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#62D2A2] mt-[9px] shrink-0 shadow-[0_0_12px_rgba(98,210,162,0.6)]" />
                        <p className="font-body text-[17px] text-white/90 leading-[1.75] tracking-tight font-medium">
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
      </div>


      {/* ── Vertical Comparison Section ───────────────────────────────────── */}
      <div className="w-full py-24 relative overflow-hidden border-t border-white/[0.06]">
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_10%,transparent_100%)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-[radial-gradient(ellipse_at_top,rgba(98,210,162,0.06),transparent_70%)]" />
        </div>

        <div className="container-custom relative z-20">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono font-bold text-[11px] text-[#62D2A2] tracking-[0.2em] uppercase mb-4"
            >
              Side by Side
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-[-0.01em] text-white mb-4"
            >
              Execution vs <span className="text-[#F96B6B]">Everything Else</span>
            </motion.h2>
            <div className="h-1 w-20 bg-[#F96B6B] mx-auto rounded-full" />
          </div>

          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] gap-0 mb-2 hidden md:grid">
            <div className="px-6 py-3">
              <span className="font-mono font-black text-[12px] uppercase tracking-[0.2em] text-white/40">Dimension</span>
            </div>
            <div className="px-6 py-3 border-l border-white/[0.06]">
              <span className="font-mono font-black text-[12px] uppercase tracking-[0.2em] text-coral">Others</span>
            </div>
            <div className="px-6 py-3 border-l border-white/[0.06]">
              <span className="font-mono font-black text-[12px] uppercase tracking-[0.2em] text-[#62D2A2]">Map2Close</span>
            </div>
          </div>

          <div className="relative rounded-[2rem] border border-white/[0.06] overflow-hidden bg-white/[0.01]">
            {/* Subtle brand color glows behind the table */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -left-10 top-0 w-[300px] h-full bg-coral/[0.04] blur-[80px]" />
              <div className="absolute -right-10 bottom-0 w-[300px] h-full bg-[#62D2A2]/[0.04] blur-[80px]" />
            </div>

            <div className="relative z-10 divide-y divide-white/[0.06]">
              {verticalComparisons.map((row, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  viewport={{ once: true, margin: "-40px" }}
                  className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] hover:bg-white/[0.03] transition-colors duration-300 ${index % 2 === 0 ? 'bg-white/[0.01]' : 'bg-transparent'}`}
                >
                <div className="px-6 py-6 flex items-center">
                  <span className="font-black text-white text-[15px] tracking-tight">{row.dimension}</span>
                </div>
                <div className="px-6 py-6 border-t md:border-t-0 md:border-l border-white/[0.06] bg-coral/[0.01]">
                  <p className="font-body text-[15px] text-white leading-relaxed">{row.others}</p>
                </div>
                <div className="px-6 py-6 border-t md:border-t-0 md:border-l border-white/[0.06] bg-primary/[0.02]">
                  <p className="font-body text-[15px] text-white leading-relaxed font-medium">{row.m2c}</p>
                </div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>
      </div>


      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="container-custom py-16 md:py-40 text-center hide-floating-cta border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4"
        >
          <h2 className="font-black text-[clamp(28px,5vw,72px)] leading-[1.1] tracking-[-0.03em] mb-4">
            <span className="block text-white">Still Comparing?</span>
            <span className="block text-white">See the Difference <span className="text-[#62D2A2] opacity-90">Firsthand.</span></span>
          </h2>

          <p className="font-body text-white text-base md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
            One working session. No commitment. You will know by the end of it.
          </p>

          <div className="flex justify-center mt-4">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ShimmerButton
                shimmerColor="#62D2A2"
                background="#111"
                className="h-12 px-8 md:h-16 md:px-12 rounded-2xl"
              >
                <span className="font-body font-black text-sm md:text-xl text-white tracking-widest uppercase">Book a Working Session</span>
              </ShimmerButton>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
