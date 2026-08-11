"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Credenciais inválidas");
        return;
      }

      router.push("/painel");
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center bg-blueprint px-4"
      style={{
        paddingTop: "var(--safe-top)",
        paddingBottom: "var(--safe-bottom)",
      }}
    >
      <div className="noise absolute inset-0" />

      <div className="relative w-full max-w-sm border border-border bg-bg-surface p-6 sm:p-8">
        <div className="mb-8 text-center">
          <p className="heading-painel text-2xl">
            Motor<span className="text-accent">Lab</span>
          </p>
          <p
            className="mt-1 text-xs uppercase tracking-widest text-text-dim"
            style={{ fontFamily: "var(--font-ibm-mono)" }}
          >
            Acesso restrito
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs uppercase tracking-wider text-text-dim"
            >
              Senha
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoFocus
                autoComplete="current-password"
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-bg-deep py-3.5 pl-4 pr-12 text-text-primary outline-none transition-colors focus:border-accent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="touch-target absolute right-0 top-0 flex h-full w-12 items-center justify-center text-text-dim transition-colors hover:text-accent"
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M3 3l18 18" />
                    <path d="M10.58 10.58a2 2 0 002.84 2.84" />
                    <path d="M9.88 5.09A10.94 10.94 0 0112 5c5 0 9.27 3.11 11 7.5a11.62 11.62 0 01-1.67 2.68M6.06 6.06A11.8 11.8 0 003 12.5C4.73 16.89 9 20 14 20a10.7 10.7 0 004.12-.79" />
                    <path d="M14.12 14.12a3 3 0 01-4.24-4.24" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="touch-target w-full bg-accent py-3.5 text-sm font-semibold uppercase tracking-wider text-bg-deep transition-colors hover:bg-accent-bright disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
