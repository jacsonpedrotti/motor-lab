import { formatCurrency, formatDate, formatDateTime, formatPlaca } from "@/lib/format";
import type { ResumoReceita, ReceitaMensal } from "@/lib/receita";
import type { OrdemServico } from "@/lib/types";

const EMPRESA = {
  nome: "MotorLab",
  slogan: "Conserto de Carros · Remap · Diagnóstico",
  endereco: "Rua das Oficinas, 847 — Vila Industrial",
  cidade: "São Paulo, SP — CEP 03100-000",
  telefone: "(11) 99999-9999",
  email: "contato@motorlab.com.br",
  cnpj: "00.000.000/0001-00",
};

interface Props {
  periodoLabel: string;
  periodoTipo: "total" | "mes";
  resumo: ResumoReceita;
  mensalComReceita: ReceitaMensal[];
  ordens: (OrdemServico & { concluidaEm?: string })[];
  geradoEm: string;
}

function breakdownOS(os: OrdemServico) {
  const servicos = os.servicos.reduce((s, i) => s + i.valor, 0);
  const pecas = os.pecas.reduce((s, i) => s + i.quantidade * i.valorUnitario, 0);
  return { servicos, pecas, maoObra: os.maoObra, total: servicos + pecas + os.maoObra };
}

export default function ReceitaPrintDocument({
  periodoLabel,
  periodoTipo,
  resumo,
  mensalComReceita,
  ordens,
  geradoEm,
}: Props) {
  const pctServicos = resumo.totalReceita > 0 ? (resumo.totalServicos / resumo.totalReceita) * 100 : 0;
  const pctPecas = resumo.totalReceita > 0 ? (resumo.totalPecas / resumo.totalReceita) * 100 : 0;
  const pctMaoObra = resumo.totalReceita > 0 ? (resumo.totalMaoObra / resumo.totalReceita) * 100 : 0;

  const ordensOrdenadas = [...ordens].sort((a, b) => {
    const da = a.concluidaEm || a.updatedAt;
    const db = b.concluidaEm || b.updatedAt;
    return da.localeCompare(db);
  });

  return (
    <div className="receita-print-doc mx-auto max-w-[210mm] bg-white text-[#1a1a1a] shadow-lg print:max-w-none print:shadow-none">
      {/* Cabeçalho */}
      <div className="flex items-stretch justify-between bg-[#141412] text-white">
        <div className="flex-1 px-8 py-5">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold uppercase tracking-wider">Motor</span>
            <span className="text-2xl font-bold uppercase tracking-wider text-[#d94f00]">Lab</span>
          </div>
          <p className="mt-0.5 text-[11px] tracking-wide text-gray-400">{EMPRESA.slogan}</p>
          <div className="mt-3 space-y-0.5 text-[10px] text-gray-400">
            <p>{EMPRESA.endereco}</p>
            <p>{EMPRESA.cidade}</p>
            <p>
              {EMPRESA.telefone} · {EMPRESA.email}
            </p>
            <p>CNPJ {EMPRESA.cnpj}</p>
          </div>
        </div>

        <div className="flex w-[220px] flex-col border-l border-[#2a2a26] bg-[#1c1c19]">
          <div className="border-b border-[#d94f00] bg-[#d94f00] px-5 py-2 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90">
              Relatório financeiro
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-4 text-center">
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">Período</p>
            <p className="mt-1 text-lg font-bold leading-tight text-white">{periodoLabel}</p>
            <p className="mt-2 text-[9px] text-gray-500">
              {periodoTipo === "total" ? "Histórico completo" : "Fechamento mensal"}
            </p>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50 text-[11px]">
        {[
          { label: "Receita total", value: formatCurrency(resumo.totalReceita), highlight: true },
          { label: "Ticket médio", value: formatCurrency(resumo.ticketMedio) },
          { label: "OS concluídas", value: String(resumo.quantidadeOS) },
          {
            label: "Peças + M.O.",
            value: formatCurrency(resumo.totalPecas + resumo.totalMaoObra),
          },
        ].map((kpi, i) => (
          <div
            key={kpi.label}
            className={`px-5 py-4 ${i < 3 ? "border-r border-gray-200" : ""}`}
          >
            <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              {kpi.label}
            </p>
            <p
              className={`mt-1 text-base font-bold ${kpi.highlight ? "text-[#d94f00]" : "text-gray-900"}`}
            >
              {kpi.value}
            </p>
          </div>
        ))}
      </div>

      <div className="px-8 py-6">
        {/* Composição */}
        <div className="mb-6">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-wider text-[#d94f00]">
            Composição da receita
          </p>
          <div className="mb-3 flex h-3 overflow-hidden rounded-sm border border-gray-200">
            {resumo.totalReceita > 0 ? (
              <>
                <div className="bg-[#d94f00]" style={{ width: `${pctServicos}%` }} />
                <div className="bg-[#6b7280]" style={{ width: `${pctPecas}%` }} />
                <div className="bg-[#f0681a]" style={{ width: `${pctMaoObra}%` }} />
              </>
            ) : (
              <div className="w-full bg-gray-200" />
            )}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Serviços", valor: resumo.totalServicos, pct: pctServicos, cor: "#d94f00" },
              { label: "Peças", valor: resumo.totalPecas, pct: pctPecas, cor: "#6b7280" },
              { label: "Mão de obra", valor: resumo.totalMaoObra, pct: pctMaoObra, cor: "#f0681a" },
            ].map((item) => (
              <div key={item.label} className="rounded border border-gray-200 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: item.cor }} />
                  <p className="text-[10px] text-gray-500">{item.label}</p>
                </div>
                <p className="mt-1 text-sm font-bold">{formatCurrency(item.valor)}</p>
                <p className="text-[9px] text-gray-400">{item.pct.toFixed(1)}% do total</p>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo mensal — só no relatório total */}
        {periodoTipo === "total" && mensalComReceita.length > 0 && (
          <div className="mb-6">
            <p className="mb-3 text-[9px] font-bold uppercase tracking-wider text-[#d94f00]">
              Receita por mês
            </p>
            <table className="w-full border-collapse text-[11px]">
              <thead>
                <tr className="border-b-2 border-gray-800 bg-gray-50">
                  <th className="px-3 py-2 text-left text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    Mês
                  </th>
                  <th className="px-3 py-2 text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    OS
                  </th>
                  <th className="px-3 py-2 text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    Serviços
                  </th>
                  <th className="px-3 py-2 text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    Peças
                  </th>
                  <th className="px-3 py-2 text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    M.O.
                  </th>
                  <th className="px-3 py-2 text-right text-[9px] font-bold uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {mensalComReceita.map((m, i) => (
                  <tr
                    key={m.mes}
                    className={i % 2 === 0 ? "bg-white" : "bg-gray-50/80"}
                  >
                    <td className="border-b border-gray-100 px-3 py-2 font-semibold">{m.label}</td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right">{m.quantidadeOS}</td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right">
                      {formatCurrency(m.servicos)}
                    </td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right">
                      {formatCurrency(m.pecas)}
                    </td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right">
                      {formatCurrency(m.maoObra)}
                    </td>
                    <td className="border-b border-gray-100 px-3 py-2 text-right font-bold text-[#d94f00]">
                      {formatCurrency(m.total)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-bold">
                  <td className="px-3 py-2.5 uppercase tracking-wider">Total geral</td>
                  <td className="px-3 py-2.5 text-right">{resumo.quantidadeOS}</td>
                  <td className="px-3 py-2.5 text-right">{formatCurrency(resumo.totalServicos)}</td>
                  <td className="px-3 py-2.5 text-right">{formatCurrency(resumo.totalPecas)}</td>
                  <td className="px-3 py-2.5 text-right">{formatCurrency(resumo.totalMaoObra)}</td>
                  <td className="px-3 py-2.5 text-right text-[#d94f00]">
                    {formatCurrency(resumo.totalReceita)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Detalhamento por OS */}
        <div>
          <p className="mb-3 text-[9px] font-bold uppercase tracking-wider text-[#d94f00]">
            Detalhamento por ordem de serviço ({ordensOrdenadas.length})
          </p>

          {ordensOrdenadas.length === 0 ? (
            <p className="rounded border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-400">
              Nenhuma OS concluída no período selecionado.
            </p>
          ) : (
            <table className="w-full border-collapse text-[10px]">
              <thead>
                <tr className="border-b-2 border-gray-800 bg-gray-50">
                  <th className="px-2 py-2 text-left text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    OS
                  </th>
                  <th className="px-2 py-2 text-left text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Cliente
                  </th>
                  <th className="px-2 py-2 text-left text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Veículo
                  </th>
                  <th className="px-2 py-2 text-left text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Concluída
                  </th>
                  <th className="px-2 py-2 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Serviços
                  </th>
                  <th className="px-2 py-2 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Peças
                  </th>
                  <th className="px-2 py-2 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    M.O.
                  </th>
                  <th className="px-2 py-2 text-right text-[8px] font-bold uppercase tracking-wider text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {ordensOrdenadas.map((os, i) => {
                  const b = breakdownOS(os);
                  const veiculo = [os.veiculoMarca, os.veiculoModelo, os.veiculoPlaca && formatPlaca(os.veiculoPlaca)]
                    .filter(Boolean)
                    .join(" · ");

                  return (
                    <tr key={os.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/80"}>
                      <td className="border-b border-gray-100 px-2 py-2 font-bold text-[#d94f00]">
                        #{String(os.numero).padStart(4, "0")}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 font-medium">{os.clienteNome}</td>
                      <td className="border-b border-gray-100 px-2 py-2 text-gray-600">
                        {veiculo || "—"}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 text-gray-600">
                        {formatDate(os.concluidaEm || os.updatedAt)}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 text-right">
                        {formatCurrency(b.servicos)}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 text-right">
                        {formatCurrency(b.pecas)}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 text-right">
                        {formatCurrency(b.maoObra)}
                      </td>
                      <td className="border-b border-gray-100 px-2 py-2 text-right font-bold">
                        {formatCurrency(b.total)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-800 bg-gray-100 font-bold">
                  <td colSpan={4} className="px-2 py-2.5 uppercase tracking-wider">
                    Total do período
                  </td>
                  <td className="px-2 py-2.5 text-right">{formatCurrency(resumo.totalServicos)}</td>
                  <td className="px-2 py-2.5 text-right">{formatCurrency(resumo.totalPecas)}</td>
                  <td className="px-2 py-2.5 text-right">{formatCurrency(resumo.totalMaoObra)}</td>
                  <td className="px-2 py-2.5 text-right text-[#d94f00]">
                    {formatCurrency(resumo.totalReceita)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        {/* Observação legal */}
        <div className="mt-6 rounded border border-gray-200 bg-gray-50 px-4 py-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">Observações</p>
          <ul className="mt-2 space-y-1 text-[9px] leading-relaxed text-gray-500">
            <li>• Relatório baseado exclusivamente em ordens de serviço com status &quot;Concluída&quot;.</li>
            <li>• Valores de serviços, peças e mão de obra conforme registrados em cada OS.</li>
            <li>• Documento de uso interno e controle gerencial — não substitui escrituração contábil.</li>
          </ul>
        </div>
      </div>

      {/* Rodapé */}
      <div className="border-t border-gray-200 bg-gray-50 px-8 py-3">
        <div className="flex items-center justify-between text-[8px] text-gray-400">
          <p>
            {EMPRESA.nome} · CNPJ {EMPRESA.cnpj} · {EMPRESA.telefone}
          </p>
          <p>
            Relatório gerado em {formatDateTime(geradoEm)} · {periodoLabel}
          </p>
        </div>
      </div>
    </div>
  );
}
