"use client";

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "@/components/ui/lamp";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { CheckCircle2 } from "lucide-react";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";

import { PilotHero } from "@/components/pilot/PilotHero";

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

const pilotCommitments = [
  {
    title: "One measurable outcome",
    description: "We define success up front, tie the work to a single KPI, and keep the scope disciplined enough to prove whether the motion works."
  },
  {
    title: "Systems you keep",
    description: "Playbooks, workflows, tooling changes, and documentation stay with your team whether we continue together or not."
  },
  {
    title: "Continuation has to be earned",
    description: "If the pilot does not create the agreed signal, we keep working against the outcome instead of pushing you into a retainer."
  }
];

export default function Pilot() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pb-20">
      <PilotHero />

      {/* Scope & Risk Free Section */}
      <section className="py-24 px-6 relative z-10 border-b border-white/10 bg-[#0a0a0a] overflow-hidden">
        {/* Brand Dual Radial Gradients */}
        {/* Premium Grid Background */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_10%,transparent_100%)]" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <CardSpotlight className="bg-white/[0.02] border-white/10 rounded-3xl p-10 md:p-16 hover:border-primary/50 transition-colors shadow-2xl">
            <h3 className="text-secondary font-bold text-sm uppercase tracking-widest mb-6 border border-secondary/20 bg-secondary/10 w-fit px-4 py-1.5 rounded-full relative z-20">Scoping</h3>
            <h4 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter relative z-20">Hyper-Focused Scope</h4>
            <p className="text-white text-lg leading-relaxed font-body relative z-20">We don&apos;t try to boil the ocean. The pilot targets a specific, high-friction area of your pipeline where we can prove momentum inside a measurable 3 to 6 month window. We define that outcome together before we start.</p>
          </CardSpotlight>
          <CardSpotlight className="bg-white/[0.02] border-white/10 rounded-3xl p-10 md:p-16 hover:border-primary/50 transition-colors shadow-2xl">
            <h3 className="text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20 bg-primary/10 w-fit px-4 py-1.5 rounded-full relative z-20">De-Risked</h3>
            <h4 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter relative z-20">No Long-Term Commitment.</h4>
            <p className="text-white text-lg leading-relaxed font-body relative z-20">We hate standard agency retainers. The pilot is a fixed-term engagement designed to prove our value. If you don&apos;t see the right signal, we shake hands and walk away. If you do, we scale.</p>
          </CardSpotlight>
        </div>
      </section>

      {/* Steps Section - Tracing Beam */}
      <div id="how-it-works" className="container-custom pt-32 pb-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-[#62D2A2]/[0.08] blur-[130px]" />
          <div className="absolute top-[40%] right-[10%] w-[450px] h-[450px] rounded-full bg-[#62D2A2]/[0.07] blur-[120px]" />
          <div className="absolute bottom-[15%] left-[35%] w-[500px] h-[500px] rounded-full bg-[#62D2A2]/[0.06] blur-[130px]" />
        </div>
        <TracingBeam className="px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {steps.map((item, index) => (
              <div key={index} className="mb-40">
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{item.step}</p>
                <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
                  {index === 0 && <>Define the <span className="text-[#F96B6B]">Outcome</span></>}
                  {index === 1 && <>Build and <span className="text-[#F96B6B]">Enable</span></>}
                  {index === 2 && <>Deliver <span className="text-[#F96B6B]">Results</span></>}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <p className="text-xl text-white font-body leading-relaxed">
                    {index === 0 && <>We align on one core KPI that actually matters. Not vague goals. A clear, measurable outcome.</>}
                    {index === 1 && <>We optimize your existing tech stack, building custom tooling where needed and provide live human enablement to drive the execution.</>}
                    {index === 2 && <>If we don&apos;t hit the target, we keep working until we do. Continuation is earned, not assumed. Results first.</>}
                  </p>
                  <CardSpotlight className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6 relative z-20">Deliverables</h3>
                    <ul className="space-y-4 relative z-20">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                          <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </CardSpotlight>
                </div>
              </div>
            ))}

            {/* Step 4 - Neon Card */}
            <div className="mb-20">
              <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">Step 04</p>
              <h2 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter">Deliverables</h2>

              <NeonGradientCard neonColors={{ firstColor: "#62d2a2", secondColor: "#f96b6b" }} className="p-1">
                <div className="bg-neutral-900 rounded-[var(--radius)] p-12 text-center">
                  <h3 className="text-2xl md:text-4xl font-black mb-6">Deliverables</h3>
                  <p className="text-xl text-white font-body mb-8 max-w-2xl mx-auto">
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {pilotCommitments.map((item) => (
                <CardSpotlight key={item.title} className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                  <p className="text-primary text-[11px] font-black uppercase tracking-[0.35em] mb-5 relative z-20">
                    Guarantee
                  </p>
                  <h3 className="text-2xl font-black text-white tracking-tight mb-4 relative z-20">
                    {item.title}
                  </h3>
                  <p className="text-white text-base leading-relaxed font-body relative z-20">
                    {item.description}
                  </p>
                </CardSpotlight>
              ))}
            </div>
          </div>
        </TracingBeam>
      </div>

      {/* Final CTA */}
      <div className="py-40 relative flex items-center justify-center min-h-[60vh] overflow-hidden text-center hide-floating-cta">
        <BackgroundBeams className="opacity-60" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
            <span className="text-[#F96B6B]">Only 4</span> Teams Onboarded Per Quarter.
          </h2>
          <p className="text-xl md:text-2xl text-white font-body mb-12 max-w-2xl text-center">We keep it small on purpose. Every pilot gets our full, undivided execution capacity.</p>
          <div className="flex justify-center">
            <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
              <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-16 px-12 rounded-2xl" shimmerSize="0.1em">
                <span className="text-xl font-black text-white tracking-widest uppercase">Book a Working Session</span>
              </ShimmerButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
