"use client";

import React from "react";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BackgroundBeams } from "@/components/ui/background-beams";

import { PilotHero } from "@/components/pilot/PilotHero";

import PilotFlight from "@/components/pilot/PilotFlight";
import { Reveal } from "@/components/revamp/ui";

const MINT = "#63D2A3";
const CORAL = "#FF6B6B";

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

const stats = [
  { big: "1", label: "Measurable outcome" },
  { big: "90", label: "Days to prove it" },
  { big: "4", label: "Teams onboarded per quarter" },
];

export default function Pilot() {
  return (
    <div className="flex flex-col w-full bg-black text-white min-h-screen">
      <PilotHero />

      {/* Scope and risk: dark, bold, one mint card */}
      <section className="relative z-10 overflow-hidden bg-black px-6 py-20 md:py-32">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full blur-[140px] opacity-25" style={{ background: MINT }} />
        <div className="pointer-events-none absolute -bottom-40 left-[-10%] h-[420px] w-[420px] rounded-full blur-[140px] opacity-15" style={{ background: CORAL }} />
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <p className="mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em]" style={{ color: MINT }}>The pilot</p>
            <h2 className="max-w-4xl text-4xl md:text-7xl font-black tracking-tighter leading-[0.98]">Small scope. <span style={{ color: MINT }}>Real signal.</span></h2>
            <p className="mt-6 max-w-3xl text-base md:text-xl text-white/70 font-body">A fixed-term engagement built to prove the motion works.</p>
          </Reveal>

          <div className="mt-12 md:mt-16 grid grid-cols-3 border-y border-white/15">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1} className={`py-6 md:py-10 px-3 md:px-8 ${i > 0 ? "border-l border-white/15" : ""}`}>
                <div className="text-5xl md:text-8xl font-black tracking-tighter leading-none" style={{ color: i === 1 ? MINT : i === 2 ? CORAL : "#fff" }}>{s.big}</div>
                <p className="mt-3 text-[11px] md:text-sm font-black uppercase tracking-[0.18em] text-white/60">{s.label}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 md:mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/15 bg-[#0c0c0c] p-7 md:p-12">
                <span className="mb-6 inline-block rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-black" style={{ background: CORAL }}>Scoping</span>
                <h3 className="mb-5 text-2xl md:text-4xl font-black tracking-tighter">Hyper-Focused Scope</h3>
                <p className="text-base md:text-lg leading-relaxed text-white/75 font-body">We don&apos;t try to boil the ocean. The pilot targets a specific, high-friction area of your pipeline where we can prove momentum inside a measurable 90-day window. We define that outcome together before we start.</p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-3xl p-7 md:p-12 text-black" style={{ background: MINT }}>
                <span className="mb-6 inline-block rounded-full bg-black px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: MINT }}>De-Risked</span>
                <h3 className="mb-5 text-2xl md:text-4xl font-black tracking-tighter">No Long-Term Commitment.</h3>
                <p className="text-base md:text-lg leading-relaxed font-body font-medium text-black/85">We hate standard agency retainers. The pilot is a fixed-term engagement designed to prove our value. If you don&apos;t see the right signal, we shake hands and walk away. If you do, we scale.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Horizontal, scroll-driven flight through the four steps */}
      <PilotFlight />

      {/* Working session */}
      <section className="relative overflow-hidden bg-black px-6 py-20 md:py-32">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <div className="rounded-[2rem] p-8 md:p-16 text-black relative overflow-hidden" style={{ background: MINT }}>
              <svg className="pointer-events-none absolute -right-10 -top-10 h-[120%] opacity-20" viewBox="0 0 400 400" fill="none" aria-hidden>
                {[60, 100, 140, 180, 220].map((r) => <circle key={r} cx="400" cy="0" r={r * 1.6} stroke="#000" strokeWidth="1.5" />)}
              </svg>
              <p className="relative mb-4 text-[12px] font-black uppercase tracking-[0.3em] text-black/70">Working session</p>
              <h3 className="relative max-w-3xl text-3xl md:text-6xl font-black tracking-tighter leading-[1]">What you get from the working session</h3>
              <p className="relative mt-6 max-w-2xl text-base md:text-xl font-body font-medium text-black/85">
                Even if we never work together again, you leave the working session with a clear Path-to-Close Plan. Execute it yourself, with another partner, or with us.
              </p>
              <div className="relative mt-8 flex flex-wrap gap-3">
                {["Clear action plan", "Highest-ROI fixes identified", "People vs system problems", "Funnel friction points", "Written summary you keep forever"].map((tag) => (
                  <span key={tag} className="rounded-full bg-black px-5 py-2 text-xs md:text-sm font-black uppercase tracking-widest" style={{ color: MINT }}>{tag}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 md:mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pilotCommitments.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-white/15 bg-[#0c0c0c] p-8">
                  <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full text-sm font-black text-black" style={{ background: i === 1 ? CORAL : MINT }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mb-4 text-2xl font-black tracking-tight">{item.title}</h3>
                  <p className="text-base leading-relaxed text-white/75 font-body">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="py-16 md:py-40 relative flex items-center justify-center min-h-[30vh] md:min-h-[60vh] overflow-hidden text-center hide-floating-cta">
        <BackgroundBeams className="opacity-60" />
        <div className="relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-7xl font-black tracking-tighter mb-6 text-white drop-shadow-2xl">
            <span style={{ color: CORAL }}>Only 4</span> Teams Onboarded Per Quarter.
          </h2>
          <p className="text-base md:text-2xl text-white font-body mb-10 md:mb-12 max-w-2xl text-center">We keep it small on purpose. Every pilot gets our full, undivided execution capacity.</p>
          <div className="flex justify-center">
            <Link href="/contact">
              <ShimmerButton shimmerColor={MINT} background="#111" className="h-12 px-8 md:h-16 md:px-12 rounded-2xl" shimmerSize="0.1em">
                <span className="text-sm md:text-xl font-black text-white tracking-widest uppercase">Book a Working Session</span>
              </ShimmerButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
