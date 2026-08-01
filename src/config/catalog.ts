export const CATALOG_CONFIG = {
  productsPerPage: 8,
  priceRanges: {
    lowerLimit: 300_000,
    upperLimit: 500_000,
  },
  sortOptions: [
    { value: "popular", label: "Phổ biến" },
    { value: "newest", label: "Mới nhất" },
    { value: "price_asc", label: "Giá tăng dần" },
    { value: "price_desc", label: "Giá giảm dần" },
  ],
} as const

export type CatalogSort = (typeof CATALOG_CONFIG.sortOptions)[number]["value"]
