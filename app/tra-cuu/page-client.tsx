"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findTrackingRecord } from "@/lib/tracking"

type TabType = "don_mua" | "yeu_cau"

export function TrackingPageClient() {
  const [tab, setTab] = useState<TabType>("don_mua")
  const [maTraCuu, setMaTraCuu] = useState("")
  const [soDienThoai, setSoDienThoai] = useState("")
  const [error, setError] = useState("")
  const [record, setRecord] = useState<ReturnType<typeof findTrackingRecord> | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    const found = findTrackingRecord(tab, maTraCuu, soDienThoai)
    if (!found) {
      setRecord(null)
      setError("Chưa có kết quả tra cứu. Vui lòng kiểm tra lại mã.")
      return
    }
    setRecord(found)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] font-bold leading-[1.25]">Tra cứu đơn hàng và yêu cầu sourcing</h1>
            <p className="mt-2 text-sm text-muted-foreground">Nhập mã tra cứu và số điện thoại để xem trạng thái mới nhất.</p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[360px_1fr]">
          <form onSubmit={handleSubmit} className="h-fit space-y-4 rounded-xl border bg-card p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={tab === "don_mua" ? "default" : "outline"}
                className="h-10 rounded-lg"
                onClick={() => {
                  setTab("don_mua")
                  setRecord(null)
                }}
              >
                Đơn mua
              </Button>
              <Button
                type="button"
                variant={tab === "yeu_cau" ? "default" : "outline"}
                className="h-10 rounded-lg"
                onClick={() => {
                  setTab("yeu_cau")
                  setRecord(null)
                }}
              >
                Yêu cầu sourcing
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="maTraCuu" className="text-sm font-medium">
                Mã tra cứu
              </label>
              <Input
                id="maTraCuu"
                value={maTraCuu}
                onChange={(event) => setMaTraCuu(event.target.value)}
                placeholder={tab === "don_mua" ? "Ví dụ: DH2481" : "Ví dụ: KR2481"}
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="soDienThoai" className="text-sm font-medium">
                Số điện thoại
              </label>
              <Input
                id="soDienThoai"
                value={soDienThoai}
                onChange={(event) => setSoDienThoai(event.target.value)}
                placeholder="Ví dụ: 09xx xxx xxx"
                className="h-11 rounded-lg"
              />
            </div>

            <Button type="submit" className="h-11 w-full rounded-lg">
              Tra cứu trạng thái
            </Button>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </form>

          <div className="rounded-xl border bg-card p-4">
            {!record ? (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">Chưa có kết quả tra cứu. Vui lòng nhập thông tin ở bên trái.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Cập nhật gần nhất: {record.cap_nhat_luc}</p>
                  <h2 className="text-lg font-semibold">{record.tom_tat}</h2>
                  <p className="text-sm text-muted-foreground">
                    Mã: {record.ma_tra_cuu} · Khách hàng: {record.ten_khach}
                  </p>
                </div>

                <div className="space-y-3">
                  {record.timeline.map((step) => (
                    <div key={`${record.ma_tra_cuu}-${step.label}`} className="flex gap-3">
                      <div className={`mt-1 h-3 w-3 rounded-full ${step.done ? "bg-primary" : "bg-muted"}`} />
                      <div>
                        <p className={`text-sm ${step.done ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                          {step.label}
                        </p>
                        <p className="text-xs text-muted-foreground">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-lg border bg-secondary/40 p-3 text-sm">{record.hanh_dong_tiep_theo}</div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
