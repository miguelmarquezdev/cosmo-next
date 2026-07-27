import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import readingTime from "reading-time"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  author: string
  category: string
  image?: string
  tags?: string[]
  featured?: boolean
  published?: boolean
}

export type TocItem = {
  id: string
  label: string
  level: 2 | 3
}

export type BlogPostMeta = BlogFrontmatter & {
  slug: string
  readingTime: string
}

export type BlogPost = BlogPostMeta & {
  content: string
  toc: TocItem[]
}

export function slugifyHeading(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/[`*_~]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function extractToc(content: string): TocItem[] {
  const items: TocItem[] = []
  const seen = new Map<string, number>()
  const regex = /^(##|###)\s+(.+)$/gm
  let match: RegExpExecArray | null

  while ((match = regex.exec(content))) {
    const label = match[2].replace(/\[(.*?)\]\([^)]*\)/g, "$1").replace(/[`*_~]/g, "").trim()
    const base = slugifyHeading(label)
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    const id = count ? `${base}-${count + 1}` : base
    items.push({ id, label, level: match[1].length as 2 | 3 })
  }

  return items
}

function getFiles() {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".mdx"))
}

export function getAllBlogPosts(): BlogPostMeta[] {
  return getFiles()
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8")
      const { data, content } = matter(raw)
      const frontmatter = data as BlogFrontmatter
      return {
        ...frontmatter,
        slug,
        tags: frontmatter.tags ?? [],
        featured: Boolean(frontmatter.featured),
        published: frontmatter.published !== false,
        readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} min de lectura`,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const filename = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filename)) return null

  const raw = fs.readFileSync(filename, "utf8")
  const { data, content } = matter(raw)
  const frontmatter = data as BlogFrontmatter
  if (frontmatter.published === false) return null

  return {
    ...frontmatter,
    slug,
    tags: frontmatter.tags ?? [],
    featured: Boolean(frontmatter.featured),
    published: true,
    content,
    toc: extractToc(content),
    readingTime: `${Math.max(1, Math.ceil(readingTime(content).minutes))} min de lectura`,
  }
}
