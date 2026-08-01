"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cartSubtotal, clearCart, getCartItems } from "@/features/cart/cart-store"
import { formatVnd } from "@/features/products/data/products"
import { calculateShipping } from "@/config/commerce"

export function CheckoutClient() {
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [address, setAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cartItems = useMemo(() => getCartItems(), [])
  const subtotal = cartSubtotal(cartItems)
  const shipping = calculateShipping(subtotal)
  const total = subtotal + shipping

  const isPhoneValid = /^0\d{9}$/.test(phoneNumber.trim())
  const canSubmit =
    fullName.trim().length > 1 && isPhoneValid && address.trim().length > 5 && cartItems.length > 0

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!canSubmit) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setIsLoading(false)
    setSubmitted(true)
    clearCart()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] leading-tight font-bold">Thanh toán</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Điền thông tin nhận hàng và xác nhận đơn trong một lần.
            </p>
          </div>
        </section>

        {submitted ? (
          <section className="mx-auto w-full max-w-3xl px-4 py-10">
            <div className="bg-card rounded-xl border p-6 text-center">
              <p className="text-primary text-lg font-semibold">Đặt hàng thành công</p>
              <p className="text-muted-foreground mt-2 text-sm">Mã tra cứu đơn của bạn: DH2481</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Vui lòng dùng mã và số điện thoại để theo dõi trạng thái.
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Button asChild className="h-11 rounded-lg">
                  <Link href="/tra-cuu">Tra cứu đơn hàng</Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-lg">
                  <Link href="/danh-muc/cham-soc-da">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[1fr_320px]">
            <form onSubmit={handleSubmit} className="bg-card space-y-4 rounded-xl border p-4">
              <h2 className="text-lg font-semibold">Thông tin nhận hàng</h2>
              <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium">
                  Họ và tên
                </label>
                <Input
                  id="fullName"
                  placeholder="Nhập họ và tên"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-sm font-medium">
                  Số điện thoại
                </label>
                <Input
                  id="phoneNumber"
                  placeholder="Ví dụ: 09xx xxx xxx"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
                {phoneNumber.length > 0 && !isPhoneValid && (
                  <p className="text-destructive text-xs">Số điện thoại không hợp lệ.</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium">
                  Địa chỉ nhận hàng
                </label>
                <Input
                  id="address"
                  placeholder="Nhập địa chỉ nhận hàng"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Phương thức thanh toán</p>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Thanh toán khi nhận hàng
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                  />
                  Chuyển khoản ngân hàng
                </label>
              </div>
              <div className="space-y-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Ghi chú
                </label>
                <Textarea
                  id="notes"
                  rows={4}
                  placeholder="Yêu cầu thêm (nếu có)"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="h-11 w-full rounded-lg"
                disabled={!canSubmit || isLoading}
              >
                {isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </Button>
            </form>

            <aside className="bg-card h-fit rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Tóm tắt thanh toán</h2>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatVnd(subtotal)}</span>
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
              <p className="text-muted-foreground mt-3 text-xs">
                Đơn hàng sẽ được xác nhận sau khi bạn bấm &quot;Xác nhận đặt hàng&quot;.
              </p>
            </aside>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
