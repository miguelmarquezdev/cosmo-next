import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function Page() {
  const supabase = await createClient()
  const [{ count: leads }, { count: projects }, { data: recent }] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("id,name,email,service,status,created_at").order("created_at", { ascending: false }).limit(6),
  ])

  return (
    <>
      <h1 className="text-3xl font-bold">Panel administrativo</h1>
      <p className="mt-1 text-muted-foreground">Prospectos, cotizaciones, clientes y operación.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["Prospectos", leads || 0],
          ["Proyectos", projects || 0],
          ["Cotizaciones", 0],
          ["Clientes activos", 0],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader>
              <p className="text-sm text-muted-foreground">{label}</p>
              <CardTitle className="text-3xl">{value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Prospectos recientes</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {recent?.length ? recent.map((lead: any) => (
              <div key={lead.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border p-4">
                <div>
                  <p className="font-semibold">{lead.name}</p>
                  <p className="text-sm text-muted-foreground">{lead.email} · {lead.service}</p>
                </div>
                <Badge>{lead.status}</Badge>
              </div>
            )) : <p className="text-sm text-muted-foreground">Los formularios nuevos aparecerán aquí.</p>}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
