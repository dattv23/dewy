import Link from "next/link"
import { CheckCircle2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const questions = [
  {
    question: "Không thấy sản phẩm cần mua trên trang thì làm sao?",
    answer:
      "Bạn chỉ cần gửi tên, link hoặc ảnh sản phẩm tại trang 'Yêu cầu mỹ phẩm Hàn'. Dewy sẽ check kho tại Hàn Quốc và báo giá minh bạch cho bạn.",
  },
  {
    question: "Bao lâu tôi nhận được báo giá cho yêu cầu tìm mỹ phẩm?",
    answer:
      "Đội ngũ Dewy tại Seoul & Việt Nam sẽ phản hồi chi tiết giá và thời gian xử lý trong khoảng 4 đến 24 giờ làm việc.",
  },
  {
    question: "Làm sao để tôi kiểm tra hành trình vận chuyển đơn hàng?",
    answer:
      "Bạn chỉ cần nhập mã tra cứu và số điện thoại tại trang Tra Cứu để xem tiến độ cập nhật minh bạch theo thời gian thực.",
  },
]

export function HomeFAQ() {
  return (
    <section className="border-t border-zinc-200/80 py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
              FAQ & SUPPORT
            </span>
            <h2 className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
              Câu hỏi thường gặp
            </h2>
          </div>
          <Search className="hidden h-6 w-6 text-zinc-400 sm:block" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {questions.map((item) => (
            <article
              key={item.question}
              className="bg-card space-y-2 rounded-2xl border border-zinc-200/80 p-6 shadow-xs"
            >
              <h3 className="flex items-start gap-2 text-sm leading-snug font-bold text-zinc-900">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                {item.question}
              </h3>
              <p className="pl-6 text-xs leading-relaxed text-zinc-600">{item.answer}</p>
            </article>
          ))}
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-8 h-11 rounded-full border-zinc-300 px-6 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
        >
          <Link href="/faq">Xem thêm danh sách FAQ đầy đủ</Link>
        </Button>
      </div>
    </section>
  )
}
