import { PageHero, Btn, Section, SectionTitle, CardGrid, Steps, Reveal, ProductTieIn, CtaBand } from "@/components/revamp/ui";

export const metadata = {
  title: "Process | Sales Playbooks + Handoffs | Map2Close",
  description: "Playbooks, talk tracks, handoff design and pipeline rituals your reps can actually run. We turn the frameworks everyone talks about into daily habits.",
  openGraph: { title: "Process | Map2Close", url: "https://map2close.com/what-we-do/process" },
};

const frameworks = ["MEDDPICC", "BANT", "SPIN", "Challenger", "SPICED", "+ more"];

const meets = [
  { title: "What your reps actually say", body: "Discovery scripts, objection handling trees, and talk tracks built from your real deals.", tag: "01 Calls + conversations" },
  { title: "The pushback they hear", body: "Mapped to your product, your market, and the specific personas your team sells into.", tag: "02 Objections" },
  { title: "How deals move through your team", body: "SDR to AE, AE to CS. Every transition defined and documented so nothing falls out.", tag: "03 Handoffs" },
  { title: "Applied to deals in flight now", body: "We work on your actual open opportunities, not hypothetical case studies.", tag: "04 Live pipeline" },
];

const core = [
  { title: "Playbooks + Talk Tracks", description: "Cold call, discovery and demo talk tracks built around your buyers and embedded in the way your reps already work." },
  { title: "Objection Handling + Battlecards", description: "Objection guides and battlecards your reps can use mid-call, written from the pushback your team really hears." },
  { title: "Handoff Design", description: "SDR to AE to CS handoffs defined end to end, so context travels with the deal." },
  { title: "Pipeline Rituals", description: "Weekly deal review, next-step discipline, and stalled-opportunity triage so pipeline meetings become execution sessions, not status updates." },
  { title: "Call Review Systems", description: "We build the review cadence, scorecards, and feedback loops so coaching does not depend on whoever happens to have time that week." },
  { title: "Enablement Assets", description: "Playbooks, messaging frameworks, and one-pagers built around your buyers and kept where reps will find them." },
];

const steps = [
  { title: "Map the current motion", body: "We audit how calls, handoffs and pipeline actually run today." },
  { title: "Rebuild the process around how buyers decide", body: "We design the steps around the buyer's decision, not your org chart." },
  { title: "Turn it into assets reps use mid-call", body: "Talk tracks, cards and battlecards your reps reach for in the moment." },
  { title: "Pressure-test against live pipeline", body: "We watch where it breaks on real deals and tune it until it holds." },
];

export default function Process() {
  return (
    <div className="bg-black text-white">
      <PageHero
        eyebrow="Process"
        headline="A Process Your Reps Can !Actually !Run."
        sub="We take the frameworks everyone talks about and turn them into the calls, handoffs and pipeline habits your team runs every day."
      >
        <Btn href="/contact">Book a Working Session</Btn>
      </PageHero>

      <Section tone="dark">
        <SectionTitle eyebrow="How it works" title="The Methodology Meets ^Your Motion" />
        <p className="mb-4 text-sm font-black uppercase tracking-[0.16em] text-white">Frameworks we work with</p>
        <div className="mb-12 flex flex-wrap gap-3">
          {frameworks.map((f) => (
            <span key={f} className="rounded-full border border-white/20 bg-[#161616] px-5 py-2 text-[15px] text-white hover:border-[#62D2A2] hover:text-[#62D2A2] transition-colors">{f}</span>
          ))}
        </div>
        <CardGrid cols={4} items={meets.map((m) => ({ tag: m.tag, title: m.title, description: m.body }))} />
      </Section>

      <Section>
        <SectionTitle eyebrow="Core services" title="What We Build Into ^Your Process" />
        <CardGrid items={core} />
      </Section>

      <Section tone="dark">
        <SectionTitle eyebrow="How we run it" title="How We ^Run It." />
        <Steps steps={steps} />
      </Section>

      <ProductTieIn
        headline="Your playbook, live on every call."
        body="Qmo turns the playbook into Q Cards that surface mid-call and keeps improving them from real recordings."
      />

      <CtaBand headline="Ready To Make It ^Run?" primary={{ href: "/contact", label: "Book a Working Session" }} />
    </div>
  );
}
