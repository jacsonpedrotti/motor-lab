"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/painel", label: "Ordens", exact: true, icon: "☰" },
  { href: "/painel/financeiro", label: "Financeiro", icon: "◈" },
  { href: "/painel/os/nova", label: "Nova OS", icon: "+", highlight: true },
];

export default function PainelNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/painel/login");
    router.refresh();
  }

  function isActive(link: (typeof links)[0]) {
    if (link.exact) return pathname === link.href;
    return pathname.startsWith(link.href);
  }

  return (
    <>
      <header
        className="sticky top-0 z-40 border-b border-border bg-bg-deep/95 backdrop-blur-sm print:hidden"
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div className="container-main flex items-center justify-between gap-4 py-3 md:py-4">
          <Link href="/painel" className="flex min-w-0 shrink items-baseline gap-2">
            <span className="heading-painel text-xl md:text-2xl">
              Motor<span className="text-accent">Lab</span>
            </span>
            <span
              className="hidden text-[10px] uppercase tracking-widest text-text-dim sm:inline"
              style={{ fontFamily: "var(--font-ibm-mono)" }}
            >
              Painel
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`touch-target flex items-center px-3 py-2 text-sm transition-colors ${
                  isActive(link)
                    ? "bg-bg-elevated text-accent"
                    : "text-text-muted hover:text-text-primary"
                }`}
              >
                {link.label === "Nova OS" ? "+ Nova OS" : link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden touch-target items-center text-xs text-text-dim hover:text-text-muted lg:flex"
            >
              Ver site ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="hidden touch-target items-center border border-border px-3 py-2 text-xs text-text-muted transition-colors hover:border-red-500/50 hover:text-red-400 md:flex"
            >
              Sair
            </button>
            <button
              type="button"
              className="touch-target flex flex-col items-center justify-center gap-1.5 md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <span className="block h-0.5 w-5 bg-text-primary" />
              <span className="block h-0.5 w-5 bg-text-primary" />
              <span className="block h-0.5 w-5 bg-text-primary" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          />
          <aside
            className="drawer-enter absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-border bg-bg-surface"
            style={{ paddingTop: "var(--safe-top)", paddingBottom: "var(--safe-bottom)" }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-sm font-semibold uppercase tracking-wider">Menu</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="touch-target flex items-center justify-center text-2xl text-text-dim"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`mb-2 flex touch-target items-center px-4 py-3 text-base transition-colors ${
                    isActive(link)
                      ? "bg-bg-elevated text-accent"
                      : "text-text-muted hover:bg-bg-deep hover:text-text-primary"
                  }`}
                >
                  <span className="mr-3 w-6 text-center text-accent">{link.icon}</span>
                  {link.label === "Nova OS" ? "Nova ordem de serviço" : link.label}
                </Link>
              ))}
              <Link
                href="/"
                target="_blank"
                className="flex touch-target items-center px-4 py-3 text-text-muted hover:text-text-primary"
              >
                <span className="mr-3 w-6 text-center">↗</span>
                Ver site público
              </Link>
            </nav>
            <div className="border-t border-border p-4">
              <button
                type="button"
                onClick={handleLogout}
                className="touch-target flex w-full items-center justify-center border border-red-500/30 py-3 text-sm text-red-400"
              >
                Sair do painel
              </button>
            </div>
          </aside>
        </div>
      )}

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-bg-deep/95 backdrop-blur-sm md:hidden print:hidden"
        style={{ paddingBottom: "var(--safe-bottom)" }}
        aria-label="Navegação principal"
      >
        <div className="grid grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex touch-target flex-col items-center justify-center gap-0.5 py-2 text-[10px] uppercase tracking-wider transition-colors ${
                isActive(link)
                  ? "text-accent"
                  : link.highlight
                    ? "text-accent-bright"
                    : "text-text-dim"
              }`}
            >
              <span className="text-lg leading-none">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
