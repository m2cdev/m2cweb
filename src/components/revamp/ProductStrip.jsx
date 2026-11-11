"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, QmoMark, GrdrMark, QMO_YELLOW, GRDR_CYAN } from "./ui";

export default function ProductStrip({ title = "Powered by what we built", showHeading = true }) {
  const cards = [
    { href: "/products/qmo", color: QMO_YELLOW, mark: <QmoMark className="h-7" />, line: "Live AI coaching on every call, right inside your CRM." },
    { href: "/products/grdr", color: GRDR_CYAN, mark: <GrdrMark className="text-3xl" />, line: "Grade every cold call and deal in seconds." },
  ];
  return (
    <div>
      {showHeading && <h3 className="text-2xl md:text-5xl font-black tracking-tighter text-white mb-10">{title}</h3>}
      <div className="grid gap-5 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.href} delay={i * 0.1}>
            <Link
              href={c.href}
              className="group relative block h-full rounded-3xl border border-white/10 bg-[#0e0e0e] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1"
              style={{ "--accent": c.color }}
            >
              <span className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: `0 0 0 1px ${c.color}, 0 0 40px ${c.color}22` }} />
              <div className="mb-6 h-9 flex items-center">{c.mark}</div>
              <p className="font-body text-lg md:text-xl text-white leading-relaxed mb-6">{c.line}</p>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: c.color }}>
                Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
