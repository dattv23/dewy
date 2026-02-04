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
    <article className="overflow-hidden rounded-xl border bg-card shadow-[0_1px_2px_rgba(15,23,42,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(31,138,77,0.14)]">
      <Link href={`/san-pham/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image src={product.anh_chinh} alt={`${product.ten} ${showCategory ?? ""}`.trim()} fill className="object-cover" />
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={statusClassMap[product.tinh_trang]}>
            {statusLabel(product.tinh_trang)}
          </Badge>
          {product.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        <Link href={`/san-pham/${product.slug}`} className="line-clamp-2 text-[15px] font-semibold hover:text-primary">
          {product.ten}
        </Link>

        <div className="flex items-baseline gap-2">
          <p className="text-lg font-bold text-primary">{formatVnd(product.gia_ban)}</p>
          {product.gia_goc && <p className="text-sm text-muted-foreground line-through">{formatVnd(product.gia_goc)}</p>}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline" className="h-11 rounded-lg">
            <Link href={`/san-pham/${product.slug}`}>Xem chi tiết</Link>
          </Button>
          <Button
            type="button"
            className="h-11 rounded-lg"
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
