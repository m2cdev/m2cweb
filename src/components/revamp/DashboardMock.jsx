"use client";

import React from "react";

const stats = [
  { label: "Pipeline", value: "$2.4M", change: "+18%" },
  { label: "Active Deals", value: "47", change: "+6" },
  { label: "Velocity", value: "12d", change: "-3d" },
  { label: "Win Rate", value: "34%", change: "+7%" },
];
const deals = [
  { name: "Sample Account A", stage: "Proposal", value: "$84K", owner: "AB", health: "high" },
  { name: "Sample Account B", stage: "Qualified", value: "$210K", owner: "CD", health: "high" },
  { name: "Sample Account C", stage: "Negotiation", value: "$47K", owner: "AB", health: "mid" },
];

export default function DashboardMock() {
  return (
    <div className="relative w-full rounded-[1.2rem] overflow-hidden border border-[#63D2A3]/30 shadow-[0_0_60px_rgba(99,210,163,0.18),0_32px_64px_rgba(0,0,0,0.8)]" aria-hidden="true">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/10">
        <div className="w-3 h-3 rounded-full bg-[#FF6B6B]/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
        <div className="w-3 h-3 rounded-full bg-[#63D2A3]/80" />
        <div className="ml-4 flex-1 bg-white/10 rounded-full h-5 max-w-[180px]" />
      </div>
      <div className="bg-[#0f0f0f] p-3 space-y-2">
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5">
              <p className="text-white/50 text-[9px] uppercase tracking-widest font-black mb-1">{s.label}</p>
              <p className="text-white text-base font-black tracking-tight leading-none">{s.value}</p>
              <p className="text-[#63D2A3] text-[10px] font-bold mt-0.5">{s.change}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2">
          <p className="text-white/60 text-[9px] font-black uppercase tracking-widest mb-1.5">Pipeline Stages</p>
          <div className="flex h-2 rounded-full overflow-hidden gap-px">
            <div className="bg-[#63D2A3] rounded-l-full" style={{ width: "28%" }} />
            <div className="bg-[#63D2A3]/60" style={{ width: "22%" }} />
            <div className="bg-[#63D2A3]/35" style={{ width: "18%" }} />
            <div className="bg-[#FF6B6B]/60" style={{ width: "14%" }} />
            <div className="bg-white/15 rounded-r-full" style={{ width: "18%" }} />
          </div>
        </div>
        <div className="bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden">
          <div className="px-3 py-1.5 border-b border-white/5">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Active Deals</p>
          </div>
          {deals.map((d) => (
            <div key={d.name} className="flex items-center gap-3 px-3 py-2 border-b border-white/[0.04] last:border-0">
              <div className="w-6 h-6 rounded-md bg-[#63D2A3]/10 border border-[#63D2A3]/20 flex items-center justify-center shrink-0">
                <span className="text-[8px] font-black text-[#63D2A3]">{d.owner}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[11px] font-bold truncate leading-none">{d.name}</p>
                <p className="text-white/40 text-[9px] mt-0.5">{d.stage}</p>
              </div>
              <p className="text-white text-[11px] font-black shrink-0">{d.value}</p>
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${d.health === "high" ? "bg-[#63D2A3]" : "bg-yellow-400"}`} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-2">Workflow Triggers</p>
            {[{ e: "Lead enriched, synced to CRM", t: "2m" }, { e: "Deal stall alert fired", t: "8m" }].map((x) => (
              <div key={x.e} className="flex items-center gap-1.5 mb-1.5 last:mb-0">
                <div className="w-1 h-1 rounded-full bg-[#63D2A3] shrink-0" />
                <p className="text-white/70 text-[9px] flex-1 truncate">{x.e}</p>
                <p className="text-white/30 text-[8px] shrink-0">{x.t}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-2.5">
            <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-2">Conversion Rate</p>
            <div className="flex items-end gap-0.5 h-8">
              {[40, 55, 45, 65, 58, 72, 68, 80, 75, 88].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: i === 9 ? "#63D2A3" : `rgba(99,210,163,${0.15 + i * 0.07})` }} />
              ))}
            </div>
            <p className="text-[#63D2A3] text-[10px] font-black mt-1.5">Trending up this quarter</p>
          </div>
        </div>
      </div>
    </div>
  );
}
