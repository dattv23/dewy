"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag } from "lucide-react"
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
  in_stock: "bg-emerald-50 text-emerald-800 border-emerald-200/60",
  low_stock: "bg-amber-50 text-amber-800 border-amber-200/60",
  out_of_stock: "bg-zinc-100 text-zinc-500 border-zinc-200",
  sourcing: "bg-accent text-accent-foreground border-accent-foreground/15",
}

export function ProductCard({ product, showCategory }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <article className="group bg-card flex h-full min-w-0 flex-col overflow-hidden rounded-xl border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]">
      <Link href={`/san-pham/${product.slug}`} className="relative block">
        {/* Tỉ lệ 3:4 VIUS Korea Aspect Ratio */}
        <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100">
          <Image
            src={product.image}
            alt={`${product.name} ${showCategory ?? ""}`.trim()}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badges on top left */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
            {discountPercent > 0 && (
              <span className="rounded bg-rose-500 px-2 py-0.5 text-[11px] font-bold tracking-wider text-white uppercase shadow-sm">
                -{discountPercent}%
              </span>
            )}
            <Badge
              variant="outline"
              className={`px-2 py-0.5 text-[10px] backdrop-blur-md ${statusClassMap[product.status]}`}
            >
              {statusLabel(product.status)}
            </Badge>
          </div>

          {/* Wishlist Heart Icon Top Right */}
          <button
            type="button"
            aria-label="Yêu thích"
            onClick={(e) => {
              e.preventDefault()
              setIsLiked(!isLiked)
            }}
            className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-zinc-700 shadow-sm backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : "text-zinc-600"}`}
            />
          </button>
        </div>
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3.5 sm:p-4">
        {/* Brand Name */}
        {product.brand && (
          <p className="text-[11px] font-bold tracking-widest text-zinc-400 uppercase">
            {product.brand}
          </p>
        )}

        <Link
          href={`/san-pham/${product.slug}`}
          className="line-clamp-2 min-w-0 text-sm leading-snug font-medium tracking-tight text-zinc-900 transition-colors hover:text-rose-700 sm:text-base"
        >
          {product.name}
        </Link>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="bg-secondary rounded px-1.5 py-0.5 text-[10px] font-medium text-zinc-600"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <p className="text-base font-bold text-zinc-900 sm:text-lg">{formatVnd(product.price)}</p>
          {product.compareAtPrice && (
            <p className="text-xs text-zinc-400 line-through sm:text-sm">
              {formatVnd(product.compareAtPrice)}
            </p>
          )}
        </div>

        {/* Action Button */}
        <Button
          type="button"
          className="mt-2 h-10 w-full rounded-lg bg-zinc-900 text-xs font-semibold tracking-wide text-zinc-50 uppercase shadow-sm transition-all hover:bg-zinc-800"
          onClick={() => {
            if (product.status !== "out_of_stock") {
              addToCart(product, 1)
            }
          }}
          disabled={product.status === "out_of_stock"}
        >
          <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
          {product.status === "out_of_stock" ? "Hết hàng" : "Thêm giỏ hàng"}
        </Button>
      </div>
    </article>
  )
}
