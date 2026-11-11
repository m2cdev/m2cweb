"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Target, GitBranch, Wrench, Zap, Database } from "lucide-react";
import {
  GridBackdrop, GridField, Marked, MeshHeroBg, SplitLetters, Btn, Reveal, Section, SectionTitle, WhiteSection, WhiteTitle,
  NumDot, SwipeSlider, ProductTieIn, CtaBand, MINT, CORAL,
} from "./ui";

const RadialOrbitalTimeline = dynamic(() => import("@/components/ui/radial-orbital-timeline"), { ssr: false });

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
  { role: "SDR", title: "SDR hands off ^with ^the ^full ^picture", body: "The pain, the trigger and who else is involved travel with the meeting, so the AE never opens cold.", gets: ["Pain in the buyer's words", "Who else is involved", "What was promised"] },
  { role: "AE", title: "AE runs the deal ^on ^one ^shared ^standard", body: "Discovery, next steps and stalled-deal checks follow the same playbook your whole team uses.", gets: ["Agreed next step", "Mutual plan", "Risks logged in the CRM"] },
  { role: "CS", title: "CS inherits a customer, ^not ^a ^mystery", body: "What the buyer was sold and why they bought is documented before the contract is signed.", gets: ["Success criteria", "Stakeholder map", "Promises made in the sale"] },
];

const runIt = [
  { title: "Map the current motion", body: "We audit how calls, handoffs and pipeline actually run today." },
  { title: "Rebuild around how buyers decide", body: "We design the steps around the buyer's decision, not your org chart." },
  { title: "Turn it into assets reps use mid-call", body: "Talk tracks, cards and battlecards your reps reach for in the moment." },
  { title: "Pressure-test against live pipeline", body: "We watch where it breaks on real deals and tune it until it holds." },
];

const phases = [
  { id: 1, title: "Map", date: "Step 1", content: "We audit how calls, handoffs and pipeline actually run today, before changing a thing.", category: "Audit", icon: Target, relatedIds: [2], status: "completed", energy: 95 },
  { id: 2, title: "Rebuild", date: "Step 2", content: "We redesign the steps around how your buyers decide, not around your org chart.", category: "Design", icon: GitBranch, relatedIds: [1, 3], status: "completed", energy: 80 },
  { id: 3, title: "Assets", date: "Step 3", content: "Talk tracks, objection guides and battlecards your reps reach for mid-call.", category: "Build", icon: Wrench, relatedIds: [2, 4], status: "in-progress", energy: 65 },
  { id: 4, title: "Pressure-test", date: "Step 4", content: "We watch where it breaks on live pipeline and tune it until it holds.", category: "Test", icon: Zap, relatedIds: [3, 5], status: "pending", energy: 40 },
  { id: 5, title: "Hand off", date: "Step 5", content: "Managers inherit the cadence, scorecards and rituals so the process keeps running.", category: "Adopt", icon: Database, relatedIds: [4], status: "pending", energy: 20 },
];

function Hero() {
  return (
    <div className="bg-black">
      <section className="relative overflow-hidden">
        <MeshHeroBg />
        {/* mobile: phase stepper */}
        <div className="md:hidden relative z-10 flex flex-col pt-28 pb-12 px-6">
          <p className="text-[11px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: MINT }}>Process</p>
          <h1 className="text-3xl font-black tracking-tight leading-[1] mb-5 text-white">A Process Your Reps Can <span style={{ color: CORAL }}>Actually</span> <span style={{ color: CORAL }}>Run.</span></h1>
          <p className="text-base text-white leading-relaxed mb-8 font-body">We take the frameworks everyone talks about and turn them into the calls, handoffs and pipeline habits your team runs every day.</p>
          <div className="relative mb-10">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
            {phases.map((n, i) => {
              const Icon = n.icon;
              return (
                <Reveal key={n.id} delay={0.05 * i}>
                  <div className="relative flex gap-5 mb-6 last:mb-0">
                    <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black border" style={{ borderColor: `${MINT}99` }}><Icon size={16} style={{ color: MINT }} /></div>
                    <div className="flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: MINT }}>{n.date}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wide text-white/50">{n.category}</span>
                      </div>
                      <h3 className="text-base font-black text-white mb-2">{n.title}</h3>
                      <p className="text-sm text-white/80 leading-relaxed font-body">{n.content}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <div><Btn href="/contact">Book a Working Session</Btn></div>
        </div>
        {/* desktop: orbital */}
        <div className="hidden md:flex relative z-10 min-h-screen flex-row items-center gap-10 lg:gap-14 pt-24 pb-16 px-16 max-w-[1400px] mx-auto">
          <div className="flex-1 max-w-[52%]">
            <Reveal><p className="text-[11px] font-black tracking-[0.4em] uppercase mb-6" style={{ color: MINT }}>Process</p></Reveal>
            <h1 className="text-6xl lg:text-[5rem] font-black tracking-tight leading-[0.97] mb-8 text-white [perspective:800px] drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              <SplitLetters text="A Process Your Reps Can !Actually !Run." />
            </h1>
            <Reveal delay={0.3}><p className="max-w-2xl text-xl text-white leading-[1.7] mb-10 font-body">We take the frameworks everyone talks about and turn them into the calls, handoffs and pipeline habits your team runs every day.</p></Reveal>
            <Reveal delay={0.45}>
              <div className="flex items-center gap-8">
                <Btn href="/contact">Book a Working Session</Btn>
                <a href="#process-meets" className="text-white/70 hover:text-white transition-colors text-sm font-black uppercase tracking-widest">See how it works &rarr;</a>
              </div>
            </Reveal>
          </div>
          <div className="flex-1 min-w-0 h-[640px] relative flex items-center justify-center">
            <RadialOrbitalTimeline timelineData={phases} />
          </div>
        </div>
      </section>
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
    <WhiteSection id="process-meets">
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
                className={`relative h-full w-full text-left rounded-3xl border p-7 md:p-9 transition-all duration-500 ${on ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10 text-black"}`}
                aria-pressed={on}
              >
                <div className="flex items-center gap-4">
                  <NumDot n={i + 1} variant={on ? "mint" : "black"} />
                  <span className="text-[12px] font-black uppercase tracking-[0.25em] transition-colors" style={{ color: on ? MINT : "#5A5A5A" }}>{m.tag}</span>
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
  const lock = useRef(0);
  const n = stages.length;

  // Geometry: the section is n viewport-heights tall; each stage owns one viewport of scroll.
  const geo = () => {
    const el = ref.current;
    const vh = window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    return { top, vh, pos: (k) => top + k * vh };
  };

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!ref.current) return;
      const { top, vh } = geo();
      const k = Math.round((window.scrollY - top) / vh);
      setIdx(Math.max(0, Math.min(n - 1, k)));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [n]);

  // One wheel gesture = one stage while the section is pinned. Edges release back to normal page scroll.
  useEffect(() => {
    const onWheel = (e) => {
      if (!ref.current || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const { pos, vh } = geo();
      const y = window.scrollY;
      const first = pos(0), last = pos(n - 1);
      const dir = e.deltaY > 0 ? 1 : -1;
      const now = Date.now();
      const pinned = y >= first - 2 && y <= last + 2;
      if (!pinned) return;
      if ((dir === 1 && y >= last - 2) || (dir === -1 && y <= first + 2)) return;
      e.preventDefault();
      if (now < lock.current) return;
      let target;
      if (dir === 1) { for (let k = 0; k < n; k++) if (pos(k) > y + 8) { target = pos(k); break; } }
      else { for (let k = n - 1; k >= 0; k--) if (pos(k) < y - 8) { target = pos(k); break; } }
      if (target == null) return;
      lock.current = now + 900;
      window.scrollTo({ top: target, behavior: "smooth" });
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [n]);

  const jump = (k) => {
    const { pos } = geo();
    lock.current = Date.now() + 900;
    window.scrollTo({ top: pos(k), behavior: "smooth" });
  };

  const stage = stages[idx];
  return (
    <section ref={ref} className="relative bg-black text-white" style={{ height: `${n * 100}vh` }}>
      <div className="sticky top-0 min-h-screen flex items-center overflow-hidden px-6 md:px-16 py-24 bg-black">
        <GridBackdrop strong />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <SectionTitle eyebrow="Handoffs" title="Where Deals Usually ^Fall Out" sub="Scroll to follow one deal from SDR to AE to CS, or tap a stage." />
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
            {/* diagram */}
            <div className="relative flex lg:flex-col items-center lg:items-start justify-between lg:justify-start gap-4 lg:gap-0 lg:pl-6">
              <div className="absolute left-0 right-0 top-6 h-px lg:left-[calc(1.5rem+27px)] lg:right-auto lg:top-6 lg:bottom-6 lg:h-auto lg:w-px bg-white/15" aria-hidden="true" />
              {stages.map((s, i) => (
                <button
                  key={s.role}
                  type="button"
                  onClick={() => jump(i)}
                  aria-label={`Go to ${s.role} stage`}
                  aria-current={i === idx ? "step" : undefined}
                  className="group relative flex lg:flex-row flex-col items-center lg:items-center gap-3 lg:gap-6 lg:py-6 text-left cursor-pointer focus-visible:outline-none"
                >
                  <motion.span
                    animate={{ scale: i === idx ? 1.12 : 1 }}
                    className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 font-black transition-colors duration-500 group-hover:border-[#63D2A3] group-focus-visible:ring-2 group-focus-visible:ring-[#63D2A3]"
                    style={{ borderColor: i <= idx ? MINT : "rgba(255,255,255,0.25)", background: i === idx ? MINT : "#000", color: i === idx ? "#000" : i < idx ? MINT : "rgba(255,255,255,0.6)" }}
                  >
                    {s.role}
                  </motion.span>
                  <span className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] transition-colors group-hover:text-white" style={{ color: i === idx ? "#fff" : "rgba(255,255,255,0.45)" }}>
                    {["Qualified meeting", "Active deal", "Closed-won"][i]}
                  </span>
                </button>
              ))}
            </div>
            {/* detail */}
            <motion.div key={stage.role} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 md:p-10" aria-live="polite">
              <p className="text-[12px] font-black uppercase tracking-[0.25em]" style={{ color: MINT }}>Step {idx + 1} of {n}</p>
              <h3 className="mt-4 text-2xl md:text-4xl font-black tracking-tight leading-tight"><Marked text={stage.title} /></h3>
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

const PIPE = "linear-gradient(180deg,#0c0c0c 0%,#2a2f2c 18%,#7d8782 42%,#3a413d 62%,#121413 100%)";
const PIPE_V = "linear-gradient(90deg,#0c0c0c 0%,#2a2f2c 18%,#7d8782 42%,#3a413d 62%,#121413 100%)";

function Collar({ n, vertical = false }) {
  return (
    <div className={`relative z-10 ${vertical ? "h-14 w-[4.25rem]" : "h-[4.25rem] w-14"} flex items-center justify-center rounded-md border border-black/70`} style={{ background: vertical ? PIPE_V : PIPE, boxShadow: "0 0 0 2px #1a1d1b, 0 6px 18px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.18)" }}>
      {[0, 1].map((k) => (
        <span key={k} className={`absolute h-1.5 w-1.5 rounded-full bg-black/70 ${vertical ? (k ? "right-1.5 top-1/2 -translate-y-1/2" : "left-1.5 top-1/2 -translate-y-1/2") : (k ? "bottom-1.5 left-1/2 -translate-x-1/2" : "top-1.5 left-1/2 -translate-x-1/2")}`} />
      ))}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black font-mono text-sm font-black" style={{ color: MINT, boxShadow: `0 0 0 2px ${MINT}` }}>{String(n).padStart(2, "0")}</span>
    </div>
  );
}

function RunIt() {
  return (
    <Section tone="clear">
      <SectionTitle eyebrow="How we run it" title="Four Steps, ^Live Pipeline." />
      {/* desktop: horizontal pipe */}
      <div className="hidden md:block relative pt-2">
        <div className="absolute left-0 right-0 top-6 h-[2.25rem]" aria-hidden="true">
          <div className="absolute inset-0 rounded-[0.4rem]" style={{ background: PIPE, boxShadow: "0 10px 30px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.12)" }} />
          <div className="absolute inset-x-6 top-[0.9rem] h-[0.35rem] rounded-full opacity-70" style={{ background: `linear-gradient(90deg, transparent, ${MINT}, transparent)`, filter: "blur(3px)" }} />
          <div className="absolute -left-2 -top-2 h-[3.25rem] w-3 rounded-sm bg-[#2a2f2c] border border-white/15" />
          <div className="absolute -right-2 -top-2 h-[3.25rem] w-3 rounded-sm bg-[#2a2f2c] border border-white/15" />
        </div>
        <div className="relative grid grid-cols-4">
          {runIt.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <div className="flex h-full flex-col items-center px-4 text-center">
                <Collar n={i + 1} />
                <div className="h-7 w-3.5" style={{ background: PIPE_V, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }} aria-hidden="true" />
                <div className="w-full flex-1 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-sm">
                  <h3 className="text-lg font-black text-white leading-snug">{s.title}</h3>
                  <p className="mt-2 font-body text-[15px] text-white/85 leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      {/* mobile: vertical pipe */}
      <div className="md:hidden relative">
        <div className="absolute left-[1.55rem] top-0 bottom-0 w-[2.25rem] rounded-[0.4rem]" style={{ background: PIPE_V, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }} aria-hidden="true" />
        <div className="relative space-y-6">
          {runIt.map((s, i) => (
            <Reveal key={s.title} delay={0.05}>
              <div className="flex items-center gap-3">
                <Collar n={i + 1} vertical />
                <div className="h-3.5 w-4 shrink-0" style={{ background: PIPE, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.12)" }} aria-hidden="true" />
                <div className="flex-1 rounded-2xl border border-white/10 bg-black/60 p-4">
                  <h3 className="text-base font-black text-white leading-snug">{s.title}</h3>
                  <p className="mt-1.5 font-body text-sm text-white/85 leading-relaxed">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
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
      <div className="relative">
        <GridField />
        <div className="relative">
          <RunIt />
          <ProductTieIn tone="clear" headline="Your playbook, live on every call." body="Qmo turns the playbook into Q Cards that surface mid-call and keeps improving them from real recordings." />
        </div>
      </div>
      <CtaBand headline="Ready To Make It ^Run?" primary={{ href: "/contact", label: "Book a Working Session" }} />
    </div>
  );
}
