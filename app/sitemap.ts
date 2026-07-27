import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog-mdx"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miads.dev"
  const posts = getAllBlogPosts()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T12:00:00`),
    changeFrequency: "monthly",
    priority: post.featured ? 0.8 : 0.7,
    images: post.image ? [new URL(post.image, baseUrl).toString()] : undefined,
  }))

  return [...staticPages, ...blogPages]
}
