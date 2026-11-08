"use client";

import React from "react";
import Link from "next/link";
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

      {/* Scope & Risk Free Section (white) */}
      <section className="py-16 md:py-28 px-6 relative z-10 bg-white text-black overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-10 md:mb-14">
            <p className="mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em] text-[#12905D]">The pilot</p>
            <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.02] text-black max-w-4xl">Small scope. <span className="text-[#12905D]">Real signal.</span></h2>
            <p className="mt-5 text-base md:text-xl text-[#5E5E5A] font-body max-w-3xl">A fixed-term engagement built to prove the motion works.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="rounded-3xl border border-black/10 bg-[#F4F4F2] p-7 md:p-12 transition-all hover:-translate-y-0.5 hover:border-black/30">
              <span className="inline-block rounded-full bg-[#F96B6B] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white mb-6">Scoping</span>
              <h3 className="text-2xl md:text-4xl font-black text-black mb-5 tracking-tighter">Hyper-Focused Scope</h3>
              <p className="text-[#4A4A46] text-base md:text-lg leading-relaxed font-body">We don&apos;t try to boil the ocean. The pilot targets a specific, high-friction area of your pipeline where we can prove momentum inside a measurable 90-day window. We define that outcome together before we start.</p>
            </div>
            <div className="rounded-3xl bg-black border border-black p-7 md:p-12 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full blur-[90px] opacity-30 bg-[#62D2A2]" />
              <span className="relative inline-block rounded-full bg-[#62D2A2] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-black mb-6">De-Risked</span>
              <h3 className="relative text-2xl md:text-4xl font-black text-white mb-5 tracking-tighter">No Long-Term Commitment.</h3>
              <p className="relative text-white/90 text-base md:text-lg leading-relaxed font-body">We hate standard agency retainers. The pilot is a fixed-term engagement designed to prove our value. If you don&apos;t see the right signal, we shake hands and walk away. If you do, we scale.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section - Tracing Beam */}
      <div id="how-it-works" className="bg-[#F3F3F1] text-black px-6 pt-16 md:pt-32 pb-12 md:pb-20 relative z-10 overflow-hidden"><div className="max-w-6xl mx-auto mb-10 md:mb-16"><p className="mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em] text-[#12905D]">Timeline</p><h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.02] text-black">Four steps across <span className="text-[#12905D]">90 days</span></h2><p className="mt-5 text-base md:text-xl text-[#5E5E5A] font-body max-w-3xl">From the outcome we agree on, to the decision you make.</p></div>
        <TracingBeam className="px-6">
          <div className="max-w-4xl mx-auto antialiased pt-4 relative">
            {steps.map((item, index) => (
              <div key={index} className="mb-16 md:mb-40">
                <p className="text-[#12905D] font-bold text-sm uppercase tracking-widest mb-4">{item.step}</p>
                <h2 className="text-2xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter text-black">
                  {index === 0 && <>Define the <span className="text-[#F96B6B]">Outcome</span></>}
                  {index === 1 && <>Build and <span className="text-[#F96B6B]">Enable</span></>}
                  {index === 2 && <>Deliver <span className="text-[#F96B6B]">Results</span></>}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <p className="text-base md:text-xl text-[#4A4A46] font-body leading-relaxed">
                    {index === 0 && <>We align on one core KPI that actually matters. Not vague goals. A clear, measurable outcome.</>}
                    {index === 1 && <>We optimize your existing tech stack, building custom tooling where needed and provide live human enablement to drive the execution.</>}
                    {index === 2 && <>If we don&apos;t hit the target, we keep working until we do. Continuation is earned, not assumed. Results first.</>}
                  </p>
                  <div className="bg-white border border-black/10 rounded-2xl p-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-black mb-6 relative z-20">Deliverables</h3>
                    <ul className="space-y-4 relative z-20">
                      {item.deliverables.map((d, i) => (
                        <li key={i} className="flex items-center gap-3 text-black font-medium">
                          <CheckCircle2 className="text-[#12905D] w-5 h-5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}

            {/* Step 4 */}
            <div className="mb-20">
              <p className="text-[#12905D] font-bold text-sm uppercase tracking-widest mb-4">Step 04</p>
              <h2 className="text-2xl md:text-6xl font-black mb-6 md:mb-8 tracking-tighter text-black">Review and <span className="text-[#F96B6B]">Decide</span></h2>
              <p className="text-base md:text-xl text-[#4A4A46] font-body leading-relaxed max-w-3xl">
                At the end of the 90 days we review the result against the outcome we agreed on at the start. Then you choose: continue, adjust the target, or keep everything we built and walk away.
              </p>
            </div>

            {/* What you get from the working session */}
            <div className="mb-20">
              <NeonGradientCard neonColors={{ firstColor: "#62d2a2", secondColor: "#f96b6b" }} className="p-1">
                <div className="bg-neutral-900 rounded-[var(--radius)] p-6 md:p-12 text-center">
                  <h3 className="text-xl md:text-4xl font-black mb-6 text-white">What you get from the working session</h3>
                  <p className="text-base md:text-xl text-white font-body mb-8 max-w-2xl mx-auto">
                    Even if we never work together again, you leave the working session with a clear Path-to-Close Plan. Execute it yourself, with another partner, or with us.
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
                <div key={item.title} className="bg-white border border-black/10 rounded-3xl p-8">
                  <p className="text-[#12905D] text-[11px] font-black uppercase tracking-[0.35em] mb-5 relative z-20">
                    Guarantee
                  </p>
                  <h3 className="text-2xl font-black text-black tracking-tight mb-4 relative z-20">
                    {item.title}
                  </h3>
                  <p className="text-[#4A4A46] text-base leading-relaxed font-body relative z-20">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TracingBeam>
      </div>

      {/* Final CTA */}
      <div className="py-16 md:py-40 relative flex items-center justify-center min-h-[30vh] md:min-h-[60vh] overflow-hidden text-center hide-floating-cta">
        <BackgroundBeams className="opacity-60" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
            <span className="text-[#F96B6B]">Only 4</span> Teams Onboarded Per Quarter.
          </h2>
          <p className="text-base md:text-2xl text-white font-body mb-10 md:mb-12 max-w-2xl text-center">We keep it small on purpose. Every pilot gets our full, undivided execution capacity.</p>
          <div className="flex justify-center">
            <Link href="/contact">
              <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-12 px-8 md:h-16 md:px-12 rounded-2xl" shimmerSize="0.1em">
                <span className="text-sm md:text-xl font-black text-white tracking-widest uppercase">Book a Working Session</span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
