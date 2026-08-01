"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
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

export function CartPageClient() {
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
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] leading-tight font-bold">Giỏ hàng</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Kiểm tra sản phẩm trước khi chuyển sang thanh toán.
            </p>
          </div>
        </section>

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
                  <article
                    key={item.id}
                    className="bg-card grid grid-cols-[88px_1fr] gap-3 rounded-xl border p-3"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                      <Link
                        href={`/san-pham/${item.slug}`}
                        className="hover:text-primary text-sm font-semibold"
                      >
                        {item.name}
                      </Link>
                      <p className="text-primary text-sm">{formatVnd(item.price)}</p>
                      <div className="flex items-center gap-2">
                        <label htmlFor={`qty-${item.id}`} className="text-muted-foreground text-sm">
                          Số lượng
                        </label>
                        <Input
                          id={`qty-${item.id}`}
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(event) => {
                            const next = Number(event.target.value || 1)
                            updateCartItemQuantity(item.id, Math.max(1, next))
                            setItems(getCartItems())
                          }}
                          className="h-10 w-20 rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-destructive hover:text-destructive h-10 rounded-lg"
                          onClick={() => {
                            removeCartItem(item.id)
                            setItems(getCartItems())
                          }}
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </article>
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
      </main>
      <Footer />
    </div>
  )
}
