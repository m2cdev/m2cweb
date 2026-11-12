"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Check } from "lucide-react";
import { QmoMark, GrdrMark } from "@/components/revamp/ui";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const MINT = "#63D2A3";
const CORAL = "#FF6B6B";

const STEPS = [
  {
    n: "01",
    label: "Step 01",
    title: ["Define the ", "Outcome"],
    body: "We align on one core KPI that actually matters. Not vague goals. A clear, measurable outcome.",
    deliverables: ["Pipeline lift", "Conversion rates", "Deal velocity", "Stalled deals"],
  },
  {
    n: "02",
    label: "Step 02",
    title: ["Build and ", "Enable"],
    body: "We optimize your existing tech stack, building custom tooling where needed and provide live human enablement to drive the execution.",
    deliverables: ["Custom tools", "CRM workflows", "Tooling design", "Live deal support"],
    tool: { id: "qmo", where: "Rollout", line: "Qmo goes live with your reps: coaching on every call, right inside your CRM." },
  },
  {
    n: "03",
    label: "Step 03",
    title: ["Deliver ", "Results"],
    body: "If we don't hit the target, we keep working until we do. Continuation is earned, not assumed.",
    deliverables: ["Outcome-based", "Low risk", "Short timeline", "Clear metrics"],
    tool: { id: "qmo", where: "Execution", line: "Qmo keeps the new motion running on live calls and deals." },
    tool2: { id: "grdr", where: "Grading", line: "Grdr grades the calls and deals so the lift is measured, not guessed." },
  },
  {
    n: "04",
    label: "Step 04",
    title: ["Review and ", "Decide"],
    body: "At the end of the 90 days we review the result against the outcome we agreed on at the start. Then you choose: continue, adjust the target, or keep everything we built and walk away.",
    deliverables: [],
    tool: { id: "grdr", where: "Review", line: "Grdr scorecards put the result next to the outcome we agreed on." },
  },
];

function ToolPanel({ tool, big }) {
  const isQmo = tool.id === "qmo";
  return (
    <div
      className={`relative rounded-2xl border ${big ? "p-4 md:p-5" : "p-3 md:p-4"}`}
      style={{
        borderColor: isQmo ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)",
        background: isQmo ? "linear-gradient(135deg, rgba(99,210,163,0.22), rgba(255,255,255,0.04))" : "rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        {isQmo ? <QmoMark className={big ? "h-7 md:h-8" : "h-5"} /> : <GrdrMark className={big ? "text-2xl" : "text-xl"} />}
        <span className="text-[10px] font-black uppercase tracking-[0.22em] rounded-full px-2.5 py-1" style={{ background: isQmo ? MINT : CORAL, color: "#000" }}>
          {tool.where}
        </span>
      </div>
      <p className="text-[13px] md:text-sm leading-snug text-white/85 font-body">{tool.line}</p>
    </div>
  );
}

function Plane() {
  return (
    <g>
      <defs>
        <linearGradient id="pf-streak" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor={MINT} stopOpacity="0.9" />
          <stop offset="1" stopColor={MINT} stopOpacity="0" />
        </linearGradient>
        <filter id="pf-blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14" /></filter>
      </defs>
      <circle cx="60" cy="30" r="46" fill={MINT} opacity="0.22" filter="url(#pf-blur)" />
      <g className="pilot-streaks">
        <rect x="-70" y="27" width="76" height="2.5" rx="1.2" fill="url(#pf-streak)" />
        <rect x="-44" y="33" width="50" height="2" rx="1" fill="url(#pf-streak)" opacity="0.7" />
        <rect x="-26" y="21" width="32" height="1.6" rx="0.8" fill="url(#pf-streak)" opacity="0.5" />
      </g>
      {/* far wing */}
      <path d="M58 25 L40 6 L56 6 L84 25 Z" fill="#2c8f6b" />
      {/* tail fin */}
      <path d="M8 25 L2 3 L19 3 L34 24 Z" fill={CORAL} />
      {/* fuselage */}
      <path d="M4 30 Q4 23 17 22.5 L92 22.5 Q113 23.5 118 30 Q113 36.5 92 37.5 L17 37.5 Q4 37 4 30Z" fill={MINT} />
      {/* near wing */}
      <path d="M52 34 L28 58 L48 58 L84 35 Z" fill="#8ce6c0" />
      <path d="M62 38 h14 a3 3 0 0 1 0 8 h-14 a3 3 0 0 1 0 -8z" fill="#0b0b0b" opacity="0.85" />
      {/* windows */}
      {[24, 34, 44, 54, 64, 74, 84].map((x) => (
        <circle key={x} cx={x} cy="29" r="2" fill="#050505" />
      ))}
      <path d="M96 25.5 Q108 25.5 112 29.5 L96 29.5 Z" fill="#050505" opacity="0.9" />
    </g>
  );
}

export default function PilotFlight() {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const [geo, setGeo] = useState(null);
  const refs = useRef({ cards: [], marks: [], nums: [], plane: null, clip: null, bar: null, count: null, wave: null });

  // Measure
  useLayoutEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const mobile = vw < 768;
      const H = mobile ? 640 : Math.max(620, window.innerHeight);
      const cardW = mobile ? Math.min(vw * 0.82, 360) : Math.min(Math.max(vw * 0.27, 350), 450);
      const gap = cardW + (mobile ? 28 : 64);
      const introW = mobile ? 24 : Math.max(vw * 0.4, 480);
      const x0 = introW + cardW / 2;
      const xs = STEPS.map((_, i) => x0 + i * gap);
      const tail = mobile ? 36 : vw * 0.2;
      const W = xs[xs.length - 1] + cardW / 2 + tail;
      setGeo({ vw, H, mobile, cardW, xs, W, introW });
    };
    measure();
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(measure, 120); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, []);

  // Drive
  useEffect(() => {
    if (!geo) return;
    const { vw, H, mobile, cardW, xs, W } = geo;
    const baseY = H * (mobile ? 0.17 : 0.2);
    const amp = H * 0.045;
    const period = (cardW + 64) * 1.7;
    const yAt = (x) => baseY + amp * Math.sin((x / period) * Math.PI * 2);
    const slopeAt = (x) => amp * Math.cos((x / period) * Math.PI * 2) * ((Math.PI * 2) / period);
    const r = refs.current;

    const render = (p, scrollX) => {
      const planeScreen = vw * (0.12 + 0.76 * p);
      const px = scrollX + planeScreen;
      const py = yAt(px);
      const ang = (Math.atan(slopeAt(px)) * 180) / Math.PI;
      if (!mobile && trackRef.current) trackRef.current.style.transform = `translate3d(${-scrollX}px,0,0)`;
      if (r.plane) r.plane.setAttribute("transform", `translate(${px} ${py}) rotate(${ang}) scale(0.95) translate(-60 -30)`);
      if (r.clip) r.clip.setAttribute("width", Math.max(0, px));
      if (r.wave) r.wave.style.transform = `translate3d(${scrollX * 0.5}px,0,0)`;
      if (r.bar) r.bar.style.transform = `scaleX(${p})`;
      let reached = 0;
      xs.forEach((x, i) => {
        const k = Math.min(1, Math.max(0, (px - (x - cardW * 0.75)) / (cardW * 0.55)));
        if (k > 0.5) reached = i + 1;
        const card = r.cards[i];
        if (card) {
          card.style.opacity = String(0.3 + 0.7 * k);
          card.style.transform = `translate3d(0,${(1 - k) * 22}px,0) scale(${0.97 + 0.03 * k})`;
          card.style.borderColor = k > 0.5 ? "rgba(99,210,163,0.55)" : "rgba(255,255,255,0.1)";
        }
        const m = r.marks[i];
        if (m) {
          m.setAttribute("fill", k > 0.5 ? MINT : "#000");
          m.setAttribute("r", String(9 + 5 * Math.sin(Math.PI * Math.min(1, k))));
        }
        const nm = r.nums[i];
        if (nm) nm.style.transform = `translate3d(${scrollX * 0.18}px,0,0)`;
      });
      if (r.count) r.count.textContent = `${String(Math.max(1, reached)).padStart(2, "0")} / 04`;
    };

    if (!mobile) {
      const proxy = { p: 0 };
      render(0, 0);
      const ctx = gsap.context(() => {
        gsap.to(proxy, {
          p: 1,
          ease: "none",
          onUpdate: () => render(proxy.p, proxy.p * (W - vw)),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${Math.round((W - vw) * 1.05)}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      }, sectionRef);
      const rf = setTimeout(() => ScrollTrigger.refresh(), 100);
      return () => { clearTimeout(rf); ctx.revert(); };
    }

    // Mobile: native horizontal swipe, the plane follows the scroll position.
    const el = viewportRef.current;
    const onScroll = () => {
      const max = Math.max(1, el.scrollWidth - el.clientWidth);
      render(el.scrollLeft / max, el.scrollLeft);
    };
    render(0, 0);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [geo]);

  const H = geo ? geo.H : 700;
  const mobile = geo ? geo.mobile : false;

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-black text-white overflow-hidden hide-floating-cta" style={{ height: mobile ? "auto" : "100vh", minHeight: mobile ? 0 : 620 }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_0%,rgba(99,210,163,0.20),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_100%,rgba(255,107,107,0.10),transparent_50%)]" />

      {mobile && (
        <div className="relative z-10 px-6 pt-16 pb-6">
          <p className="mb-3 text-[12px] font-black uppercase tracking-[0.3em]" style={{ color: MINT }}>Timeline</p>
          <h2 className="text-4xl font-black tracking-tighter leading-[1.02]">Four steps across <span style={{ color: MINT }}>90 days</span></h2>
          <p className="mt-4 text-base text-white/70 font-body">Swipe through the flight. Qmo and Grdr come in where the work needs them.</p>
        </div>
      )}

      <div
        ref={viewportRef}
        className={mobile ? "relative overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-8" : "relative h-full overflow-hidden"}
        style={mobile ? { scrollbarWidth: "none" } : undefined}
      >
        {geo && (
          <div ref={trackRef} className="relative will-change-transform" style={{ width: geo.W, height: H }}>
            {/* parallax contour lines */}
            <svg ref={(e) => (refs.current.wave = e)} className="absolute left-0 top-0 pointer-events-none" width={geo.W} height={H} style={{ willChange: "transform" }} aria-hidden>
              {[0.34, 0.5, 0.66, 0.82, 0.96].map((f, i) => {
                let d = `M0 ${H * f}`;
                for (let x = 0; x <= geo.W; x += 80) d += ` L${x} ${H * f + Math.sin(x / (170 + i * 40) + i) * (10 + i * 3)}`;
                return <path key={i} d={d} fill="none" stroke="#fff" strokeOpacity={0.05} strokeWidth="1" />;
              })}
            </svg>

            {/* giant step numerals */}
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(e) => (refs.current.nums[i] = e)}
                className="absolute font-black leading-none select-none pointer-events-none"
                style={{ left: geo.xs[i] - geo.cardW * 0.55, top: H * 0.26, fontSize: Math.min(H * 0.55, 380), WebkitTextStroke: "2px rgba(255,255,255,0.045)", color: "transparent", letterSpacing: "-0.06em" }}
                aria-hidden
              >
                {s.n}
              </div>
            ))}

            {/* flight route */}
            <svg className="absolute left-0 top-0 pointer-events-none" width={geo.W} height={H} aria-hidden>
              <defs>
                <clipPath id="pf-trail-clip"><rect ref={(e) => (refs.current.clip = e)} x="0" y="0" width="0" height={H} /></clipPath>
                <filter id="pf-glow" x="-10%" y="-200%" width="120%" height="500%"><feGaussianBlur stdDeviation="6" /></filter>
              </defs>
              {(() => {
                const baseY = H * (mobile ? 0.17 : 0.2);
                const amp = H * 0.045;
                const period = (geo.cardW + 64) * 1.7;
                let d = "";
                for (let x = 0; x <= geo.W; x += 12) d += `${x === 0 ? "M" : "L"}${x} ${baseY + amp * Math.sin((x / period) * Math.PI * 2)} `;
                const cardTop = H * (mobile ? 0.3 : 0.31);
                return (
                  <>
                    <path d={d} fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
                    <g clipPath="url(#pf-trail-clip)">
                      <path d={d} fill="none" stroke={MINT} strokeWidth="12" strokeOpacity="0.35" filter="url(#pf-glow)" />
                      <path d={d} fill="none" stroke={MINT} strokeWidth="3" strokeLinecap="round" />
                    </g>
                    {geo.xs.map((x, i) => {
                      const y = baseY + amp * Math.sin((x / period) * Math.PI * 2);
                      return (
                        <g key={i}>
                          <line x1={x} y1={y + 14} x2={x} y2={cardTop} stroke="#fff" strokeOpacity="0.25" strokeDasharray="3 6" />
                          <circle cx={x} cy={y} r="9" fill="none" stroke={MINT} strokeOpacity="0.35" strokeWidth="1.5" transform={`scale(1)`} />
                          <circle ref={(e) => (refs.current.marks[i] = e)} cx={x} cy={y} r="9" fill="#000" stroke={MINT} strokeWidth="2.5" />
                        </g>
                      );
                    })}
                    <g ref={(e) => (refs.current.plane = e)} transform="translate(0 0)"><Plane /></g>
                  </>
                );
              })()}
            </svg>

            {/* intro (desktop only) */}
            {!mobile && (
              <div className="absolute z-10" style={{ left: Math.max(56, geo.vw * 0.05), top: H * 0.3, width: geo.introW - Math.max(56, geo.vw * 0.05) - 40 }}>
                <p className="mb-4 text-[13px] font-black uppercase tracking-[0.3em]" style={{ color: MINT }}>Timeline</p>
                <h2 className="text-5xl xl:text-7xl font-black tracking-tighter leading-[0.98]">
                  Four steps across <span style={{ color: MINT }}>90 days</span>
                </h2>
                <p className="mt-6 text-lg xl:text-xl text-white/70 font-body max-w-md">From the outcome we agree on, to the decision you make. Keep scrolling and follow the flight.</p>
              </div>
            )}

            {/* cards */}
            {STEPS.map((s, i) => (
              <div
                key={s.n}
                ref={(e) => (refs.current.cards[i] = e)}
                className="absolute z-10 rounded-3xl border bg-[#0b0b0b]/95 p-5 md:p-7 snap-center"
                style={{ left: geo.xs[i] - geo.cardW / 2, top: H * (mobile ? 0.3 : 0.31), width: geo.cardW, borderColor: "rgba(255,255,255,0.1)", opacity: 0.3, scrollSnapAlign: "center" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-black text-black" style={{ background: MINT }}>{s.n}</span>
                  <p className="text-[12px] font-black uppercase tracking-[0.25em]" style={{ color: MINT }}>{s.label}</p>
                </div>
                <h3 className="text-2xl md:text-[1.9rem] font-black tracking-tighter leading-tight mb-3">
                  {s.title[0]}<span style={{ color: CORAL }}>{s.title[1]}</span>
                </h3>
                <p className="text-sm md:text-[15px] text-white/75 font-body leading-relaxed mb-4">{s.body}</p>
                {s.deliverables.length > 0 && (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-1.5 text-[12.5px] font-semibold text-white">
                        <Check className="h-3.5 w-3.5" style={{ color: MINT }} strokeWidth={3} />{d}
                      </li>
                    ))}
                  </ul>
                )}
                {s.tool && (
                  <div className="space-y-2.5">
                    <ToolPanel tool={s.tool} big={s.tool.id === "qmo" && !s.tool2} />
                    {s.tool2 && <ToolPanel tool={s.tool2} />}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pilotStreak { 0%,100% { opacity: .9; transform: translateX(0) } 50% { opacity: .45; transform: translateX(-8px) } }
        .pilot-streaks { animation: pilotStreak 0.9s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .pilot-streaks { animation: none } }
      `}</style>
    </section>
  );
}
