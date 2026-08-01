"use client"

import Link from "next/link"
import { useMemo } from "react"
import { Filter, Search } from "lucide-react"
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
        <section className="bg-secondary/30 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <p className="text-muted-foreground text-sm">
              <Link href="/" className="hover:text-primary">
                Trang chủ
              </Link>{" "}
              / <span className="text-foreground">{category.name}</span>
            </p>
            <h1 className="mt-2 text-[26px] leading-tight font-bold wrap-break-word sm:text-[30px]">
              {category.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-sm wrap-break-word">
              {category.description}
            </p>
            <p className="text-muted-foreground mt-2 text-sm">
              {catalog.filteredProducts.length} sản phẩm
            </p>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                value={catalog.query}
                onChange={(event) => catalog.setQuery(event.target.value)}
                placeholder="Tìm theo tên sản phẩm, công dụng, thương hiệu..."
                className="h-11 w-full rounded-lg pl-10 text-[15px]"
                aria-label="Tìm kiếm sản phẩm theo tên, công dụng hoặc thương hiệu"
              />
            </div>
            <select
              className="bg-card h-11 w-full rounded-lg border px-3 text-sm sm:w-52"
              value={catalog.sort}
              onChange={(event) => catalog.setSort(event.target.value as CatalogSort)}
              aria-label="Sắp xếp sản phẩm"
            >
              {CATALOG_CONFIG.sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sắp xếp: {option.label}
                </option>
              ))}
            </select>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-lg sm:w-auto md:hidden"
                  aria-label="Mở bộ lọc"
                >
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="border-border bg-card w-[92%] max-w-sm gap-0 overflow-hidden rounded-r-2xl border-r shadow-xl"
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
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[230px_minmax(0,1fr)] lg:gap-5">
          <aside className="bg-card hidden rounded-2xl border p-4 md:block">{filterPanel}</aside>
          <div className="min-w-0">
            {catalog.visibleProducts.length === 0 ? (
              <EmptyCatalog />
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {catalog.visibleProducts.map((product) => (
                    <ProductCard key={product.id} product={product} showCategory={category.name} />
                  ))}
                </div>
                {catalog.visibleProducts.length < catalog.filteredProducts.length && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5 h-11 w-full rounded-lg"
                    onClick={catalog.showMore}
                  >
                    Xem thêm sản phẩm
                  </Button>
                )}
              </>
            )}
          </div>
        </section>

        <section className="border-t py-6">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-2 px-4">
            {categories.map((item) => (
              <Link
                key={item.slug}
                href={`/danh-muc/${item.slug}`}
                className={`rounded-full border px-3 py-1.5 text-sm ${item.slug === slug ? "border-primary text-primary" : "text-muted-foreground"}`}
              >
                {item.name}
              </Link>
            ))}
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

function EmptyCatalog() {
  return (
    <div className="bg-card rounded-xl border p-6 text-center">
      <p className="text-[15px] font-medium">Không tìm thấy sản phẩm phù hợp bộ lọc.</p>
      <p className="text-muted-foreground mt-2 text-sm">
        Bạn có thể gửi yêu cầu tìm theo yêu cầu để được hỗ trợ tìm sản phẩm từ Hàn Quốc.
      </p>
      <Button asChild className="mt-4 h-11 rounded-lg">
        <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
      </Button>
    </div>
  )
}
