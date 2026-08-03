import type { Metadata } from "next"
import { ProductDetailView } from "@/features/products/views/product-detail-view"
import { getProductBySlug } from "@/features/products/data/products"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm bạn đang tìm hiện không tồn tại.",
    }
  }

  return {
    title: `${product.name} | Giá, công dụng, cách dùng`,
    description: `Xem chi tiết ${product.name}: mô tả ngắn, công dụng chính, cách dùng, lưu ý và lựa chọn đặt mua hoặc tìm theo yêu cầu.`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  return <ProductDetailView slug={slug} />
}
