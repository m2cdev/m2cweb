import { LEGAL_DOCS } from "@/content/legal/config.mjs";

export default function sitemap() {
  const base = "https://map2close.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/who-we-are`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-do`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/what-we-do/people`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-do/process`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-do/platforms`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/products`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products/qmo`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/products/grdr`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/case-studies`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/case-studies/sales-enablement-hub`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/case-studies/signal-intelligence-engine`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/case-studies/trial-to-close-engine`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/pilot`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/how-we-compare`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/legal`, lastModified, changeFrequency: "monthly", priority: 0.3 },
    ...LEGAL_DOCS.filter((d) => d.published).map((d) => ({
      url: `${base}${d.path}`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    })),
  ];
}
