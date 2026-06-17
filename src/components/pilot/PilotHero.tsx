"use client";

import React, { useRef, useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  function scrollToHowItWorks() {
    const target = document.getElementById("how-it-works");
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.requestAnimationFrame(() => {
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  useGSAP(({ context }: any) => {
    if (isMobile) return; // skip heavy animation on mobile

    const st = ScrollTrigger.create({
        trigger: triggerRef.current,
        pin: containerRef.current,
        pinSpacing: true,
        start: "top top",
        end: "+=130%",
        scrub: 0.6,
        onUpdate: (self) => {
            setScrollProgress(self.progress);
        }
    });

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

    return () => { st.kill(); };
  }, { scope: triggerRef, dependencies: [isMobile] });

  // ── Mobile: lightweight static hero ──────────────────────────
  if (isMobile) {
    return (
      <section className="relative w-full flex flex-col justify-center px-6 pt-28 pb-12 bg-[#0A0A0A] overflow-hidden">
        {/* Simple ambient glow - no canvas, no GSAP */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[340px] h-[340px] rounded-full bg-[#62D2A2]/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-[#62D2A2]/40" />
            <span className="text-[10px] font-black tracking-[0.4em] text-[#62D2A2] uppercase font-mono">
              THE PILOT PROGRAM
            </span>
          </div>

          <h1 className="text-5xl font-black tracking-tighter leading-[1.05] mb-6 text-white">
            <div>Prove It First.</div>
            <div><span className="text-[#62D2A2]">Scale</span> What Works.</div>
          </h1>

          <p className="text-base text-white leading-relaxed mb-10 font-body">
            A focused 3 to 6 month engagement. We work inside your systems and pipeline to remove friction and prove the ROI before we scale out.
          </p>

          <div className="flex flex-col gap-4">
            <ShimmerButton
              shimmerColor="#62D2A2"
              background="#111"
              className="h-12 px-8 rounded-full w-full"
              onClick={scrollToHowItWorks}
            >
              <span className="text-sm font-black text-white uppercase tracking-widest">See How The Pilot Works</span>
            </ShimmerButton>
            <Link
              href="/contact"
              target="_blank"
              className="text-white/40 hover:text-white transition-colors text-xs font-black uppercase tracking-widest text-center"
            >
              Book a working session →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop: full image-sequence hero ────────────────────────
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
                  href="/contact"
                  target="_blank"
                  className="text-white/40 hover:text-white transition-colors text-sm font-black uppercase tracking-widest"
                >
                  Book a working session →
                </Link>
              </div>
            </div>
          </div>

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
