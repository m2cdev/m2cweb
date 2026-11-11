"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Reveal, GridBackdrop, Eyebrow, SplitLetters, WhiteSection, WhiteTitle, QmoMark, GrdrMark, QMO_YELLOW, GRDR_CYAN, CoralPill } from "./ui";

export default function ProductsHub() {
  const reduce = useReducedMotion();
  const cards = [
    { href: "/products/qmo", color: QMO_YELLOW, mark: <QmoMark className="h-8" />, tag: "Live coaching", line: "Live AI coaching on every call", who: "For reps and sales managers running outbound and demos.", dark: true },
    { href: "/products/grdr", color: GRDR_CYAN, mark: <GrdrMark className="text-3xl" />, tag: "Call grading", line: "Grade every call and deal", who: "For sales leaders who coach reps.", dark: false },
  ];
  return (
    <div className="bg-black text-white">
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-16 px-6 md:px-16 overflow-hidden">
        <GridBackdrop />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <Eyebrow>Product Portfolio</Eyebrow>
          <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.98] text-white max-w-5xl [perspective:800px]">
            <SplitLetters text="Two products. One ^sales motion." />
          </h1>
          <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }} className="mt-8 max-w-3xl text-lg md:text-xl text-white font-body leading-relaxed">
            Qmo coaches reps while the call is live. Grdr grades the call once it is done. Pick the one that fits your team.
          </motion.p>
        </div>
      </section>
      <WhiteSection>
        <WhiteTitle eyebrow="Which one fits you?" title="Choose Your ^Product" sub="Each has its own page, with a short walkthrough and a link to the product site." />
        <div className="grid gap-6 md:grid-cols-2">
          {cards.map((c, i) => (
            <Reveal key={c.href} delay={i * 0.1}>
              <Link
                href={c.href}
                className={`group relative block h-full overflow-hidden rounded-3xl border p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 ${c.dark ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10 text-black"}`}
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="h-9 flex items-center">{c.dark ? c.mark : <span className="text-3xl font-black tracking-tight text-black">Grdr<span style={{ color: "#00A8CC" }}>.</span></span>}</div>
                  <CoralPill>{c.tag}</CoralPill>
                </div>
                <h3 className="text-2xl md:text-4xl font-black tracking-tight">{c.line}</h3>
                <p className={`mt-3 font-body text-base md:text-lg ${c.dark ? "text-white/80" : "text-[#5C5C5C]"}`}>{c.who}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: c.dark ? c.color : "#63D2A3" }}>
                  See {c.href.endsWith("qmo") ? "Qmo" : "Grdr"} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </WhiteSection>
      <section className="relative px-6 py-20 md:py-28 text-center overflow-hidden bg-gradient-to-b from-black to-[#050505] hide-floating-cta">
        <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,210,163,0.15),transparent_70%)] pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-white mb-6">Want Help Running Them?</h2>
          <p className="text-lg text-white font-body mb-8">Use them on your own, or let Map2Close set them up and run them with your team.</p>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#63D2A3] text-black font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-colors">Book a Working Session</Link>
        </div>
      </section>
    </div>
  );
}
