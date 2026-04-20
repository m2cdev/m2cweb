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
            <p className="text-white opacity-80 text-lg md:text-xl leading-relaxed mb-16 font-medium">
              We configure your stack around a process built to convert — so your reps spend less time managing software and more time closing deals.
            </p>
          </FadeSection>
        </div> {/* Close container for full width ticker */}

        {/* Scrolling Logo Ticker */}
        <FadeSection delay={0.2} className="mb-24 mt-10 w-full relative">
          <div 
            className="relative flex overflow-hidden w-full"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'
            }}
          >
            <div className="flex w-fit shrink-0 animate-ticker">
              {[...Array(4)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-[80px] pr-[80px] items-center shrink-0">
                  {[
                    { name: "HubSpot", src: "https://api.iconify.design/logos/hubspot.svg" },
                    { name: "Salesforce", src: "https://api.iconify.design/logos/salesforce.svg" },
                    { name: "Airtable", src: "https://api.iconify.design/logos/airtable.svg" },
                    { name: "Pipedrive", src: "https://api.iconify.design/logos/pipedrive.svg" },
                    { name: "Zoom", src: "https://api.iconify.design/logos/zoom-icon.svg" },
                    { name: "LinkedIn", src: "https://api.iconify.design/logos/linkedin-icon.svg" },
                    { name: "Slack", src: "https://api.iconify.design/logos/slack-icon.svg" },
                    { name: "Gmail", src: "https://api.iconify.design/logos/google-gmail.svg" },
                    { name: "Zapier", src: "https://api.iconify.design/logos/zapier-icon.svg" },
                    { name: "Notion", src: "https://api.iconify.design/logos/notion-icon.svg?color=white" }
                  ].map((logo) => (
                    <div key={logo.name} className="relative h-[36px] md:h-[48px] opacity-90 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={`${logo.name} logo`}
                        className="h-full w-auto object-contain"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <style jsx>{`
            @keyframes ticker {
              0% { transform: translateX(0); }
              100% { transform: translateX(-25%); }
            }
            .animate-ticker {
              animation: ticker 30s linear infinite;
            }
          `}</style>
        </FadeSection>

        {/* Re-open container */}
        <div className="container mx-auto px-6 md:px-16 relative z-10">
          {/* Detailed features */}
          <div className="grid md:grid-cols-2 gap-12 text-left border-t border-white/5 pt-20">
            {implementationRows.map((row, i) => (
              <FadeSection key={row.title} delay={0.06 * i}>
                <div className="group flex flex-col gap-5 p-8 md:p-10 border border-white/10 rounded-3xl bg-white/[0.02] hover:border-[#62D2A2]/30 hover:bg-white/[0.05] transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0 text-[#62D2A2]">
                      {row.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white">{row.title}</h3>
                  </div>
                  <p className="text-white text-base md:text-lg leading-relaxed ml-16 opacity-90">
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
