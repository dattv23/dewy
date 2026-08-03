import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeHero() {
  return (
    <section className="to-background relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-rose-50/50 via-zinc-50/40 py-10 md:py-16 lg:py-20">
      <div className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 md:grid-cols-12 md:gap-8">
        <div className="space-y-6 md:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-semibold text-rose-900 shadow-xs">
            <Sparkles className="size-3.5 text-rose-600" />
            <span>SEOUL EDITORIAL COLLECTION 2026</span>
          </div>
          <h1 className="font-serif text-3xl leading-[1.18] font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
            Vẻ đẹp tinh tế từ Hàn Quốc, <br className="hidden sm:inline" />
            <span className="bg-linear-to-r from-zinc-900 via-rose-950 to-rose-800 bg-clip-text text-transparent">
              chọn mua nhanh & minh bạch.
            </span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
            Khám phá bộ sưu tập mỹ phẩm & thời trang tuyển chọn trực tiếp từ Seoul. Mua hàng sẵn có
            hoặc gửi yêu cầu tìm sản phẩm nội địa theo ý muốn.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
            <Button
              asChild
              className="h-12 rounded-full bg-zinc-900 px-7 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all hover:scale-[1.02] hover:bg-zinc-800"
            >
              <Link href="/danh-muc/cham-soc-da">
                Khám phá bộ sưu tập <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-zinc-300 bg-white/80 px-6 text-sm font-semibold text-zinc-800 backdrop-blur-md transition-all hover:bg-zinc-100"
            >
              <Link href="/yeu-cau-my-pham-han">
                <Zap className="mr-2 h-4 w-4 fill-amber-500 text-amber-500" />
                Gửi yêu cầu tìm sản phẩm
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-zinc-200/60 pt-4 text-zinc-800">
            <div>
              <p className="font-serif text-xl font-bold text-zinc-900">100%</p>
              <p className="text-xs text-zinc-500">Chính hãng Korea</p>
            </div>
            <div>
              <p className="font-serif text-xl font-bold text-zinc-900">4h - 24h</p>
              <p className="text-xs text-zinc-500">Phản hồi báo giá</p>
            </div>
          </div>
        </div>
        <div className="relative md:col-span-5">
          <div className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-white/80 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            <Image
              src="/hero-natural-cosmetics.jpg"
              alt="Mỹ phẩm và thời trang Hàn Quốc"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/5" />
            <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-white/85 p-3.5 shadow-lg backdrop-blur-md">
              <div>
                <span className="block text-[10px] font-bold tracking-widest text-rose-800 uppercase">
                  SEOUL CONCIERGE
                </span>
                <p className="text-xs font-semibold text-zinc-900">
                  Nhận đặt mua mỹ phẩm Hàn theo yêu cầu
                </p>
              </div>
              <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
