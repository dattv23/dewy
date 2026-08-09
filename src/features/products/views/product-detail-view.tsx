"use client"

import Image from "next/image"
import Link from "next/link"
import { AddCartButton } from "@/features/cart/components/add-cart-button"
import { ProductCard } from "@/features/products/components/product-card"
import {
  allProducts,
  formatVnd,
  getProductBySlug,
  statusLabel,
} from "@/features/products/data/products"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProductCardDTO } from "@/types/product"
import { ProductInfo, ProductNotFound } from "@/features/products/components/product-detail-states"
import type { Category } from "@/types/category"

type ProductDetailViewProps = {
  slug: string
  category: Category | null
}

export function ProductDetailView({ slug, category }: ProductDetailViewProps) {
  const product = getProductBySlug(slug)

  if (!product) return <ProductNotFound />

  const relatedProducts = allProducts
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, 4)
  const cartProduct: ProductCardDTO = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    status: product.status,
    tags: product.tags,
    image: product.image,
    categorySlug: product.categorySlug,
  }

  return (
    <div>
      <section className="bg-secondary/30 border-b">
        <div className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-4 text-sm">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>{" "}
          /{" "}
          <Link href={`/danh-muc/${product.categorySlug}`} className="hover:text-primary">
            {category?.name ?? "Danh mục"}
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-2">
        <div className="bg-card relative aspect-square overflow-hidden rounded-2xl border">
          <Image
            src={product.image}
            alt={`${product.name} ${product.size}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              {statusLabel(product.status)}
            </Badge>
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-[28px] leading-tight font-bold">{product.name}</h1>
          <div className="flex items-baseline gap-2">
            <p className="text-primary text-2xl font-bold">{formatVnd(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-muted-foreground text-base line-through">
                {formatVnd(product.compareAtPrice)}
              </p>
            )}
          </div>
          <p className="text-muted-foreground text-sm">
            {product.brand} · {product.origin} · {product.size}
          </p>
          <p className="text-[15px]">{product.shortDescription}</p>

          <AddCartButton product={cartProduct} disabled={product.status === "out_of_stock"} />

          <Button
            asChild
            variant="ghost"
            className="text-primary h-11 rounded-lg px-0 hover:bg-transparent hover:underline"
          >
            <Link href="/yeu-cau-my-pham-han">
              Không thấy sản phẩm tương tự? Gửi yêu cầu tìm theo yêu cầu
            </Link>
          </Button>

          <div className="bg-card rounded-xl border p-4">
            <p className="text-sm font-semibold">Loại da phù hợp</p>
            <p className="text-muted-foreground mt-2 text-sm">{product.skinTypes.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-8 md:grid-cols-3">
        <ProductInfo title="Công dụng chính" items={product.benefits} />
        <ProductInfo title="Cách dùng" items={product.directions} />
        <ProductInfo title="Lưu ý khi sử dụng" items={product.cautions} />
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t py-8">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-[22px] leading-[1.35] font-bold">Sản phẩm liên quan</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} showCategory={category?.name} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
