import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Heart, Users, Leaf, Target, Award, TrendingUp, ArrowRight } from "lucide-react"
import Image from "next/image"

const values = [
  {
    icon: Leaf,
    title: "Thành phần thiên nhiên",
    description: "Ưu tiên chiết xuất hữu cơ và thuần khiết, an toàn và hiệu quả cho làn da của bạn.",
  },
  {
    icon: Heart,
    title: "Kiểm nghiệm da liễu",
    description: "Tất cả sản phẩm được kiểm tra bởi các chuyên gia da liễu để đảm bảo an toàn và phù hợp.",
  },
  {
    icon: Users,
    title: "Không thử nghiệm động vật",
    description: "Cam kết không thử nghiệm trên động vật và ưu tiên công thức thuần chay, thân thiện.",
  },
  {
    icon: Award,
    title: "Hiệu quả rõ rệt",
    description: "Tập trung vào kết quả chăm sóc da thấy rõ sau 2-4 tuần sử dụng đều đặn.",
  },
]

const milestones = [
  {
    year: "2018",
    title: "Dewy ra đời",
    description: "Khởi đầu với sứ mệnh mang đến giải pháp chăm sóc da hiệu quả và dễ tiếp cận cho mọi người",
  },
  {
    year: "2020",
    title: "Mở rộng danh mục",
    description: "Phát triển bộ sưu tập mỹ phẩm hữu cơ chăm sóc da, trang điểm và cơ thể",
  },
  {
    year: "2022",
    title: "10.000+ khách hàng",
    description: "Đạt cột mốc đồng hành cùng hàng nghìn khách hàng trên hành trình chăm sóc da",
  },
  {
    year: "2024",
    title: "Nâng cấp tư vấn",
    description: "Ra mắt quy trình tư vấn dựa trên loại da và nhu cầu cá nhân hóa",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
                  Về Dewy
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  Chúng tôi mang trong mình sứ mệnh giúp việc chăm sóc da trở nên dễ dàng, hiệu quả và hợp túi tiền hơn.
                  Dewy mang đến bộ sưu tập mỹ phẩm hữu cơ, chăm sóc da sạch và tự nhiên cho làn da rạng rỡ.
                </p>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">
                    Liên hệ với chúng tôi <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                <Image
                  src="/about-us-team.jpg"
                  alt="Đội ngũ Dewy"
                  width={600}
                  height={600}
                  className="rounded-2xl object-cover shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="pt-12 pb-12 space-y-6">
                  <div className="flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <Target className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">Sứ mệnh của chúng tôi</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                      Trao quyền cho mỗi cá nhân chăm sóc làn da khỏe đẹp bằng mỹ phẩm hữu cơ, an toàn và hiệu quả. Chúng
                      tôi tin rằng quy trình chăm sóc đúng cách sẽ tạo nên vẻ rạng rỡ và sự tự tin bền vững.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Giá trị cốt lõi
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Những nguyên tắc dẫn lối mọi hoạt động của Dewy trong lĩnh vực mỹ phẩm hữu cơ
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value, index) => (
                <Card key={index} className="text-center border-none shadow-sm">
                  <CardContent className="pt-8 pb-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                        <value.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Hành trình của chúng tôi
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Từ khởi đầu khiêm tốn đến đồng hành cùng hàng nghìn khách hàng yêu mỹ phẩm sạch
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="border-border overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex gap-6 items-start">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                          <span className="text-xl font-bold text-primary">{milestone.year}</span>
                        </div>
                        <div className="space-y-2 flex-1">
                          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                            {milestone.title}
                            {index === milestones.length - 1 && <TrendingUp className="h-5 w-5 text-primary" />}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">10K+</p>
                <p className="text-lg text-primary-foreground/90">Khách hàng hài lòng</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">100+</p>
                <p className="text-lg text-primary-foreground/90">Mỹ phẩm hữu cơ</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">5K+</p>
                <p className="text-lg text-primary-foreground/90">Đánh giá 5 sao</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">100%</p>
                <p className="text-lg text-primary-foreground/90">Không thử nghiệm động vật</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Đồng hành cùng Dewy trên hành trình làm đẹp tự nhiên
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Sẵn sàng nâng cấp chu trình chăm sóc da? Khám phá sản phẩm hoặc liên hệ Dewy để được tư vấn & đặt hàng.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/products">Xem sản phẩm</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Liên hệ</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
