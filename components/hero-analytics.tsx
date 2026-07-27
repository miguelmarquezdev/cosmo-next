"use client"

import type { LucideIcon } from "lucide-react"
import { ArrowUpRight, BarChart3, Globe2, MousePointerClick, Search, Users } from "lucide-react"
import { AnimatedNumber } from "@/components/animated-number"

const bars = [38, 52, 46, 64, 58, 78, 70, 88, 74, 94, 84, 100]

const metrics: Array<{ label: string; value: number; suffix?: string; decimals?: number; icon: LucideIcon; delta: string }> = [
  { label: "Leads", value: 324, icon: Users, delta: "+18.2%" },
  { label: "Conversiones", value: 86, icon: MousePointerClick, delta: "+12.7%" },
  { label: "Tráfico orgánico", value: 18.4, suffix: "K", decimals: 1, icon: Search, delta: "+31.9%" },
]

function ActivityGlobe() {
  return (
    <div className="hero-globe-card mt-4 overflow-hidden rounded-xl border border-border/60">
      <div className="relative min-h-44 px-4 py-4 sm:px-5">
        <div className="relative z-10 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <Globe2 className="size-4" />
              <span className="text-[11px] font-semibold uppercase tracking-[.16em]">Alcance digital</span>
            </div>
            <p className="mt-2 max-w-56 text-sm leading-6 text-muted-foreground">
              Sesiones y conversiones activas desde múltiples mercados.
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-semibold tracking-tight"><AnimatedNumber value={12.8} decimals={1} suffix="K" /></p>
            <p className="text-xs text-muted-foreground">usuarios activos</p>
          </div>
        </div>

        <div className="hero-globe" aria-hidden="true">
          <div className="hero-globe-grid" />
          <span className="hero-globe-node node-one" />
          <span className="hero-globe-node node-two" />
          <span className="hero-globe-node node-three" />
          <span className="hero-globe-node node-four" />
          <span className="hero-globe-arc arc-one" />
          <span className="hero-globe-arc arc-two" />
          <span className="hero-globe-arc arc-three" />
        </div>
      </div>
    </div>
  )
}

export function HeroAnalytics() {
  return (
    <div className="hero-analytics-shell mx-auto mt-14 max-w-5xl text-left">
      <div className="hero-analytics-panel hero-analytics-panel-blended">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <BarChart3 className="size-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[.16em] text-muted-foreground">Miads Analytics</p>
              <p className="font-semibold">Crecimiento del negocio</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
            Datos en vivo
          </div>
        </div>

        <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.35fr_.65fr]">
          <div className="rounded-2xl border border-slate-200/80 bg-white/78 p-4 text-slate-950 shadow-sm backdrop-blur-sm sm:p-5 dark:border-white/10 dark:bg-[#07172f]/90 dark:text-slate-100">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Ingresos atribuidos</p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-3xl font-semibold tracking-tight sm:text-4xl">S/ <AnimatedNumber value={48320} /></p>
                  <span className="mb-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-300">
                    <ArrowUpRight className="size-3.5" /> 28.4%
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white/80 px-2.5 py-1 text-xs text-slate-500 dark:border-white/10 dark:bg-[#07172f]/80 dark:text-slate-400">Últimos 30 días</div>
            </div>

            <div className="relative mt-5 h-52 overflow-hidden rounded-xl border border-border/60 bg-[linear-gradient(to_right,hsl(var(--border)/.36)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.36)_1px,transparent_1px)] bg-[size:40px_40px] p-3">
              <div className="absolute inset-x-3 bottom-3 top-3 flex items-end gap-2 opacity-35">
                {bars.map((height, index) => (
                  <div key={index} className="hero-analytics-bar flex-1 rounded-t-md bg-primary/40" style={{ height: `${height}%`, animationDelay: `${index * 70}ms` }} />
                ))}
              </div>
              <svg className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] overflow-visible" viewBox="0 0 640 220" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="miads-line" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="100%" stopColor="#0092e5" />
                  </linearGradient>
                  <linearGradient id="miads-area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0092e5" stopOpacity="0.30" />
                    <stop offset="100%" stopColor="#0092e5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0 186 C58 170,85 172,124 144 C165 115,202 132,244 103 C286 75,323 91,363 64 C405 36,447 63,486 35 C530 5,576 28,640 8 L640 220 L0 220 Z" fill="url(#miads-area)" />
                <path className="hero-analytics-line" d="M0 186 C58 170,85 172,124 144 C165 115,202 132,244 103 C286 75,323 91,363 64 C405 36,447 63,486 35 C530 5,576 28,640 8" fill="none" stroke="url(#miads-line)" strokeWidth="5" strokeLinecap="round" />
              </svg>
              <div className="hero-analytics-tooltip absolute right-[11%] top-[11%] rounded-xl border border-primary/20 bg-white/95 px-3 py-2 text-slate-950 shadow-xl backdrop-blur dark:bg-[#06142a]/95 dark:text-slate-100">
                <p className="text-[10px] uppercase tracking-[.14em] text-muted-foreground">Conversión</p>
                <p className="mt-0.5 text-sm font-semibold">9.8%</p>
              </div>
            </div>

            <ActivityGlobe />
          </div>

          <div className="grid content-start gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {metrics.map(({ label, value, suffix, decimals, icon: Icon, delta }) => (
              <div key={label} className="hero-analytics-stat rounded-2xl border border-slate-200/80 bg-white/78 p-4 text-slate-950 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-[#07172f]/88 dark:text-slate-100">
                <div className="flex items-center justify-between">
                  <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-300">{delta}</span>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight"><AnimatedNumber value={value} suffix={suffix} decimals={decimals} /></p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="hero-analytics-progress h-full rounded-full bg-gradient-to-r from-[#1E40AF] to-[#0092e5]" />
                </div>
              </div>
            ))}

            <div className="rounded-2xl border border-primary/20 bg-primary/[.055] p-4 text-slate-950 dark:bg-[#08213f]/85 dark:text-slate-100">
              <p className="text-xs font-semibold uppercase tracking-[.14em] text-primary">Rendimiento</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div><p className="text-xs text-muted-foreground">ROAS</p><p className="mt-1 text-xl font-semibold"><AnimatedNumber value={5.2} decimals={1} suffix="x" /></p></div>
                <div><p className="text-xs text-muted-foreground">SEO</p><p className="mt-1 text-xl font-semibold text-primary">Top 3</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
