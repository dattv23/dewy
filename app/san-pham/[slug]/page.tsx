import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  allProducts,
  formatVnd,
  getCategoryBySlug,
  getProductBySlug,
  statusLabel,
  type ProductCardDTO,
} from "@/lib/products"
import { AddCartButton } from "./add-cart-button"

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return {
      title: "Không tìm thấy sản phẩm",
      description: "Sản phẩm bạn đang tìm hiện không tồn tại.",
    }
  }

  return {
    title: `${product.ten} | Giá, công dụng, cách dùng`,
    description: `Xem chi tiết ${product.ten}: mô tả ngắn, công dụng chính, cách dùng, lưu ý và lựa chọn đặt mua hoặc tìm theo yêu cầu.`,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 py-10 text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <p className="mt-2 text-muted-foreground">Sản phẩm bạn đang tìm không còn hiển thị trên hệ thống.</p>
          <Button asChild className="mt-4 h-11 rounded-lg">
            <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const category = getCategoryBySlug(product.danh_muc_slug)
  const relatedProducts = allProducts.filter((item) => item.danh_muc_slug === product.danh_muc_slug && item.id !== product.id).slice(0, 4)
  const cardProduct: ProductCardDTO = {
    id: product.id,
    slug: product.slug,
    ten: product.ten,
    gia_ban: product.gia_ban,
    gia_goc: product.gia_goc,
    tinh_trang: product.tinh_trang,
    tags: product.tags,
    anh_chinh: product.anh_chinh,
    danh_muc_slug: product.danh_muc_slug,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Trang chủ
            </Link>{" "}
            /{" "}
            <Link href={`/danh-muc/${product.danh_muc_slug}`} className="hover:text-primary">
              {category?.ten ?? "Danh mục"}
            </Link>{" "}
            / <span className="text-foreground">{product.ten}</span>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-card">
            <Image
              src={product.anh_chinh}
              alt={`${product.ten} ${product.dung_tich}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                {statusLabel(product.tinh_trang)}
              </Badge>
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-[28px] font-bold leading-[1.25]">{product.ten}</h1>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-primary">{formatVnd(product.gia_ban)}</p>
              {product.gia_goc && <p className="text-base text-muted-foreground line-through">{formatVnd(product.gia_goc)}</p>}
            </div>
            <p className="text-sm text-muted-foreground">
              {product.thuong_hieu} · {product.xuat_xu} · {product.dung_tich}
            </p>
            <p className="text-[15px]">{product.mo_ta_ngan}</p>

            <AddCartButton product={cardProduct} disabled={product.tinh_trang === "het_hang"} />

            <Button asChild variant="ghost" className="h-11 rounded-lg px-0 text-primary hover:bg-transparent hover:underline">
              <Link href="/yeu-cau-my-pham-han">Không thấy sản phẩm tương tự? Gửi yêu cầu tìm theo yêu cầu</Link>
            </Button>

            <div className="rounded-xl border bg-card p-4">
              <p className="text-sm font-semibold">Loại da phù hợp</p>
              <p className="mt-2 text-sm text-muted-foreground">{product.loai_da.join(", ")}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-8 md:grid-cols-3">
          <article className="rounded-xl border bg-card p-4">
            <h2 className="text-lg font-semibold">Công dụng chính</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {product.cong_dung.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <h2 className="text-lg font-semibold">Cách dùng</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {product.cach_dung.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-xl border bg-card p-4">
            <h2 className="text-lg font-semibold">Lưu ý khi sử dụng</h2>
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-muted-foreground">
              {product.luu_y.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        {relatedProducts.length > 0 && (
          <section className="border-t py-8">
            <div className="mx-auto w-full max-w-6xl px-4">
              <h2 className="text-[22px] font-bold leading-[1.35]">Sản phẩm liên quan</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} showCategory={category?.ten} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
