"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BorderBeam } from "@/components/ui/border-beam";
import { Play } from "lucide-react";

const caseStudies = [
  {
    id: "fintech",
    company: "Fintech Leader",
    title: "Mapping the Path to a 25% Increase in Deal Velocity",
    description: "Our client, a leading Fintech platform, struggled with long sales cycles and stakeholder gridlock. We mapped their top tier accounts and identified key friction points.",
    loomId: "placeholder-1", // Placeholder for actual Loom link
    color: "#62D2A2"
  },
  {
    id: "saas",
    company: "Growth-Stage SaaS",
    title: "The Mid-Market Pivot: Closing 12 Accounts in 90 Days",
    description: "Moving from SMB to Mid-Market required a new blueprint. We built a repeatable sales motion that allowed their team to scale with precision.",
    loomId: "placeholder-2",
    color: "#F96B6B"
  },
  {
    id: "cyber",
    company: "Defense Tech",
    title: "Surgical Execution on a $5M Government Contract",
    description: "High-stakes deals require zero margin for error. We mapped the entire DMU for a complex government RFP, ensuring every stakeholder was aligned.",
    loomId: "placeholder-3",
    color: "#ffffff"
  }
];

const LoomEmbed = ({ loomId, color }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative group w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10">
      <BorderBeam colorFrom={color} colorTo={color} size={300} duration={12} delay={9} />
      
      {!isPlaying ? (
        <div 
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer hover:bg-black/40 transition-colors"
          onClick={() => setIsPlaying(true)}
        >
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-transform">
            <Play fill="currentColor" size={32} />
          </div>
          <p className="mt-4 text-sm font-bold uppercase tracking-widest text-primary">Watch Case Study</p>
        </div>
      ) : (
        <iframe
          src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true`}
          frameBorder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          className="absolute inset-0 w-full h-full"
        ></iframe>
      )}
      
      {/* Fallback Image / Poster */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-neutral-800 to-black" />
    </div>
  );
};

export default function CaseStudies() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pt-40 pb-20 relative">
      <ScrollProgress className="top-20 h-1 bg-primary z-[60]" />
      
      <div className="container-custom">
        <div className="max-w-4xl mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8"
          >
            Real Deals. <br /> <span className="text-primary italic">Surgical</span> Results.
          </motion.h1>
          <p className="text-xl md:text-2xl text-gray-400 font-body leading-relaxed max-w-2xl">
            See how Map2Close blueprints have transformed sales motions for some of the world's most ambitious sales organizations.
          </p>
        </div>

        <div className="space-y-40">
          {caseStudies.map((cs, index) => (
            <section key={cs.id} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">
                    {cs.company}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
                    {cs.title}
                  </h2>
                  <p className="text-lg text-gray-400 font-body leading-relaxed mb-10">
                    {cs.description}
                  </p>
                  <button className="h-12 px-8 rounded-full border border-white/10 text-white font-bold hover:bg-white/5 transition-all">
                    Read the Full Paper
                  </button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className={index % 2 === 1 ? "lg:order-1" : ""}
              >
                <LoomEmbed loomId={cs.loomId} color={cs.color} />
              </motion.div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
