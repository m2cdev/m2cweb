import Hero from "@/components/sections/Hero";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import WhereWeHelpSection from "@/components/sections/WhereWeHelpSection";
import CaseStudiesHighlight from "@/components/sections/CaseStudiesHighlight";
import CustomPilotPreview from "@/components/sections/CustomPilotPreview";
import FinalCTASection from "@/components/sections/FinalCTASection";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Hero />
      <ProblemSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <WhereWeHelpSection />
      <CaseStudiesHighlight />
      <CustomPilotPreview />
      <FinalCTASection />
    </div>
  );
}
