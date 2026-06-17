"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Visibility gate for expensive animation loops.
 *
 * Attach the returned `ref` to the container element. `activeRef.current` is
 * true only when that element is in (or near) the viewport AND the browser tab
 * is visible. Use `activeRef` to skip per-frame work in a requestAnimationFrame
 * loop without triggering React re-renders. `isActive` is the same signal as
 * state, for cases that need to drive props (e.g. react-three-fiber frameloop).
 *
 * Pausing work while off-screen / backgrounded is invisible to the user but
 * frees the main thread + GPU for whatever is actually on screen.
 */
export function useActiveInView({ rootMargin = "300px" } = {}) {
  const ref = useRef(null);
  const activeRef = useRef(true);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const el = ref.current;
    let inView = true;

    const update = () => {
      const next = inView && !document.hidden;
      if (activeRef.current !== next) {
        activeRef.current = next;
        setIsActive(next);
      }
    };

    let observer;
    if (el && typeof IntersectionObserver !== "undefined") {
      inView = false;
      activeRef.current = false;
      setIsActive(false);
      observer = new IntersectionObserver(
        (entries) => {
          inView = entries.some((e) => e.isIntersecting);
          update();
        },
        { rootMargin }
      );
      observer.observe(el);
    }

    const onVisibility = () => update();
    document.addEventListener("visibilitychange", onVisibility);
    update();

    return () => {
      if (observer) observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [rootMargin]);

  return { ref, activeRef, isActive };
}
