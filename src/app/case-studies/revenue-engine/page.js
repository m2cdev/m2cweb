"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Database, MessageSquare, SlidersHorizontal, Users, Zap } from "lucide-react";
import { Waves } from "@/components/ui/wave-background";

const GREEN = "#63D2A3";
const CORAL = "#FF6B6B";

const stats = [
  { big: "5.5x", label: "Pipeline Growth", sub: "First 90 days: $233.5K sourced, up from $42.6K" },
  { big: "288→683", label: "Demos Booked", sub: "Nearly tripled, in under 3 months" },
  { big: "6.0%", label: "Connect-to-Demo Rate", sub: "Up from 3.4%, now top-tier band" },
  { big: "7.5x", label: "More Quality Conversations", sub: "310 to 2,317 positive calls" },
  { big: "1-3", label: "Days to Ramp New Reps", sub: "Vs. ~2 weeks industry benchmark" },
  { big: "324", label: "Hours of Training Delivered", sub: "Coaching and enablement since January" },
];

const services = [
  { name: "CRM Architecture", Icon: Database },
  { name: "Sales Coaching", Icon: MessageSquare },
  { name: "Role & Comp Design", Icon: SlidersHorizontal },
  { name: "Rep Recruiting & Onboarding", Icon: Users },
  { name: "Custom AI Tooling", Icon: Zap },
];

const regions = [
  { name: "N. America", n: 4, color: GREEN },
  { name: "Europe", n: 3, color: CORAL },
  { name: "Australia", n: 1, color: "#3a9873" },
];

function Heading({ children, color = GREEN }) {
  return (
    <div className="flex items-center gap-4 mb-10">
      <span className="text-sm font-black tracking-[0.35em] uppercase" style={{ color }}>{children}</span>
      <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${color}66, transparent)` }} />
    </div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

function Panel({ label, color = GREEN, title, bullets, stat, statLabel, statColor = color, children }) {
  return (
    <motion.div {...reveal} className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0e0e0e] p-7 md:p-9">
      <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-5" style={{ color }}>{label}</p>
      <h3 className="text-2xl md:text-4xl font-black tracking-tight leading-tight mb-6">{title}</h3>
      {bullets && (
        <ul className="space-y-3 mb-8">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 font-body text-base md:text-xl text-white">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} />
              {b}
            </li>
          ))}
        </ul>
      )}
      {children}
      <div className="mt-auto pt-6 border-t border-white/[0.08]">
        <p className="text-3xl md:text-4xl font-black" style={{ color: statColor }}>{stat}</p>
        <p className="mt-1 text-[11px] font-black tracking-[0.25em] uppercase text-white">{statLabel}</p>
      </div>
    </motion.div>
  );
}

function Donut() {
  const total = regions.reduce((a, r) => a + r.n, 0);
  const R = 54, C = 2 * Math.PI * R;
  const offsets = regions.map((_, i) => regions.slice(0, i).reduce((a, r) => a + (r.n / total) * C, 0));
  return (
    <svg viewBox="0 0 140 140" className="h-40 w-40 shrink-0 -rotate-90" role="img" aria-label="Regional coverage: North America 4, Europe 3, Australia 1">
      {regions.map((r, i) => {
        const len = (r.n / total) * C;
        return (
          <motion.circle
            key={r.name}
            cx="70" cy="70" r={R} fill="none" stroke={r.color} strokeWidth="18"
            strokeDasharray={`${len - 2} ${C - len + 2}`}
            strokeDashoffset={-offsets[i]}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.2 }}
          />
        );
      })}
    </svg>
  );
}

function DemosChart() {
  return (
    <svg viewBox="0 0 400 140" className="w-full" role="img" aria-label="Demos booked rose from 288 on day 1 to 683 on day 90">
      <defs>
        <linearGradient id="re-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={GREEN} stopOpacity="0.35" />
          <stop offset="1" stopColor={GREEN} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M10 112 C 120 104, 240 70, 390 34 L390 140 L10 140 Z" fill="url(#re-fill)" />
      <motion.path
        d="M10 112 C 120 104, 240 70, 390 34" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <circle cx="10" cy="112" r="5" fill={GREEN} />
      <circle cx="390" cy="34" r="6" fill={GREEN} />
    </svg>
  );
}

export default function RevenueEngineCaseStudy() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <section className="relative flex items-center overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_50%,rgba(99,210,163,0.08)_0%,transparent_70%)]" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-30">
            <Waves strokeColor={GREEN} backgroundColor="transparent" className="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>
        <div className="container mx-auto px-6 md:px-16 relative z-10 py-20 pt-32 md:py-28 md:pt-40">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block text-[11px] font-black tracking-[0.4em] uppercase mb-4" style={{ color: GREEN }}>Case Study</span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.92] mb-8 max-w-5xl">
              The <span style={{ color: GREEN }}>Revenue Engine</span> Revamp
            </h1>
            <p className="text-base md:text-2xl text-white font-body leading-relaxed max-w-3xl mb-8 md:mb-10">
              How Map2Close scaled sales and business development for a 10-brand group across Lead Gen, Drone-as-a-Service, and SaaS Sales in 8 markets and 3 continents.
            </p>
            <a href="#case-study">
              <button className="text-black px-6 py-3 md:px-10 md:py-4 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 flex items-center gap-3" style={{ background: GREEN }}>
                Read the Case Study <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </motion.div>
        </div>
      </section>

      <article id="case-study" className="relative">
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-20 space-y-20">

          {/* NUMBERS */}
          <motion.section {...reveal}>
            <Heading>The Numbers</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/[0.08] bg-[#0e0e0e] px-6 py-8 text-center">
                  <p className="text-4xl md:text-6xl font-black tracking-tight" style={{ color: GREEN }}>{s.big}</p>
                  <p className="mt-3 text-base md:text-lg font-black">{s.label}</p>
                  <p className="mt-1 text-sm font-body text-white/80">{s.sub}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* SCENARIO / PROBLEM */}
          <section>
            <Heading>Scenario and Problem</Heading>
            <div className="grid gap-6 md:grid-cols-2">
              <Panel label="Scenario" title="10 Brands, One Engine" bullets={["10 brands, each its own business unit", "Spanning tech, drone services, safety, and facility care"]} stat="10 / 8 / 3" statLabel="Brands / Markets / Continents" />
              <Panel label="Problem" color={CORAL} title="A Fragmented Sales Motion" bullets={["3 offices, 30+ reps, no centralized system", "Lead gen and sales working in silos"]} stat="Broken Global Sales Motion" statLabel="The starting point" />
            </div>
          </section>

          {/* SOLUTION / RESULT */}
          <section>
            <Heading>Solution and Result</Heading>
            <div className="grid gap-6 md:grid-cols-2">
              <Panel label="Solution" title="Systems & People" bullets={services.map((s) => s.name)} stat="5" statLabel="Core services" />
              <Panel label="Result" color={CORAL} title="3x Demos, 5.5x Pipeline" bullets={["Demos nearly tripled in 90 to 120 days", "Connect rate hit the top-tier band"]} stat="5.5x" statLabel="Pipeline growth" />
            </div>
            <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
              {services.map(({ name, Icon }, i) => (
                <motion.div key={name} {...reveal} transition={{ duration: 0.5, delay: i * 0.07 }} className="flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-[#0e0e0e] px-4 py-7 text-center">
                  <Icon className="h-8 w-8" style={{ color: i === 1 ? CORAL : GREEN }} />
                  <p className="text-sm md:text-base font-black">{name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* REGIONAL COVERAGE + DEMOS */}
          <section>
            <Heading>Regional Coverage</Heading>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div {...reveal} className="rounded-2xl border border-white/[0.08] bg-[#0e0e0e] p-7 md:p-9">
                <p className="text-[11px] font-black tracking-[0.3em] uppercase mb-6" style={{ color: GREEN }}>Markets by region</p>
                <div className="flex items-center gap-8">
                  <Donut />
                  <ul className="flex-1 space-y-4">
                    {regions.map((r) => (
                      <li key={r.name} className="flex items-center gap-3 text-base md:text-lg font-body">
                        <span className="h-3 w-3 rounded-full" style={{ background: r.color }} />
                        <span className="flex-1">{r.name}</span>
                        <span className="font-black">{r.n}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              <motion.div {...reveal} className="rounded-2xl border border-white/[0.08] bg-[#0e0e0e] p-7 md:p-9">
                <p className="text-[11px] font-black tracking-[0.3em] uppercase" style={{ color: GREEN }}>Demos booked</p>
                <p className="mt-1 mb-4 text-sm font-body text-white/80">Over the first 90 days</p>
                <DemosChart />
                <div className="mt-2 flex justify-between">
                  <div><p className="text-2xl font-black">288</p><p className="text-[11px] font-black tracking-[0.25em] uppercase text-white/80">Day 1</p></div>
                  <div className="text-right"><p className="text-2xl font-black">683</p><p className="text-[11px] font-black tracking-[0.25em] uppercase text-white/80">Day 90</p></div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* PILOT CTA */}
          <motion.div {...reveal} className="rounded-3xl border border-white/[0.08] bg-[#0e0e0e] px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 hide-floating-cta">
            <div>
              <h3 className="text-2xl md:text-5xl font-black tracking-tighter">They Opted in for Our <span style={{ color: GREEN }}>Pilot Program</span></h3>
              <p className="mt-3 text-base md:text-xl font-body text-white/90">We prove results first in a 90-day engagement, before any further commitment.</p>
            </div>
            <Link href="/pilot">
              <button className="text-black px-8 py-4 md:px-10 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300 whitespace-nowrap" style={{ background: CORAL }}>
                The Pilot Program
              </button>
            </Link>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
