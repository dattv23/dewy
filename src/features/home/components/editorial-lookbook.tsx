import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const stories = [
  {
    href: "/danh-muc/cham-soc-da",
    image: "/category-skincare.jpg",
    label: "SKINCARE TREND",
    title: "Glass Skin & Phục hồi hàng rào ẩm",
    description:
      "Bí quyết sở hữu làn da căng bóng mịn màng chuẩn Hàn với Ceramide & Hyaluronic Acid.",
    action: "Khám phá dòng Skincare",
    color: "rose",
  },
  {
    href: "/danh-muc/trang-diem",
    image: "/category-makeup.jpg",
    label: "MAKEUP STYLE",
    title: "Daily Makeup Trong Trẻo",
    description:
      "Son tint tự nhiên, kẹp mi cong nhẹ cùng lớp nền mỏng như sương cho vẻ ngoài rạng rỡ.",
    action: "Xem sản phẩm trang điểm",
    color: "amber",
  },
  {
    href: "/yeu-cau-my-pham-han",
    image: "/category-bodycare.jpg",
    label: "DIRECT CONCIERGE",
    title: "Sản Phẩm Đặt Tìm Theo Yêu Cầu",
    description:
      "Không tìm thấy món đồ yêu thích? Dewy hỗ trợ gom order trực tiếp từ store Hàn Quốc.",
    action: "Tạo đơn tìm sản phẩm",
    color: "emerald",
  },
] as const

const accent = { rose: "text-rose-300", amber: "text-amber-300", emerald: "text-emerald-300" }

export function EditorialLookbook() {
  return (
    <section className="overflow-hidden bg-zinc-900 py-12 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-10 max-w-xl space-y-2 text-center">
          <span className="text-[10px] font-bold tracking-widest text-rose-400 uppercase">
            SEOUL EDITORIAL LOOKBOOK
          </span>
          <h2 className="font-serif text-2xl font-bold text-zinc-50 sm:text-3xl">
            Xu Hướng & Phong Cách Hàn Quốc
          </h2>
          <p className="text-xs text-zinc-400 sm:text-sm">
            Cập nhật quy trình skincare & trang điểm tự nhiên đang tạo cơn sốt tại Seoul
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.title}
              href={story.href}
              className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
            >
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="relative z-10 space-y-2">
                <span
                  className={`text-[10px] font-bold tracking-wider uppercase ${accent[story.color]}`}
                >
                  {story.label}
                </span>
                <h3 className="font-serif text-lg font-bold text-white">{story.title}</h3>
                <p className="line-clamp-2 text-xs text-zinc-300">{story.description}</p>
                <span
                  className={`inline-flex items-center pt-1 text-xs font-semibold group-hover:text-white ${accent[story.color]}`}
                >
                  {story.action}
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
