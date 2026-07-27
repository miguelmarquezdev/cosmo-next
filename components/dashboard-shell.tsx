"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

const clientItems = [
  ["Resumen", "/cliente", LayoutDashboard],
  ["Proyectos", "/cliente/proyectos", BriefcaseBusiness],
  ["Archivos", "/cliente/archivos", FileText],
  ["Mensajes", "/cliente/mensajes", MessageSquare],
]

type AccountData = {
  name: string
  email: string
  avatarUrl: string | null
}

export function DashboardShell({ children, admin = false }: { children: React.ReactNode; admin?: boolean }) {
  const path = usePathname()
  const router = useRouter()
  const [account, setAccount] = useState<AccountData>({ name: "Miads", email: "", avatarUrl: null })

  const nav = admin
    ? [
        ["Resumen", "/admin", LayoutDashboard],
        ["Prospectos", "/admin/prospectos", Users],
        ["Cotizaciones", "/admin/cotizaciones", FileText],
        ["Clientes", "/admin/clientes", BriefcaseBusiness],
        ["Reportes", "/admin/reportes", BarChart3],
        ["Configuración", "/admin/configuracion", Settings],
      ]
    : clientItems

  useEffect(() => {
    const supabase = createClient()

    async function loadAccount() {
      const { data } = await supabase.auth.getUser()
      const user = data.user
      if (!user) return

      const metadata = user.user_metadata ?? {}
      setAccount({
        name: metadata.full_name || metadata.name || user.email?.split("@")[0] || "Miads",
        email: user.email || "",
        avatarUrl: metadata.avatar_url || metadata.picture || null,
      })
    }

    loadAccount()
  }, [])

  async function logout() {
    await createClient().auth.signOut()
    router.push("/login")
    router.refresh()
  }

  const initials = account.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("")

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-card p-5 lg:block">
        <Link href="/" className="inline-flex items-center">
          <Image src="/logo-miads.svg" alt="Miads" width={105} height={32} className="h-auto w-[105px] dark:hidden" priority />
          <Image src="/logo-miads-white.svg" alt="Miads" width={105} height={32} className="hidden h-auto w-[105px] dark:block" priority />
        </Link>
        <p className="mt-2 text-xs text-muted-foreground">{admin ? "Administración" : "Portal del cliente"}</p>

        <nav className="mt-8 grid gap-1">
          {nav.map(([name, href, Icon]: any) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                path === href ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        <Button variant="ghost" className="absolute bottom-5 left-5 right-5 justify-start" onClick={logout}>
          <LogOut className="size-4" />
          Cerrar sesión
        </Button>
      </aside>

      <main className="lg:pl-64">
        <header className="flex h-16 items-center justify-between border-b bg-background px-5 md:px-8">
          <div>
            <p className="text-sm text-muted-foreground">Miads Workspace</p>
            <p className="font-semibold">{admin ? "Panel administrativo" : "Panel del cliente"}</p>
          </div>

          <button
            type="button"
            className="group flex items-center gap-3 rounded-full p-1.5 pr-2 transition hover:bg-accent"
            aria-label={`Cuenta de ${account.name}`}
            title={account.email || account.name}
          >
            <span className="relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-primary/20 bg-primary/10 text-sm font-semibold text-primary shadow-sm">
              {account.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={account.avatarUrl} alt={account.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                initials || "M"
              )}
            </span>
          </button>
        </header>

        <div className="p-5 md:p-8">{children}</div>
      </main>
    </div>
  )
}
