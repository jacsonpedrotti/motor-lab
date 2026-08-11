export default function Footer() {
  return (
    <footer
      className="border-t border-border bg-bg-deep py-8 sm:py-12"
      style={{ paddingBottom: "calc(2rem + var(--safe-bottom))" }}
    >
      <div className="container-main">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div className="min-w-0">
            <p className="heading-painel text-lg sm:text-xl">
              Motor<span className="text-accent">Lab</span>
            </p>
            <p className="mt-1 text-sm text-text-dim">
              Conserto de carros · Remap · Diagnóstico
            </p>
          </div>

          <p
            className="text-xs leading-relaxed text-text-dim"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            © {new Date().getFullYear()} MotorLab Oficina Mecânica Ltda.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            CNPJ 00.000.000/0001-00
          </p>
        </div>
      </div>
    </footer>
  );
}
