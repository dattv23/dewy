"use client"

import { useMemo } from "react"
import { ArrowRight, ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
import { ProductCard } from "@/features/products/components/product-card"
import { CatalogFilterPanel } from "@/features/products/components/catalog-filter-panel"
import { useCatalog } from "@/features/products/hooks/use-catalog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { getCategoryBySlug, getProductsByCategory } from "@/features/products/data/products"
import { CATALOG_CONFIG, type CatalogSort } from "@/config/catalog"
import { CategoryNotFound, EmptyCatalog } from "@/features/products/components/catalog-states"
import { CategoryHero } from "@/features/products/components/category-hero"

type CategoryViewProps = { slug: string; initialQuery: string }

export function CategoryView({ slug, initialQuery }: CategoryViewProps) {
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
    <div>
      <CategoryHero category={category} />

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

        <div className="mb-8 overflow-hidden rounded-xl border border-zinc-200/70 bg-white shadow-[0_6px_24px_rgba(24,24,27,0.035)]">
          <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:p-1.5">
            <label className="group relative min-w-0 flex-1">
              <span className="sr-only">Tìm kiếm sản phẩm</span>
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-zinc-700"
                strokeWidth={1.5}
              />
              <Input
                value={catalog.query}
                onChange={(event) => catalog.setQuery(event.target.value)}
                placeholder="Tìm theo tên sản phẩm, công dụng, thương hiệu..."
                className="h-11 w-full rounded-lg border border-transparent bg-[#faf9f8] pr-10 pl-10 text-sm shadow-none transition-all placeholder:text-zinc-400 hover:bg-zinc-100/80 focus-visible:border-zinc-300 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-zinc-200"
                aria-label="Tìm kiếm sản phẩm theo tên, công dụng hoặc thương hiệu"
              />
              {catalog.query && (
                <button
                  type="button"
                  onClick={() => catalog.setQuery("")}
                  className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900"
                  aria-label="Xóa nội dung tìm kiếm"
                >
                  <X className="size-4" />
                </button>
              )}
            </label>
            <div className="grid grid-cols-2 gap-2 sm:flex sm:shrink-0">
              <label className="relative min-w-0">
                <span className="sr-only">Sắp xếp sản phẩm</span>
                <select
                  className="h-11 w-full appearance-none rounded-lg border border-zinc-200/80 bg-white pr-9 pl-3.5 text-sm font-normal text-zinc-700 transition-colors outline-none hover:border-zinc-300 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 sm:w-44"
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
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-zinc-400" />
              </label>
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 rounded-lg border-zinc-200/80 bg-white px-4 font-normal text-zinc-700 shadow-none hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950"
                    aria-label="Mở bộ lọc"
                  >
                    <SlidersHorizontal className="size-4" />
                    Bộ lọc
                    {activeFilterCount > 0 && (
                      <span className="flex size-4.5 items-center justify-center rounded-full bg-zinc-900 text-[9px] font-semibold text-white">
                        {activeFilterCount}
                      </span>
                    )}
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
            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 bg-[#fcfbfa] px-4 py-3">
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
    </div>
  )
}
