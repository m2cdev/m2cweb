"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const MINT = "#63D2A3";
export const CORAL = "#FF6B6B";
export const QMO_YELLOW = "#FFC801";
export const GRDR_CYAN = "#00D1FF";

export function Reveal({ children, delay = 0, className = "", y = 18 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Renders text where words starting with ^ are mint and ! are coral.
export function Marked({ text, mint = MINT, coral = CORAL }) {
  return text.split(" ").map((w, i) => {
    const c = w.startsWith("^") ? mint : w.startsWith("!") ? coral : null;
    const clean = w.replace(/^[\^!]/, "");
    return (
      <span key={i} style={c ? { color: c } : undefined}>
        {clean}{" "}
      </span>
    );
  });
}

export function Waves({ className = "", color = MINT, flip = false }) {
  return (
    <svg viewBox="0 0 320 220" className={className} fill="none" aria-hidden="true" style={flip ? { transform: "scaleX(-1) scaleY(-1)" } : undefined}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M-10 ${150 + i * 14} C 70 ${60 + i * 10}, 150 ${210 - i * 6}, 330 ${70 + i * 12}`} stroke={color} strokeOpacity={0.5 - i * 0.06} strokeWidth="1" />
      ))}
    </svg>
  );
}

export function GridBackdrop({ glow = MINT, strong = false }) {
  const line = strong ? "rgba(99,210,163,0.06)" : "rgba(255,255,255,0.015)";
  return (
    <div className="absolute inset-0 pointer-events-none -z-0 overflow-hidden" aria-hidden="true">
      <div
        className={cn("absolute inset-0 bg-[size:64px_64px]", strong ? "[mask-image:radial-gradient(ellipse_90%_90%_at_50%_45%,#000_30%,transparent_100%)]" : "[mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000_10%,transparent_100%)]")}
        style={{ backgroundImage: `linear-gradient(${line} 1px,transparent 1px),linear-gradient(90deg,${line} 1px,transparent 1px)` }}
      />
      <div className={cn("absolute -top-40 -right-40 w-[760px] h-[760px] rounded-full blur-[150px]", strong ? "opacity-[0.38]" : "opacity-[0.20]")} style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }} />
      {strong && <div className="absolute -bottom-52 -left-40 w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.28]" style={{ background: `radial-gradient(circle, ${glow}, transparent 70%)` }} />}
    </div>
  );
}

// Tall dark grid with green hues, for a stack of sections that should read as one surface.
export function GridField({ glow = MINT, className = "" }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden bg-black", className)} aria-hidden="true">
      <div
        className="absolute inset-0 bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,transparent,#000_8%,#000_92%,transparent)]"
        style={{ backgroundImage: "linear-gradient(rgba(99,210,163,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,210,163,0.05) 1px,transparent 1px)" }}
      />
      {[["-top-32 -right-40", 0.34], ["top-[38%] -left-56", 0.26], ["bottom-0 -right-48", 0.30]].map(([pos, o], i) => (
        <div key={i} className={cn("absolute w-[720px] h-[720px] rounded-full blur-[150px]", pos)} style={{ opacity: o, background: `radial-gradient(circle, ${glow}, transparent 70%)` }} />
      ))}
    </div>
  );
}

export function Eyebrow({ children, color = MINT }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div className="h-px w-6" style={{ background: color }} />
      <span className="text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em]" style={{ color }}>
        {children}
      </span>
    </div>
  );
}

export function PageHero({ eyebrow, headline, sub, children, accent = MINT, align = "left" }) {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-20 px-6 md:px-16 overflow-hidden">
      <GridBackdrop glow={accent} />
      <div className={cn("relative z-10 max-w-6xl mx-auto w-full", align === "center" && "text-center")}>
        <Reveal>
          <div className={cn(align === "center" && "flex justify-center")}>
            <Eyebrow color={accent}>{eyebrow}</Eyebrow>
          </div>
        </Reveal>
        <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.98] text-white max-w-5xl">
          {headline.split(" ").map((w, i) => {
            const c = w.startsWith("^") ? MINT : w.startsWith("!") ? CORAL : null;
            const clean = w.replace(/^[\^!]/, "");
            return (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block mr-[0.28em]"
                style={c ? { color: c } : undefined}
              >
                {clean}
              </motion.span>
            );
          })}
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className={cn("mt-8 text-lg md:text-xl text-white font-body leading-relaxed max-w-3xl", align === "center" && "mx-auto")}
        >
          {sub}
        </motion.p>
        {children && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-10">
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Btn({ href, children, external, variant = "primary", className = "", onClick, ...rest }) {
  const base = "inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-[#63D2A3] text-black hover:bg-white"
      : "border border-white/20 text-white hover:border-[#63D2A3] hover:text-[#63D2A3]";
  const cls = cn(base, styles, className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}

export function SectionTitle({ eyebrow, title, sub, accent = MINT, center = false, mint, coral }) {
  return (
    <div className={cn("mb-12 md:mb-16", center && "text-center")}>
      {eyebrow && (
        <div className={cn(center && "flex justify-center")}>
          <Eyebrow color={accent}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2 className="text-3xl md:text-6xl font-black tracking-tighter leading-[1.02] text-white max-w-5xl mx-auto md:mx-0" style={center ? { margin: "0 auto" } : undefined}>
        <Marked text={title} mint={mint || accent} coral={coral || CORAL} />
      </h2>
      {sub && <p className={cn("mt-6 text-base md:text-xl text-white font-body leading-relaxed max-w-3xl", center && "mx-auto")}>{sub}</p>}
    </div>
  );
}

export function Section({ children, className = "", id, tone = "black" }) {
  return (
    <section id={id} className={cn("relative px-6 md:px-16 py-16 md:py-28 overflow-hidden", tone === "dark" ? "bg-[#080808]" : tone === "clear" ? "bg-transparent" : "bg-black", className)}>
      <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export function CardGrid({ items, cols = 3, accent = MINT }) {
  return (
    <div className={cn("grid gap-5 md:gap-6", cols === 4 ? "md:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3")}>
      {items.map((it, i) => (
        <Reveal key={it.title} delay={(i % 4) * 0.08}>
          <div className="group relative h-full rounded-3xl border border-white/10 bg-[#0e0e0e] p-7 md:p-8 transition-all duration-300 hover:border-white/25 hover:bg-[#151515] overflow-hidden">
            <span className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: accent }} />
            <span className="block text-sm font-black tracking-widest mb-6" style={{ color: accent }}>
              {it.tag || String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-tight mb-3">{it.title}</h3>
            <p className="font-body text-base text-white leading-relaxed">{it.description}</p>
            {it.href && (
              <Link href={it.href} className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: accent }}>
                {it.linkText || "Read the case study"} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Steps({ steps, accent = MINT }) {
  return (
    <div className="relative grid gap-5">
      <div className="absolute left-[27px] top-6 bottom-6 w-px bg-white/10 hidden md:block" aria-hidden="true" />
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.1}>
          <div className="relative grid md:grid-cols-[56px_1fr] gap-5 rounded-3xl border border-white/10 bg-[#0e0e0e] p-6 md:p-8">
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border bg-black font-mono text-sm font-black" style={{ borderColor: accent, color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="text-lg md:text-2xl font-black text-white tracking-tight">{s.title}</h3>
              {s.body && <p className="mt-3 font-body text-base md:text-lg text-white leading-relaxed">{s.body}</p>}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ProductTieIn({ headline, body, cta = "See our products", href = "/products", tone = "black" }) {
  return (
    <Section tone={tone} className="!py-12 md:!py-20">
      <Reveal>
        <div className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/60 mb-3">Product Portfolio</p>
            <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-4">{headline}</h3>
            <p className="font-body text-base md:text-lg text-white leading-relaxed">{body}</p>
          </div>
          <Link href={href} className="inline-flex shrink-0 items-center gap-3 text-xs font-black uppercase tracking-widest text-[#63D2A3] hover:text-white transition-colors">
            {cta} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </Section>
  );
}

export function CtaBand({ headline, sub, primary, secondary, extra }) {
  return (
    <section data-seamless-end className="relative px-6 pt-20 pb-12 md:pt-32 md:pb-16 text-center overflow-hidden bg-black hide-floating-cta">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,210,163,0.15),transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-[0.98] text-white mb-6">
          <Marked text={headline} />
        </h2>
        {sub && <p className="text-lg md:text-xl text-white font-body mb-10">{sub}</p>}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {primary && <Btn {...primary}>{primary.label}</Btn>}
          {secondary && <Btn variant="ghost" {...secondary}>{secondary.label}</Btn>}
        </div>
        {extra}
      </div>
    </section>
  );
}

export function QmoMark({ className = "h-5" }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/qmo-wordmark-white.svg" alt="Qmo" className={className} />;
}

export function GrdrMark({ className = "text-xl" }) {
  return (
    <span className={cn("font-black tracking-tight text-white", className)} aria-label="Grdr">
      Grdr<span style={{ color: GRDR_CYAN }}>.</span>
    </span>
  );
}

// ---------- Letter-split headline (animates each letter, keeps words unbroken) ----------
export function SplitLetters({ text, className = "", delay = 0, stagger = 0.025 }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <span className={className} aria-label={text.replace(/[\^!]/g, "")}>
      {text.split(" ").map((w, wi) => {
        const c = w.startsWith("^") ? MINT : w.startsWith("!") ? CORAL : null;
        const clean = w.replace(/^[\^!]/, "");
        return (
          <span key={wi} className="inline-block whitespace-nowrap mr-[0.28em]" aria-hidden="true" style={c ? { color: c } : undefined}>
            {clean.split("").map((ch, ci) => {
              const d = delay + n++ * stagger;
              return (
                <motion.span
                  key={ci}
                  className="inline-block"
                  initial={reduce ? false : { opacity: 0, y: "0.5em", rotateX: -60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.55, delay: d, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

// ---------- White section kit (deck pattern) ----------
export const GREEN_ON_WHITE = "#63D2A3";

export function WhiteSection({ children, className = "", id, tone = "white" }) {
  return (
    <section id={id} className={cn("relative px-6 md:px-16 py-16 md:py-28 overflow-hidden text-black", tone === "grey" ? "bg-white border-t border-black/[0.06]" : "bg-white", className)}>
      <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

export function WhiteTitle({ eyebrow, title, sub, center = false, className = "" }) {
  return (
    <div className={cn("mb-10 md:mb-14", center && "text-center", className)}>
      {eyebrow && (
        <p className={cn("mb-4 text-[12px] md:text-[13px] font-black uppercase tracking-[0.3em]", center && "text-center")} style={{ color: GREEN_ON_WHITE }}>{eyebrow}</p>
      )}
      <h2 className={cn("text-3xl md:text-6xl font-black tracking-tighter leading-[1.02] text-black max-w-5xl", center && "mx-auto")}>
        {title.split(" ").map((w, i) => {
          const g = w.startsWith("^");
          return <span key={i} style={g ? { color: GREEN_ON_WHITE } : undefined}>{w.replace(/^[\^!]/, "")}{" "}</span>;
        })}
      </h2>
      {sub && <p className={cn("mt-5 text-base md:text-xl text-[#5A5A5A] font-body leading-relaxed max-w-3xl", center && "mx-auto")}>{sub}</p>}
    </div>
  );
}

export function NumDot({ n, variant = "mint", className = "" }) {
  const mint = variant === "mint";
  return (
    <span
      className={cn("inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-black text-sm tabular-nums", className)}
      style={mint ? { background: MINT, color: "#000" } : { background: "#000", color: MINT }}
    >
      {typeof n === "number" ? String(n).padStart(2, "0") : n}
    </span>
  );
}

export function CoralPill({ children, className = "" }) {
  return (
    <span className={cn("inline-block rounded-full px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-white", className)} style={{ background: CORAL }}>
      {children}
    </span>
  );
}

export function LightCard({ children, dark = false, className = "", ...rest }) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-7 md:p-8 transition-all duration-300",
        dark ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10 text-black hover:border-black/30 hover:-translate-y-0.5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

// ---------- Swipe slider (native scroll-snap + drag + arrows + progress) ----------
export function SwipeSlider({ children, dark = true, label = "Slides" }) {
  const ref = useRef(null);
  const [p, setP] = React.useState(0);
  const drag = useRef({ down: false, x: 0, left: 0, moved: false });
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setP(max > 0 ? el.scrollLeft / max : 1);
  };
  const by = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 440), behavior: "smooth" });
  };
  const col = dark ? "#fff" : "#000";
  const [hover, setHover] = React.useState(false);
  const [down, setDown] = React.useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cx = useSpring(mx, { damping: 25, stiffness: 400 });
  const cy = useSpring(my, { damping: 25, stiffness: 400 });
  return (
    <div
      role="region"
      aria-label={label}
      className="relative md:cursor-none"
      onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX - r.left); my.set(e.clientY - r.top); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
    >
      <motion.div
        aria-hidden="true"
        style={{ left: cx, top: cy, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: hover ? (down ? 0.9 : 1) : 0, opacity: hover ? 1 : 0 }}
        className="pointer-events-none absolute z-30 hidden md:flex h-28 w-28 flex-col items-center justify-center rounded-full border-2 border-white/30 shadow-[0_0_50px_rgba(99,210,163,0.55)]"
      >
        <div className="absolute inset-0 rounded-full" style={{ background: MINT }} />
        <div className="relative flex items-center gap-1.5 text-black">
          <ArrowLeft size={14} strokeWidth={4} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/m2c-icon.png" alt="" className="h-9 w-9 object-contain mix-blend-multiply" />
          <ArrowRight size={14} strokeWidth={4} />
        </div>
        <span className="relative mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-black">Swipe</span>
      </motion.div>
      <div
        ref={ref}
        onScroll={onScroll}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") return;
          drag.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d.down) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 4) d.moved = true;
          ref.current.style.scrollSnapType = "none";
          ref.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => { drag.current.down = false; if (ref.current) ref.current.style.scrollSnapType = ""; }}
        onPointerLeave={() => { drag.current.down = false; if (ref.current) ref.current.style.scrollSnapType = ""; }}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing"
        tabIndex={0}
      >
        {React.Children.map(children, (c) => (
          <div className="snap-start shrink-0 w-[82%] sm:w-[52%] lg:w-[34%]">{c}</div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-5">
        <div className="relative h-px flex-1" style={{ background: dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}>
          <div className="absolute left-0 top-[-1px] h-[3px]" style={{ width: `${Math.max(8, p * 100)}%`, background: MINT, transition: "width 150ms" }} />
        </div>
        <div className="flex gap-2 md:cursor-auto">
          <button aria-label="Previous" onClick={() => by(-1)} className="h-10 w-10 rounded-full border flex items-center justify-center transition-colors hover:bg-[#63D2A3] hover:border-[#63D2A3] hover:text-black" style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", color: col }}>
            <ArrowRight className="h-4 w-4 rotate-180" />
          </button>
          <button aria-label="Next" onClick={() => by(1)} className="h-10 w-10 rounded-full border flex items-center justify-center transition-colors hover:bg-[#63D2A3] hover:border-[#63D2A3] hover:text-black" style={{ borderColor: dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)", color: col }}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}


// ---------- Hero backgrounds (ported from the original service pages) ----------
const WaveField = dynamic(() => import("@/components/ui/wave-background").then((m) => ({ default: m.Waves })), { ssr: false });

// Sales Enablement hero: interactive flowing wave field across the whole banner, hairlines top and bottom.
export function WaveHeroBg({ color = MINT }) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-0 left-0 w-full h-px bg-white/20 z-10" />
      <WaveField strokeColor={color} backgroundColor="black" className="opacity-50" />
      <div className="absolute -top-40 -right-40 h-[760px] w-[760px] rounded-full blur-[150px] opacity-[0.22]" style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/20 z-10" />
    </div>
  );
}

// Implementations hero: soft ambient glows (mint left, coral right).
export function GlowHeroBg() {
  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute top-1/3 left-0 w-[700px] h-[700px] rounded-full blur-[160px] opacity-[0.10]" style={{ background: MINT }} />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08]" style={{ background: CORAL }} />
    </div>
  );
}

// Custom Buildouts hero: animated mesh gradient (desktop only) plus a pulsing glow.
const MeshGradient = dynamic(() => import("@paper-design/shaders-react").then((m) => ({ default: m.MeshGradient })), { ssr: false });
export function MeshHeroBg() {
  const [desktop, setDesktop] = React.useState(false);
  React.useEffect(() => {
    const check = () => setDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-black" aria-hidden="true">
      {desktop ? (
        <MeshGradient className="w-full h-full absolute inset-0 opacity-40" colors={["#000000", "#0a0a0a", MINT, "#000000"]} speed={0.8} />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_30%,rgba(99,210,163,0.10)_0%,transparent_70%)]" />
      )}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] animate-pulse opacity-[0.12]" style={{ background: MINT, animationDuration: "10s" }} />
    </div>
  );
}
