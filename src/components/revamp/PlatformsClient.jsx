"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Layout, Search, Cpu } from "lucide-react";
import {
  GlowHeroBg, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
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
  { title: "Sales Enablement Hub", problem: "Assets existed but were scattered, outdated and impossible to surface during an active deal.", solution: "A centralized hub where reps filter live assets, battlecards and deal kits by deal stage, persona or use case.", href: "/case-studies/pinecone" },
  { title: "Signal Intelligence Engine", problem: "Reps were cold calling blind, with no way to know which accounts were in pain.", solution: "Signals such as funding, leadership changes and intent land directly inside the workflow, scored and ready to act on.", href: "/case-studies/signpost" },
  { title: "Trial-to-Close Engine", problem: "Deals slowed down the moment they left the demo stage.", solution: "Guided trial playbooks and monitoring that flag stalling deals and suggest the next step after the demo.", href: "/case-studies/qwilr" },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-32 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto overflow-visible">
      <GlowHeroBg />
      <div className="relative z-10 flex-1 md:max-w-[52%]">
        <Reveal><span className="inline-block text-[11px] font-black tracking-[0.4em] uppercase mb-6" style={{ color: MINT }}>Platforms</span></Reveal>
        <Reveal delay={0.08}>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tight leading-[0.95] mb-6 md:mb-8 text-white">
            Your Stack Should Be <span style={{ color: MINT }}>Working</span> Harder Than You Are.
          </h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="font-body text-white text-base md:text-xl leading-relaxed mb-8 md:mb-10 max-w-xl">
            We configure your CRM and tools around a process built to convert, and build what your stack can&apos;t do on its own.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center gap-6">
            <Btn href="/contact">Book a Working Session</Btn>
            <a href="#custom-builds" className="text-white/70 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">See what we build &rarr;</a>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="relative z-10 flex-1 w-full">
        <DashboardMock />
        <div className="absolute -inset-4 blur-[60px] rounded-[2rem] -z-10 opacity-10" style={{ background: MINT }} />
      </Reveal>
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
              className={`group relative shrink-0 text-left rounded-2xl border px-5 py-4 transition-all duration-300 ${k === i ? "border-[#63D2A3] bg-[#63D2A3]/10" : "border-white/10 hover:border-white/30"}`}
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
              <li className={`flex gap-5 rounded-3xl border p-6 md:p-7 ${i === 0 ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10"}`}>
                <NumDot n={i + 1} variant={i === 0 ? "mint" : "black"} />
                <div>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight">{a.title}</h3>
                  <p className={`mt-2 font-body text-base leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5A5A5A]"}`}>{a.body}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </WhiteSection>
  );
}

const icons = [Layout, Search, Cpu];

function Systems() {
  return (
    <Section>
      <SectionTitle eyebrow="Systems we build" title="From ^Problem to System" sub="What it looks like when we build inside a real revenue motion." />
      <div className="grid gap-8 md:grid-cols-3">
        {systems.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <Reveal key={s.title} delay={i * 0.1}>
              <Link
                href={s.href}
                className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050505] p-8 md:p-10 transition-all duration-500 hover:border-[#63D2A3]/50 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63D2A3]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#63D2A3]/0 to-transparent transition-colors duration-500 group-hover:from-[#63D2A3]/[0.07]" />
                <div className="absolute right-7 top-7 flex h-9 w-9 items-center justify-center rounded-full border border-[#63D2A3]/40 text-[#63D2A3] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[#63D2A3] group-hover:text-black">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#63D2A3]/25 bg-[#63D2A3]/10 shadow-[0_0_20px_rgba(99,210,163,0.12)]">
                  <Icon className="h-8 w-8 text-[#63D2A3]" />
                </div>
                <h3 className="relative text-2xl md:text-3xl font-black leading-tight text-white transition-colors group-hover:text-[#63D2A3]">{s.title}</h3>
                <div className="relative space-y-4">
                  <div>
                    <CoralPill>The problem</CoralPill>
                    <p className="mt-3 font-body text-base text-white/80 leading-relaxed">{s.problem}</p>
                  </div>
                  <div>
                    <span className="inline-block rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-black" style={{ background: MINT }}>What we built</span>
                    <p className="mt-3 font-body text-base text-white leading-relaxed">{s.solution}</p>
                  </div>
                </div>
                <span className="relative mt-auto inline-flex items-center gap-2 pt-2 text-xs font-black uppercase tracking-widest text-[#63D2A3]">Read the case study <ArrowRight className="h-3.5 w-3.5" /></span>
              </Link>
            </Reveal>
          );
        })}
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
