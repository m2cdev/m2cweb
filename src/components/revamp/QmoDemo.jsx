"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { QMO_YELLOW } from "./ui";

const LINES = [
  { id: "l1", who: "You", text: "Thanks for taking the call, Dana. I'll keep it short.", at: 400 },
  { id: "l2", who: "Dana", text: "Honestly, we're too busy to look at anything new right now.", at: 1600 },
  { id: "l3", who: "You", text: "Fair enough, I caught you mid-week. Before I let you go, what would have to change for something like this to make the list?", at: 4000 },
  { id: "l4", who: "Dana", text: "Our reps lose calls at the first objection, and we only hear about it a week later.", at: 5600 },
];
const CARD_AT = 2100;
const REVIEW_AT = 7400;
const END = 8400;
const TIMER = [129, 131, 133, 135, 137, 139];

function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export default function QmoDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduce = useReducedMotion();
  const [t, setT] = useState(0);
  const started = useInView(ref, { amount: 0.5, once: true });

  useEffect(() => {
    if (reduce || !started || !inView || t >= END) return;
    const id = setInterval(() => setT((v) => Math.min(v + 100, END)), 100);
    return () => clearInterval(id);
  }, [reduce, started, inView, t]);

  const time = reduce ? END : t;
  const visible = LINES.filter((l) => time >= l.at);
  const showCard = time >= CARD_AT && time < 4000 + 2400;
  const cardUsed = time >= 4000;
  const showReview = time >= REVIEW_AT;
  const clock = fmt(TIMER[Math.min(TIMER.length - 1, Math.floor(time / 1500))]);
  const done = time >= END;

  return (
    <div ref={ref} className="mx-auto max-w-4xl">
      <div className="rounded-3xl border border-white/10 bg-[#0B0B0C] overflow-hidden shadow-[0_0_60px_rgba(255,200,1,0.08)]" role="img" aria-label="Example call: Dana, VP of Sales at Northwind, says they are too busy. Qmo shows an objection card with the words to say.">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: QMO_YELLOW }} />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: QMO_YELLOW }} />
            </span>
            <span className="text-sm font-semibold text-white">On call</span>
            <span className="text-sm tabular-nums text-white/70">{clock}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-white">Dana</p>
            <p className="text-xs text-white/60">VP of Sales, Northwind</p>
          </div>
        </div>

        <div className="grid md:grid-cols-5 min-h-[360px]">
          <div className="md:col-span-3 p-5 md:p-6 space-y-3 md:border-r border-white/10">
            <AnimatePresence initial={false}>
              {visible.map((l) => (
                <motion.div key={l.id} initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 text-sm md:text-base">
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
                  style={{ borderColor: `${QMO_YELLOW}66`, background: `${QMO_YELLOW}12` }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: QMO_YELLOW }}>Q Review</p>
                  <p className="mt-1">You found the pain at 2:14. Next time, confirm the pain before the demo ask.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="md:col-span-2 p-5 md:p-6 bg-white/[0.02] flex items-end">
            <AnimatePresence>
              {showCard && (
                <motion.div
                  key="card"
                  initial={reduce ? false : { y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ opacity: 0.55 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24, duration: 0.3 }}
                  className="w-full rounded-2xl border p-5"
                  style={{ borderColor: QMO_YELLOW, background: "#14130a" }}
                >
                  <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: QMO_YELLOW }}>Objection</p>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-white">
                    Fair enough, I caught you mid-week. Before I let you go, what would have to change for something like this to make the list?
                  </p>
                  <p className="mt-3 text-xs text-white/70">Why it works: it respects the brush-off and turns it into their own reason to keep talking.</p>
                  {cardUsed && <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-white/50">Used</p>}
                </motion.div>
              )}
            </AnimatePresence>
            {!showCard && <p className="text-sm text-white/40">Q Cards appear here, live.</p>}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <p className="text-sm text-white/70">Example call. Names are fictional.</p>
        {(done || reduce) && !reduce && (
          <button onClick={() => setT(0)} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FFC801] hover:text-white transition-colors">
            <RotateCcw className="h-4 w-4" /> Replay
          </button>
        )}
      </div>
    </div>
  );
}
