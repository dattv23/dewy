"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Search, ShoppingBag, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cartCount, getCartEventName, getCartItems } from "@/lib/cart"

const navItems = [
  { href: "/", label: "Trang chủ" },
  { href: "/danh-muc/cham-soc-da", label: "Danh mục" },
  { href: "/yeu-cau-my-pham-han", label: "Yêu cầu mỹ phẩm Hàn" },
  { href: "/tra-cuu", label: "Tra cứu" },
  { href: "/faq", label: "FAQ" },
]

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

  const searchHref = `/danh-muc/cham-soc-da?q=${encodeURIComponent(search.trim())}`

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4">
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border md:hidden"
          aria-label="Mở menu"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <Link href="/" className="shrink-0 text-lg font-semibold text-foreground">
          Dewy Korea
        </Link>

        <form action={searchHref} className="hidden flex-1 md:block">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Tìm theo tên sản phẩm, công dụng, thương hiệu..."
              className="h-11 rounded-lg pl-10 text-[15px]"
            />
          </div>
        </form>

        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-muted-foreground hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <Button asChild variant="ghost" className="relative h-11 w-11 rounded-lg p-0">
          <Link href="/gio-hang" aria-label="Giỏ hàng">
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4">
            <form action={searchHref}>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  name="q"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Tìm theo tên sản phẩm, công dụng..."
                  className="h-11 rounded-lg pl-10 text-[15px]"
                />
              </div>
            </form>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-[15px] text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
