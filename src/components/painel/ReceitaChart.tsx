"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import type { ReceitaMensal } from "@/lib/receita";

interface Props {
  dados: ReceitaMensal[];
}

const CORES = {
  servicos: "#d94f00",
  pecas: "#4b5563",
  maoObra: "#f0681a",
};

const CHART = {
  width: 860,
  height: 340,
  pad: { top: 28, right: 20, bottom: 52, left: 76 },
};

function niceMax(value: number): number {
  if (value <= 0) return 1000;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  const nice = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return nice * magnitude;
}

function formatAxisValue(value: number): string {
  if (value >= 1000) return `R$ ${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}k`;
  return `R$ ${value}`;
}

function formatCompact(value: number): string {
  return formatCurrency(value).replace(/\s/g, " ");
}

export default function ReceitaChart({ dados }: Props) {
  const comReceita = useMemo(() => dados.filter((d) => d.total > 0), [dados]);

  const defaultIndex = Math.max(0, comReceita.length - 1);
  const [selected, setSelected] = useState<number | null>(null);

  const activeIndex = selected ?? defaultIndex;
  const active = comReceita[activeIndex] ?? null;

  if (comReceita.length === 0) {
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-2 border border-dashed border-border bg-bg-deep/50 p-6 text-center sm:h-72">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-text-dim">
          <path d="M3 3v18h18M7 16l4-8 4 5 5-9" />
        </svg>
        <p className="text-sm text-text-muted">Nenhuma OS concluída ainda</p>
        <p className="max-w-xs text-xs text-text-dim">
          O gráfico será preenchido automaticamente quando você marcar ordens como concluídas.
        </p>
      </div>
    );
  }

  const maxY = niceMax(Math.max(...comReceita.map((d) => d.total)));
  const plotW = CHART.width - CHART.pad.left - CHART.pad.right;
  const plotH = CHART.height - CHART.pad.top - CHART.pad.bottom;
  const barCount = comReceita.length;
  const barGap = barCount > 10 ? 10 : barCount > 6 ? 16 : 24;
  const barWidth = Math.min(56, Math.max(28, (plotW - barGap * (barCount - 1)) / barCount));
  const totalBarsWidth = barCount * barWidth + (barCount - 1) * barGap;
  const offsetX = CHART.pad.left + (plotW - totalBarsWidth) / 2;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => ({
    value: maxY * t,
    y: CHART.pad.top + plotH - t * plotH,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_240px] lg:gap-6">
      {/* Mobile month picker */}
      <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
        {comReceita.map((mes, i) => (
          <button
            key={mes.mes}
            type="button"
            onClick={() => setSelected(i)}
            className={`touch-target shrink-0 border px-3 py-2 text-xs transition-colors ${
              i === activeIndex
                ? "border-accent bg-accent/10 text-accent"
                : "border-border text-text-dim hover:border-border-light"
            }`}
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {mes.label}
          </button>
        ))}
      </div>

      <div className="chart-scroll overflow-x-auto rounded border border-border bg-bg-deep/30">
        <p className="px-3 pt-2 text-[10px] text-text-dim lg:hidden">Deslize para ver todos os meses →</p>
        <svg
          viewBox={`0 0 ${CHART.width} ${CHART.height}`}
          className="w-full min-w-[520px] sm:min-w-[600px]"
          role="img"
          aria-label="Gráfico de receita mensal"
        >
          {yTicks.map((tick) => (
            <g key={tick.value}>
              <line
                x1={CHART.pad.left}
                y1={tick.y}
                x2={CHART.width - CHART.pad.right}
                y2={tick.y}
                stroke="#2a2a26"
                strokeDasharray={tick.value === 0 ? "0" : "4 4"}
              />
              <text
                x={CHART.pad.left - 10}
                y={tick.y + 4}
                textAnchor="end"
                fill="#5c5a54"
                fontSize="10"
                fontFamily="var(--font-ibm-mono, monospace)"
              >
                {formatAxisValue(tick.value)}
              </text>
            </g>
          ))}

          <line
            x1={CHART.pad.left}
            y1={CHART.pad.top}
            x2={CHART.pad.left}
            y2={CHART.pad.top + plotH}
            stroke="#3d3d38"
          />

          {comReceita.map((mes, i) => {
            const x = offsetX + i * (barWidth + barGap);
            const baseY = CHART.pad.top + plotH;
            const isActive = i === activeIndex;

            const segments = [
              { key: "servicos", value: mes.servicos, color: CORES.servicos },
              { key: "pecas", value: mes.pecas, color: CORES.pecas },
              { key: "maoObra", value: mes.maoObra, color: CORES.maoObra },
            ].filter((s) => s.value > 0);

            let stackBottom = baseY;
            const bars = segments.map((seg) => {
              const h = Math.max((seg.value / maxY) * plotH, 2);
              stackBottom -= h;
              return { ...seg, y: stackBottom, h };
            });

            return (
              <g
                key={mes.mes}
                onMouseEnter={() => setSelected(i)}
                onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)}
                onTouchStart={() => setSelected(i)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={`${mes.label}: ${formatCurrency(mes.total)}`}
              >
                <rect
                  x={x - 4}
                  y={CHART.pad.top}
                  width={barWidth + 8}
                  height={plotH + CHART.pad.bottom}
                  fill="transparent"
                />

                {isActive && (
                  <rect
                    x={x - 6}
                    y={CHART.pad.top - 4}
                    width={barWidth + 12}
                    height={plotH + 8}
                    rx={4}
                    fill="rgba(217, 79, 0, 0.08)"
                    stroke="rgba(217, 79, 0, 0.35)"
                    strokeWidth={1}
                  />
                )}

                {bars.map((bar, bi) => (
                  <rect
                    key={bar.key}
                    x={x}
                    y={bar.y}
                    width={barWidth}
                    height={bar.h}
                    fill={bar.color}
                    opacity={isActive ? 1 : 0.75}
                    rx={bi === bars.length - 1 ? 3 : 0}
                    style={{ transition: "opacity 0.15s" }}
                  />
                ))}

                {mes.total > 0 && (
                  <text
                    x={x + barWidth / 2}
                    y={baseY - (mes.total / maxY) * plotH - 8}
                    textAnchor="middle"
                    fill={isActive ? "#d94f00" : "#8a8880"}
                    fontSize="9"
                    fontWeight={isActive ? "600" : "400"}
                    fontFamily="var(--font-ibm-mono, monospace)"
                  >
                    {formatCompact(mes.total).replace("R$", "").trim()}
                  </text>
                )}

                <text
                  x={x + barWidth / 2}
                  y={baseY + 18}
                  textAnchor="middle"
                  fill={isActive ? "#eceae4" : "#5c5a54"}
                  fontSize="11"
                  fontWeight={isActive ? "600" : "400"}
                >
                  {mes.label.split("/")[0]}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={baseY + 32}
                  textAnchor="middle"
                  fill="#5c5a54"
                  fontSize="9"
                  fontFamily="var(--font-ibm-mono, monospace)"
                >
                  {mes.label.split("/")[1]}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="flex flex-col border border-border bg-bg-elevated">
        <div className="border-b border-border px-4 py-3">
          <p className="text-[10px] uppercase tracking-wider text-text-dim">Mês selecionado</p>
          <p className="text-lg font-bold uppercase text-text-primary sm:text-xl" style={{ fontFamily: "var(--font-barlow)" }}>
            {active?.label ?? "—"}
          </p>
        </div>

        {active && (
          <>
            <div className="border-b border-border px-4 py-4">
              <p className="text-[10px] uppercase tracking-wider text-text-dim">Receita total</p>
              <p className="text-xl font-medium text-accent sm:text-2xl" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                {formatCurrency(active.total)}
              </p>
              <p className="mt-1 text-xs text-text-dim">
                {active.quantidadeOS} OS concluída{active.quantidadeOS !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="flex-1 space-y-3 px-4 py-4">
              {[
                { label: "Serviços", valor: active.servicos, cor: CORES.servicos, pct: active.total > 0 ? (active.servicos / active.total) * 100 : 0 },
                { label: "Peças", valor: active.pecas, cor: CORES.pecas, pct: active.total > 0 ? (active.pecas / active.total) * 100 : 0 },
                { label: "Mão de obra", valor: active.maoObra, cor: CORES.maoObra, pct: active.total > 0 ? (active.maoObra / active.total) * 100 : 0 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ backgroundColor: item.cor }} />
                      <span className="truncate text-text-muted">{item.label}</span>
                    </div>
                    <span className="shrink-0 font-mono text-text-primary">{formatCurrency(item.valor)}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-border">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{ width: `${item.pct}%`, backgroundColor: item.cor }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mt-auto border-t border-border px-4 py-3">
          <p className="mb-2 text-[10px] uppercase tracking-wider text-text-dim">Legenda</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              { label: "Serviços", cor: CORES.servicos },
              { label: "Peças", cor: CORES.pecas },
              { label: "M.O.", cor: CORES.maoObra },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5 text-[10px] text-text-dim">
                <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.cor }} />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
