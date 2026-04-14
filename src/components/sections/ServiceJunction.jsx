"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  toolLogos
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Publish progress to window so Pipeline3D can read it
  useEffect(() => {
    if (typeof window !== "undefined") {
      window[`m2c_junction_${index}`] = progress;
    }
  }, [progress, index]);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=3000",
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => setProgress(self.progress),
    });
  }, { scope: containerRef });

  // ─── YOUR EXACT SEQUENCE ───────────────────────────────────
  // 0.0  - 0.3:  Pipeline OPENS (text hidden)
  // 0.3  - 0.5:  Pipeline open, PAUSED, text still hidden
  // 0.5  - 0.8:  Text VISIBLE
  // 0.8  - 0.9:  Text fades out
  // 0.9  - 1.0:  Pipeline CLOSES
  
  const showContent = progress > 0.5 && progress < 0.9;
  const contentOpacity = gsap.utils.clamp(0, 1, (progress - 0.5) / 0.1) * gsap.utils.clamp(0, 1, (0.9 - progress) / 0.1);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        style={{ opacity: contentOpacity }}
        className={cn(
          "relative z-20 w-full max-w-[90rem] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-56 pointer-events-auto",
          isMobile ? "text-center pt-24" : ""
        )}
      >
        {/* Left Side: Title & Subtitle */}
        <motion.div
           animate={{ x: showContent ? 0 : -60, opacity: showContent ? 1 : 0 }}
           transition={{ duration: 0.4 }}
           className={cn(
             "flex flex-col justify-center",
             isMobile ? "items-center" : "items-end text-right pr-6 md:pr-16"
           )}
        >
          <span className="px-3 py-1 border border-primary/20 text-primary text-[10px] tracking-[0.4em] font-black uppercase rounded-full mb-8">
            {tag}
          </span>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 text-white">
            {title}
          </h2>
          <p className="text-xl text-gray-500 font-body leading-relaxed max-w-md ml-auto">
            {subtitle}
          </p>
          
          {extrasType === 'icons' && (
            <div className="mt-16 grid grid-cols-2 gap-x-12 gap-y-6">
              {extrasData.map((item, i) => (
                <div key={i} className="flex flex-col items-end gap-1">
                  <div className="h-[1px] w-8 bg-primary/30 mb-2" />
                  <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Side: Description & CTA */}
        <motion.div
          animate={{ x: showContent ? 0 : 60, opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "flex flex-col justify-center",
            isMobile ? "items-center text-center pb-24" : "items-start text-left pl-6 md:pl-16"
          )}
        >
          <div className={isMobile ? "max-w-sm" : "max-w-lg"}>
             <p className="text-lg md:text-xl text-gray-400 font-body leading-relaxed mb-10">
               {description}
             </p>
             
             <a 
              href={link} 
              className="group inline-flex items-center gap-4 text-primary text-[11px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors"
             >
               {linkText}
               <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
               >
                →
               </motion.span>
             </a>

             {extrasType === 'cards' && (
               <div className="mt-16 space-y-6">
                 {extrasData.map((card, i) => (
                   <div 
                    key={i}
                    className="border-l border-primary/20 pl-6 py-1 group/card hover:border-primary transition-colors"
                   >
                     <h4 className="font-bold text-white tracking-tight group-hover/card:text-primary transition-colors text-base">{card.title}</h4>
                     <p className="text-sm text-gray-500 leading-relaxed">{card.text}</p>
                   </div>
                 ))}
               </div>
             )}

             {extrasType === 'pills' && (
               <div className="mt-12 flex flex-wrap gap-3">
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
               <div className="mt-12 flex items-center gap-4 text-[9px] font-black text-white/15 uppercase tracking-[0.3em]">
                  {toolLogos.map((logo, i) => (
                    <React.Fragment key={i}>
                      <span>{logo}</span>
                      {i < toolLogos.length - 1 && <span className="opacity-30">/</span>}
                    </React.Fragment>
                  ))}
               </div>
             )}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
