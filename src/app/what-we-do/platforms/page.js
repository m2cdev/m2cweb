import PlatformsClient from "@/components/revamp/PlatformsClient";

export const metadata = {
  title: "Platforms | CRM, Automation + Custom Builds | Map2Close",
  description: "CRM setup, stack integration, workflow automation and custom builds wired around how your deals move.",
  openGraph: { title: "Platforms | Map2Close", url: "https://map2close.com/what-we-do/platforms" },
};

export default function Platforms() {
  return <PlatformsClient />;
}
