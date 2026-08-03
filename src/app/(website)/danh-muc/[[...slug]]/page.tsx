import type { Metadata } from "next"

import { CategoryView } from "@/features/products/views/category-view"
import { getCategoryBySlug } from "@/features/products/data/products"
import { DEFAULT_CATEGORY_SLUG } from "@/constants/routes"

type PageProps = {
  params: Promise<{ slug?: string[] }>
  searchParams: Promise<{ q?: string }>
}

async function getSlug(params: PageProps["params"]) {
  const { slug } = await params
  return slug?.[0] ?? DEFAULT_CATEGORY_SLUG
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = await getSlug(params)
  const category = getCategoryBySlug(slug)
  const categoryName = category?.name ?? "Danh mục"

  return {
    title: `${categoryName} mỹ phẩm Hàn | Lọc nhanh theo nhu cầu da`,
    description: `Khám phá ${categoryName.toLowerCase()} với bộ lọc theo loại da, công dụng, mức giá và tình trạng hàng.`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const slug = await getSlug(params)
  const { q } = await searchParams

  return <CategoryView slug={slug} initialQuery={q ?? ""} />
}
