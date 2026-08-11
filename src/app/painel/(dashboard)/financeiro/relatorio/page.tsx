import Link from "next/link";
import { notFound } from "next/navigation";
import { listarOSConcluidas } from "@/lib/db";
import {
  calcularReceitaMensal,
  calcularResumoReceita,
  filtrarOSPorMes,
  formatMesLabel,
  obterMesesComReceita,
} from "@/lib/receita";
import ReceitaPrintDocument from "@/components/painel/ReceitaPrintDocument";
import PrintButton from "@/components/painel/PrintButton";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ periodo?: string; mes?: string }>;
};

const MES_REGEX = /^\d{4}-\d{2}$/;

export default async function RelatorioFinanceiroPage({ searchParams }: Props) {
  const { periodo = "total", mes } = await searchParams;
  const geradoEm = new Date().toISOString();

  const todasConcluidas = listarOSConcluidas();
  const mensal = calcularReceitaMensal(todasConcluidas);
  const mensalComReceita = obterMesesComReceita(mensal);

  let periodoTipo: "total" | "mes" = "total";
  let periodoLabel = "Total acumulado";
  let ordens = todasConcluidas;

  if (periodo === "mes") {
    if (!mes || !MES_REGEX.test(mes)) {
      notFound();
    }

    ordens = filtrarOSPorMes(todasConcluidas, mes);
    periodoTipo = "mes";
    periodoLabel = formatMesLabel(mes);
  } else if (periodo !== "total") {
    notFound();
  }

  const resumo = calcularResumoReceita(ordens);

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 10mm 8mm;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .receita-print-doc { box-shadow: none !important; }
          thead { display: table-header-group; }
          tfoot { display: table-footer-group; }
          tr { page-break-inside: avoid; }
        }
        @media screen {
          body { background: #e5e5e5; }
        }
      `}</style>

      <div className="no-print sticky top-0 z-10 flex flex-col gap-3 border-b border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-800">
            Relatório financeiro — {periodoLabel}
          </p>
          <p className="text-xs text-gray-500">
            Pré-visualização · {resumo.quantidadeOS} OS · {resumo.totalReceita > 0 ? "Pronto para exportar" : "Sem receita no período"}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/painel/financeiro"
            className="touch-target flex items-center border border-gray-300 px-4 py-2.5 text-sm text-gray-600 hover:border-gray-400"
          >
            ← Voltar
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="px-4 py-8 print:p-0">
        <ReceitaPrintDocument
          periodoLabel={periodoLabel}
          periodoTipo={periodoTipo}
          resumo={resumo}
          mensalComReceita={mensalComReceita}
          ordens={ordens}
          geradoEm={geradoEm}
        />
      </div>
    </>
  );
}
