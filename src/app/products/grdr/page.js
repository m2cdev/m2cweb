import GrdrClient from "@/components/revamp/GrdrClient";
import { GRDR_FAQS } from "@/components/revamp/faqs";

export const metadata = {
  title: "Grdr | AI Sales Call Grader | Map2Close",
  description: "Grade every cold call and deal the second the transcript lands, against proven frameworks, and get the exact words to say next time.",
  alternates: { canonical: "https://map2close.com/products/grdr" },
  openGraph: { title: "Grdr | AI Sales Call Grader", url: "https://map2close.com/products/grdr" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: GRDR_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function GrdrPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <GrdrClient />
    </>
  );
}
