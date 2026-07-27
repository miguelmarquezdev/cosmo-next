import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import rehypePrettyCode from "rehype-pretty-code"
import { BlogArticleReader } from "@/components/blog-article-reader"
import { mdxComponents } from "@/components/mdx-components"
import { getAllBlogPosts, getBlogPost } from "@/lib/blog-mdx"

export const dynamic = "force-static"
export const dynamicParams = false
export const revalidate = false
export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} | Miads`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.image ? [post.image] : undefined,
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const { content, toc, ...metadata } = post

  return (
    <BlogArticleReader post={metadata} toc={toc}>
      <MDXRemote
        source={content}
        components={mdxComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, {
              theme: { dark: "github-dark-default", light: "github-light-default" },
              keepBackground: false,
              defaultLang: "plaintext",
            }]],
          },
        }}
      />
    </BlogArticleReader>
  )
}
