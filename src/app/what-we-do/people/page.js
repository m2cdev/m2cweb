import { PageHero, Btn, Section, SectionTitle, CardGrid, ProductTieIn, CtaBand } from "@/components/revamp/ui";

export const metadata = {
  title: "People | Sales Coaching + Enablement | Map2Close",
  description: "Live deal coaching, Cold Call Labs, 1-1 coaching and manager enablement. We embed with your reps on real calls and stay until the new habits stick.",
  openGraph: { title: "People | Map2Close", url: "https://map2close.com/what-we-do/people" },
};

const core = [
  { title: "Live Deal Coaching", description: "We shadow active deals, identify where momentum is slipping, and coach reps through the next move in real time. No abstract advice. Just execution against live pipeline." },
  { title: "Cold Call Labs", description: "Live sessions where reps practice outreach, get immediate feedback, and sharpen openers, objection handling, and follow-up until the message lands." },
  { title: "1-1 Coaching", description: "Individual sessions built around each rep's gaps: discovery, objection handling, closing, pipeline management, or consistency across the week." },
  { title: "Group Training Sessions", description: "Team-wide sessions that turn the winning motion into shared language, shared standards, and plays reps can use on the next call." },
  { title: "Manager Enablement", description: "We give frontline leaders the language, dashboards, and coaching structure to reinforce the motion after the initial engagement." },
  { tag: "30 by 30", title: "Rep Onboarding + Ramp", description: "New reps ramped with our framework, a CRM walkthrough and call reviews, so they are productive within 30 days." },
];

export default function People() {
  return (
    <div className="bg-black text-white">
      <PageHero
        eyebrow="People"
        headline="Strategy is ^Easy. Execution is where Most Partners ^Skip."
        sub="We embed with your reps on real calls and real deals, then stay until the new habits stick."
      >
        <Btn href="/contact">Book a Working Session</Btn>
      </PageHero>

      <Section tone="dark">
        <SectionTitle eyebrow="Core services" title="This Is What We Mean By ^Execution" />
        <CardGrid items={core} />
      </Section>

      <ProductTieIn
        headline="Coaching that doesn't stop when we leave the call."
        body="Qmo puts live cards in front of reps on every call. Grdr grades every call against your playbook."
      />

      <CtaBand
        headline="Think Your Team Could Be ^Closing ^More?"
        sub="Let's find out."
        primary={{ href: "/contact", label: "Book a Working Session" }}
      />
    </div>
  );
}
