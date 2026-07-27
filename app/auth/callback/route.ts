import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/cliente"
  return value
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const next = safeNext(searchParams.get("next"))

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=oauth`)
  }

  // Registration must continue so the draft can be converted into a lead.
  if (next === "/auth/complete") {
    return NextResponse.redirect(`${origin}${next}`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.redirect(`${origin}/login?error=session`)
  }

  const [{ data: profile }, { data: lead }] = await Promise.all([
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle(),
    supabase.from("leads").select("id").eq("user_id", user.id).limit(1).maybeSingle(),
  ])

  const isTeamMember = profile?.role === "admin" || profile?.role === "staff"
  const isRegistered = Boolean(lead) || isTeamMember

  if (!isRegistered) {
    await supabase.auth.signOut()
    return NextResponse.redirect(`${origin}/registro?reason=not_registered`)
  }

  const destination = isTeamMember && next === "/cliente" ? "/admin" : next
  return NextResponse.redirect(`${origin}${destination}`)
}
