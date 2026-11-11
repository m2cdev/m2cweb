"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

const Y = "#FFC801";

// Each scroll step plays the next moment of the call.
const STEPS = [
  { kind: "line", who: "You", text: "Thanks for taking the call, Dana. I'll keep it short." },
  { kind: "line", who: "Dana", text: "Honestly, we're too busy to look at anything new right now." },
  { kind: "card" },
  { kind: "line", who: "You", text: "Fair enough, I caught you mid-week. Before I let you go, what would have to change for something like this to make the list?" },
  { kind: "line", who: "Dana", text: "Our reps lose calls at the first objection, and we only hear about it a week later." },
  { kind: "review" },
];
const TIMER = [0, 129, 133, 135, 137, 139, 141];

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// Tall scroll track with a pinned call window: scrolling advances the call one step at a time.
export default function QmoDemo() {
  const track = useRef(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0); // number of steps played
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const n = Math.min(STEPS.length, Math.max(0, Math.floor(p * (STEPS.length + 0.6))));
    setStep((s) => (s === n ? s : n));
  });

  const played = reduce ? STEPS.length : step;
  const lines = STEPS.slice(0, played).map((s, i) => ({ ...s, i })).filter((s) => s.kind === "line");
  const cardIdx = STEPS.findIndex((s) => s.kind === "card");
  const showCard = played > cardIdx;
  const cardUsed = played > cardIdx + 1; // the rep said the line
  const showReview = played >= STEPS.length;
  const clock = fmt(TIMER[Math.min(played, TIMER.length - 1)] || 127);

  return (
    <div ref={track} style={{ height: reduce ? "auto" : `${(STEPS.length + 1) * 52}vh` }}>
      <div className={reduce ? "" : "sticky top-24"}>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-white/10 bg-[#0B0B0C] overflow-hidden shadow-[0_0_60px_rgba(255,200,1,0.08)]" role="img" aria-label="Example call: Dana, VP of Sales at Northwind, says they are too busy. Qmo shows an objection card with the words to say.">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: Y }} />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: Y }} />
                </span>
                <span className="text-sm font-semibold text-white">Live call</span>
                <span className="text-sm tabular-nums text-white/70">{clock}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white">Dana</p>
                <p className="text-xs text-white/60">VP of Sales, Northwind</p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 min-h-[380px]">
              <div className="md:col-span-3 p-5 md:p-6 space-y-3 md:border-r border-white/10">
                {played === 0 && <p className="text-sm text-white/40">Scroll to start the call.</p>}
                <AnimatePresence initial={false}>
                  {lines.map((l) => (
                    <motion.div key={l.i} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="flex gap-3 text-sm md:text-base">
                      <span className={`w-12 shrink-0 font-semibold ${l.who === "You" ? "text-[#FFC801]" : "text-white/60"}`}>{l.who}</span>
                      <span className="text-white">{l.text}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <AnimatePresence>
                  {showReview && (
                    <motion.div
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring", stiffness: 320, damping: 20 }}
                      className="mt-4 rounded-2xl border px-4 py-3 text-sm text-white"
                      style={{ borderColor: `${Y}66`, background: `${Y}12` }}
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: Y }}>Q Review</p>
                      <p className="mt-1">You found the pain at 2:14. Next time, confirm the pain before the demo ask.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="md:col-span-2 p-5 md:p-6 bg-white/[0.02] flex items-end">
                <AnimatePresence>
                  {showCard ? (
                    <motion.div
                      key="card"
                      initial={reduce ? false : { y: 80, opacity: 0 }}
                      animate={{ y: 0, opacity: cardUsed ? 0.6 : 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 24 }}
                      className="w-full rounded-2xl border p-5"
                      style={{ borderColor: Y, background: "#14130a" }}
                    >
                      <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: Y }}>Objection</p>
                      <p className="mt-3 text-[15px] font-semibold leading-snug text-white">
                        Fair enough, I caught you mid-week. Before I let you go, what would have to change for something like this to make the list?
                      </p>
                      <p className="mt-3 text-xs text-white/70">Why it works: it respects the brush-off and turns it into their own reason to keep talking.</p>
                      {cardUsed && <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-white/50">Used</p>}
                    </motion.div>
                  ) : (
                    <p key="empty" className="text-sm text-white/40">Q Cards appear here, live.</p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-sm text-white/70">Example call. Names are fictional.</p>
            {!reduce && (
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="text-xs text-white/50">{played < STEPS.length ? "Keep scrolling" : "That's the call"}</span>
                <div className="flex gap-1.5">
                  {STEPS.map((_, i) => (
                    <span key={i} className="h-1.5 w-6 rounded-full transition-colors duration-300" style={{ background: i < played ? Y : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
