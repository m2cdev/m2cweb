"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import QmoDemo from "./QmoDemo";
import { QMO_FAQS } from "./faqs";
const TRIAL_URL = "https://heyqmo.com/free-trial";
import { BrandRoot, Band, H2, Card, BrandBtn, ProductToggle, Together, Faq, Rise, Grid, useTheme, QMO } from "./brand";

const urbanist = localFont({ src: "../../../public/fonts/urbanist-latin-wght-normal.woff2", weight: "100 900", variable: "--font-urbanist", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });

const origin = [
  { t: "Open more doors.", d: "On cold calls and first conversations, Q Cards hand your reps the opener, the right question and a way past the brush-off, so more dials turn into booked meetings." },
  { t: "Close the deal you earned.", d: "In demos and negotiations, the answer to price, timing and \"we need to think about it\" shows up while the buyer is still on the line, not in a debrief the week after." },
  { t: "Grow the accounts you won.", d: "On renewal and check-in calls, Qmo prompts the follow-up questions that uncover a new need, so your reps expand customers instead of just keeping them." },
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
  { who: "Call recorders", old: "Tell you what went wrong after the call.", now: "Qmo helps while the call is still winnable." },
  { who: "Generic AI coaching", old: "Guesses at what good looks like.", now: "Qmo grades on your playbook and your business context." },
  { who: "Static playbooks", old: "Go stale the week after they ship.", now: "Q Library learns what works and suggests changes your team approves." },
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

// Page entrance: the Q draws itself (ring, then the speech tail), pops, then lifts away to reveal the page.
function QIntro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(!reduce);
  useEffect(() => {
    if (reduce) return undefined;
    const id = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(id);
  }, [reduce]);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="q-intro"
          className="fixed inset-0 z-[70] flex items-center justify-center pointer-events-none"
          style={{ background: QMO.ink }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          aria-hidden="true"
        >
          <motion.svg viewBox="27 21 150 158" className="h-36 w-36 md:h-48 md:w-48" initial={{ scale: 0.85 }} animate={{ scale: [0.85, 1, 1.12] }} transition={{ duration: 1.7, times: [0, 0.6, 1], ease: "easeOut" }}>
            <motion.circle cx="100" cy="94" r="55" fill="none" stroke={QMO.yellow} strokeWidth="32" strokeLinecap="round" initial={{ pathLength: 0, rotate: -90 }} animate={{ pathLength: 1, rotate: -90 }} style={{ transformOrigin: "100px 94px" }} transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }} />
            <motion.path d="M132.1 144.7 L170 174 L150.6 126.3 Z" fill={QMO.yellow} stroke={QMO.yellow} strokeWidth="8" strokeLinejoin="round" initial={{ opacity: 0, scale: 0.2 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: "132px 144px" }} transition={{ delay: 0.8, duration: 0.45, type: "spring", stiffness: 300, damping: 14 }} />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero() {
  const reduce = useReducedMotion();
  const base = reduce ? 0 : 1.5; // hero waits for the Q entrance
  const line = (d) => ({ initial: reduce ? false : { opacity: 0, y: "0.4em" }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d + base, ease: [0.22, 1, 0.36, 1] } });
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
            transition={{ delay: 1 + base, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-20 bottom-2 left-0 lg:-left-10 w-[250px] md:w-[290px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            style={{ background: QMO.mist, color: QMO.ink, borderRadius: 16, borderTop: `4px solid ${QMO.coral}` }}
          >
            <div className="p-4">
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#B83A3A" }}>Objection</p>
              <p className="mt-1.5 text-[14px] font-semibold leading-snug" style={{ fontFamily: "var(--font-urbanist), system-ui" }}>Fair enough. What would have to change for this to make the list?</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Origin() {
  const th = useTheme();
  return (
    <Band tone="light">
      <H2 eyebrow="Why teams use it" title="One Tool, Every Stage ^Of The Funnel." sub="From the first dial to the renewal call, Qmo coaches the rep in the moment." />
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
      <H2 center eyebrow="See a live call" title="Watch a Q Card ^Land" sub="Scroll to play the call, one moment at a time." />
      <QmoDemo />
    </Band>
  );
}

// Four mini-demos, one per part of Qmo. Each replays when selected and the tabs auto-advance while on screen.
function PanelShell({ label, children }) {
  return (
    <div className="h-full min-h-[360px] overflow-hidden rounded-2xl p-5 md:p-6" style={{ background: QMO.ink, border: `1px solid ${QMO.lineDark}`, color: QMO.mist }}>
      <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: QMO.yellow }}>{label}</p>
      {children}
    </div>
  );
}
const pop = (d) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.45, ease: [0.22, 1, 0.36, 1] } });

function Typed({ text, delay = 0, speed = 22 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let id;
    const start = setTimeout(() => { id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), speed); }, delay * 1000);
    return () => { clearTimeout(start); clearInterval(id); };
  }, [text, delay, speed]);
  return <>{text.slice(0, n)}<span className="opacity-60">{n < text.length ? "|" : ""}</span></>;
}

function CardsPanel() {
  return (
    <PanelShell label="Q Cards, live">
      <motion.p {...pop(0)} className="text-sm" style={{ color: QMO.stone }}>Prospect</motion.p>
      <motion.p {...pop(0.1)} className="mt-1 text-base">&ldquo;We already use another tool for this.&rdquo;</motion.p>
      <motion.div initial={{ opacity: 0, y: 70, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 1, type: "spring", stiffness: 240, damping: 20 }} className="mt-6 rounded-2xl p-5" style={{ background: QMO.mist, color: QMO.ink, borderTop: `4px solid ${QMO.coral}` }}>
        <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#B83A3A" }}>Objection</p>
        <p className="mt-2 text-[17px] font-semibold leading-snug" style={{ fontFamily: "var(--font-urbanist), system-ui" }}><Typed delay={1.4} text="Makes sense. What would it take for something new to be worth a second look?" /></p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6 }} className="mt-3 text-xs" style={{ color: QMO.slate }}>Shown while the call is still winnable.</motion.p>
      </motion.div>
    </PanelShell>
  );
}

function ReviewPanel() {
  const rows = [["Opening", 82], ["Discovery", 58], ["Objection handling", 74], ["Next step", 91]];
  return (
    <PanelShell label="Q Review, after the call">
      <div className="flex items-center gap-5">
        <div className="relative h-24 w-24 shrink-0">
          <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke={QMO.lineDark} strokeWidth="10" />
            <motion.circle cx="50" cy="50" r="42" fill="none" stroke={QMO.yellow} strokeWidth="10" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 0.76 }} transition={{ duration: 1.4, ease: "easeOut" }} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl" style={head}>76</span>
        </div>
        <p className="text-sm leading-relaxed" style={{ color: QMO.stone }}>Graded against your business context, not a generic script.</p>
      </div>
      <div className="mt-6 space-y-3">
        {rows.map(([k, v], i) => (
          <div key={k}>
            <div className="flex justify-between text-xs"><span>{k}</span><span style={{ color: QMO.stone }}>{v}</span></div>
            <div className="mt-1 h-2 rounded-full" style={{ background: QMO.lineDark }}>
              <motion.div className="h-2 rounded-full" style={{ background: v < 65 ? QMO.coral : QMO.yellow }} initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ delay: 0.3 + i * 0.2, duration: 0.8, ease: "easeOut" }} />
            </div>
          </div>
        ))}
      </div>
      <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="mt-5 rounded-xl px-4 py-3 text-sm" style={{ background: `${QMO.yellow}18`, border: `1px solid ${QMO.yellow}55` }}>
        <b style={{ color: QMO.yellow }}>Fix next time:</b> confirm the pain before you ask for the demo.
      </motion.p>
    </PanelShell>
  );
}

function LibraryPanel() {
  const [approved, setApproved] = useState(false);
  useEffect(() => { const id = setTimeout(() => setApproved(true), 2600); return () => clearTimeout(id); }, []);
  const cards = ["Price is too high", "We need to think about it", "Send me an email"];
  return (
    <PanelShell label="Q Library, built from your calls">
      <div className="space-y-2">
        {cards.map((c, i) => (
          <motion.div key={c} {...pop(0.1 + i * 0.15)} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm" style={{ background: QMO.raised, border: `1px solid ${QMO.lineDark}` }}>
            <span>{c}</span><span className="text-xs" style={{ color: QMO.stone }}>Approved</span>
          </motion.div>
        ))}
        <motion.div {...pop(1)} className="rounded-xl p-4 text-sm" style={{ background: approved ? `${QMO.yellow}22` : QMO.raised, border: `1px solid ${approved ? QMO.yellow : QMO.coral}`, transition: "all .4s" }}>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: approved ? QMO.yellow : QMO.coral }}>{approved ? "Added to your library" : "Suggested from this week's calls"}</p>
          <p className="mt-1.5">&ldquo;We&apos;re already using a competitor&rdquo;: ask what they would change about it.</p>
          <div className="mt-3 flex gap-2">
            <motion.span animate={approved ? { scale: [1, 0.92, 1] } : {}} className="rounded-lg px-3 py-1 text-xs font-semibold" style={{ background: approved ? QMO.mist : QMO.yellow, color: QMO.ink }}>{approved ? "Approved" : "Approve"}</motion.span>
            {!approved && <span className="rounded-lg px-3 py-1 text-xs font-semibold" style={{ border: `1px solid ${QMO.lineDark}` }}>Edit</span>}
          </div>
        </motion.div>
      </div>
      <p className="mt-4 text-xs" style={{ color: QMO.stone }}>Your reps and managers approve or change every card.</p>
    </PanelShell>
  );
}

function QueuePanel() {
  const leads = [["Dana, Northwind", 0.4], ["Marcus, Lumen Co.", 0.9], ["Priya, Harbor", 1.4], ["Tom, Fieldline", 1.9], ["Aisha, Brightpath", 2.4]];
  const [n, setN] = useState(0);
  useEffect(() => { const id = setInterval(() => setN((v) => (v >= 14 ? v : v + 1)), 220); return () => clearInterval(id); }, []);
  return (
    <PanelShell label="The Queue, power and parallel dialer">
      <div className="space-y-2">
        {leads.map(([name, d], i) => (
          <motion.div key={name} {...pop(d * 0.4)} className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm" style={{ background: QMO.raised, border: `1px solid ${QMO.lineDark}` }}>
            <span>{name}</span>
            {i < 3 ? (
              <motion.span className="flex items-center gap-2 text-xs" initial={{ color: QMO.stone }} animate={{ color: i === 0 ? QMO.yellow : QMO.stone }} transition={{ delay: 1.6 }}>
                <motion.i className="h-2 w-2 rounded-full" style={{ background: QMO.yellow }} animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.1, delay: i * 0.2 }} />
                {i === 0 ? "Connected" : "Dialing"}
              </motion.span>
            ) : <span className="text-xs" style={{ color: QMO.stone }}>Next up</span>}
          </motion.div>
        ))}
      </div>
      <div className="mt-5 flex items-end justify-between">
        <p className="text-xs" style={{ color: QMO.stone }}>Conversations this hour</p>
        <p className="text-4xl tabular-nums" style={{ ...head, color: QMO.yellow }}>{n}</p>
      </div>
      <p className="mt-2 text-xs" style={{ color: QMO.stone }}>More conversations per hour, with coaching on every one.</p>
    </PanelShell>
  );
}

const PANELS = [CardsPanel, ReviewPanel, LibraryPanel, QueuePanel];

function Features() {
  const th = useTheme();
  const reduce = useReducedMotion();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused || !inView) return undefined;
    const id = setTimeout(() => setActive((a) => (a + 1) % features.length), 7000);
    return () => clearTimeout(id);
  }, [active, paused, inView, reduce]);
  const Panel = PANELS[active];
  return (
    <Band tone="mist">
      <H2 eyebrow="What you get" title="Coaching That Shows Up ^During The Call" sub="Four parts of Qmo, working together. Pick one to see it work." />
      <div ref={ref} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="flex flex-col gap-3" role="tablist" aria-label="What you get">
          {features.map((f, i) => {
            const on = i === active;
            return (
              <button key={f.t} role="tab" aria-selected={on} onClick={() => setActive(i)} className="relative overflow-hidden p-5 text-left transition-colors duration-300" style={{ borderRadius: th.radius, background: on ? QMO.ink : "#FFFFFF", color: on ? QMO.mist : QMO.ink, border: `1px solid ${on ? QMO.ink : QMO.line}` }}>
                <span className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold" style={{ background: QMO.yellow, color: QMO.ink }}>{i + 1}</span>
                  <span className="text-xl md:text-2xl" style={head}>{f.t}</span>
                </span>
                <span className="grid transition-all duration-300" style={{ gridTemplateRows: on ? "1fr" : "0fr" }}>
                  <span className="overflow-hidden"><span className="mt-3 block text-base leading-relaxed" style={{ color: QMO.stone }}>{f.d}</span></span>
                </span>
                {on && !reduce && !paused && inView && (
                  <motion.span key={`bar-${active}`} className="absolute bottom-0 left-0 h-[3px]" style={{ background: QMO.yellow }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 7, ease: "linear" }} />
                )}
              </button>
            );
          })}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.3 }}>
            <Panel />
          </motion.div>
        </AnimatePresence>
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
      <div className="mt-14 md:mt-20 mx-auto max-w-4xl text-center">
        <Rise>
          <p className="text-2xl md:text-4xl leading-[1.2] tracking-tight" style={{ ...head, color: QMO.mist }}>
            Qmo learns from every call you take, then <span style={{ color: QMO.yellow }}>starts the loop again</span> with the next one. That is how your reps get better after every single call.
          </p>
        </Rise>
        <motion.span aria-hidden="true" className="mx-auto mt-10 block w-[3px] origin-top rounded-full" style={{ height: 96, background: `linear-gradient(${QMO.yellow}, transparent)` }} initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }} />
      </div>
    </Band>
  );
}

// Editorial rows: what the old way does, struck through, against what Qmo does. Nothing sits in a card.
function WhyQmo() {
  const reduce = useReducedMotion();
  return (
    <Band tone="light">
      <H2 eyebrow="Why Qmo" title="Reps Win Calls, Not ^Software." sub="Qmo makes the rep better; it never replaces them." />
      <div className="border-t" style={{ borderColor: QMO.ink }}>
        {why.map((w, i) => (
          <motion.div key={w.who} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, margin: "-80px" }} className="grid gap-4 border-b py-8 md:grid-cols-[0.8fr_1.4fr] md:gap-12 md:py-10" style={{ borderColor: QMO.line }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: QMO.slate }}>{String(i + 1).padStart(2, "0")} &middot; {w.who}</p>
              <p className="relative mt-3 inline text-lg md:text-xl" style={{ color: QMO.slate }}>
                <span className="relative">
                  {w.old}
                  <motion.span aria-hidden="true" className="absolute left-0 top-1/2 h-[2px] w-full origin-left" style={{ background: QMO.ink }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} />
                </span>
              </p>
            </div>
            <motion.p className="text-2xl md:text-4xl leading-[1.12] tracking-tight" style={head} variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }} transition={{ duration: 0.6, delay: 0.7 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}>
              <span style={{ backgroundImage: `linear-gradient(transparent 62%, ${QMO.yellow} 62%)`, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}>{w.now}</span>
            </motion.p>
          </motion.div>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] mb-6" style={{ color: QMO.slate }}>Works with all major CRMs.</p>
        <div className="relative overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
          <div className="qmo-marquee flex w-max gap-14 whitespace-nowrap">
            {[...crms, ...crms, ...crms, ...crms].map((c, i) => (
              <span key={i} className="text-2xl md:text-4xl" style={{ ...head, color: i % 2 ? QMO.stone : QMO.ink }}>{c}</span>
            ))}
          </div>
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
            <BrandBtn external product="qmo" href={TRIAL_URL}>Start My 2 Week Trial</BrandBtn>
          </div>
        </div>
        <Image src="/brand/qmo/celebrating.png" alt="" width={745} height={670} sizes="300px" className="hidden md:block h-auto w-[300px] select-none" draggable={false} />
      </div>
    </Band>
  );
}

function FinalCta() {
  const reduce = useReducedMotion();
  const line = "rgba(255,200,1,0.16)";
  return (
    <section data-seamless-end className="relative overflow-hidden px-6 pt-20 pb-28 md:pt-28 md:pb-36 text-center" style={{ background: `linear-gradient(180deg, ${QMO.ink} 0%, #17130a 55%, #000 100%)` }}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`, backgroundSize: "56px 56px", maskImage: "linear-gradient(to bottom, #000 30%, transparent 98%)", WebkitMaskImage: "linear-gradient(to bottom, #000 30%, transparent 98%)" }}
        animate={reduce ? undefined : { backgroundPosition: ["0px 0px", "56px 56px"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2" style={{ background: `radial-gradient(closest-side, ${QMO.yellow}38, ${QMO.yellow}12 55%, transparent)` }} />
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
        <Image src="/brand/qmo/happy.png" alt="" width={788} height={661} sizes="180px" className="h-auto w-[150px] md:w-[180px] mb-4 select-none" draggable={false} />
        <h2 className="text-4xl md:text-6xl leading-[1.02] tracking-tight mb-8" style={{ ...head, color: QMO.mist }}>One Conversation. No <span style={{ color: QMO.yellow }}>Commitment.</span></h2>
        <BrandBtn external product="qmo" href={TRIAL_URL}>Start a Free Trial</BrandBtn>
      </div>
    </section>
  );
}


export default function QmoClient() {
  return (
    <div className={`${urbanist.variable} ${geist.variable}`}>
      <BrandRoot theme="qmo">
        <QIntro />
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
