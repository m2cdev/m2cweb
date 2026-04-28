"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Wrench, Cpu, GitBranch, Zap, ArrowRight, Database, Calendar, Target, Layout, Search } from "lucide-react";
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
    content: "We design the custom solution, inside your CRM or standalone, scoped precisely to the problem.",
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
    content: "We build fast. No bloat, no unnecessary complexity, purpose-built tools that fit your motion like a glove.",
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
    content: "Deployed inside your existing stack. Reps adopt it immediately, no retraining, no replatforming.",
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

const actionExamples = [
  { 
    title: "Sales Enablement Hub", 
    body: "A centralized hub where reps access live sales assets, battlecards, and deal kits, filtered by deal stage, persona, or use case. Everything in one place, built for how reps actually sell.", 
    icon: <Layout className="w-9 h-9 text-[#62D2A2]" />,
    href: "/case-studies/pinecone",
  },
  { 
    title: "Signal Intelligence Engine", 
    body: "Signal engines that surface ICP-specific buying signals, funding rounds, leadership changes, and intent activity directly inside workflows so reps engage at the right moment.", 
    icon: <Search className="w-9 h-9 text-[#62D2A2]" />,
    href: "/case-studies/signpost",
  },
  { 
    title: "Custom CRM Automations", 
    body: "Automation workflows that qualify, score, and sync data across your stack automatically, so your team spends more time selling and less time on manual entry.", 
    icon: <Zap className="w-9 h-9 text-[#62D2A2]" />,
    href: "/case-studies/zenatech",
  },
];

export default function RevOpsCustomBuildoutsPage() {
  const [speed] = useState(0.8);

  return (
    <div className="w-full min-h-screen bg-black relative overflow-x-hidden selection:bg-primary/30">
      
      {/* ──────────────────────────────────────────────────────────────────
          BACKGROUND LAYERS - CINEMATIC WAVE
      ────────────────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        
        {/* Layer 1: Mesh Gradient (High Contrast) */}
        <MeshGradient
          className="w-full h-full absolute inset-0 opacity-40 shadow-inner"
          colors={["#000000", "#0a0a0a", "#62D2A2", "#000000"]}
          speed={speed}
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
        
        {/* SECTION 1 - HERO */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row items-center gap-8 md:gap-10 lg:gap-14 pt-20 pb-8 px-6 md:px-16 container mx-auto relative overflow-hidden">
          
          {/* Left: Headline content */}
          <div className="flex-1 w-full flex flex-col justify-center md:pr-6 lg:pr-10 md:max-w-[52%] z-20">
            <FadeSection delay={0}>
              <div className="flex items-center gap-3 mb-6">
                
                <span className="text-[11px] font-black tracking-[0.4em] text-[#62D2A2] uppercase">
                  Custom Buildouts
                </span>
              </div>
            </FadeSection>

            <FadeSection delay={0.08}>
              <h1 className="text-5xl md:text-6xl lg:text-[5.2rem] font-black tracking-tight leading-[0.95] mb-8 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                Built for Your <span className="text-[#62D2A2]">Motion</span>,
                <br />
                Down to the Detail.
              </h1>
            </FadeSection>

            <FadeSection delay={0.16}>
              <p className="max-w-2xl text-lg md:text-xl text-white leading-[1.72] mb-10 font-body drop-shadow-md">
                When your stack alone does not cut it, we build around it. Purpose-built systems remove bottlenecks and give your reps exactly what they need to move deals forward.
              </p>
            </FadeSection>

            <FadeSection delay={0.22}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <a
                  href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                  target="_blank"
                  className="group relative"
                >
                  <button className="bg-[#62D2A2] text-white px-12 py-5 font-black text-sm uppercase tracking-widest rounded-full hover:bg-[#F96B6B] hover:text-white transition-all duration-300 shadow-[0_0_50px_rgba(98,210,162,0.15)] hover:shadow-[0_0_50px_rgba(249,107,107,0.3)] transform hover:-translate-y-1 flex items-center gap-3">
                    Book a Working Session
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </a>
                <Link
                  href="#details"
                  className="text-white/60 hover:text-white transition-colors text-sm font-black uppercase tracking-widest flex items-center gap-3 group"
                >
                  See Our Capabilities
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </FadeSection>
          </div>

          {/* Right: Orbital Timeline */}
          <FadeSection
            delay={0.1}
            className="flex-1 min-w-0 h-[380px] sm:h-[460px] md:h-[540px] lg:h-[580px] w-full max-w-[560px] md:max-w-none mt-2 md:mt-0 relative z-10 flex items-center justify-center mx-auto overflow-hidden"
          >
            <div className="w-full h-full">
              <RadialOrbitalTimeline timelineData={buildoutNodes} />
            </div>
          </FadeSection>
        </section>

        {/* SECTION 2 - DETAILS (Horizontal Boxes Below Text) */}
        <section id="details" className="bg-black pt-12 pb-28 border-t border-white/5 relative z-20 overflow-hidden">
          {/* Grid background */}
          <div className="absolute inset-0 pointer-events-none z-0 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#62D2A2]/[0.10] blur-[120px]" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#62D2A2]/[0.08] blur-[100px]" />
          </div>

           <div className="container mx-auto px-6 md:px-16 relative z-10">
              {/* Problem Section */}
              <div className="max-w-[1000px] mb-32 pt-8">
                <FadeSection delay={0}>
                  <div className="flex items-center gap-4 mb-10">
                    <span className="text-[11px] font-black tracking-[0.3em] text-[#62D2A2] uppercase">
                      The Approach
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-[#62D2A2]/40 to-transparent" />
                  </div>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[1] mb-12 text-white">
                    Every Build Starts With A <span className="text-[#62D2A2]">Problem</span>
                  </h2>
                  <div className="space-y-10">
                    <p className="text-2xl md:text-3xl lg:text-4xl text-white leading-[1.25] font-body tracking-tight opacity-100">
                      We identify the bottleneck, design the solution around your existing stack, and build a tool that lives inside your CRM or as a standalone, wherever it works best.
                    </p>
                    <div>
                      <div className="mb-6 h-px w-28 bg-gradient-to-r from-[#62D2A2]/70 to-transparent" />
                      <p className="text-white text-lg md:text-xl leading-relaxed font-body max-w-3xl">
                        No bloat. No unnecessary complexity. Just a purpose-built tool that solves the exact problem standing between your team and more revenue.
                      </p>
                    </div>
                  </div>
                </FadeSection>
              </div>

              {/* What This Looks Like in Action Section */}
              <div className="mb-20">
                <FadeSection delay={0.1}>
                  <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
                    What This Looks Like in Action
                  </h2>
                  <p className="text-[#62D2A2] text-sm md:text-base font-black uppercase tracking-[0.4em]">
                    Systems we build inside real revenue motions
                  </p>
                </FadeSection>
              </div>

              {/* Horizontal Boxes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-white w-full">
                {actionExamples.map((item, i) => (
                  <FadeSection key={i} delay={0.1 * i}>
                    <Link
                      href={item.href}
                      className="group flex flex-col gap-8 p-12 border border-white/10 rounded-[3rem] bg-[#050505] hover:border-[#62D2A2]/40 hover:bg-[#080808] transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden h-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#62D2A2]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#62D2A2]/0 to-[#62D2A2]/0 group-hover:from-[#62D2A2]/5 group-hover:to-transparent transition-colors duration-500 pointer-events-none" />
                      <div className="absolute right-8 top-8 h-9 w-9 rounded-full border border-[#62D2A2]/30 text-[#62D2A2] flex items-center justify-center transition-all duration-300 group-hover:bg-[#62D2A2] group-hover:text-black group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                      
                      <div className="flex flex-col gap-8 relative z-10">
                        <div className="w-20 h-20 rounded-2xl bg-[#62D2A2]/10 border border-[#62D2A2]/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(98,210,162,0.1)]">
                          {item.icon}
                        </div>
                        <h3 className="text-3xl md:text-3.5xl font-black text-white group-hover:text-[#62D2A2] transition-colors leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-white/80 text-lg md:text-xl font-body relative z-10 leading-relaxed">
                        {item.body}
                      </p>
                    </Link>
                  </FadeSection>
                ))}
              </div>
           </div>
        </section>

        {/* SECTION 3 - CTA */}
        <section className="bg-black pt-24 pb-12 text-center relative border-t border-white/5 overflow-hidden hide-floating-cta">
           {/* Brand Gradients */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_rgba(98,210,162,0.12)_0%,_transparent_60%)] pointer-events-none" />
           
           <div className="max-w-5xl mx-auto px-6 relative z-10 transition-colors flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-12 text-white text-center">
                Have a <span className="text-[#F96B6B]">Bottleneck</span> We Haven&apos;t Seen Before?
              </h2>

              <div className="flex justify-center">
                <Link
                  href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                  target="_blank"
                >
                  <ShimmerButton
                    shimmerColor="#62D2A2"
                    background="#111"
                    className="group h-16 px-16 rounded-full border-none shadow-[0_0_50px_rgba(98,210,162,0.1)] hover:shadow-[0_0_50px_rgba(249,107,107,0.3)] transition-all duration-500"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black text-white uppercase tracking-widest transition-colors duration-300">
                        Let&apos;s Build Around It
                      </span>
                      <ArrowRight className="w-4 h-4 text-white transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                  </ShimmerButton>
                </Link>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
