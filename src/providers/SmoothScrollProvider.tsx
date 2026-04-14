"use client";

import { ReactLenis } from 'lenis/react';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Temporarily disabled ReactLenis to see if it's locking the window scroll height
  return <>{children}</>;
}
