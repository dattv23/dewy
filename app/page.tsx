import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ShieldCheck, Sparkles, Leaf, Award, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import { featuredProducts } from "@/lib/products"

const features = [
  {
    icon: Leaf,
    title: "Thành Phần Thiên Nhiên",
    description: "Chiết xuất từ thực vật hữu cơ, an toàn và hiệu quả cho làn da của bạn",
  },
  {
    icon: ShieldCheck,
    title: "Kiểm Nghiệm Bởi Bác Sĩ Da Liễu",
    description: "Tất cả sản phẩm đều được kiểm tra và phê duyệt bởi các bác sĩ da liễu chứng nhận",
  },
  {
    icon: Award,
    title: "Không Thử Nghiệm Trên Động Vật",
    description: "Chúng tôi cam kết không thử nghiệm trên động vật và chỉ sử dụng thành phần thuần chay",
  },
  {
    icon: Sparkles,
    title: "Hiệu Quả Rõ Rệt",
    description: "Thấy sự cải thiện rõ ràng trên làn da chỉ sau 2-4 tuần sử dụng đều đặn",
  },
]

const testimonials = [
  {
    name: "Nguyễn Thị Hương",
    rating: 5,
    text: "Làn da tôi chưa bao giờ đẹp đến thế! Serum Vitamin C thực sự tuyệt vời. Tôi rất thích cách họ phản hồi nhanh chóng.",
    avatar: "/diverse-woman-avatar.png",
    result: "Da sáng hơn, đều màu",
  },
  {
    name: "Trần Văn Minh",
    rating: 5,
    text: "Cuối cùng cũng tìm được sản phẩm thiên nhiên thực sự hiệu quả. Da nhạy cảm của tôi rất thích công thức dịu nhẹ này.",
    avatar: "/man-avatar.png",
    result: "Giảm mẩn đỏ & kích ứng",
  },
  {
    name: "Lê Thị Mai",
    rating: 5,
    text: "Quy trình đặt hàng rất dễ dàng và email xác nhận siêu nhanh. Những sản phẩm này xứng đáng từng đồng!",
    avatar: "/professional-woman-avatar.png",
    result: "Da ẩm mượt, rạng rỡ",
  },
]

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/30">
          <div className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <Badge
                  className="bg-primary/10 text-primary border-primary/20 rounded-full px-4 py-1"
                  variant="outline"
                >
                  100% Thiên Nhiên & Hữu Cơ
                </Badge>
                <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-tight">
                  Vẻ Đẹp Tự Nhiên Bắt Đầu Từ Làn Da Khỏe Mạnh
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto lg:mx-0">
                  Trải nghiệm sức mạnh kỳ diệu của thiên nhiên với bộ sưu tập mỹ phẩm hữu cơ, chăm sóc da sạch và tự
                  nhiên của chúng tôi. Thành phần thuần khiết cho làn da rạng rỡ và khỏe mạnh.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full shadow-lg"
                  >
                    <Link href="/contact">
                      Liên hệ để được tư vấn & đặt hàng <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                    <Link href="/products">Khám phá sản phẩm</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                <Image
                  src="/hero-natural-cosmetics.jpg"
                  alt="Mỹ phẩm và chăm sóc da tự nhiên"
                  width={600}
                  height={600}
                  className="rounded-3xl object-cover shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-3">
              <Link href="/products?category=skincare" className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-all rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/category-skincare.jpg"
                      alt="Sản phẩm chăm sóc da"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">Chăm Sóc Da</h3>
                  </div>
                </Card>
              </Link>
              <Link href="/products?category=makeup" className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-all rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/category-makeup.jpg"
                      alt="Sản phẩm trang điểm"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">Trang Điểm</h3>
                  </div>
                </Card>
              </Link>
              <Link href="/products?category=bodycare" className="group">
                <Card className="overflow-hidden hover:shadow-lg transition-all rounded-2xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src="/category-bodycare.jpg"
                      alt="Sản phẩm chăm sóc cơ thể"
                      width={400}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">
                      Chăm Sóc Cơ Thể
                    </h3>
                  </div>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Sản Phẩm Bán Chạy
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Những sản phẩm làm đẹp tự nhiên được yêu thích nhất cho làn da rạng rỡ và khỏe mạnh
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl transition-all rounded-2xl border-none shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden">
                    {product.discount && (
                      <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground rounded-full font-semibold">
                        Giảm {product.discount}%
                      </Badge>
                    )}
                    <Badge className="absolute top-3 right-3 z-10 bg-primary text-primary-foreground rounded-full">
                      {product.tag}
                    </Badge>
                    <Image
                      src={product.image || "/placeholder.svg?height=400&width=400&query=natural cosmetics product"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground text-balance leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">{product.skinType}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                    <div className="space-y-1 pt-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {product.discountedPrice.toLocaleString("vi-VN")}₫
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString("vi-VN")}₫
                        </span>
                      </div>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full group bg-transparent rounded-full hover:bg-primary hover:text-primary-foreground"
                    >
                      <Link href={`/products/${product.id}`}>
                        Xem chi tiết
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg" variant="outline" className="rounded-full bg-transparent">
                <Link href="/products">Xem tất cả sản phẩm</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-muted/50 to-accent/20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Tại Sao Chọn Mỹ Phẩm Của Chúng Tôi
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Cam kết về làm đẹp sạch, thành phần tự nhiên và sức khỏe làn da của bạn
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <Card key={index} className="text-center border-none shadow-sm bg-card/50 backdrop-blur rounded-2xl">
                  <CardContent className="pt-8 pb-6 space-y-4">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center space-y-4">
              <h2 className="text-3xl font-serif font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Đánh Giá Từ Khách Hàng
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Kết quả thật từ những người yêu thích làm đẹp tự nhiên
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-lg rounded-2xl">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3 pt-2">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-xs text-primary">{testimonial.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-serif font-bold tracking-tight md:text-4xl text-balance">
                Nhận Tư Vấn & Đặt Hàng Qua Email
              </h2>
              <p className="text-lg text-primary-foreground/90 leading-relaxed text-pretty">
                Các chuyên gia làm đẹp của chúng tôi sẵn sàng giúp bạn tìm sản phẩm hoàn hảo cho làn da của bạn. Liên hệ
                ngay hôm nay để nhận tư vấn cá nhân hóa.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 shadow-lg rounded-full"
                >
                  <Link href="/contact">Gửi yêu cầu đặt hàng</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent rounded-full"
                >
                  <Link href="/products">Khám phá sản phẩm</Link>
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
