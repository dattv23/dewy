"use client"

import { useState } from "react"
import { ProductCard } from "@/features/products/components/product-card"
import type { Category } from "@/types/category"
import type { ProductCardDTO } from "@/types/product"

type HomeProductTabsProps = {
  products: ProductCardDTO[]
  categories: Category[]
}

export function HomeProductTabs({ products, categories }: HomeProductTabsProps) {
  const [activeTab, setActiveTab] = useState("all")
  const tabs = [
    { id: "all", label: "Tất cả sản phẩm" },
    ...categories.map((category) => ({ id: category.slug, label: category.name })),
  ]

  const filteredProducts = products.filter((product) => {
    if (activeTab === "all") return true
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
      {filteredProducts.length === 0 ? (
        <p className="rounded-xl border border-zinc-200/80 bg-white px-4 py-10 text-center text-sm text-zinc-500">
          Chưa có sản phẩm trong danh mục này.
        </p>
      ) : null}
    </div>
  )
}
