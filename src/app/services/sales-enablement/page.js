import React from "react";
import ServiceSubpageLayout from "@/components/layout/ServiceSubpageLayout";
import { Waves } from "@/components/ui/wave-background";

export const metadata = {
  title: "Sales Enablement — Map2Close | Embedded Rep Coaching & Execution",
  description: "We embed inside your sales motion — live deal coaching, cold call labs, 1-1s, group training, and custom playbooks. Real execution, not theory."
};

const serviceRows = [
  {
    title: "Live Deal Coaching",
    description: "We shadow active deals, identify where momentum is slipping, and coach reps through in real time. No theory. Just execution."
  },
  {
    title: "Cold Call Labs",
    description: "Live sessions where reps practice outreach, get immediate feedback, and sharpen their messaging until it lands."
  },
  {
    title: "1-1 Coaching",
    description: "Individual sessions built around each rep's gaps — discovery, objection handling, closing, or pipeline management."
  },
  {
    title: "Group Training Sessions",
    description: "Team-wide sessions covering the frameworks, methodologies, and plays your reps need to sell more consistently."
  },
  {
    title: "Enablement Assets",
    description: "Custom playbooks, objection handling guides, messaging frameworks, and battlecards — built for your team and embedded into your sales motion."
  }
];

export default function SalesEnablementPage() {
  return (
    <ServiceSubpageLayout
      breadcrumb="Services / Sales Enablement"
      heroHeadline="Strategy is easy. !Execution is where ^Most !Partners ^Skip."
      heroSubtext="We embed into your sales motion to work directly with your reps on real calls and real deals. Execution is where most partners tap out — we make sure your team doesn't."
      heroBackground={
        <div className="w-full h-full relative">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20 z-10" />
          <Waves 
            strokeColor="#62D2A2" 
            backgroundColor="transparent"
            className="opacity-50"
          />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20 z-10" />
        </div>
      }
      approachText="We use industry-standard methodologies — MEDDPICC, BANT, and more — as the foundation. But nothing is off the shelf. Every session, asset, and roadmap is custom-built around your team's gaps, your buyers, and the outcomes you're trying to hit."
      serviceRows={serviceRows}
      ctaHeadline="Think your team could be closing more?"
      ctaPrimaryText="Let's Find Out"
    />
  );
}
