"use client";

import { useState } from "react";

const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Como funciona" },
  { href: "#sobre", label: "A oficina" },
  { href: "#marcas", label: "Marcas" },
  { href: "#localizacao", label: "Localização" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-bg-deep/90 backdrop-blur-sm"
      style={{ paddingTop: "var(--safe-top)" }}
    >
      <div className="container-main flex items-center justify-between py-3 md:py-4">
        <a href="#" className="flex min-w-0 items-baseline gap-2">
          <span className="heading-painel text-xl sm:text-2xl">
            Motor<span className="text-accent">Lab</span>
          </span>
          <span className="hidden text-xs text-text-dim sm:inline">Conserto & Remap</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted transition-colors hover:text-accent"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            className="touch-target flex items-center border border-accent px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-bg-deep"
          >
            Orçamento
          </a>
        </nav>

        <button
          type="button"
          className="touch-target flex flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-6 bg-text-primary transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-bg-surface md:hidden"
          style={{ paddingBottom: "var(--safe-bottom)" }}
        >
          <div className="container-main flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="touch-target flex items-center py-3 text-text-muted hover:text-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="touch-target mt-2 flex items-center justify-center border border-accent py-3 text-center text-accent"
            >
              Solicitar orçamento
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
