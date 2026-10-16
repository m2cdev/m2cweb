import { notFound } from "next/navigation";
import LegalDocument from "@/components/legal/LegalDocument";
import { LEGAL_DOCS, legalDoc } from "@/content/legal/config.mjs";
import { LEGAL_CONTENT } from "@/content/legal/docs/index.mjs";

// Unpublished docs 404 in production and render as drafts everywhere else
// (local builds, dev, previews), where VERCEL_ENV is not "production".
const isProduction = process.env.VERCEL_ENV === "production";

export const dynamicParams = false;

export function generateStaticParams() {
  return LEGAL_DOCS.filter((d) => d.published || !isProduction).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const config = legalDoc(slug);
  const doc = LEGAL_CONTENT[slug];
  if (!config || !doc) return {};
  return {
    title: `${config.title} | Map2Close`,
    alternates: { canonical: `https://map2close.com${config.path}` },
    ...(config.published ? {} : { robots: { index: false, follow: false } }),
  };
}

export default async function LegalDocPage({ params }) {
  const { slug } = await params;
  const config = legalDoc(slug);
  const doc = LEGAL_CONTENT[slug];
  if (!config || !doc) notFound();
  if (!config.published && isProduction) notFound();
  return <LegalDocument doc={doc} effectiveDate={config.effectiveDate} draft={!config.published} />;
}
