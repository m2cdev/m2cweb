"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { GRDR_CYAN } from "./ui";

const FIX = 'Don\'t pitch features yet. Ask: "What happens if you don\'t fix this by Q3?"';

export default function GrdrDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0); // 0 snippet, 1 scanning, 2 score, 3 fix
  const [score, setScore] = useState(0);
  const [typed, setTyped] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = [];
    timers.push(setTimeout(() => setPhase(1), 700));
    timers.push(setTimeout(() => {
      setPhase(2);
      let n = 0;
      const id = setInterval(() => { n += 1; setScore(n); if (n >= 9) clearInterval(id); }, 800 / 9);
      timers.push(id);
    }, 700 + 1400));
    timers.push(setTimeout(() => {
      setPhase(3);
      let c = 0;
      const id = setInterval(() => { c += 1; setTyped(c); if (c >= FIX.length) clearInterval(id); }, 28);
      timers.push(id);
    }, 700 + 1400 + 1100));
    return () => timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
  }, [inView, reduce, run]);

  const phaseV = reduce ? 3 : phase;
  const scoreV = reduce ? 9 : score;
  const typedV = reduce ? FIX.length : typed;
  const finished = phaseV === 3 && typedV >= FIX.length;

  return (
    <div ref={ref} className="mx-auto max-w-md" style={{ fontFamily: "Satoshi, var(--font-body), system-ui, sans-serif" }}>
      <div className="rounded-md border border-white/10 bg-[#0B0F0E] p-5 shadow-[0_0_60px_rgba(0,209,255,0.10)]" role="img" aria-label="Example grade: 9 out of 12. Next move: proceed with caution.">
        <div className="rounded-md bg-[#1A1F1E] p-4 text-sm text-white/90 leading-relaxed">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/50">Transcript</p>
          <p><span className="text-white/60">Rep:</span> What does your team use today to review calls?</p>
          <p><span className="text-white/60">Prospect:</span> Mostly recordings, when a manager finds time.</p>
          <p><span className="text-white/60">Rep:</span> Great, let me show you our features.</p>
        </div>

        <div className="mt-5 flex min-h-[170px] flex-col items-center justify-center text-center">
          {phaseV === 1 && (
            <div className="flex flex-col items-center gap-3">
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="h-14 w-14 rounded-full border-2 border-white/10" style={{ borderTopColor: GRDR_CYAN }} />
              <p className="text-sm text-white/80">Assessing conversation...</p>
            </div>
          )}
          {phaseV >= 2 && (
            <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} className="w-full">
              <p className="text-6xl font-black tabular-nums text-white">{scoreV}<span className="text-2xl text-white/50">/12</span></p>
              <span className="mt-3 inline-block rounded-sm px-3 py-1 text-xs font-bold uppercase tracking-widest" style={{ background: `${GRDR_CYAN}1f`, color: GRDR_CYAN }}>Mixed signals</span>
              <motion.p initial={reduce ? false : { x: -16, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-sm font-bold text-white">
                Next Move: <span style={{ color: GRDR_CYAN }}>Proceed with Caution</span>
              </motion.p>
            </motion.div>
          )}
          {phaseV === 0 && <p className="text-sm text-white/40">Grade appears here.</p>}
        </div>

        {phaseV >= 3 && (
          <div className="mt-2 rounded-md border p-4" style={{ borderColor: `${GRDR_CYAN}55` }}>
            <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: GRDR_CYAN }}>The Fix</p>
            <p className="mt-2 min-h-[3rem] text-sm text-white">{FIX.slice(0, typedV)}</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-white/70">Example call. Names are fictional.</p>
        {finished && !reduce && (
          <button onClick={() => { setPhase(0); setScore(0); setTyped(0); setRun((r) => r + 1); }} className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest hover:text-white transition-colors" style={{ color: GRDR_CYAN }}>
            <RotateCcw className="h-4 w-4" /> Replay
          </button>
        )}
      </div>
    </div>
  );
}
