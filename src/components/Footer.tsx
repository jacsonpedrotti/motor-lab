import {
  ADDRESS,
  BUSINESS_HOURS,
  DEVELOPER,
  EMAIL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

const footerLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como funciona" },
  { href: "#sobre", label: "Dinamômetro" },
  { href: "#marcas", label: "Marcas" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border bg-bg-deep"
      style={{ paddingBottom: "calc(2rem + var(--safe-bottom))" }}
    >
      <div className="container-main py-10 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <p className="heading-painel text-xl sm:text-2xl">
              Motor<span className="text-accent">Lab</span>
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-muted">
              Conserto mecânico, diagnóstico computadorizado e remap com validação no dinamômetro.
            </p>
            <p
              className="mt-4 text-[10px] uppercase tracking-widest text-text-dim"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Desde 2009 · São Paulo, SP
            </p>
          </div>

          <div>
            <p
              className="mb-4 text-[10px] uppercase tracking-widest text-text-dim"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Navegação
            </p>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[10px] uppercase tracking-widest text-text-dim"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Contato
            </p>
            <ul className="space-y-3 text-sm text-text-muted">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="break-all hover:text-accent">
                  {EMAIL}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li>
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                  {ADDRESS.street}
                  <br />
                  CEP {ADDRESS.cep}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p
              className="mb-4 text-[10px] uppercase tracking-widest text-text-dim"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Horário
            </p>
            <p className="text-sm leading-relaxed text-text-muted">
              {BUSINESS_HOURS.weekdays}
              <br />
              {BUSINESS_HOURS.saturday}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <p
            className="text-xs leading-relaxed text-text-dim"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            © {year} MotorLab Oficina Mecânica Ltda.
            <span className="hidden sm:inline"> · </span>
            <br className="sm:hidden" />
            CNPJ 00.000.000/0001-00
          </p>

          <p className="text-xs text-text-dim">
            Desenvolvido por{" "}
            <a
              href={DEVELOPER.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-text-muted transition-colors hover:text-accent"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              {DEVELOPER.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
