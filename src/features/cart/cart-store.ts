import type { ProductCardDTO } from "@/types/product"
import type { CartItem } from "@/types/cart"
import { CART_EVENT_NAME, CART_STORAGE_KEY } from "@/constants/storage"

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return []
  const raw = window.localStorage.getItem(CART_STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => item.id && item.quantity > 0)
  } catch {
    return []
  }
}

export function addToCart(product: ProductCardDTO, quantity = 1) {
  if (typeof window === "undefined") return
  const current = getCartItems()
  const existing = current.find((item) => item.id === product.id)

  const nextItems = existing
    ? current.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
      )
    : [
        ...current,
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: quantity,
        },
      ]

  saveCart(nextItems)
}

export function updateCartItemQuantity(id: string, quantity: number) {
  if (typeof window === "undefined") return
  const current = getCartItems()
  const next = current
    .map((item) => (item.id === id ? { ...item, quantity: quantity } : item))
    .filter((item) => item.quantity > 0)
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
  return items.reduce((sum, item) => sum + item.quantity, 0)
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function getCartEventName() {
  return CART_EVENT_NAME
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event(CART_EVENT_NAME))
}
