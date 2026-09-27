import "server-only"

import type { Metadata } from "next"
import { SITE_CONFIG } from "@/config/site"

const DEFAULT_SITE_URL = "http://localhost:3000"
const DEFAULT_SOCIAL_IMAGE = "/hero-natural-cosmetics.jpg"

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return null

  const url =
    value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`

  try {
    return new URL(url).origin
  } catch {
    return null
  }
}

export const SITE_URL =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
  normalizeSiteUrl(process.env.VERCEL_URL) ??
  DEFAULT_SITE_URL

export const METADATA_BASE = new URL(SITE_URL)

type PageMetadataOptions = {
  title: string
  description: string
  path: string
  image?: string | null
  imageAlt?: string
  absoluteTitle?: boolean
  noIndex?: boolean
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const socialImage = image ?? DEFAULT_SOCIAL_IMAGE
  const canonicalUrl = new URL(path, METADATA_BASE).toString()

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.openGraphLocale,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      title,
      description,
      images: [
        {
          url: socialImage,
          width: 1024,
          height: 1024,
          alt: imageAlt ?? `${SITE_CONFIG.name} - Mỹ phẩm Hàn Quốc chính hãng`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : undefined,
  }
}

export function absoluteUrl(path: string) {
  return new URL(path, METADATA_BASE).toString()
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}
