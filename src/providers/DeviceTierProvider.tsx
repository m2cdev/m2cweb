"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * DeviceTierContext
 *
 * Detects whether the current device is "low tier" based on three signals:
 *   1. prefers-reduced-motion (user has requested less animation)
 *   2. navigator.hardwareConcurrency <= 4 (weak CPU)
 *   3. navigator.deviceMemory <= 4 GB (limited RAM)
 *
 * Low-tier devices get: static/non-scrubbed scroll sections, reduced canvas
 * resolution, capped frame rates, and simplified visual effects.
 */

interface DeviceTierContextValue {
  isLowTier: boolean;
}

const DeviceTierContext = createContext<DeviceTierContextValue>({
  isLowTier: false,
});

export function DeviceTierProvider({ children }: { children: React.ReactNode }) {
  const [isLowTier, setIsLowTier] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // navigator.hardwareConcurrency and deviceMemory are not available in all browsers;
    // default to high-tier values when unavailable.
    const lowCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    const lowRam = ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8) <= 4;

    setIsLowTier(reducedMotion || (lowCpu && lowRam));
  }, []);

  return (
    <DeviceTierContext.Provider value={{ isLowTier }}>
      {children}
    </DeviceTierContext.Provider>
  );
}

export function useDeviceTier(): DeviceTierContextValue {
  return useContext(DeviceTierContext);
}

/** Convenience hook — returns just the boolean. */
export function useIsLowTier(): boolean {
  return useContext(DeviceTierContext).isLowTier;
}
