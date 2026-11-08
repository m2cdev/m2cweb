"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import {
  GridBackdrop, Eyebrow, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, CoralPill, CtaBand, MINT, CORAL,
} from "./ui";
import DashboardMock from "./DashboardMock";
import ProductStrip from "./ProductStrip";

const implementation = [
  { title: "CRM Setup + Optimization", d: "We configure your CRM around a process that reflects how your deals actually move: clean pipelines, meaningful stages and workflows your reps will use." },
  { title: "Tech Stack Integration", d: "Sales tools working in silos kill efficiency. We connect your existing stack so data flows where it needs to go and nothing falls through the cracks." },
  { title: "Workflow Automation", d: "We find every manual, repetitive workflow and automate it, so your reps stay focused on selling, not admin." },
  { title: "Stack Optimization", d: "Most teams use 20% of what their tools can do. We unlock the rest, so you get the most out of every tool you already pay for." },
];

const approach = [
  { title: "Start with the problem", body: "We audit how leads, deals, handoffs, fields, automations and reporting actually work today, before touching the stack." },
  { title: "Rebuild around rep behavior", body: "We simplify the CRM and workflows around what reps need to do next, not how the software was configured by default." },
  { title: "Automate the repeatable work", body: "Manual updates, routing, alerts, enrichment and follow-up triggers move into clean workflows your team can maintain." },
  { title: "Enable and pressure-test", body: "We train the team inside the rebuilt motion, watch where adoption breaks, and tune it against live pipeline." },
];

const systems = [
  { title: "Sales Enablement Hub", problem: "Assets existed but were scattered, outdated and impossible to surface during an active deal.", solution: "A centralized hub where reps filter live assets, battlecards and deal kits by deal stage, persona or use case.", href: "/case-studies/sales-enablement-hub" },
  { title: "Signal Intelligence Engine", problem: "Reps were cold calling blind, with no way to know which accounts were in pain.", solution: "Signals such as funding, leadership changes and intent land directly inside the workflow, scored and ready to act on.", href: "/case-studies/signal-intelligence-engine" },
  { title: "Trial-to-Close Engine", problem: "Deals slowed down the moment they left the demo stage.", solution: "Guided trial playbooks and monitoring that flag stalling deals and suggest the next step after the demo.", href: "/case-studies/trial-to-close-engine" },
];

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-32 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto overflow-hidden">
      <GridBackdrop />
      <div className="relative z-10 flex-1 md:max-w-[52%]">
        <Eyebrow>Platforms</Eyebrow>
        <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tight leading-[0.98] mb-6 text-white">
          Your Stack Should Be <span className="text-[#62D2A2]">Working</span> Harder Than You Are.
        </h1>
        <p className="font-body text-white text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
          We configure your CRM and tools around a process built to convert, and build what your stack can&apos;t do on its own.
        </p>
        <Btn href="/contact">Book a Working Session</Btn>
      </div>
      <div className="relative z-10 flex-1 w-full">
        <DashboardMock />
      </div>
    </section>
  );
}

function Stack() {
  const [i, setI] = useState(0);
  const cur = implementation[i];
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Implementations" title="Everything ^Connected. Everything ^Automated." />
      <CoralPill className="-mt-6 mb-10">45 to Live</CoralPill>
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div role="tablist" aria-label="Implementations" className="flex lg:flex-col gap-2 overflow-x-auto [scrollbar-width:none]">
          {implementation.map((t, k) => (
            <button
              key={t.title}
              role="tab"
              aria-selected={k === i}
              onClick={() => setI(k)}
              onMouseEnter={() => setI(k)}
              className={`group relative shrink-0 text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${k === i ? "border-[#62D2A2] bg-[#62D2A2]/10" : "border-white/10 hover:border-white/30"}`}
            >
              <span className="font-mono text-xs font-black tracking-widest" style={{ color: MINT }}>{String(k + 1).padStart(2, "0")}</span>
              <span className="ml-3 text-base md:text-lg font-black text-white whitespace-nowrap lg:whitespace-normal">{t.title}</span>
            </button>
          ))}
        </div>
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10 min-h-[220px]" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white">{cur.title}</h3>
              <p className="mt-4 font-body text-lg text-white/90 leading-relaxed">{cur.d}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}

function Approach() {
  return (
    <WhiteSection id="custom-builds">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <WhiteTitle eyebrow="Custom builds" title="Every Build Starts With A ^Problem" sub="Systems we build inside real revenue motions." />
          <CoralPill>Built in 30</CoralPill>
        </div>
        <ol className="space-y-4">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={0.05}>
              <li className={`flex gap-5 rounded-3xl border p-6 md:p-7 ${i === 0 ? "bg-black border-black text-white" : "bg-[#F4F4F2] border-black/10"}`}>
                <NumDot n={i + 1} variant={i === 0 ? "mint" : "black"} />
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">{a.title}</h3>
                  <p className={`mt-2 font-body text-base leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5E5E5A]"}`}>{a.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </WhiteSection>
  );
}

function FlipCard({ s }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div className="[perspective:1200px]">
      <button
        type="button"
        aria-pressed={flipped}
        onClick={() => setFlipped((f) => !f)}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        className="relative block w-full h-[360px] md:h-[380px] text-left transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.03] p-7 flex flex-col [backface-visibility:hidden]">
          <CoralPill className="self-start">The problem</CoralPill>
          <h3 className="mt-6 text-2xl font-black tracking-tight text-white">{s.title}</h3>
          <p className="mt-3 font-body text-lg text-white/90 leading-relaxed">{s.problem}</p>
          <span className="mt-auto text-xs font-black uppercase tracking-widest text-[#62D2A2]">Hover or tap to flip</span>
        </div>
        <div className="absolute inset-0 rounded-3xl border border-[#62D2A2] bg-[#0b1511] p-7 flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="self-start rounded-full bg-[#62D2A2] px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-black">What we built</span>
          <h3 className="mt-6 text-2xl font-black tracking-tight text-white">{s.title}</h3>
          <p className="mt-3 font-body text-lg text-white/90 leading-relaxed">{s.solution}</p>
        </div>
      </button>
      <Link href={s.href} className="mt-4 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#62D2A2] hover:text-white transition-colors">
        Read the case study <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function Systems() {
  return (
    <Section>
      <SectionTitle eyebrow="Systems we build" title="From ^Problem to System" sub="Flip each card to see what we built." />
      <div className="grid gap-6 md:grid-cols-3">
        {systems.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <FlipCard s={s} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function PlatformsClient() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Stack />
      <Approach />
      <Systems />
      <Section tone="dark">
        <SectionTitle eyebrow="Product Portfolio" title="Some Builds Became ^Products." sub="Both sit on top of your existing CRM." />
        <ProductStrip showHeading={false} />
      </Section>
      <CtaBand headline="Have a Bottleneck We Haven't ^Seen Before?" primary={{ href: "/contact", label: "Let's Build Around It" }} />
    </div>
  );
}
