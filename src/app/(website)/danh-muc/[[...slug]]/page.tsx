import type { Metadata } from "next"

import { CategoryView } from "@/features/products/views/category-view"
import {
  getStorefrontCategoryBySlug,
  StorefrontCategoryUpstreamError,
} from "@/features/products/services/category.service"
import { DEFAULT_CATEGORY_SLUG } from "@/constants/routes"
import type { Category } from "@/types/category"

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

  return {
    title: `${categoryName} mỹ phẩm Hàn | Lọc nhanh theo nhu cầu da`,
    description: `Khám phá ${categoryName.toLowerCase()} với bộ lọc theo loại da, công dụng, mức giá và tình trạng hàng.`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const slug = await getSlug(params)
  const { q } = await searchParams
  const result = await loadCategory(slug)

  return <CategoryView slug={slug} initialQuery={q ?? ""} {...result} />
}
