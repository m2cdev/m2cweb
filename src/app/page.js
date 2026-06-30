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
import ProcessScroll from "@/components/sections/ProcessScroll";


const caseStudiesData = [
  { id: "pinecone", title: "Sales Enablement Hub", subtitle: "The right content, surfaced at the right moment in every deal.", url: "/images/pinecone-homepage.png", category: "Sales Enablement" },
  { id: "signpost", title: "Signal Intelligence Engine", subtitle: "Public review data, scored and pushed straight into HubSpot.", url: "/images/signpost-homepage.png", category: "Signal Intelligence" },
  { id: "qwilr", title: "Trial-to-Close Engine", subtitle: "A guided trial motion that ends post-demo deal drift.", url: "/images/qwilr-homepage.png", category: "Trial Optimization" },
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

      <ProcessScroll />

      {/* Case Studies Section - Natural Horizontal Scroll */}
      <HorizontalCarousel cards={caseStudiesData} />

      {/* Final CTA - Lamp Effect (desktop) / Clean CTA (mobile) */}
      <section className="relative bg-black w-full flex flex-col items-center justify-center overflow-hidden hide-floating-cta">
        {/* Mobile CTA */}
        <div className="md:hidden w-full flex flex-col items-center text-center px-6 py-20">
          <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(98,210,162,0.15),transparent_70%)] pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
          <h2 className="text-4xl font-black mb-4 tracking-tighter text-white relative z-10">
            One Conversation. <br /> No <span className="text-primary">Commitment.</span>
          </h2>
          <p className="text-base text-white mb-8 font-body relative z-10">Stop guessing. Start closing.</p>
          <Link href="/contact" className="relative z-10">
            <ShimmerButton className="h-12 px-8 rounded-2xl" shimmerColor="#62D2A2">
              <span className="text-sm font-black uppercase tracking-widest text-white">Book a Working Session</span>
            </ShimmerButton>
          </Link>
          <p className="mt-8 text-white font-bold tracking-[0.3em] uppercase text-xs relative z-10">Map. Execute. Optimize. Close.</p>
        </div>

        {/* Desktop Lamp */}
        <div className="hidden md:block w-full h-screen">
          <LampContainer>
            <motion.div
              initial={{ opacity: 0.5, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col items-center justify-center text-center px-4"
            >
              <h2 className="text-7xl font-black mb-8 tracking-tighter text-white">
                One Conversation. <br /> No <span className="text-primary">Commitment.</span>
              </h2>
              <p className="text-2xl text-white mb-8 font-body">Stop guessing. Start closing.</p>
              <Link href="/contact">
                <ShimmerButton className="h-16 px-12 rounded-2xl" shimmerColor="#62D2A2">
                  <span className="text-xl font-black uppercase tracking-widest text-white">Book a Working Session</span>
                </ShimmerButton>
              </Link>
              <p className="mt-8 text-white font-bold tracking-[0.3em] uppercase text-xs">Map. Execute. Optimize. Close.</p>
            </motion.div>
          </LampContainer>
        </div>
      </section>
    </div>
  );
}
