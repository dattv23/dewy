export const COMMERCE_CONFIG = {
  currency: "VND",
  locale: "vi-VN",
  shippingFee: 25_000,
  freeShippingThreshold: 700_000,
} as const

export function calculateShipping(subtotal: number) {
  if (subtotal === 0 || subtotal >= COMMERCE_CONFIG.freeShippingThreshold) return 0
  return COMMERCE_CONFIG.shippingFee
}
