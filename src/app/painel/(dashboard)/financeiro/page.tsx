import Link from "next/link";
import { listarOSConcluidas } from "@/lib/db";
import { formatCurrency } from "@/lib/format";
import { calcularReceitaMensal, calcularResumoReceita, obterMesesComReceita } from "@/lib/receita";
import ReceitaChart from "@/components/painel/ReceitaChart";
import OSListItem from "@/components/painel/OSListItem";
import FinanceiroExport from "@/components/painel/FinanceiroExport";

export const dynamic = "force-dynamic";

export default function FinanceiroPage() {
  const concluidas = listarOSConcluidas();
  const resumo = calcularResumoReceita(concluidas);
  const mensal = calcularReceitaMensal(concluidas);
  const mesesComReceita = obterMesesComReceita(mensal);

  const pctServicos =
    resumo.totalReceita > 0 ? (resumo.totalServicos / resumo.totalReceita) * 100 : 0;
  const pctPecas =
    resumo.totalReceita > 0 ? (resumo.totalPecas / resumo.totalReceita) * 100 : 0;
  const pctMaoObra =
    resumo.totalReceita > 0 ? (resumo.totalMaoObra / resumo.totalReceita) * 100 : 0;

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <p className="section-tag mb-2">Financeiro</p>
        <h1 className="heading-painel">Receita das OS concluídas</h1>
        <p className="mt-2 text-xs text-text-dim sm:text-sm">
          Considera apenas ordens com status &quot;Concluída&quot;. OS em andamento ou entregues
          não entram neste cálculo.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-px border border-border bg-border sm:mb-8 lg:grid-cols-4">
        <div className="col-span-2 bg-bg-surface p-4 sm:p-5 lg:col-span-1">
          <p className="text-[11px] uppercase tracking-wider text-text-dim sm:text-xs">Receita total</p>
          <p
            className="mt-1 text-2xl font-medium text-accent sm:text-3xl"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(resumo.totalReceita)}
          </p>
          <p className="mt-1 text-[11px] text-text-dim sm:text-xs">
            {resumo.quantidadeOS} OS concluída{resumo.quantidadeOS !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="bg-bg-surface p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-wider text-text-dim sm:text-xs">Ticket médio</p>
          <p
            className="mt-1 text-xl font-medium text-text-primary sm:text-2xl"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(resumo.ticketMedio)}
          </p>
          <p className="mt-1 text-[11px] text-text-dim sm:text-xs">Por OS concluída</p>
        </div>
        <div className="bg-bg-surface p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-wider text-text-dim sm:text-xs">Em serviços</p>
          <p
            className="mt-1 text-xl font-medium text-text-primary sm:text-2xl"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(resumo.totalServicos)}
          </p>
          <p className="mt-1 text-[11px] text-text-dim sm:text-xs">{pctServicos.toFixed(0)}% do total</p>
        </div>
        <div className="bg-bg-surface p-4 sm:p-5">
          <p className="text-[11px] uppercase tracking-wider text-text-dim sm:text-xs">Em peças + M.O.</p>
          <p
            className="mt-1 text-xl font-medium text-text-primary sm:text-2xl"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(resumo.totalPecas + resumo.totalMaoObra)}
          </p>
          <p className="mt-1 text-[11px] text-text-dim sm:text-xs">
            {(pctPecas + pctMaoObra).toFixed(0)}% do total
          </p>
        </div>
      </div>

      <div className="mb-6 border border-border bg-bg-surface p-4 sm:mb-8 sm:p-6">
        <h2 className="mb-4 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: "var(--font-barlow)" }}>
          Composição da receita
        </h2>
        <div className="mb-4 flex h-3 overflow-hidden rounded-sm sm:h-4">
          {resumo.totalReceita > 0 ? (
            <>
              <div className="bg-accent transition-all" style={{ width: `${pctServicos}%` }} title={`Serviços: ${pctServicos.toFixed(1)}%`} />
              <div className="bg-steel transition-all" style={{ width: `${pctPecas}%` }} title={`Peças: ${pctPecas.toFixed(1)}%`} />
              <div className="bg-accent-bright transition-all" style={{ width: `${pctMaoObra}%` }} title={`Mão de obra: ${pctMaoObra.toFixed(1)}%`} />
            </>
          ) : (
            <div className="w-full bg-border" />
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            { label: "Serviços", valor: resumo.totalServicos, pct: pctServicos, cor: "text-accent" },
            { label: "Peças", valor: resumo.totalPecas, pct: pctPecas, cor: "text-steel" },
            { label: "Mão de obra", valor: resumo.totalMaoObra, pct: pctMaoObra, cor: "text-accent-bright" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between border border-border px-3 py-2.5 sm:px-4 sm:py-3">
              <div className="min-w-0">
                <p className="text-xs text-text-dim">{item.label}</p>
                <p className={`truncate font-mono text-sm font-medium ${item.cor}`}>
                  {formatCurrency(item.valor)}
                </p>
              </div>
              <span className="ml-2 shrink-0 font-mono text-xs text-text-dim">{item.pct.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>

      <FinanceiroExport
        meses={mesesComReceita.map((m) => ({ mes: m.mes, label: m.label }))}
      />

      <div className="mb-6 border border-border bg-bg-surface p-4 sm:mb-8 sm:p-6">
        <h2 className="mb-1 text-base font-bold uppercase sm:text-lg" style={{ fontFamily: "var(--font-barlow)" }}>
          Receita por mês
        </h2>
        <p className="mb-4 text-xs text-text-dim sm:mb-6 sm:text-sm">
          Toque ou passe o mouse sobre um mês para ver o detalhamento.
        </p>
        <ReceitaChart dados={mensal} />
      </div>

      {concluidas.length > 0 && (
        <div className="overflow-hidden border border-border">
          <div className="border-b border-border bg-bg-elevated px-4 py-3">
            <h2 className="text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "var(--font-barlow)" }}>
              OS concluídas ({concluidas.length})
            </h2>
          </div>
          <div className="hidden border-b border-border bg-bg-deep px-4 py-2.5 text-xs uppercase tracking-wider text-text-dim md:grid md:grid-cols-[72px_1fr_1fr_108px_96px_80px] md:gap-4">
            <span>OS</span>
            <span>Cliente</span>
            <span>Veículo</span>
            <span>Status</span>
            <span>Valor</span>
            <span>Concluída</span>
          </div>
          {concluidas.map((os) => (
            <OSListItem
              key={os.id}
              id={os.id}
              numero={os.numero}
              clienteNome={os.clienteNome}
              veiculoMarca={os.veiculoMarca}
              veiculoModelo={os.veiculoModelo}
              veiculoPlaca={os.veiculoPlaca}
              status="concluida"
              valorTotal={os.valorTotal}
              data={os.concluidaEm || os.updatedAt}
              dataLabel="Concluída"
            />
          ))}
        </div>
      )}

      <Link
        href="/painel"
        className="touch-target mt-6 inline-flex items-center text-sm text-text-dim hover:text-accent md:hidden"
      >
        ← Voltar às ordens
      </Link>
    </div>
  );
}
