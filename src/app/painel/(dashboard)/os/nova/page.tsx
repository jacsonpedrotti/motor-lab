"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import OSForm from "@/components/painel/OSForm";
import type { OrdemServicoInput } from "@/lib/types";

export default function NovaOSPage() {
  const router = useRouter();

  async function handleSubmit(data: OrdemServicoInput) {
    const res = await fetch("/api/os", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Erro");

    router.push("/painel");
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <Link
          href="/painel"
          className="touch-target mb-3 inline-flex items-center text-xs text-text-dim hover:text-accent md:hidden"
        >
          ← Voltar
        </Link>
        <p className="section-tag mb-2">Nova</p>
        <h1 className="heading-painel">Ordem de serviço</h1>
      </div>

      <OSForm onSubmit={handleSubmit} submitLabel="Criar OS" />
    </div>
  );
}
