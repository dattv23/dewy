"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addToCart } from "@/features/cart/cart-store"
import { formatVnd, statusLabel } from "@/features/products/data/products"
import type { ProductCardDTO } from "@/types/product"

type ProductCardProps = {
  product: ProductCardDTO
  showCategory?: string
}

const statusClassMap: Record<ProductCardDTO["status"], string> = {
  in_stock: "bg-primary/10 text-primary border-primary/20",
  low_stock: "bg-amber-50 text-amber-700 border-amber-200",
  out_of_stock: "bg-slate-100 text-slate-600 border-slate-200",
  sourcing: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export function ProductCard({ product, showCategory }: ProductCardProps) {
  return (
    <article className="bg-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_24px_rgba(31,138,77,0.16)]">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={product.image}
            alt={`${product.name} ${showCategory ?? ""}`.trim()}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          <Badge variant="outline" className={statusClassMap[product.status]}>
            {statusLabel(product.status)}
          </Badge>
          {product.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="max-w-full">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={`/san-pham/${product.slug}`}
          className="hover:text-primary line-clamp-2 min-w-0 text-base leading-snug font-semibold wrap-break-word sm:text-lg"
        >
          {product.name}
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-primary text-lg font-bold sm:text-xl">{formatVnd(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-muted-foreground text-xs line-through sm:text-sm">
              {formatVnd(product.compareAtPrice)}
            </p>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button
            asChild
            variant="outline"
            className="h-11 min-h-11 w-full rounded-lg px-3 text-sm sm:text-[15px]"
          >
            <Link href={`/san-pham/${product.slug}`}>Xem chi tiết</Link>
          </Button>
          <Button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 min-h-11 w-full rounded-lg px-3 text-sm sm:text-[15px]"
            onClick={() => {
              if (product.status !== "out_of_stock") {
                addToCart(product, 1)
              }
            }}
            disabled={product.status === "out_of_stock"}
          >
            {product.status === "out_of_stock" ? "Hết hàng" : "Thêm giỏ"}
          </Button>
        </div>
      </div>
    </article>
  )
}
