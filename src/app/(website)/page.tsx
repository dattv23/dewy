import type { Metadata } from "next"
import { HomeView } from "@/features/home/views/home-view"
import { listRootCategories } from "@/features/products/services/category.service"
import { listStorefrontProducts, toProductCard } from "@/features/products/services/product.service"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Dewy Beauty & Fashion | Editorial K-Beauty & Tìm theo yêu cầu",
  description:
    "Trải nghiệm mỹ phẩm & thời trang Hàn Quốc chính hãng. Mua sắm có sẵn hoặc gửi yêu cầu tìm sản phẩm theo mong muốn.",
  path: "/",
  absoluteTitle: true,
})

export default async function HomePage() {
  const categoryResult = await listRootCategories()
    .then((categories) => ({ categories, categoryError: false }))
    .catch(() => ({ categories: [], categoryError: true }))
  const productResult = await listStorefrontProducts()
    .then((items) => ({
      products: items.map((item) => toProductCard(item, categoryResult.categories)),
      productError: false,
    }))
    .catch(() => ({ products: [], productError: true }))

  return <HomeView {...categoryResult} {...productResult} />
}
