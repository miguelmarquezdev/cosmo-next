"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import type { TocItem } from "@/lib/blog-mdx"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const article = document.querySelector<HTMLElement>("[data-blog-article]")
        if (!article) return
        const top = article.offsetTop
        const scrollable = Math.max(1, article.offsetHeight - window.innerHeight + 160)
        const value = ((window.scrollY - top + 120) / scrollable) * 100
        setProgress(Math.max(0, Math.min(100, value)))
      })
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [])

  return (
    <div className="fixed inset-x-0 top-20 z-40 h-[3px] bg-transparent" aria-hidden="true">
      <div
        className="h-full bg-primary shadow-[0_0_12px_rgba(0,146,229,.55)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export function TableOfContents({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "")

  useEffect(() => {
    const elements = toc
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              Math.abs(a.boundingClientRect.top - window.innerHeight / 2) -
              Math.abs(b.boundingClientRect.top - window.innerHeight / 2)
          )[0]
        if (visible) setActiveId(visible.target.id)
      },
      { rootMargin: "-47% 0px -47% 0px", threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))

    const sync = () => {
      const center = window.innerHeight / 2
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= center)
      setActiveId((passed.at(-1) ?? elements[0]).id)
    }
    sync()
    window.addEventListener("scroll", sync, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", sync)
    }
  }, [toc])

  const goToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY - 112,
      behavior: "smooth",
    })
  }

  return (
    <nav aria-label="Tabla de contenido" className="relative space-y-0.5 before:absolute before:bottom-2 before:left-0 before:top-2 before:w-px before:bg-border">
      {toc.map((item) => {
        const active = activeId === item.id
        return (
          <button
            key={`${item.level}-${item.id}`}
            type="button"
            onClick={() => goToSection(item.id)}
            className={cn(
              "relative block w-full py-1.5 pr-2 text-left text-[13px] leading-[1.35rem] transition-colors",
              item.level === 3 ? "pl-6" : "pl-4",
              active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-1 left-0 z-10 w-[2px] rounded-full transition-opacity duration-200",
                active ? "bg-primary opacity-100" : "opacity-0"
              )}
            />
            {item.label}
          </button>
        )
      })}
    </nav>
  )
}
