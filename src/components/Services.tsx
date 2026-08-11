import ParallaxLayer from "@/components/ParallaxLayer";

const services = [
  {
    id: "01",
    title: "Conserto Mecânico",
    subtitle: "Reparo com diagnóstico antes de trocar peça",
    description:
      "Conserto de motor, câmbio, suspensão, freios e sistemas auxiliares. Identificamos a causa do problema antes de orçar — evitamos substituir componentes desnecessariamente.",
    items: [
      "Reparo de motor (correia, vazamentos, aquecimento)",
      "Sistema de freios e suspensão",
      "Arrefecimento e escapamento",
      "Troca de embreagem e semieixo",
      "Laudo e relatório do serviço executado",
    ],
  },
  {
    id: "02",
    title: "Remap / Reprogramação ECU",
    subtitle: "Ganho de performance controlado",
    description:
      "Alteração do mapa de injeção e ignição via software, calibrado para o estado real do motor. Não prometemos números de dyno genéricos — o resultado depende do motor, combustível e uso.",
    items: [
      "Stage 1 (motor original, sem modificações)",
      "Stage 2 (downpipe, intake, intercooler)",
      "Desativação de DPF/EGR (consultar legislação local)",
      "Correção de flat spot e resposta do acelerador",
      "Arquivo original salvo antes de qualquer alteração",
    ],
  },
  {
    id: "03",
    title: "Diagnóstico Computadorizado",
    subtitle: "Leitura antes de qualquer intervenção",
    description:
      "Scanner automotivo, teste de compressão, análise de gases e inspeção visual. Identificamos a causa raiz antes de sugerir conserto ou remap — evitamos trocar peça às cegas.",
    items: [
      "Leitura e interpretação de códigos OBD",
      "Teste de compressão e vazamento",
      "Análise de mistura ar/combustível",
      "Relatório escrito para o cliente",
    ],
  },
  {
    id: "04",
    title: "Manutenção Preventiva",
    subtitle: "Para manter o carro em dia",
    description:
      "Troca de correia dentada, fluidos, velas, filtros e revisão de sistema de arrefecimento. Orientamos intervalos reais de uso — não apenas o manual genérico.",
    items: [
      "Correia dentada e tensor",
      "Fluido de arrefecimento e termostato",
      "Velas, cabos e bobinas",
      "Limpeza de bicos (ultrassom)",
    ],
  },
];

export default function Services() {
  return (
    <section id="servicos" className="section-py relative overflow-hidden border-t border-border bg-bg-surface">
      <ParallaxLayer
        mode="float"
        speed={0.18}
        ariaHidden
        className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="container-main relative">
        <div className="mb-10 max-w-2xl md:mb-16">
          <p className="section-tag mb-4">Serviços</p>
          <h2 className="heading-section mb-4">O que fazemos — e o que não fazemos</h2>
          <p className="text-sm text-text-muted sm:text-base">
            Somos oficina mecânica, não funilaria e não vendemos peça genérica
            sem origem. Cada serviço abaixo tem escopo definido para você saber
            exatamente o que contratar.
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="group bg-bg-surface p-5 transition-colors hover:bg-bg-elevated sm:p-6 lg:p-10"
            >
              <div className="mb-5 flex items-start justify-between sm:mb-6">
                <span
                  className="text-2xl font-medium text-border-light transition-colors group-hover:text-accent sm:text-3xl"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  {service.id}
                </span>
                <div className="accent-bar opacity-0 transition-opacity group-hover:opacity-100" />
              </div>

              <h3 className="mb-1 text-xl font-bold uppercase sm:text-2xl" style={{ fontFamily: "var(--font-barlow)" }}>
                {service.title}
              </h3>
              <p
                className="mb-3 text-xs uppercase tracking-wider text-accent sm:mb-4"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
              >
                {service.subtitle}
              </p>
              <p className="mb-5 text-sm leading-relaxed text-text-muted sm:mb-6">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-primary">
                    <span className="mt-1.5 block h-1 w-1 shrink-0 bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-6 text-xs text-text-dim sm:mt-8 sm:text-sm">
          * Remap e desativações de emissões podem ser restritos por legislação
          municipal ou estadual. Consulte antes de autorizar o serviço.
        </p>
      </div>
    </section>
  );
}
