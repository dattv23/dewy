"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  cartSubtotal,
  clearCart,
  getCartEventName,
  getCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "@/features/cart/cart-store"
import type { CartItem } from "@/types/cart"
import { formatVnd } from "@/features/products/data/products"
import { calculateShipping } from "@/config/commerce"
import { PageIntro } from "@/components/website/page-intro"
import { CartItemCard } from "@/features/cart/components/cart-item-card"

export function CartView() {
  const [items, setItems] = useState<CartItem[]>([])
  const [coupon, setCoupon] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)

  useEffect(() => {
    const refresh = () => setItems(getCartItems())
    refresh()
    window.addEventListener(getCartEventName(), refresh)
    return () => window.removeEventListener(getCartEventName(), refresh)
  }, [])

  const subtotal = useMemo(() => cartSubtotal(items), [items])
  const discount = couponApplied ? Math.round(subtotal * 0.05) : 0
  const shipping = calculateShipping(subtotal)
  const total = subtotal - discount + shipping

  return (
    <div>
      <PageIntro
        title="Giỏ hàng"
        description="Kiểm tra sản phẩm trước khi chuyển sang thanh toán."
      />

      <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="bg-card rounded-xl border p-6 text-center">
              <p className="text-[15px] font-medium">Chưa có sản phẩm trong giỏ hàng.</p>
              <Button asChild className="mt-4 h-11 rounded-lg">
                <Link href="/danh-muc/cham-soc-da">Mua theo danh mục</Link>
              </Button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={(quantity) => {
                    updateCartItemQuantity(item.id, quantity)
                    setItems(getCartItems())
                  }}
                  onRemove={() => {
                    removeCartItem(item.id)
                    setItems(getCartItems())
                  }}
                />
              ))}
              <Button
                type="button"
                variant="ghost"
                className="text-muted-foreground h-11 rounded-lg"
                onClick={() => {
                  clearCart()
                  setItems([])
                }}
              >
                Xóa toàn bộ giỏ hàng
              </Button>
            </>
          )}
        </div>

        <aside className="bg-card h-fit rounded-xl border p-4">
          <p className="text-sm font-semibold">Tóm tắt đơn</p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Tạm tính</span>
              <span>{formatVnd(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Giảm giá</span>
              <span>-{formatVnd(discount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Phí vận chuyển</span>
              <span>{shipping === 0 ? "Miễn phí" : formatVnd(shipping)}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>Tổng cộng</span>
                <span className="text-primary">{formatVnd(total)}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="coupon" className="text-sm font-medium">
              Mã giảm giá (nếu có)
            </label>
            <div className="flex gap-2">
              <Input
                id="coupon"
                placeholder="Nhập mã"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                className="h-10 rounded-lg"
              />
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-lg"
                onClick={() => setCouponApplied(coupon.trim().toUpperCase() === "DEWY5")}
              >
                Áp dụng
              </Button>
            </div>
            {couponApplied && <p className="text-primary text-xs">Đã áp dụng mã giảm 5%.</p>}
          </div>

          <Button asChild className="mt-4 h-11 w-full rounded-lg" disabled={items.length === 0}>
            <Link href="/thanh-toan">Tiếp tục thanh toán</Link>
          </Button>
        </aside>
      </section>
    </div>
  )
}
