"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle, BarChart, Zap, Target } from "lucide-react";
import { Spotlight } from "@/components/ui/aceternity-spotlight";

const caseStudies = {
  pinecone: {
    title: "Pinecone",
    category: "Sales Enablement",
    subtitle: "Built the hub for high-velocity sales engineering.",
    description: "Pinecone needed a way to bridge the gap between technical complexity and sales velocity. We built a custom enablement hub that empowered reps to close technical deals 40% faster.",
    stats: [
      { label: "Deal Velocity", value: "+42%" },
      { label: "Rep Ramp Time", value: "-2 Months" },
      { label: "Process Friction", value: "Minimized" },
    ],
    image: "/images/case-studies/pinecone.png",
  },
  signpost: {
    title: "Signpost",
    category: "Signal Intelligence",
    subtitle: "Turned intent data into actual booked meetings.",
    description: "Signal tracking is useless without an execution engine. For Signpost, we integrated real-time intent triggers directly into the SDR workflow, doubling the hit-rate on cold outreach.",
    stats: [
      { label: "Meeting Rate", value: "2.1x" },
      { label: "Signal Accuracy", value: "98%" },
      { label: "Response Time", value: "< 5 Min" },
    ],
    image: "/images/case-studies/signpost.png",
  },
  zenatech: {
    title: "ZenaTech",
    category: "Revenue Systems",
    subtitle: "A unified system for multi-unit revenue growth.",
    description: "Fragmented systems lead to leaky funnels. We rebuilt ZenaTech's entire revenue stack from the ground up, ensuring every dollar spent on marketing was tracked through to closed-won.",
    stats: [
      { label: "Revenue Growth", value: "35% YoY" },
      { label: "CAC Reduction", value: "18%" },
      { label: "Data Integrity", value: "100%" },
    ],
    image: "/images/case-studies/zenatech.png",
  },
  qwilr: {
    title: "Qwilr",
    category: "Trial Optimization",
    subtitle: "Optimized the trial-to-close journey for scale.",
    description: "Trials are where deals go to die. We built a proactive monitoring system for Qwilr that flagged which users were likely to buy and which needed human intervention, maximizing trial ROI.",
    stats: [
      { label: "Trial Conv.", value: "+24%" },
      { label: "Sales Efficiency", value: "+30%" },
      { label: "Active Pipeline", value: "$4M+" },
    ],
    image: "/images/case-studies/qwilr.png",
  }
};

export default function CaseStudyPage() {
  const { id } = useParams();
  const study = caseStudies[id];

  if (!study) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Study not found.</div>;

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <Spotlight className="-top-40 left-0 md:left-60 lg:left-80" fill="#62D2A2" />
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-black tracking-[0.4em] uppercase text-xs mb-6 block">{study.category}</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
              {study.title}
            </h1>
            <p className="text-2xl text-white opacity-80 font-body leading-relaxed max-w-lg mb-10">
              {study.subtitle}
            </p>
            
            <div className="flex gap-4">
               <a href="https://sales.map2close.com/meetings/kenzo/disco" target="_blank" className="bg-primary text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all">
                 Work with us
               </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden border border-white/10 aspect-video group"
            style={{ boxShadow: '0 0 50px rgba(98,210,162,0.1)' }}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${study.image})` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y border-white/10 bg-white/[0.02]">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
          {study.stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center md:text-left border-l border-white/10 pl-8"
            >
              <div className="text-5xl md:text-7xl font-black text-primary mb-2 tracking-tighter">{stat.value}</div>
              <div className="text-sm font-bold uppercase tracking-[0.3em] text-white opacity-80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Result Section */}
      <section className="py-32 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <div className="sticky top-32">
             <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">The Result.</h2>
             <p className="text-xl text-white opacity-80 leading-relaxed font-body">
               {study.description}
             </p>
          </div>

          <div className="space-y-12">
            {[
                { title: "Challenge", text: "Inherited a fragmented pipeline with inconsistent data across CRM and Slack.", icon: <Target className="text-coral" /> },
                { title: "Transformation", text: "Implemented a custom middleware layer to normalize data entry and automate rep reporting.", icon: <Zap className="text-primary" /> },
                { title: "Ongoing Impact", text: "Management now has 100% visibility into pipe velocity without asking for manually-sourced updates.", icon: <BarChart className="text-white" /> }
            ].map((item, i) => (
                <div key={i} className="flex gap-6 p-10 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/20 transition-colors group">
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                     {item.icon}
                   </div>
                   <div>
                     <h4 className="text-xl font-black mb-3">{item.title}</h4>
                     <p className="text-white opacity-80 font-body leading-relaxed">{item.text}</p>
                   </div>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Projects Section */}
      <section className="py-32 bg-white/[0.02] border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-black mb-12 uppercase tracking-[0.1em]">Next Up</h2>
           <div className="flex flex-wrap justify-center gap-8">
             {Object.keys(caseStudies).filter(k => k !== id).map((key) => (
               <Link key={key} href={`/case-studies/${key}`} className="group relative w-64 aspect-video rounded-xl overflow-hidden border border-white/10">
                  <div 
                    className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-500"
                    style={{ backgroundImage: `url(${caseStudies[key].image})` }}
                  />
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-all" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-black uppercase tracking-widest text-white group-hover:text-primary">{caseStudies[key].category}</span>
                  </div>
               </Link>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}
