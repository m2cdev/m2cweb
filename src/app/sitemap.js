export default function sitemap() {
  const base = "https://map2close.com";
  const lastModified = new Date();

  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/who-we-are`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/sales-enablement`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/implementations`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/custom-buildouts`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/services/ai-sales-assistant`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/case-studies`, lastModified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/pilot`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/how-we-compare`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
