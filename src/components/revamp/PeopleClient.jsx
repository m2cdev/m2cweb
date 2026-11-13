"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, animate, useScroll, useSpring, useTransform, useReducedMotion, useInView } from "framer-motion";
import CoreServices from "./CoreServices";
import {
  WaveHeroBg, SplitLetters, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, SwipeSlider, CtaBand, QmoMark, MINT, CORAL, QMO_YELLOW,
} from "./ui";


const execution = [
  { n: "01", k: "In the room", title: "We coach on live pipeline", body: "Reps bring the deals they are working this week. We pick the next move together, then watch them make it.", after: "Reps leave with a next step, not a framework." },
  { n: "02", k: "On the dial", title: "We practice until it lands", body: "Cold Call Labs run on real prospect lists. Openers and objection handling get tested, scored and retested in the same hour.", after: "The message gets sharper before the next dial block." },
  { n: "03", k: "On the call", title: "We review what really happened", body: "Call reviews use your reps' own recordings, with one thing to keep and one thing to change each time.", after: "Feedback is specific, and it is never left to chance." },
  { n: "04", k: "On the team", title: "We make it the shared language", body: "Group sessions turn the plays that work into team standards, so every rep runs the same winning motion.", after: "Managers coach to one standard." },
  { n: "05", k: "After we leave", title: "We hand managers the structure", body: "Scorecards, a review cadence and dashboards stay with your leaders so the habits keep compounding.", after: "Coaching no longer depends on who has time." },
];

const ramp = [
  { when: "Day 1", title: "Framework + CRM walkthrough", body: "New reps learn how your team sells and where everything lives in the CRM." },
  { when: "Week 1", title: "First live calls, reviewed", body: "Every early call gets a review, so mistakes are fixed before they become habits." },
  { when: "Week 2", title: "Cold Call Lab + objection plays", body: "Reps practice the openers and answers that work on your buyers." },
  { when: "Day 30", title: "Productive, with a manager ready", body: "The rep is carrying a real pipeline and the manager owns ongoing coaching." },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center py-32 md:py-0 bg-black overflow-hidden">
      <WaveHeroBg />
      <div className="max-w-4xl mx-auto z-10 relative md:mt-16">
        <p className="mb-6 text-[11px] font-black uppercase tracking-[0.4em]" style={{ color: MINT }}>People</p>
        <h1 className="text-3xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[1.02] mb-8 text-white [perspective:800px]">
          <SplitLetters text="Strategy is ^Easy. Execution is Where Most Partners ^Skip." />
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }} className="text-lg md:text-xl text-white font-body leading-relaxed max-w-[800px] mx-auto">
          We embed with your reps on real calls and real deals, then stay until the new habits stick.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.9 }} className="mt-10">
          <Btn href="/contact">Book a Working Session</Btn>
        </motion.div>
      </div>
    </section>
  );
}

const caseStudyAside = (
  <Reveal delay={0.1} className="md:w-[360px] shrink-0">
    <Link href="/case-studies/pinecone" className="group relative block overflow-hidden rounded-[2rem] bg-black p-7 md:p-8 text-white">
      <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-[80px] opacity-30" style={{ background: MINT }} />
      <p className="relative text-[11px] font-black uppercase tracking-[0.3em]" style={{ color: MINT }}>Case study</p>
      <h3 className="relative mt-3 text-2xl font-black tracking-tight">Sales Enablement Hub</h3>
      <p className="relative mt-2 font-body text-[15px] text-white/80 leading-relaxed">The right content, surfaced at the right moment in every deal.</p>
      <span className="relative mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: MINT }}>
        Read the case study <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  </Reveal>
);

function Execution() {
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Swipe through" title="This Is What We Mean By ^Execution" sub="Five moments where the work happens, from the room to the rep's next call." />
      <SwipeSlider label="Execution moments">
        {execution.map((e) => (
          <div key={e.n} className="group h-full min-h-[360px] rounded-3xl border border-white/10 bg-[#0e0e0e] p-7 flex flex-col transition-colors hover:border-[#63D2A3]/60 select-none">
            <div className="flex items-center justify-between">
              <span className="text-4xl font-black tracking-tighter" style={{ color: MINT }}>{e.n}</span>
              <span className="rounded-full border border-white/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-white">{e.k}</span>
            </div>
            <h3 className="mt-8 text-2xl font-black tracking-tight text-white leading-tight">{e.title}</h3>
            <p className="mt-3 font-body text-base text-white/90 leading-relaxed">{e.body}</p>
            <p className="mt-auto pt-6 text-sm font-bold" style={{ color: CORAL }}>{e.after}</p>
          </div>
        ))}
      </SwipeSlider>
    </Section>
  );
}

function Ramp() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [days, setDays] = useState(reduce ? 30 : 90);
  useEffect(() => {
    if (reduce || !inView) return;
    const c = animate(90, 30, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setDays(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce]);
  const pct = 100 - ((90 - days) / 60) * (100 - 33.333);
  const done = days <= 30;
  return (
    <WhiteSection tone="grey" className="!py-14 md:!py-20">
      <div ref={ref}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <WhiteTitle className="!mb-0" eyebrow="30 by 30" title="From First Day to Productive in ^30 ^Days" />
          <div className="flex items-baseline gap-3">
            <span className="text-7xl md:text-9xl font-black tracking-tighter tabular-nums leading-none" style={{ color: done ? MINT : "#000" }}>{days}</span>
            <span className="text-lg font-black text-[#5A5A5A]">days to ramp</span>
          </div>
        </div>
        <div className="mt-10">
          <div className="mb-2 flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-[#5A5A5A]">
            <span>A typical ramp, about 90 days</span>
            <span style={{ color: CORAL }}>60 days cut</span>
          </div>
          <div className="relative h-14 md:h-16 rounded-full bg-[#F2F2F2] border border-black/10 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-2/3 flex items-center justify-center text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: CORAL, backgroundImage: `repeating-linear-gradient(135deg, rgba(255,107,107,0.14) 0 8px, transparent 8px 16px)` }}>Time we take out</div>
            <motion.div className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-5 text-sm md:text-base font-black text-black" style={{ width: `${pct}%`, background: MINT }}>
              {days <= 33 ? "Day 30" : `Day ${days}`}
            </motion.div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {ramp.map((r, i) => (
              <Reveal key={r.when} delay={i * 0.06} y={10}>
                <div className={i === ramp.length - 1 ? "h-full rounded-2xl bg-black p-4 text-white" : "h-full rounded-2xl border border-black/10 bg-white p-4"}>
                  <p className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: MINT }}>{r.when}</p>
                  <h3 className="mt-1.5 text-[15px] font-black leading-snug tracking-tight">{r.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </WhiteSection>
  );
}

const callLines = [
  { who: "Prospect", t: "We already have a tool for that.", at: "0:42" },
  { who: "Qmo card", t: "Ask what it costs them when it breaks. Then pause.", at: "0:43", card: true },
  { who: "Rep", t: "What happens to your pipeline when it goes down?", at: "0:45" },
];

function LiveCoach() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-80px" });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % (callLines.length + 2)), 1700);
    return () => clearInterval(id);
  }, [inView]);
  return (
    <section ref={ref} className="relative overflow-hidden bg-black px-6 md:px-16 py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full blur-[160px] opacity-[0.16]" style={{ background: QMO_YELLOW }} />
        <div className="absolute -bottom-52 -left-40 h-[520px] w-[520px] rounded-full blur-[150px] opacity-[0.12]" style={{ background: MINT }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="The tools behind the lift"
          title="How We Make It ^Happen"
          sub="Coaching only sticks when it reaches the rep at the moment of the call. This is the tool we put in their hands, so what we teach in the room shows up on the next dial."
        />
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
          <Reveal>
            <QmoMark className="h-7 mb-6" />
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter leading-[1.02] text-white">Coach reps <span style={{ color: QMO_YELLOW }}>on the call</span>, not after the fact.</h3>
            <p className="mt-5 font-body text-base md:text-lg text-white/90 leading-relaxed">A review tomorrow fixes tomorrow&apos;s call. Qmo puts the next best line in front of your rep while the buyer is still talking, so the coaching lands on the deal it was meant for.</p>
            <div className="mt-7 grid grid-cols-2 gap-3 max-w-md text-sm">
              <div className="rounded-2xl border border-white/10 bg-[#0e0e0e] p-4 text-white/55"><p className="text-[10px] font-black uppercase tracking-[0.2em]">After the fact</p><p className="mt-1 font-body">Feedback next week. The deal has moved on.</p></div>
              <div className="rounded-2xl border bg-[#0e0e0e] p-4 text-white" style={{ borderColor: QMO_YELLOW }}><p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: QMO_YELLOW }}>Live</p><p className="mt-1 font-body">Coached in the moment. The rep acts on it.</p></div>
            </div>
            <Link href="/products/qmo" className="mt-8 inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest hover:text-white transition-colors" style={{ color: MINT }}>See Qmo <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-white/10 bg-[#0B0B0C] p-5 md:p-6 min-h-[300px]" aria-hidden="true">
              <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: CORAL }} />Live call</span>
                <span>0:4{Math.min(5, 2 + Math.min(step, 3))}</span>
              </div>
              <div className="mt-5 space-y-3">
                {callLines.map((l, i) => {
                  const vis = i === 0 || step >= i;
                  return (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{ opacity: vis ? 1 : 0, y: vis ? 0 : 10, scale: vis ? 1 : 0.98 }}
                      transition={{ duration: 0.4 }}
                      className={l.card ? "rounded-2xl p-4 text-black" : "rounded-2xl border border-white/10 bg-[#151515] p-4 text-white"}
                      style={l.card ? { background: QMO_YELLOW, boxShadow: "0 0 40px rgba(255,200,1,0.25)" } : undefined}
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={l.card ? undefined : { color: l.who === "Rep" ? MINT : "rgba(255,255,255,0.55)" }}>{l.who} · {l.at}</p>
                      <p className="mt-1 font-body text-[15px] leading-snug">{l.t}</p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function PeopleClient() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <CoreServices page="people" id="core-services" headline="Ten Ways We Put Coaching On The Floor" aside={caseStudyAside} />
      <Execution />
      <Ramp />
      <LiveCoach />
      <CtaBand headline="Think Your Team Could Be ^Closing ^More?" sub="Let's find out." primary={{ href: "/contact", label: "Book a Working Session" }} />
    </div>
  );
}
