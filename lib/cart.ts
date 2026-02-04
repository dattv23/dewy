import type { ProductCardDTO } from "@/lib/products"

const CART_STORAGE_KEY = "dewy_cart"
const CART_EVENT_NAME = "dewy-cart-updated"

export type CartItem = {
  id: string
  slug: string
  ten: string
  gia_ban: number
  anh_chinh: string
  so_luong: number
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return []
  const raw = window.localStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item.id && item.so_luong > 0)
  } catch {
    return []
  }
}

export function addToCart(product: ProductCardDTO, soLuong = 1) {
  if (typeof window === "undefined") return
  const current = getCartItems()
  const existing = current.find((item) => item.id === product.id)

  const nextItems = existing
    ? current.map((item) =>
        item.id === product.id ? { ...item, so_luong: item.so_luong + soLuong } : item,
      )
    : [
        ...current,
        {
          id: product.id,
          slug: product.slug,
          ten: product.ten,
          gia_ban: product.gia_ban,
          anh_chinh: product.anh_chinh,
          so_luong: soLuong,
        },
      ]

  saveCart(nextItems)
}

export function updateCartItemQuantity(id: string, soLuong: number) {
  if (typeof window === "undefined") return
  const current = getCartItems()
  const next = current
    .map((item) => (item.id === id ? { ...item, so_luong: soLuong } : item))
    .filter((item) => item.so_luong > 0)
  saveCart(next)
}

export function removeCartItem(id: string) {
  if (typeof window === "undefined") return
  const current = getCartItems()
  saveCart(current.filter((item) => item.id !== id))
}

export function clearCart() {
  if (typeof window === "undefined") return
  saveCart([])
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.so_luong, 0)
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.gia_ban * item.so_luong, 0)
}

export function getCartEventName() {
  return CART_EVENT_NAME
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT_NAME))
}
