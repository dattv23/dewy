"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Filter, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  categories,
  getCategoryBySlug,
  getProductsByCategory,
  statusLabel,
  type ProductCardDTO,
} from "@/lib/products"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type CategoryPageClientProps = {
  slug: string
  initialQuery: string
}

const sortOptions = [
  { value: "pho_bien", label: "Phổ biến" },
  { value: "moi_nhat", label: "Mới nhất" },
  { value: "gia_tang", label: "Giá tăng dần" },
  { value: "gia_giam", label: "Giá giảm dần" },
] as const

export function CategoryPageClient({ slug, initialQuery }: CategoryPageClientProps) {
  const category = getCategoryBySlug(slug)
  const baseProducts = category ? getProductsByCategory(slug) : []
  const [query, setQuery] = useState(initialQuery)
  const [selectedStatus, setSelectedStatus] = useState<string>("tat_ca")
  const [selectedSkinType, setSelectedSkinType] = useState<string>("tat_ca")
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("tat_ca")
  const [selectedBrand, setSelectedBrand] = useState<string>("tat_ca")
  const [selectedBenefit, setSelectedBenefit] = useState<string>("tat_ca")
  const [selectedSort, setSelectedSort] = useState<(typeof sortOptions)[number]["value"]>("pho_bien")
  const [page, setPage] = useState(1)
  const perPage = 8

  const availableBrands = useMemo(
    () => Array.from(new Set(baseProducts.map((item) => item.thuong_hieu).filter(Boolean))) as string[],
    [baseProducts],
  )
  const availableSkinTypes = useMemo(
    () => Array.from(new Set(baseProducts.flatMap((item) => item.loai_da ?? []))),
    [baseProducts],
  )
  const availableBenefits = useMemo(
    () => Array.from(new Set(baseProducts.flatMap((item) => item.cong_dung_tom_tat ?? []))).slice(0, 8),
    [baseProducts],
  )

  const filtered = useMemo(() => {
    const byQuery = baseProducts.filter((item) => item.ten.toLowerCase().includes(query.toLowerCase()))
    const byStatus = byQuery.filter((item) => selectedStatus === "tat_ca" || item.tinh_trang === selectedStatus)
    const bySkin = byStatus.filter(
      (item) => selectedSkinType === "tat_ca" || (item.loai_da ?? []).includes(selectedSkinType),
    )
    const byBrand = bySkin.filter((item) => selectedBrand === "tat_ca" || item.thuong_hieu === selectedBrand)
    const byBenefit = byBrand.filter(
      (item) => selectedBenefit === "tat_ca" || (item.cong_dung_tom_tat ?? []).includes(selectedBenefit),
    )
    const byPrice = byBenefit.filter((item) => {
      if (selectedPriceRange === "tat_ca") return true
      if (selectedPriceRange === "duoi_300") return item.gia_ban < 300000
      if (selectedPriceRange === "300_500") return item.gia_ban >= 300000 && item.gia_ban <= 500000
      return item.gia_ban > 500000
    })
    return sortProducts(byPrice, selectedSort)
  }, [baseProducts, query, selectedStatus, selectedSkinType, selectedBrand, selectedBenefit, selectedPriceRange, selectedSort])

  const paginated = filtered.slice(0, page * perPage)

  if (!category) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy danh mục</h1>
          <p className="mt-2 text-muted-foreground">Danh mục bạn truy cập hiện không tồn tại.</p>
          <Button asChild className="mt-4 h-11 rounded-lg">
            <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <p className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Trang chủ
              </Link>{" "}
              / <span className="text-foreground">{category.ten}</span>
            </p>
            <h1 className="mt-2 text-[28px] font-bold leading-[1.25]">{category.ten}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{category.mo_ta}</p>
            <p className="mt-2 text-sm text-muted-foreground">{filtered.length} sản phẩm</p>
          </div>
        </section>

        <section className="border-b">
          <div className="mx-auto grid w-full max-w-6xl gap-3 px-4 py-4 md:grid-cols-[1fr_180px_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setPage(1)
                }}
                placeholder="Tìm theo tên sản phẩm, công dụng, thương hiệu..."
                className="h-11 rounded-lg pl-10 text-[15px]"
              />
            </div>

            <select
              className="h-11 rounded-lg border bg-card px-3 text-sm"
              value={selectedSort}
              onChange={(event) => {
                setSelectedSort(event.target.value as (typeof sortOptions)[number]["value"])
                setPage(1)
              }}
              aria-label="Sắp xếp"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sắp xếp: {option.label}
                </option>
              ))}
            </select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="h-11 rounded-lg md:hidden">
                  <Filter className="h-4 w-4" />
                  Bộ lọc
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] max-w-sm">
                <SheetHeader>
                  <SheetTitle>Bộ lọc</SheetTitle>
                </SheetHeader>
                <FilterPanel
                  selectedStatus={selectedStatus}
                  selectedSkinType={selectedSkinType}
                  selectedPriceRange={selectedPriceRange}
                  selectedBrand={selectedBrand}
                  selectedBenefit={selectedBenefit}
                  availableBrands={availableBrands}
                  availableSkinTypes={availableSkinTypes}
                  availableBenefits={availableBenefits}
                  onStatusChange={setSelectedStatus}
                  onSkinTypeChange={setSelectedSkinType}
                  onPriceRangeChange={setSelectedPriceRange}
                  onBrandChange={setSelectedBrand}
                  onBenefitChange={setSelectedBenefit}
                  onReset={() => {
                    setSelectedStatus("tat_ca")
                    setSelectedSkinType("tat_ca")
                    setSelectedPriceRange("tat_ca")
                    setSelectedBrand("tat_ca")
                    setSelectedBenefit("tat_ca")
                  }}
                />
              </SheetContent>
            </Sheet>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[220px_1fr]">
          <aside className="hidden rounded-xl border bg-card p-4 md:block">
            <FilterPanel
              selectedStatus={selectedStatus}
              selectedSkinType={selectedSkinType}
              selectedPriceRange={selectedPriceRange}
              selectedBrand={selectedBrand}
              selectedBenefit={selectedBenefit}
              availableBrands={availableBrands}
              availableSkinTypes={availableSkinTypes}
              availableBenefits={availableBenefits}
              onStatusChange={setSelectedStatus}
              onSkinTypeChange={setSelectedSkinType}
              onPriceRangeChange={setSelectedPriceRange}
              onBrandChange={setSelectedBrand}
              onBenefitChange={setSelectedBenefit}
              onReset={() => {
                setSelectedStatus("tat_ca")
                setSelectedSkinType("tat_ca")
                setSelectedPriceRange("tat_ca")
                setSelectedBrand("tat_ca")
                setSelectedBenefit("tat_ca")
              }}
            />
          </aside>

          <div>
            {paginated.length === 0 ? (
              <div className="rounded-xl border bg-card p-6 text-center">
                <p className="text-[15px] font-medium">Không tìm thấy sản phẩm phù hợp bộ lọc.</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bạn có thể gửi yêu cầu sourcing để được hỗ trợ tìm sản phẩm từ Hàn Quốc.
                </p>
                <Button asChild className="mt-4 h-11 rounded-lg">
                  <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                  {paginated.map((product) => (
                    <ProductCard key={product.id} product={product} showCategory={category.ten} />
                  ))}
                </div>
                {paginated.length < filtered.length && (
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-5 h-11 w-full rounded-lg"
                    onClick={() => setPage((prev) => prev + 1)}
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
                className={`rounded-full border px-3 py-1.5 text-sm ${
                  item.slug === slug ? "border-primary text-primary" : "text-muted-foreground"
                }`}
              >
                {item.ten}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function sortProducts(products: ProductCardDTO[], selectedSort: (typeof sortOptions)[number]["value"]) {
  const copy = [...products]
  switch (selectedSort) {
    case "gia_tang":
      return copy.sort((a, b) => a.gia_ban - b.gia_ban)
    case "gia_giam":
      return copy.sort((a, b) => b.gia_ban - a.gia_ban)
    case "moi_nhat":
      return copy.sort((a, b) => b.id.localeCompare(a.id))
    default:
      return copy
  }
}

function FilterPanel({
  selectedStatus,
  selectedSkinType,
  selectedPriceRange,
  selectedBrand,
  selectedBenefit,
  availableBrands,
  availableSkinTypes,
  availableBenefits,
  onStatusChange,
  onSkinTypeChange,
  onPriceRangeChange,
  onBrandChange,
  onBenefitChange,
  onReset,
}: {
  selectedStatus: string
  selectedSkinType: string
  selectedPriceRange: string
  selectedBrand: string
  selectedBenefit: string
  availableBrands: string[]
  availableSkinTypes: string[]
  availableBenefits: string[]
  onStatusChange: (value: string) => void
  onSkinTypeChange: (value: string) => void
  onPriceRangeChange: (value: string) => void
  onBrandChange: (value: string) => void
  onBenefitChange: (value: string) => void
  onReset: () => void
}) {
  const statuses: Array<{ value: string; label: string }> = [
    { value: "tat_ca", label: "Tất cả" },
    { value: "con_hang", label: statusLabel("con_hang") },
    { value: "sap_het", label: statusLabel("sap_het") },
    { value: "het_hang", label: statusLabel("het_hang") },
    { value: "dat_sourcing", label: statusLabel("dat_sourcing") },
  ]

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold">Loại da</p>
        <select
          value={selectedSkinType}
          onChange={(event) => onSkinTypeChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border bg-card px-3 text-sm"
        >
          <option value="tat_ca">Tất cả</option>
          {availableSkinTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold">Mức giá</p>
        <select
          value={selectedPriceRange}
          onChange={(event) => onPriceRangeChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border bg-card px-3 text-sm"
        >
          <option value="tat_ca">Tất cả</option>
          <option value="duoi_300">Dưới 300.000đ</option>
          <option value="300_500">300.000đ - 500.000đ</option>
          <option value="tren_500">Trên 500.000đ</option>
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold">Thương hiệu</p>
        <select
          value={selectedBrand}
          onChange={(event) => onBrandChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border bg-card px-3 text-sm"
        >
          <option value="tat_ca">Tất cả</option>
          {availableBrands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold">Công dụng</p>
        <select
          value={selectedBenefit}
          onChange={(event) => onBenefitChange(event.target.value)}
          className="mt-2 h-10 w-full rounded-lg border bg-card px-3 text-sm"
        >
          <option value="tat_ca">Tất cả</option>
          {availableBenefits.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-semibold">Tình trạng</p>
        <div className="mt-2 space-y-2">
          {statuses.map((status) => (
            <label key={status.value} className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="status"
                value={status.value}
                checked={selectedStatus === status.value}
                onChange={(event) => onStatusChange(event.target.value)}
              />
              {status.label}
            </label>
          ))}
        </div>
      </div>
      <Button type="button" variant="default" className="h-10 w-full rounded-lg">
        Áp dụng
      </Button>
      <Button type="button" variant="outline" className="h-10 w-full rounded-lg" onClick={onReset}>
        Xóa bộ lọc
      </Button>
    </div>
  )
}
