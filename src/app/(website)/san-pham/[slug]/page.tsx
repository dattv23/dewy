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
import { absoluteUrl, createPageMetadata, serializeJsonLd } from "@/lib/seo"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getStorefrontProductBySlug(slug).catch(() => null)

  if (!product) {
    return createPageMetadata({
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm bạn đang tìm hiện không tồn tại.",
      path: `/san-pham/${slug}`,
      noIndex: true,
    })
  }

  return createPageMetadata({
    title: product.name,
    description: product.shortDescription ?? `Xem thông tin và giá bán ${product.name}.`,
    path: `/san-pham/${product.slug}`,
    image: product.imageUrl,
    imageAlt: product.name,
  })
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

  const product = toProductDetail(rawProduct, category)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [absoluteUrl(product.image)],
    description:
      product.shortDescription ?? product.description ?? `Thông tin sản phẩm ${product.name}.`,
    sku: product.sku,
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    ...(product.categoryName ? { category: product.categoryName } : {}),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/san-pham/${product.slug}`),
      priceCurrency: "VND",
      price: product.price,
      availability:
        product.status === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }}
      />
      <ProductDetailView
        product={product}
        relatedProducts={relatedProducts}
        category={category}
        status="ready"
      />
    </>
  )
}
