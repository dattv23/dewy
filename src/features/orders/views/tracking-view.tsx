"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { findTrackingRecord } from "@/features/orders/tracking"
import type { TrackingType } from "@/types/order"
import { PageIntro } from "@/components/website/page-intro"
import { TrackingResult } from "@/features/orders/components/tracking-result"

export function TrackingView() {
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
    <div>
      <PageIntro
        title="Tra cứu đơn hàng và tìm theo yêu cầu"
        description="Nhập mã tra cứu và số điện thoại để xem trạng thái mới nhất."
      />

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

        <TrackingResult record={record ?? undefined} />
      </section>
    </div>
  )
}
