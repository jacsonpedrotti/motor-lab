import { formatCurrency, formatDate, formatDateTime, formatPlaca } from "@/lib/format";
import type { OrdemServico } from "@/lib/types";
import { STATUS_LABELS } from "@/lib/types";

const EMPRESA = {
  nome: "MotorLab",
  slogan: "Conserto de Carros · Remap · Diagnóstico",
  endereco: "Rua das Oficinas, 847 — Vila Industrial",
  cidade: "São Paulo, SP — CEP 03100-000",
  telefone: "(11) 99999-9999",
  email: "contato@motorlab.com.br",
  cnpj: "00.000.000/0001-00",
};

const STATUS_PRINT: Record<string, { bg: string; text: string }> = {
  aberta: { bg: "#dbeafe", text: "#1e40af" },
  em_andamento: { bg: "#fef3c7", text: "#92400e" },
  aguardando_peca: { bg: "#ede9fe", text: "#5b21b6" },
  concluida: { bg: "#d1fae5", text: "#065f46" },
  entregue: { bg: "#d1fae5", text: "#047857" },
  cancelada: { bg: "#fee2e2", text: "#991b1b" },
};

interface Props {
  os: OrdemServico;
}

export default function OSPrintDocument({ os }: Props) {
  const veiculo = [os.veiculoMarca, os.veiculoModelo, os.veiculoAno].filter(Boolean).join(" ");
  const statusStyle = STATUS_PRINT[os.status] ?? STATUS_PRINT.aberta;

  const totalServicos = os.servicos.reduce((s, i) => s + i.valor, 0);
  const totalPecas = os.pecas.reduce((s, i) => s + i.quantidade * i.valorUnitario, 0);

  const temItens = os.servicos.length > 0 || os.pecas.length > 0;

  return (
    <div className="os-print-doc mx-auto max-w-[210mm] bg-white text-[#1a1a1a] shadow-lg print:max-w-none print:shadow-none">
      {/* Faixa superior */}
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

        <div className="flex w-[200px] flex-col border-l border-[#2a2a26] bg-[#1c1c19]">
          <div className="border-b border-[#d94f00] bg-[#d94f00] px-5 py-2 text-center">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/90">
              Ordem de Serviço
            </p>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center px-5 py-4">
            <p className="text-4xl font-bold tracking-tight text-white">
              #{String(os.numero).padStart(4, "0")}
            </p>
            <span
              className="mt-2 inline-block rounded px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
            >
              {STATUS_LABELS[os.status]}
            </span>
          </div>
        </div>
      </div>

      {/* Datas */}
      <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 text-[11px]">
        <div className="border-r border-gray-200 px-6 py-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Data de abertura
          </p>
          <p className="mt-0.5 font-semibold">{formatDate(os.createdAt)}</p>
        </div>
        <div className="border-r border-gray-200 px-6 py-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Previsão de entrega
          </p>
          <p className="mt-0.5 font-semibold">
            {os.previsaoEntrega ? formatDate(os.previsaoEntrega) : "A definir"}
          </p>
        </div>
        <div className="px-6 py-3">
          <p className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Última atualização
          </p>
          <p className="mt-0.5 font-semibold">{formatDate(os.updatedAt)}</p>
        </div>
      </div>

      <div className="px-8 py-6">
        {/* Cliente + Veículo */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div className="rounded border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#d94f00]">
                Dados do cliente
              </p>
            </div>
            <div className="space-y-1 px-4 py-3 text-[12px]">
              <p className="text-sm font-bold uppercase">{os.clienteNome}</p>
              {os.clienteTelefone && (
                <p>
                  <span className="text-gray-400">Tel: </span>
                  {os.clienteTelefone}
                </p>
              )}
              {os.clienteEmail && (
                <p>
                  <span className="text-gray-400">E-mail: </span>
                  {os.clienteEmail}
                </p>
              )}
            </div>
          </div>

          <div className="rounded border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#d94f00]">
                Dados do veículo
              </p>
            </div>
            <div className="space-y-1 px-4 py-3 text-[12px]">
              <p className="text-sm font-bold uppercase">{veiculo || "Não informado"}</p>
              {os.veiculoPlaca && (
                <p>
                  <span className="text-gray-400">Placa: </span>
                  <span className="font-mono font-bold tracking-widest">
                    {formatPlaca(os.veiculoPlaca)}
                  </span>
                </p>
              )}
              {os.veiculoKm && (
                <p>
                  <span className="text-gray-400">Quilometragem: </span>
                  {os.veiculoKm} km
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Problema */}
        {os.problema && (
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-1 bg-[#d94f00]" />
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Problema relatado pelo cliente
              </p>
            </div>
            <div className="rounded border border-gray-200 border-l-4 border-l-[#d94f00] bg-gray-50 px-4 py-3 text-[12px] leading-relaxed">
              {os.problema}
            </div>
          </div>
        )}

        {/* Tabela unificada de itens */}
        {temItens && (
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-4 w-1 bg-[#d94f00]" />
              <p className="text-[9px] font-bold uppercase tracking-wider text-gray-500">
                Discriminação de serviços e peças
              </p>
            </div>
            <table className="w-full border-collapse overflow-hidden rounded border border-gray-200 text-[11px]">
              <thead>
                <tr className="bg-[#141412] text-white">
                  <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="w-16 px-4 py-2.5 text-center font-semibold uppercase tracking-wider">
                    Qtd
                  </th>
                  <th className="w-28 px-4 py-2.5 text-right font-semibold uppercase tracking-wider">
                    Valor un.
                  </th>
                  <th className="w-28 px-4 py-2.5 text-right font-semibold uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {os.servicos.map((s, i) => (
                  <tr key={`s-${i}`} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-gray-400">
                      S{i + 1}
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 font-medium">
                      {s.descricao}
                      <span className="ml-2 text-[9px] uppercase tracking-wider text-gray-400">
                        serviço
                      </span>
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-center text-gray-400">
                      1
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-right font-mono">
                      {formatCurrency(s.valor)}
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-right font-mono font-semibold">
                      {formatCurrency(s.valor)}
                    </td>
                  </tr>
                ))}
                {os.pecas.map((p, i) => (
                  <tr key={`p-${i}`} className={(os.servicos.length + i) % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-gray-400">
                      P{i + 1}
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 font-medium">
                      {p.descricao}
                      <span className="ml-2 text-[9px] uppercase tracking-wider text-gray-400">
                        peça
                      </span>
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-center font-mono">
                      {p.quantidade}
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-right font-mono">
                      {formatCurrency(p.valorUnitario)}
                    </td>
                    <td className="border-t border-gray-100 px-4 py-2.5 text-right font-mono font-semibold">
                      {formatCurrency(p.quantidade * p.valorUnitario)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Totais */}
        <div className="mb-6 flex justify-end">
          <div className="w-72 overflow-hidden rounded border border-gray-200">
            {totalServicos > 0 && (
              <div className="flex justify-between border-b border-gray-100 px-4 py-2 text-[11px]">
                <span className="text-gray-500">Subtotal serviços</span>
                <span className="font-mono">{formatCurrency(totalServicos)}</span>
              </div>
            )}
            {totalPecas > 0 && (
              <div className="flex justify-between border-b border-gray-100 px-4 py-2 text-[11px]">
                <span className="text-gray-500">Subtotal peças</span>
                <span className="font-mono">{formatCurrency(totalPecas)}</span>
              </div>
            )}
            {os.maoObra > 0 && (
              <div className="flex justify-between border-b border-gray-100 px-4 py-2 text-[11px]">
                <span className="text-gray-500">Mão de obra</span>
                <span className="font-mono">{formatCurrency(os.maoObra)}</span>
              </div>
            )}
            <div className="flex justify-between bg-[#141412] px-4 py-3 text-white">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total geral</span>
              <span className="font-mono text-lg font-bold text-[#d94f00]">
                {formatCurrency(os.valorTotal)}
              </span>
            </div>
          </div>
        </div>

        {/* Observações */}
        {os.observacoes && (
          <div className="mb-6 rounded border border-gray-200 bg-gray-50 p-4">
            <p className="mb-1 text-[9px] font-bold uppercase tracking-wider text-gray-400">
              Observações técnicas
            </p>
            <p className="text-[11px] leading-relaxed text-gray-700">{os.observacoes}</p>
          </div>
        )}

        {/* Termos */}
        <div className="mb-8 rounded border border-gray-200 p-4">
          <p className="mb-2 text-[9px] font-bold uppercase tracking-wider text-gray-400">
            Termos e condições
          </p>
          <ul className="space-y-1 text-[9px] leading-relaxed text-gray-500">
            <li>
              • O prazo de entrega é estimado e pode variar conforme disponibilidade de peças
              e complexidade do serviço.
            </li>
            <li>
              • Serviços de retífica possuem garantia de 6 (seis) meses para mão de obra,
              conforme termo de garantia entregue na conclusão do serviço.
            </li>
            <li>
              • Peças substituídas somente serão disponibilizadas ao cliente mediante
              solicitação no ato da entrega.
            </li>
            <li>
              • Veículos não retirados em até 30 dias após comunicação de conclusão estarão
              sujeitos à cobrança de estadia diária.
            </li>
            <li>
              • A execução dos serviços descritos nesta OS implica concordância com os
              valores e condições aqui estabelecidos.
            </li>
          </ul>
        </div>

        {/* Assinaturas */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="mb-1 h-px bg-gray-300" />
            <div className="h-12" />
            <div className="mb-1 h-px bg-black" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">
              Assinatura do cliente
            </p>
            <p className="text-[9px] text-gray-400">
              Declaro estar ciente dos serviços e valores acordados
            </p>
            <p className="mt-2 text-[9px] text-gray-400">
              Data: ______ / ______ / ________
            </p>
          </div>
          <div>
            <div className="mb-1 h-px bg-gray-300" />
            <div className="h-12" />
            <div className="mb-1 h-px bg-black" />
            <p className="text-[10px] font-semibold uppercase tracking-wider">
              Responsável técnico — MotorLab
            </p>
            <p className="text-[9px] text-gray-400">Mecânico responsável pela execução</p>
            <p className="mt-2 text-[9px] text-gray-400">
              Data: ______ / ______ / ________
            </p>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="border-t border-gray-200 bg-gray-50 px-8 py-3">
        <div className="flex items-center justify-between text-[8px] text-gray-400">
          <p>
            {EMPRESA.nome} · CNPJ {EMPRESA.cnpj} · {EMPRESA.telefone}
          </p>
          <p>
            Documento gerado em {formatDateTime(new Date().toISOString())} · OS #
            {String(os.numero).padStart(4, "0")}
          </p>
        </div>
      </div>
    </div>
  );
}
