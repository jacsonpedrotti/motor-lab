import {
  ADDRESS,
  BUSINESS_HOURS,
  GOOGLE_MAPS_EMBED,
  GOOGLE_MAPS_URL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

export default function Location() {
  return (
    <section id="localizacao" className="section-py border-t border-border bg-bg-deep">
      <div className="container-main">
        <div className="mb-10 max-w-2xl lg:mb-12">
          <p className="section-tag mb-4">Localização</p>
          <h2 className="heading-section mb-5 sm:mb-6">
            Visite a oficina
            <br />
            <span className="text-accent">ou fale pelo Instagram</span>
          </h2>
          <p className="text-sm leading-relaxed text-text-muted sm:text-base">
            Estamos na zona leste de São Paulo, com fácil acesso para quem busca conserto,
            diagnóstico ou remap. Confira o endereço, CEP e nossas redes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-stretch lg:gap-10">
          <div className="relative min-h-[260px] overflow-hidden border border-border bg-bg-surface sm:min-h-[320px] lg:min-h-0 lg:h-full">
            <iframe
              title="Mapa — MotorLab Oficina Mecânica"
              src={GOOGLE_MAPS_EMBED}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="flex flex-col gap-6 border border-border bg-bg-surface p-6 sm:p-8">
            <div>
              <p
                className="mb-2 text-[10px] uppercase tracking-widest text-text-dim"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
              >
                Endereço
              </p>
              <address className="not-italic text-base leading-relaxed text-text-primary sm:text-lg">
                {ADDRESS.street}
                <br />
                {ADDRESS.neighborhood} — {ADDRESS.city}, {ADDRESS.state}
              </address>
              <p
                className="mt-2 text-sm tabular-nums text-text-muted"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
              >
                CEP {ADDRESS.cep}
              </p>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target mt-4 inline-flex items-center text-sm font-medium text-accent hover:text-accent-bright"
              >
                Abrir no Google Maps →
              </a>
            </div>

            <div className="h-px bg-border" />

            <div>
              <p
                className="mb-2 text-[10px] uppercase tracking-widest text-text-dim"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
              >
                Instagram
              </p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex items-center gap-2 text-base text-text-primary hover:text-accent sm:text-lg"
              >
                <span className="text-accent" aria-hidden="true">
                  @
                </span>
                {INSTAGRAM_HANDLE.replace("@", "")}
              </a>
              <p className="mt-2 text-sm text-text-muted">
                Acompanhe serviços, passagens no dinamômetro e novidades da oficina.
              </p>
            </div>

            <div className="h-px bg-border" />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p
                  className="mb-1 text-[10px] uppercase tracking-widest text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  WhatsApp
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-primary hover:text-accent sm:text-base"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>
              <div>
                <p
                  className="mb-1 text-[10px] uppercase tracking-widest text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  Horário
                </p>
                <p className="text-sm text-text-muted">
                  {BUSINESS_HOURS.weekdays}
                  <br />
                  {BUSINESS_HOURS.saturday}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
