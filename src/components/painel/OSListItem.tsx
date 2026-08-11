import Link from "next/link";
import { formatCurrency, formatDate, formatPlaca } from "@/lib/format";
import { STATUS_COLORS, STATUS_LABELS, type OSStatus } from "@/lib/types";

interface Props {
  id: number;
  numero: number;
  clienteNome: string;
  veiculoMarca?: string;
  veiculoModelo?: string;
  veiculoPlaca?: string;
  status: OSStatus;
  valorTotal: number;
  data: string;
  dataLabel?: string;
}

export default function OSListItem({
  id,
  numero,
  clienteNome,
  veiculoMarca,
  veiculoModelo,
  veiculoPlaca,
  status,
  valorTotal,
  data,
  dataLabel = "Abertura",
}: Props) {
  const veiculo =
    [veiculoMarca, veiculoModelo, veiculoPlaca && formatPlaca(veiculoPlaca)]
      .filter(Boolean)
      .join(" · ") || "—";

  return (
    <Link
      href={`/painel/os/${id}`}
      className="block border-b border-border bg-bg-surface transition-colors last:border-b-0 hover:bg-bg-elevated active:bg-bg-elevated"
    >
      {/* Mobile — card */}
      <div className="flex flex-col gap-2.5 p-4 md:hidden">
        <div className="flex items-start justify-between gap-3">
          <span
            className="text-base font-medium text-accent"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            #{String(numero).padStart(4, "0")}
          </span>
          <span
            className={`shrink-0 border px-2 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[status]}`}
          >
            {STATUS_LABELS[status]}
          </span>
        </div>
        <p className="font-medium leading-snug text-text-primary">{clienteNome}</p>
        <p className="text-sm text-text-muted">{veiculo}</p>
        <div className="flex items-center justify-between border-t border-border pt-2.5">
          <span
            className="text-sm font-medium text-text-primary"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            {formatCurrency(valorTotal)}
          </span>
          <span className="text-xs text-text-dim">
            {dataLabel}: {formatDate(data)}
          </span>
        </div>
      </div>

      {/* Desktop — table row */}
      <div className="hidden grid-cols-[72px_1fr_1fr_108px_96px_80px] items-center gap-4 px-4 py-3.5 md:grid">
        <span
          className="text-sm font-medium text-accent"
          style={{ fontFamily: "var(--font-ibm-mono)" }}
        >
          #{String(numero).padStart(4, "0")}
        </span>
        <span className="truncate text-sm text-text-primary">{clienteNome}</span>
        <span className="truncate text-sm text-text-muted">{veiculo}</span>
        <span
          className={`inline-block w-fit border px-2 py-0.5 text-[10px] uppercase tracking-wider ${STATUS_COLORS[status]}`}
        >
          {STATUS_LABELS[status]}
        </span>
        <span
          className="text-sm text-text-muted"
          style={{ fontFamily: "var(--font-ibm-mono)" }}
        >
          {formatCurrency(valorTotal)}
        </span>
        <span className="text-xs text-text-dim">{formatDate(data)}</span>
      </div>
    </Link>
  );
}
