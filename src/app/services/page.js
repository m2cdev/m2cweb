"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pipeline3D from "@/components/sections/Pipeline3D";
import ServiceJunction from "@/components/sections/ServiceJunction";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { GLSLHills } from "@/components/ui/glsl-hills";



const servicesData = [
  {
    id: "enablement",
    tag: "ENABLEMENT",
    title: "Sales Enablement",
    subtitle: "In the trenches, not on a slide deck.",
    description: "We embed inside your sales motion and work directly with your reps to fix performance gaps where they happen: on real calls & inside active deals.",
    link: "/services/sales-enablement",
    linkText: "How we Dive Deeper",
    extrasType: "pills",
    extrasData: [
      "Live Deal Coaching", "Cold Call Labs", "1-1 Coaching", "Group Training", "Enablement Assets"
    ]
  },
  {
    id: "rev-ops",
    tag: "IMPLEMENTATIONS",
    title: "Implementations",
    subtitle: "Your Stack Should Be Working Harder Than You Are.",
    description: "Most teams are sitting on powerful tools they're barely using. We configure your entire stack around a process built to convert, so your reps spend less time managing software and more time closing deals.",
    link: "/services/implementations",
    linkText: "See How We Implement",
    extrasType: "icons",
    extrasData: [
      { label: "CRM Setup & Optimization" },
      { label: "Tech Stack Integration" },
      { label: "Workflow Automation" },
      { label: "Process & Pipeline Design" },
    ],
    toolLogos: ["HubSpot", "Salesforce", "Apollo", "Pipedrive", "and more"]
  },
  {
    id: "custom-builds",
    tag: "CUSTOM BUILDS",
    title: "Custom Buildouts",
    subtitle: "Custom tools tailored to your motion's bottlenecks.",
    description: "When your stack alone doesn't cut it, we build around it. Custom tools designed from the ground up to eliminate bottlenecks and give your reps exactly what they need to move deals forward.",
    link: "/services/custom-buildouts",
    linkText: "See how this works",
    extrasLabel: "Successful Builds",
    extrasType: "cards",
    extrasData: [
      { title: "Sales Enablement Hub", text: "Centralized assets filtered by deal stage and persona", href: "/case-studies/pinecone" },
      { title: "Signal Intelligence Engine", text: "ICP-specific buying signals pushed into workflows", href: "/case-studies/signpost" },
      { title: "Lead Routing Engines", text: "Qualify, score, and assign leads automatically", href: "/case-studies/zenatech" },
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Force GSAP to recalculate all pin spacings after the DOM has fully painted
    // This fixes the issue where mapped children create triggers out-of-order or before height is stable
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white selection:bg-primary/30 min-h-[800vh] relative overflow-x-hidden">
      {/* Page-wide ambient glow layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(98,210,162,0.06)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_60%_50%_at_80%_90%,rgba(249,107,107,0.05)_0%,transparent_60%)]" />
      </div>
      {/* 1. Hero Section */}
      <section className="h-screen w-full flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <GLSLHills />
        </div>
        {/* Ambient glow overlays */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#62D2A2]/8 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#F96B6B]/6 blur-[100px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl z-10 pointer-events-none"
        >
          <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-6">
            What We <span className="text-primary">Build</span>
          </h1>
          <p className="text-xl md:text-2xl text-white font-body leading-relaxed max-w-2xl mx-auto">
            High-quality revenue systems designed to scale from lead to close.
          </p>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary/50 z-10"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      {/* Traveling Pulse Element */}
      <motion.div 
        className="fixed left-1/2 -translate-x-1/2 w-4 h-full pointer-events-none z-10 hidden md:block" // Hidden on mobile structurally
      >
        <motion.div 
          style={{ 
            top: useTransform(smoothProgress, [0, 1], ["0%", "100%"])
          }} 
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_6px_rgba(98,210,162,0.6)]"
        />
      </motion.div>

      {/* 2. High-Fidelity 3D Background */}
      <Pipeline3D scrollProgress={smoothProgress} />

      {/* 3. Service Junctions */}
      <div className="relative z-10">
        {servicesData.map((service, i) => (
          <ServiceJunction 
            key={service.id} 
            index={i} 
            {...service} 
          />
        ))}
      </div>

      {/* 4. Final CTA Block */}
      <section className="relative z-20 bg-black pt-32 pb-32 md:pb-[120px] px-6 border-t border-white/5 hide-floating-cta">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6">
            Close More, Close <span className="text-[#F96B6B]">Faster.</span>
          </h2>
          <p className="text-lg md:text-xl text-white font-body leading-relaxed mb-12">
            Most sales motions are just &ldquo;motions.&rdquo; We&apos;ll help you actually get somewhere.
          </p>
          
          <div className="flex flex-col items-center justify-center gap-8">
            <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
              <ShimmerButton shimmerColor="#62D2A2" background="#050505" className="h-14 px-8 rounded-full">
                <span className="text-sm font-black text-white uppercase tracking-widest">Book a Working Session</span>
              </ShimmerButton>
            </Link>
            
          </div>
        </div>
      </section>
    </div>
  );
}
