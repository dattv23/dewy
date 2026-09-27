import Link from "next/link"
import { ArrowRight, Flame } from "lucide-react"
import { HomeProductTabs } from "@/features/products/components/home-product-tabs"
import type { Category } from "@/types/category"
import type { ProductCardDTO } from "@/types/product"

export function FeaturedProducts({
  products,
  categories,
  isError,
}: {
  products: ProductCardDTO[]
  categories: Category[]
  isError: boolean
}) {
  const catalogHref = categories[0] ? `/danh-muc/${categories[0].slug}` : "/danh-muc"

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-800 uppercase">
              <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              SẢN PHẨM DEWY
            </div>
            <h2 className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              Sản phẩm mới cập nhật
            </h2>
          </div>
          <Link
            href={catalogHref}
            className="inline-flex items-center text-xs font-bold tracking-wider text-zinc-900 uppercase transition-colors hover:text-rose-700"
          >
            Xem tất cả sản phẩm <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Link>
        </div>
        {isError ? (
          <div className="rounded-xl border border-zinc-200/80 bg-white px-4 py-10 text-center">
            <p className="font-semibold text-zinc-900">Không thể tải sản phẩm</p>
            <p className="mt-1 text-sm text-zinc-500">Vui lòng thử lại sau.</p>
          </div>
        ) : (
          <HomeProductTabs products={products} categories={categories} />
        )}
      </div>
    </section>
  )
}
