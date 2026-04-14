"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    step: "Step 01",
    title: "Define the Outcome",
    description: "We align on one core KPI that actually matters. Not vague goals. A clear, measurable win.",
    deliverables: ["Pipeline lift", "Conversion rates", "Deal velocity", "Stalled deals"]
  },
  {
    step: "Step 02",
    title: "Build and Enable",
    description: "We optimize your existing tech stack, building custom tooling where needed and provide live human enablement to drive the execution.",
    deliverables: ["Custom tools", "CRM workflows", "Tooling design", "Live deal support"]
  },
  {
    step: "Step 03",
    title: "Deliver Results",
    description: "If we don't hit the target, we keep working until we do. Continuation is earned, not assumed.",
    deliverables: ["Outcome-based", "Low risk", "Short timeline", "Clear metrics"]
  },
];

export default function Pilot() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pb-20 overflow-hidden">
      {/* Hero Section - Lamp */}
      <section className="relative z-0 min-h-[90vh] w-full flex flex-col items-center justify-center">
        <LampContainer>
          <motion.div 
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center text-center mt-12 px-4"
          >
            <h1 className="bg-gradient-to-br from-white to-gray-500 py-4 bg-clip-text text-5xl font-black tracking-tighter text-transparent md:text-8xl">
              The Pilot <br /> <span className="text-3xl md:text-5xl font-bold text-primary font-body uppercase tracking-[0.3em] inline-block mt-4">Prove It First. Scale What Works.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-body mt-8 max-w-2xl mx-auto leading-relaxed">
              The Custom Pilot is a 3–6 month engagement scoped around one meaningful outcome. No long-term contracts. No guessing. Just results.
            </p>
          </motion.div>
        </LampContainer>
      </section>

      {/* Steps Section - Tracing Beam */}
      <div className="container-custom pt-32 pb-20 relative z-10">
        <TracingBeam className="px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {steps.map((item, index) => (
              <div key={index} className="mb-40">
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{item.step}</p>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">{item.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <p className="text-xl text-gray-400 font-body leading-relaxed">
                    {item.description}
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6">Deliverables</h3>
                    <ul className="space-y-4">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                          <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Step 4 - Neon Card */}
            <div className="mb-20">
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Step 04</p>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">What You Get</h2>

              <NeonGradientCard neonColors={{ firstColor: "#62d2a2", secondColor: "#f96b6b" }} className="p-1">
                <div className="bg-neutral-900 rounded-[var(--radius)] p-12 text-center">
                  <h3 className="text-2xl md:text-4xl font-black mb-6">What You Get</h3>
                  <p className="text-xl text-gray-400 font-body mb-8 max-w-2xl mx-auto">
                    Even if we never work together again. Leave the working session with a clear Path-to-Close Plan. Execute it yourself, with another partner, or with us.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    {["Clear action plan", "Highest-ROI fixes identified", "People vs system problems", "Funnel friction points", "Written summary you keep forever"].map((tag) => (
                      <span key={tag} className="px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </NeonGradientCard>
            </div>
          </div>
        </TracingBeam>
      </div>

      {/* Final CTA */}
      <div className="container-custom py-40 text-center">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">Only 4 Teams Onboarded Per Quarter.</h2>
        <p className="text-xl text-gray-400 font-body mb-12 max-w-xl mx-auto">We keep it small on purpose. Every pilot gets our full attention.</p>
        <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
          <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-16 px-12 rounded-2xl">
            <span className="text-xl font-bold text-white tracking-tight">Book a Working Session</span>
          </ShimmerButton>
        </a>
      </div>
    </div>
  );
}
