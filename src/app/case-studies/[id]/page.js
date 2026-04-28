"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Play, ArrowRight } from "lucide-react";
import { Waves } from "@/components/ui/wave-background";

const caseStudies = {
  pinecone: {
    title: "Pinecone",
    category: "Sales Enablement",
    label: "Sales Enablement Hub",
    color: "#62D2A2",
    thumbnail: "/images/case-studies/pinecone-loom.png",
    loomId: "8815fd477dcd444799521d13995e8442",
    resultTitle: "Projected ROI and Impact",
    problem: [
      "Pinecone is the gold standard for vector database infrastructure, a technical, high-stakes product sold into engineering-heavy organizations building on top of AI.",
      "The problem wasn't the product. It wasn't the reps. It was that the right content never made it into the right conversation at the right time. Assets existed: battlecards, one-pagers, objection guides. But they were scattered, outdated, and impossible to surface quickly during an active deal.",
      "Against competitors like MongoDB, AWS, and Milvus, showing up underprepared isn't just inefficient. It's expensive.",
    ],
    build: [
      "We built a centralized Sales Enablement Hub: a live content repository where reps could filter assets by deal stage, buyer persona, and use case in real time. Battlecards organized by competitors. Technical one-pagers tailored to ML engineers versus business stakeholders. Objection handling built around Pinecone's most common friction points.",
    ],
    impact: "Reps stopped hunting and started selling. Faster prep, sharper messaging, and consistent execution across every deal.",
    outcomes: [
      "Faster access to the right content at the right moment",
      "Improved rep consistency across every deal stage",
      "Sharper competitive messaging against MongoDB, AWS, and Milvus",
    ],
  },
  signpost: {
    title: "Signpost",
    category: "Signal Intelligence",
    label: "Signal Intelligence Engine",
    color: "#F96B6B",
    thumbnail: "/images/case-studies/signpost-loom.png",
    loomId: "7694a0c1e94d44cc875b8f75e7b4d0e7",
    resultTitle: "Projected ROI and Impact",
    problem: [
      "Signpost helps home-services businesses (plumbers, HVAC companies, roofers, and electricians) handle inbound communication so they never miss a lead. Strong product. Real market need.",
      "The problem was timing. Reps were cold calling blind. No way to know which businesses were actively dropping calls, struggling with front-desk chaos, or growing fast enough to feel the pain. Outreach was inconsistent, research was manual, and too many dials were wasted on the wrong accounts at the wrong moment.",
      "Customer pain was hiding in plain sight, in their own reviews. But there was no reliable way to surface it at scale.",
    ],
    build: [
      "We built a custom Signal Intelligence Engine that scraped and analyzed public review data across tens of thousands of home-services businesses nationwide. The engine scanned for communication failure signals (missed calls, slow response complaints, front-desk issues) and scored every account across four dimensions: Fit, Demand, Comms Pain, and Growth.",
      "High-scoring accounts were automatically enriched, de-duplicated, and pushed directly into Signpost's HubSpot, each one tagged with a short rep-facing brief explaining exactly why they were surfaced and what angle to lead with on the call.",
      "Reps went from spending 10–20 minutes researching each account to zero. The engine did it for them.",
    ],
    impact: "Reps stopped guessing and started calling with context. Outreach was grounded in real, documented customer pain, giving reps a credible, specific opening on every cold call instead of a generic pitch.",
    outcomes: [
      "1,500–6,000 ICP-fit leads generated per month",
      "+10–25% improvement in DM connect rate",
      "+15–30% increase in demo set rate",
      "Research time per account reduced to zero",
    ],
  },
  zenatech: {
    title: "ZenaTech",
    category: "Revenue Systems",
    label: "Multi-Unit Revenue System",
    color: "#62D2A2",
    thumbnail: "/images/case-studies/zenatech-loom.png",
    loomId: "17f37feb765d47a3b900d354eb73599f",
    resultTitle: "The Multi-Unit Revenue System",
    problem: [
      "ZenaTech isn't a single company. It's a fast-growing holding company operating across multiple business units: SaaS platforms, Drones-as-a-Service, land surveying acquisitions, and defense technology. Each unit had its own reps, its own motion, and its own definition of a qualified deal.",
      "The problem: none of it was connected. Sales knowledge was scattered, outbound was inconsistent, reps across different business units were operating without a unified system, and leadership had no reliable way to track what was working. Scaling was impossible without a foundation to scale on.",
    ],
    build: [
      "We came in and built the entire revenue operating system from the ground up.",
      "On the systems side, we architected a full HubSpot and Apollo implementation designed specifically around ZenaTech's multi-unit structure, separating SaaS and DaaS motions, building business-unit-level pipelines, and deploying 37 automated workflows that eliminated manual routing and ensured data flowed cleanly between Apollo and HubSpot at scale. No rep was guessing which pipeline to use. The system made that decision for them.",
      "On the enablement side, we ran weekly group sessions and 1-1 coaching across 6 to 8 lead generation reps spanning multiple business units and geographies, building outbound playbooks, messaging frameworks, and qualification scorecards tailored to each unit's ICP.",
      "We also built and deployed a Signal Intelligence Engine to identify buying triggers and surface the right accounts at the right time.",
    ],
    impact: "A complex, multi-unit sales organization went from operating in silos to running on one clean, scalable system. Reps executing consistently, leadership reporting accurately, and outbound running with real structure for the first time.",
    outcomes: [
      "Full HubSpot + Apollo implementation across multiple business units",
      "37 automated workflows deployed, zero manual routing",
      "70+ qualified meetings guaranteed within 90 days",
      "Unified outbound playbooks and rep coaching across 12+ reps",
      "Clean pipeline structure across all business units",
    ],
  },
  qwilr: {
    title: "Qwilr",
    category: "Trial Optimization",
    label: "Trial-to-Close Engine",
    color: "#62D2A2",
    thumbnail: "/images/case-studies/qwilr-loom.png",
    loomId: "09630646d94f4811a4186f9e879e4b7c",
    resultTitle: "Projected ROI and Impact",
    problem: [
      "Qwilr is a proposal and document platform that helps B2B sales teams replace static PDFs with interactive, trackable proposals. The product sells itself in the demo. Intuitive, visual, and easy to show value fast.",
      "The problem wasn't top of funnel. It wasn't demo quality. It was what happened after.",
      "Deals would slow down the moment they left the demo stage. Buyers would go internal to make decisions, reps would lose visibility and control, and momentum would quietly die. No clear structure for follow-up. No way to know if a deal was drifting until it was already gone. Mid-funnel was breaking and nobody could see it happening in real time.",
    ],
    build: [
      "We designed and implemented a Trial-to-Close Engine: a structured system that turned Qwilr's open-ended trial period into a guided, high-accountability decision experience.",
      "At the rep level, we built a guided trial playbook with two intentional, value-dense touchpoints, a give/get incentive structure to keep buyers engaged, and custom talk tracks for every objection that typically surfaces post-demo. Reps went from improvising follow-ups to running a repeatable, structured motion on every deal.",
      "At the system level, we built a Deal Accelerator Engine. Not just a tracking layer. The engine monitored every active trial, identified deals stalling beyond threshold points, mapped the right stakeholders to loop in, and surfaced clear, actionable next steps for reps to move each deal forward. Visibility and accountability baked into one system, so nothing drifted silently and no rep was ever left guessing what to do next.",
      "On top of the system, we ran live rep coaching throughout, shadowing deals, iterating on messaging in real time, and driving adoption of the new motion until it stuck.",
    ],
    impact: "Deals that used to drift post-demo now had structure, ownership, and momentum. Reps knew exactly what to do and when. Leadership could finally see where deals were moving and where they weren't.",
    outcomes: [
      "Reduced post-demo ghosting and deal drift",
      "Faster trial-to-close conversion",
      "Full rep adoption of a structured guided trial motion",
      "Real-time leadership visibility across every active trial",
    ],
  },
};

const nextStudyMap = {
  pinecone: ["signpost", "zenatech", "qwilr"],
  signpost: ["pinecone", "zenatech", "qwilr"],
  zenatech: ["pinecone", "signpost", "qwilr"],
  qwilr: ["pinecone", "signpost", "zenatech"],
};

function LoomEmbed({ loomId, thumbnail }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
      {!isPlaying ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer group/overlay"
          onClick={() => setIsPlaying(true)}
        >
          {thumbnail && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/overlay:opacity-90 group-hover/overlay:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl group-hover/overlay:scale-110 group-hover/overlay:bg-[#62D2A2] group-hover/overlay:text-black transition-all duration-300">
              <Play fill="currentColor" size={28} />
            </div>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.3em] text-white group-hover/overlay:text-[#62D2A2] transition-colors">
              Watch Walkthrough
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true&autoplay=1`}
          style={{ border: 0 }}
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}

export default function CaseStudyPage() {
  const { id } = useParams();
  const study = caseStudies[id];

  if (!study) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Study not found.
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-white/[0.06]">
        {/* Green waves background on right */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_10%_50%,rgba(98,210,162,0.06)_0%,transparent_70%)]" />
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-30">
            <Waves strokeColor="#62D2A2" backgroundColor="transparent" className="w-full h-full" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-6 md:px-16 relative z-10 grid md:grid-cols-2 gap-16 items-center py-32 pt-40">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[11px] font-black tracking-[0.4em] text-[#62D2A2] uppercase mb-4">
              {study.category}
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-4">
              {study.title}
            </h1>
            <p className="text-[#62D2A2] font-black uppercase tracking-widest text-sm mb-8">
              {study.label}
            </p>
            <p className="text-xl text-white font-body leading-relaxed max-w-lg mb-10">
              {study.problem[0]}
            </p>
            <a href="#case-study">
              <button className="bg-[#62D2A2] text-white px-10 py-4 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-3">
                Read the Case Study
                <ArrowRight className="w-4 h-4" />
              </button>
            </a>
          </motion.div>

          {/* Right: Loom video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <LoomEmbed loomId={study.loomId} thumbnail={study.thumbnail} />
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────────────────────────── */}
      <article id="case-study" className="relative">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 py-24 space-y-24">

          {/* THE PROBLEM */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-sm font-black tracking-[0.35em] text-[#62D2A2] uppercase">The Problem</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#62D2A2]/40 to-transparent" />
            </div>
            <div className="space-y-6">
              {study.problem.map((para, i) => (
                <p key={i} className={`font-body leading-relaxed ${i === 0 ? "text-2xl md:text-3xl text-white font-semibold" : "text-xl md:text-2xl text-white"}`}>
                  {para}
                </p>
              ))}
            </div>
          </motion.section>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* THE BUILD */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-sm font-black tracking-[0.35em] text-[#62D2A2] uppercase">The Build</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#62D2A2]/40 to-transparent" />
            </div>
            <div className="space-y-6">
              {study.build.map((para, i) => (
                <p key={i} className={`font-body leading-relaxed ${i === 0 ? "text-2xl md:text-3xl text-white font-semibold" : "text-xl md:text-2xl text-white"}`}>
                  {para}
                </p>
              ))}
            </div>
          </motion.section>

          {/* WALKTHROUGH */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-black tracking-[0.35em] text-[#62D2A2] uppercase">Walkthrough</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#62D2A2]/40 to-transparent" />
            </div>
            <div className="max-w-3xl mx-auto">
              <LoomEmbed loomId={study.loomId} thumbnail={study.thumbnail} />
            </div>
          </motion.div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* RESULT / ROI */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className="text-sm font-black tracking-[0.35em] text-[#62D2A2] uppercase">{study.resultTitle}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-[#62D2A2]/40 to-transparent" />
            </div>
            <p className="text-2xl md:text-3xl text-white font-body leading-relaxed mb-12">
              {study.impact}
            </p>
            <div className="border border-white/[0.08] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
                <p className="text-[11px] font-black tracking-[0.3em] text-[#62D2A2] uppercase">Key Outcomes</p>
              </div>
              <div className="divide-y divide-white/[0.06]">
                {study.outcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-5">
                    <CheckCircle className="w-5 h-5 text-[#62D2A2] shrink-0 mt-0.5" />
                    <p className="text-white font-body text-lg md:text-xl">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 border-t border-white/[0.06] hide-floating-cta"
          >
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10">
              Let&apos;s Build Your <span className="text-[#62D2A2]">Motion.</span>
            </h3>
            <a
              href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="bg-[#62D2A2] text-white px-12 py-5 font-black text-sm uppercase tracking-widest rounded-full hover:bg-white hover:text-black transition-all duration-300">
                Book a Working Session
              </button>
            </a>
          </motion.div>

        </div>
      </article>

      {/* ── NEXT UP ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white/[0.02] border-t border-white/[0.06]">
        <div className="container mx-auto px-6 md:px-16">
          <p className="text-[11px] font-black tracking-[0.35em] text-[#62D2A2] uppercase mb-12">Next Up</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {nextStudyMap[id]?.map((key) => {
              const next = caseStudies[key];
              return (
                <Link key={key} href={`/case-studies/${key}`} className="group relative rounded-2xl overflow-hidden border border-white/10 aspect-video hover:border-[#62D2A2]/30 transition-all duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={next.thumbnail}
                    alt={next.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-[10px] font-black tracking-[0.3em] text-[#62D2A2] uppercase mb-2">{next.category}</p>
                    <h4 className="text-xl md:text-2xl font-black text-white group-hover:text-[#62D2A2] transition-colors">{next.title}</h4>
                    <p className="text-white text-sm mt-1">{next.label}</p>
                  </div>
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#62D2A2] group-hover:border-[#62D2A2] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-black transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
