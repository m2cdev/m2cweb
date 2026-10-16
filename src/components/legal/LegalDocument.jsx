import React from "react";

// Renders one legal doc from its structured data file (src/content/legal/docs).
// Presentation only: every string comes from the data file unchanged.

function Table({ head, rows }) {
  return (
    <div className="my-6 -mx-6 md:mx-0 overflow-x-auto">
      <table className="min-w-[36rem] w-full mx-6 md:mx-0 text-left text-sm md:text-base border-collapse">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th key={i} className="align-bottom border-b border-[#62D2A2]/40 py-3 pr-4 font-bold text-white">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-white/10">
              {row.map((cell, c) => (
                <td key={c} className={`align-top py-3 pr-4 ${c === 0 ? "font-semibold text-white" : "text-white/80"}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Block({ block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-14 mb-5 font-display text-2xl md:text-3xl font-bold tracking-tight text-white">{block.text}</h2>
      );
    case "h3":
      return <h3 className="mt-10 mb-4 font-display text-xl md:text-2xl font-semibold text-white">{block.text}</h3>;
    case "p":
      return <p className="my-4 text-base md:text-lg leading-relaxed text-white/80">{block.text}</p>;
    case "ul":
      return (
        <ul className="my-4 space-y-3 pl-5 list-disc marker:text-[#62D2A2] text-base md:text-lg leading-relaxed text-white/80">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="my-4 space-y-3 text-base md:text-lg leading-relaxed text-white/80">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 font-semibold text-[#62D2A2]">{item.n}.</span>
              <span>{item.text}</span>
            </li>
          ))}
        </ol>
      );
    case "table":
      return <Table head={block.head} rows={block.rows} />;
    default:
      return null;
  }
}

export default function LegalDocument({ doc, effectiveDate, draft }) {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-primary/30">
      <article className="max-w-3xl mx-auto px-6 pt-32 md:pt-40 pb-32">
        {draft && (
          <div role="status" className="mb-10 rounded-lg border border-[#F96B6B]/60 bg-[#F96B6B]/10 px-4 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#F96B6B]">
            Draft - not published. This page returns 404 in production.
          </div>
        )}
        <div className="mb-7 flex items-center gap-3">
          <div className="h-px w-6 bg-[#62D2A2]" />
          <span className="text-[14px] font-bold uppercase tracking-[0.18em] text-[#62D2A2]">Legal</span>
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-black tracking-tighter leading-tight">{doc.title}</h1>
        <p className="mt-6 text-sm uppercase tracking-[0.14em] text-white/50">
          {doc.dateLabel}: {effectiveDate ?? "[TBD]"} · {doc.byline}
        </p>
        <div className="mt-8">
          {doc.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>
      </article>
    </div>
  );
}
