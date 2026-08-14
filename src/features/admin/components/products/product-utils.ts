import type { AdminProductStatus } from "@/types/admin-product"

export const PRODUCT_STATUS_LABELS: Record<AdminProductStatus, string> = {
  DRAFT: "Nháp",
  ACTIVE: "Đang bán",
  ARCHIVED: "Ngừng bán",
}

const productMoneyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
  maximumFractionDigits: 0,
})

export function formatProductPrice(value: number) {
  return productMoneyFormatter.format(value)
}
