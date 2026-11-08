import PeopleClient from "@/components/revamp/PeopleClient";

export const metadata = {
  title: "People | Sales Coaching + Enablement | Map2Close",
  description: "Live deal coaching, Cold Call Labs, 1-1 coaching and manager enablement. We embed with your reps on real calls and stay until the new habits stick.",
  openGraph: { title: "People | Map2Close", url: "https://map2close.com/what-we-do/people" },
};

export default function People() {
  return <PeopleClient />;
}
