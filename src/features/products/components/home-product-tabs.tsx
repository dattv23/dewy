"use client"

import { useState } from "react"
import { ProductCard } from "@/features/products/components/product-card"
import type { ProductCardDTO } from "@/types/product"

type HomeProductTabsProps = {
  allProducts: ProductCardDTO[]
}

const tabs = [
  { id: "all", label: "Tất cả sản phẩm" },
  { id: "best", label: "Top Bán Chạy" },
  { id: "cham-soc-da", label: "Chăm sóc da" },
  { id: "trang-diem", label: "Trang điểm" },
  { id: "cham-soc-co-the", label: "Chăm sóc cơ thể" },
]

export function HomeProductTabs({ allProducts }: HomeProductTabsProps) {
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts = allProducts.filter((product) => {
    if (activeTab === "all") return true
    if (activeTab === "best")
      return product.tags.includes("Bán chạy") || product.tags.includes("Phổ biến")
    return product.categorySlug === activeTab
  })

  return (
    <div className="space-y-6">
      {/* Category Tabs Bar */}
      <div className="scrollbar-none flex items-center gap-2 overflow-x-auto border-b border-zinc-200/60 pb-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all sm:text-sm ${
                isActive
                  ? "scale-105 bg-zinc-900 text-white shadow-md"
                  : "bg-secondary/70 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Grid of Products */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
