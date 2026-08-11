import BrandLogo from "@/components/BrandLogo";
import { CAR_BRANDS } from "@/lib/car-brands";

export default function Brands() {
  return (
    <section id="marcas" className="section-py relative overflow-hidden border-t border-border bg-bg-surface">
      <div className="container-main">
        <div className="mb-10 max-w-2xl md:mb-12">
          <p className="section-tag mb-4">Marcas atendidas</p>
          <h2 className="heading-section mb-5 sm:mb-6">
            Trabalhamos com
            <br />
            <span className="text-accent">todas as marcas do mercado</span>
          </h2>
          <p className="text-sm leading-relaxed text-text-muted sm:text-base">
            Conserto mecânico, diagnóstico e remap para carros nacionais, importados e
            híbridos/elétricos — do popular ao premium. Se roda no Brasil, atendemos.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {CAR_BRANDS.map((brand) => (
            <li
              key={brand.name}
              className="group flex min-h-[5.5rem] flex-col items-center justify-center gap-2.5 bg-bg-deep px-3 py-4 text-center transition-colors hover:bg-bg-elevated sm:min-h-[6rem] sm:gap-3 sm:py-5"
            >
              <BrandLogo brand={brand} />
              <span
                className="text-[11px] font-medium uppercase leading-tight tracking-wide text-text-muted transition-colors group-hover:text-text-primary sm:text-xs"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {brand.name}
              </span>
            </li>
          ))}
        </ul>

        <p
          className="mt-6 text-center text-xs text-text-dim sm:text-left"
          style={{ fontFamily: "var(--font-ibm-mono)" }}
        >
          {CAR_BRANDS.length} marcas · Diagnóstico e remap conforme plataforma do veículo
        </p>
      </div>
    </section>
  );
}
