import { NextResponse } from "next/server";
import { criarOS, listarOS } from "@/lib/db";
import type { OrdemServicoInput } from "@/lib/types";

export async function GET() {
  const ordens = listarOS();
  return NextResponse.json(ordens);
}

export async function POST(request: Request) {
  let body: OrdemServicoInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  if (!body.clienteNome?.trim()) {
    return NextResponse.json({ error: "Nome do cliente é obrigatório" }, { status: 400 });
  }

  const os = criarOS(body);
  return NextResponse.json(os, { status: 201 });
}
