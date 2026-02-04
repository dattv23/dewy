import type { Metadata } from "next"
import { getCategoryBySlug } from "@/lib/products"
import { CategoryPageClient } from "./page-client"

type PageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ q?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  const tenDanhMuc = category?.ten ?? "Danh mục"

  return {
    title: `${tenDanhMuc} mỹ phẩm Hàn | Lọc nhanh theo nhu cầu da`,
    description: `Khám phá ${tenDanhMuc.toLowerCase()} với bộ lọc theo loại da, công dụng, mức giá và tình trạng hàng.`,
  }
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params
  const { q } = await searchParams
  return <CategoryPageClient slug={slug} initialQuery={q ?? ""} />
}
