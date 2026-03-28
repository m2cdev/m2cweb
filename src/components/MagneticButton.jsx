"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function MagneticButton({ children, className = "", ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.3, ease: "power3" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.3, ease: "power3" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = btn.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      
      // Limit movement to max 15px
      xTo(x * 0.15);
      yTo(y * 0.15);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    btn.addEventListener("mousemove", mouseMove);
    btn.addEventListener("mouseleave", mouseLeave);

    return () => {
      btn.removeEventListener("mousemove", mouseMove);
      btn.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`relative inline-flex items-center justify-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
