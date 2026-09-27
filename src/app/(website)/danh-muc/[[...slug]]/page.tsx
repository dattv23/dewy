import type { Metadata } from "next"

import { CategoryView } from "@/features/products/views/category-view"
import {
  getStorefrontCategoryBySlug,
  StorefrontCategoryUpstreamError,
} from "@/features/products/services/category.service"
import { listStorefrontProducts, toProductCard } from "@/features/products/services/product.service"
import { DEFAULT_CATEGORY_SLUG } from "@/constants/routes"
import type { Category } from "@/types/category"
import { createPageMetadata } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ q?: string }>
}

async function getSlug(params: PageProps["params"]) {
  const { slug } = await params
  return slug?.[0] ?? DEFAULT_CATEGORY_SLUG
}

async function loadCategory(slug: string): Promise<{
  category: Category | null
  categoryStatus: "ready" | "not-found" | "unavailable"
}> {
  try {
    return { category: await getStorefrontCategoryBySlug(slug), categoryStatus: "ready" }
  } catch (error) {
    if (error instanceof StorefrontCategoryUpstreamError && error.status === 404) {
      return { category: null, categoryStatus: "not-found" }
    }
    return { category: null, categoryStatus: "unavailable" }
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await getSlug(params)
  const { category } = await loadCategory(slug)
  const categoryName = category?.name ?? "Danh mục"
  const description =
    category?.description ??
    `Khám phá ${categoryName.toLowerCase()} với bộ lọc theo loại da, công dụng, mức giá và tình trạng hàng.`

  return createPageMetadata({
    title: `${categoryName} mỹ phẩm Hàn | Lọc nhanh theo nhu cầu da`,
    description,
    path: `/danh-muc/${slug}`,
    image: category?.imageUrl,
    imageAlt: category ? `${category.name} chính hãng tại Dewy` : undefined,
    noIndex: !category,
  })
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const slug = await getSlug(params)
  const { q } = await searchParams
  const result = await loadCategory(slug)
  const productResult = result.category
    ? await listStorefrontProducts({ categoryId: result.category.id })
        .then((items) => ({
          products: items.map((item) => toProductCard(item, [result.category!])),
          productsError: false,
        }))
        .catch(() => ({ products: [], productsError: true }))
    : { products: [], productsError: false }

  return <CategoryView initialQuery={q ?? ""} {...result} {...productResult} />
}
