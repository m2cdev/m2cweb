"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

const Example = ({ cards }) => {
  return (
    <div className="bg-black py-20 relative overflow-hidden">
      <div className="container-custom mb-12">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
          <span className="text-primary italic">Success</span> <span className="text-[#F96B6B] italic">Stories</span>
        </h2>
      </div>
      <HorizontalScrollCarousel cards={cards} />
    </div>
  );
};

const HorizontalScrollCarousel = ({ cards = [] }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

    if (isDragging) {
      e.preventDefault();
      const x = e.pageX - e.currentTarget.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsHovered(false);
  };

  return (
    <div 
      className={cn(
        "relative group/carousel select-none [&_*]:cursor-none",
        "cursor-none"
      )}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Custom Cursor */}
      <motion.div
        style={{
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        className="pointer-events-none absolute z-50 hidden md:flex items-center justify-center gap-2 bg-primary text-black w-24 h-24 rounded-full font-black text-sm tracking-widest shadow-[0_0_50px_rgba(98,210,162,0.6)] backdrop-blur-md border-2 border-white/20"
      >
        <ArrowLeft size={16} strokeWidth={4} />
        <div className="relative h-12 w-12 flex items-center justify-center">
          <Image 
            src="/m2c-icon.png" 
            alt="M2C Icon" 
            width={40}
            height={40}
            className="object-contain mix-blend-multiply scale-110"
            priority
          />
        </div>
        <ArrowRight size={16} strokeWidth={4} />
      </motion.div>

      <div 
        ref={scrollRef}
        className={cn(
          "flex gap-8 overflow-x-auto pb-12 px-6 md:px-[10%] no-scrollbar snap-x snap-mandatory scroll-smooth",
          isDragging && "scroll-auto"
        )}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card) => (
          <Card card={card} key={card.id || card.title} />
        ))}
      </div>
    </div>
  );
};

const Card = ({ card }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative shrink-0 h-[500px] w-[350px] md:w-[500px] overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 snap-center group"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 opacity-60"
      />
      
      <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">{card.category || "Case Study"}</p>
        <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6 group-hover:text-primary transition-colors">
          {card.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[80%] uppercase tracking-widest font-black">
          {card.subtitle}
        </p>
        <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-700" />
      </div>
    </motion.div>
  );
};

export default Example;