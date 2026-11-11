"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Reveal, Section, SectionTitle, WhiteSection, WhiteTitle, Btn, Marked, QMO_YELLOW, GRDR_CYAN, MINT, GREEN_ON_WHITE } from "./ui";
import ProductCta from "./ProductCta";

export function ProductToggle({ active }) {
  const tabs = [
    { id: "qmo", label: "Qmo", href: "/products/qmo", color: QMO_YELLOW },
    { id: "grdr", label: "Grdr", href: "/products/grdr", color: GRDR_CYAN },
  ];
  return (
    <nav aria-label="Switch product" className="fixed top-[84px] left-1/2 z-40 -translate-x-1/2">
      <div className="flex gap-1 rounded-full border border-white/15 bg-black/80 p-1 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        {tabs.map((t) => (
          <Link
            key={t.id}
            href={t.href}
            aria-current={active === t.id ? "page" : undefined}
            className="rounded-full px-6 py-1.5 text-sm font-bold transition-all"
            style={active === t.id ? { background: t.color, color: "#000" } : { color: "rgba(255,255,255,0.7)" }}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export function Together({ tone = "black" }) {
  const cols = [
    ["People", "Our coaching sticks because the product puts it in front of reps on every live call."],
    ["Process", "Your playbook becomes Q Cards and Grdr rubrics, so the process gets graded, not just written down."],
    ["Platforms", "Both products sit on top of your existing CRM. We wire them in as part of the build."],
  ];
  const white = tone === "white";
  const Wrap = white ? WhiteSection : Section;
  return (
    <Wrap tone={white ? "grey" : "dark"}>
      {white ? (
        <WhiteTitle eyebrow="Better together" title="Run Them Yourself, or Let Us Run Them ^With You." />
      ) : (
        <SectionTitle eyebrow="Better together" title="Run Them Yourself, or Let Us Run Them ^With You." />
      )}
      <div className="grid gap-5 md:grid-cols-3">
        {cols.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className={`h-full rounded-3xl border p-8 ${white ? "bg-white border-black/10" : "border-white/10 bg-[#0e0e0e]"}`}>
              <h3 className="text-2xl font-black" style={{ color: white ? GREEN_ON_WHITE : MINT }}>{t}</h3>
              <p className={`mt-3 font-body text-base md:text-lg leading-relaxed ${white ? "text-[#4D4D4D]" : "text-white"}`}>{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Btn href="/contact">Book a Working Session</Btn>
        <p className={`mt-5 text-sm ${white ? "text-[#5C5C5C]" : "text-white/70"}`}>Qmo and Grdr work on their own. You never need a Map2Close engagement to use them.</p>
      </div>
    </Wrap>
  );
}

export function Faq({ faqs, tone = "black" }) {
  const [open, setOpen] = useState(0);
  const white = tone === "white";
  const Wrap = white ? WhiteSection : Section;
  return (
    <Wrap>
      {white ? <WhiteTitle eyebrow="FAQ" title="Common ^Questions" /> : <SectionTitle eyebrow="FAQ" title="Common ^Questions" />}
      <div className={`max-w-3xl divide-y border-y ${white ? "divide-black/10 border-black/10" : "divide-white/10 border-white/10"}`}>
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button className="flex w-full items-center justify-between gap-6 py-6 text-left" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className={`text-lg md:text-xl font-bold ${white ? "text-black" : "text-white"}`}>{f.q}</span>
                <Plus className="h-5 w-5 shrink-0 transition-transform duration-250" style={{ color: white ? GREEN_ON_WHITE : MINT, transform: isOpen ? "rotate(45deg)" : "none" }} />
              </button>
              <div id={`faq-${i}`} role="region" className="grid transition-all duration-[250ms]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className={`pb-6 font-body text-base md:text-lg leading-relaxed ${white ? "text-[#4D4D4D]" : "text-white/90"}`}>{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrap>
  );
}

// "One Conversation. No Commitment." band: only this page's product CTA.
export function FinalCta({ product }) {
  const cfg = product === "qmo"
    ? { href: "https://heyqmo.com/", label: "Explore Qmo", accent: QMO_YELLOW }
    : { href: "https://grdr.app/", label: "Get a Free Grade", accent: GRDR_CYAN };
  return (
    <section className="relative px-6 pt-20 pb-12 md:pt-32 md:pb-16 text-center overflow-hidden bg-black hide-floating-cta">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(99,210,163,0.15),transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.98] text-white mb-6">One Conversation. No <span className="text-[#63D2A3]">Commitment.</span></h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <ProductCta product={product} href={cfg.href} accent={cfg.accent}>{cfg.label}</ProductCta>
        </div>
        <Link href="/contact" className="mt-8 text-sm font-black uppercase tracking-widest text-[#63D2A3] hover:text-white transition-colors">Or talk to Map2Close about your whole motion &rarr;</Link>
      </div>
    </section>
  );
}
