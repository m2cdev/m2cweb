"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { PilotImageSequence } from "./PilotImageSequence";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import styles from "./pilotHero.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function PilotHero() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);

  function scrollToHowItWorks() {
    const target = document.getElementById("how-it-works");
    if (!target) return;

    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  useGSAP(({ context }: any) => {
    // 1. PIN THE HERO
    const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: containerRef.current,
        pinSpacing: true,
        start: "top top",
        end: "+=600%", // Longer scroll for 192 frames
        scrub: 1, // Increased smoothing for 30fps feel
        onUpdate: (self) => {
            // Use GSAP to smooth the progress update itself if needed
            setScrollProgress(self.progress);
        }
    });

    // 2. TEXT FADE/EXIT
    gsap.to(textRef.current, {
        opacity: 0,
        y: -100,
        scrollTrigger: {
            trigger: triggerRef.current,
            start: "70% top",
            end: "bottom top",
            scrub: true
        }
    });
    
    return () => {
        st.kill();
    };
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} className="relative w-full overflow-visible">
        <section ref={containerRef} className={`${styles.heroContainer} overflow-hidden h-[100vh]`}>
          <div className={styles.canvasWrapper}>
            <PilotImageSequence progress={scrollProgress} />
          </div>

          <div ref={textRef} className={styles.contentWrapper} style={{ opacity: scrollProgress > 0.8 ? 0 : 1 }}>
            <div className={styles.textBlock}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-[#62D2A2]/40" />
                <span className="text-[11px] font-black tracking-[0.4em] text-[#62D2A2] uppercase font-mono">
                    THE PILOT PROGRAM
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.05] mb-10 text-white">
                <div>Prove It First.</div>
                <div>
                  <span className="text-[#62D2A2]">Scale</span> What Works.
                </div>
              </h1>

              <p className="text-xl md:text-2xl text-white leading-relaxed mb-12 max-w-lg font-medium font-body">
                A focused 3 to 6 month engagement, we work inside your systems and pipeline to remove friction and prove the ROI before we scale out.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <ShimmerButton 
                  shimmerColor="#62D2A2" 
                  background="#111" 
                  className="h-16 px-10 rounded-full"
                  onClick={scrollToHowItWorks}
                >
                  <span className="text-sm font-black text-white uppercase tracking-widest">See How The Pilot Works</span>
                </ShimmerButton>
                <Link 
                  href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96"
                  target="_blank"
                  className="text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest"
                >
                  Book a working session →
                </Link>
              </div>
            </div>
          </div>

          {/* HUD Elements for extra immersion */}
          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-12 mix-blend-overlay opacity-30">
            <div className="flex justify-between items-start">
               <div className="flex flex-col gap-2 font-mono text-[10px] text-[#62D2A2]">
                  <div>TRK // 248.5</div>
                  <div>ALT // 34,000</div>
               </div>
               <div className="flex flex-col gap-2 font-mono text-[10px] text-[#62D2A2] text-right">
                  <div>SPD // 0.82 MACH</div>
                  <div>NAV // ON</div>
               </div>
            </div>
          </div>
        </section>
    </div>
  );
}
