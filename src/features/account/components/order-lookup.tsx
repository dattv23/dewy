"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AccountSectionHeading } from "@/features/account/components/account-section-heading"
import { TrackingResult } from "@/features/account/components/tracking-result"
import { findTrackingRecord } from "@/features/orders/tracking"
import type { TrackingType } from "@/types/order"

export function OrderLookup() {
  const [trackingType, setTrackingType] = useState<TrackingType>("order")
  const [trackingCode, setTrackingCode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [record, setRecord] = useState<ReturnType<typeof findTrackingRecord> | null>(null)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = findTrackingRecord(trackingType, trackingCode, phoneNumber)
    setRecord(result)
    setError(result ? "" : "Chưa có kết quả. Vui lòng kiểm tra lại mã và số điện thoại.")
  }

  function selectTrackingType(type: TrackingType) {
    setTrackingType(type)
    setRecord(null)
    setError("")
  }

  return (
    <>
      <AccountSectionHeading
        eyebrow="Đơn hàng"
        title="Đơn hàng của tôi"
        description="Theo dõi hành trình đơn mua hoặc yêu cầu tìm sản phẩm của bạn."
      />
      <div className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <Card className="h-fit gap-5 rounded-2xl border-zinc-200/80 shadow-[0_14px_44px_rgba(24,24,27,0.04)]">
          <CardHeader>
            <CardTitle>Tra cứu trạng thái</CardTitle>
            <CardDescription>Nhập đúng thông tin đã dùng khi đặt hàng.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 rounded-xl bg-zinc-100 p-1">
                <Button
                  type="button"
                  variant={trackingType === "order" ? "default" : "outline"}
                  className="border-0 shadow-none"
                  onClick={() => selectTrackingType("order")}
                >
                  Đơn mua
                </Button>
                <Button
                  type="button"
                  variant={trackingType === "request" ? "default" : "outline"}
                  className="border-0 shadow-none"
                  onClick={() => selectTrackingType("request")}
                >
                  Tìm theo yêu cầu
                </Button>
              </div>
              <div className="space-y-2">
                <label htmlFor="account-tracking-code" className="text-sm font-medium">
                  Mã tra cứu
                </label>
                <Input
                  id="account-tracking-code"
                  value={trackingCode}
                  onChange={(event) => setTrackingCode(event.target.value)}
                  placeholder={trackingType === "order" ? "Ví dụ: DH2481" : "Ví dụ: KR2481"}
                  required
                  className="h-11 rounded-lg bg-white"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="account-phone-number" className="text-sm font-medium">
                  Số điện thoại
                </label>
                <Input
                  id="account-phone-number"
                  value={phoneNumber}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  placeholder="Ví dụ: 09xx xxx xxx"
                  required
                  className="h-11 rounded-lg bg-white"
                />
              </div>
              <Button type="submit" className="h-11 w-full rounded-lg">
                Tra cứu trạng thái
              </Button>
              {error && (
                <p role="alert" className="text-destructive text-sm">
                  {error}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
        <TrackingResult record={record} />
      </div>
    </>
  )
}
