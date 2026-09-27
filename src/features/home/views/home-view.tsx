import { ConciergeProcess } from "@/features/home/components/concierge-process"
import { EditorialLookbook } from "@/features/home/components/editorial-lookbook"
import { FeaturedProducts } from "@/features/home/components/featured-products"
import { HomeCategories } from "@/features/home/components/home-categories"
import { HomeFAQ } from "@/features/home/components/home-faq"
import { HomeHero } from "@/features/home/components/home-hero"
import { TrustBenefits } from "@/features/home/components/trust-benefits"
import type { Category } from "@/types/category"
import type { ProductCardDTO } from "@/types/product"

export function HomeView({
  categories,
  categoryError,
  products,
  productError,
}: {
  categories: Category[]
  categoryError: boolean
  products: ProductCardDTO[]
  productError: boolean
}) {
  return (
    <div className="bg-background text-foreground font-sans">
      <HomeHero />
      <HomeCategories categories={categories} isError={categoryError} />
      <FeaturedProducts products={products} categories={categories} isError={productError} />
      <EditorialLookbook />
      <ConciergeProcess />
      <TrustBenefits />
      <HomeFAQ />
    </div>
  )
}
