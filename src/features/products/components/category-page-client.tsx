"use client"

import Link from "next/link"
import Image from "next/image"
import { useMemo } from "react"
import { ArrowRight, Search, SlidersHorizontal, Sparkles, X } from "lucide-react"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { ProductCard } from "@/features/products/components/product-card"
import { CatalogFilterPanel } from "@/features/products/components/catalog-filter-panel"
import { useCatalog } from "@/features/products/hooks/use-catalog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/features/products/data/products"
import { CATALOG_CONFIG, type CatalogSort } from "@/config/catalog"

type CategoryPageClientProps = { slug: string; initialQuery: string }

export function CategoryPageClient({ slug, initialQuery }: CategoryPageClientProps) {
  const category = getCategoryBySlug(slug)
  const products = useMemo(() => (category ? getProductsByCategory(slug) : []), [category, slug])
  const catalog = useCatalog(products, initialQuery)

  if (!category) return <CategoryNotFound />

  const activeFilterCount = Object.values(catalog.filters).filter((value) => value !== "all").length

  const filterPanel = (
    <CatalogFilterPanel
      values={catalog.filters}
      brands={catalog.options.brands}
      skinTypes={catalog.options.skinTypes}
      benefits={catalog.options.benefits}
      onChange={catalog.setFilter}
      onReset={catalog.resetFilters}
    />
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-zinc-200/70 bg-[#f7f4f2]">
          <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:py-7">
            <div className="relative min-h-70 overflow-hidden rounded-3xl bg-zinc-950 sm:min-h-85">
              <Image
                src={category.image}
                alt={`Bộ sưu tập ${category.name}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/5" />
              <div className="relative z-10 flex min-h-70 max-w-xl flex-col justify-end p-6 text-white sm:min-h-85 sm:p-10">
                <p className="mb-auto flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/75 uppercase">
                  <Sparkles className="h-3.5 w-3.5" /> Tuyển chọn bởi Dewy
                </p>
                <p className="mb-3 text-sm text-white/70">
                  <Link href="/" className="transition-colors hover:text-white">
                    Trang chủ
                  </Link>
                  <span className="mx-2">/</span>
                  {category.name}
                </p>
                <h1 className="text-3xl leading-tight font-semibold tracking-[-0.035em] sm:text-5xl">
                  {category.name}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-6 text-white/80 sm:text-base">
                  {category.description}
                </p>
              </div>
            </div>

            <nav aria-label="Danh mục sản phẩm" className="mt-5 flex gap-2 overflow-x-auto pb-1">
              {categories.map((item) => (
                <Link
                  key={item.slug}
                  href={`/danh-muc/${item.slug}`}
                  aria-current={item.slug === slug ? "page" : undefined}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    item.slug === slug
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] text-rose-700 uppercase">
                Khám phá bộ sưu tập
              </p>
              <h2 className="mt-1.5 text-2xl font-semibold tracking-tight sm:text-3xl">
                Sản phẩm nổi bật
              </h2>
            </div>
            <p className="hidden text-sm text-zinc-500 sm:block">
              {catalog.filteredProducts.length} sản phẩm
            </p>
          </div>

          <div className="sticky top-16 z-20 -mx-2 mb-7 rounded-2xl border border-zinc-200/80 bg-white/90 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:mx-0">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="relative min-w-0 flex-1">
                <span className="sr-only">Tìm kiếm sản phẩm</span>
                <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  value={catalog.query}
                  onChange={(event) => catalog.setQuery(event.target.value)}
                  placeholder="Tìm theo tên sản phẩm, công dụng, thương hiệu..."
                  className="h-11 w-full rounded-xl border-0 bg-zinc-100/80 pl-10 text-[15px] shadow-none focus-visible:bg-white"
                  aria-label="Tìm kiếm sản phẩm theo tên, công dụng hoặc thương hiệu"
                />
              </label>
              <div className="grid grid-cols-2 gap-2 sm:flex">
                <select
                  className="h-11 min-w-0 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium sm:w-48"
                  value={catalog.sort}
                  onChange={(event) => catalog.setSort(event.target.value as CatalogSort)}
                  aria-label="Sắp xếp sản phẩm"
                >
                  {CATALOG_CONFIG.sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-11 rounded-xl border-zinc-200 bg-white px-4"
                      aria-label="Mở bộ lọc"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Bộ lọc{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="border-border bg-card w-[92%] max-w-sm gap-0 overflow-hidden rounded-l-2xl border-l shadow-xl"
                  >
                    <SheetHeader className="border-border border-b px-5 pt-5 pb-4">
                      <SheetTitle className="text-base font-semibold">Bộ lọc</SheetTitle>
                    </SheetHeader>
                    <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-4 pr-3 pb-5 sm:px-5 sm:pr-4 sm:pb-6">
                      {filterPanel}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            {(catalog.query || activeFilterCount > 0) && (
              <div className="mt-2 flex items-center justify-between gap-3 border-t border-zinc-100 px-2 pt-2">
                <p className="truncate text-xs text-zinc-500">
                  Đang hiển thị {catalog.filteredProducts.length} kết quả
                  {catalog.query ? ` cho “${catalog.query}”` : ""}
                </p>
                <button
                  type="button"
                  onClick={catalog.resetAll}
                  className="flex shrink-0 items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-rose-700"
                >
                  <X className="h-3.5 w-3.5" /> Xóa lọc
                </button>
              </div>
            )}
          </div>

          <div className="min-w-0">
            {catalog.visibleProducts.length === 0 ? (
              <EmptyCatalog onReset={catalog.resetAll} />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:gap-x-5 sm:gap-y-9 lg:grid-cols-3 xl:grid-cols-4">
                  {catalog.visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showCategory={category.name} />
                  ))}
                </div>
                {catalog.visibleProducts.length < catalog.filteredProducts.length && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mx-auto mt-10 flex h-11 rounded-full px-7"
                    onClick={catalog.showMore}
                  >
                    Xem thêm sản phẩm <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function CategoryNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
        <h1 className="text-2xl font-bold">Không tìm thấy danh mục</h1>
        <p className="text-muted-foreground mt-2">Danh mục bạn truy cập hiện không tồn tại.</p>
        <Button asChild className="mt-4 h-11 rounded-lg">
          <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
        </Button>
      </main>
      <Footer />
    </div>
  )
}

function EmptyCatalog({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-card rounded-xl border p-6 text-center">
      <p className="text-[15px] font-medium">Không tìm thấy sản phẩm phù hợp bộ lọc.</p>
      <p className="text-muted-foreground mt-2 text-sm">
        Bạn có thể gửi yêu cầu tìm theo yêu cầu để được hỗ trợ tìm sản phẩm từ Hàn Quốc.
      </p>
      <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row">
        <Button type="button" variant="outline" className="h-11 rounded-lg" onClick={onReset}>
          Xóa tìm kiếm & bộ lọc
        </Button>
        <Button asChild className="h-11 rounded-lg">
          <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
        </Button>
      </div>
    </div>
  )
}
