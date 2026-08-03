import type { Metadata } from "next"
import { HomeView } from "@/features/home/views/home-view"

export const metadata: Metadata = {
  title: "Dewy Beauty & Fashion | Editorial K-Beauty & Tìm theo yêu cầu",
  description:
    "Trải nghiệm mỹ phẩm & thời trang Hàn Quốc chính hãng. Mua sắm có sẵn hoặc gửi yêu cầu tìm sản phẩm theo mong muốn.",
}

export default function HomePage() {
  return <HomeView />
}
