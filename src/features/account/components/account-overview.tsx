import Link from "next/link"
import { Check, Hash, LogIn, Mail, Phone, RefreshCw, ShieldCheck, UserRound } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ROUTES } from "@/constants/routes"
import { AccountInfoItem } from "@/features/account/components/account-info-item"
import { AccountSectionHeading } from "@/features/account/components/account-section-heading"
import type { AuthSession } from "@/types/auth"
import type { CustomerProfile } from "@/types/customer"

type AccountOverviewProps = {
  user: AuthSession | null
  profile: CustomerProfile | null
  isLoading: boolean
  hasError: boolean
  onRetry: () => void
}

export function AccountOverview({
  user,
  profile,
  isLoading,
  hasError,
  onRetry,
}: AccountOverviewProps) {
  if (isLoading) {
    return (
      <div
        className="bg-muted h-64 animate-pulse rounded-xl border"
        aria-label="Đang tải thông tin tài khoản"
      />
    )
  }

  if (!user) return <SignedOutAccount />

  if (hasError || !profile) {
    return <ProfileError onRetry={onRetry} />
  }

  return (
    <div className="space-y-6">
      <AccountSectionHeading
        eyebrow="Tổng quan"
        title={`Xin chào, ${profile.fullName}`}
        description="Rất vui được gặp lại bạn. Dưới đây là thông tin tài khoản hiện tại."
      />
      <Card className="relative gap-0 overflow-hidden rounded-2xl border-zinc-200/80 py-0 shadow-[0_18px_60px_rgba(24,24,27,0.055)]">
        <div className="h-1 bg-rose-900" />
        <CardHeader className="border-b bg-[#fffdfc] px-5 py-6 sm:px-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-rose-100 text-rose-900 shadow-sm">
                <UserRound className="size-7" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <CardTitle className="truncate font-serif text-xl">{profile.fullName}</CardTitle>
                <CardDescription className="mt-1">
                  Mã khách hàng: {profile.publicId}
                </CardDescription>
              </div>
            </div>
            <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-800">
              <Check className="size-3.5" /> {getStatusLabel(profile.status)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-5 py-6 sm:px-7 sm:py-7">
          <p className="mb-4 text-[11px] font-semibold tracking-[0.16em] text-zinc-500 uppercase">
            Thông tin cá nhân
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <AccountInfoItem icon={<Mail />} label="Email" value={profile.email} />
            <AccountInfoItem
              icon={<Phone />}
              label="Số điện thoại"
              value={profile.phone || "Chưa cập nhật"}
            />
            <AccountInfoItem icon={<Hash />} label="Mã hồ sơ" value={profile.publicId} />
            <AccountInfoItem
              icon={<ShieldCheck />}
              label="Loại tài khoản"
              value={user.role === "ADMIN" ? "Quản trị viên" : "Khách hàng"}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function getStatusLabel(status: string) {
  return status.toUpperCase() === "ACTIVE" ? "Đang hoạt động" : status || "Đã xác thực"
}

function ProfileError({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert className="rounded-2xl border-amber-200 bg-amber-50/70 py-5">
      <RefreshCw />
      <AlertTitle>Chưa tải được hồ sơ</AlertTitle>
      <AlertDescription>
        <p>Kết nối tới dịch vụ hồ sơ đang gián đoạn. Thông tin đăng nhập của bạn vẫn an toàn.</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="mt-2 bg-white"
        >
          <RefreshCw /> Thử lại
        </Button>
      </AlertDescription>
    </Alert>
  )
}

function SignedOutAccount() {
  return (
    <Card className="max-w-2xl rounded-2xl border-zinc-200/80 shadow-[0_18px_60px_rgba(24,24,27,0.055)]">
      <CardHeader>
        <CardTitle>Bạn chưa đăng nhập</CardTitle>
        <CardDescription>
          Đăng nhập để xem thông tin tài khoản và sử dụng hồ sơ của bạn.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 sm:flex-row">
        <Button asChild className="h-11">
          <Link href={`${ROUTES.login}?next=${ROUTES.account}`}>
            <LogIn /> Đăng nhập
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-11">
          <Link href={ROUTES.register}>Tạo tài khoản</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
