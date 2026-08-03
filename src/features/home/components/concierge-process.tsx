import Link from "next/link"
import { Button } from "@/components/ui/button"

const steps = [
  {
    step: "01",
    title: "Gửi thông tin sản phẩm",
    description: "Điền tên sản phẩm, đính kèm đường link hoặc hình ảnh bạn cần mua từ Hàn Quốc.",
  },
  {
    step: "02",
    title: "Nhận báo giá minh bạch",
    description:
      "Dewy xác nhận tình trạng hàng tại Seoul và gửi báo giá kèm thời gian giao hàng dự kiến (4-24h).",
  },
  {
    step: "03",
    title: "Theo dõi hành trình",
    description:
      "Nhận mã tra cứu để chủ động kiểm tra trạng thái xử lý và quá trình vận chuyển tận tay.",
  },
]

export function ConciergeProcess() {
  return (
    <section className="bg-secondary/40 border-y border-zinc-200/80 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
            DỊCH VỤ MINH BẠCH
          </span>
          <h2 className="font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
            Đặt mua sản phẩm Hàn theo yêu cầu trong 3 bước
          </h2>
          <p className="text-sm text-zinc-600">
            Gửi tên, hình ảnh hoặc link sản phẩm bạn đang tìm kiếm, Dewy sẽ kiểm tra và phản hồi báo
            giá chi tiết.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <article
              key={item.step}
              className="group bg-card relative rounded-2xl border border-zinc-200/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 font-serif text-xs font-bold text-white">
                {item.step}
              </span>
              <h3 className="mt-4 text-base font-bold text-zinc-900">{item.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
          <Button
            asChild
            className="h-11 rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white shadow-md hover:bg-zinc-800"
          >
            <Link href="/yeu-cau-my-pham-han">Tạo yêu cầu tìm sản phẩm ngay</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-zinc-300 px-6 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
          >
            <Link href="/tra-cuu">Tra cứu tiến độ đơn hàng</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
