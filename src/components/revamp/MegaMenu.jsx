"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { QmoMark, GrdrMark, QMO_YELLOW, GRDR_CYAN } from "./ui";

const left = [
  { name: "People", href: "/what-we-do/people", blurb: "Coaching, Cold Call Labs and manager enablement that changes how reps sell.", tint: "rgba(98,210,162,0.08)" },
  { name: "Process", href: "/what-we-do/process", blurb: "Playbooks, handoffs and pipeline rituals your team can actually run.", tint: "rgba(98,210,162,0.08)" },
  { name: "Platforms", href: "/what-we-do/platforms", blurb: "CRM, automation and custom builds wired around how deals move.", tint: "rgba(98,210,162,0.08)" },
];
const right = [
  { name: "Qmo", href: "/products/qmo", blurb: "Live AI coaching on every call, right inside your CRM.", tint: "rgba(255,200,1,0.10)", badge: "NEW", mark: <QmoMark className="h-4" />, color: QMO_YELLOW },
  { name: "Grdr", href: "/products/grdr", blurb: "Grade every cold call and deal in seconds.", tint: "rgba(0,209,255,0.10)", mark: <GrdrMark className="text-base" />, color: GRDR_CYAN },
];

const item = (reduce, i) => ({
  initial: reduce ? false : { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: reduce ? 0 : 0.04 * i, duration: 0.22 },
});

function Row({ it, i, reduce, onNavigate }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div {...item(reduce, i)}>
      <Link
        href={it.href}
        onClick={onNavigate}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors duration-200"
        style={{ background: hover ? it.tint : "transparent" }}
      >
        <span className="block">
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            {it.mark || it.name}
            {it.badge && <span className="rounded-full px-1.5 py-0.5 text-[9px] font-black tracking-wider text-white" style={{ background: "#F96B6B" }}>{it.badge}</span>}
          </span>
          <span className="mt-1 block text-[13px] leading-snug text-white/70">{it.blurb}</span>
        </span>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/50 transition-transform duration-200 group-hover:translate-x-1" style={hover && it.color ? { color: it.color } : undefined} />
      </Link>
    </motion.div>
  );
}

export function MegaMenu({ open, setOpen, active, label, href }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  // Esc closes and returns focus; Tab is trapped inside the open panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      } else if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll("a[href], button");
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        const cur = document.activeElement;
        if (e.shiftKey && (cur === first || cur === triggerRef.current)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && cur === last) { e.preventDefault(); triggerRef.current?.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  return (
    <>
      <div className="flex items-center">
        <Link
          href={href}
          className={cn("text-sm font-medium transition-colors duration-300", active ? "text-primary" : "text-white hover:text-[#F96B6B]")}
        >
          {label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls="what-we-do-menu"
          aria-label={`${label} menu`}
          onClick={() => setOpen(!open)}
          className="ml-1 rounded p-0.5 text-white/60 hover:text-white"
        >
          <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            ref={panelRef}
            id="what-we-do-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4"
          >
            <div className="grid w-[640px] max-w-[92vw] grid-cols-[1fr_auto_1fr] rounded-2xl border border-white/10 bg-black p-3 shadow-2xl">
              <div>
                <p className="px-4 pb-2 pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#62D2A2]">The Map2Close Experience</p>
                {left.map((it, i) => <Row key={it.name} it={it} i={i} reduce={reduce} onNavigate={() => setOpen(false)} />)}
                <Link href="/what-we-do" onClick={() => setOpen(false)} className="mx-4 mt-3 mb-1 inline-block text-xs font-bold text-white/70 hover:text-[#62D2A2]">How it works together &rarr;</Link>
              </div>
              <div className="mx-3 w-px bg-white/10" aria-hidden="true" />
              <div>
                <p className="px-4 pb-2 pt-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#62D2A2]">Product Portfolio</p>
                {right.map((it, i) => <Row key={it.name} it={it} i={i + left.length} reduce={reduce} onNavigate={() => setOpen(false)} />)}
                <Link href="/products" onClick={() => setOpen(false)} className="mx-4 mt-3 mb-1 inline-block text-xs font-bold text-white/70 hover:text-[#62D2A2]">See all products &rarr;</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function MobileWhatWeDo({ label, href, pathname, onNavigate }) {
  const [open, setOpen] = useState(false);
  const groups = [
    { title: "The Map2Close Experience", links: left.map((l) => ({ name: l.name, href: l.href })).concat([{ name: "How it works together", href: "/what-we-do" }]) },
    { title: "Product Portfolio", links: [{ name: "Qmo", href: "/products/qmo" }, { name: "Grdr", href: "/products/grdr" }, { name: "See all products", href: "/products" }] },
  ];
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Link href={href} onClick={onNavigate} className={cn("text-2xl font-bold", pathname.startsWith("/what-we-do") ? "text-primary" : "text-white")}>
          {label}
        </Link>
        <button type="button" aria-expanded={open} aria-label={`${label} sections`} onClick={() => setOpen(!open)} className="p-2 text-white/70">
          <ChevronDown className={cn("h-5 w-5 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="ml-4 flex flex-col gap-6 border-l border-white/10 pl-6 my-2">
          {groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3">
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#62D2A2]">{g.title}</p>
              {g.links.map((l) => (
                <Link key={l.href + l.name} href={l.href} onClick={onNavigate} className="text-lg text-white/80 hover:text-[#F96B6B]">{l.name}</Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
