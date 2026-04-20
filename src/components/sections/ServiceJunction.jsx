"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";

gsap.registerPlugin(ScrollTrigger);

export default function ServiceJunction({ 
  index,
  tag, 
  title, 
  subtitle, 
  description, 
  link, 
  linkText,
  extrasType,
  extrasData,
  toolLogos,
  extrasLabel
}) {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Publish progress to window for Pipeline3D
  useEffect(() => {
    if (typeof window !== "undefined") {
      window[`m2c_junction_${index}`] = progress;
    }
  }, [progress, index]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=1000", // Slightly shorter for better mobile/navigation experience
        pin: true,
        scrub: 1, // Balanced scrub
        anticipatePin: 1,
        onUpdate: (self) => setProgress(self.progress),
      }
    });

    // ─── UNIFIED SCROLL SEQUENCE ──────────────────────────────
    // 0.0 → 0.3: Pipeline opening (handled in 3D)
    // 0.2 → 0.5: Text slides in and fades in (overlap for smoothness)
    // 0.5 → 0.8: Text holds
    // 0.8 → 1.0: Text slides out and pipeline closes

    tl.fromTo([leftColRef.current, rightColRef.current], 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.4 }, 
      0.2 // Start earlier for better overlap
    );

    tl.fromTo(leftColRef.current,
      { x: isMobile ? 0 : -80 },
      { x: 0, duration: 0.5, ease: "power3.out" },
      0.2
    );

    tl.fromTo(rightColRef.current,
      { x: isMobile ? 0 : 80 },
      { x: 0, duration: 0.5, ease: "power3.out" },
      0.2
    );

    // Fade out earlier than the closing animation (0.85 approx)
    tl.to([leftColRef.current, rightColRef.current], {
      opacity: 0,
      y: -40,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in"
    }, 0.85);

  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div 
        className={cn(
          "relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-56 pointer-events-auto",
          isMobile ? "text-center pt-24" : ""
        )}
      >
        {/* Left Side: Title & Subtitle */}
        <div
           ref={leftColRef}
           className={cn(
             "flex flex-col justify-center",
             isMobile ? "items-center" : "items-end text-right pr-6 md:pr-16"
           )}
        >
          <span className="px-3 py-1 border border-primary/20 text-primary text-[10px] tracking-[0.4em] font-black uppercase rounded-full mb-8">
            {tag}
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-white">
            {title}
          </h2>
          <p className="text-2xl text-gray-300 font-body leading-relaxed max-w-md ml-auto">
            {subtitle}
          </p>
          
          {extrasType === 'icons' && (
            <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-6">
              {extrasData.map((item, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  <div className="h-[2px] w-8 bg-primary/50 mb-2" />
                  <span className="text-[12px] font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Description & CTA */}
        <div
           ref={rightColRef}
           className={cn(
             "flex flex-col justify-center",
             isMobile ? "items-center text-center pb-24" : "items-start text-left pl-6 md:pl-16"
           )}
        >
          <div className={cn(isMobile ? "max-w-sm" : "max-w-lg", "bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 p-8 shadow-2xl rounded-3xl")}>
             <p className="text-xl md:text-2xl text-gray-200 font-body leading-relaxed mb-10">
               {description}
             </p>
             
             <a 
              href={link} 
             >
               <ShimmerButton 
                 shimmerColor="#62D2A2" 
                 background="#050505" 
                 className="h-14 px-8 rounded-full"
                 shimmerSize="0.1em"
               >
                 <span className="flex items-center justify-center font-heading font-black text-[12px] uppercase tracking-[0.2em] text-white">
                   {linkText}
                 </span>
               </ShimmerButton>
             </a>

             {extrasType === 'cards' && (
               <div className="mt-16 space-y-6">
                 {extrasLabel && (
                   <h3 className="text-[#AAAAAA] text-sm font-bold uppercase tracking-widest mb-6 border-b border-white/10 pb-4">{extrasLabel}</h3>
                 )}
                 {extrasData.map((card, i) => (
                   <div 
                    key={i}
                    className="border-l border-primary/20 pl-6 py-1 group/card hover:border-primary transition-colors text-right md:text-left"
                   >
                     <h4 className="font-bold text-white tracking-tight group-hover/card:text-primary transition-colors text-base">{card.title}</h4>
                     <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
                   </div>
                 ))}
               </div>
             )}

             {extrasType === 'pills' && (
               <div className="mt-12 flex flex-wrap gap-3 justify-center md:justify-start">
                 {extrasData.map((pill, i) => (
                   <span 
                    key={i}
                    className="px-4 py-2 bg-white/5 border border-white/10 text-white/40 text-[9px] font-black uppercase tracking-widest rounded hover:border-primary/40 hover:text-primary transition-colors"
                   >
                     {pill}
                   </span>
                 ))}
               </div>
             )}

             {toolLogos && (
               <div className="mt-12 flex flex-wrap items-center gap-6 justify-center md:justify-start">
                  <span className="text-[10px] font-black tracking-widest uppercase text-gray-500">Integrated Tools:</span>
                  <div className="flex gap-4 items-center">
                    {toolLogos.map((logo) => {
                      const getLogoIcon = (name) => {
                        const m = name.toLowerCase();
                        if (m === "apollo") return "https://icon.horse/icon/apollo.io";
                        return `https://icon.horse/icon/${m}.com`;
                      };
                      return (
                        <div key={logo + "_v3"} className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-2.5 shadow-lg shadow-black/50 overflow-hidden" title={logo}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={getLogoIcon(logo)} alt={`${logo} logo`} className="w-full h-full object-contain" />
                        </div>
                      )
                    })}
                  </div>
               </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
