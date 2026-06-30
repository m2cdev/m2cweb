"use client";

import React, { useRef, useEffect, useState } from "react";
import { useIsLowTier } from "@/providers/DeviceTierProvider";

interface PilotImageSequenceProps {
  /**
   * Live scroll progress (0–1). Passed as a ref so the canvas draw loop can read
   * the latest value every frame without React re-rendering / rebuilding the loop.
   */
  progressRef: React.MutableRefObject<number>;
}

const TOTAL_FRAMES = 192;
// How many frames to fetch+decode at once. Bounded so the visible frames decode
// first and we never slam the main thread with 192 concurrent createImageBitmap
// calls (which is what makes the sequence stutter while the page is still loading).
const PRELOAD_CONCURRENCY = 8;

function getFrameSrc(index: number) {
  const paddedIndex = index.toString().padStart(3, "0");
  return `/images/pilot-hero/frame_${paddedIndex}_delay-0.041s.jpg`;
}

export function PilotImageSequence({ progressRef }: PilotImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bitmapsRef = useRef<(ImageBitmap | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [isFirstFrameReady, setIsFirstFrameReady] = useState(false);
  const lastFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>();
  const lastRafTimeRef = useRef<number>(0);
  const isLowTier = useIsLowTier();

  // On low-tier devices, cap the rAF loop to ~30fps to reduce GPU raster cost.
  const RAF_INTERVAL_MS = isLowTier ? 33 : 0; // 33ms ≈ 30fps; 0 = uncapped

  // Preload all frames as ImageBitmaps (GPU-ready, ~3x faster to draw than <img>).
  useEffect(() => {
    let cancelled = false;

    async function loadFrame(index: number) {
      if (bitmapsRef.current[index]) return;
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

    // Frame 0 first (instant hero), then fill the rest in order with a bounded
    // pool of workers so we don't saturate the network or the decoder.
    loadFrame(0).then(() => {
      let next = 1;
      const worker = async () => {
        while (!cancelled) {
          const i = next++;
          if (i >= TOTAL_FRAMES) return;
          await loadFrame(i);
        }
      };
      for (let w = 0; w < PRELOAD_CONCURRENCY; w++) worker();
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw loop — created ONCE (reads progress from the ref every frame). Repaints
  // only when the frame to show actually changes.
  useEffect(() => {
    if (!isFirstFrameReady) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    // Low-latency, opaque context: skips alpha compositing and the present-sync
    // wait, which keeps the scroll-driven repaint snappy.
    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    const bitmaps = bitmapsRef.current;

    const render = (timestamp: number) => {
      rafRef.current = requestAnimationFrame(render);

      // Low-tier: throttle to ~30fps to reduce raster/GPU cost.
      if (RAF_INTERVAL_MS > 0 && timestamp - lastRafTimeRef.current < RAF_INTERVAL_MS) {
        return;
      }
      lastRafTimeRef.current = timestamp;

      const progress = progressRef.current;
      const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      // Use the exact frame if it's decoded; otherwise fall back to the nearest
      // already-loaded frame so the animation keeps moving instead of freezing
      // on a stale frame and then snapping when the real one finishes loading.
      let frameToDraw = -1;
      if (bitmaps[targetFrame]) {
        frameToDraw = targetFrame;
      } else {
        for (let d = 1; d < TOTAL_FRAMES; d++) {
          const lo = targetFrame - d;
          const hi = targetFrame + d;
          if (lo >= 0 && bitmaps[lo]) { frameToDraw = lo; break; }
          if (hi < TOTAL_FRAMES && bitmaps[hi]) { frameToDraw = hi; break; }
        }
      }

      if (frameToDraw === -1 || frameToDraw === lastFrameRef.current) return;

      const bitmap = bitmaps[frameToDraw]!;
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

      // Cover-fit always repaints the whole canvas, so no clearRect needed.
      ctx.drawImage(bitmap, dx, dy, dw, dh);
      lastFrameRef.current = frameToDraw;
    };

    rafRef.current = requestAnimationFrame(render);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isFirstFrameReady, RAF_INTERVAL_MS, progressRef]);

  // Handle resize — on low-tier devices render canvas at 0.4x backing resolution
  // (CSS-stretched via width/height:100%) to drastically reduce pixels per drawImage.
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      // Low-tier: 0.4x backing store; high-tier: native pixel resolution
      const scale = isLowTier ? 0.4 : 1;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      lastFrameRef.current = -1; // force redraw
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isLowTier]);

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
