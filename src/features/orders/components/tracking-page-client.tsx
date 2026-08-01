"use client"

import { useState } from "react"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findTrackingRecord } from "@/features/orders/tracking"
import type { TrackingType } from "@/types/order"

export function TrackingPageClient() {
  const [tab, setTab] = useState<TrackingType>("order")
  const [trackingCode, setTrackingCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [record, setRecord] = useState<ReturnType<typeof findTrackingRecord> | null>(null)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setError("")
    const found = findTrackingRecord(tab, trackingCode, phoneNumber)
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
        <section className="bg-secondary/30 border-b">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] leading-tight font-bold">
              Tra cứu đơn hàng và tìm theo yêu cầu
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Nhập mã tra cứu và số điện thoại để xem trạng thái mới nhất.
            </p>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-6 md:grid-cols-[360px_1fr]">
          <form onSubmit={handleSubmit} className="bg-card h-fit space-y-4 rounded-xl border p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={tab === "order" ? "default" : "outline"}
                className="h-10 rounded-lg"
                onClick={() => {
                  setTab("order")
                  setRecord(null)
                }}
              >
                Đơn mua
              </Button>
              <Button
                type="button"
                variant={tab === "request" ? "default" : "outline"}
                className="h-10 rounded-lg"
                onClick={() => {
                  setTab("request")
                  setRecord(null)
                }}
              >
                Tìm theo yêu cầu
              </Button>
            </div>

            <div className="space-y-2">
              <label htmlFor="trackingCode" className="text-sm font-medium">
                Mã tra cứu
              </label>
              <Input
                id="trackingCode"
                value={trackingCode}
                onChange={(event) => setTrackingCode(event.target.value)}
                placeholder={tab === "order" ? "Ví dụ: DH2481" : "Ví dụ: KR2481"}
                className="h-11 rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phoneNumber" className="text-sm font-medium">
                Số điện thoại
              </label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Ví dụ: 09xx xxx xxx"
                className="h-11 rounded-lg"
              />
            </div>

            <Button type="submit" className="h-11 w-full rounded-lg">
              Tra cứu trạng thái
            </Button>
            {error && <p className="text-destructive text-sm">{error}</p>}
          </form>

          <div className="bg-card rounded-xl border p-4">
            {!record ? (
              <div className="py-10 text-center">
                <p className="text-muted-foreground text-sm">
                  Chưa có kết quả tra cứu. Vui lòng nhập thông tin ở bên trái.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm">
                    Cập nhật gần nhất: {record.updatedAt}
                  </p>
                  <h2 className="text-lg font-semibold">{record.summary}</h2>
                  <p className="text-muted-foreground text-sm">
                    Mã: {record.trackingCode} · Khách hàng: {record.customerName}
                  </p>
                </div>

                <div className="space-y-3">
                  {record.timeline.map((step) => (
                    <div key={`${record.trackingCode}-${step.label}`} className="flex gap-3">
                      <div
                        className={`mt-1 h-3 w-3 rounded-full ${step.done ? "bg-primary" : "bg-muted"}`}
                      />
                      <div>
                        <p
                          className={`text-sm ${step.done ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                        >
                          {step.label}
                        </p>
                        <p className="text-muted-foreground text-xs">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-secondary/40 rounded-lg border p-3 text-sm">
                  {record.nextAction}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
