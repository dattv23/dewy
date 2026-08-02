import { PackageSearch } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { findTrackingRecord } from "@/features/orders/tracking"

type TrackingRecord = ReturnType<typeof findTrackingRecord>

export function TrackingResult({ record }: { record: TrackingRecord | null }) {
  return (
    <Card className="min-h-72 gap-5 rounded-2xl border-zinc-200/80 shadow-[0_14px_44px_rgba(24,24,27,0.04)]">
      <CardHeader>
        <CardTitle>Kết quả tra cứu</CardTitle>
        <CardDescription>
          {record
            ? `Cập nhật gần nhất: ${record.updatedAt}`
            : "Trạng thái mới nhất sẽ hiển thị tại đây."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!record ? <EmptyTrackingResult /> : <TrackingTimeline record={record} />}
      </CardContent>
    </Card>
  )
}

function EmptyTrackingResult() {
  return (
    <div className="bg-muted/60 flex min-h-32 flex-col items-center justify-center rounded-lg px-4 text-center">
      <PackageSearch className="text-muted-foreground mb-3 size-7" />
      <p className="text-muted-foreground text-sm">Chưa có kết quả tra cứu.</p>
    </div>
  )
}

function TrackingTimeline({ record }: { record: NonNullable<TrackingRecord> }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-semibold">{record.summary}</h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Mã: {record.trackingCode} · Khách hàng: {record.customerName}
        </p>
      </div>
      <ol className="space-y-3">
        {record.timeline.map((step) => (
          <li key={`${record.trackingCode}-${step.label}`} className="flex gap-3">
            <span
              className={`mt-1.5 size-3 shrink-0 rounded-full ${step.done ? "bg-primary" : "bg-muted"}`}
            />
            <div>
              <p className={step.done ? "text-sm font-semibold" : "text-muted-foreground text-sm"}>
                {step.label}
              </p>
              <p className="text-muted-foreground text-xs">{step.time}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="bg-secondary/40 rounded-lg border p-3 text-sm">{record.nextAction}</p>
    </div>
  )
}
