"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  CONSENT_EVENT,
  CONSENT_SCRIPTS,
  OPEN_SETTINGS_EVENT,
  allows,
  categoriesInUse,
  gpcEnabled,
  readConsent,
  readConsentRaw,
  subscribeConsent,
  writeConsent,
} from "@/lib/consent";

// undefined on the server and during hydration, then the cookie value (or null).
function useConsentRaw() {
  return useSyncExternalStore(subscribeConsent, readConsentRaw, () => undefined);
}

const buttonBase =
  "rounded-lg px-4 py-2.5 text-sm font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#62D2A2]";

/** Cookie banner (first visit) and settings panel (footer "Cookie settings"). */
export function CookieBanner() {
  const raw = useConsentRaw();
  const [reopened, setReopened] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [draft, setDraft] = useState({});
  const categories = categoriesInUse();

  useEffect(() => {
    const reopen = () => {
      setDraft(readConsent() ?? {});
      setCustomize(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  // First visit (no cookie yet) or reopened from the footer.
  const open = reopened || raw === null;
  if (!open) return null;

  const save = (choice) => {
    writeConsent(choice);
    setReopened(false);
    setCustomize(false);
  };
  const all = Object.fromEntries(categories.map((c) => [c.key, true]));
  const gpc = gpcEnabled();

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[1000] p-4 md:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-[#0b0b0b]/95 p-5 md:p-6 text-white shadow-2xl backdrop-blur">
        <h2 id="cookie-banner-title" className="font-display text-lg font-bold">
          Cookies
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          We use essential cookies to run this site and remember your choice. Optional cookies are set only if you
          allow them. See our{" "}
          <Link href="/legal/cookies" className="text-[#62D2A2] underline underline-offset-4">
            Cookie Notice
          </Link>
          .
        </p>

        {customize && (
          <ul className="mt-4 space-y-3 border-t border-white/10 pt-4 text-sm">
            <li className="flex items-center justify-between gap-4">
              <span>
                <span className="font-semibold">Essential</span>
                <span className="block text-white/60">Required for the site to work. Always on.</span>
              </span>
              <input type="checkbox" checked disabled aria-label="Essential cookies (always on)" className="h-4 w-4 accent-[#62D2A2]" />
            </li>
            {categories.map((c) => {
              const blocked = c.key === "advertising" && gpc;
              return (
                <li key={c.key} className="flex items-center justify-between gap-4">
                  <label htmlFor={`consent-${c.key}`} className="font-semibold">
                    {c.label}
                    {blocked && <span className="block font-normal text-white/60">Off: your browser sends Global Privacy Control.</span>}
                  </label>
                  <input
                    id={`consent-${c.key}`}
                    type="checkbox"
                    disabled={blocked}
                    checked={!blocked && draft[c.key] === true}
                    onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.checked }))}
                    className="h-4 w-4 accent-[#62D2A2]"
                  />
                </li>
              );
            })}
            {categories.length === 0 && (
              <li className="text-white/60">This site does not currently use any optional cookies.</li>
            )}
          </ul>
        )}

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={() => save({})} className={`${buttonBase} border border-white/20 text-white hover:border-white/50`}>
            Reject all
          </button>
          {customize ? (
            <button type="button" onClick={() => save(draft)} className={`${buttonBase} border border-white/20 text-white hover:border-white/50`}>
              Save choices
            </button>
          ) : (
            <button type="button" onClick={() => setCustomize(true)} className={`${buttonBase} border border-white/20 text-white hover:border-white/50`}>
              Customize
            </button>
          )}
          <button type="button" onClick={() => save(all)} className={`${buttonBase} bg-[#62D2A2] text-black hover:bg-white`}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

/** Loads each registered non-essential script only once its category is allowed. */
export function ConsentScripts() {
  const consent = readConsent(useConsentRaw());
  return CONSENT_SCRIPTS.filter((s) => allows(consent, s.category)).map((s) => (
    <Script key={s.id} id={s.id} src={s.src} strategy="afterInteractive" />
  ));
}

/** Footer "Cookie settings" control: reopens the banner. */
export function CookieSettingsButton({ className = "" }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
