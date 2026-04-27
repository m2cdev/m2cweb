"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./pilotHero.module.css";

interface PilotImageSequenceProps {
  progress: number;
}

const TOTAL_FRAMES = 192;

function getFrameSrc(index: number) {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/images/pilot-hero/frame_${paddedIndex}_delay-0.041s.jpg`;
}

export function PilotImageSequence({ progress }: PilotImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const lastFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>();

  // Preload all frames as ImageBitmaps (GPU-ready, ~3x faster to draw than <img>)
  useEffect(() => {
    let cancelled = false;

    async function loadFrame(index: number) {
      try {
        const res = await fetch(getFrameSrc(index));
        const blob = await res.blob();
        if (cancelled) return;
        const bitmap = await createImageBitmap(blob);
        if (cancelled) {
          bitmap.close();
          return;
        }
        bitmapsRef.current[index] = bitmap;
        if (index === 0) setIsFirstFrameReady(true);
      } catch {
        // silently skip missing frames
      }
    }

    // Load frame 0 first for instant hero display, then load rest in order
    loadFrame(0).then(() => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        loadFrame(i);
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw loop — only repaints when the target frame changes
  useEffect(() => {
    if (!isFirstFrameReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      if (targetFrame !== lastFrameRef.current) {
        const bitmap = bitmapsRef.current[targetFrame];
        if (bitmap) {
          const { width, height } = canvas;
          const canvasAspect = width / height;
          const bmpAspect = bitmap.width / bitmap.height;

          let dw: number, dh: number, dx: number, dy: number;
          if (canvasAspect > bmpAspect) {
            dw = width;
            dh = width / bmpAspect;
            dx = 0;
            dy = (height - dh) / 2;
          } else {
            dw = height * bmpAspect;
            dh = height;
            dx = (width - dw) / 2;
            dy = 0;
          }

          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(bitmap, dx, dy, dw, dh);
          lastFrameRef.current = targetFrame;
        }
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [progress, isFirstFrameReady]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      lastFrameRef.current = -1; // force redraw
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-full relative bg-neutral-950">
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "contrast(1.05) brightness(1.02)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
  );
}
