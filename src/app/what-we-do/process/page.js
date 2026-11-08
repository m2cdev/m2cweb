import ProcessClient from "@/components/revamp/ProcessClient";

export const metadata = {
  title: "Process | Sales Playbooks + Handoffs | Map2Close",
  description: "Playbooks, talk tracks, handoff design and pipeline rituals your reps can actually run. We turn the frameworks everyone talks about into daily habits.",
  openGraph: { title: "Process | Map2Close", url: "https://map2close.com/what-we-do/process" },
};

export default function Process() {
  return <ProcessClient />;
}
