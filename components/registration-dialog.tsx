"use client"
import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { GoogleIcon } from "@/components/google-icon"
import { cn } from "@/lib/utils"

const services=["SEO","Diseño web","Meta Ads","Google Ads","Branding","Diseño gráfico","Videos y contenido","Capacitación web","Crecimiento en redes","Automatización"]
type Draft={name:string;company:string;phone:string;service:string;website:string;goals:string;contact_preference:string}
const initial:Draft={name:"",company:"",phone:"",service:"",website:"",goals:"",contact_preference:"WhatsApp"}

export function RegistrationDialog({label="Comienza gratis",className,variant="default",autoOpen=false}:{label?:string;className?:string;variant?:"default"|"outline"|"ghost";autoOpen?:boolean}){
 const[open,setOpen]=useState(autoOpen);const[step,setStep]=useState(1);const[data,setData]=useState<Draft>(initial);const[busy,setBusy]=useState(false)
 useEffect(()=>{if(autoOpen)setOpen(true)},[autoOpen])
 useEffect(()=>{
  const openRegistration=()=>setOpen(true)
  window.addEventListener("miads:open-registration",openRegistration)
  return()=>window.removeEventListener("miads:open-registration",openRegistration)
 },[])
 function update<K extends keyof Draft>(key:K,value:Draft[K]){setData(v=>({...v,[key]:value}))}
 function valid(){if(step===1&&!data.name.trim()){toast.error("Escribe tu nombre completo");return false}if(step===2&&!data.service){toast.error("Selecciona un servicio");return false}if(step===2&&!data.goals.trim()){toast.error("Cuéntanos qué deseas lograr");return false}return true}
 function next(){if(valid())setStep(s=>Math.min(3,s+1))}
 async function google(){if(!valid())return;setBusy(true);try{localStorage.setItem("miads_registration_draft",JSON.stringify(data));const s=createClient();const{error}=await s.auth.signInWithOAuth({provider:"google",options:{redirectTo:`${location.origin}/auth/callback?next=/auth/complete`,queryParams:{prompt:"select_account",access_type:"offline"}}});if(error)throw error}catch(e:any){toast.error(e.message||"No se pudo conectar con Google");setBusy(false)}}
 function reset(v:boolean){setOpen(v);if(!v)setTimeout(()=>setStep(1),250)}
 return <Dialog open={open} onOpenChange={reset}><DialogTrigger asChild><Button variant={variant} className={className}>{label}{variant!=="ghost"&&<ArrowRight className="size-4"/>}</Button></DialogTrigger><DialogContent className="sm:max-w-[620px]">
  <DialogHeader>
   <div className="mb-5 flex items-center justify-center gap-3">{[1,2,3].map((n,i)=><div key={n} className="flex items-center gap-3"><div className={cn("grid size-9 place-items-center rounded-full border text-sm font-bold transition",n<step&&"border-primary bg-primary text-white",n===step&&"border-primary bg-primary/10 text-primary",n>step&&"border-border bg-muted text-muted-foreground")}>{n<step?<Check className="size-4"/>:n}</div>{i<2&&<div className={cn("h-px w-10 sm:w-20",n<step?"bg-primary":"bg-border")}/>}</div>)}</div>
   <DialogTitle className="text-center text-2xl">{step===1?"Cuéntanos sobre ti":step===2?"¿Qué servicio necesitas?":"Crea tu acceso a Miads"}</DialogTitle>
   <DialogDescription className="text-center">Paso {step} de 3 · Solo usamos tus datos para preparar y dar seguimiento a tu solicitud.</DialogDescription>
  </DialogHeader>
  {step===1&&<div className="grid gap-4 pt-2"><Field label="Nombre completo"><Input value={data.name} onChange={e=>update("name",e.target.value)} placeholder="Tu nombre" autoFocus/></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Empresa"><Input value={data.company} onChange={e=>update("company",e.target.value)} placeholder="Opcional"/></Field><Field label="WhatsApp"><Input value={data.phone} onChange={e=>update("phone",e.target.value)} placeholder="+51..."/></Field></div></div>}
  {step===2&&<div className="grid gap-4 pt-2"><Field label="Servicio de interés"><select value={data.service} onChange={e=>update("service",e.target.value)} className="h-11 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"><option value="">Selecciona un servicio</option>{services.map(x=><option key={x}>{x}</option>)}</select></Field><Field label="¿Ya cuentas con un sitio web?"><Input value={data.website} onChange={e=>update("website",e.target.value)} placeholder="https://... o todavía no"/></Field><Field label="¿Qué deseas lograr?"><Textarea value={data.goals} onChange={e=>update("goals",e.target.value)} placeholder="Objetivos, situación actual, plazos y cualquier detalle importante." className="min-h-28"/></Field><Field label="¿Cómo prefieres que te contactemos?"><div className="grid grid-cols-3 gap-2">{["WhatsApp","Correo","Llamada"].map(x=><button type="button" key={x} onClick={()=>update("contact_preference",x)} className={cn("rounded-lg border p-3 text-sm transition",data.contact_preference===x?"border-primary bg-primary/10 text-primary":"hover:bg-muted")}>{x}</button>)}</div></Field></div>}
  {step===3&&<div className="py-4 text-center"><div className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl bg-primary/10"><GoogleIcon className="size-7"/></div><h3 className="text-xl font-bold">Finaliza con tu cuenta de Google</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Usaremos Google únicamente para identificarte, mantener tu sesión iniciada y mostrar tu panel de cliente.</p><Button type="button" variant="outline" size="lg" className="mt-6 w-full border-border bg-background font-semibold hover:bg-muted" onClick={google} disabled={busy}>{busy?<Loader2 className="size-5 animate-spin"/>:<GoogleIcon className="size-5"/>}Continuar con Google</Button><p className="mt-4 text-xs text-muted-foreground">Google te permitirá elegir la cuenta que deseas utilizar.</p></div>}
  <div className="mt-2 flex items-center justify-between">{step>1?<Button variant="ghost" onClick={()=>setStep(s=>s-1)}><ArrowLeft className="size-4"/>Atrás</Button>:<span/>}{step<3&&<Button onClick={next}>Continuar<ArrowRight className="size-4"/></Button>}</div>
 </DialogContent></Dialog>
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div className="grid gap-2"><Label>{label}</Label>{children}</div>}
