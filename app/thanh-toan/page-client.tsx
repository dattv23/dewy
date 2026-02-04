"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cartSubtotal, clearCart, getCartItems } from "@/lib/cart"
import { formatVnd } from "@/lib/products"

export function CheckoutClient() {
  const [hoTen, setHoTen] = useState("")
  const [soDienThoai, setSoDienThoai] = useState("")
  const [diaChi, setDiaChi] = useState("")
  const [ghiChu, setGhiChu] = useState("")
  const [thanhToan, setThanhToan] = useState("cod")
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const cartItems = useMemo(() => getCartItems(), [submitted])
  const subtotal = cartSubtotal(cartItems)
  const shipping = subtotal >= 700000 || subtotal === 0 ? 0 : 25000
  const total = subtotal + shipping

  const isPhoneValid = /^0\d{9}$/.test(soDienThoai.trim())
  const canSubmit = hoTen.trim().length > 1 && isPhoneValid && diaChi.trim().length > 5 && cartItems.length > 0

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
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] font-bold leading-[1.25]">Thanh toán</h1>
            <p className="mt-2 text-sm text-muted-foreground">Điền thông tin nhận hàng và xác nhận đơn trong một lần.</p>
          </div>
        </section>

        {submitted ? (
          <section className="mx-auto w-full max-w-3xl px-4 py-10">
            <div className="rounded-xl border bg-card p-6 text-center">
              <p className="text-lg font-semibold text-primary">Đặt hàng thành công</p>
              <p className="mt-2 text-sm text-muted-foreground">Mã tra cứu đơn của bạn: DH2481</p>
              <p className="mt-2 text-sm text-muted-foreground">Vui lòng dùng mã và số điện thoại để theo dõi trạng thái.</p>
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
            <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-4">
              <h2 className="text-lg font-semibold">Thông tin nhận hàng</h2>
              <div className="space-y-2">
                <label htmlFor="hoTen" className="text-sm font-medium">
                  Họ và tên
                </label>
                <Input
                  id="hoTen"
                  placeholder="Nhập họ và tên"
                  value={hoTen}
                  onChange={(event) => setHoTen(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="soDienThoai" className="text-sm font-medium">
                  Số điện thoại
                </label>
                <Input
                  id="soDienThoai"
                  placeholder="Ví dụ: 09xx xxx xxx"
                  value={soDienThoai}
                  onChange={(event) => setSoDienThoai(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
                {soDienThoai.length > 0 && !isPhoneValid && (
                  <p className="text-xs text-destructive">Số điện thoại không hợp lệ.</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="diaChi" className="text-sm font-medium">
                  Địa chỉ nhận hàng
                </label>
                <Input
                  id="diaChi"
                  placeholder="Nhập địa chỉ nhận hàng"
                  value={diaChi}
                  onChange={(event) => setDiaChi(event.target.value)}
                  className="h-11 rounded-lg"
                  required
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Phương thức thanh toán</p>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="thanhToan"
                    value="cod"
                    checked={thanhToan === "cod"}
                    onChange={(event) => setThanhToan(event.target.value)}
                  />
                  Thanh toán khi nhận hàng
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="thanhToan"
                    value="bank"
                    checked={thanhToan === "bank"}
                    onChange={(event) => setThanhToan(event.target.value)}
                  />
                  Chuyển khoản ngân hàng
                </label>
              </div>
              <div className="space-y-2">
                <label htmlFor="ghiChu" className="text-sm font-medium">
                  Ghi chú
                </label>
                <Textarea
                  id="ghiChu"
                  rows={4}
                  placeholder="Yêu cầu thêm (nếu có)"
                  value={ghiChu}
                  onChange={(event) => setGhiChu(event.target.value)}
                />
              </div>
              <Button type="submit" className="h-11 w-full rounded-lg" disabled={!canSubmit || isLoading}>
                {isLoading ? "Đang xử lý..." : "Xác nhận đặt hàng"}
              </Button>
            </form>

            <aside className="h-fit rounded-xl border bg-card p-4">
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
              <p className="mt-3 text-xs text-muted-foreground">Đơn hàng sẽ được xác nhận sau khi bạn bấm "Xác nhận đặt hàng".</p>
            </aside>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
