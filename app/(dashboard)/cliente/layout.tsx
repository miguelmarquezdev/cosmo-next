import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard-shell"
import { createClient } from "@/lib/supabase/server"

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/login?next=/cliente")

  const [{ data: profile }, { data: lead }] = await Promise.all([
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
    supabase.from("leads").select("id").eq("user_id", user.id).limit(1).maybeSingle(),
  ])

  if (profile?.role === "admin" || profile?.role === "staff") redirect("/admin")
  if (!lead) redirect("/registro?reason=not_registered")

  return <DashboardShell>{children}</DashboardShell>
}
