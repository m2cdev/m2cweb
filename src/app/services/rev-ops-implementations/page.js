"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Bot, Target, Mail, Calendar, BarChart3, Zap, CheckCircle, Layers, Shield, Wrench, Database, Cpu, GitBranch } from "lucide-react";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";

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
    description: "We configure your CRM around a process that reflects how your deals actually move — clean pipelines, meaningful stages, and workflows your reps will use.",
  },
  {
    icon: <Cpu className="w-5 h-5 text-[#62D2A2]" />,
    title: "Tech Stack Integration",
    description: "Sales tools working in silos kill efficiency. We connect and streamline your existing stack so data flows where it needs to go and nothing falls through the cracks.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#62D2A2]" />,
    title: "Workflow Automation",
    description: "We identify every manual, repetitive workflow and automate it — so your reps stay focused on selling, not admin.",
  },
  {
    icon: <GitBranch className="w-5 h-5 text-[#62D2A2]" />,
    title: "Stack Optimization",
    description: "Most teams use 20% of what their tools can do. We unlock the rest — so you get the most out of every tool you're already paying for.",
  },
];

export default function RevOpsImplementationsPage() {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">

      {/* ──────────────────────────────────────────────────────────────────
          HERO SECTION — Scroll Expansion Hero
      ────────────────────────────────────────────────────────────────── */}
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc="/images/revops_branded_dashboard.png"
        bgImageSrc="/images/revops_hubspot_analytics.png"
        title="Rev Ops Implementations"
        date="Strategic Infrastructure"
        scrollToExpand="Scroll to Expand Your Motion"
        textBlend
      >
        <div className="max-w-4xl mx-auto py-10">
          <FadeSection delay={0}>
            <span className="inline-block text-[11px] font-black tracking-[0.3em] text-[#62D2A2] uppercase mb-12">
              The Implementation Phase
            </span>
          </FadeSection>

          <FadeSection delay={0.08}>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-12">
              Your Stack Should Be{" "}
              <span className="text-[#62D2A2]">Working</span>{" "}
              <span className="text-[#F96B6B]">Harder</span>{" "}
              Than You Are.
            </h2>
          </FadeSection>

          <FadeSection delay={0.14}>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-16 font-medium">
              We configure your stack around a process built to convert — so your reps spend less time managing software and more time closing deals.
            </p>
          </FadeSection>

          {/* CRM logos / partners */}
          <FadeSection delay={0.2} className="mb-24">
             <div className="flex flex-wrap items-center gap-10 md:gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
              {["HubSpot", "Salesforce", "Apollo", "Pipedrive"].map((tool) => (
                <div key={tool} className="text-xl md:text-2xl font-black tracking-tighter text-white">
                  {tool}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <span className="px-5 py-2.5 rounded-full border border-[#62D2A2]/20 bg-[#62D2A2]/5 text-[11px] font-black text-[#62D2A2] uppercase tracking-[0.2em]">
                Certified Apollo Partners
              </span>
            </div>
          </FadeSection>

          {/* Detailed features */}
          <div className="grid md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-20">
            {implementationRows.map((row, i) => (
              <FadeSection key={row.title} delay={0.06 * i}>
                <div className="group flex flex-col gap-5 p-8 border border-white/6 rounded-2xl bg-white/[0.02] hover:border-[#62D2A2]/20 hover:bg-white/[0.04] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0 text-[#62D2A2]">
                      {row.icon}
                    </div>
                    <h3 className="text-xl font-black text-white">{row.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed ml-14">
                    {row.description}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>

          {/* Footer CTA */}
          <FadeSection delay={0.3} className="mt-32 text-center pb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/pilot"
                className="group inline-flex items-center gap-3 bg-[#62D2A2] text-black px-12 py-5 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white transition-all duration-300"
              >
                See How a Pilot Works
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                 href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                target="_blank"
                className="text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-3 border border-white/10 px-12 py-5 rounded-full"
              >
                Book a Working Session
              </Link>
            </div>
          </FadeSection>
        </div>
      </ScrollExpandMedia>

    </div>
  );
}
