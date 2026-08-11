import { buscarOS } from "@/lib/db";
import { notFound } from "next/navigation";
import OSPrintDocument from "@/components/painel/OSPrintDocument";
import PrintButton from "@/components/painel/PrintButton";

type Props = { params: Promise<{ id: string }> };

export default async function ImprimirOSPage({ params }: Props) {
  const { id } = await params;
  const os = buscarOS(Number(id));

  if (!os) notFound();

  return (
    <>
      <style>{`
        @page {
          size: A4;
          margin: 12mm 10mm;
        }
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .os-print-doc { box-shadow: none !important; }
        }
        @media screen {
          body { background: #e5e5e5; }
        }
      `}</style>

      <div className="no-print sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-gray-800">
            OS #{String(os.numero).padStart(4, "0")} — {os.clienteNome}
          </p>
          <p className="text-xs text-gray-500">Pré-visualização do documento para impressão</p>
        </div>
        <PrintButton />
      </div>

      <div className="px-4 py-8 print:p-0">
        <OSPrintDocument os={os} />
      </div>
    </>
  );
}
