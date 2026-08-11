import { NextResponse } from "next/server";
import { atualizarOS, buscarOS, excluirOS } from "@/lib/db";
import type { OrdemServicoInput } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const os = buscarOS(Number(id));
  if (!os) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(os);
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  let body: OrdemServicoInput;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const os = atualizarOS(Number(id), body);
  if (!os) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json(os);
}

export async function DELETE(_request: Request, { params }: Props) {
  const { id } = await params;
  const ok = excluirOS(Number(id));
  if (!ok) return NextResponse.json({ error: "Não encontrada" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
