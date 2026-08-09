import type { Metadata } from "next"
import { HomeView } from "@/features/home/views/home-view"
import { listRootCategories } from "@/features/products/services/category.service"

export const metadata: Metadata = {
  title: "Dewy Beauty & Fashion | Editorial K-Beauty & Tìm theo yêu cầu",
  description:
    "Trải nghiệm mỹ phẩm & thời trang Hàn Quốc chính hãng. Mua sắm có sẵn hoặc gửi yêu cầu tìm sản phẩm theo mong muốn.",
}

export default async function HomePage() {
  const result = await listRootCategories()
    .then((categories) => ({ categories, categoryError: false }))
    .catch(() => ({ categories: [], categoryError: true }))

  return <HomeView {...result} />
}
