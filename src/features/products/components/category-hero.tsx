import Image from "next/image"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import type { Category } from "@/types/category"

export function CategoryHero({ category }: { category: Category }) {
  return (
    <section className="border-b border-zinc-200/70 bg-[#f7f4f2]">
      <div className="relative min-h-80 overflow-hidden bg-zinc-950 sm:min-h-105">
        <Image
          src={category.imageUrl!}
          alt={`Bộ sưu tập ${category.name}`}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/45 to-black/10" />
        <div className="relative z-10 mx-auto flex min-h-80 w-full max-w-6xl flex-col justify-end px-4 py-8 text-white sm:min-h-105 sm:py-12">
          <p className="mb-auto flex items-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-white/75 uppercase sm:text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Tuyển chọn bởi Dewy
          </p>
          <p className="mb-3 text-xs text-white/70 sm:text-sm">
            <Link href="/" className="transition-colors hover:text-white">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            {category.name}
          </p>
          <h1 className="max-w-2xl font-serif text-4xl leading-tight font-medium tracking-tight sm:text-6xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
            {category.description}
          </p>
        </div>
      </div>
    </section>
  )
}
