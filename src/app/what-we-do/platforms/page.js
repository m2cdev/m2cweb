import { Section, SectionTitle, CardGrid, Steps, ProductTieIn, CtaBand, Btn, Eyebrow, GridBackdrop, Reveal } from "@/components/revamp/ui";
import DashboardMock from "@/components/revamp/DashboardMock";

export const metadata = {
  title: "Platforms | CRM, Automation + Custom Builds | Map2Close",
  description: "CRM setup, stack integration, workflow automation and custom builds wired around how your deals move.",
  openGraph: { title: "Platforms | Map2Close", url: "https://map2close.com/what-we-do/platforms" },
};

const implementation = [
  { title: "CRM Setup + Optimization", description: "We configure your CRM around a process that reflects how your deals actually move: clean pipelines, meaningful stages, and workflows your reps will use." },
  { title: "Tech Stack Integration", description: "Sales tools working in silos kill efficiency. We connect and streamline your existing stack so data flows where it needs to go and nothing falls through the cracks." },
  { title: "Workflow Automation", description: "We identify every manual, repetitive workflow and automate it, so your reps stay focused on selling, not admin." },
  { title: "Stack Optimization", description: "Most teams use 20% of what their tools can do. We unlock the rest, so you get the most out of every tool you are already paying for." },
];

const builds = [
  { title: "Sales Enablement Hub", description: "A centralized hub where reps access live sales assets, battlecards, and deal kits, filtered by deal stage, persona, or use case.", href: "/case-studies/sales-enablement-hub" },
  { title: "Signal Intelligence Engine", description: "Signal engines that surface ICP-specific buying signals, funding rounds, leadership changes, and intent activity directly inside workflows.", href: "/case-studies/signal-intelligence-engine" },
  { title: "Trial-to-Close Engine", description: "Guided trial playbooks and monitoring engines that track active trials, flag stalling deals, and suggest next steps after the demo.", href: "/case-studies/trial-to-close-engine" },
];

const steps = [
  { title: "Map the current motion", body: "We audit how leads, deals, handoffs, fields, automations, and reporting actually work today before changing the stack." },
  { title: "Rebuild around rep behavior", body: "We simplify the CRM and workflows around what reps need to do next, not around how the software was configured by default." },
  { title: "Automate the repeatable work", body: "Manual updates, routing, alerts, enrichment, and follow-up triggers get moved into clean workflows your team can maintain." },
  { title: "Enable and pressure-test", body: "We train the team inside the rebuilt motion, watch where adoption breaks, and tune the system against live pipeline." },
];

export default function Platforms() {
  return (
    <div className="bg-black text-white">
      <section className="relative min-h-[85vh] flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-32 pb-20 px-6 md:px-16 max-w-[1400px] mx-auto overflow-hidden">
        <GridBackdrop />
        <div className="relative z-10 flex-1 md:max-w-[52%]">
          <Eyebrow>Platforms</Eyebrow>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-black tracking-tight leading-[0.98] mb-6 text-white">
            Your Stack Should Be <span className="text-[#62D2A2]">Working</span> Harder Than You Are.
          </h1>
          <p className="font-body text-white text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            We configure your CRM and tools around a process built to convert, and build what your stack can&apos;t do on its own.
          </p>
          <Btn href="/contact">Book a Working Session</Btn>
        </div>
        <div className="relative z-10 flex-1 w-full">
          <DashboardMock />
        </div>
      </section>

      <Section tone="dark">
        <SectionTitle
          eyebrow="Implementations"
          title="Everything ^Connected. Everything ^Automated."
        />
        <p className="-mt-6 mb-10 inline-block rounded-full border border-[#62D2A2]/40 bg-[#62D2A2]/5 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-[#62D2A2]">45 to Live</p>
        <CardGrid cols={2} items={implementation} />
      </Section>

      <Section id="custom-builds">
        <SectionTitle eyebrow="Custom builds" title="Every Build Starts With A ^Problem" sub="Systems we build inside real revenue motions." />
        <p className="-mt-6 mb-10 inline-block rounded-full border border-[#62D2A2]/40 bg-[#62D2A2]/5 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-[#62D2A2]">Built in 30</p>
        <CardGrid items={builds} />
      </Section>

      <Section tone="dark">
        <SectionTitle eyebrow="How we run it" title="How We !Run It." sub="Implementation that reaches the field, not just the settings page." />
        <Steps steps={steps} />
      </Section>

      <ProductTieIn
        headline="Some builds became products."
        body="Qmo and Grdr started as internal tools. Both sit on top of your existing CRM."
      />

      <CtaBand
        headline="Have a Bottleneck We Haven't ^Seen Before?"
        primary={{ href: "/contact", label: "Let's Build Around It" }}
      />
    </div>
  );
}
