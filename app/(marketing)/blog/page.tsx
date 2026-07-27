import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Clock3 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getAllBlogPosts } from "@/lib/blog-mdx"

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`))
}

export default function BlogPage() {
  const posts = getAllBlogPosts()
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const remaining = posts.filter((post) => post.slug !== featured?.slug)

  if (!featured) return null

  return (
    <section className="pb-24 pt-32">
      <div className="container">
        <div className="max-w-3xl">
          <Badge className="border-primary/20 bg-primary/10 text-primary">BLOG MIADS</Badge>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-.04em] md:text-6xl">Ideas para construir y hacer crecer productos digitales</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Guías claras sobre SEO, páginas web, publicidad, diseño y tecnología.</p>
        </div>

        <Link href={`/blog/${featured.slug}`} className="group mt-12 grid overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl dark:ring-white/10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="relative min-h-72 overflow-hidden bg-muted">
            {featured.image ? <Image src={featured.image} alt={featured.title} fill className="object-cover transition duration-500 group-hover:scale-[1.02]" sizes="(max-width: 1024px) 100vw, 58vw" /> : null}
          </div>
          <div className="flex flex-col justify-center p-8 md:p-12">
            <p className="text-sm font-bold text-primary">{featured.category}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{featured.title}</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{featured.description}</p>
            <div className="mt-7 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formatDate(featured.date)}</span><span className="flex items-center gap-1.5"><Clock3 className="size-4" />{featured.readingTime}</span>
            </div>
            <span className="mt-8 inline-flex items-center gap-2 font-semibold text-primary">Leer artículo <ArrowUpRight className="size-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></span>
          </div>
        </Link>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {remaining.map((post) => (
            <Card key={post.slug} className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-xl">
              <Link href={`/blog/${post.slug}`}>
                <div className="relative aspect-[16/8] overflow-hidden bg-muted">
                  {post.image ? <Image src={post.image} alt={post.title} fill className="object-cover transition duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" /> : null}
                </div>
                <div className="p-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">{post.category}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight">{post.title}</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">{post.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{formatDate(post.date)}</span><span>{post.readingTime}</span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
