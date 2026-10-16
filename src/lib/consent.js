// Cookie consent, built in-house (no consent vendor).
//
// The visitor's choice is stored in one first-party, essential cookie. Any
// non-essential script must be registered in CONSENT_SCRIPTS under its category;
// <ConsentScripts /> loads it only after the visitor allows that category.
//
// Today the marketing site loads no analytics, advertising or other
// non-essential cookie-setting scripts (AUDIT.md Part A6(c)), so the registry is
// empty and the banner offers Essential only. Register a script here (and list
// it in the Cookie Notice) before adding one anywhere else.

export const CONSENT_COOKIE = "m2c_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 days

export const CONSENT_EVENT = "m2c:consent-changed";
export const OPEN_SETTINGS_EVENT = "m2c:open-cookie-settings";

/** Non-essential categories a script can be filed under. */
export const OPTIONAL_CATEGORIES = [
  { key: "functionality", label: "Functionality" },
  { key: "analytics", label: "Analytics" },
  { key: "advertising", label: "Advertising" },
];

/**
 * { category, id, src } entries for next/script. Empty on purpose; see above.
 * @type {Array<{ category: "functionality" | "analytics" | "advertising", id: string, src: string }>}
 */
export const CONSENT_SCRIPTS = [];

/** Categories the site actually uses: the only ones the banner offers. */
export function categoriesInUse() {
  const used = new Set(CONSENT_SCRIPTS.map((s) => s.category));
  return OPTIONAL_CATEGORIES.filter((c) => used.has(c.key));
}

/** Global Privacy Control is treated as a rejection of advertising. */
export function gpcEnabled() {
  return typeof navigator !== "undefined" && navigator.globalPrivacyControl === true;
}

function normalize(choice) {
  return {
    v: CONSENT_VERSION,
    functionality: choice.functionality === true,
    analytics: choice.analytics === true,
    advertising: choice.advertising === true && !gpcEnabled(),
    at: choice.at ?? new Date().toISOString(),
  };
}

/** The raw cookie value, or null when the visitor has not chosen yet. */
export function readConsentRaw() {
  if (typeof document === "undefined") return null;
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
      ?.slice(CONSENT_COOKIE.length + 1) ?? null
  );
}

/** Subscribe to consent changes (for useSyncExternalStore). */
export function subscribeConsent(onChange) {
  window.addEventListener(CONSENT_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_EVENT, onChange);
}

/** The stored choice, or null when the visitor has not chosen yet. */
export function readConsent(raw = readConsentRaw()) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (parsed?.v !== CONSENT_VERSION) return null;
    return normalize(parsed);
  } catch {
    return null;
  }
}

export function writeConsent(choice) {
  const value = normalize({ ...choice, at: undefined });
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
  return value;
}

export function allows(consent, category) {
  if (!consent) return false;
  if (category === "advertising" && gpcEnabled()) return false;
  return consent[category] === true;
}
