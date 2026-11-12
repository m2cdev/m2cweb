"use client";

// Shared building blocks for the Qmo and Grdr pages. Nothing here uses Map2Close
// colours, fonts or layout; each page passes its own brand tokens.

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Plus } from "lucide-react";
import { trackProductCta, withUtm } from "./track";

export const QMO = {
  yellow: "#FFC801", ink: "#0B0B0C", mist: "#F4F5F3", line: "#E3E5E2", stone: "#9AA19D", slate: "#5C615E", coral: "#F96B6B", wash: "#FFF8DB",
  raised: "#161817", lineDark: "#242725",
};
export const GRDR = { cyan: "#00D1FF", bg: "#0B0F0E", surface: "#1A1F1E", line: "rgba(255,255,255,0.10)" };

export const THEMES = {
  qmo: {
    id: "qmo", accent: QMO.yellow, accentInk: QMO.ink, radius: "16px", btnRadius: "12px",
    head: "var(--font-urbanist), 'Urbanist', system-ui, sans-serif", body: "var(--font-geist), 'Geist', system-ui, sans-serif",
    headWeight: 800,
    base: { bg: QMO.ink, fg: QMO.mist, muted: QMO.stone, card: QMO.raised, line: QMO.lineDark, accentText: QMO.yellow },
    alt: { bg: QMO.raised, fg: QMO.mist, muted: QMO.stone, card: QMO.ink, line: QMO.lineDark, accentText: QMO.yellow },
    light: { bg: "#FFFFFF", fg: QMO.ink, muted: QMO.slate, card: QMO.mist, line: QMO.line, accentText: QMO.ink, hl: true },
    mist: { bg: QMO.mist, fg: QMO.ink, muted: QMO.slate, card: "#FFFFFF", line: QMO.line, accentText: QMO.ink, hl: true },
    yellow: { bg: QMO.yellow, fg: QMO.ink, muted: "#1a1a1a", card: QMO.ink, line: "rgba(11,11,12,0.2)", accentText: QMO.ink },
  },
  grdr: {
    id: "grdr", accent: GRDR.cyan, accentInk: GRDR.bg, radius: "6px", btnRadius: "2px",
    head: "Satoshi, system-ui, sans-serif", body: "Satoshi, system-ui, sans-serif", headWeight: 900,
    base: { bg: GRDR.bg, fg: "#FFFFFF", muted: "rgba(255,255,255,0.68)", card: GRDR.surface, line: GRDR.line, accentText: GRDR.cyan },
    alt: { bg: GRDR.surface, fg: "#FFFFFF", muted: "rgba(255,255,255,0.68)", card: GRDR.bg, line: GRDR.line, accentText: GRDR.cyan },
  },
};
THEMES.grdr.light = THEMES.grdr.alt;
THEMES.grdr.mist = THEMES.grdr.base;
THEMES.grdr.yellow = { ...THEMES.grdr.base, bg: GRDR.cyan, fg: GRDR.bg, muted: "rgba(11,15,14,0.78)", card: GRDR.bg, line: "rgba(11,15,14,0.25)", accentText: GRDR.bg };

const Ctx = React.createContext(THEMES.qmo);
const ToneCtx = React.createContext(THEMES.qmo.base);
export const useTheme = () => React.useContext(Ctx);
export const useTone = () => React.useContext(ToneCtx);

export function BrandRoot({ theme, className = "", children }) {
  const th = THEMES[theme];
  return (
    <Ctx.Provider value={th}>
      <div className={`hide-floating-cta relative min-h-screen overflow-x-clip ${className}`} style={{ background: th.base.bg, color: th.base.fg, fontFamily: th.body }}>
        {children}
      </div>
    </Ctx.Provider>
  );
}

export function Rise({ children, delay = 0, y = 18, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// Band: a full-width section in one of the brand's tones.
export function Band({ tone = "base", id, children, className = "", pad = "py-20 md:py-28" }) {
  const th = useTheme();
  const t = th[tone];
  return (
    <ToneCtx.Provider value={t}>
      <section id={id} className={`relative overflow-clip px-6 md:px-16 ${pad} ${className}`} style={{ background: t.bg, color: t.fg }}>
        <div className="relative z-10 mx-auto max-w-6xl">{children}</div>
      </section>
    </ToneCtx.Provider>
  );
}

export function Eyebrow({ children, center }) {
  const th = useTheme();
  const t = useTone();
  return (
    <p className={`mb-4 ${center ? "text-center" : ""}`}>
      <span
        className="inline-block text-[12px] md:text-[13px] uppercase"
        style={{ color: t.accentText, fontFamily: th.body, fontWeight: 600, letterSpacing: th.id === "grdr" ? "0.22em" : "0.14em", ...(t.hl ? { background: QMO.yellow, padding: "3px 10px", borderRadius: 6 } : null) }}
      >
        {children}
      </span>
    </p>
  );
}

export function H2({ eyebrow, title, sub, center, className = "" }) {
  const th = useTheme();
  const t = useTone();
  return (
    <div className={`mb-10 md:mb-14 ${center ? "text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className={`text-3xl md:text-5xl leading-[1.05] tracking-tight ${center ? "mx-auto" : ""} max-w-4xl`} style={{ fontFamily: th.head, fontWeight: th.headWeight }}>
        {title.split(" ").map((w, i) => (
          <span key={i} style={w.startsWith("^") ? (t.hl ? { backgroundImage: `linear-gradient(transparent 62%, ${QMO.yellow} 62%)`, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" } : { color: t.accentText }) : undefined}>{w.replace(/^\^/, "")}{" "}</span>
        ))}
      </h2>
      {sub && <p className={`mt-5 max-w-2xl text-base md:text-lg leading-relaxed ${center ? "mx-auto" : ""}`} style={{ color: t.muted }}>{sub}</p>}
    </div>
  );
}

export function Card({ children, className = "", featured = false, style }) {
  const th = useTheme();
  const t = useTone();
  const s = featured
    ? { background: th.accent, color: th.accentInk, border: `1px solid ${th.accent}` }
    : { background: t.card, border: `1px solid ${t.line}`, color: t.fg };
  return <div className={`h-full p-7 md:p-8 ${className}`} style={{ borderRadius: th.radius, ...s, ...style }}>{children}</div>;
}

// Buttons: Qmo = rounded rectangle, hover swaps fill and text (no lift); Grdr = square corners.
export function BrandBtn({ href, children, variant = "solid", external, product, className = "", onClick }) {
  const th = useTheme();
  const t = useTone();
  const solid = variant === "solid";
  const qmo = th.id === "qmo";
  const ghostBorder = t.line === "#E3E5E2" ? "#C9CCC8" : "rgba(255,255,255,0.28)";
  let style = {
    borderRadius: th.btnRadius, fontFamily: th.body, fontWeight: 600,
    background: solid ? th.accent : "transparent", color: solid ? th.accentInk : t.fg,
    border: solid ? `1px solid ${th.accent}` : `1px solid ${ghostBorder}`,
  };
  let cls = `inline-flex items-center justify-center px-7 py-3.5 text-[15px] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90 ${className}`;
  if (qmo) {
    // fill <-> text swap on hover, driven by CSS variables
    const fill = solid ? th.accent : "transparent";
    const text = solid ? th.accentInk : t.fg;
    const onYellow = t === th.yellow;
    const vars = onYellow
      ? { "--b": QMO.ink, "--f": QMO.yellow, "--bh": QMO.yellow, "--fh": QMO.ink, "--bd": QMO.ink }
      : solid
        ? { "--b": fill, "--f": text, "--bh": QMO.ink, "--fh": QMO.yellow, "--bd": QMO.yellow }
        : { "--b": "transparent", "--f": text, "--bh": t.fg, "--fh": t.bg, "--bd": ghostBorder };
    style = { ...style, ...vars, background: "var(--b)", color: "var(--f)", border: "1.5px solid var(--bd)" };
    cls = `qmo-btn inline-flex items-center justify-center px-7 py-3.5 text-[15px] transition-colors duration-200 hover:!bg-[var(--bh)] hover:!text-[var(--fh)] ${className}`;
  }
  if (external) {
    return (
      <a href={withUtm(href)} target="_blank" rel="noopener noreferrer" className={cls} style={style}
        onClick={() => { trackProductCta(product, typeof children === "string" ? children : product); onClick?.(); }}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls} style={style} onClick={onClick}>{children}</Link>;
}

export function ProductToggle({ active }) {
  const th = useTheme();
  const tabs = [
    { id: "qmo", label: "Qmo", href: "/products/qmo", color: QMO.yellow, ink: QMO.ink },
    { id: "grdr", label: "Grdr.", href: "/products/grdr", color: GRDR.cyan, ink: GRDR.bg },
  ];
  const qmo = th.id === "qmo";
  return (
    <nav aria-label="Switch product" className="absolute top-[84px] left-1/2 z-40 -translate-x-1/2">
      <div className="flex gap-1 p-1 backdrop-blur-xl" style={{ background: qmo ? "rgba(11,11,12,0.85)" : "rgba(11,15,14,0.88)", border: `1px solid ${qmo ? QMO.lineDark : GRDR.line}`, borderRadius: qmo ? "14px" : "4px" }}>
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            aria-current={active === t.id ? "page" : undefined}
            className="px-6 py-1.5 text-sm transition-all"
            style={{ borderRadius: qmo ? "10px" : "2px", fontFamily: th.body, fontWeight: 700, ...(active === t.id ? { background: t.color, color: t.ink } : { color: "rgba(255,255,255,0.7)" }) }}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// "Better together": kept on both pages.
export function Together({ tone = "alt" }) {
  const th = useTheme();
  const cols = [
    ["People", "Our coaching sticks because the product puts it in front of reps on every live call."],
    ["Process", "Your playbook becomes Q Cards and Grdr rubrics, so the process gets graded, not just written down."],
    ["Platforms", "Both products sit on top of your existing CRM. We wire them in as part of the build."],
  ];
  return (
    <Band tone={tone}>
      <H2 eyebrow="Better together" title="Run Them Yourself, or Let Us Run Them ^With You." />
      <div className="grid gap-5 md:grid-cols-3">
        {cols.map(([t, d], i) => (
          <Rise key={t} delay={i * 0.1} className="h-full">
            <Card>
              <h3 className="text-2xl" style={{ fontFamily: th.head, fontWeight: th.headWeight }}>{t}</h3>
              <p className="mt-3 text-base md:text-lg leading-relaxed opacity-80">{d}</p>
            </Card>
          </Rise>
        ))}
      </div>
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <BrandBtn href="/contact">Book a Working Session</BrandBtn>
        <p className="text-sm opacity-70">Qmo and Grdr work on their own. You never need a Map2Close engagement to use them.</p>
      </div>
    </Band>
  );
}

// FAQ: centred and wide.
export function Faq({ faqs, tone = "light" }) {
  const th = useTheme();
  const [open, setOpen] = useState(0);
  return (
    <Band tone={tone}>
      <div className="mx-auto w-full max-w-5xl">
        <H2 center eyebrow="FAQ" title="Common ^Questions" />
        <FaqList faqs={faqs} open={open} setOpen={setOpen} th={th} />
      </div>
    </Band>
  );
}

function FaqList({ faqs, open, setOpen, th }) {
  const t = useTone();
  return (
    <div className="w-full border-y" style={{ borderColor: t.line }}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b last:border-b-0" style={{ borderColor: t.line }}>
            <button className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={isOpen} aria-controls={`faq-${th.id}-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
              <span className="text-lg md:text-xl" style={{ fontFamily: th.head, fontWeight: th.id === "qmo" ? 800 : 700 }}>{f.q}</span>
              <Plus className="h-5 w-5 shrink-0 transition-transform duration-200" style={{ color: t.hl ? QMO.ink : t.accentText, transform: isOpen ? "rotate(45deg)" : "none" }} />
            </button>
            <div id={`faq-${th.id}-${i}`} role="region" className="grid transition-all duration-[250ms]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="pb-6 text-base md:text-lg leading-relaxed" style={{ color: t.muted }}>{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Faint square grid used behind dark heroes (both product sites use it).
export function Grid({ opacity = 0.05, fade = "bottom" }) {
  const line = `rgba(255,255,255,${opacity * 0.5})`;
  const mask = fade === "bottom" ? "linear-gradient(to bottom, #000 45%, transparent 95%)" : "radial-gradient(ellipse 80% 70% at 50% 30%, #000 20%, transparent 100%)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`, backgroundSize: "64px 64px", backgroundPosition: "center top", maskImage: mask, WebkitMaskImage: mask }} />
  );
}
