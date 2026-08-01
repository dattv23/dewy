"use client"

import { useMemo, useState } from "react"
import { CATALOG_CONFIG, type CatalogSort } from "@/config/catalog"
import type { CatalogFilterValues } from "@/features/products/components/catalog-filter-panel"
import type { ProductCardDTO } from "@/types/product"

const initialFilters: CatalogFilterValues = {
  status: "all",
  skinType: "all",
  priceRange: "all",
  brand: "all",
  benefit: "all",
}

export function useCatalog(products: ProductCardDTO[], initialQuery: string) {
  const [query, setQuery] = useState(initialQuery)
  const [filters, setFilters] = useState(initialFilters)
  const [sort, setSort] = useState<CatalogSort>("popular")
  const [page, setPage] = useState(1)

  const options = useMemo(
    () => ({
      brands: unique(products.map((item) => item.brand).filter(Boolean) as string[]),
      skinTypes: unique(products.flatMap((item) => item.skinTypes ?? [])),
      benefits: unique(products.flatMap((item) => item.highlights ?? [])).slice(0, 8),
    }),
    [products],
  )

  const filteredProducts = useMemo(
    () =>
      sortProducts(
        products.filter((item) => {
          const { lowerLimit, upperLimit } = CATALOG_CONFIG.priceRanges
          const matchesPrice =
            filters.priceRange === "all" ||
            (filters.priceRange === "under_300" && item.price < lowerLimit) ||
            (filters.priceRange === "300_500" &&
              item.price >= lowerLimit &&
              item.price <= upperLimit) ||
            (filters.priceRange === "tren_500" && item.price > upperLimit)
          return (
            item.name.toLowerCase().includes(query.toLowerCase()) &&
            (filters.status === "all" || item.status === filters.status) &&
            (filters.skinType === "all" || (item.skinTypes ?? []).includes(filters.skinType)) &&
            (filters.brand === "all" || item.brand === filters.brand) &&
            (filters.benefit === "all" || (item.highlights ?? []).includes(filters.benefit)) &&
            matchesPrice
          )
        }),
        sort,
      ),
    [products, query, filters, sort],
  )

  const resetPage = (callback: () => void) => {
    callback()
    setPage(1)
  }
  return {
    query,
    filters,
    sort,
    filteredProducts,
    visibleProducts: filteredProducts.slice(0, page * CATALOG_CONFIG.productsPerPage),
    options,
    setQuery: (value: string) => resetPage(() => setQuery(value)),
    setSort: (value: CatalogSort) => resetPage(() => setSort(value)),
    setFilter: (field: keyof CatalogFilterValues, value: string) =>
      resetPage(() => setFilters((current) => ({ ...current, [field]: value }))),
    resetFilters: () => resetPage(() => setFilters(initialFilters)),
    resetAll: () =>
      resetPage(() => {
        setQuery("")
        setFilters(initialFilters)
      }),
    showMore: () => setPage((current) => current + 1),
  }
}

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function sortProducts(products: ProductCardDTO[], sort: CatalogSort) {
  const copy = [...products]
  if (sort === "price_asc") return copy.sort((a, b) => a.price - b.price)
  if (sort === "price_desc") return copy.sort((a, b) => b.price - a.price)
  if (sort === "newest") return copy.sort((a, b) => b.id.localeCompare(a.id))
  return copy
}
