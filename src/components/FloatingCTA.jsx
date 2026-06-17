"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [forceHide, setForceHide] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // Show CTA after 300px scroll - rAF-throttled so the handler does at most
  // one state check per frame instead of firing synchronously on every scroll
  // event (which janks heavily on scroll-driven pages).
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsVisible(window.scrollY > 300);
        ticking = false;
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide the CTA when a page's own CTA section is on screen. Re-observe on
  // route change instead of watching the entire document subtree for mutations
  // (the old MutationObserver fired on every DOM change - including the
  // continuously-mutating 3D <Html> overlays - and thrashed the main thread).
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isAnyInView = entries.some((entry) => entry.isIntersecting);
        setForceHide(isAnyInView);
      },
      { threshold: 0.1 }
    );

    // Wait a frame so the new route's DOM has mounted before observing.
    const raf = requestAnimationFrame(() => {
      document
        .querySelectorAll(".hide-floating-cta")
        .forEach((el) => observer.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {(isVisible && !forceHide) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[999]"
        >
          <Link href="/contact">
            <ShimmerButton
              className="shadow-2xl hover:scale-105 transition-transform"
              shimmerColor="#62D2A2"
              background="#000000"
              shimmerSize="0.1em"
            >
              <span className="relative z-10 font-bold text-white tracking-tight">
                Book a Working Session
              </span>
            </ShimmerButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
