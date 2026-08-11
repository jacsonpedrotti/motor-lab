"use client";

import { type RefObject, useEffect } from "react";

type ScrollVarMap = Record<string, (progress: number) => string>;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function computeProgress(section: HTMLElement): number {
  const rect = section.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * 0.88;
  const end = -rect.height * 0.25;
  return clamp((start - rect.top) / (start - end), 0, 1);
}

export function useSectionScrollVars(
  sectionRef: RefObject<HTMLElement | null>,
  targetSelector: string,
  vars: ScrollVarMap
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const target = section.querySelector<HTMLElement>(targetSelector) ?? section;
    let raf = 0;

    const apply = (progress: number) => {
      for (const [name, resolver] of Object.entries(vars)) {
        target.style.setProperty(name, resolver(progress));
      }

      const hpEl = section.querySelector<HTMLElement>("[data-dyno-hp]");
      const torqueEl = section.querySelector<HTMLElement>("[data-dyno-torque]");
      if (hpEl) hpEl.textContent = String(Math.round(118 + progress * 210));
      if (torqueEl) torqueEl.textContent = (18 + progress * 38.5).toFixed(1);

      const pct = Math.round(progress * 100);
      section.querySelectorAll<HTMLElement>(".dyno-pro-progress-label").forEach((el) => {
        el.textContent = String(pct);
      });

      const rpmEl = section.querySelector<HTMLElement>(".dyno-pro-rpm");
      if (rpmEl) rpmEl.textContent = Math.round(1800 + progress * 2400).toLocaleString("pt-BR");

      const cursor = section.querySelector<SVGCircleElement>(".dyno-pro-cursor");
      if (cursor) {
        const pts = [
          [32, 100], [72, 92], [112, 78], [152, 58], [192, 38], [232, 24], [268, 16],
        ];
        const t = progress * (pts.length - 1);
        const i = Math.min(Math.floor(t), pts.length - 2);
        const f = t - i;
        const x = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f;
        const y = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f;
        cursor.setAttribute("cx", x.toFixed(1));
        cursor.setAttribute("cy", y.toFixed(1));
      }
    };

    const update = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      apply(reduced ? 0.5 : computeProgress(section));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    motionQuery.addEventListener("change", schedule);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motionQuery.removeEventListener("change", schedule);
    };
  }, [sectionRef, targetSelector, vars]);
}
