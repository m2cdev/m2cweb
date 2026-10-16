// Build guard: a published legal doc may not ship with an open placeholder.
// Fails the build if any doc with published: true contains "[TBD" anywhere in
// its text or has no effectiveDate. Unpublished docs are reported, not enforced.

import { LEGAL_DOCS } from "../src/content/legal/config.mjs";
import { LEGAL_CONTENT } from "../src/content/legal/docs/index.mjs";

let failed = 0;
for (const doc of LEGAL_DOCS) {
  const content = LEGAL_CONTENT[doc.slug];
  if (!content) {
    console.error(`legal guard: no content file for "${doc.slug}"`);
    failed++;
    continue;
  }
  const text = JSON.stringify(content.blocks) + content.title;
  const tbd = text.split("[TBD").length - 1;
  const problems = [];
  if (tbd) problems.push(`${tbd} [TBD placeholder(s)`);
  if (!doc.effectiveDate) problems.push(`no effectiveDate (${content.dateLabel} would show [TBD])`);
  const verdict = problems.length ? "FAIL" : "PASS";
  const state = doc.published ? "published" : "unpublished";
  console.log(`legal guard: ${verdict} ${doc.slug} (${state})${problems.length ? ": " + problems.join("; ") : ""}`);
  if (doc.published && problems.length) failed++;
}

if (failed) {
  console.error(`legal guard: ${failed} published doc(s) still have open placeholders. Resolve them or set published: false in src/content/legal/config.mjs.`);
  process.exit(1);
}
