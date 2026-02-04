"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"
import { adminMenu } from "@/lib/admin-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {adminMenu.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
              isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              {item.label}
            </span>
            {item.href === "/admin/orders" ? <Badge className="h-5 bg-primary/20 px-1.5 text-primary">42</Badge> : null}
          </Link>
        )
      })}
    </nav>
  )
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8fbf9]">
      <header className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-[1520px] items-center gap-3 px-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-semibold text-foreground">Admin Dewy</p>
                <p className="text-xs text-muted-foreground">Hệ thống vận hành nội bộ</p>
              </div>
              <div className="p-3">
                <Navigation />
              </div>
            </SheetContent>
          </Sheet>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-foreground">Admin Dewy</p>
          </div>

          <div className="relative ml-auto w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="h-9 pl-9" placeholder="Tìm nhanh SKU, mã đơn, SĐT..." />
          </div>

          <Badge variant="secondary" className="hidden h-8 px-2 text-xs sm:inline-flex">
            Trực ca: Suong Nguyen
          </Badge>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-[1520px] gap-4 px-4 py-4 md:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-xl border bg-white p-3 md:block md:sticky md:top-[72px] md:h-[calc(100vh-88px)] md:overflow-auto">
          <Navigation />
        </aside>
        <main>{children}</main>
      </div>
    </div>
  )
}
