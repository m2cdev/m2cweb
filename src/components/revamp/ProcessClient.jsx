"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import {
  GridBackdrop, Eyebrow, PageHero, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, CoralPill, SwipeSlider, ProductTieIn, CtaBand, MINT, CORAL,
} from "./ui";

const frameworks = ["MEDDPICC", "BANT", "SPIN", "Challenger", "SPICED", "Sandler", "Command of the Message", "+ more"];

const meets = [
  { tag: "Calls + conversations", title: "What your reps actually say", body: "Discovery scripts, objection handling trees and talk tracks built from your real deals." },
  { tag: "Objections", title: "The pushback they hear", body: "Mapped to your product, your market and the personas your team sells into." },
  { tag: "Handoffs", title: "How deals move through your team", body: "SDR to AE, AE to CS. Every transition defined and documented so nothing falls out." },
  { tag: "Live pipeline", title: "Applied to deals in flight now", body: "We work on your actual open opportunities, not hypothetical case studies." },
];

const playbook = [
  { title: "Playbooks + Talk Tracks", d: "Cold call, discovery and demo talk tracks built around your buyers and embedded in the way your reps already work." },
  { title: "Objection Handling + Battlecards", d: "Guides and battlecards your reps can use mid-call, written from the pushback your team really hears." },
  { title: "Handoff Design", d: "SDR to AE to CS handoffs defined end to end, so context travels with the deal." },
  { title: "Pipeline Rituals", d: "Weekly deal review, next-step discipline and stalled-opportunity triage, so pipeline meetings become execution sessions." },
  { title: "Call Review Systems", d: "The review cadence, scorecards and feedback loops so coaching does not depend on who has time that week." },
  { title: "Enablement Assets", d: "Playbooks, messaging frameworks and one-pagers built around your buyers and kept where reps will find them." },
];

const stages = [
  { role: "SDR", title: "SDR hands off with the full picture", body: "The pain, the trigger and who else is involved travel with the meeting, so the AE never opens cold.", gets: ["Pain in the buyer's words", "Who else is involved", "What was promised"] },
  { role: "AE", title: "AE runs the deal on one shared standard", body: "Discovery, next steps and stalled-deal checks follow the same playbook your whole team uses.", gets: ["Agreed next step", "Mutual plan", "Risks logged in the CRM"] },
  { role: "CS", title: "CS inherits a customer, not a mystery", body: "What the buyer was sold and why they bought is documented before the contract is signed.", gets: ["Success criteria", "Stakeholder map", "Promises made in the sale"] },
];

const runIt = [
  { title: "Map the current motion", body: "We audit how calls, handoffs and pipeline actually run today." },
  { title: "Rebuild around how buyers decide", body: "We design the steps around the buyer's decision, not your org chart." },
  { title: "Turn it into assets reps use mid-call", body: "Talk tracks, cards and battlecards your reps reach for in the moment." },
  { title: "Pressure-test against live pipeline", body: "We watch where it breaks on real deals and tune it until it holds." },
];

function Hero() {
  const row = [...frameworks, ...frameworks];
  return (
    <div className="bg-black">
      <PageHero
        eyebrow="Process"
        headline="A Process Your Reps Can !Actually !Run."
        sub="We take the frameworks everyone talks about and turn them into the calls, handoffs and pipeline habits your team runs every day."
      >
        <Btn href="/contact">Book a Working Session</Btn>
      </PageHero>
      <div className="relative z-10 -mt-14 pb-16 overflow-hidden" aria-label="Frameworks we work with">
        <p className="mb-5 px-6 md:px-16 max-w-6xl mx-auto text-[11px] font-black uppercase tracking-[0.3em] text-white">Frameworks we work with</p>
        <div className="flex w-max fw-marquee hover:[animation-play-state:paused] gap-3 pr-3">
          {row.map((f, i) => (
            <span key={i} className="whitespace-nowrap rounded-full border border-white/20 bg-[#161616] px-6 py-2.5 text-[15px] md:text-base text-white transition-colors hover:border-[#63D2A3] hover:text-[#63D2A3]">{f}</span>
          ))}
        </div>
        <style jsx global>{`
          @keyframes fw-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
          .fw-marquee { animation: fw-marquee 36s linear infinite; }
          @media (prefers-reduced-motion: reduce) { .fw-marquee { animation: none; } }
        `}</style>
      </div>
    </div>
  );
}

function Meets() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % meets.length), 3200);
    return () => clearInterval(id);
  }, [paused]);
  return (
    <WhiteSection>
      <WhiteTitle eyebrow="How it works" title="The Methodology Meets ^Your Motion" sub="Four places where we turn a framework into something your reps run." />
      <div className="grid gap-5 md:grid-cols-2" onMouseLeave={() => setPaused(false)}>
        {meets.map((m, i) => {
          const on = active === i;
          return (
            <Reveal key={m.title} delay={(i % 2) * 0.08}>
              <button
                onClick={() => { setActive(i); setPaused(true); }}
                onMouseEnter={() => { setActive(i); setPaused(true); }}
                onFocus={() => { setActive(i); setPaused(true); }}
                className={`relative h-full w-full text-left rounded-3xl border p-7 md:p-9 transition-all duration-500 ${on ? "bg-black border-black text-white" : "bg-white border-black/10 text-black"}`}
                aria-pressed={on}
              >
                <div className="flex items-center justify-between">
                  <NumDot n={i + 1} variant={on ? "mint" : "black"} />
                  <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] transition-colors ${on ? "text-white" : "text-black/60 border border-black/15"}`} style={on ? { background: CORAL } : undefined}>{m.tag}</span>
                </div>
                <h3 className="mt-7 text-2xl md:text-3xl font-black tracking-tight leading-tight">{m.title}</h3>
                <p className={`mt-3 font-body text-base md:text-lg leading-relaxed transition-colors ${on ? "text-white/85" : "text-[#5A5A5A]"}`}>{m.body}</p>
              </button>
            </Reveal>
          );
        })}
      </div>
    </WhiteSection>
  );
}

function Handoffs() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(stages.length - 1, Math.floor(v * stages.length * 0.999))));
  const stage = stages[idx];
  return (
    <section ref={ref} className="relative bg-black text-white" style={{ height: `${stages.length * 85 + 20}vh` }}>
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden px-6 md:px-16 py-24">
        <GridBackdrop />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionTitle eyebrow="Handoffs" title="Where Deals Usually ^Fall Out" sub="Scroll to follow one deal from SDR to AE to CS." />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
            {/* diagram */}
            <div className="relative flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-0 lg:pl-6" aria-hidden="true">
              <div className="absolute left-0 right-0 top-6 h-px lg:left-[calc(1.5rem+27px)] lg:right-auto lg:top-6 lg:bottom-6 lg:h-auto lg:w-px bg-white/15" />
              {stages.map((s, i) => (
                <div key={s.role} className="relative flex lg:flex-row flex-col items-center lg:items-center gap-3 lg:gap-6 lg:py-6">
                  <motion.div
                    animate={{ scale: i === idx ? 1.12 : 1 }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 font-black transition-colors duration-500"
                    style={{ borderColor: i <= idx ? MINT : "rgba(255,255,255,0.25)", background: i === idx ? MINT : "#000", color: i === idx ? "#000" : i < idx ? MINT : "rgba(255,255,255,0.6)" }}
                  >
                    {s.role}
                  </motion.div>
                  <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] transition-colors" style={{ color: i === idx ? "#fff" : "rgba(255,255,255,0.45)" }}>
                    {["Qualified meeting", "Active deal", "Closed-won"][i]}
                  </span>
                </div>
              ))}
            </div>
            {/* detail */}
            <motion.div key={stage.role} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-10" aria-live="polite">
              <CoralPill>Step {idx + 1} of {stages.length}</CoralPill>
              <h3 className="mt-5 text-2xl md:text-4xl font-black tracking-tight leading-tight">{stage.title}</h3>
              <p className="mt-4 font-body text-base md:text-lg text-white/90 leading-relaxed">{stage.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {stage.gets.map((g) => (
                  <li key={g} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white">{g}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Playbook() {
  return (
    <WhiteSection tone="grey">
      <WhiteTitle eyebrow="Core services" title="What We Build Into ^Your Process" sub="Swipe through the playbook pieces your team gets." />
      <SwipeSlider dark={false} label="Process services">
        {playbook.map((p, i) => (
          <div key={p.title} className={`h-full min-h-[300px] rounded-3xl border p-7 flex flex-col select-none ${i === 0 ? "bg-black border-black text-white" : "bg-white border-black/10 text-black"}`}>
            <NumDot n={i + 1} variant={i === 0 ? "mint" : "black"} />
            <h3 className="mt-8 text-2xl font-black tracking-tight leading-tight">{p.title}</h3>
            <p className={`mt-3 font-body text-base leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5A5A5A]"}`}>{p.d}</p>
          </div>
        ))}
      </SwipeSlider>
    </WhiteSection>
  );
}

function RunIt() {
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="How we run it" title="Four Steps, ^Live Pipeline." />
      <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
        {runIt.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <div className="h-full bg-black p-7">
              <span className="font-mono text-sm font-black tracking-widest" style={{ color: MINT }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-black text-white leading-snug">{s.title}</h3>
              <p className="mt-2 font-body text-[15px] text-white/85 leading-relaxed">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default function ProcessClient() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Meets />
      <Handoffs />
      <Playbook />
      <RunIt />
      <ProductTieIn headline="Your playbook, live on every call." body="Qmo turns the playbook into Q Cards that surface mid-call and keeps improving them from real recordings." />
      <CtaBand headline="Ready To Make It ^Run?" primary={{ href: "/contact", label: "Book a Working Session" }} />
    </div>
  );
}
