"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SITE_CONFIG } from "@/config/site"

type FormErrors = Partial<
  Record<"fullName" | "phoneNumber" | "productName" | "referenceUrl", string>
>

export function RequestPageClient() {
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("")
  const [productName, setProductName] = useState("")
  const [brand, setBrand] = useState("")
  const [referenceUrl, setReferenceUrl] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [budget, setBudget] = useState("")
  const [notes, setNotes] = useState("")
  const [hasConsent, setHasConsent] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successCode, setSuccessCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (!fullName.trim()) nextErrors.fullName = "Vui lòng nhập họ và tên."
    if (!/^0\d{9}$/.test(phoneNumber.trim())) nextErrors.phoneNumber = "Số điện thoại không hợp lệ."
    if (!productName.trim()) nextErrors.productName = "Vui lòng nhập tên sản phẩm cần tìm."
    if (referenceUrl.trim() && !/^https?:\/\/\S+$/i.test(referenceUrl.trim())) {
      nextErrors.referenceUrl = "Link chưa đúng định dạng."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSuccessCode("")
    if (!validate() || !hasConsent) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)
    setSuccessCode("KR2481")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] leading-tight font-bold">
              Yêu cầu mỹ phẩm Hàn theo nhu cầu
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Chúng tôi phản hồi trong khoảng {SITE_CONFIG.sourcingResponseTime}. Ưu tiên gửi tên,
              link hoặc ảnh sản phẩm để xử lý nhanh hơn.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[1fr_300px]">
          <form onSubmit={handleSubmit} className="bg-card space-y-4 rounded-xl border p-4">
            <h2 className="text-lg font-semibold">Thông tin sản phẩm cần tìm</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Họ và tên" error={errors.fullName}>
                <Input
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Nhập họ và tên"
                  className="h-11 rounded-lg"
                />
              </Field>
              <Field label="Số điện thoại" error={errors.phoneNumber}>
                <Input
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="Ví dụ: 09xx xxx xxx"
                  className="h-11 rounded-lg"
                />
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email (không bắt buộc)">
                <Input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="email@domain.com"
                  className="h-11 rounded-lg"
                />
              </Field>
              <Field label="Thương hiệu (nếu có)">
                <Input
                  value={brand}
                  onChange={(event) => setBrand(event.target.value)}
                  placeholder="Ví dụ: Laneige"
                  className="h-11 rounded-lg"
                />
              </Field>
            </div>

            <Field label="Tên sản phẩm cần tìm" error={errors.productName}>
              <Input
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                placeholder="Ví dụ: Laneige Cream Skin Refiner"
                className="h-11 rounded-lg"
              />
            </Field>

            <Field label="Link sản phẩm tham khảo" error={errors.referenceUrl}>
              <Input
                value={referenceUrl}
                onChange={(event) => setReferenceUrl(event.target.value)}
                placeholder="Dán link từ website/sàn thương mại điện tử"
                className="h-11 rounded-lg"
              />
            </Field>

            <Field label="Tải ảnh sản phẩm">
              <Input type="file" multiple accept=".jpg,.jpeg,.png" className="h-11 rounded-lg" />
              <p className="text-muted-foreground mt-1 text-xs">
                Bạn có thể tải tối đa 3 ảnh (JPG/PNG).
              </p>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Số lượng dự kiến">
                <Input
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  placeholder="Ví dụ: 2-3 sản phẩm"
                  className="h-11 rounded-lg"
                />
              </Field>
              <Field label="Ngân sách dự kiến">
                <Input
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  placeholder="Ví dụ: 1.000.000đ"
                  className="h-11 rounded-lg"
                />
              </Field>
            </div>

            <Field label="Yêu cầu thêm">
              <Textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Ghi chú thêm về màu sắc, dung tích, ưu tiên giao hàng..."
                rows={4}
              />
            </Field>

            <label className="flex items-start gap-2 rounded-lg border p-3 text-sm">
              <input
                type="checkbox"
                checked={hasConsent}
                onChange={(event) => setHasConsent(event.target.checked)}
                className="mt-0.5"
              />
              Tôi đồng ý để hệ thống xử lý yêu cầu và liên hệ qua số điện thoại/email đã cung cấp.
            </label>

            {!hasConsent && (
              <p className="text-destructive text-xs">
                Vui lòng xác nhận đồng ý trước khi gửi yêu cầu.
              </p>
            )}
            <p className="text-muted-foreground text-xs">
              Chúng tôi phản hồi trong khoảng {SITE_CONFIG.sourcingResponseTime}.
            </p>

            <Button type="submit" className="h-11 w-full rounded-lg" disabled={isLoading}>
              {isLoading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
            </Button>
          </form>

          <aside className="space-y-3">
            <div className="bg-card rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Quy trình xử lý yêu cầu</h2>
              <ol className="text-muted-foreground mt-2 space-y-2 text-sm">
                <li>1. Tiếp nhận thông tin sản phẩm.</li>
                <li>2. Xác nhận báo giá và thời gian dự kiến.</li>
                <li>3. Cập nhật trạng thái qua mã tra cứu.</li>
              </ol>
            </div>
            <div className="bg-card rounded-xl border p-4">
              <h2 className="text-sm font-semibold">Hướng dẫn tra cứu</h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Sau khi gửi thành công, bạn nhận mã tra cứu để theo dõi yêu cầu tại trang Tra cứu.
              </p>
              <Button asChild variant="outline" className="mt-3 h-10 w-full rounded-lg">
                <Link href="/tra-cuu">Đi đến trang tra cứu</Link>
              </Button>
            </div>
            {successCode && (
              <div className="border-primary/20 bg-primary/10 rounded-xl border p-4">
                <p className="text-primary text-sm font-semibold">Gửi yêu cầu thành công.</p>
                <p className="mt-1 text-sm">Mã tra cứu của bạn: #{successCode}.</p>
              </div>
            )}
          </aside>
        </section>
      </main>
      <Footer />
    </div>
  )
}

function Field({ label, children, error }: { label: string; children: ReactNode; error?: string }) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="text-destructive mt-1 text-xs">{error}</p>}
    </div>
  )
}
