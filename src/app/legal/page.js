import Link from "next/link";
import { LEGAL_DOCS } from "@/content/legal/config.mjs";

export const metadata = {
  title: "Legal | Map2Close",
  description: "Map2Close and Mappy legal notices.",
  alternates: { canonical: "https://map2close.com/legal" },
};

export default function LegalHubPage() {
  const docs = LEGAL_DOCS.filter((d) => d.published);
  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      <section className="max-w-3xl mx-auto px-6 pt-32 md:pt-40 pb-32">
        <div className="mb-7 flex items-center gap-3">
          <div className="h-px w-6 bg-[#62D2A2]" />
          <span className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#62D2A2]">Legal</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-tight">Legal</h1>
        <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {docs.map((d) => (
            <li key={d.slug}>
              <Link
                href={d.path}
                className="flex items-center justify-between gap-4 py-5 text-lg md:text-xl font-semibold text-white hover:text-[#62D2A2] transition-colors"
              >
                <span>{d.title}</span>
                <span aria-hidden className="text-[#62D2A2]">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
