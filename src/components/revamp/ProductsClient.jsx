"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal, Eyebrow, GridBackdrop, Section, SectionTitle, QmoMark, GrdrMark, QMO_YELLOW, GRDR_CYAN, MINT, Btn } from "./ui";
import ProductCta from "./ProductCta";
import QmoDemo from "./QmoDemo";
import GrdrDemo from "./GrdrDemo";
import { trackProductCta } from "./track";

import { FAQS } from "./faqs";

function Words({ text }) {
  const reduce = useReducedMotion();
  return text.split(" ").map((w, i) => {
    const c = w.startsWith("!") ? "#F96B6B" : null;
    return (
      <motion.span
        key={i}
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block mr-[0.28em]"
        style={c ? { color: c } : undefined}
      >
        {w.replace(/^!/, "")}
      </motion.span>
    );
  });
}

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 md:px-16 overflow-hidden">
      <GridBackdrop />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Eyebrow>Product Portfolio</Eyebrow>
        <h1 className="text-4xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.98] text-white max-w-5xl">
          <Words text="Built in the Field. Shipped as !Product." />
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.7 }} className="mt-8 max-w-3xl text-lg md:text-xl text-white font-body leading-relaxed">
          Every Map2Close product started as a tool our own team needed on live calls and live deals. Now your team can run them too.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }} className="mt-10 flex flex-wrap gap-4">
          <a
            href="#qmo"
            onClick={(e) => { e.preventDefault(); trackProductCta("qmo", "Explore Qmo"); document.getElementById("qmo")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" }); }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#62D2A2] text-black font-black text-xs md:text-sm uppercase tracking-widest hover:bg-white transition-colors"
          >
            Explore Qmo
          </a>
          <ProductCta product="grdr" href="https://grdr.app/" variant="ghost">Get a Free Grade</ProductCta>
        </motion.div>

        {/* Route: two product nodes joined to the M2C mark */}
        <svg viewBox="0 0 600 120" className="mt-14 w-full max-w-xl h-auto" aria-hidden="true">
          <motion.path d="M70 60 C 180 60, 220 60, 300 60" stroke={MINT} strokeWidth="1.5" fill="none" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
          <motion.path d="M530 60 C 420 60, 380 60, 300 60" stroke={MINT} strokeWidth="1.5" fill="none" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.6 }} />
          <motion.g animate={reduce ? undefined : { y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
            <circle cx="70" cy="60" r="22" fill={QMO_YELLOW} opacity="0.15" />
            <circle cx="70" cy="60" r="9" fill={QMO_YELLOW} />
          </motion.g>
          <motion.g animate={reduce ? undefined : { y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}>
            <circle cx="530" cy="60" r="22" fill={GRDR_CYAN} opacity="0.15" />
            <circle cx="530" cy="60" r="9" fill={GRDR_CYAN} />
          </motion.g>
          <circle cx="300" cy="60" r="26" fill="#000" stroke={MINT} strokeWidth="1.5" />
          <text x="300" y="66" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="900">M2C</text>
        </svg>
      </div>
    </section>
  );
}

function Origin() {
  const steps = [
    { n: "01", t: "Built for our reps.", d: "We needed live coaching and honest call grades for our own outbound team, so we built them." },
    { n: "02", t: "Proven on real calls.", d: "Every card and rubric was tuned on live dials and real deals, not demo scripts." },
    { n: "03", t: "Shipped for yours.", d: "Now they run on top of your CRM, with or without us in the room." },
  ];
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Origin" title="From Our Playbook to Your ^Pipeline." />
      <div className="relative grid gap-10 md:grid-cols-3 pl-8 md:pl-0">
        <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ transformOrigin: "top" }} className="absolute left-0 top-0 bottom-0 w-px bg-[#62D2A2]/60 md:hidden" aria-hidden="true" />
        <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} style={{ transformOrigin: "left" }} className="absolute left-0 right-0 top-3 h-px bg-[#62D2A2]/60 hidden md:block" aria-hidden="true" />
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.15}>
            <div className="relative md:pt-10">
              <span className="absolute -left-[37px] md:left-0 md:top-0 top-1 h-3 w-3 rounded-full bg-[#62D2A2]" />
              <p className="font-mono text-sm font-black tracking-widest text-[#62D2A2]">{s.n}</p>
              <h3 className="mt-2 text-xl md:text-2xl font-black text-white">{s.t}</h3>
              <p className="mt-3 font-body text-base text-white leading-relaxed">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Picker() {
  const cards = [
    { id: "qmo", color: QMO_YELLOW, mark: <QmoMark className="h-8" />, line: "Live AI coaching on every call", who: "For: reps and sales managers running outbound and demos" },
    { id: "grdr", color: GRDR_CYAN, mark: <GrdrMark className="text-3xl" />, line: "Grade every call and deal", who: "For: sales leaders who coach reps" },
  ];
  return (
    <Section id="picker">
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.id} delay={i * 0.1}>
            <a
              href={`#${c.id}`}
              className="group relative block h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:-translate-y-1"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = c.color)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "")}
            >
              <div className="mb-8 h-9 flex items-center">{c.mark}</div>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">{c.line}</h3>
              <p className="mt-3 font-body text-base text-white/80">{c.who}</p>
              <span className="mt-8 inline-block text-xs font-black uppercase tracking-widest" style={{ color: c.color }}>Explore &rarr;</span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Switcher() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState("qmo");
  useEffect(() => {
    const picker = document.getElementById("picker");
    const qmo = document.getElementById("qmo");
    const grdr = document.getElementById("grdr");
    if (!picker || !qmo || !grdr) return;
    const onScroll = () => {
      setShow(picker.getBoundingClientRect().bottom < 80);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -50% 0px" }
    );
    io.observe(qmo);
    io.observe(grdr);
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  const tabs = [{ id: "qmo", label: "Qmo", color: QMO_YELLOW }, { id: "grdr", label: "Grdr", color: GRDR_CYAN }];
  return (
    <div className={`fixed top-[76px] left-1/2 z-40 -translate-x-1/2 transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}`}>
      <div className="flex gap-1 rounded-full border border-white/10 bg-black/80 p-1 backdrop-blur-xl">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="rounded-full px-5 py-1.5 text-sm font-bold text-white" style={active === t.id ? { boxShadow: `inset 0 -2px 0 ${t.color}` } : { opacity: 0.6 }}>
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Features({ items, accent }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((f, i) => (
        <Reveal key={f.t} delay={i * 0.08}>
          <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7">
            <span className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500" style={{ background: accent }} />
            <h4 className="text-xl font-black text-white">{f.t}</h4>
            <p className="mt-3 font-body text-base text-white leading-relaxed">{f.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Loop() {
  const reduce = useReducedMotion();
  const nodes = ["Call", "Q Card", "Q Review", "Q Library"];
  const pts = [[200, 30], [370, 130], [200, 230], [30, 130]];
  return (
    <div className="mx-auto max-w-sm">
      <svg viewBox="0 0 400 260" className="w-full h-auto" role="img" aria-label="Loop: Call, Q Card, Q Review, Q Library, then the next call">
        <ellipse cx="200" cy="130" rx="170" ry="100" fill="none" stroke={QMO_YELLOW} strokeOpacity="0.35" strokeWidth="1.5" />
        {!reduce && (
          <motion.circle r="6" fill={QMO_YELLOW} animate={{ cx: [200, 370, 200, 30, 200], cy: [30, 130, 230, 130, 30] }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }} />
        )}
        {nodes.map((n, i) => (
          <g key={n}>
            <circle cx={pts[i][0]} cy={pts[i][1]} r="5" fill={QMO_YELLOW} />
            <text x={pts[i][0]} y={pts[i][1] + (i === 2 ? 24 : i === 0 ? -14 : 4)} dx={i === 1 ? 14 : i === 3 ? -14 : 0} textAnchor={i === 1 ? "start" : i === 3 ? "end" : "middle"} fill="#fff" fontSize="13" fontWeight="800">{n}</text>
          </g>
        ))}
        <text x="200" y="135" textAnchor="middle" fill="#fff" fontSize="12" opacity="0.7">next call</text>
      </svg>
    </div>
  );
}

function QmoSection() {
  const features = [
    { t: "Q Cards", d: "Live cards surface the right question, objection handle or close while the call is still winnable." },
    { t: "Q Review", d: "Every call graded against your business context, with the one thing to fix next time. Not generic AI feedback." },
    { t: "Q Library", d: "Your card library is built and improved from your own call recordings. Reps and managers approve or change every card." },
    { t: "The Queue", d: "Power dialer and parallel dialer built in, so reps get more conversations per hour with coaching on every one." },
  ];
  const why = [
    "Call recorders tell you what went wrong after the call. Qmo helps while the call is still winnable.",
    "Generic AI coaching guesses. Qmo grades on your playbook and your business context.",
    "Static playbooks go stale. Q Library learns what works and suggests changes your team approves.",
  ];
  const crms = ["HubSpot", "Salesforce", "Pipedrive", "Zoho CRM", "Close"];
  const trial = ["2 seats", "100 enrichments", "Unlimited calls", "Unlimited call grades", "Every feature included"];
  return (
    <section id="qmo" className="relative bg-[#0B0B0C] px-6 md:px-16 py-20 md:py-32 scroll-mt-24 overflow-hidden">
      <GridBackdrop glow={QMO_YELLOW} />
      <div className="relative z-10 max-w-6xl mx-auto space-y-24 md:space-y-32">
        <div>
          <Eyebrow color={QMO_YELLOW}>Qmo</Eyebrow>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] text-white">
            The right <span style={{ color: QMO_YELLOW }}>Q</span> at the right <span style={{ color: QMO_YELLOW }}>moment.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white font-body">Live coaching on every call, right inside your CRM.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ProductCta product="qmo" href="https://heyqmo.com/" accent={QMO_YELLOW}>Book a Qmo Demo</ProductCta>
            <a href="#qmo-demo" className="inline-flex items-center px-8 py-4 rounded-full border border-white/25 text-white font-black text-xs md:text-sm uppercase tracking-widest hover:border-[#FFC801] hover:text-[#FFC801] transition-colors">See a Live Call</a>
          </div>
        </div>

        <div id="qmo-demo" className="scroll-mt-32"><QmoDemo /></div>

        <Features items={features} accent={QMO_YELLOW} />

        <div>
          <h3 className="text-center text-2xl md:text-4xl font-black tracking-tighter text-white mb-8">How it learns</h3>
          <Loop />
          <p className="mt-6 text-center text-lg text-white font-body">Every call makes the next one better.</p>
        </div>

        <div className="text-center">
          <p className="text-4xl md:text-7xl font-black tracking-tighter text-white">Reps win calls, not software.</p>
          <p className="mt-6 text-lg md:text-xl text-white font-body">Qmo makes the rep better; it never replaces them.</p>
        </div>

        <div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-8">Why Qmo</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-7 font-body text-base md:text-lg text-white leading-relaxed">{w}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.25em] text-white/70 mb-6">Works with all major CRMs.</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            {crms.map((c) => (
              <span key={c} className="text-xl md:text-2xl font-black text-white/40 hover:text-white transition-colors">{c}</span>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border p-8 md:p-12 text-center" style={{ borderColor: `${QMO_YELLOW}55`, background: `${QMO_YELLOW}0d` }}>
          <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Try Qmo free for 2 weeks.</h3>
          <ul className="mt-8 flex flex-wrap justify-center gap-3">
            {trial.map((t) => (
              <li key={t} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white">{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <ProductCta product="qmo" href="https://heyqmo.com/" accent={QMO_YELLOW}>Start Free Trial</ProductCta>
          </div>
        </div>
      </div>
    </section>
  );
}

function GrdrSection() {
  const how = ["Dictate the call context.", "Paste the raw transcript.", "Grade and get the next move instantly."];
  const why = [
    "Fixed rubrics with anchored 0 to 3 scores, so grades are consistent and comparable over time.",
    "One grade and one next move, not fifteen paragraphs.",
    "A record across reps and deals.",
  ];
  const pillars = [
    ["Clarity", "Every gap made visible."],
    ["Confidence", "Objective rubrics, not gut feel."],
    ["Direction", "Exact words to say next time."],
    ["Empowerment", "Managers freed to lead."],
  ];
  return (
    <section id="grdr" className="relative bg-[#0B0F0E] px-6 md:px-16 py-20 md:py-32 scroll-mt-24 overflow-hidden">
      <GridBackdrop glow={GRDR_CYAN} />
      <div className="relative z-10 max-w-6xl mx-auto space-y-24 md:space-y-32">
        <div>
          <Eyebrow color={GRDR_CYAN}>Grdr</Eyebrow>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] text-white">
            <span style={{ color: GRDR_CYAN }}>Clarity</span> After Every Conversation.
          </h2>
          <p className="mt-6 max-w-3xl text-lg md:text-xl text-white font-body">
            Grade every cold call and deal the second the transcript lands, against proven frameworks, and get the exact words to say next time.
          </p>
          <div className="mt-8">
            <ProductCta product="grdr" href="https://grdr.app/" accent={GRDR_CYAN}>Get Your Free Grade</ProductCta>
          </div>
        </div>

        <GrdrDemo />

        <div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-10">How it works</h3>
          <div className="relative grid gap-8 md:grid-cols-3">
            <div className="absolute left-6 right-6 top-6 h-px bg-white/10 hidden md:block" aria-hidden="true" />
            {how.map((h, i) => (
              <Reveal key={h} delay={i * 0.12}>
                <div className="relative">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-[#0B0F0E] font-black" style={{ borderColor: GRDR_CYAN, color: GRDR_CYAN }}>{i + 1}</div>
                  <p className="mt-4 text-lg font-bold text-white">{h}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl md:text-4xl font-black tracking-tighter text-white mb-8">Why not generic AI</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {why.map((w, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="h-full rounded-3xl border border-white/10 bg-[#1A1F1E] p-7 font-body text-base md:text-lg text-white leading-relaxed">{w}</p>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {["4 Ds (cold calls)", "MEDDPICC + CLOSER (deals)"].map((f) => (
              <span key={f} className="rounded-full border px-5 py-2 text-sm text-white" style={{ borderColor: `${GRDR_CYAN}66` }}>{f}</span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {pillars.map(([w, d], i) => (
            <Reveal key={w} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-white/10 bg-[#1A1F1E] p-6">
                <p className="text-xl font-black" style={{ color: GRDR_CYAN }}>{w}</p>
                <p className="mt-2 font-body text-sm md:text-base text-white">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="text-center">
          <p className="text-3xl md:text-5xl font-black tracking-tighter text-white max-w-4xl mx-auto">Walk into a 1:1 already knowing what the rep needs to hear.</p>
          <p className="mt-6 text-lg text-white font-body">Managers spend 5 to 8 hours a week reviewing calls.</p>
        </div>
      </div>
    </section>
  );
}

function Together() {
  const cols = [
    ["People", "Our coaching sticks because Qmo puts it in front of reps on every live call."],
    ["Process", "Your playbook becomes Q Cards and Grdr rubrics, so the process gets graded, not just written down."],
    ["Platforms", "Both products sit on top of your existing CRM. We wire them in as part of the build."],
  ];
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="Better together" title="Run Them Yourself, or Let Us Run Them ^With You." />
      <div className="grid gap-5 md:grid-cols-3">
        {cols.map(([t, d], i) => (
          <Reveal key={t} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="text-2xl font-black text-[#62D2A2]">{t}</h3>
              <p className="mt-3 font-body text-base md:text-lg text-white leading-relaxed">{d}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Btn href="/contact">Book a Working Session</Btn>
        <p className="mt-5 text-sm text-white/70">Qmo and Grdr work on their own. You never need a Map2Close engagement to use them.</p>
      </div>
    </Section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <Section>
      <SectionTitle eyebrow="FAQ" title="Common ^Questions" />
      <div className="max-w-3xl divide-y divide-white/10 border-y border-white/10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span className="text-lg md:text-xl font-bold text-white">{f.q}</span>
                <Plus className="h-5 w-5 shrink-0 text-[#62D2A2] transition-transform duration-250" style={{ transform: isOpen ? "rotate(45deg)" : "none" }} />
              </button>
              <div id={`faq-${i}`} role="region" className="grid transition-all duration-[250ms]" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
                <div className="overflow-hidden">
                  <p className="pb-6 font-body text-base md:text-lg text-white/90 leading-relaxed">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

function FinalCta() {
  return (
    <section className="relative px-6 py-20 md:py-32 text-center overflow-hidden bg-gradient-to-b from-black to-[#050505] hide-floating-cta">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_top,rgba(98,210,162,0.15),transparent_70%)] pointer-events-none" />
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.98] text-white mb-6">One Conversation. No <span className="text-[#62D2A2]">Commitment.</span></h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <ProductCta product="qmo" href="https://heyqmo.com/" accent={QMO_YELLOW}>Book a Qmo Demo</ProductCta>
          <ProductCta product="grdr" href="https://grdr.app/" accent={GRDR_CYAN}>Get a Free Grade</ProductCta>
        </div>
        <Link href="/contact" className="mt-8 text-sm font-black uppercase tracking-widest text-[#62D2A2] hover:text-white transition-colors">Or talk to Map2Close about your whole motion &rarr;</Link>
      </div>
    </section>
  );
}

export default function ProductsClient() {
  return (
    <div className="bg-black text-white">
      <Hero />
      <Origin />
      <Picker />
      <Switcher />
      <QmoSection />
      <GrdrSection />
      <Together />
      <Faq />
      <FinalCta />
    </div>
  );
}
