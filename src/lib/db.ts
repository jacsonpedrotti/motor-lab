import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import type { OrdemServico, OrdemServicoInput, OSStatus, PecaItem, ServicoItem } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "oficina.db");

type Row = {
  id: number;
  numero: number;
  created_at: string;
  updated_at: string;
  concluida_em: string | null;
  status: OSStatus;
  cliente_nome: string;
  cliente_telefone: string;
  cliente_email: string;
  veiculo_marca: string;
  veiculo_modelo: string;
  veiculo_ano: string;
  veiculo_placa: string;
  veiculo_km: string;
  problema: string;
  servicos: string;
  pecas: string;
  mao_obra: number;
  valor_total: number;
  observacoes: string;
  previsao_entrega: string;
};

let dbInstance: Database.Database | null = null;

function getDb(): Database.Database {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS ordens_servico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero INTEGER NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      concluida_em TEXT,
      status TEXT NOT NULL DEFAULT 'aberta',
      cliente_nome TEXT NOT NULL,
      cliente_telefone TEXT DEFAULT '',
      cliente_email TEXT DEFAULT '',
      veiculo_marca TEXT DEFAULT '',
      veiculo_modelo TEXT DEFAULT '',
      veiculo_ano TEXT DEFAULT '',
      veiculo_placa TEXT DEFAULT '',
      veiculo_km TEXT DEFAULT '',
      problema TEXT DEFAULT '',
      servicos TEXT NOT NULL DEFAULT '[]',
      pecas TEXT NOT NULL DEFAULT '[]',
      mao_obra REAL NOT NULL DEFAULT 0,
      valor_total REAL NOT NULL DEFAULT 0,
      observacoes TEXT DEFAULT '',
      previsao_entrega TEXT DEFAULT ''
    );
  `);

  dbInstance = db;
  return db;
}

function parseJson<T>(value: string, fallback: T): T {
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function calcTotal(servicos: ServicoItem[], pecas: PecaItem[], maoObra: number): number {
  const totalServicos = servicos.reduce((s, i) => s + (i.valor || 0), 0);
  const totalPecas = pecas.reduce((s, i) => s + (i.quantidade || 0) * (i.valorUnitario || 0), 0);
  return totalServicos + totalPecas + (maoObra || 0);
}

function rowToOS(row: Row): OrdemServico {
  return {
    id: row.id,
    numero: row.numero,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    concluidaEm: row.concluida_em ?? undefined,
    status: row.status,
    clienteNome: row.cliente_nome,
    clienteTelefone: row.cliente_telefone,
    clienteEmail: row.cliente_email,
    veiculoMarca: row.veiculo_marca,
    veiculoModelo: row.veiculo_modelo,
    veiculoAno: row.veiculo_ano,
    veiculoPlaca: row.veiculo_placa,
    veiculoKm: row.veiculo_km,
    problema: row.problema,
    servicos: parseJson<ServicoItem[]>(row.servicos, []),
    pecas: parseJson<PecaItem[]>(row.pecas, []),
    maoObra: row.mao_obra,
    valorTotal: row.valor_total,
    observacoes: row.observacoes,
    previsaoEntrega: row.previsao_entrega,
  };
}

function nextNumero(db: Database.Database): number {
  const row = db.prepare("SELECT COALESCE(MAX(numero), 0) + 1 AS n FROM ordens_servico").get() as {
    n: number;
  };
  return row.n;
}

export function listarOS(): OrdemServico[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM ordens_servico ORDER BY created_at DESC")
    .all() as Row[];
  return rows.map(rowToOS);
}

export function listarOSConcluidas(): OrdemServico[] {
  const db = getDb();
  const rows = db
    .prepare("SELECT * FROM ordens_servico WHERE status = 'concluida' ORDER BY concluida_em DESC")
    .all() as Row[];
  return rows.map(rowToOS);
}

export function buscarOS(id: number): OrdemServico | null {
  const db = getDb();
  const row = db.prepare("SELECT * FROM ordens_servico WHERE id = ?").get(id) as Row | undefined;
  return row ? rowToOS(row) : null;
}

export function contarPorStatus(): Record<OSStatus, number> {
  const db = getDb();
  const rows = db
    .prepare("SELECT status, COUNT(*) AS c FROM ordens_servico GROUP BY status")
    .all() as { status: OSStatus; c: number }[];

  const base: Record<OSStatus, number> = {
    aberta: 0,
    em_andamento: 0,
    aguardando_peca: 0,
    concluida: 0,
    entregue: 0,
    cancelada: 0,
  };

  for (const row of rows) {
    base[row.status] = row.c;
  }

  return base;
}

export function criarOS(input: OrdemServicoInput): OrdemServico {
  const db = getDb();
  const now = new Date().toISOString();
  const servicos = input.servicos ?? [];
  const pecas = input.pecas ?? [];
  const maoObra = input.maoObra ?? 0;
  const status = input.status ?? "aberta";
  const valorTotal = calcTotal(servicos, pecas, maoObra);
  const concluidaEm = status === "concluida" ? now : null;

  const result = db
    .prepare(
      `INSERT INTO ordens_servico (
        numero, created_at, updated_at, concluida_em, status,
        cliente_nome, cliente_telefone, cliente_email,
        veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_placa, veiculo_km,
        problema, servicos, pecas, mao_obra, valor_total, observacoes, previsao_entrega
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      nextNumero(db),
      now,
      now,
      concluidaEm,
      status,
      input.clienteNome,
      input.clienteTelefone ?? "",
      input.clienteEmail ?? "",
      input.veiculoMarca ?? "",
      input.veiculoModelo ?? "",
      input.veiculoAno ?? "",
      input.veiculoPlaca ?? "",
      input.veiculoKm ?? "",
      input.problema ?? "",
      JSON.stringify(servicos),
      JSON.stringify(pecas),
      maoObra,
      valorTotal,
      input.observacoes ?? "",
      input.previsaoEntrega ?? ""
    );

  return buscarOS(Number(result.lastInsertRowid))!;
}

export function atualizarOS(id: number, input: OrdemServicoInput): OrdemServico | null {
  const existing = buscarOS(id);
  if (!existing) return null;

  const db = getDb();
  const now = new Date().toISOString();
  const servicos = input.servicos ?? existing.servicos;
  const pecas = input.pecas ?? existing.pecas;
  const maoObra = input.maoObra ?? existing.maoObra;
  const status = input.status ?? existing.status;
  const valorTotal = calcTotal(servicos, pecas, maoObra);

  let concluidaEm = existing.concluidaEm ?? null;
  if (status === "concluida" && existing.status !== "concluida") {
    concluidaEm = now;
  } else if (status !== "concluida") {
    concluidaEm = null;
  }

  db.prepare(
    `UPDATE ordens_servico SET
      updated_at = ?, concluida_em = ?, status = ?,
      cliente_nome = ?, cliente_telefone = ?, cliente_email = ?,
      veiculo_marca = ?, veiculo_modelo = ?, veiculo_ano = ?, veiculo_placa = ?, veiculo_km = ?,
      problema = ?, servicos = ?, pecas = ?, mao_obra = ?, valor_total = ?,
      observacoes = ?, previsao_entrega = ?
    WHERE id = ?`
  ).run(
    now,
    concluidaEm,
    status,
    input.clienteNome ?? existing.clienteNome,
    input.clienteTelefone ?? existing.clienteTelefone,
    input.clienteEmail ?? existing.clienteEmail,
    input.veiculoMarca ?? existing.veiculoMarca,
    input.veiculoModelo ?? existing.veiculoModelo,
    input.veiculoAno ?? existing.veiculoAno,
    input.veiculoPlaca ?? existing.veiculoPlaca,
    input.veiculoKm ?? existing.veiculoKm,
    input.problema ?? existing.problema,
    JSON.stringify(servicos),
    JSON.stringify(pecas),
    maoObra,
    valorTotal,
    input.observacoes ?? existing.observacoes,
    input.previsaoEntrega ?? existing.previsaoEntrega,
    id
  );

  return buscarOS(id);
}

export function excluirOS(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM ordens_servico WHERE id = ?").run(id);
  return result.changes > 0;
}
