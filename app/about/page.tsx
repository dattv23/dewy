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
    title: "Sustainability First",
    description:
      "We prioritize eco-friendly materials and processes in every product we offer, minimizing environmental impact at every step.",
  },
  {
    icon: Heart,
    title: "Quality & Care",
    description:
      "Every product is carefully curated and tested to ensure it meets our high standards for quality, durability, and user satisfaction.",
  },
  {
    icon: Users,
    title: "Community Focused",
    description:
      "We believe in building strong relationships with our customers and supporting communities that share our values.",
  },
  {
    icon: Award,
    title: "Trust & Transparency",
    description: "Honest communication and transparent business practices are at the core of everything we do.",
  },
]

const milestones = [
  {
    year: "2018",
    title: "Founded EcoShop",
    description: "Started with a mission to make sustainable living accessible to everyone",
  },
  {
    year: "2020",
    title: "Expanded Catalog",
    description: "Grew to over 100 eco-friendly products from trusted sustainable brands",
  },
  {
    year: "2022",
    title: "10,000+ Customers",
    description: "Reached a major milestone serving thousands of environmentally conscious customers",
  },
  {
    year: "2024",
    title: "Carbon Neutral",
    description: "Achieved carbon-neutral operations and packaging across our entire business",
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
                  About EcoShop
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  We're on a mission to make sustainable living easy, accessible, and affordable for everyone. Since
                  2018, we've been helping thousands of customers make eco-friendly choices.
                </p>
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-square max-w-lg mx-auto lg:max-w-none">
                <Image
                  src="/about-us-team.jpg"
                  alt="EcoShop team"
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
                    <h2 className="text-3xl font-bold tracking-tight text-foreground text-balance">Our Mission</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
                      To empower individuals to live more sustainably by providing access to high-quality, eco-friendly
                      products that don't compromise on style, functionality, or affordability. We believe small changes
                      can make a big difference for our planet.
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
                Our Core Values
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                The principles that guide everything we do
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
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                From humble beginnings to serving thousands of eco-conscious customers
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
                <p className="text-lg text-primary-foreground/90">Happy Customers</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">100+</p>
                <p className="text-lg text-primary-foreground/90">Eco Products</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">5K+</p>
                <p className="text-lg text-primary-foreground/90">Trees Planted</p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold">100%</p>
                <p className="text-lg text-primary-foreground/90">Carbon Neutral</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-6">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                Join Us in Making a Difference
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Ready to start your sustainable journey? Browse our products or get in touch with our team.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/products">Browse Products</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Contact Us</Link>
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
