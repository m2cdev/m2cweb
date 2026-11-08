"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, GridBackdrop, Eyebrow, Section, SectionTitle, WhiteSection, WhiteTitle, NumDot, GRDR_CYAN, SplitLetters, CoralPill } from "./ui";
import ProductCta from "./ProductCta";
import GrdrDemo from "./GrdrDemo";
import { ProductToggle, Together, Faq, FinalCta } from "./ProductShared";
import { GRDR_FAQS } from "./faqs";


const how = [
  { t: "Dictate the call context", d: "Say who you spoke to, what you were selling and where the deal stands. A few sentences is enough." },
  { t: "Paste the raw transcript", d: "Drop in the transcript from any call recorder. No cleanup, no reformatting." },
  { t: "Grade it against a proven rubric", d: "The 4 Ds for cold calls. MEDDPICC plus CLOSER for deals. Every criterion scored from 0 to 3." },
  { t: "Get the next move", d: "One grade and the exact words to say next time, not fifteen paragraphs of notes." },
];

const gets = [
  { t: "One clear grade", d: "A single result for the call or deal, so you know where you stand at a glance." },
  { t: "Anchored 0 to 3 scores", d: "Fixed rubrics with defined scores, so grades stay consistent and comparable over time." },
  { t: "The next move, word for word", d: "The exact question or line to use on the next call or in the next email." },
  { t: "A record across reps and deals", d: "Every grade is kept, so patterns show up across reps, deals and weeks." },
];

const pillars = [
  ["Clarity", "Every gap made visible."],
  ["Confidence", "Objective rubrics, not gut feel."],
  ["Direction", "Exact words to say next time."],
  ["Empowerment", "Managers freed to lead."],
];

const who = [
  { t: "Sales leaders and managers", d: "Walk into a 1:1 already knowing what the rep needs to hear. Managers spend 5 to 8 hours a week reviewing calls; Grdr gets you the same read in seconds." },
  { t: "Reps who want honest feedback", d: "Get a straight answer on what worked and what to change, right after the call, without waiting for the next coaching session." },
  { t: "Teams without a full-time coach", d: "Founders and small teams get a consistent standard to grade against, even when nobody has time to review every call." },
];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[70vh] flex items-center pt-44 pb-16 px-6 md:px-16 overflow-hidden bg-[#0B0F0E]">
      <GridBackdrop glow={GRDR_CYAN} />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Eyebrow color={GRDR_CYAN}>Grdr</Eyebrow>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] text-white [perspective:800px]">
          <SplitLetters text="Clarity After Every Conversation." />
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.7 }} className="mt-6 max-w-3xl text-lg md:text-xl text-white font-body leading-relaxed">
          Grade every cold call and deal the second the transcript lands, against proven frameworks, and get the exact words to say next time.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }} className="mt-8">
          <ProductCta product="grdr" href="https://grdr.app/" accent={GRDR_CYAN}>Get a Free Grade</ProductCta>
        </motion.div>
      </div>
    </section>
  );
}

function How() {
  return (
    <WhiteSection id="how-it-works">
      <WhiteTitle eyebrow="How it works" title="From Transcript To Next Move In ^Four Steps" sub="No setup project. Paste the call, get the grade." />
      <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {how.map((h, i) => (
          <Reveal key={h.t} delay={i * 0.1}>
            <div className={`h-full rounded-3xl border p-7 ${i === how.length - 1 ? "bg-black border-black text-white" : "bg-[#F4F4F2] border-black/10"}`}>
              <NumDot n={i + 1} variant={i === how.length - 1 ? "mint" : "black"} />
              <h3 className="mt-6 text-xl font-black tracking-tight leading-snug">{h.t}</h3>
              <p className={`mt-3 font-body text-base leading-relaxed ${i === how.length - 1 ? "text-white/85" : "text-[#5E5E5A]"}`}>{h.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </WhiteSection>
  );
}

function WhyNot() {
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Why not generic AI" title="A Rubric, Not A ^Guess." sub="Fixed rubrics with anchored scores, so every call is judged the same way." />
      <div className="flex flex-wrap gap-3 mb-10">
        {["4 Ds (cold calls)", "MEDDPICC + CLOSER (deals)"].map((f) => (
          <span key={f} className="rounded-full border px-5 py-2 text-sm text-white" style={{ borderColor: `${GRDR_CYAN}66` }}>{f}</span>
        ))}
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {pillars.map(([w, d], i) => (
          <Reveal key={w} delay={i * 0.08}>
            <div className="h-full rounded-3xl border border-white/10 bg-[#1A1F1E] p-6">
              <p className="text-xl font-black" style={{ color: GRDR_CYAN }}>{w}</p>
              <p className="mt-2 font-body text-sm md:text-base text-white">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Gets() {
  return (
    <WhiteSection>
      <WhiteTitle eyebrow="What you get" title="Every Grade Comes With A ^Next Move" sub="Four things you walk away with after each call." />
      <div className="grid gap-5 md:grid-cols-2">
        {gets.map((g, i) => (
          <Reveal key={g.t} delay={(i % 2) * 0.08}>
            <div className={`h-full rounded-3xl border p-7 md:p-8 ${i === 0 ? "bg-black border-black text-white" : "bg-[#F4F4F2] border-black/10"}`}>
              <h3 className="text-xl md:text-2xl font-black">{g.t}</h3>
              <p className={`mt-3 font-body text-base md:text-lg leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5E5E5A]"}`}>{g.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </WhiteSection>
  );
}

function Who() {
  return (
    <WhiteSection tone="grey">
      <WhiteTitle eyebrow="Who it's for" title="Built For People Who ^Coach And Sell" sub="If calls happen on your team, Grdr has something for you." />
      <div className="grid gap-5 md:grid-cols-3">
        {who.map((w, i) => (
          <Reveal key={w.t} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-black/10 bg-white p-7">
              <CoralPill>{["Leaders", "Reps", "Small teams"][i]}</CoralPill>
              <h3 className="mt-5 text-xl md:text-2xl font-black tracking-tight text-black leading-tight">{w.t}</h3>
              <p className="mt-3 font-body text-base text-[#5E5E5A] leading-relaxed">{w.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </WhiteSection>
  );
}

export default function GrdrClient() {
  return (
    <div className="bg-black text-white">
      <ProductToggle active="grdr" />
      <Hero />
      <Section tone="dark"><GrdrDemo /></Section>
      <How />
      <WhyNot />
      <Gets />
      <Who />
      <Together />
      <Faq faqs={GRDR_FAQS} tone="white" />
      <FinalCta product="grdr" />
    </div>
  );
}
