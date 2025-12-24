"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Sparkles, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-serif font-bold text-foreground">PureGlow</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <Link href="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Sản phẩm
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Giới thiệu
          </Link>
          <Link href="/faq" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Câu hỏi thường gặp
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
            <Link href="/contact">Liên hệ đặt hàng</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container mx-auto flex flex-col gap-4 px-4 py-6">
            <Link
              href="/"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sản phẩm
            </Link>
            <Link
              href="/about"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            <Link
              href="/faq"
              className="text-base font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Câu hỏi thường gặp
            </Link>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 w-full rounded-full">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Liên hệ đặt hàng
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
