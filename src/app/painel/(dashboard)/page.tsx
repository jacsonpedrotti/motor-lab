import Link from "next/link";
import { contarPorStatus, listarOS, listarOSConcluidas } from "@/lib/db";
import { formatCurrency } from "@/lib/format";
import { calcularResumoReceita } from "@/lib/receita";
import OSListItem from "@/components/painel/OSListItem";
import type { OSStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

export default function PainelPage() {
  const ordens = listarOS();
  const contagem = contarPorStatus();
  const abertas = contagem.aberta + contagem.em_andamento + contagem.aguardando_peca;
  const receita = calcularResumoReceita(listarOSConcluidas());

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="section-tag mb-2">Painel</p>
          <h1 className="heading-painel">Ordens de serviço</h1>
        </div>
        <Link
          href="/painel/os/nova"
          className="touch-target inline-flex w-full items-center justify-center bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wider text-bg-deep transition-colors hover:bg-accent-bright md:w-auto md:py-2.5"
        >
          + Nova OS
        </Link>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {[
          { label: "Em aberto", value: abertas, highlight: true },
          { label: "Concluídas", value: contagem.concluida },
          { label: "Entregues", value: contagem.entregue },
          { label: "Total", value: ordens.length },
        ].map((stat) => (
          <div key={stat.label} className="bg-bg-surface p-3.5 md:p-4">
            <p
              className={`text-xl font-medium md:text-2xl ${stat.highlight ? "text-accent" : "text-text-primary"}`}
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              {stat.value}
            </p>
            <p className="text-[11px] text-text-dim md:text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <Link
        href="/painel/financeiro"
        className="mb-6 flex flex-col gap-3 border border-border bg-bg-surface p-4 transition-colors hover:border-accent/50 hover:bg-bg-elevated active:bg-bg-elevated sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-5"
      >
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-text-dim">
            Receita — OS concluídas
          </p>
          <p
            className="mt-1 text-xl font-medium text-accent sm:text-2xl"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(receita.totalReceita)}
          </p>
          <p className="mt-0.5 text-xs text-text-dim">
            {receita.quantidadeOS} OS · Ticket {formatCurrency(receita.ticketMedio)}
          </p>
        </div>
        <span className="text-sm text-accent">Ver gráfico →</span>
      </Link>

      {ordens.length === 0 ? (
        <div className="border border-border bg-bg-surface p-8 text-center md:p-12">
          <p className="mb-4 text-text-muted">Nenhuma ordem de serviço cadastrada.</p>
          <Link href="/painel/os/nova" className="touch-target inline-flex text-accent hover:text-accent-bright">
            Criar primeira OS →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden border border-border">
          <div className="hidden border-b border-border bg-bg-elevated px-4 py-2.5 text-xs uppercase tracking-wider text-text-dim md:grid md:grid-cols-[72px_1fr_1fr_108px_96px_80px] md:gap-4">
            <span>OS</span>
            <span>Cliente</span>
            <span>Veículo</span>
            <span>Status</span>
            <span>Valor</span>
            <span>Data</span>
          </div>
          {ordens.map((os) => (
            <OSListItem
              key={os.id}
              id={os.id}
              numero={os.numero}
              clienteNome={os.clienteNome}
              veiculoMarca={os.veiculoMarca}
              veiculoModelo={os.veiculoModelo}
              veiculoPlaca={os.veiculoPlaca}
              status={os.status as OSStatus}
              valorTotal={os.valorTotal}
              data={os.createdAt}
            />
          ))}
        </div>
      )}
    </div>
  );
}
