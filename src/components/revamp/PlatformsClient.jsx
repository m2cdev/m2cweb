"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CoreServices from "./CoreServices";
import {
  GlowHeroBg, GridField, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, CtaBand, MINT, CORAL,
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
    <section className="sticky top-0 z-0 h-screen overflow-hidden bg-black px-6 md:px-16 pt-20 flex items-center" aria-label="Implementations">
      <GridField />
      <div className="relative z-10 w-full max-w-6xl mx-auto">
      <SectionTitle eyebrow="Implementations" title="Everything ^Connected. Everything ^Automated." />
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
      </div>
    </section>
  );
}

function Approach() {
  return (
    <WhiteSection id="custom-builds" className="!py-14 md:!py-20">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <WhiteTitle className="!mb-0" eyebrow="Custom builds" title="Every Build Starts With A ^Problem" sub="Systems we build inside real revenue motions." />
        <p className="text-sm font-black uppercase tracking-[0.25em]" style={{ color: CORAL }}>Built in 30</p>
      </div>
      <div className="relative">
        <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-black/15 lg:block" aria-hidden="true" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <li className={`relative h-full rounded-3xl border p-6 ${i === 0 ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10"}`}>
                <NumDot n={i + 1} variant={i === 0 ? "mint" : "black"} className="ring-4 ring-white" />
                <h3 className="mt-5 text-xl font-black tracking-tight leading-snug">{a.title}</h3>
                <p className={`mt-2 font-body text-[15px] leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5A5A5A]"}`}>{a.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </WhiteSection>
  );
}

function Systems() {
  return (
    <Section className="!py-14 md:!py-20">
      <SectionTitle eyebrow="Systems we build" title="From ^Problem to System" />
      <div className="hidden md:grid grid-cols-[1fr_1.3fr_2rem_1.5fr] gap-x-8 px-6 pb-3 text-[11px] font-black uppercase tracking-[0.25em] border-b border-white/15">
        <span className="text-white/50">System</span>
        <span style={{ color: CORAL }}>The problem</span>
        <span />
        <span style={{ color: MINT }}>What we built</span>
      </div>
      <div className="divide-y divide-white/10">
        {systems.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.08} y={10}>
            <Link
              href={s.href}
              className="group grid items-center gap-3 px-6 py-6 transition-colors hover:bg-white/[0.04] md:grid-cols-[1fr_1.3fr_2rem_1.5fr] md:gap-x-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#63D2A3]"
            >
              <h3 className="text-xl md:text-2xl font-black leading-tight text-white transition-colors group-hover:text-[#63D2A3]">
                <span className="mr-3 font-mono text-sm" style={{ color: MINT }}>{String(i + 1).padStart(2, "0")}</span>{s.title}
              </h3>
              <p className="font-body text-[15px] leading-relaxed text-white/60"><span className="md:hidden font-black uppercase tracking-widest text-[11px] mr-2" style={{ color: CORAL }}>Problem</span>{s.problem}</p>
              <span className="hidden md:flex items-center" aria-hidden="true">
                <motion.span
                  className="block h-px w-full origin-left"
                  style={{ background: `linear-gradient(90deg, ${CORAL}, ${MINT})` }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                />
                <ArrowRight className="-ml-1 h-4 w-4 shrink-0" style={{ color: MINT }} />
              </span>
              <p className="font-body text-[15px] leading-relaxed text-white"><span className="md:hidden font-black uppercase tracking-widest text-[11px] mr-2" style={{ color: MINT }}>Built</span>{s.solution}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function PlatformsClient() {
  return (
    <div className="bg-black text-white">
      <div className="relative bg-black">
        <Stack />
        <div className="relative z-10 -mt-[100vh] bg-black">
          <Hero />
        </div>
        <div className="h-[70vh]" aria-hidden="true" />
        <div className="relative z-10 bg-white">
          <Approach />
        </div>
      </div>
      <Systems />
      <CoreServices page="platforms" id="core-services" headline="Ten Ways We Fill The Gap In Your Stack" />
      <Section tone="dark">
        <SectionTitle eyebrow="Product Portfolio" title="Some Builds Became ^Products." sub="Both sit on top of your existing CRM." />
        <ProductStrip showHeading={false} />
      </Section>
      <CtaBand headline="Have a Bottleneck We Haven't ^Seen Before?" primary={{ href: "/contact", label: "Let's Build Around It" }} />
    </div>
  );
}
