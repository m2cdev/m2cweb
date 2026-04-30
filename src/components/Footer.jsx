"use client";

import React from "react";
import Link from "next/link";
import Map2CloseLogo from "./Logo";
import { Linkedin } from "lucide-react";

export default function Footer({ className = "" }) {
  return (
    <footer className={`bg-black border-t border-white/10 pt-24 pb-12 relative overflow-hidden ${className}`}>
      {/* Subtle brand gradients at the bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_left,_rgba(98,210,162,0.18)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-[500px] bg-[radial-gradient(circle_at_bottom_right,_rgba(249,107,107,0.15)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-[radial-gradient(circle_at_bottom,_rgba(255,255,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
      
      <div className="container-custom px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & Intro */}
          <div className="md:col-span-1">
            <div className="mb-8 scale-110 origin-left">
              <Map2CloseLogo />
            </div>
            <p className="text-white/80 font-body leading-relaxed mb-8 max-w-xs">
              Precision blueprinting for sales teams that can&apos;t afford to guess.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/company/map2close/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#62D2A2]/10 flex items-center justify-center text-[#62D2A2] hover:bg-[#62D2A2] hover:text-black transition-all"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-50">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">Home</Link></li>
              <li><Link href="/who-we-are" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">Who We Are</Link></li>
              <li><Link href="/who-we-are/compare" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">What We Do</Link></li>
              <li><Link href="/case-studies" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">Case Studies</Link></li>
              <li><Link href="/pilot" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">The Pilot</Link></li>
            </ul>
          </div>

          {/* Address */}
          <div className="md:ml-auto">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-50">Address</h3>
            <address className="not-italic text-white/80 font-body space-y-2 text-sm">
              <p>720 King St. W #161</p>
              <p>Toronto, Ontario, Canada</p>
              <p>M5V 3S5</p>
            </address>
          </div>

          {/* Contact Info */}
          <div className="md:ml-auto">
            <h3 className="text-white font-black uppercase tracking-widest text-[10px] mb-8 opacity-50">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+19292983580" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">
                  (929) 298-3580
                </a>
              </li>
              <li>
                <a href="mailto:letsclose@map2close.com" className="text-white/80 hover:text-[#62D2A2] transition-colors font-body text-sm">
                  letsclose@map2close.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-10 border-t border-white/5 text-center">
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            Copyright © 2025. Map2Close. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
