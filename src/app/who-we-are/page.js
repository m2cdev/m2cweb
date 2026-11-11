"use client";

import React from "react";
import { motion } from "framer-motion";
import PhilosophySpinner from "@/components/sections/PhilosophySpinner";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import FeatureCarousel from "@/components/ui/feature-carousel";




export default function WhoWeAre() {
  return (
    <div className="flex flex-col w-full bg-[#050505] min-h-screen">
      {/* Hero Section */}
      <BackgroundPaths>
        <div className="container-custom pt-24 md:pt-40 pb-12 md:pb-20">
          <div className="max-w-6xl mb-8 md:mb-16">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-5xl lg:text-[5rem] font-black text-white tracking-[-0.04em] mb-6 md:mb-12 leading-[0.95]"
            >
              For <span className="text-primary opacity-90">Sales Teams.</span><br />
              By <span className="text-primary opacity-90">Sales Teams.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col gap-8 max-w-5xl"
            >
                <p className="mt-4 max-w-3xl text-base md:text-xl font-body leading-relaxed text-white/82">
                  Map2Close embeds inside B2B revenue teams to diagnose where deals stall, rebuild the systems around that friction, and stay close enough to the work to prove the fix in live pipeline.
                </p>

              <div className="flex">
                <ShimmerButton
                  shimmerColor="#63D2A3"
                  background="#111"
                  className="h-14 px-10 rounded-2xl"
                  onClick={() => document.getElementById('narrative')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text-sm md:text-lg font-bold text-white tracking-tight">Find out more</span>
                </ShimmerButton>
              </div>
            </motion.div>
          </div>
        </div>
      </BackgroundPaths>

      {/* Built From the Field Section (white) */}
      <section id="narrative" className="w-full py-20 md:py-40 px-6 md:px-12 lg:px-20 relative overflow-hidden bg-white text-black">
        <div className="max-w-[1400px] mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="space-y-10 text-left">
              <p className="text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em] text-[#63D2A3]">Our story</p>
              <h2 className="text-3xl md:text-6xl font-black text-black tracking-tighter leading-[1.02]">
                Built From the <span className="text-[#63D2A3]">Field</span>
              </h2>
              <p className="max-w-5xl text-lg md:text-3xl text-[#3A3A37] font-body leading-snug tracking-tight">
                With <span className="font-black text-black">20+ years</span> of experience across B2B sales, tech, finance, retail, and operator-led growth environments, we kept seeing the same pattern: generic software built for the masses, one-size-fits-all playbooks, and real sales friction left untouched.
              </p>
              <div className="rounded-[2rem] bg-black p-8 md:p-12 relative overflow-hidden">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-[90px] opacity-30 bg-[#63D2A3]" />
                <p className="relative text-2xl md:text-5xl font-black tracking-tighter text-white leading-[1.05]">
                  So We Built the Thing We <span className="text-primary">Always Wished Existed.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Operating Principles (dark) */}
      <section className="w-full bg-black text-white py-20 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="mb-12">
            <p className="mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em] text-[#63D2A3]">Values</p>
            <h2 className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-[1.02]">
              Our Operating <span className="text-[#63D2A3]">Principles</span>
            </h2>
            <p className="mt-5 text-base md:text-xl text-white/60 font-body max-w-3xl">Three rules we run every engagement by.</p>
          </div>
          <FeatureCarousel />
        </motion.div>
      </section>

      {/* Philosophy Spinner - hidden on mobile, shown on desktop */}
      <div className="hidden md:block">
        <PhilosophySpinner />
      </div>

      <div className="h-8" />
    </div>
  );
}
