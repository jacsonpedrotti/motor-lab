"use client";

import { useMemo, useRef } from "react";
import { useSectionScrollVars } from "@/hooks/useSectionScrollVars";

const scrollVars = {
  "--p": (p: number) => p.toFixed(4),
} as const;

export default function DynoShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const vars = useMemo(() => scrollVars, []);

  useSectionScrollVars(rootRef, "[data-dyno-panel]", vars);

  return (
    <div
      ref={rootRef}
      data-dyno-panel
      className="dyno-panel overflow-hidden border border-border bg-bg-deep shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg-elevated px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="dyno-live-dot h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span
            className="text-[11px] uppercase tracking-[0.18em] text-text-muted"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            Passagem simulada
          </span>
        </div>
        <span
          className="text-[10px] uppercase tracking-widest text-text-dim"
          style={{ fontFamily: "var(--font-ibm-mono)" }}
        >
          Dinamômetro de rolo
        </span>
      </div>

      <div className="flex flex-col p-5 sm:p-6">
        <div className="mb-5 grid grid-cols-3 gap-px border border-border bg-border">
          <div className="bg-bg-surface px-3 py-3 sm:py-4">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-text-dim" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              Potência
            </p>
            <p className="text-xl font-medium tabular-nums text-text-primary sm:text-2xl" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span data-dyno-hp>118</span>
              <span className="ml-1 text-xs font-normal text-text-dim">cv</span>
            </p>
          </div>
          <div className="bg-bg-surface px-3 py-3 sm:py-4">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-text-dim" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              Torque
            </p>
            <p className="text-xl font-medium tabular-nums text-text-primary sm:text-2xl" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span data-dyno-torque>18.0</span>
              <span className="ml-1 text-xs font-normal text-text-dim">kgf·m</span>
            </p>
          </div>
          <div className="bg-bg-surface px-3 py-3 sm:py-4">
            <p className="mb-1 text-[10px] uppercase tracking-widest text-text-dim" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              RPM
            </p>
            <p className="text-xl font-medium tabular-nums text-accent sm:text-2xl" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span className="dyno-pro-rpm">1.800</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-2 flex items-center justify-between">
            <span
              className="text-[10px] uppercase tracking-widest text-text-dim"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Curva potência × rpm
            </span>
            <span
              className="text-[10px] tabular-nums text-accent"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              <span className="dyno-pro-progress-label">0</span>%
            </span>
          </div>

          <div className="relative min-h-[180px] border border-border bg-bg-surface p-3 sm:min-h-[220px]">
            <div className="dyno-pro-grid absolute inset-3" aria-hidden="true" />

            <svg
              className="relative h-full min-h-[150px] w-full sm:min-h-[190px]"
              viewBox="0 0 280 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line x1="32" y1="8" x2="32" y2="100" stroke="#3d3d38" strokeWidth="1" />
              <line x1="32" y1="100" x2="268" y2="100" stroke="#3d3d38" strokeWidth="1" />

              <path
                className="dyno-pro-curve-area"
                d="M32,100 L32,100 L72,92 L112,78 L152,58 L192,38 L232,24 L268,16 L268,100 Z"
                fill="rgba(217, 79, 0, 0.1)"
              />
              <path
                className="dyno-pro-curve-line"
                d="M32,100 L72,92 L112,78 L152,58 L192,38 L232,24 L268,16"
                fill="none"
                stroke="#d94f00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle className="dyno-pro-cursor" cx="32" cy="100" r="4" fill="#f0681a" />
            </svg>

            <div className="absolute bottom-2 left-9 right-2 flex justify-between text-[9px] text-text-dim" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span>1k</span>
              <span>2k</span>
              <span>3k</span>
              <span>4k</span>
              <span>5k</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-1.5 flex justify-between text-[10px] uppercase tracking-widest text-text-dim" style={{ fontFamily: "var(--font-ibm-mono)" }}>
              <span>Progresso da passagem</span>
              <span className="text-text-muted">Scroll ↓</span>
            </div>
            <div className="h-1 overflow-hidden bg-border">
              <div className="dyno-pro-progress-bar h-full bg-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
