"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, GridBackdrop, Eyebrow, Section, SectionTitle, WhiteSection, WhiteTitle, NumDot, QMO_YELLOW, SplitLetters } from "./ui";
import ProductCta from "./ProductCta";
import QmoDemo from "./QmoDemo";
import { ProductToggle, Together, Faq, FinalCta } from "./ProductShared";
import { QMO_FAQS } from "./faqs";


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

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[82vh] flex items-center pt-44 pb-20 px-6 md:px-16 overflow-hidden bg-[#0B0B0C]">
      <GridBackdrop glow={QMO_YELLOW} />
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <Eyebrow color={QMO_YELLOW}>Qmo</Eyebrow>
        <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] text-white [perspective:800px]">
          <SplitLetters text="The right Q at the right moment." />
        </h1>
        <motion.p initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.7 }} className="mt-6 max-w-3xl text-lg md:text-xl text-white font-body leading-relaxed">
          Live coaching on every call, right inside your CRM. Built for real sales teams.
        </motion.p>
        <motion.div initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.15 }} className="mt-8 flex flex-wrap gap-4">
          <ProductCta product="qmo" href="https://heyqmo.com/" accent={QMO_YELLOW}>Explore Qmo</ProductCta>
          <a href="#qmo-demo" className="inline-flex items-center px-8 py-4 rounded-full border border-white/25 text-white font-black text-xs md:text-sm uppercase tracking-widest hover:border-[#FFC801] hover:text-[#FFC801] transition-colors">See a Live Call</a>
        </motion.div>
      </div>
    </section>
  );
}

function Origin() {
  return (
    <WhiteSection>
      <WhiteTitle eyebrow="Why teams use it" title="Made For Teams That Sell." sub="Built with sales teams, proven on real calls, ready to run in yours." />
      <div className="grid gap-5 md:grid-cols-3">
        {origin.map((o, i) => (
          <Reveal key={o.t} delay={i * 0.12}>
            <div className={`h-full rounded-3xl border p-7 ${i === 0 ? "bg-black border-black text-white" : "bg-[#F4F4F2] border-black/10"}`}>
              <NumDot n={i + 1} variant={i === 0 ? "mint" : "black"} />
              <h3 className="mt-6 text-xl md:text-2xl font-black tracking-tight leading-tight">{o.t}</h3>
              <p className={`mt-3 font-body leading-relaxed ${i === 0 ? "text-white/85" : "text-[#5E5E5A]"}`}>{o.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </WhiteSection>
  );
}

function Features() {
  return (
    <WhiteSection tone="grey">
      <WhiteTitle eyebrow="What you get" title="Coaching That Shows Up ^During The Call" sub="Four parts of Qmo, working together." />
      <div className="grid gap-5 md:grid-cols-2">
        {features.map((f, i) => (
          <Reveal key={f.t} delay={(i % 2) * 0.08}>
            <div className="h-full rounded-3xl border border-black/10 bg-white p-7 md:p-8">
              <h3 className="text-xl md:text-2xl font-black text-black">{f.t}</h3>
              <p className="mt-3 font-body text-base md:text-lg text-[#5E5E5A] leading-relaxed">{f.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </WhiteSection>
  );
}

// Plain-text flow: wraps as a 4-up row, 2x2 or a stack; nothing is drawn in a clipped canvas.
function Learns() {
  const reduce = useReducedMotion();
  return (
    <Section tone="dark">
      <SectionTitle eyebrow="How it learns" title="Every Call Makes The Next ^One Better." />
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {learns.map((s, i) => (
          <motion.li
            key={s.t}
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.18 }}
            className="relative"
          >
            <div className="h-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:mx-2">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-black" style={{ background: QMO_YELLOW }}>{i + 1}</span>
                <span className="text-xl font-black text-white">{s.t}</span>
              </div>
              <p className="mt-4 font-body text-base text-white/90 leading-relaxed">{s.d}</p>
            </div>
            {i < learns.length - 1 && (
              <span className="hidden lg:block absolute top-1/2 -right-1 z-10 -translate-y-1/2 text-lg font-black" style={{ color: QMO_YELLOW }} aria-hidden="true">&rarr;</span>
            )}
          </motion.li>
        ))}
      </ol>
      <p className="mt-8 flex items-center gap-3 text-base text-white/80 font-body">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: QMO_YELLOW }} />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: QMO_YELLOW }} />
        </span>
        Then the loop starts again with the next call.
      </p>
    </Section>
  );
}

function WhyQmo() {
  return (
    <WhiteSection>
      <WhiteTitle eyebrow="Why Qmo" title="Reps Win Calls, Not ^Software." sub="Qmo makes the rep better; it never replaces them." />
      <div className="grid gap-5 md:grid-cols-3">
        {why.map((w, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className="h-full rounded-3xl border border-black/10 bg-[#F4F4F2] p-7 font-body text-base md:text-lg text-black leading-relaxed">{w}</p>
          </Reveal>
        ))}
      </div>
      <div className="mt-14 text-center">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#5E5E5A] mb-6">Works with all major CRMs.</p>
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
          {crms.map((c) => (
            <span key={c} className="text-xl md:text-2xl font-black text-black/40 hover:text-black transition-colors">{c}</span>
          ))}
        </div>
      </div>
    </WhiteSection>
  );
}

function Trial() {
  return (
    <Section>
      <div className="rounded-[2rem] border p-8 md:p-12 text-center" style={{ borderColor: `${QMO_YELLOW}55`, background: `${QMO_YELLOW}0d` }}>
        <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-white">Try Qmo free for 2 weeks.</h3>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {trial.map((t) => (
            <li key={t} className="rounded-full border border-white/20 px-4 py-2 text-sm text-white">{t}</li>
          ))}
        </ul>
        <div className="mt-8">
          <ProductCta product="qmo" href="https://heyqmo.com/" accent={QMO_YELLOW}>Explore Qmo</ProductCta>
        </div>
      </div>
    </Section>
  );
}

export default function QmoClient() {
  return (
    <div className="bg-black text-white">
      <ProductToggle active="qmo" />
      <Hero />
      <Origin />
      <Section tone="dark"><div id="qmo-demo" className="scroll-mt-32"><QmoDemo /></div></Section>
      <Features />
      <Learns />
      <WhyQmo />
      <Trial />
      <Together tone="white" />
      <Faq faqs={QMO_FAQS} />
      <FinalCta product="qmo" />
    </div>
  );
}
