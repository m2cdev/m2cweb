// Which legal docs are live, and when they took effect.
//
// published: false -> 404 in production; renders with a DRAFT banner in dev
// and preview; left out of the sitemap, the /legal hub and the footer.
// effectiveDate: the date shown as "Effective date" / "Last updated". Set it
// (e.g. "October 20, 2026") when a doc is published. The build fails while a
// published doc has no date or still contains "[TBD" (scripts/check-legal-tbd.mjs).
//
// Shared by the pages, the footer, the sitemap and next.config.mjs (the
// /privacy redirect), so it stays plain ESM with no imports.

export const LEGAL_DOCS = [
  { slug: "website-terms", title: "Website Terms of Use", path: "/legal/website-terms", published: true, effectiveDate: "October 16, 2026" },
  { slug: "acceptable-use", title: "Acceptable Use Policy", path: "/legal/acceptable-use", published: true, effectiveDate: "October 16, 2026" },
  // Unpublished until every sub-processor location is confirmed (several are still [TBD]).
  { slug: "subprocessors", title: "Sub-processor List", path: "/legal/subprocessors", published: false, effectiveDate: null },
  { slug: "cookies", title: "Cookie Notice", path: "/legal/cookies", published: true, effectiveDate: "October 16, 2026" },
  { slug: "privacy", title: "Privacy Policy", path: "/legal/privacy", published: true, effectiveDate: "October 16, 2026" },
  { slug: "terms", title: "Terms of Service", path: "/legal/terms", published: false, effectiveDate: null },
  { slug: "dpa", title: "Data Processing Addendum", path: "/legal/dpa", published: false, effectiveDate: null },
  { slug: "ai-data-use", title: "AI & Data Use Policy", path: "/legal/ai-data-use", published: false, effectiveDate: null },
];

export function legalDoc(slug) {
  return LEGAL_DOCS.find((d) => d.slug === slug) ?? null;
}

export function isLegalPublished(slug) {
  return legalDoc(slug)?.published === true;
}
