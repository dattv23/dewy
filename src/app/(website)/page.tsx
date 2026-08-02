import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Star,
  Flame,
  Search,
  Zap,
} from "lucide-react"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { categories, allProducts } from "@/features/products/data/products"
import { HomeProductTabs } from "@/features/products/components/home-product-tabs"

export const metadata: Metadata = {
  title: "Dewy Beauty & Fashion | Editorial K-Beauty & Tìm theo yêu cầu",
  description:
    "Trải nghiệm mỹ phẩm & thời trang Hàn Quốc chính hãng. Mua sắm có sẵn hoặc gửi yêu cầu tìm sản phẩm theo mong muốn.",
}

const faqShort = [
  {
    q: "Không thấy sản phẩm cần mua trên trang thì làm sao?",
    a: "Bạn chỉ cần gửi tên, link hoặc ảnh sản phẩm tại trang 'Yêu cầu mỹ phẩm Hàn'. Dewy sẽ check kho tại Hàn Quốc và báo giá minh bạch cho bạn.",
  },
  {
    q: "Bao lâu tôi nhận được báo giá cho yêu cầu tìm mỹ phẩm?",
    a: "Đội ngũ Dewy tại Seoul & Việt Nam sẽ phản hồi chi tiết giá và thời gian xử lý trong khoảng 4 đến 24 giờ làm việc.",
  },
  {
    q: "Làm sao để tôi kiểm tra hành trình vận chuyển đơn hàng?",
    a: "Bạn chỉ cần nhập mã tra cứu và số điện thoại tại trang Tra Cứu để xem tiến độ cập nhật minh bạch theo thời gian thực.",
  },
]

const customerReviews = [
  {
    name: "Minh Anh (Hà Nội)",
    avatar: "/review-avatar-1.jpg",
    product: "Serum Vitamin C 15%",
    rating: 5,
    comment:
      "Sản phẩm chuẩn nội địa Hàn 100%, đợt rồi mình tìm mãi loại này ở VN ko thấy, gửi link cho Dewy là được hỗ trợ báo giá siêu nhanh luôn!",
  },
  {
    name: "Ngọc Trinh (TP.HCM)",
    avatar: "/review-avatar-2.jpg",
    product: "Kem Dưỡng Ẩm Ceramide",
    rating: 5,
    comment:
      "Giao diện web trực quan, đặt hàng nhanh gọn. Chất kem mịn thấm nhanh đúng như miêu tả. Sẽ tiếp tục ủng hộ Dewy dài lâu!",
  },
  {
    name: "Thùy Dung (Đà Nẵng)",
    avatar: "/review-avatar-3.jpg",
    product: "Son Tint Màu Tự Nhiên",
    rating: 5,
    comment:
      "Màu son mỏng nhẹ lên môi rất xinh. Thích nhất là khâu đóng gói cẩn thận và tra cứu vận đơn minh bạch từ bên Hàn về.",
  },
]

export default function HomePage() {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col font-sans">
      <Header />

      <main className="flex-1">
        {/* ================= 1. HERO EDITORIAL SECTION (VIUS STYLE) ================= */}
        <section className="to-background relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-rose-50/50 via-zinc-50/40 py-10 md:py-16 lg:py-20">
          <div className="pointer-events-none absolute -top-32 right-10 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 md:grid-cols-12 md:gap-8">
            {/* Left Content */}
            <div className="space-y-6 md:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-1 text-xs font-semibold text-rose-900 shadow-xs">
                <Sparkles className="size-3.5 text-rose-600" />
                <span>SEOUL EDITORIAL COLLECTION 2026</span>
              </div>

              <h1 className="font-serif text-3xl leading-[1.18] font-extrabold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl">
                Vẻ đẹp tinh tế từ Hàn Quốc, <br className="hidden sm:inline" />
                <span className="bg-linear-to-r from-zinc-900 via-rose-950 to-rose-800 bg-clip-text text-transparent">
                  chọn mua nhanh & minh bạch.
                </span>
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                Khám phá bộ sưu tập mỹ phẩm & thời trang tuyển chọn trực tiếp từ Seoul. Mua hàng sẵn
                có hoặc gửi yêu cầu tìm sản phẩm nội địa theo ý muốn.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Button
                  asChild
                  className="h-12 rounded-full bg-zinc-900 px-7 text-sm font-semibold text-white shadow-lg shadow-zinc-900/15 transition-all hover:scale-[1.02] hover:bg-zinc-800"
                >
                  <Link href="/danh-muc/cham-soc-da">
                    Khám phá bộ sưu tập <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 rounded-full border-zinc-300 bg-white/80 px-6 text-sm font-semibold text-zinc-800 backdrop-blur-md transition-all hover:bg-zinc-100"
                >
                  <Link href="/yeu-cau-my-pham-han">
                    <Zap className="mr-2 h-4 w-4 fill-amber-500 text-amber-500" />
                    Gửi yêu cầu tìm sản phẩm
                  </Link>
                </Button>
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-200/60 pt-4 text-zinc-800">
                <div>
                  <p className="font-serif text-xl font-bold text-zinc-900">100%</p>
                  <p className="text-xs text-zinc-500">Chính hãng Korea</p>
                </div>
                <div>
                  <p className="font-serif text-xl font-bold text-zinc-900">4h - 24h</p>
                  <p className="text-xs text-zinc-500">Phản hồi báo giá</p>
                </div>
              </div>
            </div>

            {/* Right Image Showcase */}
            <div className="relative md:col-span-5">
              <div className="group relative aspect-3/4 w-full overflow-hidden rounded-2xl border border-white/80 bg-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <Image
                  src="/hero-natural-cosmetics.jpg"
                  alt="Mỹ phẩm & Thời trang Hàn Quốc VIUS style"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/5" />

                {/* Floating Glassmorphism Badge */}
                <div className="absolute right-5 bottom-5 left-5 flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-white/85 p-3.5 shadow-lg backdrop-blur-md">
                  <div>
                    <span className="block text-[10px] font-bold tracking-widest text-rose-800 uppercase">
                      SEOUL CONCIERGE
                    </span>
                    <p className="text-xs font-semibold text-zinc-900">
                      Nhận đặt mua mỹ phẩm Hàn theo yêu cầu
                    </p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 2. VISUAL CATEGORIES GRID ================= */}
        <section className="border-b border-zinc-200/60 bg-zinc-50/50 py-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
                  EXPLORE CATEGORIES
                </span>
                <h2 className="font-serif text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                  Danh mục tuyển chọn
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/danh-muc/${cat.slug}`}
                  className="group bg-card relative overflow-hidden rounded-xl border border-zinc-200/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
                >
                  <div className="relative mb-3 aspect-4/3 w-full overflow-hidden rounded-lg bg-zinc-100">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="flex items-center justify-between text-sm font-bold text-zinc-900 transition-colors group-hover:text-rose-700">
                    {cat.name}
                    <ArrowRight className="h-3.5 w-3.5 -translate-x-2 text-rose-700 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1 line-clamp-1 text-xs text-zinc-500">{cat.description}</p>
                </Link>
              ))}

              {/* Special K-Beauty Concierge Card Tile */}
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

        {/* ================= 3. BEST SELLERS & FEATURED PRODUCTS (TABBED) ================= */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-rose-800 uppercase">
                  <Flame className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                  SEOUL TRENDING PRODUCTS
                </div>
                <h2 className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                  Sản phẩm nổi bật & Bán chạy
                </h2>
              </div>
              <Link
                href="/danh-muc/cham-soc-da"
                className="inline-flex items-center text-xs font-bold tracking-wider text-zinc-900 uppercase transition-colors hover:text-rose-700"
              >
                Xem tất cả sản phẩm <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </div>

            <HomeProductTabs allProducts={allProducts} />
          </div>
        </section>

        {/* ================= 4. KOREAN EDITORIAL LOOKBOOK GRID (VIUS BANNER STYLE) ================= */}
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
              {/* Card 1 */}
              <Link
                href="/danh-muc/cham-soc-da"
                className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <Image
                  src="/category-skincare.jpg"
                  alt="Glass Skin Routine"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="rounded border border-rose-800/50 bg-rose-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-rose-300 uppercase">
                    SKINCARE TREND
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Glass Skin & Phục hồi hàng rào ẩm
                  </h3>
                  <p className="line-clamp-2 text-xs text-zinc-300">
                    Bí quyết sở hữu làn da căng bóng mịn màng chuẩn Hàn với Ceramide & Hyaluronic
                    Acid.
                  </p>
                  <span className="inline-flex items-center pt-1 text-xs font-semibold text-rose-300 group-hover:text-white">
                    Khám phá dòng Skincare <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>

              {/* Card 2 */}
              <Link
                href="/danh-muc/trang-diem"
                className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <Image
                  src="/category-makeup.jpg"
                  alt="Seoul Daily Makeup"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="rounded border border-amber-800/50 bg-amber-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                    MAKEUP STYLE
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Daily Makeup Trong Trẻo
                  </h3>
                  <p className="line-clamp-2 text-xs text-zinc-300">
                    Son tint tự nhiên, kẹp mi cong nhẹ cùng lớp nền mỏng như sương cho vẻ ngoài rạng
                    rỡ.
                  </p>
                  <span className="inline-flex items-center pt-1 text-xs font-semibold text-amber-300 group-hover:text-white">
                    Xem sản phẩm trang điểm <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>

              {/* Card 3 */}
              <Link
                href="/yeu-cau-my-pham-han"
                className="group relative flex aspect-3/4 flex-col justify-end overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
              >
                <Image
                  src="/category-bodycare.jpg"
                  alt="Special Request Service"
                  fill
                  className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-75"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                <div className="relative z-10 space-y-2">
                  <span className="rounded border border-emerald-800/50 bg-emerald-950/80 px-2 py-0.5 text-[10px] font-bold tracking-wider text-emerald-300 uppercase">
                    DIRECT CONCIERGE
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white">
                    Sản Phẩm Đặt Tìm Theo Yêu Cầu
                  </h3>
                  <p className="line-clamp-2 text-xs text-zinc-300">
                    Không tìm thấy món đồ yêu thích? Dewy hỗ trợ gom order trực tiếp từ store Hàn
                    Quốc.
                  </p>
                  <span className="inline-flex items-center pt-1 text-xs font-semibold text-emerald-300 group-hover:text-white">
                    Tạo đơn tìm sản phẩm <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= 5. K-BEAUTY REQUEST CONCIERGE (3-STEP SERVICE) ================= */}
        <section className="bg-secondary/40 border-y border-zinc-200/80 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="max-w-2xl space-y-2 text-left">
              <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
                DỊCH VỤ MINH BẠCH
              </span>
              <h2 className="font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Đặt mua sản phẩm Hàn theo yêu cầu trong 3 bước
              </h2>
              <p className="text-sm text-zinc-600">
                Gửi tên, hình ảnh hoặc link sản phẩm bạn đang tìm kiếm, Dewy sẽ kiểm tra và phản hồi
                báo giá chi tiết.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Gửi thông tin sản phẩm",
                  desc: "Điền tên sản phẩm, đính kèm đường link hoặc hình ảnh bạn cần mua từ Hàn Quốc.",
                },
                {
                  step: "02",
                  title: "Nhận báo giá minh bạch",
                  desc: "Dewy xác nhận tình trạng hàng tại Seoul và gửi báo giá kèm thời gian giao hàng dự kiến (4-24h).",
                },
                {
                  step: "03",
                  title: "Theo dõi hành trình",
                  desc: "Nhận mã tra cứu để chủ động kiểm tra trạng thái xử lý và quá trình vận chuyển tận tay.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="group bg-card relative rounded-2xl border border-zinc-200/80 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-400 hover:shadow-md"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 font-serif text-xs font-bold text-white">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-base font-bold text-zinc-900">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-600 sm:text-sm">
                    {item.desc}
                  </p>
                </div>
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

        {/* ================= 6. VERIFIED CUSTOMER REVIEWS ================= */}
        {/* <section className="py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-10 max-w-lg text-center">
              <span className="text-[11px] font-bold tracking-widest text-rose-800 uppercase">
                CUSTOMER FEEDBACK
              </span>
              <h2 className="mt-1 font-serif text-2xl font-extrabold tracking-tight text-zinc-900 sm:text-3xl">
                Đánh giá từ khách hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {customerReviews.map((rev, index) => (
                <div
                  key={index}
                  className="bg-card flex flex-col justify-between space-y-4 rounded-2xl border border-zinc-200/80 p-6 shadow-xs"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm leading-relaxed font-normal text-zinc-700 italic">
                      &quot;{rev.comment}&quot;
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-zinc-100 pt-4 text-xs">
                    <div>
                      <p className="font-bold text-zinc-900">{rev.name}</p>
                      <p className="text-zinc-400">{rev.product}</p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-50 text-[10px] text-emerald-700"
                    >
                      Đã mua hàng
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* ================= 7. TRUST BADGES & COMMITMENTS ================= */}
        <section className="border-t border-zinc-200/80 bg-zinc-50 py-10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              <div className="space-y-2 p-2">
                <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">100% Chính Hãng</h4>
                <p className="text-xs text-zinc-500">Cam kết nguồn gốc nội địa Hàn Quốc rõ ràng.</p>
              </div>

              <div className="space-y-2 p-2">
                <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                  <Truck className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">Vận Chuyển Siêu Tốc</h4>
                <p className="text-xs text-zinc-500">
                  Đóng gói chuẩn bảo quản, giao nhanh toàn quốc.
                </p>
              </div>

              <div className="space-y-2 p-2">
                <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                  <RotateCcw className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">Đổi Trả Dễ Dàng</h4>
                <p className="text-xs text-zinc-500">
                  Hỗ trợ nhanh chóng nếu sản phẩm có lỗi từ nhà sản xuất.
                </p>
              </div>

              <div className="space-y-2 p-2">
                <div className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-800">
                  <Headphones className="h-6 w-6" />
                </div>
                <h4 className="text-sm font-bold text-zinc-900">Tư Vấn 24/7</h4>
                <p className="text-xs text-zinc-500">
                  Giải đáp thắc mắc và hỗ trợ chọn sản phẩm phù hợp.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 8. FAQ ACCORDION SECTION ================= */}
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
              {faqShort.map((item) => (
                <div
                  key={item.q}
                  className="bg-card space-y-2 rounded-2xl border border-zinc-200/80 p-6 shadow-xs"
                >
                  <h3 className="flex items-start gap-2 text-sm leading-snug font-bold text-zinc-900">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                    {item.q}
                  </h3>
                  <p className="pl-6 text-xs leading-relaxed text-zinc-600">{item.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center sm:text-left">
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-zinc-300 px-6 text-sm font-semibold text-zinc-700 hover:bg-zinc-100"
              >
                <Link href="/faq">Xem thêm danh sách FAQ đầy đủ</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
