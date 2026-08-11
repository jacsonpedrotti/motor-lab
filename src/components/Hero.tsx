import ParallaxLayer from "@/components/ParallaxLayer";

const stats = [
  { label: "Carros atendidos", value: "1.200+" },
  { label: "Remaps realizados", value: "850+" },
  { label: "Garantia serviços", value: "90 dias" },
  { label: "Prazo médio remap", value: "1–2 dias" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[100dvh] overflow-hidden bg-bg-deep"
      style={{ paddingTop: "calc(4.5rem + var(--safe-top))" }}
    >
      <ParallaxLayer
        mode="background"
        speed={0.42}
        ariaHidden
        className="hero-grid-drift pointer-events-none absolute inset-[-30%] bg-blueprint-fade"
      />

      <div className="noise pointer-events-none absolute inset-0" />

      {/* Glow orbs */}
      <ParallaxLayer
        mode="float"
        speed={0.18}
        ariaHidden
        className="pointer-events-none absolute -left-24 top-[12%] h-72 w-72 rounded-full bg-accent/14 blur-3xl sm:h-96 sm:w-96"
      >
        <div className="hero-glow-orb h-full w-full rounded-full bg-accent/20" />
      </ParallaxLayer>

      <ParallaxLayer
        mode="float"
        speed={0.28}
        ariaHidden
        className="pointer-events-none absolute -right-16 bottom-[18%] h-56 w-56 rounded-full bg-accent-bright/10 blur-3xl sm:h-80 sm:w-80"
      >
        <div className="hero-glow-orb-slow h-full w-full rounded-full bg-accent-bright/15" />
      </ParallaxLayer>

      <ParallaxLayer
        mode="background"
        speed={0.58}
        ariaHidden
        className="pointer-events-none absolute -right-8 top-0 hidden h-[140%] w-[44%] bg-accent/8 lg:block"
        style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }}
      />

      {/* Decorative ring */}
      <ParallaxLayer
        mode="float"
        speed={0.12}
        ariaHidden
        className="pointer-events-none absolute right-[8%] top-[22%] hidden h-40 w-40 lg:block xl:h-52 xl:w-52"
      >
        <div className="hero-ring absolute inset-0 rounded-full border border-dashed border-accent/25" />
        <div className="absolute inset-3 rounded-full border border-accent/10" />
      </ParallaxLayer>

      {/* Scan line */}
      <div
        className="hero-scan-line pointer-events-none absolute left-0 right-0 z-[1] h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        aria-hidden
      />

      <div className="container-main relative z-[2] grid gap-8 py-10 sm:gap-12 sm:py-16 lg:grid-cols-[1fr_340px] lg:items-end xl:grid-cols-[1fr_380px] lg:py-24">
        <div className="min-w-0">
          <p className="section-tag hero-enter mb-4 sm:mb-6">Oficina mecânica · Desde 2009</p>

          <h1 className="heading-display mb-5 text-text-primary sm:mb-6">
            <span className="hero-line-wrap">
              <span className="hero-line hero-line-d1">Conserto de carros</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line hero-line-d2 text-accent">com diagnóstico.</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line hero-line-d3">Remap com</span>
            </span>
            <span className="hero-line-wrap">
              <span className="hero-line hero-line-d4 text-text-muted">responsabilidade.</span>
            </span>
          </h1>

          <p className="hero-enter hero-enter-d5 mb-8 max-w-xl text-base leading-relaxed text-text-muted sm:mb-10 sm:text-lg">
            Reparo mecânico, diagnóstico computadorizado e reprogramação de ECU.
            Trabalhamos com leitura e laudo, não com achismo — cada serviço sai
            documentado.
          </p>

          <div className="hero-enter hero-enter-d6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="#contato"
              className="hero-cta-shine touch-target flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all duration-300 hover:bg-accent-bright hover:shadow-[0_0_32px_rgba(217,79,0,0.35)] sm:px-8"
            >
              Pedir orçamento
            </a>
            <a
              href="#servicos"
              className="touch-target flex items-center justify-center border border-border-light px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-text-primary transition-all duration-300 hover:border-accent hover:text-accent hover:shadow-[0_0_24px_rgba(217,79,0,0.12)] sm:px-8"
            >
              Ver serviços
            </a>
          </div>
        </div>

        <div className="hero-enter-right hero-enter-d4 hero-card-glow border border-border bg-bg-surface/95 p-5 backdrop-blur-sm sm:p-6 lg:p-8">
          <p
            className="mb-5 border-b border-border pb-3 text-xs uppercase tracking-widest text-text-dim sm:mb-6"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            Ficha técnica · Oficina
          </p>

          <dl className="space-y-4 sm:space-y-5">
            {stats.map((item, i) => (
              <div
                key={item.label}
                className={`hero-stat-row flex items-baseline justify-between gap-4`}
                style={{ animationDelay: `${0.55 + i * 0.1}s` }}
              >
                <dt className="text-sm text-text-muted">{item.label}</dt>
                <dd
                  className="text-lg font-medium text-accent sm:text-xl"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="hero-enter hero-enter-d7 mt-6 border-t border-border pt-5 sm:mt-8 sm:pt-6">
            <p className="text-xs leading-relaxed text-text-dim">
              Atendemos motores aspirados e turbo — gasolina, flex e diesel.
              Consulte compatibilidade antes de agendar.
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-[2] hidden -translate-x-1/2 lg:block">
        <ParallaxLayer mode="float" speed={0.35} className="flex flex-col items-center gap-2">
          <span
            className="hero-enter-fade hero-enter-d7 text-[10px] uppercase tracking-[0.2em] text-text-dim"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            Scroll
          </span>
          <div className="hero-scroll-line h-8 w-px bg-gradient-to-b from-accent to-transparent" />
        </ParallaxLayer>
      </div>
    </section>
  );
}
