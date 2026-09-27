import { COMMERCE_CONFIG } from "@/config/commerce"
import type { ProductStatus } from "@/types/product"

export function formatVnd(price: number) {
  return new Intl.NumberFormat(COMMERCE_CONFIG.locale, {
    style: "currency",
    currency: COMMERCE_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function statusLabel(status: ProductStatus) {
  return status === "out_of_stock" ? "Hết hàng" : "Còn hàng"
}
