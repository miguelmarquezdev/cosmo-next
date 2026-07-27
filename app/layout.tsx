import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://miads.dev"
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miads — Marketing, web y crecimiento",
    template: "%s | Miads",
  },
  description:
    "SEO, diseño web, publicidad y branding para empresas que quieren crecer.",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName: "Miads",
    title: "Miads — Marketing, web y crecimiento",
    description:
      "SEO, diseño web, publicidad y branding para empresas que quieren crecer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miads — Marketing, web y crecimiento",
    description:
      "SEO, diseño web, publicidad y branding para empresas que quieren crecer.",
  },
  verification: googleVerification
    ? { google: googleVerification }
    : undefined,
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  )
}
