"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Every page: the last section sits flush against the footer. Walk down the
// last-child chain that touches the footer and drop its bottom padding,
// bottom margin and any forced minimum height, so no empty band is left.
export default function FlushFooter() {
  const pathname = usePathname();
  useEffect(() => {
    const run = () => {
      const footer = document.querySelector("main > footer");
      if (!footer) return;
      let el = footer.previousElementSibling;
      while (el && el.nodeType === 1) {
        const gap = footer.getBoundingClientRect().top - el.getBoundingClientRect().bottom;
        if (gap > 400) break;
        const cs = getComputedStyle(el);
        // A bordered or rounded box is a card, not a section: leave it alone.
        if (parseFloat(cs.borderBottomWidth) > 0 || parseFloat(cs.borderBottomLeftRadius) > 0) break;
        el.style.paddingBottom = "0px";
        el.style.marginBottom = "0px";
        el = el.lastElementChild;
        if (el && ["SCRIPT", "STYLE", "SVG", "svg"].includes(el.tagName)) break;
      }
    };
    run();
    const timers = [300, 1200, 3000].map((t) => setTimeout(run, t));
    window.addEventListener("resize", run);
    return () => { timers.forEach(clearTimeout); window.removeEventListener("resize", run); };
  }, [pathname]);
  return null;
}
