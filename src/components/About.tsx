import DynoShowcase from "@/components/DynoShowcase";

const highlights = [
  {
    title: "Medição real",
    text: "Potência e torque lidos no rolo — curva completa, não estimativa de bancada.",
  },
  {
    title: "Diagnóstico antes",
    text: "Scanner e inspeção mecânica antes de qualquer reprogramação de ECU.",
  },
  {
    title: "Relatório entregue",
    text: "Arquivo original salvo e laudo da passagem para você arquivar.",
  },
];

export default function About() {
  return (
    <section id="sobre" className="section-py relative border-t border-border bg-bg-surface">
      <div className="container-main">
        <div className="mb-10 max-w-2xl lg:mb-14">
          <p className="section-tag mb-4">Dinamômetro</p>
          <h2 className="heading-section mb-5 sm:mb-6">
            Potência no rolo.
            <br />
            <span className="text-accent">Não achismo na ECU.</span>
          </h2>
          <p className="text-sm leading-relaxed text-text-muted sm:text-base">
            Cada reprogramação passa pelo dinamômetro de rolo da oficina. Validamos
            ganho de potência e torque com dados reais — o mesmo padrão de oficinas
            de preparação que levam performance a sério.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12 xl:gap-16 lg:items-start">
          <DynoShowcase />

          <div className="flex flex-col gap-8 lg:pt-2">
            <ul className="space-y-5">
              {highlights.map((item, i) => (
                <li key={item.title} className="flex gap-4 border-l-2 border-accent/40 pl-5">
                  <span
                    className="mt-0.5 shrink-0 text-xs tabular-nums text-text-dim"
                    style={{ fontFamily: "var(--font-ibm-mono)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3
                      className="mb-1 text-sm font-semibold uppercase tracking-wide text-text-primary"
                      style={{ fontFamily: "var(--font-barlow)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="grid grid-cols-3 gap-px border border-border bg-border">
              {[
                { label: "Remaps validados", value: "850+" },
                { label: "cv máx. medidos", value: "420" },
                { label: "Passagens / mês", value: "40+" },
              ].map((stat) => (
                <div key={stat.label} className="bg-bg-deep px-3 py-4 text-center sm:px-4">
                  <p
                    className="text-lg font-medium tabular-nums text-accent sm:text-2xl"
                    style={{ fontFamily: "var(--font-ibm-mono)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-text-dim sm:text-xs">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
