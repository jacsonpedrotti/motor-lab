"use client";

import { useEffect, useRef, useState } from "react";

export type ParallaxMode = "background" | "float";

function getEffectiveSpeed(speed: number): number {
  if (typeof window === "undefined") return 0;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  if (window.matchMedia("(max-width: 767px)").matches) return speed * 0.55;
  return speed;
}

function computeOffset(el: HTMLElement, speed: number, mode: ParallaxMode): number {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;

  if (mode === "background") {
    // Fundo se move mais devagar que o scroll — efeito clássico de profundidade
    const section = el.closest("section");
    const sectionRect = section?.getBoundingClientRect() ?? rect;
    const sectionTop = window.scrollY + sectionRect.top;
    const scrolledInSection = window.scrollY - sectionTop;
    return scrolledInSection * speed;
  }

  // Elementos decorativos flutuam em relação ao centro da viewport
  const centerOffset = rect.top + rect.height / 2 - vh / 2;
  return centerOffset * speed * 0.45;
}

export function useParallaxTransform(speed: number, mode: ParallaxMode = "float") {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate3d(0, 0, 0)");
  const rafRef = useRef(0);
  const speedRef = useRef(speed);
  const modeRef = useRef(mode);
  speedRef.current = speed;
  modeRef.current = mode;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const effectiveSpeed = getEffectiveSpeed(speedRef.current);
      if (effectiveSpeed === 0) {
        setTransform("translate3d(0, 0, 0)");
        return;
      }

      const offset = computeOffset(el, effectiveSpeed, modeRef.current);
      setTransform(`translate3d(0, ${offset.toFixed(2)}px, 0)`);
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", scheduleUpdate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      motionQuery.removeEventListener("change", scheduleUpdate);
    };
  }, []);

  return { ref, transform };
}
