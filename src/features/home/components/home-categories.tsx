import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap } from "lucide-react"
import { categories } from "@/features/products/data/products"

export function HomeCategories() {
  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50/50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6">
          <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
            EXPLORE CATEGORIES
          </span>
          <h2 className="font-serif text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            Danh mục tuyển chọn
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/danh-muc/${category.slug}`}
              className="group bg-card relative overflow-hidden rounded-xl border border-zinc-200/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
            >
              <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-lg bg-zinc-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="flex items-center justify-between text-sm font-bold text-zinc-900 transition-colors group-hover:text-rose-700">
                {category.name}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-2 text-rose-700 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </h3>
              <p className="mt-1 line-clamp-1 text-xs text-zinc-500">{category.description}</p>
            </Link>
          ))}
          <Link
            href="/yeu-cau-my-pham-han"
            className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-rose-200 bg-rose-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-rose-400 hover:shadow-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="rounded bg-rose-200 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-900 uppercase">
                Dịch vụ đặc biệt
              </span>
              <Zap className="h-4 w-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-950 group-hover:text-rose-700">
                Yêu cầu tìm mỹ phẩm Hàn
              </h3>
              <p className="mt-1 text-xs text-rose-800/80">
                Gửi ảnh/link sản phẩm bạn cần, Dewy báo giá tận nơi.
              </p>
            </div>
            <div className="mt-3 flex items-center text-xs font-bold text-rose-900 transition-transform group-hover:translate-x-1">
              Gửi yêu cầu ngay <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
