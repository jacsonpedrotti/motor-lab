"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import OSForm from "@/components/painel/OSForm";
import { formatCurrency, formatDateTime } from "@/lib/format";
import type { OrdemServico, OrdemServicoInput } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

export default function EditarOSPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [os, setOS] = useState<OrdemServico | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch(`/api/os/${id}`)
      .then((r) => r.json())
      .then(setOS)
      .finally(() => setLoading(false));
  }, [id]);

  async function handleSubmit(data: OrdemServicoInput) {
    const res = await fetch(`/api/os/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro");

    router.push("/painel");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Excluir esta OS permanentemente?")) return;
    setDeleting(true);

    const res = await fetch(`/api/os/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/painel");
      router.refresh();
    }
    setDeleting(false);
  }

  if (loading) {
    return <p className="py-8 text-center text-text-muted">Carregando...</p>;
  }

  if (!os) {
    return (
      <div className="py-12 text-center">
        <p className="mb-4 text-text-muted">OS não encontrada.</p>
        <Link href="/painel" className="touch-target inline-flex items-center text-accent">
          Voltar ao painel
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8">
        <div className="min-w-0">
          <Link
            href="/painel"
            className="touch-target mb-3 inline-flex items-center text-xs text-text-dim hover:text-accent md:hidden"
          >
            ← Voltar
          </Link>
          <p className="section-tag mb-2">OS #{String(os.numero).padStart(4, "0")}</p>
          <h1 className="heading-painel break-words">{os.clienteNome}</h1>
          <p className="mt-2 text-xs leading-relaxed text-text-dim sm:text-sm">
            Criada em {formatDateTime(os.createdAt)}
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            Atualizada em {formatDateTime(os.updatedAt)} · {STATUS_LABELS[os.status]}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <Link
            href={`/painel/os/${id}/imprimir`}
            target="_blank"
            className="touch-target col-span-2 flex items-center justify-center border border-border px-4 py-3 text-sm text-text-muted transition-colors hover:border-accent hover:text-accent sm:col-span-1 sm:justify-start sm:py-2"
          >
            Imprimir OS
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="touch-target col-span-2 flex items-center justify-center border border-red-500/30 px-4 py-3 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50 sm:col-span-1 sm:justify-start sm:py-2"
          >
            {deleting ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      </div>

      <div className="mb-5 border border-border bg-bg-surface p-4 sm:mb-6">
        <p className="text-xs uppercase tracking-wider text-text-dim">Valor total</p>
        <p
          className="text-xl font-medium text-accent sm:text-2xl"
          style={{ fontFamily: "var(--font-ibm-mono)" }}
        >
          {formatCurrency(os.valorTotal)}
        </p>
      </div>

      <OSForm initial={os} onSubmit={handleSubmit} submitLabel="Salvar alterações" />
    </div>
  );
}
