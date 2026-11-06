// Product CTA tracking. Pushes to dataLayer / gtag when an analytics tag is
// present on the page and always emits a DOM event so any tool can listen.
export function trackProductCta(product, label) {
  if (typeof window === "undefined") return;
  const payload = { event: "product_cta_click", product, label };
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === "function") window.gtag("event", "product_cta_click", { product, label });
    window.dispatchEvent(new CustomEvent("product_cta_click", { detail: payload }));
  } catch (_) {
    /* tracking must never break the page */
  }
}

const UTM = "utm_source=map2close&utm_medium=website&utm_campaign=products_page";
export function withUtm(url) {
  return url + (url.includes("?") ? "&" : "?") + UTM;
}
