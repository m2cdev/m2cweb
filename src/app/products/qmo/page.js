import QmoClient from "@/components/revamp/QmoClient";
import { QMO_FAQS } from "@/components/revamp/faqs";

export const metadata = {
  title: "Qmo | Live AI Sales Call Coaching | Map2Close",
  description: "Qmo puts the right question, objection handle or close in front of reps while the call is still winnable, right inside your CRM.",
  alternates: { canonical: "https://map2close.com/products/qmo" },
  openGraph: { title: "Qmo | Live AI Sales Call Coaching", url: "https://map2close.com/products/qmo" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: QMO_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function QmoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <QmoClient />
    </>
  );
}
