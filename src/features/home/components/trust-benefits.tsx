import { Headphones, RotateCcw, ShieldCheck, Truck, type LucideIcon } from "lucide-react"

const benefits: Array<{ icon: LucideIcon; title: string; description: string }> = [
  {
    icon: ShieldCheck,
    title: "100% Chính Hãng",
    description: "Cam kết nguồn gốc nội địa Hàn Quốc rõ ràng.",
  },
  {
    icon: Truck,
    title: "Vận Chuyển Siêu Tốc",
    description: "Đóng gói chuẩn bảo quản, giao nhanh toàn quốc.",
  },
  {
    icon: RotateCcw,
    title: "Đổi Trả Dễ Dàng",
    description: "Hỗ trợ nhanh chóng nếu sản phẩm có lỗi từ nhà sản xuất.",
  },
  {
    icon: Headphones,
    title: "Tư Vấn 24/7",
    description: "Giải đáp thắc mắc và hỗ trợ chọn sản phẩm phù hợp.",
  },
]

export function TrustBenefits() {
  return (
    <section className="border-t border-zinc-200/80 bg-zinc-50 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="space-y-2 p-2">
              <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-zinc-900">{title}</h3>
              <p className="text-xs text-zinc-500">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
