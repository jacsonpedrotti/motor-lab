import ParallaxLayer from "@/components/ParallaxLayer";

const steps = [
  {
    step: "01",
    title: "Contato e triagem",
    text: "Você descreve o problema ou objetivo (barulho, fumaça, perda de potência, remap). Perguntamos modelo, ano, km e histórico de manutenção.",
  },
  {
    step: "02",
    title: "Diagnóstico na oficina",
    text: "Veículo entra para inspeção. Leitura de scanner, testes mecânicos e, se necessário, desmontagem parcial para identificar a falha. Sem diagnóstico, não passamos orçamento de conserto.",
  },
  {
    step: "03",
    title: "Orçamento detalhado",
    text: "Lista item a item: peças, mão de obra, prazo. Você aprova por escrito (WhatsApp ou formulário) antes de iniciarmos qualquer serviço.",
  },
  {
    step: "04",
    title: "Execução e controle",
    text: "Conserto com registro do que foi feito. Remap com arquivo original guardado. Fotos e relatórios disponíveis mediante solicitação.",
  },
  {
    step: "05",
    title: "Entrega e garantia",
    text: "Veículo testado, funcionamento conferido e orientações de uso. Garantia de 90 dias para mão de obra em serviços mecânicos, conforme termo entregue.",
  },
];

export default function Process() {
  return (
    <section id="processo" className="section-py relative overflow-hidden border-t border-border">
      <ParallaxLayer
        mode="float"
        speed={0.12}
        ariaHidden
        className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-accent/[0.06] blur-3xl"
      />

      <div className="container-main relative">
        <div className="mb-10 grid gap-6 md:mb-16 lg:grid-cols-2 lg:items-end lg:gap-8">
          <div>
            <p className="section-tag mb-4">Como funciona</p>
            <h2 className="heading-section">
              Processo transparente,
              <br />
              <span className="text-text-muted">sem surpresa na conta</span>
            </h2>
          </div>
          <p className="text-sm text-text-muted sm:text-base lg:text-right">
            Não passamos orçamento fechado por telefone sem ver o carro.
            O valor depende do que encontramos na inspeção — e você precisa
            saber disso antes de decidir.
          </p>
        </div>

        <div className="space-y-6 md:space-y-8 lg:hidden">
          {steps.map((item) => (
            <article key={item.step} className="flex gap-4 border-l border-border pl-4 sm:gap-5 sm:pl-5">
              <span
                className="shrink-0 text-sm font-medium text-accent"
                style={{ fontFamily: "var(--font-ibm-mono)" }}
              >
                {item.step}
              </span>
              <div className="min-w-0">
                <h3 className="mb-2 text-lg font-bold uppercase sm:text-xl" style={{ fontFamily: "var(--font-barlow)" }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="relative hidden lg:block">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[105%] -translate-x-1/2">
            <ParallaxLayer mode="float" speed={0.15} ariaHidden className="h-full w-px bg-border" />
          </div>

          <div className="space-y-0">
            {steps.map((item, index) => (
              <div
                key={item.step}
                className="relative grid grid-cols-2 gap-16 pb-12 last:pb-0"
              >
                <div className={index % 2 === 0 ? "text-right" : ""}>
                  {index % 2 === 0 && (
                    <>
                      <span
                        className="mb-2 block text-xs text-accent"
                        style={{ fontFamily: "var(--font-ibm-mono)" }}
                      >
                        Etapa {item.step}
                      </span>
                      <h3 className="mb-3 text-2xl font-bold uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-muted">{item.text}</p>
                    </>
                  )}
                </div>

                <div
                  className="absolute left-1/2 top-1 flex h-10 w-10 -translate-x-1/2 items-center justify-center border border-accent bg-bg-deep"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  <span className="text-xs font-medium text-accent">{item.step}</span>
                </div>

                <div>
                  {index % 2 === 1 && (
                    <>
                      <span
                        className="mb-2 block text-xs text-accent"
                        style={{ fontFamily: "var(--font-ibm-mono)" }}
                      >
                        Etapa {item.step}
                      </span>
                      <h3 className="mb-3 text-2xl font-bold uppercase" style={{ fontFamily: "var(--font-barlow)" }}>
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-text-muted">{item.text}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
