"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import GrdrDemo from "./GrdrDemo";
import { GRDR_FAQS } from "./faqs";
import { BrandRoot, Band, H2, Card, BrandBtn, ProductToggle, Together, Faq, Rise, Grid, useTheme, GRDR } from "./brand";

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
  { tag: "Leaders", t: "Sales leaders and managers", d: "Walk into a 1:1 already knowing what the rep needs to hear. Managers spend 5 to 8 hours a week reviewing calls; Grdr gets you the same read in seconds." },
  { tag: "Reps", t: "Reps who want honest feedback", d: "Get a straight answer on what worked and what to change, right after the call, without waiting for the next coaching session." },
  { tag: "Small teams", t: "Teams without a full-time coach", d: "Founders and small teams get a consistent standard to grade against, even when nobody has time to review every call." },
];

const fontCss = `
@font-face { font-family: Satoshi; font-weight: 500; font-display: swap; src: url(/fonts/satoshi-medium.woff2) format("woff2"); }
@font-face { font-family: Satoshi; font-weight: 700; font-display: swap; src: url(/fonts/satoshi-bold.woff2) format("woff2"); }
@font-face { font-family: Satoshi; font-weight: 900; font-display: swap; src: url(/fonts/satoshi-black.woff2) format("woff2"); }
`;

const head = { fontFamily: "Satoshi, system-ui, sans-serif", fontWeight: 900 };

function Wordmark({ className = "text-3xl" }) {
  return <span className={className} style={head} aria-label="Grdr">Grdr<span style={{ color: GRDR.cyan }}>.</span></span>;
}

function Hero() {
  const reduce = useReducedMotion();
  const rise = (d) => ({ initial: reduce ? false : { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } });
  return (
    <section className="relative overflow-hidden px-6 md:px-16 pt-44 pb-20 lg:pb-28" style={{ background: GRDR.bg }}>
      <Grid opacity={0.04} fade="radial" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-10%] top-1/4 h-[700px] w-[700px]" style={{ background: `radial-gradient(closest-side, ${GRDR.cyan}2e, transparent 70%)` }} />
      <motion.div aria-hidden="true" className="pointer-events-none absolute left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GRDR.cyan}99, transparent)`, top: "35%" }} animate={reduce ? undefined : { top: ["30%", "85%"], opacity: [0, 1, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.div className="mb-8 flex items-baseline gap-3" {...rise(0)}>
            <Wordmark className="text-3xl md:text-4xl text-white" />
            <span className="text-xs text-white/60">by Map2Close</span>
          </motion.div>
          <motion.h1 className="text-[clamp(2.6rem,6.2vw,5rem)] leading-[1.04] tracking-tight text-white" style={head} {...rise(0.08)}>
            <span style={{ color: GRDR.cyan }}>Clarity</span> After Every Conversation.
          </motion.h1>
          <motion.p className="mt-7 max-w-xl text-lg md:text-xl leading-relaxed text-white/80" {...rise(0.2)}>
            Grade every cold call and deal the second the transcript lands, against proven frameworks, and get the exact words to say next time.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-4" {...rise(0.32)}>
            <BrandBtn external product="grdr" href="https://grdr.app/">Get a Free Grade</BrandBtn>
            <BrandBtn variant="ghost" href="#how-it-works">How it works</BrandBtn>
          </motion.div>
        </div>
        <motion.div {...rise(0.3)}>
          <GrdrDemo />
        </motion.div>
      </div>
    </section>
  );
}

function How() {
  const th = useTheme();
  return (
    <Band tone="alt" id="how-it-works" className="scroll-mt-24">
      <H2 eyebrow="How it works" title="From Transcript To Next Move In ^Four Steps" sub="No setup project. Paste the call, get the grade." />
      <div className="relative grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {how.map((h, i) => (
          <Rise key={h.t} delay={i * 0.1} className="h-full">
            <Card featured={i === how.length - 1}>
              <span className="inline-flex h-10 w-10 items-center justify-center text-sm" style={{ ...head, background: i === how.length - 1 ? GRDR.bg : "transparent", color: GRDR.cyan, border: `1px solid ${GRDR.cyan}`, borderRadius: 2 }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-xl leading-snug" style={{ fontFamily: th.head, fontWeight: 900 }}>{h.t}</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ opacity: 0.8 }}>{h.d}</p>
            </Card>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function WhyNot() {
  return (
    <Band tone="base">
      <H2 eyebrow="Why not generic AI" title="A Rubric, Not A ^Guess." sub="Fixed rubrics with anchored scores, so every call is judged the same way." />
      <div className="mb-10 flex flex-wrap gap-3">
        {["4 Ds (cold calls)", "MEDDPICC + CLOSER (deals)"].map((f) => (
          <span key={f} className="px-5 py-2 text-sm text-white" style={{ border: `1px solid ${GRDR.cyan}66`, borderRadius: 2 }}>{f}</span>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {pillars.map(([w, d], i) => (
          <Rise key={w} delay={i * 0.08} className="h-full">
            <Card className="!p-6">
              <p className="text-xl" style={{ ...head, color: GRDR.cyan }}>{w}</p>
              <p className="mt-2 text-sm md:text-base text-white/80">{d}</p>
            </Card>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function Gets() {
  const th = useTheme();
  return (
    <Band tone="alt">
      <H2 eyebrow="What you get" title="Every Grade Comes With A ^Next Move" sub="Four things you walk away with after each call." />
      <div className="grid gap-5 md:grid-cols-2">
        {gets.map((g, i) => (
          <Rise key={g.t} delay={(i % 2) * 0.08} className="h-full">
            <Card featured={i === 0}>
              <h3 className="text-xl md:text-2xl" style={{ fontFamily: th.head, fontWeight: 900 }}>{g.t}</h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed" style={{ opacity: 0.82 }}>{g.d}</p>
            </Card>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function Who() {
  return (
    <Band tone="base">
      <H2 eyebrow="Who it's for" title="Built For People Who ^Coach And Sell" sub="If calls happen on your team, Grdr has something for you." />
      <div className="grid gap-5 md:grid-cols-3">
        {who.map((w, i) => (
          <Rise key={w.t} delay={i * 0.1} className="h-full">
            <Card>
              <span className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ background: `${GRDR.cyan}1f`, color: GRDR.cyan, borderRadius: 2 }}>{w.tag}</span>
              <h3 className="mt-5 text-xl md:text-2xl leading-tight" style={head}>{w.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-white/75">{w.d}</p>
            </Card>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28 text-center" style={{ background: GRDR.bg }}>
      <Grid fade="radial" opacity={0.04} />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2" style={{ background: `radial-gradient(closest-side, ${GRDR.cyan}22, transparent)` }} />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <h2 className="mb-8 text-4xl md:text-6xl leading-[1.04] tracking-tight text-white" style={head}>One Conversation. No <span style={{ color: GRDR.cyan }}>Commitment.</span></h2>
        <BrandBtn external product="grdr" href="https://grdr.app/">Get a Free Grade</BrandBtn>
      </div>
    </section>
  );
}

export default function GrdrClient() {
  return (
    <BrandRoot theme="grdr">
      <style dangerouslySetInnerHTML={{ __html: fontCss }} />
      <ProductToggle active="grdr" />
      <Hero />
      <How />
      <WhyNot />
      <Gets />
      <Who />
      <Together tone="alt" />
      <Faq faqs={GRDR_FAQS} tone="base" />
      <FinalCta />
    </BrandRoot>
  );
}
