"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

// Same narrative as the old topographic map: four pipeline "leaks", each sealed
// by a phase of the engagement (Diagnose / Build / Pilot / Scale).
const PHASES = [
  {
    step: "01",
    solution: "Diagnose",
    label: "Broken sales motions that stall your momentum.",
    sub: "Leaking revenue.",
    solutionSub:
      "We audit your full sales motion and identify where deals are breaking down.",
  },
  {
    step: "02",
    solution: "Build",
    label: "Marketing & Sales initiatives working in silos.",
    sub: "Broken alignment.",
    solutionSub:
      "We prototype the solution and pressure test it with your team at no cost.",
    links: [
      { href: "/services/implementations", text: "View Implementation" },
      { href: "/services/custom-buildouts", text: "View Buildouts" },
    ],
  },
  {
    step: "03",
    solution: "Pilot",
    label: "Follow-ups that fall through the cracks.",
    sub: "Missed pipeline.",
    solutionSub:
      "3 to 6 month engagement. One measurable outcome. If we don't hit it, we keep working, a risk-free POC.",
  },
  {
    step: "04",
    solution: "Scale",
    label: "Processes that become more inefficient as you get bigger.",
    sub: "Diminishing returns.",
    solutionSub:
      "Once we prove it works, we build it out. Full solution, no limits.",
  },
];

const GREEN = "#62D2A2";
const CORAL = "#F96B6B";

export default function ProcessScroll() {
  const trackRef = useRef(null);
  const dotRefs = useRef([]);
  const [active, setActive] = useState(() => PHASES.map(() => false));

  // Progress runs from when the top of the track passes 60% of the viewport to
  // when its bottom does — so the fill line tracks the reader down the page.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 60%", "end 60%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Light each point up exactly when it crosses the same 60% viewport line the
  // fill front rides on. Tying activation to that line (instead of measured
  // offsets) keeps the points perfectly in sync with the colored fill.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setActive((prev) => {
          const next = [...prev];
          let changed = false;
          for (const entry of entries) {
            const i = Number(entry.target.dataset.index);
            if (next[i] !== entry.isIntersecting) {
              next[i] = entry.isIntersecting;
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );
    dotRefs.current.forEach((dot) => dot && observer.observe(dot));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#060c0a] py-24 md:py-36">
      {/* Ambient brand glows */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,107,107,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(98,210,162,0.14),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 text-center md:mb-28"
        >
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-[#F96B6B]">
            The problem
          </p>
          <h3 className="text-3xl font-black leading-[1.05] tracking-tighter text-white md:text-6xl">
            Your revenue pipeline is{" "}
            <span className="text-[#F96B6B]">leaking.</span>
          </h3>
        </motion.div>

        {/* Timeline track */}
        <div ref={trackRef} className="relative">
          {/* Static rail */}
          <div className="absolute bottom-0 left-[14px] top-0 w-px bg-white/10 md:left-[18px]" />
          {/* Filling rail */}
          <motion.div
            style={{ height: fillHeight }}
            className="absolute left-[14px] top-0 w-px bg-[#62D2A2] shadow-[0_0_12px_2px_rgba(98,210,162,0.5)] md:left-[18px]"
          >
            <span className="absolute -bottom-1 -left-[3.5px] h-2 w-2 rounded-full bg-[#62D2A2] shadow-[0_0_16px_5px_rgba(98,210,162,0.8)]" />
          </motion.div>

          <div className="flex flex-col gap-20 md:gap-32">
            {PHASES.map((phase, i) => {
              const isActive = active[i];
              return (
                <div
                  key={phase.step}
                  className="relative grid grid-cols-[30px_1fr] gap-5 md:grid-cols-[38px_1fr] md:gap-10"
                >
                  {/* Point */}
                  <div className="flex justify-start">
                    <motion.div
                      ref={(el) => (dotRefs.current[i] = el)}
                      data-index={i}
                      animate={{
                        backgroundColor: isActive ? GREEN : "#060c0a",
                        borderColor: isActive ? GREEN : "rgba(249,107,107,0.5)",
                        boxShadow: isActive
                          ? "0 0 24px 4px rgba(98,210,162,0.55)"
                          : "0 0 0px 0px rgba(0,0,0,0)",
                        scale: isActive ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 md:h-9 md:w-9"
                    >
                      {isActive ? (
                        <span className="text-xs font-black text-white md:text-sm">
                          ✓
                        </span>
                      ) : (
                        <motion.span
                          animate={{ opacity: [0.35, 1, 0.35] }}
                          transition={{ repeat: Infinity, duration: 1.8 }}
                          className="h-2 w-2 rounded-full bg-[#F96B6B]"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Copy */}
                  <div className="pb-2">
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.3em] transition-colors duration-500 md:text-xs"
                        style={{ color: isActive ? GREEN : CORAL }}
                      >
                        {isActive ? "✓ Sealed" : "● Leak detected"}
                      </span>
                      <span className="font-mono text-[11px] text-white/25">
                        {phase.step}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black leading-[1.05] tracking-tight text-white md:text-4xl">
                      {phase.label}
                    </h3>
                    <p
                      className="mt-2 text-base font-bold transition-colors duration-500 md:text-lg"
                      style={{
                        color: isActive ? "rgba(255,255,255,0.45)" : CORAL,
                      }}
                    >
                      {phase.sub}
                    </p>

                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.3,
                        borderColor: isActive
                          ? "rgba(98,210,162,0.6)"
                          : "rgba(255,255,255,0.1)",
                      }}
                      transition={{ duration: 0.5 }}
                      className="mt-6 border-l-2 pl-5"
                    >
                      <p className="text-xl font-black tracking-tight text-[#62D2A2] md:text-3xl">
                        {phase.solution}
                      </p>
                      <p className="mt-2 max-w-xl text-base font-medium text-white/80 md:text-xl">
                        {phase.solutionSub}
                      </p>

                      {phase.links && (
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            y: isActive ? 0 : 6,
                          }}
                          transition={{ duration: 0.4, delay: isActive ? 0.1 : 0 }}
                          className="mt-4 flex flex-wrap gap-x-6 gap-y-2"
                        >
                          {phase.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="border-b border-[#62D2A2]/30 text-xs font-black uppercase tracking-wider text-[#62D2A2] transition-colors hover:text-white md:text-sm"
                            >
                              {l.text} →
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Outro */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-28 flex flex-col items-center text-center md:mt-40"
        >
          <p className="mb-4 text-xs font-black uppercase tracking-[0.4em] text-[#62D2A2]">
            We&apos;re essentially plumbers for your pipeline
          </p>
          <h3 className="mb-6 text-4xl font-black leading-[1.0] tracking-tighter text-white md:text-7xl">
            If there&apos;s a leak, <br />
            <span className="text-[#62D2A2]">We Fix it.</span>
          </h3>
          <p className="mb-12 text-xl font-bold tracking-tight text-white md:text-2xl">
            And Prove that we can before you commit
          </p>
          <Link href="/pilot">
            <button className="transform rounded-full bg-[#62D2A2] px-12 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_0_50px_rgba(98,210,162,0.3)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#F96B6B] hover:shadow-[0_0_50px_rgba(249,107,107,0.4)]">
              How our Pilot Program Works
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
