import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/website/header"
import { Footer } from "@/components/website/footer"
import { ProductCard } from "@/features/products/components/product-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  allProducts,
  formatVnd,
  getCategoryBySlug,
  getProductBySlug,
  statusLabel,
} from "@/features/products/data/products"
import type { ProductCardDTO } from "@/types/product"
import { AddCartButton } from "@/features/cart/components/add-cart-button"

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
    title: `${product.name} | Giá, công dụng, cách dùng`,
    description: `Xem chi tiết ${product.name}: mô tả ngắn, công dụng chính, cách dùng, lưu ý và lựa chọn đặt mua hoặc tìm theo yêu cầu.`,
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
          <p className="text-muted-foreground mt-2">
            Sản phẩm bạn đang tìm không còn hiển thị trên hệ thống.
          </p>
          <Button asChild className="mt-4 h-11 rounded-lg">
            <Link href="/danh-muc/cham-soc-da">Về danh mục</Link>
          </Button>
        </main>
        <Footer />
      </div>
    )
  }

  const category = getCategoryBySlug(product.categorySlug)
  const relatedProducts = allProducts
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .slice(0, 4)
  const cardProduct: ProductCardDTO = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    status: product.status,
    tags: product.tags,
    image: product.image,
    categorySlug: product.categorySlug,
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-secondary/30 border-b">
          <div className="text-muted-foreground mx-auto w-full max-w-6xl px-4 py-4 text-sm">
            <Link href="/" className="hover:text-primary">
              Trang chủ
            </Link>{" "}
            /{" "}
            <Link href={`/danh-muc/${product.categorySlug}`} className="hover:text-primary">
              {category?.name ?? "Danh mục"}
            </Link>{" "}
            / <span className="text-foreground">{product.name}</span>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 md:grid-cols-2">
          <div className="bg-card relative aspect-square overflow-hidden rounded-2xl border">
            <Image
              src={product.image}
              alt={`${product.name} ${product.size}`}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                {statusLabel(product.status)}
              </Badge>
              {product.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-[28px] leading-tight font-bold">{product.name}</h1>
            <div className="flex items-baseline gap-2">
              <p className="text-primary text-2xl font-bold">{formatVnd(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-muted-foreground text-base line-through">
                  {formatVnd(product.compareAtPrice)}
                </p>
              )}
            </div>
            <p className="text-muted-foreground text-sm">
              {product.brand} · {product.origin} · {product.size}
            </p>
            <p className="text-[15px]">{product.shortDescription}</p>

            <AddCartButton product={cardProduct} disabled={product.status === "out_of_stock"} />

            <Button
              asChild
              variant="ghost"
              className="text-primary h-11 rounded-lg px-0 hover:bg-transparent hover:underline"
            >
              <Link href="/yeu-cau-my-pham-han">
                Không thấy sản phẩm tương tự? Gửi yêu cầu tìm theo yêu cầu
              </Link>
            </Button>

            <div className="bg-card rounded-xl border p-4">
              <p className="text-sm font-semibold">Loại da phù hợp</p>
              <p className="text-muted-foreground mt-2 text-sm">{product.skinTypes.join(", ")}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-4 pb-8 md:grid-cols-3">
          <article className="bg-card rounded-xl border p-4">
            <h2 className="text-lg font-semibold">Công dụng chính</h2>
            <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-4 text-sm">
              {product.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="bg-card rounded-xl border p-4">
            <h2 className="text-lg font-semibold">Cách dùng</h2>
            <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-4 text-sm">
              {product.directions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="bg-card rounded-xl border p-4">
            <h2 className="text-lg font-semibold">Lưu ý khi sử dụng</h2>
            <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-4 text-sm">
              {product.cautions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        {relatedProducts.length > 0 && (
          <section className="border-t py-8">
            <div className="mx-auto w-full max-w-6xl px-4">
              <h2 className="text-[22px] leading-[1.35] font-bold">Sản phẩm liên quan</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
                {relatedProducts.map((item) => (
                  <ProductCard key={item.id} product={item} showCategory={category?.name} />
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
