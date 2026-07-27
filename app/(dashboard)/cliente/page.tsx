import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: projects } = user
    ? await supabase.from("projects").select("*").eq("client_id", user.id).limit(5)
    : { data: [] }

  const list = projects?.length ? projects : [{ name: "Tu proyecto aparecerá aquí", status: "planning", progress: 0 }]

  return (
    <>
      <h1 className="text-3xl font-bold">Hola, {user?.user_metadata?.full_name || "bienvenido"}</h1>
      <p className="mt-1 text-muted-foreground">Consulta el estado de tus servicios y próximos pasos.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Proyectos activos", String(projects?.length || 0)],
          ["Tareas pendientes", "0"],
          ["Archivos nuevos", "0"],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardHeader><p className="text-sm text-muted-foreground">{label}</p><CardTitle className="text-3xl">{value}</CardTitle></CardHeader>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Servicios y proyectos</CardTitle></CardHeader>
        <CardContent className="grid gap-4">
          {list.map((project: any) => (
            <div key={project.name} className="rounded-xl border p-5">
              <div className="flex items-center justify-between">
                <div><p className="font-semibold">{project.name}</p><p className="text-sm text-muted-foreground">Estado actual</p></div>
                <Badge>{project.status}</Badge>
              </div>
              <div className="mt-4"><Progress value={project.progress} /></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
