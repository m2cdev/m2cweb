import ProductsClient from "@/components/revamp/ProductsClient";
import { FAQS } from "@/components/revamp/faqs";

export const metadata = {
  title: "Products | Qmo + Grdr by Map2Close",
  description: "Qmo gives reps live AI coaching on every sales call. Grdr grades every call and deal in seconds. Built by Map2Close.",
  openGraph: { title: "Products | Qmo + Grdr by Map2Close", url: "https://map2close.com/products" },
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ProductsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <ProductsClient />
    </>
  );
}
