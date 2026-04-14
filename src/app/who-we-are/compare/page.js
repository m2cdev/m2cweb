"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const comparisons = [
  {
    leftHeader: "Common Room / 6sense — Signal & Intent Intelligence Platforms",
    leftItems: [
      "Aggregate pre-set buying signals across channels",
      "Surface intent data and account activity",
      "Tell you who to target and when",
    ],
    rightItems: [
      "Surface specific buying signals based on YOUR ICP",
      "Infuse buying intelligence data into your existing stack",
      "Turn intelligence into real pipeline, not just dashboards",
    ],
  },
  {
    leftHeader: "Gong — Revenue Intelligence & Call Analytics",
    leftItems: [
      "Record and transcribe sales calls",
      "Surface deal risks and conversation insights",
      "Tell you what's going wrong in your deals",
    ],
    rightItems: [
      "Analyze rep performance, calls, and deal activity firsthand",
      "Identify exactly where the breakdown is happening",
      "Fix what's breaking, not just flag it",
    ],
  },
  {
    leftHeader: "Traditional Sales Consultancy",
    leftItems: [
      "Deliver a strategy and a slide deck",
      "Recommend tools and processes",
      "Hand execution back to your team",
    ],
    rightItems: [
      "Build the system inside your stack",
      "Embed alongside your reps in live deals",
      "Scale alongside your motion",
    ],
  },
];

export default function ComparePage() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pt-40 pb-20">
      <div className="container-custom">
        <h1 className="text-4xl md:text-7xl font-black mb-16 tracking-tighter text-white">
          Traditional Consulting <br /> vs. <span className="text-primary italic">Map2Close</span>
        </h1>

        <div className="space-y-16">
          {comparisons.map((comp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="py-12 bg-white/5 rounded-3xl p-12 overflow-hidden relative border border-white/10"
            >
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                <div className="space-y-6 opacity-40 group hover:opacity-100 transition-opacity">
                  <h3 className="text-base font-bold uppercase tracking-widest text-gray-500 mb-6">{comp.leftHeader}</h3>
                  <ul className="space-y-4">
                    {comp.leftItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-4 line-through decoration-coral decoration-2">
                        <div className="w-2 h-2 rounded-full bg-coral mt-2 shrink-0" />
                        <p className="text-lg text-gray-400 font-body">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 border-l border-white/10 pl-12 bg-primary/5 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-primary mb-6">The Map2Close Method</h3>
                  <ul className="space-y-4">
                    {comp.rightItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                        <p className="text-lg text-gray-300 font-body leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank" rel="noopener noreferrer">
            <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-16 px-12 rounded-2xl">
              <span className="text-xl font-bold text-white tracking-tight">Book a Working Session</span>
            </ShimmerButton>
          </a>
        </div>
      </div>
    </div>
  );
}
