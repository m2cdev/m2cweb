"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { LogoMarquee } from "@/components/LogoMarquee";

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

const methodologyCards = [
  {
    number: "01 - Calls & conversations",
    title: "What your reps actually say",
    body: "Discovery scripts, objection handling trees, and talk tracks built from your real deals.",
  },
  {
    number: "02 - Objections",
    title: "The pushback they hear",
    body: "Mapped to your product, your market, and the specific personas your team sells into.",
  },
  {
    number: "03 - Handoffs",
    title: "How deals move through your team",
    body: "SDR to AE, AE to CS. Every transition defined and documented so nothing falls out.",
  },
  {
    number: "04 - Live pipeline",
    title: "Applied to deals in flight now",
    body: "We work on your actual open opportunities, not hypothetical case studies.",
  },
];

const frameworkPills = [
  { label: "MEDDPICC" },
  { label: "BANT" },
  { label: "SPIN" },
  { label: "Challenger" },
  { label: "SPICED" },
];

export default function ServiceSubpageLayout({
  // ... existing props
  breadcrumb,
  heroHeadline,
  heroSubtext,
  heroExtra,
  approachText,
  serviceRows,
  serviceRowsTitle,
  showLogoMarquee = false,
  toolsHeadline = "We Work In Your World",
  toolsLogos,
  toolsBadge,
  ctaHeadline,
  ctaSubtext,
  ctaPrimaryText = "Book a Working Session",
  ctaPrimaryLink = "https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96",
  ctaExtra,
  isWaitlist = false,
  heroBackground,
}) {
  const ctaPrimaryIsExternal = ctaPrimaryLink?.startsWith("http");

  // Custom Cursor Logic for Scroll Section
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const scrollRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [activeFramework, setActiveFramework] = useState(null);
  const [activeMethodology, setActiveMethodology] = useState(methodologyCards[0].number);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    if (isDragging) {
      e.preventDefault();
      const x = e.pageX - e.currentTarget.offsetLeft;
      const walk = (x - startX) * 2;
      if (Math.abs(x - startX) > 5) {
        setHasDragged(true);
      }
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      {/* 1. HERO */}
      <section className="h-screen flex flex-col items-center justify-center relative px-6 text-center">
        {heroBackground && (
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {heroBackground}
          </div>
        )}

        <div className="max-w-4xl mx-auto z-10 relative mt-16">
          <WordReveal
            text={heroHeadline}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-tight mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-xl text-white font-body leading-relaxed max-w-[800px] mx-auto"
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
        <section
          className="bg-[#0d0d0d] px-6 py-20 md:px-16 md:py-[72px]"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto grid max-w-[1280px] grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-[80px]"
            >
            <div>
              <div className="mb-7 flex items-center gap-3">
                <div className="h-px w-6 bg-[#62D2A2]" />
                <span className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#62D2A2]">
                  HOW IT WORKS
                </span>
              </div>

              <h2 className="max-w-[660px] text-[52px] font-bold leading-[1.08] text-white">
                The Methodology Meets{" "}
                <span className="text-[#62D2A2]">Your Motion</span>
              </h2>

              <p className="mt-7 max-w-[660px] text-[22px] leading-[1.65] text-white">
                {approachText}
              </p>

              <div className="mt-9 border-t border-[#1f1f1f] pt-6">
                <p className="mb-4 text-[15px] font-bold uppercase tracking-[0.16em] text-white">
                  FRAMEWORKS WE WORK WITH
                </p>
                <div className="flex flex-wrap gap-3">
                  {frameworkPills.map((pill) => (
                    <span
                      key={pill.label}
                      onMouseEnter={() => setActiveFramework(pill.label)}
                      onMouseLeave={() => setActiveFramework(null)}
                      className={cn(
                        "rounded-[100px] border px-5 py-2 text-[15px] cursor-default select-none transition-all duration-200",
                        activeFramework === pill.label
                          ? "border-[#62D2A2] bg-[#62D2A21a] text-[#62D2A2]"
                          : "border-[#2a2a2a] bg-[#161616] text-white hover:border-white/20"
                      )}
                    >
                      {pill.label}
                    </span>
                  ))}
                  <span className="rounded-[100px] border border-dashed border-white/40 bg-transparent px-5 py-2 text-[15px] text-white">
                    + more
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <svg
                aria-hidden="true"
                className="absolute right-0 top-0 h-[120px] w-[120px] text-[#62D2A2]"
                viewBox="0 0 120 120"
                style={{ opacity: 0.12 }}
              >
                {Array.from({ length: 9 }).map((_, row) =>
                  Array.from({ length: 9 }).map((__, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={col * 15}
                      cy={row * 15}
                      r="1.5"
                      fill="currentColor"
                    />
                  ))
                )}
              </svg>

              <div className="relative z-10 flex flex-col gap-px pt-8 md:pt-10">
                {methodologyCards.map((card) => (
                  <div
                    key={card.number}
                    onMouseEnter={() => setActiveMethodology(card.number)}
                    className={cn(
                      "border-l-2 px-6 py-5 transition-colors duration-300",
                      activeMethodology === card.number
                        ? "border-l-[#62D2A2] bg-[#0f1a15]"
                        : "border-l-[#2a2a2a] bg-[#141414]"
                    )}
                  >
                    <p className="text-[13px] text-white">{card.number}</p>
                    <h3
                      className={cn(
                        "mt-2 text-[18px] font-semibold transition-colors duration-300",
                        activeMethodology === card.number ? "text-[#62D2A2]" : "text-white"
                      )}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-[16px] leading-relaxed text-white">
                      {card.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. SERVICE BLOCKS (Horizontal Scroll with Custom Cursor) */}
      {serviceRows && serviceRows.length > 0 && (
        <section 
          className="py-24 md:py-32 relative overflow-hidden bg-black group/carousel select-none cursor-none"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={() => setIsDragging(false)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsDragging(false); setIsHovered(false); }}
        >
          {/* Custom Cursor */}
          <motion.div
            style={{
              left: cursorX,
              top: cursorY,
              translateX: "-50%",
              translateY: "-50%",
            }}
            animate={{
              scale: isHovered ? (isDragging ? 0.9 : 1) : 0,
              opacity: isHovered ? 1 : 0,
            }}
            className="pointer-events-none absolute z-50 hidden md:flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center bg-primary text-black w-32 h-32 rounded-full shadow-[0_0_50px_rgba(98,210,162,0.6)] backdrop-blur-md border-2 border-white/20">
              <div className="flex items-center justify-center gap-2">
                <ArrowLeft size={16} strokeWidth={4} />
                <div className="relative h-12 w-12 flex items-center justify-center">
                  <Image 
                    src="/m2c-icon.png" 
                    alt="M2C Icon" 
                    width={40}
                    height={40}
                    className="object-contain mix-blend-multiply scale-110"
                  />
                </div>
                <ArrowRight size={16} strokeWidth={4} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-1 leading-none">Swipe</span>
            </div>
          </motion.div>

          {/* Subtle background decoration */}
          <div className="absolute inset-0 bg-primary/2 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)] pointer-events-none" />
          
          {/* Premium Grid Background */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10 bg-black">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_10%,transparent_100%)]" />
          </div>

          {serviceRowsTitle && (
            <div className="container-custom mb-16 text-center">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4 "
              >
                {serviceRowsTitle.split(" ").map((word, i) => {
                  const isCoral = word.startsWith("!");
                  const isMint = word.startsWith("^");
                  const clean = word.replace(/[!^]/g, "");
                  return (
                    <span key={i} className={cn(isCoral ? "text-coral" : isMint ? "text-primary" : "")}>
                      {clean}{" "}
                    </span>
                  );
                })}
              </motion.h2>
            </div>
          )}
          
          <div 
            ref={scrollRef}
            onClickCapture={(e) => {
              if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            className={cn(
              "flex overflow-x-auto gap-6 md:gap-8 px-6 md:px-12 pb-12 w-full mx-auto",
              isDragging && "scroll-auto"
            )} 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            
            {/* Start spacer */}
            <div className="shrink-0 w-4 md:w-[10vw]" />

            {serviceRows.map((row, i) => (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                key={i}
                className="shrink-0 w-[85vw] md:w-[450px] bg-[#050505] border border-white/5 rounded-[2rem] p-10 md:p-12 relative group hover:border-primary/30 transition-all duration-500 shadow-2xl flex flex-col justify-between min-h-[400px] cursor-none"
              >
                {/* Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-colors duration-500 rounded-[2rem] pointer-events-none" />
                
                <div className="cursor-none">
                  <span className={cn(
                    "block text-primary font-black tracking-widest mb-10",
                    isWaitlist ? "text-lg uppercase" : "text-5xl"
                  )}>
                    {row.identifier || `0${i + 1}`}
                  </span>
                  
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tight group-hover:text-primary transition-colors duration-300 leading-tight">
                    {row.title}
                  </h3>
                  
                  <p className="text-lg text-white font-body leading-relaxed">
                    {row.description}
                  </p>
                </div>

                {row.linkText && row.linkUrl && (
                  <div className="mt-10">
                    <Link href={row.linkUrl} className="text-primary text-xs font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
                      {row.linkText}
                    </Link>
                  </div>
                )}
              </motion.div>
            ))}

            {/* End spacer */}
            <div className="shrink-0 w-4 md:w-[10vw]" />
          </div>
        </section>
      )}



      {/* 4. TOOLS/INTEGRATIONS */}
      {toolsLogos && toolsLogos.length > 0 && (
        <section className="px-6 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <h4 className="text-white/60 font-black tracking-widest uppercase text-xs mb-10">
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
      <section className="px-6 relative overflow-hidden pb-[120px] pt-32 bg-gradient-to-b from-black to-[#050505] hide-floating-cta">
        <div className="absolute inset-0 bg-primary/5 opacity-50 translate-y-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 leading-[0.95]">
            {ctaHeadline.split(" ").map((word, i) => {
              const isCoral = word.startsWith("!");
              const isMint = word.startsWith("^");
              const clean = word.replace(/[!^]/g, "");
              return (
                <span key={i} className={cn(isCoral ? "text-coral" : isMint ? "text-primary" : "")}>
                  {clean}{" "}
                </span>
              );
            })}
          </h2>
          {ctaSubtext && (
            <p className="text-lg md:text-xl text-white font-body leading-relaxed mb-10">
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

              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
