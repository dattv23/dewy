import Link from "next/link"
import { Button } from "@/components/ui/button"

export function FAQContactCard() {
  return (
    <section className="border-t py-8">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="bg-card rounded-xl border p-5">
          <h2 className="text-lg font-semibold">Chưa thấy câu trả lời?</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Gửi yêu cầu, chúng tôi sẽ phản hồi theo nhu cầu thực tế của bạn.
          </p>
          <Button asChild className="mt-4 h-11 rounded-lg">
            <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
