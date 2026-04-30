"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Example = ({ cards }) => {
  return (
    <div className="bg-black py-20 relative overflow-hidden">
      <div className="px-6 md:px-[10%] mb-12">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Outcomes <span style={{ color: '#F96B6B' }}>Over Optics.</span>
        </h2>
        <p className="text-white font-bold mt-4 text-lg">Don&apos;t take our word for it.</p>
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
  const [hasDragged, setHasDragged] = useState(false);

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
      const x = e.pageX - e.currentTarget.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      if (Math.abs(x - startX) > 5) {
        setHasDragged(true);
      }
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollLeft - walk;
      }
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setHasDragged(false);
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
        className="pointer-events-none absolute z-50 hidden md:flex flex-col items-center justify-center"
      >
        <div className="flex flex-col items-center justify-center bg-primary text-black w-32 h-32 rounded-full shadow-[0_0_50px_rgba(98,210,162,0.6)] backdrop-blur-md border-2 border-white/20">
          <div className="flex items-center justify-center gap-2">
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
          </div>
          <span className="text-[10px] font-black tracking-[0.3em] uppercase mt-1 leading-none">SWIPE</span>
        </div>
      </motion.div>

      {/* Mobile: vertical stack */}
      <div className="flex md:hidden flex-col gap-6 px-6 pb-12">
        {cards.map((card) => (
          <Card card={card} key={card.id || card.title} mobile />
        ))}
      </div>

      {/* Desktop: horizontal drag scroll */}
      <div
        ref={scrollRef}
        onClickCapture={(e) => {
          if (hasDragged) {
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        className={cn(
          "hidden md:flex gap-8 overflow-x-auto pb-12 px-[10%] no-scrollbar",
          isDragging ? "scroll-auto cursor-grabbing" : ""
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

const Card = ({ card, mobile }) => {
  return (
    <Link href={`/case-studies/${card.id}`} className="block" draggable={false} onDragStart={(e) => e.preventDefault()}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className={cn(
          "relative overflow-hidden rounded-3xl bg-neutral-900 border border-white/10 group cursor-pointer",
          mobile ? "w-full h-[260px] shrink-0" : "shrink-0 h-[550px] w-[500px]"
        )}
      >
        <div
          style={{
            backgroundImage: `url(${card.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105 opacity-60"
        />

        <div className="absolute inset-0 z-10 p-10 flex flex-col justify-between bg-gradient-to-t from-black via-black/20 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary font-bold text-xs uppercase tracking-[0.3em] mb-3">{card.category || "Case Study"}</p>
              <h3 className="text-3xl md:text-5xl font-black text-white leading-tight group-hover:text-primary transition-colors">
                {card.title}
              </h3>
            </div>
          </div>

          <div>
            <p className="text-gray-400 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-[800px] uppercase tracking-widest font-black leading-relaxed">
              {card.subtitle}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Example;