"use client";

import React, { useRef, useEffect, useState } from "react";
import styles from "./pilotHero.module.css";

interface PilotImageSequenceProps {
  progress: number;
}

export function PilotImageSequence({ progress }: PilotImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const totalFrames = 192;
  const framePattern = (index: number) => {
    const paddedIndex = index.toString().padStart(3, "0");
    return `/images/pilot-hero/frame_${paddedIndex}_delay-0.041s.jpg`;
  };

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      // Ensure priority fetching for the first frame
      if (i === 0) {
        img.fetchPriority = "high";
      }
      img.src = framePattern(i);
      img.onload = () => {
        loadedCount++;
        // Display hero instantly as soon as the first frame loads!
        if (i === 0) {
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Draw frame on canvas when progress or isLoaded changes
  const lastFrameRef = useRef<number>(-1);
  const requestRef = useRef<number>();

  const drawFrame = (index: number) => {
    if (index === lastFrameRef.current) return;
    lastFrameRef.current = index;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context || images.length === 0) return;

    const img = images[index];
    if (img && img.complete) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      const canvasAspect = canvas.width / canvas.height;
      const imgAspect = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX, offsetY;
      
      if (canvasAspect > imgAspect) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgAspect;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawWidth = canvas.height * imgAspect;
        drawHeight = canvas.height;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
      }

      context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;

    const render = () => {
      const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
      drawFrame(frameIndex);
      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [progress, isLoaded, images]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        
        // Redraw current frame
        if (isLoaded && images.length > 0) {
            const canvas = canvasRef.current;
            const context = canvas.getContext("2d");
            if (context) {
                const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
                const img = images[frameIndex];
                if (img) {
                    const canvasAspect = canvas.width / canvas.height;
                    const imgAspect = img.width / img.height;
                    let drawWidth, drawHeight, offsetX, offsetY;
                    if (canvasAspect > imgAspect) {
                        drawWidth = canvas.width;
                        drawHeight = canvas.width / imgAspect;
                        offsetX = 0;
                        offsetY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawWidth = canvas.height * imgAspect;
                        drawHeight = canvas.height;
                        offsetX = (canvas.width - drawWidth) / 2;
                        offsetY = 0;
                    }
                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            }
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images, progress]);

  return (
    <div className="w-full h-full relative bg-neutral-950">
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-50">
          <div className="flex flex-col items-center gap-4">
             <div className="w-12 h-12 border-4 border-[#62D2A2]/20 border-t-[#62D2A2] rounded-full animate-spin" />
             <span className="text-[#62D2A2] text-xs font-black tracking-widest uppercase">Initializing Pilot Vision</span>
          </div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ 
          width: "100%", 
          height: "100%", 
          display: "block",
          filter: "contrast(1.05) brightness(1.02)"
        }}
      />
      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black/30" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
  );
}
