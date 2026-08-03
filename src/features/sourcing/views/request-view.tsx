"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SITE_CONFIG } from "@/config/site"
import { PageIntro } from "@/components/website/page-intro"
import { RequestField as Field } from "@/features/sourcing/components/request-field"
import { RequestGuidance } from "@/features/sourcing/components/request-guidance"

type FormErrors = Partial<
  Record<"fullName" | "phoneNumber" | "productName" | "referenceUrl", string>
>

export function RequestView() {
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
    <div>
      <PageIntro
        title="Yêu cầu mỹ phẩm Hàn theo nhu cầu"
        description={
          <>
            Chúng tôi phản hồi trong khoảng {SITE_CONFIG.sourcingResponseTime}. Ưu tiên gửi tên,
            link hoặc ảnh sản phẩm để xử lý nhanh hơn.
          </>
        }
      />

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

        <RequestGuidance successCode={successCode} />
      </section>
    </div>
  )
}
