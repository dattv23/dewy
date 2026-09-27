import type { Metadata } from "next"
import { ProductDetailView } from "@/features/products/views/product-detail-view"
import { listRootCategories } from "@/features/products/services/category.service"
import {
  getStorefrontProductBySlug,
  listStorefrontProducts,
  StorefrontProductUpstreamError,
  toProductCard,
  toProductDetail,
} from "@/features/products/services/product.service"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getStorefrontProductBySlug(slug).catch(() => null)

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm bạn đang tìm hiện không tồn tại.",
    }
  }

  return {
    title: `${product.name} | Dewy`,
    description: product.shortDescription ?? `Xem thông tin và giá bán ${product.name}.`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  let rawProduct
  try {
    rawProduct = await getStorefrontProductBySlug(slug)
  } catch (error) {
    const status =
      error instanceof StorefrontProductUpstreamError && error.status === 404
        ? "not-found"
        : "unavailable"
    return <ProductDetailView product={null} relatedProducts={[]} category={null} status={status} />
  }

  const categories = await listRootCategories().catch(() => [])
  const category = categories.find((item) => item.id === rawProduct.primaryCategoryId) ?? null
  const relatedProducts = rawProduct.primaryCategoryId
    ? await listStorefrontProducts({ categoryId: rawProduct.primaryCategoryId })
        .then((items) =>
          items
            .filter((item) => item.publicId !== rawProduct.publicId)
            .slice(0, 4)
            .map((item) => toProductCard(item, categories)),
        )
        .catch(() => [])
    : []

  return (
    <ProductDetailView
      product={toProductDetail(rawProduct, category)}
      relatedProducts={relatedProducts}
      category={category}
      status="ready"
    />
  )
}
