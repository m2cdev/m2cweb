"use client";

import React from "react";
import Link from "next/link";
import { FluidParticlesBackground } from "@/components/ui/fluid-particles-background";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/text-reveal";
import { LampContainer } from "@/components/ui/lamp";
import HorizontalCarousel from "@/components/ui/horizontal-scroll-carousel";
import { LogoMarquee } from "@/components/LogoMarquee";
import TopographicMap from "@/components/sections/TopographicMap";


const caseStudiesData = [
  { id: "pinecone", title: "Pinecone", subtitle: "Sales Enablement Hub", url: "/images/case-studies/pinecone.png", category: "Sales Enablement" },
  { id: "signpost", title: "SignPost", subtitle: "Signal Intelligence Engine", url: "/images/case-studies/signpost.png", category: "Signal Intelligence" },
  { id: "zenatech", title: "ZenaTech", subtitle: "Multi-Unit Revenue System", url: "/images/case-studies/zenatech.png", category: "Revenue Systems" },
  { id: "qwilr", title: "Qwilr", subtitle: "Trial-to-Close Engine", url: "/images/case-studies/qwilr.png", category: "Trial Optimization" },
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
          <div className="relative z-20 w-full max-w-6xl px-6 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[5rem] font-black text-white tracking-[-0.01em] mb-8 leading-[0.95]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                We Help Sales Teams<br className="hidden md:block" />
                Bring <span className="text-primary italic">More Deals</span> In<br className="hidden md:block" />
                And <span className="text-coral italic">Close Them Faster</span>
              </motion.div>
            </h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center mt-14"
            >
              <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
                <ShimmerButton 
                  shimmerColor="#62D2A2" 
                  background="#000" 
                  className="h-16 px-12 rounded-2xl shadow-[0_0_40px_rgba(98,210,162,0.2)]"
                >
                  <span className="text-xl font-bold text-white tracking-tight">Find out how</span>
                </ShimmerButton>
              </a>
            </motion.div>
          </div>
        </FluidParticlesBackground>
      </section>

      {/* Problem Section — words animate in on entry, full sentence visible before 3D section */}
      <TextReveal
        children="Map2Close embeds directly into your sales team to audit your pipeline, fix your process, and train your reps so every lead that comes in has a real path to close."
        greenWords={["Map2Close", "audit", "fix", "train", "close"]}
        redWords={["pipeline", "process"]}
      />

      {/* Trust Section - Logo Marquee */}
      <LogoMarquee />

      <TopographicMap />

      {/* Case Studies Section - Natural Horizontal Scroll */}
      <HorizontalCarousel cards={caseStudiesData} />

      {/* Final CTA - Lamp Effect */}
      <section className="relative bg-black h-screen w-full flex flex-col items-center justify-center overflow-hidden hide-floating-cta">
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
              One conversation. <br /> <span className="text-primary italic">No commitment.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white opacity-80 mb-8 font-body">Stop guessing. Start closing.</p>
            <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
              <ShimmerButton className="h-16 px-12 rounded-2xl" shimmerColor="#62D2A2">
                <span className="text-xl font-black uppercase tracking-widest text-white">Book a Working Session</span>
              </ShimmerButton>
            </Link>
            <p className="mt-8 text-white opacity-80 font-bold tracking-[0.3em] uppercase text-xs">Map. Execute. Optimize. Close.</p>
          </motion.div>
        </LampContainer>
      </section>
    </div>
  );
}
