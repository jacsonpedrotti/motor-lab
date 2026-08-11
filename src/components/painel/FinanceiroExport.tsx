"use client";

import { useState } from "react";
import Link from "next/link";

interface MesOption {
  mes: string;
  label: string;
}

interface Props {
  meses: MesOption[];
}

export default function FinanceiroExport({ meses }: Props) {
  const [modo, setModo] = useState<"total" | "mes">("total");
  const [mesSelecionado, setMesSelecionado] = useState(meses[meses.length - 1]?.mes ?? "");

  const relatorioUrl =
    modo === "total"
      ? "/painel/financeiro/relatorio?periodo=total"
      : `/painel/financeiro/relatorio?periodo=mes&mes=${encodeURIComponent(mesSelecionado)}`;

  const podeExportar = modo === "total" || (modo === "mes" && mesSelecionado);

  return (
    <div className="mb-6 border border-border bg-bg-surface p-4 sm:mb-8 sm:p-6">
      <h2 className="mb-1 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: "var(--font-barlow)" }}>
        Exportar relatório
      </h2>
      <p className="mb-5 text-xs text-text-dim sm:text-sm">
        Gere um PDF profissional com resumo financeiro e detalhamento das OS concluídas.
      </p>

      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <label
          className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
            modo === "total" ? "border-accent bg-accent/5" : "border-border hover:border-border-light"
          }`}
        >
          <input
            type="radio"
            name="periodo-export"
            checked={modo === "total"}
            onChange={() => setModo("total")}
            className="mt-1 accent-[var(--accent)]"
          />
          <div>
            <p className="text-sm font-medium text-text-primary">Receita total acumulada</p>
            <p className="mt-0.5 text-xs text-text-dim">
              Todas as OS concluídas, com resumo mensal e listagem completa.
            </p>
          </div>
        </label>

        <label
          className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${
            modo === "mes" ? "border-accent bg-accent/5" : "border-border hover:border-border-light"
          }`}
        >
          <input
            type="radio"
            name="periodo-export"
            checked={modo === "mes"}
            onChange={() => setModo("mes")}
            className="mt-1 accent-[var(--accent)]"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-text-primary">Receita de um mês</p>
            <p className="mt-0.5 text-xs text-text-dim">
              Apenas OS concluídas no mês selecionado.
            </p>
            {modo === "mes" && (
              <select
                value={mesSelecionado}
                onChange={(e) => setMesSelecionado(e.target.value)}
                className="mt-3 w-full border border-border bg-bg-deep px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent"
              >
                {meses.length === 0 ? (
                  <option value="">Nenhum mês com receita</option>
                ) : (
                  meses.map((m) => (
                    <option key={m.mes} value={m.mes}>
                      {m.label}
                    </option>
                  ))
                )}
              </select>
            )}
          </div>
        </label>
      </div>

      <Link
        href={relatorioUrl}
        target="_blank"
        aria-disabled={!podeExportar}
        className={`touch-target inline-flex w-full items-center justify-center gap-2 border px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-colors sm:w-auto ${
          podeExportar
            ? "border-accent bg-accent text-bg-deep hover:bg-accent-bright"
            : "pointer-events-none border-border text-text-dim opacity-50"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3" />
        </svg>
        Gerar relatório PDF
      </Link>
    </div>
  );
}
