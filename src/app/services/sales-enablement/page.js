import React from "react";
import ServiceSubpageLayout from "@/components/layout/ServiceSubpageLayout";
import { Waves } from "@/components/ui/wave-background";

export const metadata = {
  title: "Sales Enablement, Map2Close | Embedded Rep Coaching & Execution",
  description: "We embed inside your sales motion, live deal coaching, cold call labs, 1-1s, group training, and custom playbooks. Real execution, not theory."
};

const serviceRows = [
  {
    title: "Live Deal Coaching",
    description: "We shadow active deals, identify where momentum is slipping, and coach reps through the next move in real time. No abstract advice. Just execution against live pipeline."
  },
  {
    title: "Cold Call Labs",
    description: "Live sessions where reps practice outreach, get immediate feedback, and sharpen openers, objection handling, and follow-up until the message lands."
  },
  {
    title: "1-1 Coaching",
    description: "Individual sessions built around each rep's gaps, discovery, objection handling, closing, pipeline management, or consistency across the week."
  },
  {
    title: "Group Training Sessions",
    description: "Team-wide sessions that turn the winning motion into shared language, shared standards, and plays reps can use on the next call."
  },
  {
    title: "Enablement Assets",
    description: "Playbooks, objection handling guides, messaging frameworks, and battlecards built around your buyers and embedded into the way your reps already work."
  },
  {
    title: "Call Review Systems",
    description: "We build the review cadence, scorecards, and feedback loops so coaching does not depend on whoever happens to have time that week."
  },
  {
    title: "Pipeline Rituals",
    description: "Weekly deal review, next-step discipline, and stalled-opportunity triage so pipeline meetings become execution sessions, not status updates."
  },
  {
    title: "Manager Enablement",
    description: "We give frontline leaders the language, dashboards, and coaching structure to reinforce the motion after the initial engagement."
  }
];

export default function SalesEnablementPage() {
  return (
    <ServiceSubpageLayout
      breadcrumb="Services / Sales Enablement"
      heroHeadline="Strategy is ^Easy. Execution is where Most Partners ^Skip."
      heroSubtext="We embed into your sales motion to work directly with your reps on real calls and real deals. Execution is where most partners tap out, we make sure your team doesn't."
      heroBackground={
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 z-10" />
          <Waves 
            strokeColor="#62D2A2" 
            backgroundColor="black"
            className="opacity-50"
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 z-10" />
        </div>
      }
      approachText="We use industry-standard methodologies, MEDDPICC, BANT, and more, as the foundation. Then we translate them into your actual sales motion: the calls your reps run, the objections they hear, the handoffs they manage, and the deals sitting in pipeline right now."
      serviceRowsTitle="This Is What We Mean By ^Execution"
      serviceRows={serviceRows}
      ctaHeadline="Think Your Team Could Be ^Closing ^More?"
      ctaSubtext="Let's find out."
      ctaPrimaryText="Book a Working Session"
    />
  );
}
