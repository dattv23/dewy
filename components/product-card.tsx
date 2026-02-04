"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { addToCart } from "@/lib/cart"
import { formatVnd, statusLabel, type ProductCardDTO } from "@/lib/products"

type ProductCardProps = {
  product: ProductCardDTO
  showCategory?: string
}

const statusClassMap: Record<ProductCardDTO["tinh_trang"], string> = {
  con_hang: "bg-primary/10 text-primary border-primary/20",
  sap_het: "bg-amber-50 text-amber-700 border-amber-200",
  het_hang: "bg-slate-100 text-slate-600 border-slate-200",
  dat_sourcing: "bg-emerald-50 text-emerald-700 border-emerald-200",
}

export function ProductCard({ product, showCategory }: ProductCardProps) {
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-card shadow-[0_1px_3px_rgba(15,23,42,0.08)] transition-shadow hover:shadow-[0_10px_24px_rgba(31,138,77,0.16)]">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={product.anh_chinh} alt={`${product.ten} ${showCategory ?? ""}`.trim()} fill className="object-cover" />
        </div>
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex min-w-0 flex-wrap gap-1.5">
          <Badge variant="outline" className={statusClassMap[product.tinh_trang]}>
            {statusLabel(product.tinh_trang)}
          </Badge>
          {product.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary" className="max-w-full">
              {tag}
            </Badge>
          ))}
        </div>

        <Link
          href={`/san-pham/${product.slug}`}
          className="min-w-0 break-words text-base font-semibold leading-snug line-clamp-2 hover:text-primary sm:text-lg"
        >
          {product.ten}
        </Link>

        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <p className="text-lg font-bold text-primary sm:text-xl">{formatVnd(product.gia_ban)}</p>
          {product.gia_goc && (
            <p className="text-xs text-muted-foreground line-through sm:text-sm">{formatVnd(product.gia_goc)}</p>
          )}
        </div>

        <div className="mt-auto grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button asChild variant="outline" className="h-11 min-h-11 w-full rounded-lg px-3 text-sm sm:text-[15px]">
            <Link href={`/san-pham/${product.slug}`}>Xem chi tiết</Link>
          </Button>
          <Button
            type="button"
            className="h-11 min-h-11 w-full rounded-lg bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90 sm:text-[15px]"
            onClick={() => {
              if (product.tinh_trang !== "het_hang") {
                addToCart(product, 1)
              }
            }}
            disabled={product.tinh_trang === "het_hang"}
          >
            {product.tinh_trang === "het_hang" ? "Hết hàng" : "Thêm giỏ"}
          </Button>
        </div>
      </div>
    </article>
  )
}
