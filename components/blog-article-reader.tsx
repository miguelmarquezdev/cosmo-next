"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { BlogPostMeta, TocItem } from "@/lib/blog-mdx"

export function BlogArticleReader({
  post,
  toc,
  children,
}: {
  post: BlogPostMeta
  toc: TocItem[]
  children: ReactNode
}) {
  const articleRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "")

  useEffect(() => {
    const updateProgress = () => {
      const article = articleRef.current
      if (!article) return
      const rect = article.getBoundingClientRect()
      const top = window.scrollY + rect.top
      const scrollable = Math.max(1, article.offsetHeight - window.innerHeight + 160)
      setProgress(Math.max(0, Math.min(100, ((window.scrollY - top + 120) / scrollable) * 100)))
    }

    updateProgress()
    window.addEventListener("scroll", updateProgress, { passive: true })
    window.addEventListener("resize", updateProgress)
    return () => {
      window.removeEventListener("scroll", updateProgress)
      window.removeEventListener("resize", updateProgress)
    }
  }, [])

  useEffect(() => {
    const elements = toc
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element))
    if (!elements.length) return

    // La sección cambia al atravesar una franja estrecha en el centro de la pantalla.
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries
          .filter((item) => item.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight / 2) - Math.abs(b.boundingClientRect.top - innerHeight / 2))[0]
        if (entry) setActiveId(entry.target.id)
      },
      { rootMargin: "-47% 0px -47% 0px", threshold: 0 }
    )

    elements.forEach((element) => observer.observe(element))

    const syncPassedHeading = () => {
      const center = window.innerHeight / 2
      const passed = elements.filter((element) => element.getBoundingClientRect().top <= center)
      setActiveId((passed.at(-1) ?? elements[0]).id)
    }
    syncPassedHeading()
    window.addEventListener("scroll", syncPassedHeading, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", syncPassedHeading)
    }
  }, [toc])

  const goToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 112, behavior: "smooth" })
  }

  return (
    <>
      <div className="fixed inset-x-0 top-20 z-40 h-[3px] bg-transparent" aria-hidden="true">
        <div className="h-full bg-primary shadow-[0_0_12px_rgba(0,146,229,.55)] transition-[width] duration-100" style={{ width: `${progress}%` }} />
      </div>

      <article className="pb-24 pt-28">
        <div className="mx-auto grid w-[min(100%-2rem,1160px)] gap-12 lg:grid-cols-[minmax(0,780px)_260px] lg:items-start lg:gap-24">
          <main className="min-w-0">
            <div className="flex flex-col items-start">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary">
                <ArrowLeft className="size-4" /> Volver al blog
              </Link>
              <Badge className="mt-5 w-fit border-primary/20 bg-primary/10 text-primary">{post.category}</Badge>
            </div>
            <h1 className="mt-5 max-w-[750px] text-3xl font-medium leading-[1.14] tracking-[-.025em] md:text-[2.75rem]">{post.title}</h1>
            <p className="mt-5 max-w-[720px] text-lg leading-8 text-muted-foreground">{post.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span>{post.author}</span>
              <span>{new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.date}T12:00:00`))}</span>
              <span className="flex items-center gap-1.5"><Clock3 className="size-4" />{post.readingTime}</span>
            </div>

            {post.image ? (
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
                <Image src={post.image} alt={post.title} fill priority className="object-cover" sizes="(max-width: 900px) 100vw, 780px" />
              </div>
            ) : null}

            <div ref={articleRef} className="prose-miads mt-11 min-w-0">{children}</div>
          </main>

          {toc.length > 0 && (
            <aside className="sticky top-24 hidden self-start lg:block">
              {post.tags?.length ? (
                <div className="mb-7 flex flex-wrap gap-2">
                  {post.tags.map((tag) => <span key={tag} className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tag}</span>)}
                </div>
              ) : null}
              <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-muted-foreground">En esta página</p>
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
                      <span aria-hidden className={cn("absolute inset-y-1 left-0 z-10 w-[2px] rounded-full transition-all duration-200", active ? "bg-primary opacity-100" : "opacity-0")} />
                      {item.label}
                    </button>
                  )
                })}
              </nav>
            </aside>
          )}
        </div>
      </article>
    </>
  )
}
