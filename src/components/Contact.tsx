"use client";

import { FormEvent, useState } from "react";
import ParallaxLayer from "@/components/ParallaxLayer";
import {
  ADDRESS,
  BUSINESS_HOURS,
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contato" className="section-py relative overflow-hidden border-t border-border">
      <ParallaxLayer
        mode="float"
        speed={0.14}
        ariaHidden
        className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-accent/[0.07] blur-3xl"
      />

      <div className="container-main relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            <p className="section-tag mb-4">Contato</p>
            <h2 className="heading-section mb-5 sm:mb-6">Solicite orçamento</h2>
            <p className="mb-8 text-sm text-text-muted sm:mb-10 sm:text-base">
              Descreva o serviço que precisa. Para conserto mecânico, informe sintomas
              (barulho, fumaça, aquecimento). Para remap, informe modelo, ano
              e modificações existentes.
            </p>

            <div className="space-y-5 border-l-2 border-accent pl-5 sm:space-y-6 sm:pl-6">
              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-wider text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  WhatsApp
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center text-base text-text-primary hover:text-accent sm:text-lg"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </div>

              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-wider text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  E-mail
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="touch-target inline-flex items-center break-all text-base text-text-primary hover:text-accent sm:text-lg"
                >
                  {EMAIL}
                </a>
              </div>

              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-wider text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  Instagram
                </p>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="touch-target inline-flex items-center text-base text-text-primary hover:text-accent sm:text-lg"
                >
                  {INSTAGRAM_HANDLE}
                </a>
              </div>

              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-wider text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  Endereço
                </p>
                <address className="not-italic text-sm text-text-muted sm:text-base">
                  {ADDRESS.street} — {ADDRESS.neighborhood}
                  <br />
                  {ADDRESS.city}, {ADDRESS.state} — CEP {ADDRESS.cep}
                </address>
              </div>

              <div>
                <p
                  className="mb-1 text-xs uppercase tracking-wider text-text-dim"
                  style={{ fontFamily: "var(--font-ibm-mono)" }}
                >
                  Horário
                </p>
                <p className="text-sm text-text-muted sm:text-base">
                  {BUSINESS_HOURS.weekdays}
                  <br />
                  {BUSINESS_HOURS.saturday}
                </p>
              </div>
            </div>
          </div>

          <div className="border border-border bg-bg-surface p-5 sm:p-6 md:p-8">
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center py-8 text-center sm:py-12">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border-2 border-accent">
                  <span className="text-xl text-accent">✓</span>
                </div>
                <h3 className="mb-2 text-lg font-bold uppercase sm:text-xl" style={{ fontFamily: "var(--font-barlow)" }}>
                  Mensagem recebida
                </h3>
                <p className="text-sm text-text-muted">
                  Retornamos em até 1 dia útil. Para urgência, use o WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <label htmlFor="nome" className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim">
                    Nome
                  </label>
                  <input
                    id="nome"
                    name="nome"
                    type="text"
                    required
                    className="w-full border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div>
                    <label htmlFor="telefone" className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim">
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="telefone"
                      name="telefone"
                      type="tel"
                      required
                      className="w-full border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <label htmlFor="servico" className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim">
                      Serviço
                    </label>
                    <select
                      id="servico"
                      name="servico"
                      required
                      className="w-full border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
                    >
                      <option value="">Selecione</option>
                      <option value="conserto">Conserto mecânico</option>
                      <option value="remap">Remap / Reprogramação ECU</option>
                      <option value="diagnostico">Diagnóstico</option>
                      <option value="preventiva">Manutenção preventiva</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="veiculo" className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim">
                    Veículo (marca, modelo, ano)
                  </label>
                  <input
                    id="veiculo"
                    name="veiculo"
                    type="text"
                    className="w-full border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
                    placeholder="Ex: VW Gol 1.0 2018"
                  />
                </div>

                <div>
                  <label htmlFor="mensagem" className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim">
                    Descreva o problema ou objetivo
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    rows={4}
                    required
                    className="w-full resize-none border border-border bg-bg-deep px-4 py-3 text-text-primary outline-none transition-colors focus:border-accent"
                    placeholder="Barulho no motor, perda de potência, interesse em Stage 1..."
                  />
                </div>

                <button
                  type="submit"
                  className="touch-target w-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-wider text-bg-deep transition-colors hover:bg-accent-bright"
                >
                  Enviar solicitação
                </button>

                <p className="text-center text-xs text-text-dim">
                  Resposta em até 1 dia útil. Dados usados apenas para contato.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
