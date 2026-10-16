import aiDataUse from "./ai-data-use.mjs";
import acceptableUse from "./acceptable-use.mjs";
import cookies from "./cookies.mjs";
import dpa from "./dpa.mjs";
import privacy from "./privacy.mjs";
import subprocessors from "./subprocessors.mjs";
import terms from "./terms.mjs";
import websiteTerms from "./website-terms.mjs";

export const LEGAL_CONTENT = {
  "ai-data-use": aiDataUse,
  "acceptable-use": acceptableUse,
  cookies,
  dpa,
  privacy,
  subprocessors,
  terms,
  "website-terms": websiteTerms,
};
