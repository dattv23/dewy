import { Check, MapPin, Phone, RefreshCw, UserRound } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AccountSectionHeading } from "@/features/account/components/account-section-heading"
import type { CustomerAddress } from "@/types/customer"

type AccountAddressesProps = {
  addresses: CustomerAddress[]
  isLoading: boolean
  hasError: boolean
  onRetry: () => void
}

export function AccountAddresses({
  addresses,
  isLoading,
  hasError,
  onRetry,
}: AccountAddressesProps) {
  return (
    <>
      <AccountSectionHeading
        eyebrow="Giao nhận"
        title="Sổ địa chỉ"
        description="Địa chỉ giao hàng của bạn sẽ được quản lý tại đây."
      />
      {isLoading ? (
        <div className="space-y-3" aria-label="Đang tải sổ địa chỉ">
          {[1, 2].map((item) => (
            <div key={item} className="bg-muted h-44 animate-pulse rounded-2xl border" />
          ))}
        </div>
      ) : hasError ? (
        <Alert className="rounded-2xl border-amber-200 bg-amber-50/70 py-5">
          <RefreshCw />
          <AlertTitle>Chưa tải được sổ địa chỉ</AlertTitle>
          <AlertDescription>
            <p>Vui lòng kiểm tra kết nối và thử lại.</p>
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
      ) : addresses.length > 0 ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard key={address.id} address={address} />
          ))}
        </div>
      ) : (
        <Card className="rounded-2xl border-zinc-200/80 shadow-[0_18px_60px_rgba(24,24,27,0.04)]">
          <CardContent className="flex min-h-72 flex-col items-center justify-center text-center">
            <div className="mb-5 flex size-16 items-center justify-center rounded-full bg-rose-50 text-rose-900 ring-8 ring-rose-50/40">
              <MapPin className="size-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-semibold">Chưa có địa chỉ đã lưu</h2>
            <p className="text-muted-foreground mt-2 max-w-md text-sm">
              Địa chỉ giao hàng đã lưu sẽ xuất hiện tại đây.
            </p>
          </CardContent>
        </Card>
      )}
    </>
  )
}

function AddressCard({ address }: { address: CustomerAddress }) {
  const locality = [address.wardName, address.districtName, address.provinceName]
    .filter(Boolean)
    .join(", ")

  return (
    <Card className="gap-0 rounded-2xl border-zinc-200/80 py-0 shadow-[0_12px_40px_rgba(24,24,27,0.04)]">
      <CardContent className="p-5 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-900">
              <MapPin className="size-4.5" />
            </div>
            <p className="truncate font-semibold">{address.recipientName}</p>
          </div>
          {address.defaultAddress && (
            <Badge className="shrink-0 bg-emerald-50 text-emerald-800 hover:bg-emerald-50">
              <Check /> Mặc định
            </Badge>
          )}
        </div>
        <div className="space-y-2.5 text-sm text-zinc-700">
          <p className="flex gap-2.5">
            <UserRound className="mt-0.5 size-4 shrink-0 text-zinc-400" />
            {address.addressLine}
          </p>
          {locality && <p className="pl-6.5 text-zinc-600">{locality}</p>}
          <p className="flex gap-2.5">
            <Phone className="mt-0.5 size-4 shrink-0 text-zinc-400" />
            {address.recipientPhone}
          </p>
          {address.postalCode && (
            <p className="pl-6.5 text-xs text-zinc-500">Mã bưu chính: {address.postalCode}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
