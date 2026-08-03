"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cartSubtotal, clearCart, getCartItems } from "@/features/cart/cart-store"
import { calculateShipping } from "@/config/commerce"
import { PageIntro } from "@/components/website/page-intro"
import { CheckoutSummary } from "@/features/checkout/components/checkout-summary"
import { CheckoutSuccess } from "@/features/checkout/components/checkout-success"

export function CheckoutView() {
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
    <div>
      <PageIntro
        title="Thanh toán"
        description="Điền thông tin nhận hàng và xác nhận đơn trong một lần."
      />

      {submitted ? (
        <CheckoutSuccess />
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

          <CheckoutSummary subtotal={subtotal} shipping={shipping} total={total} />
        </section>
      )}
    </div>
  )
}
