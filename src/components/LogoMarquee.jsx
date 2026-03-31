"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const brands = [
  { name: "ResQ", logo: "https://cdn.prod.website-files.com/65b2497d2f86e9ab7f2cbf95/66bcf283927b22d32054dbe2_ResQ%20Orange%20Logo.svg", url: "https://www.getresq.com/", invert: false },
  { name: "Waves Mvmnt", logo: "https://wavesmvmnt.com/images/waves-logo.svg", url: "https://www.wavesmvmnt.com/", invert: true },
  { name: "Constant Contact", logo: "https://images.ctfassets.net/t21gix3kzulv/3m1hheB7Okv7IdppkEMSxl/b0107620062968f8c479eef7f9f77f53/CTCT_Logo_H_Stack_FC_RGB.svg", url: "https://www.constantcontact.com/", invert: false },
  { name: "Tech2Clean", logo: "https://tech2clean.com/cdn/shop/files/download-52.webp?height=50&v=1755584470", url: "https://tech2clean.com/", invert: true },
  { name: "NOSAI Innovations", logo: "https://www.nosaiinnovations.com/wp-content/uploads/2024/06/download-63.png", url: "https://www.nosaiinnovations.com/", invert: false },
  { name: "Solaris Robots", logo: "https://solarisrobots.com/wp-content/uploads/2025/02/solaris-logo-white-web.png", url: "https://solarisrobots.com/", invert: false },
  { name: "WBFC", logo: "https://wbfc.ca/wp-content/uploads/2025/03/WBFC_logo.png", url: "https://wbfc.ca/", invert: false },
  { name: "Adam Tools", logo: "https://adam-tools.com/cdn/shop/files/AT_New_Logo_Black_PNG_Cropped_1e147572-adca-46ff-9611-d796c997d455_240x165.png?v=1666558949", url: "https://adam-tools.com/", invert: true },
  { name: "Walmart", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Walmart_logo_%282008%29.svg", url: "https://www.walmart.com/", invert: false },
];

export const LogoMarquee = () => {
  return (
    <section className="bg-black py-24 overflow-hidden border-y border-white/5">
      <div className="container-custom mb-16 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-4">
          Trusted by Leading Brands <br />
          <span className="text-primary italic">Worldwide</span>
        </h2>
        <p className="text-gray-500 font-bold tracking-[0.3em] uppercase text-xs">Category-Leading Sales Architecture</p>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused] py-4">
          {[...brands, ...brands].map((brand, idx) => (
            <Link
              key={idx}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-10 transition-all duration-500 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 scale-100 hover:scale-110"
            >
              <div className="relative h-12 w-32 transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(98,210,162,0.3)]">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className={cn(
                    "object-contain",
                    brand.invert && "invert brightness-200"
                  )}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: fit-content;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default LogoMarquee;
