"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cartCount, getCartEventName, getCartItems } from "@/features/cart/cart-store"
import { WEBSITE_NAVIGATION } from "@/config/navigation"
import { ROUTES } from "@/constants/routes"
import { SITE_CONFIG } from "@/config/site"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [count, setCount] = useState(0)

  useEffect(() => {
    const updateCount = () => setCount(cartCount(getCartItems()))
    updateCount()

    window.addEventListener("storage", updateCount)
    window.addEventListener(getCartEventName(), updateCount)
    return () => {
      window.removeEventListener("storage", updateCount)
      window.removeEventListener(getCartEventName(), updateCount)
    }
  }, [])

  const searchHref = `${ROUTES.defaultCategory}?q=${encodeURIComponent(search.trim())}`

  return (
    <>
      {/* Announcement Bar - VIUS Editorial Style */}
      <div className="flex items-center justify-center gap-2 overflow-hidden bg-zinc-900 px-4 py-2 text-center text-xs font-medium tracking-wide text-zinc-100">
        <span className="bg-accent text-accent-foreground rounded px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
          Seoul Direct
        </span>
        <span>
          ✈️ Hàng sẵn tại Hàn - Ship siêu tốc | 🎁 Đăng ký tài khoản nhận ngay Voucher 50K
        </span>
      </div>

      <header className="bg-background/90 sticky top-0 z-50 border-b border-zinc-200/80 shadow-[0_1px_4px_rgba(24,24,27,0.04)] backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-zinc-200 md:hidden"
            aria-label="Mở menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link
            href="/"
            className="text-primary shrink-0 font-serif text-2xl font-bold tracking-tight uppercase"
          >
            {SITE_CONFIG.name}
          </Link>

          <form action={searchHref} className="mx-auto hidden max-w-md flex-1 md:block">
            <div className="relative">
              <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                name="q"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Tìm serum, son tint, kem dưỡng nội địa Hàn..."
                className="bg-secondary/50 focus:bg-background h-10 rounded-full border-transparent pr-4 pl-10 text-sm transition-all focus:border-zinc-300"
              />
            </div>
          </form>

          <nav className="hidden items-center gap-6 md:flex">
            {WEBSITE_NAVIGATION.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-tight text-zinc-700 transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            variant="ghost"
            className="hover:bg-accent/60 relative ml-auto h-10 w-10 shrink-0 rounded-full p-0 md:ml-0"
          >
            <Link href="/gio-hang" aria-label="Giỏ hàng">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>

        {mobileOpen && (
          <div className="bg-background animate-in slide-in-from-top-2 border-t duration-200 md:hidden">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
              <form action={searchHref}>
                <div className="relative">
                  <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <Input
                    name="q"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Tìm sản phẩm..."
                    className="h-11 rounded-lg pl-10 text-[15px]"
                  />
                </div>
              </form>
              {WEBSITE_NAVIGATION.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:bg-secondary rounded-lg px-2 py-2 text-[15px] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  )
}
