"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BorderBeam } from "@/components/ui/border-beam";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Play } from "lucide-react";
import { BackgroundAura } from "@/components/ui/background-aura";

const caseStudies = [
  {
    id: "pinecone",
    company: "Sales Enablement",
    title: "Sales Enablement Hub",
    description: "Pinecone is the gold standard for vector database infrastructure. The problem wasn't the product. It wasn't the reps. It was that the right content never made it into the right conversation at the right time. We built a live content repository where reps could filter assets by deal stage, buyer persona, and use case in real time, replacing scattered folders with a centralized Sales Enablement Hub.",
    loomId: "8815fd477dcd444799521d13995e8442",
    thumbnail: "/images/case-studies/pinecone-loom.png",
    color: "#62D2A2",
    companyName: "Pinecone",
  },
  {
    id: "signpost",
    company: "Signal Intelligence",
    title: "Signal Intelligence Engine",
    description: "Signpost reps were cold calling blind. Outreach was inconsistent, research was manual, and dials were wasted on the wrong accounts. We built a custom Signal Intelligence Engine that scraped and analyzed public review data across tens of thousands of home-services businesses, pushing high-scoring, pre-enriched leads directly into HubSpot.",
    loomId: "7694a0c1e94d44cc875b8f75e7b4d0e7",
    thumbnail: "/images/case-studies/signpost-loom.png",
    color: "#F96B6B",
    companyName: "SignPost",
  },
  {
    id: "zenatech",
    company: "Revenue Systems",
    title: "Multi-Unit Revenue System",
    description: "ZenaTech is a fast-growing holding company spanning SaaS, Drones-as-a-Service, land surveying, and defense tech. Each unit had its own reps and motion, none of it connected. We built the entire revenue operating system from the ground up: full HubSpot + Apollo implementation, unified playbooks, and 37 automated workflows that eliminated manual routing across every business unit.",
    loomId: "17f37feb765d47a3b900d354eb73599f",
    thumbnail: "/images/case-studies/zenatech-loom.png",
    color: "#ffffff",
    companyName: "ZenaTech",
  },
  {
    id: "qwilr",
    company: "Trial Optimization",
    title: "Trial-to-Close Engine",
    description: "Qwilr's deals would slow down the moment they left the demo stage. We designed and implemented a structured Trial-to-Close Engine: a guided playbook with give/get incentives partnered with a Deal Accelerator Engine that monitored every active trial and flagged deals stalling beyond threshold points.",
    loomId: "09630646d94f4811a4186f9e879e4b7c",
    thumbnail: "/images/case-studies/qwilr-loom.png",
    color: "#62D2A2",
    companyName: "Qwilr",
  },
];

const LoomEmbed = ({ loomId, color, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative group w-full aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
      <BorderBeam colorFrom={color} colorTo={color} size={300} duration={12} delay={9} />

      {!isPlaying ? (
        <div
          className="absolute inset-0 z-10 flex flex-col items-center justify-center cursor-pointer group/overlay transition-all duration-500"
          onClick={() => setIsPlaying(true)}
        >
          {thumbnail && (
            <div className="absolute inset-0 z-0">
              <img
                src={thumbnail}
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-60 group-hover/overlay:scale-105 group-hover/overlay:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>
          )}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-2xl group-hover/overlay:scale-110 group-hover/overlay:bg-primary group-hover/overlay:text-black transition-all duration-300">
              <Play fill="currentColor" size={32} />
            </div>
            <p className="mt-4 text-sm font-black uppercase tracking-[0.3em] text-white group-hover/overlay:text-primary transition-colors">
              Watch Case Study
            </p>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.loom.com/embed/${loomId}?hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true&autoplay=1`}
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
};

import AnimatedShaderHero from "@/components/ui/animated-shader-hero";
import { useScroll, useTransform } from "framer-motion";

export default function CaseStudies() {
  const { scrollY } = useScroll();
  
  // Transition shade from 0.1 to 0.92 opacity over 500px of scroll
  const shadeOpacity = useTransform(scrollY, [0, 500], [0.1, 0.92]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#050505] relative">
      <ScrollProgress className="top-20 h-1 bg-primary z-[60]" />

      {/* Dynamic Scroll Shade Overlay */}
      <motion.div 
        style={{ opacity: shadeOpacity }}
        className="fixed inset-0 bg-[#050505] z-[2] pointer-events-none"
      />

      <AnimatedShaderHero 
        fixed={true}
        headline={{
          line1: "Outcomes",
          line2: "Over Optics."
        }}
        subtitle="Real problems. Real builds. Credible outcomes."
        className="mb-20"
      />

      <div className="container-custom relative z-10 pb-40">



        <div className="space-y-40">
          {caseStudies.map((cs, index) => (
            <section key={cs.id} className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 1 ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="inline-block px-4 py-1 rounded-full border border-[#62D2A2]/30 bg-[#62D2A2]/10 text-sm font-bold text-[#62D2A2] uppercase tracking-widest mb-6">
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
                <LoomEmbed loomId={cs.loomId} color={cs.color} thumbnail={cs.thumbnail} />
              </motion.div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
