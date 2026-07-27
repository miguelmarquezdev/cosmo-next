import Link from "next/link"
import { CheckCircle2, Code2, Globe2, Megaphone, Palette, Play, Search, Shapes, Video, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RegistrationDialog } from "@/components/registration-dialog"
import { HeroAnalytics } from "@/components/hero-analytics"
import { AnimatedNumber } from "@/components/animated-number"

export const dynamic = "force-static"
const services = [
  ["SEO que posiciona", "Auditoría, contenido y autoridad para convertir búsquedas en clientes.", Search],
  ["Diseño web", "Sitios veloces, elegantes y preparados para vender.", Globe2],
  ["Meta y Google Ads", "Campañas medibles con optimización continua.", Megaphone],
  ["Branding y diseño", "Logos, manuales de marca y piezas coherentes.", Palette],
  ["Contenido y video", "Guiones, edición y contenido para redes.", Video],
  ["Automatización", "Procesos, CRM, integraciones y analítica.", Zap],
  ["Desarrollo a medida", "Apps y plataformas con tecnología moderna.", Code2],
  ["Capacitación", "Aprende web, marketing y herramientas digitales.", Shapes],
]

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <section className="hero-grid relative overflow-hidden pt-20">
        <div className="absolute inset-x-0 top-0 h-[590px] bg-[radial-gradient(circle_at_50%_0%,#0092e529,transparent_62%)]" />
        <div className="container relative py-20 text-center md:py-28">
          <Badge className="border-primary/30 bg-primary/10 text-primary">MARKETING + TECNOLOGÍA + CREATIVIDAD</Badge>
          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-black leading-[1.04] tracking-[-.022em] text-[#020617] dark:text-[#E2E8F0] md:text-[3.55rem] lg:text-[3.9rem]">
            Prepárate para un futuro dominado por lo digital
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
            Creamos sitios web, posicionamiento SEO, campañas y marcas que convierten atención en crecimiento real.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <RegistrationDialog label="Comienza una estrategia gratis" className="h-11 min-w-[248px] justify-center px-5 sm:min-w-[260px]" />
            <Button asChild size="lg" variant="outline" className="h-11 min-w-[190px] justify-center bg-background/70 px-5 backdrop-blur hover:bg-muted">
              <Link href="#servicios"><Play className="size-4" />Explorar servicios</Link>
            </Button>
          </div>

          <HeroAnalytics />
        </div>
      </section>

      <section id="servicios" className="py-24">
        <div className="container">
          <div className="text-center">
            <p className="text-sm font-bold text-primary">TODO EN UN SOLO EQUIPO</p>
            <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black md:text-5xl">Domina el crecimiento digital con Miads</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Estrategia, ejecución y seguimiento desde un panel centralizado.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(([t,d,I]: any) => (
              <Card key={t} className="p-6 transition hover:-translate-y-1 hover:border-primary/45 hover:shadow-lg">
                <div className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><I className="size-5" /></div>
                <h3 className="mt-5 font-bold">{t}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{d}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="proceso" className="bg-muted/35 py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <Badge className="border-primary/30 bg-primary/10 text-primary">UN PROCESO CLARO</Badge>
            <h2 className="mt-5 text-4xl font-black md:text-5xl">De una idea a resultados medibles</h2>
            <div className="mt-8 grid gap-5">
              {["Completa el diagnóstico inicial", "Recibe una propuesta y cotización", "Aprueba y accede a tu panel", "Sigue tareas, avances y entregables"].map((x,i) => (
                <div key={x} className="flex gap-4">
                  <div className="grid size-9 shrink-0 place-items-center rounded-full bg-primary font-bold text-white">{i+1}</div>
                  <div><p className="font-semibold">{x}</p><p className="mt-1 text-sm text-muted-foreground">Comunicación directa, información ordenada y total transparencia.</p></div>
                </div>
              ))}
            </div>
          </div>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground">Proyecto activo</p>
            <div className="mt-2 flex items-center justify-between"><h3 className="text-xl font-bold">Rediseño y estrategia SEO</h3><span className="text-sm text-primary">68%</span></div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full w-[68%] bg-gradient-to-r from-[#1E40AF] to-[#0092e5]" /></div>
            {["Arquitectura y contenidos", "Diseño UI/UX", "Desarrollo web", "Lanzamiento y medición"].map((x,i) => (
              <div key={x} className="mt-4 flex items-center justify-between rounded-xl border p-4">
                <span className="flex items-center gap-3"><CheckCircle2 className={i < 2 ? "size-5 text-emerald-500" : "size-5 text-muted-foreground/40"} />{x}</span>
                <span className="text-xs text-muted-foreground">{i < 2 ? "Completado" : "En proceso"}</span>
              </div>
            ))}
          </Card>
        </div>
      </section>

      <section id="resultados" className="py-24">
        <div className="container text-center">
          <h2 className="text-4xl font-black md:text-5xl">Una plataforma para trabajar mejor contigo</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {[["+120", "proyectos digitales"], ["4.9/5", "satisfacción"], ["+38%", "crecimiento promedio"], ["24/7", "acceso al panel"]].map((x) => (
              <Card key={x[0]} className="p-8"><p className="text-3xl font-black text-primary">{x[0] === "+120" ? <><AnimatedNumber value={120} prefix="+" /></> : x[0] === "4.9/5" ? <><AnimatedNumber value={4.9} decimals={1} suffix="/5" /></> : x[0] === "+38%" ? <><AnimatedNumber value={38} prefix="+" suffix="%" /></> : x[0]}</p><p className="mt-2 text-sm text-muted-foreground">{x[1]}</p></Card>
            ))}
          </div>
          <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-r from-[#1E40AF] to-[#0092e5] px-6 py-14 text-white shadow-xl">
            <h2 className="text-4xl font-black">Tu próxima etapa comienza aquí</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">Cuéntanos qué necesitas. Te enviaremos una propuesta y podrás seguir todo desde tu panel.</p>
            <RegistrationDialog className="mt-8 bg-white text-[#020617] hover:bg-[#E2E8F0]" />
          </div>
        </div>
      </section>
    </div>
  )
}
