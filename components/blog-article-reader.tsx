import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ReadingProgress, TableOfContents } from "@/components/blog-reading-tools"
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
  return (
    <>
      <ReadingProgress />
      <article className="pb-24 pt-28">
        <div className="mx-auto grid w-[min(100%-2rem,1160px)] gap-12 lg:grid-cols-[minmax(0,780px)_260px] lg:items-start lg:gap-24">
          <main className="min-w-0">
            <div className="flex flex-col items-start">
              <Link prefetch={false} href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-primary">
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
                <Image src={post.image} alt={post.title} fill priority fetchPriority="high" className="object-cover" sizes="(max-width: 900px) 100vw, 780px" />
              </div>
            ) : null}

            <div data-blog-article className="prose-miads mt-11 min-w-0">{children}</div>
          </main>

          {toc.length > 0 && (
            <aside className="sticky top-24 hidden self-start lg:block">
              {post.tags?.length ? (
                <div className="mb-7 flex flex-wrap gap-2">
                  {post.tags.map((tag) => <span key={tag} className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{tag}</span>)}
                </div>
              ) : null}
              <p className="mb-4 text-xs font-bold uppercase tracking-[.18em] text-muted-foreground">En esta página</p>
              <TableOfContents toc={toc} />
            </aside>
          )}
        </div>
      </article>
    </>
  )
}
