"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Database, Cpu, GitBranch } from "lucide-react";

// ─── Fade-up animation preset ──────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FadeSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
      variants={fadeUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Implementation Rows ──────────────────────────────────────────────────
const implementationRows = [
  {
    icon: <Database className="w-5 h-5 text-[#62D2A2]" />,
    title: "CRM Setup & Optimization",
    description: "We configure your CRM around a process that reflects how your deals actually move, clean pipelines, meaningful stages, and workflows your reps will use.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#62D2A2]" />,
    title: "Tech Stack Integration",
    description: "Sales tools working in silos kill efficiency. We connect and streamline your existing stack so data flows where it needs to go and nothing falls through the cracks.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#62D2A2]" />,
    title: "Workflow Automation",
    description: "We identify every manual, repetitive workflow and automate it, so your reps stay focused on selling, not admin.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-[#62D2A2]" />,
    title: "Stack Optimization",
    description: "Most teams use 20% of what their tools can do. We unlock the rest, so you get the most out of every tool you're already paying for.",
  },
];

const revOpsLogos = [
  { name: "HubSpot", src: "https://api.iconify.design/logos/hubspot.svg" },
  { name: "Salesforce", src: "https://api.iconify.design/logos/salesforce.svg" },
  { name: "Airtable", src: "https://api.iconify.design/logos/airtable.svg" },
  {
    name: "Apollo",
    src: "/logos/apollo.png",
    className: "scale-[1.4] transition-transform duration-300",
    style: { filter: 'brightness(0) saturate(100%) invert(86%) sepia(35%) saturate(3015%) hue-rotate(358deg) brightness(104%) contrast(104%)' }
  },
  {
    name: "Pipedrive",
    src: "/logos/pipedrive.png",
    className: "scale-[1.3] transition-transform duration-300"
  },
  { name: "LinkedIn", src: "https://api.iconify.design/logos/linkedin-icon.svg" },
  { name: "Slack", src: "https://api.iconify.design/logos/slack-icon.svg" },
  { name: "Gmail", src: "https://api.iconify.design/logos/google-gmail.svg" },
  { name: "Notion", src: "https://api.iconify.design/logos/notion-icon.svg?color=white" },
  {
    name: "Gong",
    src: "/logos/gong.png",
    className: "scale-[1.2] transition-transform duration-300"
  },
];

const howWeRunRows = [
  {
    step: "01",
    title: "Map the current motion",
    body: "We audit how leads, deals, handoffs, fields, automations, and reporting actually work today before changing the stack.",
  },
  {
    step: "02",
    title: "Rebuild around rep behavior",
    body: "We simplify the CRM and workflows around what reps need to do next, not around how the software was configured by default.",
  },
  {
    step: "03",
    title: "Automate the repeatable work",
    body: "Manual updates, routing, alerts, enrichment, and follow-up triggers get moved into clean workflows your team can maintain.",
  },
  {
    step: "04",
    title: "Enable and pressure-test",
    body: "We train the team inside the rebuilt motion, watch where adoption breaks, and tune the system against live pipeline.",
  },
];

export default function RevOpsImplementationsPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-32 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto overflow-visible">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute top-1/3 left-0 w-[700px] h-[700px] rounded-full bg-[#62D2A2]/8 blur-[160px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#F96B6B]/5 blur-[140px]" />
        </div>

        {/* Left: Headline content */}
        <div className="flex-1 flex flex-col justify-center z-10 md:max-w-[52%]">
          <FadeSection delay={0}>
            <span className="inline-block text-[11px] font-black tracking-[0.4em] text-[#62D2A2] uppercase mb-6">
              Implementations
            </span>
          </FadeSection>

          <FadeSection delay={0.08}>
            <h1 className="text-3xl md:text-6xl lg:text-[5rem] font-black tracking-tight leading-[0.95] mb-6 md:mb-8 text-white">
              Your Stack Should Be{" "}
              <span className="text-[#62D2A2]">Working</span>{" "}
              Harder Than You Are.
            </h1>
          </FadeSection>

          <FadeSection delay={0.14}>
            <p className="font-body text-white text-base md:text-xl leading-relaxed mb-8 md:mb-10 max-w-xl">
              We configure your stack around a process built to convert, so your reps spend less time managing software and more time closing deals.
            </p>
          </FadeSection>

          {/* CTA - hidden on mobile, shown on md+ */}
          <FadeSection delay={0.2} className="hidden md:block">
            <a
              href="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex"
            >
              <button className="bg-[#62D2A2] text-white px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#F96B6B] hover:text-white transition-all duration-300 flex items-center gap-3 shadow-[0_0_40px_rgba(98,210,162,0.15)] hover:shadow-[0_0_40px_rgba(249,107,107,0.2)]">
                Book a Working Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </FadeSection>
        </div>

        {/* Right: CRM Dashboard mockup */}
        <FadeSection delay={0.1} className="flex-1 w-full relative mt-8 md:mt-0 flex flex-col items-center justify-center gap-6">
          <div className="relative w-full rounded-[1.2rem] overflow-hidden border border-[#62D2A2]/30 shadow-[0_0_60px_rgba(98,210,162,0.18),0_0_120px_rgba(98,210,162,0.10),0_32px_64px_rgba(0,0,0,0.8)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-[#F96B6B]/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-[#62D2A2]/80" />
              <div className="ml-4 flex-1 bg-white/8 rounded-full h-5 max-w-[180px]" />
            </div>

            {/* Dashboard body */}
            <div className="bg-[#0f0f0f] p-3 space-y-2">

              {/* Top stat cards */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: "Pipeline", value: "$2.4M", change: "+18%" },
                  { label: "Active Deals", value: "47", change: "+6" },
                  { label: "Velocity", value: "12d", change: "-3d" },
                  { label: "Win Rate", value: "34%", change: "+7%" },
                ].map((s) => (
                  <div key={s.label} className="bg-[#1a1a1a] border border-white/8 rounded-lg p-2.5">
                    <p className="text-white/40 text-[9px] uppercase tracking-widest font-black mb-1">{s.label}</p>
                    <p className="text-white text-base font-black tracking-tight leading-none">{s.value}</p>
                    <p className="text-[#62D2A2] text-[10px] font-bold mt-0.5">{s.change}</p>
                  </div>
                ))}
              </div>

              {/* Pipeline stages bar */}
              <div className="bg-[#1a1a1a] border border-white/8 rounded-lg px-3 py-2">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-white/50 text-[9px] font-black uppercase tracking-widest">Pipeline Stages</p>
                  <p className="text-white/20 text-[9px] font-mono">Q2 2025</p>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden gap-px">
                  <div className="bg-[#62D2A2] rounded-l-full" style={{width:"28%"}} />
                  <div className="bg-[#62D2A2]/60" style={{width:"22%"}} />
                  <div className="bg-[#62D2A2]/35" style={{width:"18%"}} />
                  <div className="bg-[#F96B6B]/60" style={{width:"14%"}} />
                  <div className="bg-white/15 rounded-r-full" style={{width:"18%"}} />
                </div>
              </div>

              {/* Deal rows */}
              <div className="bg-[#1a1a1a] border border-white/8 rounded-lg overflow-hidden">
                <div className="flex items-center px-3 py-1.5 border-b border-white/5">
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest">Active Deals</p>
                </div>
                {[
                  { name: "Acme Corp", stage: "Proposal", value: "$84K", owner: "KM", health: "high" },
                  { name: "Vertex AI", stage: "Qualified", value: "$210K", owner: "SL", health: "high" },
                  { name: "Bridgeway", stage: "Negotiation", value: "$47K", owner: "KM", health: "mid" },
                ].map((deal, i) => (
                  <div key={i} className="flex items-center gap-3 px-3 py-2 border-b border-white/[0.04] last:border-0">
                    <div className="w-6 h-6 rounded-md bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-black text-[#62D2A2]">{deal.owner}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[11px] font-bold truncate leading-none">{deal.name}</p>
                      <p className="text-white/30 text-[9px] mt-0.5">{deal.stage}</p>
                    </div>
                    <p className="text-white text-[11px] font-black shrink-0">{deal.value}</p>
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${deal.health === "high" ? "bg-[#62D2A2]" : deal.health === "mid" ? "bg-yellow-400" : "bg-[#F96B6B]"}`} />
                  </div>
                ))}
              </div>

              {/* Bottom row: automation log + mini chart */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#1a1a1a] border border-white/8 rounded-lg p-2.5">
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2">Workflow Triggers</p>
                  {[
                    { event: "Lead enriched → HubSpot", time: "2m" },
                    { event: "Deal stall alert fired", time: "8m" },
                  ].map((e, i) => (
                    <div key={i} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                      <div className="w-1 h-1 rounded-full bg-[#62D2A2] shrink-0" />
                      <p className="text-white/60 text-[9px] flex-1 truncate">{e.event}</p>
                      <p className="text-white/20 text-[8px] shrink-0">{e.time}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#1a1a1a] border border-white/8 rounded-lg p-2.5">
                  <p className="text-white/30 text-[9px] font-black uppercase tracking-widest mb-2">Conversion Rate</p>
                  <div className="flex items-end gap-0.5 h-8">
                    {[40,55,45,65,58,72,68,80,75,88].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{
                        height: `${h}%`,
                        background: i === 9 ? "#62D2A2" : `rgba(98,210,162,${0.15 + i * 0.07})`
                      }} />
                    ))}
                  </div>
                  <p className="text-[#62D2A2] text-[10px] font-black mt-1.5">+34% this quarter</p>
                </div>
              </div>

            </div>
          </div>
          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-[#62D2A2]/5 blur-[60px] rounded-[2rem] -z-10" />

          {/* Mobile-only CTA - after the CRM graphic */}
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex md:hidden w-full"
          >
            <button className="w-full bg-[#62D2A2] text-white px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#F96B6B] transition-all duration-300 flex items-center justify-center gap-3">
              Book a Working Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
        </FadeSection>
      </section>

      {/* ── LOGO TICKER ─────────────────────────────────────────────────── */}
      <div className="py-10 border-y border-white/[0.06] relative overflow-hidden">
        <div
          className="relative flex overflow-hidden w-full"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div className="flex w-max shrink-0 animate-ticker">
            {[...revOpsLogos, ...revOpsLogos].map((logo, logoIndex) => (
              <div
                key={`${logo.name}-${logoIndex}`}
                className={`relative mx-10 h-[32px] md:h-[44px] opacity-60 hover:opacity-100 transition-all duration-300 flex items-center justify-center shrink-0 ${logo.className || ""}`}
                style={logo.style}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          @keyframes ticker {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-ticker {
            animation: ticker 48s linear infinite;
            will-change: transform;
          }
        `}</style>
      </div>

      {/* ── EVERYTHING CONNECTED / AUTOMATED ─────────────────────────────── */}
      <div className="relative bg-[#080808] border-b border-white/[0.06] overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />
          {/* Prominent background bubbles */}
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#62D2A2]/[0.08] blur-[120px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#62D2A2]/[0.06] blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 md:px-16 relative z-10 py-14 md:py-28">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-black text-white tracking-tighter">
              Everything <span className="text-[#62D2A2]">Connected.</span> Everything <span className="text-[#62D2A2]">Automated.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-10 text-left">
            {implementationRows.map((row, i) => (
              <FadeSection key={row.title} delay={0.06 * i}>
                <div className="group flex flex-col gap-5 p-8 md:p-10 border border-white/10 rounded-3xl bg-white/[0.02] hover:border-[#62D2A2]/30 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0 text-[#62D2A2]">
                      {row.icon}
                    </div>
                    <h3 className="text-lg md:text-2xl font-black text-white">{row.title}</h3>
                  </div>
                  <p className="font-body text-white text-base md:text-lg leading-relaxed ml-16">
                    {row.description}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* ── HOW WE RUN IT ──────────────────────────────────────────── */}
          <FadeSection delay={0.15} className="mt-28">
            <div className="border-t border-white/10 pt-16">
              <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <h2 className="text-2xl md:text-6xl font-black tracking-tighter leading-tight text-white mb-6">
                    How We <span className="text-[#F96B6B]">Run It.</span>
                  </h2>
                  <p className="text-base md:text-xl text-white font-body leading-relaxed max-w-sm">
                    Implementation that reaches the field, not just the settings page.
                  </p>
                </div>
                <div className="grid gap-5">
                  {howWeRunRows.map((row) => (
                    <div key={row.step} className="grid gap-5 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:grid-cols-[72px_minmax(0,1fr)] md:p-8">
                      <div className="font-mono text-sm font-black tracking-[0.25em] text-[#62D2A2]">
                        {row.step}
                      </div>
                      <div>
                        <h3 className="text-lg md:text-2xl font-black tracking-tight text-white">
                          {row.title}
                        </h3>
                        <p className="mt-3 font-body text-base md:text-lg leading-relaxed text-white">
                          {row.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeSection>

          {/* ── FOOTER CTA ─────────────────────────────────────────────── */}
          <FadeSection delay={0.3} className="mt-16 md:mt-32 text-center pb-12 md:pb-20 hide-floating-cta">
            <p className="text-lg md:text-xl text-white font-body mb-2">
              Your stack should be working <span className="text-[#62D2A2] font-black">harder</span> than it is.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 mt-8">
              <Link
                href="/pilot"
                className="group inline-flex items-center gap-3 bg-[#62D2A2] text-white px-12 py-5 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                See How a Pilot Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeSection>
        </div>
      </div>

    </div>
  );
}
