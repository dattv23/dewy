import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categories, featuredProducts } from "@/lib/products"

export const metadata: Metadata = {
  title: "Mỹ phẩm Hàn Quốc chính hãng | Mua nhanh & Gửi yêu cầu sourcing",
  description:
    "Mua mỹ phẩm Hàn có sẵn hoặc gửi yêu cầu tìm sản phẩm theo nhu cầu. Giao diện đặt mua nhanh, tra cứu trạng thái minh bạch.",
}

const faqShort = [
  {
    q: "Không thấy sản phẩm cần mua thì làm sao?",
    a: "Bạn vào trang Yêu cầu mỹ phẩm Hàn và gửi tên/link/ảnh sản phẩm.",
  },
  {
    q: "Bao lâu nhận phản hồi sourcing?",
    a: "Trong khoảng 4-24 giờ làm việc.",
  },
  {
    q: "Làm sao theo dõi đơn hoặc yêu cầu?",
    a: "Dùng mã tra cứu và số điện thoại tại trang Tra cứu.",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-gradient-to-b from-secondary/70 via-background to-background">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-2 md:py-14">
            <div className="space-y-5">
              <Badge className="h-8 rounded-full bg-primary/10 px-3 text-primary hover:bg-primary/10">
                Mua nhanh - Theo dõi minh bạch
              </Badge>
              <h1 className="text-[28px] font-bold leading-[1.25] md:text-[40px] md:leading-[1.2]">
                Mỹ phẩm Hàn phù hợp với bạn, đặt mua nhanh trong vài bước.
              </h1>
              <p className="text-[15px] text-muted-foreground">
                Chọn sản phẩm có sẵn hoặc gửi yêu cầu sourcing mỹ phẩm từ Hàn Quốc. Theo dõi trạng thái minh bạch.
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button asChild className="h-11 rounded-lg">
                  <Link href="/danh-muc/cham-soc-da">
                    Mua theo danh mục <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-11 rounded-lg">
                  <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-card">
              <Image
                src="/hero-natural-cosmetics.jpg"
                alt="Mỹ phẩm Hàn Quốc với các sản phẩm chăm sóc da và trang điểm"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="border-b py-5">
          <div className="mx-auto flex w-full max-w-6xl gap-3 overflow-auto px-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/danh-muc/${category.slug}`}
                className="whitespace-nowrap rounded-full border bg-card px-4 py-2 text-sm text-foreground"
              >
                {category.ten}
              </Link>
            ))}
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-[22px] font-bold leading-[1.35]">Sản phẩm nổi bật</h2>
              <Link href="/danh-muc/cham-soc-da" className="text-sm text-primary hover:underline">
                Xem tất cả
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/40 py-8 md:py-12">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-[22px] font-bold leading-[1.35]">Yêu cầu sourcing trong 3 bước</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                "1. Gửi yêu cầu với tên, link hoặc ảnh sản phẩm.",
                "2. Nhận xác nhận báo giá và thời gian xử lý.",
                "3. Theo dõi trạng thái bằng mã tra cứu.",
              ].map((step) => (
                <div key={step} className="rounded-xl border bg-card p-4">
                  <p className="text-[15px]">{step}</p>
                </div>
              ))}
            </div>
            <Button asChild className="mt-5 h-11 rounded-lg">
              <Link href="/yeu-cau-my-pham-han">Tạo yêu cầu ngay</Link>
            </Button>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-[22px] font-bold leading-[1.35]">Ưu tiên mua nhanh</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                "Da dầu, dễ bí tắc",
                "Da khô, thiếu ẩm",
                "Làm sáng và đều màu",
                "Trang điểm hằng ngày",
              ].map((item) => (
                <Link key={item} href="/danh-muc/cham-soc-da" className="rounded-xl border bg-card p-4 text-sm hover:border-primary">
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t py-8 md:py-12">
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-[22px] font-bold leading-[1.35]">Câu hỏi thường gặp</h2>
            <div className="mt-5 space-y-3">
              {faqShort.map((item) => (
                <div key={item.q} className="rounded-xl border bg-card p-4">
                  <p className="flex items-start gap-2 font-medium">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-primary" />
                    {item.q}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-5 h-11 rounded-lg">
              <Link href="/faq">Xem FAQ đầy đủ</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
