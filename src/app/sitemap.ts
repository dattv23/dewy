import type { MetadataRoute } from "next"
import { listRootCategories } from "@/features/products/services/category.service"
import { listStorefrontProducts } from "@/features/products/services/product.service"
import { absoluteUrl } from "@/lib/seo"

const staticPages = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/yeu-cau-my-pham-han", priority: 0.8, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },
] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products] = await Promise.all([
    listRootCategories().catch(() => []),
    listStorefrontProducts().catch(() => []),
  ])

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...categories.map((category) => ({
      url: absoluteUrl(`/danh-muc/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/san-pham/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [product.imageUrl],
    })),
  ]
}
