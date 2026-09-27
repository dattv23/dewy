import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import type { ReactNode } from "react"
import { SITE_CONFIG } from "@/config/site"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/components/providers/query-provider"
import { absoluteUrl, METADATA_BASE, serializeJsonLd } from "@/lib/seo"

import "./globals.css"

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
})

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  applicationName: SITE_CONFIG.name,
  keywords: [...SITE_CONFIG.keywords],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  category: "beauty",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.openGraphLocale,
    url: "/",
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: "/hero-natural-cosmetics.jpg",
        width: 1024,
        height: 1024,
        alt: "Mỹ phẩm Hàn Quốc chính hãng được Dewy tuyển chọn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: ["/hero-natural-cosmetics.jpg"],
  },
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
  icons: {
    icon: [
      { url: SITE_CONFIG.icons.light, media: "(prefers-color-scheme: light)" },
      { url: SITE_CONFIG.icons.dark, media: "(prefers-color-scheme: dark)" },
      { url: SITE_CONFIG.icons.default, type: "image/png" },
    ],
    apple: SITE_CONFIG.icons.apple,
  },
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: SITE_CONFIG.name,
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(SITE_CONFIG.icons.default),
        width: 512,
        height: 512,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: SITE_CONFIG.name,
      url: absoluteUrl("/"),
      inLanguage: "vi-VN",
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${absoluteUrl("/danh-muc/cham-soc-da")}?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={SITE_CONFIG.locale}>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
        <QueryProvider>
          {children}
          <Toaster richColors position="top-right" />
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  )
}
