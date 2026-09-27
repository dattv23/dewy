"use client"

import Image from "next/image"
import Link from "next/link"
import { AddCartButton } from "@/features/cart/components/add-cart-button"
import { ProductCard } from "@/features/products/components/product-card"
import { formatVnd, statusLabel } from "@/features/products/product-utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ProductCardDTO, ProductDetailDTO } from "@/types/product"
import { ProductNotFound } from "@/features/products/components/product-detail-states"
import type { Category } from "@/types/category"

type ProductDetailViewProps = {
  product: ProductDetailDTO | null
  relatedProducts: ProductCardDTO[]
  category: Category | null
  status: "ready" | "not-found" | "unavailable"
}

export function ProductDetailView({
  product,
  relatedProducts,
  category,
  status,
}: ProductDetailViewProps) {
  if (status === "not-found" || !product)
    return <ProductNotFound unavailable={status === "unavailable"} />

  const cartProduct: ProductCardDTO = product

  return (
    <div>
      <section className="bg-secondary/30 border-b">
        <div className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-4 text-sm">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>{" "}
          /{" "}
          <Link
            href={category ? `/danh-muc/${category.slug}` : "/danh-muc"}
            className="hover:text-primary"
          >
            {category?.name ?? product.categoryName ?? "Danh mục"}
          </Link>{" "}
          / <span className="text-foreground">{product.name}</span>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-2">
        <div className="bg-card relative aspect-square overflow-hidden rounded-2xl border">
          <Image src={product.image} alt={product.name} fill className="object-cover" priority />
        </div>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
              {statusLabel(product.status)}
            </Badge>
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
            {[product.brand, product.sku].filter(Boolean).join(" · ")}
          </p>
          {product.shortDescription ? (
            <p className="text-[15px]">{product.shortDescription}</p>
          ) : null}

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
        </div>
      </section>

      {product.description ? (
        <section className="mx-auto w-full max-w-6xl px-4 pb-8">
          <article className="bg-card rounded-xl border p-5">
            <h2 className="text-lg font-semibold">Thông tin sản phẩm</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-6 whitespace-pre-line">
              {product.description}
            </p>
          </article>
        </section>
      ) : null}

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
