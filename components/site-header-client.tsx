"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { RegistrationDialog } from "@/components/registration-dialog"
import { UserMenu } from "@/components/user-menu"

export function SiteHeaderClient() {
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<null | { name: string; avatar?: string }>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    let active = true
    try {
      const supabase = createClient()
      supabase.auth.getUser().then(({ data }) => {
        if (!active || !data.user) return
        setUser({
          name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || data.user.email || "Usuario",
          avatar: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
        })
      }).catch(() => undefined)
    } catch {
      // El header público sigue siendo estático aunque Supabase no esté configurado.
    }
    return () => { active = false }
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-background/88 text-foreground shadow-[0_8px_30px_rgba(2,6,23,0.08)] backdrop-blur-xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.22)]"
          : "bg-transparent text-foreground dark:text-white"
      )}
    >
      <div className="flex h-20 w-full items-center px-5 sm:px-8 lg:px-12 2xl:px-16">
        <Link prefetch={false} href="/" className="mr-10 flex shrink-0 items-center" aria-label="Miads inicio">
          <Image src="/logo-miads.svg" width={105} height={30} alt="Miads" priority className="h-auto w-[105px] dark:hidden" />
          <Image src="/logo-miads-white.svg" width={105} height={30} alt="Miads" priority className="hidden h-auto w-[105px] dark:block" />
        </Link>

        <nav className="hidden flex-1 items-center gap-9 text-sm font-medium text-current/70 lg:flex">
          <Link prefetch={false} className="transition hover:text-primary" href="/#servicios">Servicios</Link>
          <Link prefetch={false} className="transition hover:text-primary" href="/#proceso">Proceso</Link>
          <Link prefetch={false} className="transition hover:text-primary" href="/#resultados">Resultados</Link>
          <Link prefetch={false} className="transition hover:text-primary" href="/blog">Blog</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {user ? (
            <UserMenu name={user.name} avatar={user.avatar} />
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden sm:inline-flex hover:bg-primary hover:text-white">
                <Link prefetch={false} href="/login">Iniciar sesión</Link>
              </Button>
              <RegistrationDialog className="hidden sm:inline-flex" />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
