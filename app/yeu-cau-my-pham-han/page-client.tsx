"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type FormErrors = Partial<Record<"hoTen" | "soDienThoai" | "tenSanPham" | "linkThamKhao", string>>

export function RequestPageClient() {
  const [hoTen, setHoTen] = useState("")
  const [soDienThoai, setSoDienThoai] = useState("")
  const [email, setEmail] = useState("")
  const [tenSanPham, setTenSanPham] = useState("")
  const [thuongHieu, setThuongHieu] = useState("")
  const [linkThamKhao, setLinkThamKhao] = useState("")
  const [soLuong, setSoLuong] = useState("1")
  const [nganSach, setNganSach] = useState("")
  const [ghiChu, setGhiChu] = useState("")
  const [dongY, setDongY] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [successCode, setSuccessCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const nextErrors: FormErrors = {}
    if (!hoTen.trim()) nextErrors.hoTen = "Vui lòng nhập họ và tên."
    if (!/^0\d{9}$/.test(soDienThoai.trim())) nextErrors.soDienThoai = "Số điện thoại không hợp lệ."
    if (!tenSanPham.trim()) nextErrors.tenSanPham = "Vui lòng nhập tên sản phẩm cần tìm."
    if (linkThamKhao.trim() && !/^https?:\/\/\S+$/i.test(linkThamKhao.trim())) {
      nextErrors.linkThamKhao = "Link chưa đúng định dạng."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setSuccessCode("")
    if (!validate() || !dongY) return
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setIsLoading(false)
    setSuccessCode("KR2481")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] font-bold leading-[1.25]">Yêu cầu mỹ phẩm Hàn theo nhu cầu</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Chúng tôi phản hồi trong khoảng 4-24 giờ làm việc. Ưu tiên gửi tên, link hoặc ảnh sản phẩm để xử lý nhanh hơn.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[1fr_300px]">
          <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-4">
            <h2 className="text-lg font-semibold">Thông tin sản phẩm cần tìm</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Họ và tên" error={errors.hoTen}>
                <Input value={hoTen} onChange={(event) => setHoTen(event.target.value)} placeholder="Nhập họ và tên" className="h-11 rounded-lg" />
              </Field>
              <Field label="Số điện thoại" error={errors.soDienThoai}>
                <Input
                  value={soDienThoai}
                  onChange={(event) => setSoDienThoai(event.target.value)}
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
                  value={thuongHieu}
                  onChange={(event) => setThuongHieu(event.target.value)}
                  placeholder="Ví dụ: Laneige"
                  className="h-11 rounded-lg"
                />
              </Field>
            </div>

            <Field label="Tên sản phẩm cần tìm" error={errors.tenSanPham}>
              <Input
                value={tenSanPham}
                onChange={(event) => setTenSanPham(event.target.value)}
                placeholder="Ví dụ: Laneige Cream Skin Refiner"
                className="h-11 rounded-lg"
              />
            </Field>

            <Field label="Link sản phẩm tham khảo" error={errors.linkThamKhao}>
              <Input
                value={linkThamKhao}
                onChange={(event) => setLinkThamKhao(event.target.value)}
                placeholder="Dán link từ website/sàn thương mại điện tử"
                className="h-11 rounded-lg"
              />
            </Field>

            <Field label="Tải ảnh sản phẩm">
              <Input type="file" multiple accept=".jpg,.jpeg,.png" className="h-11 rounded-lg" />
              <p className="mt-1 text-xs text-muted-foreground">Bạn có thể tải tối đa 3 ảnh (JPG/PNG).</p>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Số lượng dự kiến">
                <Input
                  value={soLuong}
                  onChange={(event) => setSoLuong(event.target.value)}
                  placeholder="Ví dụ: 2-3 sản phẩm"
                  className="h-11 rounded-lg"
                />
              </Field>
              <Field label="Ngân sách dự kiến">
                <Input
                  value={nganSach}
                  onChange={(event) => setNganSach(event.target.value)}
                  placeholder="Ví dụ: 1.000.000đ"
                  className="h-11 rounded-lg"
                />
              </Field>
            </div>

            <Field label="Yêu cầu thêm">
              <Textarea
                value={ghiChu}
                onChange={(event) => setGhiChu(event.target.value)}
                placeholder="Ghi chú thêm về màu sắc, dung tích, ưu tiên giao hàng..."
                rows={4}
              />
            </Field>

            <label className="flex items-start gap-2 rounded-lg border p-3 text-sm">
              <input
                type="checkbox"
                checked={dongY}
                onChange={(event) => setDongY(event.target.checked)}
                className="mt-0.5"
              />
              Tôi đồng ý để hệ thống xử lý yêu cầu và liên hệ qua số điện thoại/email đã cung cấp.
            </label>

            {!dongY && <p className="text-xs text-destructive">Vui lòng xác nhận đồng ý trước khi gửi yêu cầu.</p>}
            <p className="text-xs text-muted-foreground">Chúng tôi phản hồi trong khoảng 4-24 giờ làm việc.</p>

            <Button type="submit" className="h-11 w-full rounded-lg" disabled={isLoading}>
              {isLoading ? "Đang gửi yêu cầu..." : "Gửi yêu cầu"}
            </Button>
          </form>

          <aside className="space-y-3">
            <div className="rounded-xl border bg-card p-4">
              <h2 className="text-sm font-semibold">Quy trình xử lý yêu cầu</h2>
              <ol className="mt-2 space-y-2 text-sm text-muted-foreground">
                <li>1. Tiếp nhận thông tin sản phẩm.</li>
                <li>2. Xác nhận báo giá và thời gian dự kiến.</li>
                <li>3. Cập nhật trạng thái qua mã tra cứu.</li>
              </ol>
            </div>
            <div className="rounded-xl border bg-card p-4">
              <h2 className="text-sm font-semibold">Hướng dẫn tra cứu</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Sau khi gửi thành công, bạn nhận mã tra cứu để theo dõi yêu cầu tại trang Tra cứu.
              </p>
              <Button asChild variant="outline" className="mt-3 h-10 w-full rounded-lg">
                <Link href="/tra-cuu">Đi đến trang tra cứu</Link>
              </Button>
            </div>
            {successCode && (
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
                <p className="text-sm font-semibold text-primary">Gửi yêu cầu thành công.</p>
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

function Field({
  label,
  children,
  error,
}: {
  label: string
  children: ReactNode
  error?: string
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-1">{children}</div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  )
}
