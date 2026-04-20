"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Play } from "lucide-react";

const caseStudies = [
  {
    id: "pinecone",
    company: "Sales Enablement",
    title: "Sales Enablement Hub",
    description: "The right content never made it into the right conversation at the right time. Assets existed but were scattered, outdated, and impossible to surface during an active deal. We built a centralized Sales Enablement Hub where reps filter assets by deal stage, buyer persona, and use case in real time.",
    loomId: "placeholder-1",
    color: "#62D2A2",
    companyName: "Pinecone",
  },
  {
    id: "signpost",
    company: "Signal Intelligence",
    title: "Signal Intelligence Engine",
    description: "Reps were cold calling blind — no way to know which accounts were actively in pain. We built a custom Signal Intelligence Engine that scraped public review data, scored every account across Fit, Demand, Comms Pain, and Growth, and pushed high-scoring leads directly into HubSpot with rep-facing briefs.",
    loomId: "placeholder-2",
    color: "#F96B6B",
    companyName: "SignPost",
  },
  {
    id: "zenatech",
    company: "Revenue Systems",
    title: "Multi-Unit Revenue System",
    description: "A fast-growing holding company operating across SaaS, Drones-as-a-Service, land surveying, and defense tech — none of it connected. We built the entire revenue operating system: full HubSpot + Apollo implementation, multi-unit pipelines, automated routing, and weekly coaching across 12+ reps.",
    loomId: "placeholder-3",
    color: "#ffffff",
    companyName: "ZenaTech",
  },
  {
    id: "qwilr",
    company: "Trial Optimization",
    title: "Trial-to-Close Engine",
    description: "Deals slowed the moment they left the demo stage. We designed a Trial-to-Close Engine — guided trial playbooks, a Deal Accelerator Engine monitoring every active trial, and live rep coaching until the new motion stuck.",
    loomId: "placeholder-4",
    color: "#62D2A2",
    companyName: "Qwilr",
  },
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
            Outcomes <br /> <span className="text-primary italic">Over Optics.</span>
          </motion.h1>
          <p className="text-xl md:text-2xl text-white opacity-80 font-body leading-relaxed max-w-2xl">
            Real problems. Real builds. Real results.
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
                  <p className="inline-block px-4 py-1 rounded-full border border-white/10 bg-white/5 text-sm font-bold text-white opacity-80 uppercase tracking-widest mb-6">
                    {cs.company}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold mb-3 tracking-tight leading-tight">
                    {cs.companyName}
                  </h2>
                  <p className="text-primary font-bold uppercase tracking-widest text-sm mb-8">{cs.title}</p>
                  <p className="text-lg text-white opacity-80 font-body leading-relaxed mb-10">
                    {cs.description}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <Link href={`/case-studies/${cs.id}`}>
                      <ShimmerButton 
                        shimmerColor="#62D2A2" 
                        background="#050505" 
                        className="h-12 px-8 rounded-full"
                        shimmerSize="0.1em"
                      >
                        <span className="text-sm font-bold text-white tracking-tight">Dive Deeper →</span>
                      </ShimmerButton>
                    </Link>
                  </div>
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
