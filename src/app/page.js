"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, useTransform, useScroll } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";
import { Timeline } from "@/components/ui/timeline";
import { LampContainer } from "@/components/ui/lamp";
import NumberFlow from "@number-flow/react";
import HorizontalCarousel from "@/components/ui/horizontal-scroll-carousel";
import { LogoMarquee } from "@/components/LogoMarquee";

const processData = [
  {
    title: "Map",
    content: (
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group">
        <h3 className="text-2xl font-bold mb-4 text-primary group-hover:translate-x-1 transition-transform">01. Deal Blueprinting</h3>
        <p className="text-gray-400 leading-relaxed font-body">
          We map the entire decision-making unit (DMU) and identify key stakeholders, hidden influencers, and potential blockers before they derail the deal.
        </p>
      </div>
    ),
  },
  {
    title: "Execute",
    content: (
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group">
        <h3 className="text-2xl font-bold mb-4 text-primary group-hover:translate-x-1 transition-transform">02. Strategy Synchronization</h3>
        <p className="text-gray-400 leading-relaxed font-body">
          Aligning your sales team's value proposition with the specific business outcomes each stakeholder cares about most.
        </p>
      </div>
    ),
  },
  {
    title: "Optimize",
    content: (
      <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm transition-all hover:bg-white/10 group">
        <h3 className="text-2xl font-bold mb-4 text-primary group-hover:translate-x-1 transition-transform">03. Surgical Execution</h3>
        <p className="text-gray-400 leading-relaxed font-body">
          Repeatable, high-stakes sales motions that leave nothing to chance. We implement the precision of a surgical team into your complex sales lifecycle.
        </p>
      </div>
    ),
  },
];

const caseStudiesData = [
  { id: 1, title: "Fintech Leader", subtitle: "25% Increase in Deal Velocity", url: "/fintech-leader-hero.png", category: "Fintech" },
  { id: 2, title: "Growth-Stage SaaS", subtitle: "Mapping the Mid-Market Pivot", url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", category: "SaaS" },
  { id: 3, title: "Cyberspace Security", subtitle: "Closing the $5M Defense Contract", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80", category: "Security" },
  { id: 4, title: "Logistics Giant", subtitle: "Building a Repeatable Engine", url: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80", category: "Logistics" },
];



export default function Home() {
  return (
    <div className="flex flex-col w-full bg-black">
      {/* Premium Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <FluidParticlesBackground 
          particleCount={1500}
          noiseIntensity={0.002}
          particleSize={{ min: 0.5, max: 1.5 }}
          className="absolute inset-0 z-0 opacity-80"
        >
          <div className="relative z-20 w-full max-w-5xl px-6 text-center">
<h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter mb-8 leading-[0.9]">
              <TextShimmer duration={2.5} className="[--base-color:white] [--base-gradient-color:#62D2A2]">
                <span className="text-primary italic">Map</span> Your Key Accounts.
              </TextShimmer>
              <br />
              <span className="opacity-90 leading-tight">
                <span className="text-[#F96B6B] italic">Close</span> More Deals.
              </span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed font-body"
            >
              Complexity is the enemy of deals. We provide the <span className="text-white font-bold">blueprint</span> for strategic sales teams to win high-stakes accounts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center"
            >
              <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
                <ShimmerButton 
                  shimmerColor="#62D2A2" 
                  background="#000" 
                  className="h-16 px-12 rounded-2xl shadow-[0_0_40px_rgba(98,210,162,0.2)]"
                >
                  <span className="text-xl font-bold text-white tracking-tight">Book a Working Session</span>
                </ShimmerButton>
              </a>
            </motion.div>
          </div>
        </FluidParticlesBackground>
      </section>

      {/* Trust Section - Logo Marquee */}
      <LogoMarquee />

      {/* Problem Section - Enhanced Text Reveal */}
      <TextReveal 
        children="High-stakes sales isn't about working harder. It's about mapping the path through the noise." 
        greenWords={["mapping", "path"]}
        redWords={["noise"]}
      />

      {/* Process Section - Timeline */}
      <section className="relative z-10 bg-black py-40">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto mb-20 text-center">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tighter">How Our Process Works</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              A surgical, multi-phase approach to high-stakes sales motions.
            </p>
          </div>
          <Timeline data={processData} />
        </div>
      </section>

      {/* Case Studies Section - Natural Horizontal Scroll */}
      <HorizontalCarousel cards={caseStudiesData} />

      {/* Final CTA - Lamp Effect */}
      <section className="relative bg-black h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <LampContainer>
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter text-white">
              Ready to solve your <br /> <span className="text-primary italic">sales complexity?</span>
            </h2>
            <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
              <ShimmerButton className="h-16 px-12 rounded-2xl" shimmerColor="#62D2A2">
                <span className="text-xl font-black uppercase tracking-widest text-white">Book a Working Session</span>
              </ShimmerButton>
            </Link>
            <p className="mt-8 text-gray-500 font-bold tracking-[0.3em] uppercase text-xs">Map. Execute. Optimize. Close.</p>
          </motion.div>
        </LampContainer>
      </section>
    </div>
  );
}
