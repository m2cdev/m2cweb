"use client";

import React from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";
import QmoDemo from "./QmoDemo";
import { QMO_FAQS } from "./faqs";
import { BrandRoot, Band, H2, Card, BrandBtn, ProductToggle, Together, Faq, Rise, Grid, useTheme, QMO } from "./brand";

const urbanist = localFont({ src: "../../../public/fonts/urbanist-latin-wght-normal.woff2", weight: "100 900", variable: "--font-urbanist", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const origin = [
  { t: "Built for the sales teams we work with.", d: "Qmo comes out of coaching real B2B teams: the live moments where deals are won or lost." },
  { t: "Proven on real calls.", d: "Every card and rubric was tuned on live dials and real deals, not demo scripts." },
  { t: "Ready for your team.", d: "It runs on top of your CRM, with or without us in the room." },
];

const features = [
  { t: "Q Cards", d: "Live cards surface the right question, objection handle or close while the call is still winnable." },
  { t: "Q Review", d: "Every call graded against your business context, with the one thing to fix next time. Not generic AI feedback." },
  { t: "Q Library", d: "Your card library is built and improved from your own call recordings. Reps and managers approve or change every card." },
  { t: "The Queue", d: "Power dialer and parallel dialer built in, so reps get more conversations per hour with coaching on every one." },
];

const learns = [
  { t: "Call", d: "Your rep takes a real call. Qmo listens alongside them." },
  { t: "Q Card", d: "The right question, objection handle or close appears while the call is still winnable." },
  { t: "Q Review", d: "The call is graded against your business context, with one thing to fix." },
  { t: "Q Library", d: "Changes your team approves flow back into the library, so the next call starts smarter." },
];

const why = [
  "Call recorders tell you what went wrong after the call. Qmo helps while the call is still winnable.",
  "Generic AI coaching guesses. Qmo grades on your playbook and your business context.",
  "Static playbooks go stale. Q Library learns what works and suggests changes your team approves.",
];
const crms = ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Close"];
const trial = ["2 seats", "100 enrichments", "Unlimited calls", "Unlimited call grades", "Every feature included"];

const head = { fontFamily: "var(--font-urbanist), 'Urbanist', system-ui, sans-serif", fontWeight: 800 };

// The talking-bubble Q from the Qmo logo, set as a letter in the headline (same geometry as heyqmo.com).
function BubbleQ() {
  const U = 0.72 / 142;
  const [x0, y0, w, h] = [27, 21, 150, 158];
  return (
    <>
      <span className="sr-only">Q</span>
      <svg aria-hidden="true" focusable="false" viewBox={`${x0} ${y0} ${w} ${h}`} style={{ display: "inline-block", width: `${w * U}em`, height: `${h * U}em`, verticalAlign: `${-(y0 + h - 165) * U}em`, marginInline: "0.02em" }}>
        <circle cx="100" cy="94" r="55" fill="none" stroke={QMO.yellow} strokeWidth="32" />
        <path d="M132.1 144.7 L170 174 L150.6 126.3 Z" fill={QMO.yellow} stroke={QMO.yellow} strokeWidth="8" strokeLinejoin="round" />
      </svg>
    </>
  );
}

// Q ring motif: concentric rings that pulse outward behind the mascot.
function Rings() {
  const reduce = useReducedMotion();
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: 260 + i * 120, height: 260 + i * 120, border: `${i === 0 ? 2 : 1}px solid ${QMO.yellow}`, opacity: 0.35 - i * 0.09 }}
          animate={reduce ? undefined : { scale: [1, 1.05, 1], opacity: [0.35 - i * 0.09, 0.15, 0.35 - i * 0.09] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
        />
      ))}
      <span className="absolute rounded-full" style={{ width: 300, height: 300, background: `radial-gradient(closest-side, ${QMO.yellow}30, transparent)` }} />
    </div>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const line = (d) => ({ initial: reduce ? false : { opacity: 0, y: "0.4em" }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d, ease: [0.22, 1, 0.36, 1] } });
  return (
    <section className="relative overflow-hidden px-6 md:px-16 pt-44 pb-20 lg:pb-28" style={{ background: QMO.ink }}>
      <Grid />
      <div aria-hidden="true" className="pointer-events-none absolute -right-72 -top-80 h-[920px] w-[920px]" style={{ background: `radial-gradient(closest-side, ${QMO.yellow}26, ${QMO.yellow}0d 55%, transparent)` }} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-[clamp(2.6rem,7vw,5.6rem)] leading-[1.02] tracking-tight" style={{ ...head, color: QMO.mist }}>
            <motion.span className="block" {...line(0.05)}>The right <BubbleQ /></motion.span>
            <motion.span className="block" {...line(0.18)}>at the right</motion.span>
            <motion.span className="block" style={{ color: QMO.yellow }} {...line(0.31)}>moment.</motion.span>
          </h1>
          <motion.p className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed" style={{ color: QMO.mist }} {...line(0.5)}>
            Live coaching on every call, right inside your CRM. Built for real sales teams.
          </motion.p>
          <motion.div className="mt-10 flex flex-wrap items-center gap-4" {...line(0.65)}>
            <BrandBtn external product="qmo" href="https://heyqmo.com/">Explore Qmo</BrandBtn>
            <BrandBtn variant="ghost" href="#qmo-demo">See a live call</BrandBtn>
          </motion.div>
        </div>
        <div className="relative lg:col-span-5 flex items-center justify-center min-h-[360px] lg:min-h-[520px]">
          <Rings />
          <motion.div className="relative z-10" animate={reduce ? undefined : { y: [0, -8, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>
            <Image src="/brand/qmo/wave.png" alt="" width={1216} height={1071} priority sizes="(min-width:1024px) 420px, 300px" className="h-auto w-[300px] lg:w-[420px] select-none" draggable={false} />
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 bottom-2 left-0 lg:-left-10 w-[250px] md:w-[290px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ background: QMO.mist, color: QMO.ink, borderRadius: 16, borderTop: `4px solid ${QMO.coral}` }}
          >
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#B83A3A" }}>Objection</p>
              <p className="mt-1.5 text-[14px] font-semibold leading-snug" style={{ fontFamily: "var(--font-urbanist), system-ui" }}>Fair enough. What would have to change for this to make the list?</p>
            </div>
          </motion.div>
          <motion.span
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute z-20 right-0 top-6 flex items-center gap-2 px-3.5 py-2 text-xs font-semibold"
            style={{ background: "rgba(22,24,23,0.9)", border: `1px solid ${QMO.lineDark}`, color: QMO.mist, borderRadius: 12 }}
          >
            <span className="h-2 w-2 rounded-full" style={{ background: QMO.coral }} /> On call <span style={{ color: QMO.stone }}>02:11</span>
          </motion.span>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  const th = useTheme();
  return (
    <Band tone="light">
      <H2 eyebrow="Why teams use it" title="Made For Teams That Sell." sub="Built with sales teams, proven on real calls, ready to run in yours." />
      <div className="grid gap-5 md:grid-cols-3">
        {origin.map((o, i) => (
          <Rise key={o.t} delay={i * 0.12} className="h-full">
            <Card featured={i === 0}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold" style={{ background: i === 0 ? QMO.ink : QMO.yellow, color: i === 0 ? QMO.yellow : QMO.ink }}>{i + 1}</span>
              <h3 className="mt-6 text-xl md:text-2xl leading-tight" style={{ fontFamily: th.head, fontWeight: 800 }}>{o.t}</h3>
              <p className="mt-3 leading-relaxed" style={{ color: i === 0 ? QMO.ink : QMO.slate }}>{o.d}</p>
            </Card>
          </Rise>
        ))}
      </div>
    </Band>
  );
}

function Demo() {
  return (
    <Band tone="base" id="qmo-demo" className="scroll-mt-24">
      <H2 center eyebrow="See a live call" title="Watch a Q Card ^Land" sub="An example call, in real time." />
      <QmoDemo />
    </Band>
  );
}

function Features() {
  const th = useTheme();
  return (
    <Band tone="mist">
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <H2 eyebrow="What you get" title="Coaching That Shows Up ^During The Call" sub="Four parts of Qmo, working together." />
          <div className="grid gap-5 md:grid-cols-2">
            {features.map((f, i) => (
              <Rise key={f.t} delay={(i % 2) * 0.08} className="h-full">
                <Card>
                  <h3 className="text-xl md:text-2xl" style={{ fontFamily: th.head, fontWeight: 800 }}>{f.t}</h3>
                  <p className="mt-3 text-base leading-relaxed" style={{ color: QMO.slate }}>{f.d}</p>
                </Card>
              </Rise>
            ))}
          </div>
        </div>
        <Rise delay={0.2} className="hidden lg:flex justify-center">
          <Image src="/brand/qmo/thinking.png" alt="" width={734} height={666} sizes="360px" className="h-auto w-full max-w-[360px] select-none" draggable={false} />
        </Rise>
      </div>
    </Band>
  );
}

// Plain-text flow: wraps as a 4-up row, 2x2 or a stack; nothing is drawn in a clipped canvas.
function Learns() {
  const reduce = useReducedMotion();
  return (
    <Band tone="base">
      <H2 eyebrow="How it learns" title="Every Call Makes The Next ^One Better." />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {learns.map((s, i) => (
          <motion.li key={s.t} initial={reduce ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.5, delay: i * 0.18 }} className="relative">
            <div className="h-full p-6 lg:mx-2" style={{ background: QMO.raised, border: `1px solid ${QMO.lineDark}`, borderRadius: 16 }}>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold" style={{ background: QMO.yellow, color: QMO.ink }}>{i + 1}</span>
                <span className="text-xl" style={head}>{s.t}</span>
              </div>
              <p className="mt-4 text-base leading-relaxed" style={{ color: QMO.stone }}>{s.d}</p>
            </div>
            {i < learns.length - 1 && <span className="hidden lg:block absolute top-1/2 -right-1 z-10 -translate-y-1/2 text-lg font-bold" style={{ color: QMO.yellow }} aria-hidden="true">&rarr;</span>}
          </motion.li>
        ))}
      </ol>
      <p className="mt-8 text-base" style={{ color: QMO.stone }}>Then the loop starts again with the next call.</p>
    </Band>
  );
}

function WhyQmo() {
  return (
    <Band tone="light">
      <H2 eyebrow="Why Qmo" title="Reps Win Calls, Not ^Software." sub="Qmo makes the rep better; it never replaces them." />
      <div className="grid gap-5 md:grid-cols-3">
        {why.map((w, i) => (
          <Rise key={i} delay={i * 0.1} className="h-full">
            <Card><p className="text-base md:text-lg leading-relaxed">{w}</p></Card>
          </Rise>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: QMO.slate }}>Works with all major CRMs.</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {crms.map((c) => (
            <span key={c} className="text-xl md:text-2xl transition-colors hover:text-[#0B0B0C]" style={{ ...head, color: QMO.stone }}>{c}</span>
          ))}
        </div>
      </div>
    </Band>
  );
}

// Yellow poster band, like heyqmo.com's "Never miss your Q."
function Trial() {
  return (
    <Band tone="yellow" pad="py-16 md:py-24">
      <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <h3 className="text-4xl md:text-6xl leading-[1.02] tracking-tight" style={head}>Try Qmo free for 2 weeks.</h3>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {trial.map((t) => (
              <li key={t} className="px-4 py-2 text-sm font-semibold" style={{ border: `1.5px solid ${QMO.ink}`, borderRadius: 999 }}>{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <a href="https://heyqmo.com/?utm_source=map2close&utm_medium=website&utm_campaign=products_page" target="_blank" rel="noopener noreferrer" className="inline-flex px-7 py-3.5 text-[15px] font-semibold transition-transform hover:-translate-y-0.5" style={{ background: QMO.ink, color: QMO.mist, borderRadius: 12 }}>Explore Qmo</a>
          </div>
        </div>
        <Image src="/brand/qmo/celebrating.png" alt="" width={745} height={670} sizes="300px" className="hidden md:block h-auto w-[300px] select-none" draggable={false} />
      </div>
    </Band>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-28 text-center" style={{ background: QMO.ink }}>
      <Grid fade="radial" />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <Image src="/brand/qmo/happy.png" alt="" width={788} height={661} sizes="180px" className="h-auto w-[150px] md:w-[180px] mb-4 select-none" draggable={false} />
        <h2 className="text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8" style={{ ...head, color: QMO.mist }}>One Conversation. No <span style={{ color: QMO.yellow }}>Commitment.</span></h2>
        <BrandBtn external product="qmo" href="https://heyqmo.com/">Explore Qmo</BrandBtn>
      </div>
    </section>
  );
}

export default function QmoClient() {
  return (
    <div className={`${urbanist.variable} ${geist.variable}`}>
      <BrandRoot theme="qmo">
        <ProductToggle active="qmo" />
        <Hero />
        <Origin />
        <Demo />
        <Features />
        <Learns />
        <WhyQmo />
        <Trial />
        <Together tone="base" />
        <Faq faqs={QMO_FAQS} tone="light" />
        <FinalCta />
      </BrandRoot>
    </div>
  );
}
