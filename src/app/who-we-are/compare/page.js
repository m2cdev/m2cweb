"use client";

import React from "react";
import { motion } from "framer-motion";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pt-40 pb-20">
      <div className="container-custom">
        {/* Comparison Section */}
        <div className="py-20 bg-white/5 rounded-3xl p-12 overflow-hidden relative border border-white/10">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          
          <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter text-white">Traditional Consulting <br /> vs. <span className="text-primary italic">Map2Close</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-8 opacity-40 group hover:opacity-100 transition-opacity">
              <h3 className="text-xl font-bold uppercase tracking-widest text-gray-500">The Traditional Mess</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 line-through decoration-coral decoration-2">
                  <div className="w-2 h-2 rounded-full bg-coral mt-2" />
                  <p className="text-lg text-gray-400 font-body">PowerPoint decks that collect digital dust and offer zero actionable insight.</p>
                </li>
                <li className="flex items-start gap-4 line-through decoration-coral decoration-2">
                  <div className="w-2 h-2 rounded-full bg-coral mt-2" />
                  <p className="text-lg text-gray-400 font-body">Generalized 'Lead Gen' that focuses on volume and spam, not strategic value.</p>
                </li>
                <li className="flex items-start gap-4 line-through decoration-coral decoration-2">
                  <div className="w-2 h-2 rounded-full bg-coral mt-2" />
                  <p className="text-lg text-gray-400 font-body">Guesswork disguised as strategy, leaving reps to figure out the path themselves.</p>
                </li>
              </ul>
            </div>

            <div className="space-y-8 border-l border-white/10 pl-12 bg-primary/5 p-8 rounded-2xl">
              <h3 className="text-xl font-bold uppercase tracking-widest text-primary">The Map2Close Method</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">Precision Blueprints.</h4>
                    <p className="text-lg text-gray-300 font-body leading-relaxed">
                      We don't just advise; we <span className="text-white font-bold">map</span> the actual decision units within your top tier accounts.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">Surgical Execution.</h4>
                    <p className="text-lg text-gray-300 font-body leading-relaxed">
                      Every interaction is calculated to influence the right stakeholder at the right time with the right message.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-2">Repeatable Win Engine.</h4>
                    <p className="text-lg text-gray-300 font-body leading-relaxed">
                      Turn 'miracle' deals into a standard, predictable operational procedure for your entire sales organization.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Philosophy Summary */}
        <div className="mt-32 text-center max-w-2xl mx-auto">
          <p className="text-gray-500 font-body italic text-lg mb-8">
            "Complexity is the friction that kills deal momentum. We are the lubricant that ensures precision through the noise."
          </p>
          <div className="w-12 h-1 bg-white/10 mx-auto" />
        </div>
      </div>
    </div>
  );
}
