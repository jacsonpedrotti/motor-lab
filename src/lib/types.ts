export type OSStatus =
  | "aberta"
  | "em_andamento"
  | "aguardando_peca"
  | "concluida"
  | "entregue"
  | "cancelada";

export interface PecaItem {
  descricao: string;
  quantidade: number;
  valorUnitario: number;
}

export interface ServicoItem {
  descricao: string;
  valor: number;
}

export interface OrdemServico {
  id: number;
  numero: number;
  createdAt: string;
  updatedAt: string;
  status: OSStatus;
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail: string;
  veiculoMarca: string;
  veiculoModelo: string;
  veiculoAno: string;
  veiculoPlaca: string;
  veiculoKm: string;
  problema: string;
  servicos: ServicoItem[];
  pecas: PecaItem[];
  maoObra: number;
  valorTotal: number;
  observacoes: string;
  previsaoEntrega: string;
  concluidaEm?: string;
}

export interface OrdemServicoInput {
  status?: OSStatus;
  clienteNome: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  veiculoMarca?: string;
  veiculoModelo?: string;
  veiculoAno?: string;
  veiculoPlaca?: string;
  veiculoKm?: string;
  problema?: string;
  servicos?: ServicoItem[];
  pecas?: PecaItem[];
  maoObra?: number;
  observacoes?: string;
  previsaoEntrega?: string;
}

export const STATUS_LABELS: Record<OSStatus, string> = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  aguardando_peca: "Aguardando peça",
  concluida: "Concluída",
  entregue: "Entregue",
  cancelada: "Cancelada",
};

export const STATUS_COLORS: Record<OSStatus, string> = {
  aberta: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  em_andamento: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  aguardando_peca: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  concluida: "bg-green-500/20 text-green-300 border-green-500/30",
  entregue: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  cancelada: "bg-red-500/20 text-red-300 border-red-500/30",
};
