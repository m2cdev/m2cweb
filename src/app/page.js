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
  { id: "pinecone", title: "Pinecone", subtitle: "Sales Enablement Hub", url: "/images/pinecone-homepage.png", category: "Sales Enablement" },
  { id: "signpost", title: "SignPost", subtitle: "Signal Intelligence Engine", url: "/images/signpost-homepage.png", category: "Signal Intelligence" },
  { id: "zenatech", title: "ZenaTech", subtitle: "Custom CRM Automations", url: "/images/zenatech-homepage.png", category: "Revenue Systems" },
  { id: "qwilr", title: "Qwilr", subtitle: "Trial-to-Close Engine", url: "/images/qwilr-homepage.png", category: "Trial Optimization" },
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
            <h1 className="text-3xl md:text-5xl lg:text-[5rem] font-black text-white tracking-[-0.01em] mb-6 md:mb-8 leading-[0.95]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                We Help Sales Teams{" "}<br className="hidden md:block" />
                Bring More <span className="text-primary ">Deals</span> In{" "}<br className="hidden md:block" />
                And <span className="text-white">Close Faster</span>
              </motion.div>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex justify-center mt-8 md:mt-14"
            >
              <Link href="/contact">
                <ShimmerButton
                  shimmerColor="#62D2A2"
                  background="#000"
                  className="h-12 px-8 md:h-16 md:px-12 rounded-2xl shadow-[0_0_40px_rgba(98,210,162,0.2)]"
                >
                  <span className="text-sm md:text-xl font-bold text-white tracking-tight">Find out how</span>
                </ShimmerButton>
              </Link>
            </motion.div>
          </div>
        </FluidParticlesBackground>
      </section>

      {/* Problem Section - words animate in on entry, full sentence visible before 3D section */}
      <TextReveal
        greenWords={["Map2Close", "close"]}
        redWords={["process"]}
      >
        Map2Close embeds directly into your sales team to audit your pipeline, fix your process, and train your reps so every lead that comes in has a real path to close.
      </TextReveal>

      {/* Trust Section - Logo Marquee */}
      <LogoMarquee />

      <div className="w-full pt-24 pb-16 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-6xl font-black tracking-tighter text-white text-center"
        >
          Our Process, <span className="text-primary">Mapped</span>
        </motion.h2>
      </div>

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
            <h2 className="text-2xl md:text-7xl font-black mb-6 md:mb-8 tracking-tighter text-white">
              One Conversation. <br /> No <span className="text-primary ">Commitment.</span>
            </h2>
            <p className="text-base md:text-2xl text-white mb-6 md:mb-8 font-body">Stop guessing. Start closing.</p>
            <Link href="/contact">
              <ShimmerButton className="h-12 px-8 md:h-16 md:px-12 rounded-2xl" shimmerColor="#62D2A2">
                <span className="text-sm md:text-xl font-black uppercase tracking-widest text-white">Book a Working Session</span>
              </ShimmerButton>
            </Link>
            <p className="mt-8 text-white font-bold tracking-[0.3em] uppercase text-xs">Map. Execute. Optimize. Close.</p>
          </motion.div>
        </LampContainer>
      </section>
    </div>
  );
}
