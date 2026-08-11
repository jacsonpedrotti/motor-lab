"use client";

import { useMemo, useState } from "react";
import { formatCurrency } from "@/lib/format";
import type { OrdemServicoInput, OSStatus, PecaItem, ServicoItem } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

interface OSFormProps {
  initial?: OrdemServicoInput & { id?: number; numero?: number };
  onSubmit: (data: OrdemServicoInput) => Promise<void>;
  submitLabel?: string;
}

const emptyServico = (): ServicoItem => ({ descricao: "", valor: 0 });
const emptyPeca = (): PecaItem => ({ descricao: "", quantidade: 1, valorUnitario: 0 });

function calcSubtotals(servicos: ServicoItem[], pecas: PecaItem[], maoObra: number) {
  const totalServicos = servicos.reduce((s, i) => s + (i.valor || 0), 0);
  const totalPecas = pecas.reduce((s, i) => s + (i.quantidade || 0) * (i.valorUnitario || 0), 0);
  return {
    totalServicos,
    totalPecas,
    maoObra: maoObra || 0,
    total: totalServicos + totalPecas + (maoObra || 0),
  };
}

export default function OSForm({ initial, onSubmit, submitLabel = "Salvar OS" }: OSFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    status: (initial?.status ?? "aberta") as OSStatus,
    clienteNome: initial?.clienteNome ?? "",
    clienteTelefone: initial?.clienteTelefone ?? "",
    clienteEmail: initial?.clienteEmail ?? "",
    veiculoMarca: initial?.veiculoMarca ?? "",
    veiculoModelo: initial?.veiculoModelo ?? "",
    veiculoAno: initial?.veiculoAno ?? "",
    veiculoPlaca: initial?.veiculoPlaca ?? "",
    veiculoKm: initial?.veiculoKm ?? "",
    problema: initial?.problema ?? "",
    servicos: initial?.servicos ?? [],
    pecas: initial?.pecas ?? [],
    maoObra: initial?.maoObra ?? 0,
    observacoes: initial?.observacoes ?? "",
    previsaoEntrega: initial?.previsaoEntrega ?? "",
  });

  const totais = useMemo(
    () => calcSubtotals(form.servicos, form.pecas, form.maoObra),
    [form.servicos, form.pecas, form.maoObra]
  );

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onSubmit({
        ...form,
        servicos: form.servicos.filter((s) => s.descricao.trim()),
        pecas: form.pecas.filter((p) => p.descricao.trim()),
      });
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full border border-border bg-bg-deep px-3 py-3 text-sm text-text-primary outline-none transition-colors focus:border-accent sm:py-2.5";
  const labelClass = "mb-1 block text-xs uppercase tracking-wider text-text-dim";
  const sectionTitle = "text-base font-bold uppercase sm:text-lg";
  const addBtnClass =
    "touch-target flex w-full items-center justify-center gap-2 border border-dashed border-border-light py-3 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent";
  const sectionPad = "border border-border bg-bg-surface p-4 sm:p-6";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <section className={sectionPad}>
        <h2 className={`mb-4 ${sectionTitle}`} style={{ fontFamily: "var(--font-barlow)" }}>
          Status
        </h2>
        <select
          value={form.status}
          onChange={(e) => updateField("status", e.target.value as OSStatus)}
          className={inputClass}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </section>

      <section className={sectionPad}>
        <h2 className={`mb-4 ${sectionTitle}`} style={{ fontFamily: "var(--font-barlow)" }}>
          Cliente
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Nome *</label>
            <input
              required
              value={form.clienteNome}
              onChange={(e) => updateField("clienteNome", e.target.value)}
              className={inputClass}
              placeholder="Nome completo"
            />
          </div>
          <div>
            <label className={labelClass}>Telefone / WhatsApp</label>
            <input
              value={form.clienteTelefone}
              onChange={(e) => updateField("clienteTelefone", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>E-mail</label>
            <input
              type="email"
              value={form.clienteEmail}
              onChange={(e) => updateField("clienteEmail", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className={sectionPad}>
        <h2 className={`mb-4 ${sectionTitle}`} style={{ fontFamily: "var(--font-barlow)" }}>
          Veículo
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { key: "veiculoMarca" as const, label: "Marca", placeholder: "VW, Fiat..." },
            { key: "veiculoModelo" as const, label: "Modelo", placeholder: "Gol, Uno..." },
            { key: "veiculoAno" as const, label: "Ano", placeholder: "2018" },
            { key: "veiculoPlaca" as const, label: "Placa", placeholder: "ABC1D23" },
            { key: "veiculoKm" as const, label: "Quilometragem", placeholder: "85.000 km" },
          ].map((field) => (
            <div key={field.key}>
              <label className={labelClass}>{field.label}</label>
              <input
                value={form[field.key]}
                onChange={(e) =>
                  updateField(
                    field.key,
                    field.key === "veiculoPlaca" ? e.target.value.toUpperCase() : e.target.value
                  )
                }
                className={inputClass}
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div>
            <label className={labelClass}>Previsão de entrega</label>
            <input
              type="date"
              value={form.previsaoEntrega}
              onChange={(e) => updateField("previsaoEntrega", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      <section className={sectionPad}>
        <h2 className={`mb-4 ${sectionTitle}`} style={{ fontFamily: "var(--font-barlow)" }}>
          Problema relatado
        </h2>
        <textarea
          rows={3}
          value={form.problema}
          onChange={(e) => updateField("problema", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </section>

      <section className="border border-border bg-bg-surface">
        <div className="border-b border-border p-4 sm:p-6">
          <h2 className={sectionTitle} style={{ fontFamily: "var(--font-barlow)" }}>
            Valores da OS
          </h2>
        </div>

        <div className="border-b border-border p-4 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">Serviços</p>
          {form.servicos.map((servico, i) => (
            <div key={i} className="mb-3 grid gap-3 border border-border bg-bg-deep p-4 sm:grid-cols-[1fr_140px_auto]">
              <input
                value={servico.descricao}
                onChange={(e) => {
                  const updated = [...form.servicos];
                  updated[i] = { ...servico, descricao: e.target.value };
                  updateField("servicos", updated);
                }}
                className={inputClass}
                placeholder="Ex: Troca de correia dentada"
              />
              <input
                type="number"
                min="0"
                step="0.01"
                value={servico.valor || ""}
                onChange={(e) => {
                  const updated = [...form.servicos];
                  updated[i] = { ...servico, valor: parseFloat(e.target.value) || 0 };
                  updateField("servicos", updated);
                }}
                className={inputClass}
                placeholder="Valor R$"
              />
              <button
                type="button"
                onClick={() => updateField("servicos", form.servicos.filter((_, idx) => idx !== i))}
                className="touch-target border border-border px-3 text-sm text-text-dim hover:text-red-400"
              >
                Remover
              </button>
            </div>
          ))}
          <button type="button" onClick={() => updateField("servicos", [...form.servicos, emptyServico()])} className={addBtnClass}>
            + Adicionar serviço
          </button>
        </div>

        <div className="border-b border-border p-4 sm:p-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-accent">Peças</p>
          {form.pecas.map((peca, i) => (
            <div key={i} className="mb-3 border border-border bg-bg-deep p-4">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <input
                  value={peca.descricao}
                  onChange={(e) => {
                    const updated = [...form.pecas];
                    updated[i] = { ...peca, descricao: e.target.value };
                    updateField("pecas", updated);
                  }}
                  className={`${inputClass} sm:col-span-2`}
                  placeholder="Nome da peça"
                />
                <input
                  type="number"
                  min="1"
                  value={peca.quantidade}
                  onChange={(e) => {
                    const updated = [...form.pecas];
                    updated[i] = { ...peca, quantidade: parseInt(e.target.value) || 1 };
                    updateField("pecas", updated);
                  }}
                  className={inputClass}
                />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={peca.valorUnitario || ""}
                  onChange={(e) => {
                    const updated = [...form.pecas];
                    updated[i] = { ...peca, valorUnitario: parseFloat(e.target.value) || 0 };
                    updateField("pecas", updated);
                  }}
                  className={inputClass}
                />
              </div>
              <button
                type="button"
                onClick={() => updateField("pecas", form.pecas.filter((_, idx) => idx !== i))}
                className="mt-2 text-xs text-text-dim hover:text-red-400"
              >
                Remover peça
              </button>
            </div>
          ))}
          <button type="button" onClick={() => updateField("pecas", [...form.pecas, emptyPeca()])} className={addBtnClass}>
            + Adicionar peça
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <label className={labelClass}>Mão de obra geral (R$)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.maoObra || ""}
            onChange={(e) => updateField("maoObra", parseFloat(e.target.value) || 0)}
            className={`${inputClass} max-w-xs`}
          />
          <div className="mt-6 border border-border bg-bg-deep p-5">
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total da OS</span>
              <span className="text-accent" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                {formatCurrency(totais.total)}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={sectionPad}>
        <h2 className={`mb-4 ${sectionTitle}`} style={{ fontFamily: "var(--font-barlow)" }}>
          Observações internas
        </h2>
        <textarea
          rows={2}
          value={form.observacoes}
          onChange={(e) => updateField("observacoes", e.target.value)}
          className={`${inputClass} resize-none`}
        />
      </section>

      <div
        className="sticky z-30 -mx-4 border-t border-border bg-bg-deep/95 px-4 py-3 backdrop-blur-sm md:static md:mx-0 md:border-0 md:bg-transparent md:p-0"
        style={{ bottom: "calc(3.25rem + var(--safe-bottom))" }}
      >
        <button
          type="submit"
          disabled={loading}
          className="touch-target w-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-wider text-bg-deep hover:bg-accent-bright disabled:opacity-50 md:w-auto md:px-12"
        >
          {loading ? "Salvando..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
