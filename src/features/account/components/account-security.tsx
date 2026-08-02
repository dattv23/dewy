import { Clock3, LogOut, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AccountInfoItem } from "@/features/account/components/account-info-item"
import { AccountSectionHeading } from "@/features/account/components/account-section-heading"
import type { AuthSession } from "@/types/auth"

type AccountSecurityProps = {
  user: AuthSession | null
  isLoading: boolean
  onLogout: () => Promise<void>
}

export function AccountSecurity({ user, isLoading, onLogout }: AccountSecurityProps) {
  return (
    <>
      <AccountSectionHeading
        eyebrow="Bảo mật"
        title="Đăng nhập & bảo mật"
        description="Kiểm tra phiên đăng nhập và chủ động đăng xuất khi cần."
      />
      {isLoading ? (
        <div className="bg-muted h-48 animate-pulse rounded-xl border" />
      ) : (
        <SecurityContent user={user} onLogout={onLogout} />
      )}
    </>
  )
}

function SecurityContent({
  user,
  onLogout,
}: {
  user: AuthSession | null
  onLogout: () => Promise<void>
}) {
  if (!user) {
    return (
      <Card className="shadow-none">
        <CardContent>
          <p className="text-muted-foreground text-sm">
            Bạn cần đăng nhập để xem thông tin bảo mật.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border-zinc-200/80 shadow-[0_18px_60px_rgba(24,24,27,0.04)]">
      <CardContent className="space-y-5">
        <AccountInfoItem icon={<Mail />} label="Email đăng nhập" value={user.email} />
        <AccountInfoItem
          icon={<Clock3 />}
          label="Phiên hiện tại"
          value={`Có hiệu lực đến ${new Date(user.expiresAt).toLocaleString("vi-VN")}`}
        />
        <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Đăng xuất khỏi thiết bị này</p>
            <p className="text-muted-foreground mt-1 text-xs">
              Bạn sẽ cần đăng nhập lại để tiếp tục.
            </p>
          </div>
          <Button type="button" variant="outline" onClick={() => void onLogout()} className="h-11">
            <LogOut /> Đăng xuất
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
