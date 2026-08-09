import type { Metadata } from "next"
import { Be_Vietnam_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import type { ReactNode } from "react"
import { SITE_CONFIG } from "@/config/site"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
})

export const metadata: Metadata = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  icons: {
    icon: [
      { url: SITE_CONFIG.icons.light, media: "(prefers-color-scheme: light)" },
      { url: SITE_CONFIG.icons.dark, media: "(prefers-color-scheme: dark)" },
      { url: SITE_CONFIG.icons.default, type: "image/png" },
    ],
    apple: SITE_CONFIG.icons.apple,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={SITE_CONFIG.locale}>
      <body className={`${beVietnamPro.variable} font-sans antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  )
}
