"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import CoreServices from "./CoreServices";
import {
  WaveHeroBg, SplitLetters, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, SwipeSlider, ProductTieIn, CtaBand, MINT, CORAL,
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

function Execution() {
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Swipe through" title="This Is What We Mean By ^Execution" sub="Five moments where the work happens, from the room to the rep's next call." />
      <SwipeSlider label="Execution moments">
        {execution.map((e) => (
          <div key={e.n} className="group h-full min-h-[360px] rounded-3xl border border-white/10 bg-white/[0.03] p-7 flex flex-col transition-colors hover:border-[#63D2A3]/60 select-none">
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const height = useTransform(fill, [0, 1], ["0%", "100%"]);
  return (
    <WhiteSection tone="grey">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-28 self-start">
          <WhiteTitle eyebrow="30 by 30" title="From first day to productive in ^30 days" sub="The ramp fills in as you scroll." />
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-7xl md:text-8xl font-black tracking-tighter text-black">30</span>
            <span className="text-xl font-black text-[#5A5A5A]">days to productive</span>
          </div>
        </div>
        <div ref={ref} className="relative pl-14">
          <div className="absolute left-[21px] top-2 bottom-2 w-px bg-black/15" aria-hidden="true" />
          <motion.div className="absolute left-[20px] top-2 w-[3px] rounded-full" style={{ height: reduce ? "100%" : height, background: MINT, maxHeight: "calc(100% - 1rem)" }} aria-hidden="true" />
          <div className="space-y-8">
            {ramp.map((r, i) => (
              <Reveal key={r.when} delay={0.05}>
                <div className="relative">
                  <NumDot n={i + 1} variant={i === ramp.length - 1 ? "black" : "mint"} className="absolute -left-14 top-0 ring-4 ring-[#FFFFFF]" />
                  <div className={i === ramp.length - 1 ? "rounded-3xl bg-black p-6 text-white" : "rounded-3xl border border-black/10 bg-white p-6"}>
                    <p className="text-[11px] font-black uppercase tracking-[0.25em]" style={{ color: i === ramp.length - 1 ? MINT : "#63D2A3" }}>{r.when}</p>
                    <h3 className="mt-2 text-xl md:text-2xl font-black tracking-tight">{r.title}</h3>
                    <p className={i === ramp.length - 1 ? "mt-2 font-body text-white/85" : "mt-2 font-body text-[#5A5A5A]"}>{r.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </WhiteSection>
  );
}

export default function PeopleClient() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <CoreServices page="people" id="core-services" headline="Ten Ways We Put Coaching On The Floor" />
      <Execution />
      <Ramp />
      <ProductTieIn
        headline="Coaching that doesn't stop when we leave the call."
        body="Qmo puts live cards in front of reps on every call. Grdr grades every call against your playbook."
      />
      <CtaBand headline="Think Your Team Could Be ^Closing ^More?" sub="Let's find out." primary={{ href: "/contact", label: "Book a Working Session" }} />
    </div>
  );
}
