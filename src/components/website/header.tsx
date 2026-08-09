"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import {
  ChevronRight,
  Gift,
  LogOut,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandMark } from "@/components/brand-mark"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ROUTES } from "@/constants/routes"
import { SITE_CONFIG } from "@/config/site"
import { cartCount, getCartEventName, getCartItems } from "@/features/cart/cart-store"
import { useSession } from "@/features/auth/hooks/use-session"
import type { AuthSession } from "@/types/auth"
import type { Category } from "@/types/category"
import { cn } from "@/lib/utils"

const HEADER_COLLAPSE_THRESHOLD = 144
const HEADER_EXPAND_THRESHOLD = 24

const serviceLinks = [
  { href: ROUTES.sourcingRequest, label: "Đặt hàng theo yêu cầu", highlighted: true },
  { href: ROUTES.tracking, label: "Tra cứu đơn hàng", highlighted: false },
  { href: ROUTES.faq, label: "Hỗ trợ", highlighted: false },
] as const

function getCategoryHref(slug: string) {
  return `/danh-muc/${slug}`
}

function isPathActive(pathname: string, href: string) {
  return pathname === href || (href !== ROUTES.home && pathname.startsWith(href))
}

function useCartCount() {
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

  return count
}

function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false)
  const scrolledRef = useRef(false)

  useEffect(() => {
    let animationFrame: number | null = null

    const updateScrolledState = () => {
      animationFrame = null

      const shouldBeScrolled = scrolledRef.current
        ? window.scrollY > HEADER_EXPAND_THRESHOLD
        : window.scrollY > HEADER_COLLAPSE_THRESHOLD

      if (shouldBeScrolled === scrolledRef.current) return

      scrolledRef.current = shouldBeScrolled
      setScrolled(shouldBeScrolled)
    }

    const handleScroll = () => {
      if (animationFrame !== null) return
      animationFrame = window.requestAnimationFrame(updateScrolledState)
    }

    updateScrolledState()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame)
    }
  }, [])

  return scrolled
}

function AnnouncementBar() {
  return (
    <aside className="relative z-50 overflow-hidden bg-zinc-950 text-white" aria-label="Ưu đãi">
      <div className="mx-auto flex h-8 max-w-360 items-center justify-center px-4 text-center text-[10px] font-medium tracking-[0.08em] sm:text-[11px]">
        <Gift className="mr-2 size-3.5 shrink-0 text-rose-300" aria-hidden="true" />
        <p className="truncate">
          ƯU ĐÃI THÀNH VIÊN MỚI <span className="mx-1 text-rose-300">•</span> Tặng voucher 50K cho
          đơn đầu tiên
        </p>
        <Link
          href={ROUTES.register}
          className="ml-3 hidden shrink-0 border-b border-white/70 leading-5 transition-colors hover:border-rose-300 hover:text-rose-200 sm:inline"
        >
          Đăng ký ngay
        </Link>
      </div>
    </aside>
  )
}

type SearchBoxProps = {
  compact?: boolean
  onSubmit?: () => void
}

function SearchBox({ compact = false, onSubmit }: SearchBoxProps) {
  return (
    <form action={ROUTES.defaultCategory} className="w-full" onSubmit={onSubmit} role="search">
      <label className="relative block">
        <span className="sr-only">Tìm kiếm sản phẩm</span>
        <Input
          name="q"
          type="search"
          placeholder={
            compact ? "Tìm kiếm sản phẩm..." : "Tìm mỹ phẩm, áo, quần hoặc thương hiệu..."
          }
          className="h-11 rounded-none border-0 border-b border-zinc-300 bg-transparent pr-11 pl-0 text-sm shadow-none transition-colors placeholder:text-zinc-400 hover:border-zinc-500 focus-visible:border-zinc-950 focus-visible:ring-0"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-0 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          aria-label="Tìm kiếm"
        >
          <Search className="size-4.75" strokeWidth={1.7} />
        </button>
      </label>
    </form>
  )
}

function Brand({ compact }: { compact: boolean }) {
  return (
    <Link
      href={ROUTES.home}
      className="group flex items-center justify-center justify-self-center text-zinc-950"
      aria-label={`${SITE_CONFIG.name} - Trang chủ`}
    >
      <BrandMark
        className={cn(
          "size-10 transition-transform duration-200 group-hover:scale-105 lg:size-12",
          compact && "size-9 lg:size-10",
        )}
        priority
      />
    </Link>
  )
}

type AuthActionsProps = {
  user: AuthSession | null
  isSessionLoading: boolean
  onLogout: () => Promise<void>
}

function AccountActions({
  cartItemsCount,
  user,
  isSessionLoading,
  onLogout,
}: AuthActionsProps & { cartItemsCount: number }) {
  return (
    <div className="flex items-center justify-end gap-0.5 lg:gap-1">
      <Button
        asChild
        variant="ghost"
        className="relative h-11 min-w-11 rounded-full px-2.5 font-normal hover:bg-zinc-100 lg:px-3"
      >
        <Link href={ROUTES.cart} aria-label={`Giỏ hàng, ${cartItemsCount} sản phẩm`}>
          <ShoppingBag className="size-5" strokeWidth={1.6} />
          <span className="hidden text-xs lg:inline">Giỏ hàng</span>
          {cartItemsCount > 0 && <CartBadge count={cartItemsCount} />}
        </Link>
      </Button>

      <Button
        asChild
        variant="ghost"
        className="hidden h-11 rounded-full px-3 font-normal hover:bg-zinc-100 sm:inline-flex"
      >
        <Link
          href={user ? ROUTES.account : ROUTES.login}
          aria-label={user ? "Mở hồ sơ của bạn" : "Đăng nhập hoặc đăng ký tài khoản"}
        >
          <UserRound className="size-5" strokeWidth={1.6} />
          <span className="hidden max-w-28 truncate text-xs lg:inline">
            {user?.fullName ?? (isSessionLoading ? "Đang tải..." : "Tài khoản")}
          </span>
        </Link>
      </Button>

      {user && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => void onLogout()}
          className="hidden rounded-full sm:inline-flex"
          aria-label="Đăng xuất"
        >
          <LogOut className="size-4" />
        </Button>
      )}
    </div>
  )
}

function CartBadge({ count }: { count: number }) {
  return (
    <span className="absolute top-0.5 right-0 inline-flex min-h-4 min-w-4 items-center justify-center rounded-full bg-rose-800 px-1 text-[9px] font-bold text-white lg:-right-0.5">
      {count > 99 ? "99+" : count}
    </span>
  )
}

function MobileMenu({
  pathname,
  categories,
  user,
  isSessionLoading,
  onLogout,
}: { pathname: string; categories: Category[] } & AuthActionsProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="inline-flex size-11 items-center justify-center rounded-full text-zinc-900 transition-colors hover:bg-zinc-100"
            aria-label="Mở menu chính"
          >
            <Menu className="size-5.5" strokeWidth={1.6} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[88%] max-w-100 gap-0 border-0 bg-[#fcfbfa] p-0">
          <MobileMenuHeader />
          <div className="border-b border-zinc-200 px-6 py-4">
            <SearchBox compact onSubmit={() => setOpen(false)} />
          </div>
          <MobileMenuNavigation pathname={pathname} categories={categories} />
          <MobileAuthActions user={user} isSessionLoading={isSessionLoading} onLogout={onLogout} />
        </SheetContent>
      </Sheet>
    </div>
  )
}

function MobileMenuHeader() {
  return (
    <SheetHeader className="border-b border-zinc-200 px-6 py-5 text-left">
      <SheetTitle className="font-serif text-2xl tracking-[0.16em] uppercase">
        {SITE_CONFIG.name}
      </SheetTitle>
      <SheetDescription className="text-xs tracking-wide">
        Beauty & Fashion tuyển chọn từ Seoul
      </SheetDescription>
    </SheetHeader>
  )
}

function MobileMenuNavigation({
  pathname,
  categories,
}: {
  pathname: string
  categories: Category[]
}) {
  return (
    <nav className="flex-1 overflow-y-auto px-6 py-5" aria-label="Menu trên thiết bị di động">
      <MobileMenuSectionLabel>Mua sắm theo danh mục</MobileMenuSectionLabel>
      {categories.map((category) => {
        const href = getCategoryHref(category.slug)
        return (
          <SheetClose asChild key={category.slug}>
            <Link
              href={href}
              aria-current={isPathActive(pathname, href) ? "page" : undefined}
              className={`flex min-h-12 items-center justify-between border-b border-zinc-200/70 text-[15px] transition-colors ${
                isPathActive(pathname, href)
                  ? "font-semibold text-rose-800"
                  : "text-zinc-900 hover:text-rose-800"
              }`}
            >
              {category.name}
              <ChevronRight className="size-4 text-zinc-400" />
            </Link>
          </SheetClose>
        )
      })}

      <MobileMenuSectionLabel className="mt-7">Dịch vụ Dewy</MobileMenuSectionLabel>
      {serviceLinks.map((item) => (
        <SheetClose asChild key={item.href}>
          <Link
            href={item.href}
            className={`flex min-h-12 items-center gap-2 border-b border-zinc-200/70 text-[15px] transition-colors hover:text-rose-800 ${
              item.highlighted ? "font-semibold text-rose-800" : "text-zinc-900"
            }`}
          >
            {item.highlighted && <Sparkles className="size-4" />}
            {item.label}
          </Link>
        </SheetClose>
      ))}
    </nav>
  )
}

function MobileMenuSectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`mb-2 text-[10px] font-semibold tracking-[0.18em] text-zinc-500 uppercase ${className}`}
    >
      {children}
    </p>
  )
}

function MobileAuthActions({ user, isSessionLoading, onLogout }: AuthActionsProps) {
  if (user) {
    return (
      <div className="border-t border-zinc-200 bg-white px-6 py-5">
        <SheetClose asChild>
          <Link
            href={ROUTES.account}
            className="focus-visible:ring-ring block rounded-lg focus-visible:ring-2"
          >
            <p className="truncate text-sm font-semibold text-zinc-950">{user.fullName}</p>
            <p className="mb-3 truncate text-xs text-zinc-500">{user.email}</p>
          </Link>
        </SheetClose>
        <Button type="button" variant="outline" className="w-full" onClick={() => void onLogout()}>
          <LogOut className="size-4" />
          Đăng xuất
        </Button>
      </div>
    )
  }

  return (
    <div className="border-t border-zinc-200 bg-white px-6 py-5">
      <div className="grid grid-cols-2 gap-3">
        <SheetClose asChild>
          <Link
            href={ROUTES.login}
            className="inline-flex h-11 items-center justify-center border border-zinc-300 text-sm font-semibold transition-colors hover:bg-zinc-100"
          >
            {isSessionLoading ? "Đang tải..." : "Đăng nhập"}
          </Link>
        </SheetClose>
        <SheetClose asChild>
          <Link
            href={ROUTES.register}
            className="inline-flex h-11 items-center justify-center bg-zinc-950 text-sm font-semibold text-white transition-colors hover:bg-rose-950"
          >
            Đăng ký
          </Link>
        </SheetClose>
      </div>
    </div>
  )
}

type HeaderMainRowProps = {
  cartItemsCount: number
  pathname: string
  compact: boolean
  categories: Category[]
} & AuthActionsProps

function HeaderMainRow({
  cartItemsCount,
  pathname,
  compact,
  categories,
  user,
  isSessionLoading,
  onLogout,
}: HeaderMainRowProps) {
  return (
    <div
      className={`mx-auto grid w-full max-w-360 grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 transition-[height] duration-300 sm:px-6 lg:px-10 ${
        compact ? "h-16 lg:h-18" : "h-17 lg:h-24"
      }`}
    >
      <MobileMenu
        pathname={pathname}
        categories={categories}
        user={user}
        isSessionLoading={isSessionLoading}
        onLogout={onLogout}
      />
      <div className="hidden max-w-100 lg:block">
        <SearchBox />
      </div>
      <Brand compact={compact} />
      <AccountActions
        cartItemsCount={cartItemsCount}
        user={user}
        isSessionLoading={isSessionLoading}
        onLogout={onLogout}
      />
    </div>
  )
}

function DesktopNavigation({
  pathname,
  hidden,
  categories,
}: {
  pathname: string
  hidden: boolean
  categories: Category[]
}) {
  return (
    <div
      className={`hidden overflow-hidden border-t border-zinc-100 transition-[height,opacity] duration-300 lg:block ${
        hidden ? "h-0 opacity-0" : "h-13 opacity-100"
      }`}
    >
      <div className="mx-auto flex h-13 max-w-360 items-center justify-between px-10">
        <DesktopCategoryNavigation pathname={pathname} categories={categories} />
        <DesktopServiceNavigation />
      </div>
    </div>
  )
}

function DesktopCategoryNavigation({
  pathname,
  categories,
}: {
  pathname: string
  categories: Category[]
}) {
  return (
    <nav className="flex h-full items-center gap-8" aria-label="Danh mục sản phẩm">
      {categories.map((category) => {
        const href = getCategoryHref(category.slug)
        const active = isPathActive(pathname, href)
        return (
          <Link
            key={category.slug}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`relative flex h-full items-center text-xs font-semibold tracking-[0.08em] uppercase transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:bg-rose-800 after:transition-transform ${
              active
                ? "text-rose-800 after:scale-x-100"
                : "text-zinc-800 after:scale-x-0 hover:text-rose-800 hover:after:scale-x-100"
            }`}
          >
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}

function DesktopServiceNavigation() {
  return (
    <nav className="flex h-full items-center gap-7" aria-label="Dịch vụ khách hàng">
      {serviceLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex h-full items-center gap-1.5 text-xs font-semibold tracking-[0.06em] uppercase transition-colors hover:text-rose-800 ${
            item.highlighted ? "text-rose-800" : "text-zinc-700"
          }`}
        >
          {item.highlighted && <Sparkles className="size-3.5" />}
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

function MobileCategoryNavigation({
  pathname,
  categories,
}: {
  pathname: string
  categories: Category[]
}) {
  return (
    <div className="border-t border-zinc-100 bg-white lg:hidden">
      <nav
        className="category-scrollbar flex h-12 snap-x snap-proximity items-stretch gap-7 overflow-x-auto overscroll-x-contain scroll-smooth px-8"
        aria-label="Danh mục sản phẩm nhanh"
      >
        {categories.map((category) => {
          const href = getCategoryHref(category.slug)
          const active = isPathActive(pathname, href)
          return (
            <Link
              key={category.slug}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`relative flex shrink-0 snap-start items-center text-[12px] font-semibold tracking-wide whitespace-nowrap transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:bg-rose-800 after:transition-transform ${
                active
                  ? "text-rose-800 after:scale-x-100"
                  : "text-zinc-800 after:scale-x-0 hover:text-rose-800"
              }`}
            >
              {category.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}

function CartCountAnnouncement({ count }: { count: number }) {
  return (
    <div className="sr-only" aria-live="polite">
      Giỏ hàng hiện có {count} sản phẩm
    </div>
  )
}

export function Header({ categories }: { categories: Category[] }) {
  const pathname = usePathname()
  const cartItemsCount = useCartCount()
  const scrolled = useHeaderScrolled()
  const { user, isLoading: isSessionLoading, logout } = useSession()

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? "border-zinc-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]" : "border-zinc-100"
        }`}
      >
        <HeaderMainRow
          cartItemsCount={cartItemsCount}
          pathname={pathname}
          compact={scrolled}
          categories={categories}
          user={user}
          isSessionLoading={isSessionLoading}
          onLogout={logout}
        />
        <DesktopNavigation pathname={pathname} hidden={scrolled} categories={categories} />
        <MobileCategoryNavigation pathname={pathname} categories={categories} />
      </header>
      <CartCountAnnouncement count={cartItemsCount} />
    </>
  )
}
