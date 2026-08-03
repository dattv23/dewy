import { ConciergeProcess } from "@/features/home/components/concierge-process"
import { EditorialLookbook } from "@/features/home/components/editorial-lookbook"
import { FeaturedProducts } from "@/features/home/components/featured-products"
import { HomeCategories } from "@/features/home/components/home-categories"
import { HomeFAQ } from "@/features/home/components/home-faq"
import { HomeHero } from "@/features/home/components/home-hero"
import { TrustBenefits } from "@/features/home/components/trust-benefits"

export function HomeView() {
  return (
    <div className="bg-background text-foreground font-sans">
      <HomeHero />
      <HomeCategories />
      <FeaturedProducts />
      <EditorialLookbook />
      <ConciergeProcess />
      <TrustBenefits />
      <HomeFAQ />
    </div>
  )
}
