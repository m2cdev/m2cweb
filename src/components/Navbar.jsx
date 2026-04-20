"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Map2CloseLogo from "@/components/Logo";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are", dropdown: [
    { name: "Company", href: "/who-we-are" },
    { name: "How We Compare", href: "/who-we-are/compare" }
  ]},
  { name: "What We Do", href: "/services", dropdown: [
    { name: "Overview", href: "/services" },
    { name: "Sales Enablement", href: "/services/sales-enablement" },
    { name: "Rev Ops Implementations", href: "/services/rev-ops-implementations" },
    { name: "Rev Ops Custom Buildouts", href: "/services/rev-ops-custom-buildouts" },
    { name: "AI Sales Assistant", href: "/services/ai-sales-assistant" },
  ]},
  { name: "Case Studies", href: "/case-studies", dropdown: [
    { name: "Overview", href: "/case-studies" },
    { name: "Signal Intelligence", href: "/case-studies/signpost" },
    { name: "Sales Enablement", href: "/case-studies/pinecone" },
    { name: "Revenue Systems", href: "/case-studies/zenatech" },
    { name: "Trial Optimization", href: "/case-studies/qwilr" },
  ]},
  { name: "The Pilot", href: "/pilot" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? "bg-black/90 backdrop-blur-2xl border-b border-white/10 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Map2CloseLogo className="h-10" />

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                    ? "text-primary" 
                    : "text-gray-300 hover:text-[#F96B6B]"
                )}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="inline-block ml-1 w-4 h-4 opacity-50" />}
              </Link>

              {/* Dropdown */}
              {link.dropdown && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="bg-black/95 backdrop-blur-3xl border border-white/10 p-2 rounded-xl min-w-[200px] shadow-3xl">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "block px-4 py-3 text-sm rounded-lg transition-colors duration-300",
                          pathname === item.href 
                            ? "text-primary bg-white/5" 
                            : "text-gray-400 hover:text-[#F96B6B] hover:bg-white/5"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:block">
          <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
            <ShimmerButton 
              shimmerColor="#62D2A2" 
              background="#111" 
              className="h-10 px-6 rounded-full"
              shimmerSize="0.1em"
            >
              <span className="text-xs font-black text-white uppercase tracking-widest">Let&apos;s Close</span>
            </ShimmerButton>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white p-2 rounded-lg bg-white/5"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 z-40 bg-black/95 backdrop-blur-3xl border-b border-white/10 flex flex-col p-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-2">
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "text-2xl font-bold transition-colors duration-300",
                      (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                        ? "text-primary" 
                        : "text-white hover:text-[#F96B6B]"
                    )}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 flex flex-col gap-4 border-l border-white/10 pl-6 my-2">
                      {link.dropdown.map((item) => (
                         <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={cn(
                            "text-lg transition-colors duration-300",
                            pathname === item.href 
                              ? "text-primary" 
                              : "text-gray-400 hover:text-[#F96B6B]"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-white/10">
              <Link href="https://sales.map2close.com/meetings/kenzo/disco?uuid=f3fa6679-849d-4d9e-85de-c4525efb4f96" target="_blank">
                <ShimmerButton className="w-full h-14 rounded-xl" shimmerColor="#62D2A2">
                  <span className="text-lg font-bold">Book a Working Session</span>
                </ShimmerButton>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
