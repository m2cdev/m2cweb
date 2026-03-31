"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card-effect";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const philosophyCards = [
  {
    title: "Precision First",
    description: "We don't guess. We map. Every move is calculated based on deep account intelligence and decision-making patterns.",
    image: "/precision-first.png"
  },
  {
    title: "Complexity Mapping",
    description: "The bigger the deal, the more noise. We filter the noise to find the clear path to a 'Yes'.",
    image: "/complexity-mapping.png"
  },
  {
    title: "Repeatable Excellence",
    description: "Success shouldn't be a fluke. We build the engine that makes high-value wins a habit, not a hobby.",
    image: "/surgical-execution.png"
  }
];

export default function WhoWeAre() {
  return (
    <div className="flex flex-col w-full bg-black min-h-screen pt-40 pb-20 overflow-x-hidden">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="max-w-4xl mb-32">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none text-white"
          >
            We Are the <span className="text-primary italic">Architects</span> <br /> of Strategic Deals.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 font-body leading-relaxed max-w-2xl"
          >
            Map2Close was founded on a simple realization: High-stakes B2B sales is broken by complexity. We fixed it with precision mapping.
          </motion.p>
        </div>

        {/* Philosophy Section - Spread Effect */}
        <div className="mb-40">
          <h2 className="text-3xl font-bold mb-16 border-l-4 border-primary pl-6 uppercase tracking-widest text-primary/80">Our Philosophy</h2>
          
          <div className="group/container relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 lg:gap-0 min-h-[600px]">
            {philosophyCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative transition-all duration-500 ease-out z-10",
                  // Mobile: standard stack
                  "w-full max-w-[90vw] md:w-auto",
                  // Desktop: Spread on container hover
                  index === 0 && "md:group-hover/container:-translate-x-32 lg:group-hover/container:-translate-x-48",
                  index === 2 && "md:group-hover/container:translate-x-32 lg:group-hover/container:translate-x-48",
                  // Initial centered stack effect (if overlapping was desired, but here we spread)
                  "md:-mx-12 lg:-mx-16" 
                )}
              >
                <CardContainer className="inter-var">
                  <CardBody className="bg-[#050A10] relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] border-white/10 w-full sm:w-[26rem] h-auto rounded-2xl p-6 border transition-all">
                    <CardItem
                      translateZ="50"
                      className="text-2xl font-black text-white"
                    >
                      {card.title}
                    </CardItem>
                    <CardItem
                      as="p"
                      translateZ="60"
                      className="text-gray-400 text-sm max-w-sm mt-3 font-body leading-relaxed"
                    >
                      {card.description}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-6">
                      <img
                        src={card.image}
                        height="600"
                        width="600"
                        className="h-64 w-full object-cover rounded-xl group-hover/card:shadow-xl opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 border border-white/5"
                        alt={card.title}
                      />
                    </CardItem>
                    
                    {/* Brand Accent corner */}
                    <div className={cn(
                      "absolute top-0 right-0 w-24 h-24 bg-gradient-to-br transition-opacity duration-500 opacity-0 group-hover/card:opacity-10 rounded-tr-2xl",
                      index === 1 ? "from-[#62D2A2]" : "from-[#F96B6B]"
                    )} />
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
