"use client"

import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { trackEvent } from "@/lib/analytics"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleIcon } from "@/components/google-icon"

const errorMessages: Record<string, string> = {
  oauth: "No se pudo completar el acceso con Google. Inténtalo nuevamente.",
  session: "No se pudo crear una sesión válida. Inténtalo nuevamente.",
}

export function AuthCard({ mode }: { mode: "login" | "register" }) {
  const params = useSearchParams()
  const [busy, setBusy] = useState(false)
  const error = params.get("error")

  async function google() {
    try {
      trackEvent("begin_google_login")
      setBusy(true)
      const supabase = createClient()
      const next = params.get("next") || "/cliente"
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          queryParams: { prompt: "select_account", access_type: "offline" },
        },
      })
      if (oauthError) throw oauthError
    } catch (cause) {
      toast.error(cause instanceof Error ? cause.message : "No se pudo conectar con Google")
      setBusy(false)
    }
  }

  return (
    <Card className="w-full max-w-xl border-white/10 bg-black/35 text-white shadow-2xl backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-3xl sm:text-4xl">Bienvenido a Miads</CardTitle>
        <CardDescription className="text-base text-white/60">
          Inicia sesión con la cuenta de Google que registraste en Miads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && errorMessages[error] ? (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
            {errorMessages[error]}
          </div>
        ) : null}

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12 w-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white"
          onClick={google}
          disabled={busy}
        >
          {busy ? <Loader2 className="size-5 animate-spin" /> : <GoogleIcon className="size-5" />}
          Continuar con Google
        </Button>

        <div className="my-7 flex items-center gap-4 text-xs text-white/45">
          <span className="h-px flex-1 bg-white/10" />
          solo para cuentas registradas
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-sm leading-6 text-white/55">
          Al continuar aceptas nuestros términos y política de privacidad. Usamos tu cuenta únicamente para identificar tus solicitudes.
        </p>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/[.035] p-4 text-center">
          <p className="text-sm text-white/60">¿Todavía no estás registrado?</p>
          <Link
            href="/registro"
            className="mt-1 inline-flex text-sm font-semibold text-primary transition hover:text-[#35b5ff] hover:underline"
          >
            Regístrate y crea tu solicitud
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
