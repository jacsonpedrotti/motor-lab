import type { OrdemServico, PecaItem, ServicoItem } from "./types";

export interface ResumoReceita {
  totalReceita: number;
  totalServicos: number;
  totalPecas: number;
  totalMaoObra: number;
  quantidadeOS: number;
  ticketMedio: number;
}

export interface ReceitaMensal {
  mes: string; // YYYY-MM
  label: string; // "Ago/2026"
  total: number;
  servicos: number;
  pecas: number;
  maoObra: number;
  quantidadeOS: number;
}

function sumServicos(servicos: ServicoItem[]): number {
  return servicos.reduce((s, i) => s + i.valor, 0);
}

function sumPecas(pecas: PecaItem[]): number {
  return pecas.reduce((s, i) => s + i.quantidade * i.valorUnitario, 0);
}

function getMesReferencia(os: OrdemServico & { concluidaEm?: string }): string {
  const data = os.concluidaEm || os.updatedAt;
  return data.slice(0, 7); // YYYY-MM
}

export function filtrarOSPorMes(
  ordens: (OrdemServico & { concluidaEm?: string })[],
  mes: string
): (OrdemServico & { concluidaEm?: string })[] {
  return ordens.filter((os) => getMesReferencia(os) === mes);
}

export function obterMesesComReceita(mensal: ReceitaMensal[]): ReceitaMensal[] {
  return mensal.filter((m) => m.total > 0);
}

function formatMesLabel(mes: string): string {
  const [ano, mesNum] = mes.split("-");
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  return `${meses[parseInt(mesNum, 10) - 1]}/${ano}`;
}

function gerarMesesEntre(inicio: string, fim: string): string[] {
  const meses: string[] = [];
  const [y1, m1] = inicio.split("-").map(Number);
  const [y2, m2] = fim.split("-").map(Number);

  let ano = y1;
  let mes = m1;

  while (ano < y2 || (ano === y2 && mes <= m2)) {
    meses.push(`${ano}-${String(mes).padStart(2, "0")}`);
    mes++;
    if (mes > 12) {
      mes = 1;
      ano++;
    }
  }

  return meses;
}

export function calcularResumoReceita(ordensConcluidas: OrdemServico[]): ResumoReceita {
  let totalServicos = 0;
  let totalPecas = 0;
  let totalMaoObra = 0;

  for (const os of ordensConcluidas) {
    totalServicos += sumServicos(os.servicos);
    totalPecas += sumPecas(os.pecas);
    totalMaoObra += os.maoObra;
  }

  const totalReceita = totalServicos + totalPecas + totalMaoObra;
  const quantidadeOS = ordensConcluidas.length;

  return {
    totalReceita,
    totalServicos,
    totalPecas,
    totalMaoObra,
    quantidadeOS,
    ticketMedio: quantidadeOS > 0 ? totalReceita / quantidadeOS : 0,
  };
}

export function calcularReceitaMensal(
  ordensConcluidas: (OrdemServico & { concluidaEm?: string })[]
): ReceitaMensal[] {
  if (ordensConcluidas.length === 0) return [];

  const porMes = new Map<string, ReceitaMensal>();

  for (const os of ordensConcluidas) {
    const mes = getMesReferencia(os);
    const servicos = sumServicos(os.servicos);
    const pecas = sumPecas(os.pecas);
    const maoObra = os.maoObra;

    const atual = porMes.get(mes) ?? {
      mes,
      label: formatMesLabel(mes),
      total: 0,
      servicos: 0,
      pecas: 0,
      maoObra: 0,
      quantidadeOS: 0,
    };

    atual.total += servicos + pecas + maoObra;
    atual.servicos += servicos;
    atual.pecas += pecas;
    atual.maoObra += maoObra;
    atual.quantidadeOS += 1;

    porMes.set(mes, atual);
  }

  const mesesOrdenados = [...porMes.keys()].sort();
  const todosMeses = gerarMesesEntre(mesesOrdenados[0], mesesOrdenados[mesesOrdenados.length - 1]);

  return todosMeses.map((mes) => {
    const existente = porMes.get(mes);
    if (existente) return existente;
    return {
      mes,
      label: formatMesLabel(mes),
      total: 0,
      servicos: 0,
      pecas: 0,
      maoObra: 0,
      quantidadeOS: 0,
    };
  });
}

export { formatMesLabel };
