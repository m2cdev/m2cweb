"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Wrench, Cpu, GitBranch, Zap, ArrowRight, Database, Calendar, Target } from "lucide-react";
import { MeshGradient } from "@paper-design/shaders-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { ShimmerButton } from "@/components/ui/shimmer-button";

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

// ─── Orbital timeline data for the hero ───────────────────────────────────
const buildoutNodes = [
  {
    id: 1,
    title: "Discovery",
    date: "Phase 1",
    content: "We map your existing sales motion, identify friction points, and define the exact gaps your tools can't fill.",
    category: "Strategy",
    icon: Target,
    relatedIds: [2],
    status: "completed",
    energy: 95,
  },
  {
    id: 2,
    title: "Architecture",
    date: "Phase 2",
    content: "We design the custom solution — inside your CRM or standalone — scoped precisely to the problem.",
    category: "Design",
    icon: GitBranch,
    relatedIds: [1, 3],
    status: "completed",
    energy: 80,
  },
  {
    id: 3,
    title: "Build",
    date: "Phase 3",
    content: "We build fast. No bloat, no unnecessary complexity — purpose-built tools that fit your motion like a glove.",
    category: "Development",
    icon: Wrench,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 65,
  },
  {
    id: 4,
    title: "Integration",
    date: "Phase 4",
    content: "Deployed inside your existing stack. Reps adopt it immediately — no retraining, no replatforming.",
    category: "Deployment",
    icon: Database,
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "Optimize",
    date: "Phase 5",
    content: "Continuous iteration based on real usage data. The tool evolves with your motion.",
    category: "Iteration",
    icon: Zap,
    relatedIds: [4],
    status: "pending",
    energy: 20,
  },
];

export default function RevOpsCustomBuildoutsPage() {
  const [speed] = useState(0.8);

  return (
    <div className="w-full min-h-screen bg-black relative overflow-x-hidden">
      
      {/* ──────────────────────────────────────────────────────────────────
          BACKGROUND LAYERS — CINEMATIC WAVE
      ────────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Layer 1: Mesh Gradient (High Contrast) */}
        <MeshGradient
          className="w-full h-full absolute inset-0 opacity-40 shadow-inner"
          colors={["#000000", "#0a0a0a", "#62D2A2", "#000000"]}
          speed={speed}
          backgroundColor="#000000"
        />

        {/* Layer 2: Subtle Ambient Pulsing */}
        <div className="absolute inset-0 z-1 opacity-20">
          <div
            className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#62D2A2]/5 rounded-full blur-[160px] animate-pulse"
            style={{ animationDuration: '10s' }}
          />
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
          CONTENT OVERLAY
      ────────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full">
        
        {/* SECTION 1 — HERO */}
        <section className="min-h-screen flex flex-col md:flex-row items-center pt-12 pb-16 px-6 md:px-16 container mx-auto relative overflow-visible">
          
          {/* Left: Headline content - High Visibility Scale */}
          <div className="flex-1 flex flex-col justify-center md:pr-12 md:max-w-[55%] z-20">
            <FadeSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-[#62D2A2]" />
                <span className="text-[11px] font-black tracking-[0.4em] text-[#62D2A2] uppercase">
                  Rev Ops Custom Buildouts
                </span>
              </div>
            </FadeSection>

            <FadeSection delay={0.08}>
              <h1 className="text-5xl md:text-6xl lg:text-[6.2rem] font-black tracking-tighter leading-[0.9] mb-8 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Built for your{" "}
                <span className="text-[#62D2A2]">Motion</span>,
                <br />
                Down to the detail.
              </h1>
            </FadeSection>

            <FadeSection delay={0.16}>
              <p className="text-lg md:text-xl text-white opacity-80 leading-relaxed mb-10 max-w-lg font-medium drop-shadow-md">
                When your stack alone doesn&apos;t cut it, we build around it. Purpose-built tools that fit your sales motion like a glove.
              </p>
            </FadeSection>

            <FadeSection delay={0.22}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <a
                  href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                  target="_blank"
                  className="group relative"
                >
                  <button className="bg-[#62D2A2] text-black px-12 py-5 font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#F96B6B] hover:text-white transition-all duration-300 shadow-[0_0_50px_rgba(98,210,162,0.15)] hover:shadow-[0_0_50px_rgba(249,107,107,0.3)] transform hover:-translate-y-1 flex items-center gap-3">
                    Book a Working Session
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link
                  href="#details"
                  className="text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-3 group"
                >
                  See Our Capabilities
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </FadeSection>
          </div>

          {/* Right: Orbital Timeline - REPOSITIONED HIGHER MIDDLE RIGHT */}
          <FadeSection
            delay={0.1}
            className="flex-1 h-[600px] md:h-[900px] w-full md:w-auto -mt-16 md:-mt-40 relative z-10 flex items-center justify-center lg:translate-x-20"
          >
            <div className="w-full h-full transform scale-100 md:scale-115">
              <RadialOrbitalTimeline timelineData={buildoutNodes} />
            </div>
          </FadeSection>
        </section>

        {/* SECTION 2 — DETAILS */}
        <section id="details" className="bg-black py-40 border-t border-white/5 relative z-20">
           <div className="container mx-auto px-6 md:px-16">
              <div className="grid md:grid-cols-2 gap-32 items-start">
                <FadeSection delay={0} className="sticky top-40">
                  <span className="inline-block text-[11px] font-black tracking-[0.3em] text-[#62D2A2] uppercase mb-10">
                    The Problem
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.05] mb-12 text-white">
                    Generic tools hit limits. <span className="text-white">We solve for the exceptions.</span>
                  </h2>
                  <p className="text-white text-xl leading-relaxed font-medium max-w-lg opacity-90">
                    Every sales motion has nuances that off-the-shelf software can&apos;t handle. We engineer the bridge between your process and your performance.
                  </p>
                </FadeSection>

                <div className="flex flex-col gap-6 text-white w-full">
                  {[
                    { title: "Custom Logic", body: "Purpose-built automation that reflects how you actually sell.", icon: <Cpu className="w-6 h-6 text-[#62D2A2]" /> },
                    { title: "Silo Elimination", body: "Deep integrations that connect disparate data sources into a single source of truth.", icon: <Database className="w-6 h-6 text-[#62D2A2]" /> },
                    { title: "Rep Adoption", body: "Tools that remove friction rather than adding administrative overhead.", icon: <Zap className="w-6 h-6 text-[#62D2A2]" /> },
                  ].map((item, i) => (
                    <FadeSection key={i} delay={0.06 * i}>
                      <div className="group flex flex-col gap-4 p-8 md:p-10 border border-white/10 rounded-3xl bg-[#080808] hover:border-[#62D2A2]/30 hover:bg-[#0f0f0f] transition-all duration-500 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#62D2A2]/0 to-[#62D2A2]/0 group-hover:from-[#62D2A2]/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
                        
                        <div className="flex items-center gap-6 relative z-10">
                          <div className="w-14 h-14 rounded-2xl bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div>
                            <span className="text-[#62D2A2]/50 text-xs font-black tracking-widest uppercase block mb-1">Architecture 0{i+1}</span>
                            <h3 className="text-2xl font-black text-white group-hover:text-[#62D2A2] transition-colors">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-white text-lg font-medium mt-4 relative z-10 opacity-90 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    </FadeSection>
                  ))}
                </div>
              </div>
           </div>
        </section>

        {/* SECTION 3 — CTA */}
        <section className="bg-black py-60 text-center relative border-t border-white/5">
           <div className="max-w-5xl mx-auto px-6 relative z-10 transition-colors">
              <FadeSection delay={0}>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight mb-16 text-white">
                   Ready to <span className="text-[#62D2A2]">Scale</span> Your Motion?
                </h2>
              </FadeSection>

              <FadeSection delay={0.1}>
                <div className="flex justify-center">
                  <Link
                    href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                    target="_blank"
                  >
                    <ShimmerButton 
                      shimmerColor="#62D2A2" 
                      background="#62D2A2"
                      className="group h-16 px-16 rounded-full border-none shadow-[0_0_50px_rgba(98,210,162,0.1)] hover:bg-[#F96B6B]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black text-black uppercase tracking-widest transition-colors duration-300 group-hover:text-white">
                          Book a Working Session
                        </span>
                        <ArrowRight className="w-4 h-4 text-black transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                      </div>
                    </ShimmerButton>
                  </Link>
                </div>
              </FadeSection>
           </div>
        </section>

      </div>
    </div>
  );
}
