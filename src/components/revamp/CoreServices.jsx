"use client";

import React from "react";
import { motion } from "framer-motion";
import { WhiteSection, CoralPill, NumDot, Reveal, MINT } from "./ui";
import { CORE_SERVICES } from "./coreServices";

// Short, horizontal core services block: a 5 x 2 grid on desktop, 2 columns on tablets and phones.
// `highlight` flips one card to solid black, the way the decks do.
export default function CoreServices({ page, id, headline = "Core Services", highlight = 0, aside = null }) {
  const { pill, intro, items } = CORE_SERVICES[page];
  return (
    <WhiteSection id={id}>
      <div className="mb-8 md:mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          {pill && <CoralPill>{pill}</CoralPill>}
          <h2 className={`${pill ? "mt-5 " : ""}text-3xl md:text-5xl font-black tracking-tighter leading-[1.04] text-black`}>
            {headline}
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#5A5A5A] font-body leading-relaxed">{intro}</p>
        </div>
        {aside}
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 md:gap-4">
        {items.map(([title, d], i) => {
          const on = i === highlight;
          return (
            <Reveal key={title} delay={(i % 5) * 0.05} y={14} className="h-full">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`relative h-full rounded-2xl border p-4 md:p-5 flex flex-col ${on ? "bg-black border-black text-white" : "bg-[#F2F2F2] border-black/10 text-black"}`}
              >
                <NumDot n={i + 1} variant={on ? "mint" : "black"} className="!h-9 !w-9 !text-xs" />
                <h3 className="mt-4 text-[15px] md:text-base font-black tracking-tight leading-snug">{title}</h3>
                <p className={`mt-2 font-body text-[13px] leading-relaxed ${on ? "text-white/85" : "text-[#5A5A5A]"}`}>{d}</p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </WhiteSection>
  );
}
