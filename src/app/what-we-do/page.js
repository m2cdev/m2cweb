import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Btn, Section, SectionTitle, Reveal, CtaBand, MINT } from "@/components/revamp/ui";
import Triad from "@/components/revamp/Triad";
import ProductStrip from "@/components/revamp/ProductStrip";

export const metadata = {
  title: "What We Do | People, Process, Platforms | Map2Close",
  description: "Map2Close runs your sales motion across People, Process and Platforms, then hands your team the products we built to keep it running.",
  openGraph: { title: "What We Do | Map2Close", url: "https://map2close.com/what-we-do" },
};

const pillars = [
  {
    label: "People",
    href: "/what-we-do/people",
    promise: "Coaching that changes how your reps sell.",
    points: ["Live deal coaching on real calls", "Cold Call Labs and 1-1 coaching", "Manager enablement that sticks"],
  },
  {
    label: "Process",
    href: "/what-we-do/process",
    promise: "Playbooks and rituals your team can actually run.",
    points: ["Talk tracks and objection handling", "Clean handoffs from SDR to AE to CS", "Pipeline rituals and call reviews"],
  },
  {
    label: "Platforms",
    href: "/what-we-do/platforms",
    promise: "A stack wired around how deals move.",
    points: ["CRM setup and workflow automation", "Tech stack integration", "Custom builds for what your stack can't do"],
  },
];

export default function WhatWeDo() {
  return (
    <div className="bg-black text-white">
      <PageHero
        eyebrow="What We Do"
        headline="People. Process. !Platforms."
        sub="Sales improves when all three work together. Most partners fix one. We run all three inside your motion, then hand your team the products we built to keep it running."
      >
        <div className="flex flex-wrap gap-4">
          <Btn href="/contact">Book a Working Session</Btn>
          <Btn href="/products" variant="ghost">See Our Products</Btn>
        </div>
      </PageHero>

      <Section tone="dark">
        <Triad />
      </Section>

      <Section>
        <SectionTitle eyebrow="Three pillars" title="One motion. ^Three parts." />
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.1}>
              <Link href={p.href} className="group block h-full rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#63D2A3]/60 hover:shadow-[0_0_40px_rgba(99,210,163,0.12)]">
                <span className="text-sm font-black tracking-widest text-[#63D2A3]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-3xl font-black tracking-tight text-white">{p.label}</h3>
                <p className="mt-3 font-body text-lg text-white">{p.promise}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 font-body text-base text-white/90">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#63D2A3]" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#63D2A3]">
                  Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="dark">
        <ProductStrip />
        <div className="mt-8">
          <Link href="/products" className="text-xs font-black uppercase tracking-widest text-[#63D2A3] hover:text-white transition-colors">See all products &rarr;</Link>
        </div>
      </Section>

      <CtaBand
        headline="One Conversation. No ^Commitment."
        sub="Stop guessing. Start closing."
        primary={{ href: "/contact", label: "Book a Working Session" }}
      />
    </div>
  );
}
