"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { trackProductCta, withUtm } from "./track";

// External product CTA: opens in a new tab with UTMs and fires product_cta_click.
export default function ProductCta({ product, href, children, variant = "solid", accent = "#63D2A3", textOnAccent = "#000", className = "" }) {
  const style =
    variant === "solid"
      ? { background: accent, color: textOnAccent }
      : { borderColor: "rgba(255,255,255,0.25)", color: "#fff" };
  return (
    <a
      href={withUtm(href)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackProductCta(product, typeof children === "string" ? children : product)}
      className={cn(
        "inline-flex items-center gap-3 px-8 py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5",
        variant !== "solid" && "border",
        className
      )}
      style={style}
    >
      {children}
    </a>
  );
}
