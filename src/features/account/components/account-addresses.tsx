import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AccountSectionHeading } from "@/features/account/components/account-section-heading"

export function AccountAddresses() {
  return (
    <>
      <AccountSectionHeading
        eyebrow="Giao nhận"
        title="Sổ địa chỉ"
        description="Địa chỉ giao hàng của bạn sẽ được quản lý tại đây."
      />
      <Card className="rounded-2xl border-zinc-200/80 shadow-[0_18px_60px_rgba(24,24,27,0.04)]">
        <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
          <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-rose-50 text-rose-900 ring-8 ring-rose-50/40">
            <MapPin className="size-6" strokeWidth={1.5} />
          </div>
          <h2 className="font-semibold">Chưa có địa chỉ đã lưu</h2>
          <p className="text-muted-foreground mt-2 max-w-md text-sm">
            Địa chỉ sẽ được lưu khi tính năng quản lý thông tin giao hàng được kết nối.
          </p>
        </CardContent>
      </Card>
    </>
  )
}
