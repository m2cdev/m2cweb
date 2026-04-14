"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

// Helper component for SplitText effect using framer-motion
function WordReveal({ text, className }) {
  const words = text.split(" ");
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.2, 0.65, 0.3, 0.9] },
    },
  };

  const getColor = (word) => {
    if (word.startsWith("^")) return "#62D2A2"; // Mint/Green
    if (word.startsWith("!")) return "#F96B6B"; // Coral/Red
    return "inherit";
  };

  const cleanWord = (word) => {
    if (word.startsWith("^") || word.startsWith("!")) return word.substring(1);
    return word;
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, idx) => (
        <motion.span 
          key={idx} 
          variants={child} 
          className="inline-block mr-[0.3em]"
          style={{ color: getColor(word) }}
        >
          {cleanWord(word)}
        </motion.span>
      ))}
    </motion.h1>
  );
}

export default function ServiceSubpageLayout({
  breadcrumb,
  heroHeadline,
  heroSubtext,
  heroExtra, // Optional (e.g. Waitlist form)
  approachText,
  serviceRows,
  toolsHeadline = "We Work In Your World",
  toolsLogos,
  toolsBadge,
  ctaHeadline,
  ctaSubtext,
  ctaPrimaryText = "Book a Working Session",
  ctaPrimaryLink = "https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96",
  ctaSecondaryText = "Or explore the Custom Pilot →",
  ctaSecondaryLink = "/pilot",
  ctaExtra, // New prop for custom CTA form elements instead of generic button
  isWaitlist = false, // Boolean flag for the special AI page styling
  heroBackground, // New prop for custom background component (e.g. Waves)
}) {
  const ctaPrimaryIsExternal = ctaPrimaryLink?.startsWith("http");

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      {/* 1. HERO */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        {heroBackground && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {heroBackground}
          </div>
        )}
        <div className="absolute top-32 left-6 md:left-12 z-20">
          <p className="text-gray-500 text-[13px] tracking-widest uppercase font-black">
            {breadcrumb}
          </p>
        </div>

        <div className="max-w-4xl mx-auto z-10 relative mt-16">
          <WordReveal
            text={heroHeadline}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-tight mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-gray-400 font-body leading-relaxed max-w-[640px] mx-auto"
          >
            {heroSubtext}
          </motion.p>
          
          {heroExtra && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12"
            >
              {heroExtra}
            </motion.div>
          )}
        </div>
      </section>

      {/* 2. WHAT WE DO (Approach) */}
      {approachText && (
        <section className={cn(
          "px-6 py-32 md:py-[120px]", 
          isWaitlist ? "bg-[#050B08]" : "bg-[#0A0A0A]"
        )}>
          <div className="max-w-[720px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-300 font-body leading-relaxed"
            >
              {approachText}
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. SERVICE BLOCKS */}
      {serviceRows && serviceRows.length > 0 && (
        <section className="px-6 py-24 md:py-32 max-w-[900px] mx-auto">
          <div className="flex flex-col">
            {serviceRows.map((row, i) => (
              <ServiceRow key={i} row={row} index={i} isWaitlist={isWaitlist} />
            ))}
          </div>
        </section>
      )}

      {/* 4. TOOLS/INTEGRATIONS */}
      {toolsLogos && toolsLogos.length > 0 && (
        <section className="px-6 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-gray-500 font-black tracking-widest uppercase text-xs mb-10">
              {toolsHeadline}
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-[10px] md:text-xs font-black text-white/50 uppercase tracking-[0.2em]">
              {toolsLogos.map((logo, i) => (
                <React.Fragment key={i}>
                  <span>{logo}</span>
                  {i < toolsLogos.length - 1 && <span className="opacity-20 text-white/30 hidden md:inline">/</span>}
                </React.Fragment>
              ))}
            </div>
            {toolsBadge && (
              <div className="mt-12 inline-block px-4 py-2 border border-primary/30 rounded-full text-primary text-[10px] font-black uppercase tracking-widest bg-primary/5">
                {toolsBadge}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. BOTTOM CTA */}
      <section className="px-6 relative overflow-hidden pb-[120px] pt-32 bg-gradient-to-b from-black to-[#050505]">
        <div className="absolute inset-0 bg-primary/5 opacity-50 translate-y-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
            {ctaHeadline}
          </h2>
          {ctaSubtext && (
            <p className="text-lg md:text-xl text-gray-500 font-body leading-relaxed mb-10">
              {ctaSubtext}
            </p>
          )}

          <div className="flex flex-col items-center justify-center gap-8 mt-6 w-full">
            {ctaExtra ? (
              ctaExtra
            ) : (
              <>
                {ctaPrimaryIsExternal ? (
                  <a href={ctaPrimaryLink} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-14 px-8 rounded-full">
                      <span className="text-sm font-black text-white uppercase tracking-widest">{ctaPrimaryText}</span>
                    </ShimmerButton>
                  </a>
                ) : (
                  <Link href={ctaPrimaryLink}>
                    <ShimmerButton shimmerColor="#62D2A2" background="#111" className="h-14 px-8 rounded-full">
                      <span className="text-sm font-black text-white uppercase tracking-widest">{ctaPrimaryText}</span>
                    </ShimmerButton>
                  </Link>
                )}

                {ctaSecondaryText && ctaSecondaryLink && (
                  <Link href={ctaSecondaryLink} className="text-gray-500 hover:text-white transition-colors uppercase text-[11px] font-black tracking-widest flex items-center gap-2 group">
                    {ctaSecondaryText}
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceRow({ row, index, isWaitlist }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-12 py-10 md:py-16 border-b border-[#1A1A1A] last:border-b-0"
    >
      <div className="md:col-span-1 pt-1 md:text-right">
        <span className={cn(
          "text-primary font-black tracking-widest",
          isWaitlist ? "text-lg uppercase" : "text-3xl"
        )}>
          {row.identifier || `0${index + 1}`}
        </span>
      </div>
      <div className="md:col-span-3">
        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-primary transition-colors">
          {row.title}
        </h3>
        <p className="text-base text-gray-500 font-body leading-relaxed">
          {row.description}
        </p>
        {row.linkText && row.linkUrl && (
          <div className="mt-6">
            <Link href={row.linkUrl} className="text-primary text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
              {row.linkText}
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}
