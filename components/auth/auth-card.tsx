"use client"
import { trackEvent } from "@/lib/analytics"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GoogleIcon } from "@/components/google-icon"

export function AuthCard({mode}:{mode:"login"|"register"}){
 const params=useSearchParams();const[busy,setBusy]=useState(false)
 async function google(){try{trackEvent("begin_google_login");setBusy(true);const s=createClient();const next=params.get("next")||"/cliente";const{error}=await s.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}/auth/callback?next=${next}`,queryParams:{prompt:"select_account",access_type:"offline"}}});if(error)throw error}catch(e:any){toast.error(e.message||"No se pudo conectar con Google");setBusy(false)}}
 return <Card className="w-full max-w-xl border-white/10 bg-black/35 text-white shadow-2xl backdrop-blur-xl"><CardHeader><CardTitle className="text-3xl sm:text-4xl">Bienvenido a Miads</CardTitle><CardDescription className="text-base text-white/60">Ingresa o crea tu cuenta de forma segura con Google.</CardDescription></CardHeader><CardContent><Button type="button" variant="outline" size="lg" className="h-12 w-full border-white/15 bg-transparent text-white hover:bg-white/5 hover:text-white" onClick={google} disabled={busy}>{busy?<Loader2 className="size-5 animate-spin"/>:<GoogleIcon className="size-5"/>}Continuar con Google</Button><div className="my-7 flex items-center gap-4 text-xs text-white/45"><span className="h-px flex-1 bg-white/10"/>sin contraseñas adicionales<span className="h-px flex-1 bg-white/10"/></div><p className="text-sm leading-6 text-white/55">Al continuar aceptas nuestros términos y política de privacidad. Usamos tu cuenta únicamente para identificar tus solicitudes.</p></CardContent></Card>
}
