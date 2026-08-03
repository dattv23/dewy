import type { TrackingRecord } from "@/types/order"

export function TrackingResult({ record }: { record?: TrackingRecord }) {
  return (
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
            <p className="text-muted-foreground text-sm">Cập nhật gần nhất: {record.updatedAt}</p>
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
          <div className="bg-secondary/40 rounded-lg border p-3 text-sm">{record.nextAction}</div>
        </div>
      )}
    </div>
  )
}
