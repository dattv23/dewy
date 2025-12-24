import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle2, Home, ShoppingBag, Mail } from "lucide-react"

export default function OrderSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              <Card className="border-primary/20 shadow-lg">
                <CardContent className="pt-12 pb-8 text-center space-y-8">
                  {/* Success Icon */}
                  <div className="flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-12 w-12 text-primary" />
                    </div>
                  </div>

                  {/* Success Message */}
                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                      Order Request Sent Successfully!
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                      Thank you for your order request. We've received your information and will send a confirmation
                      email shortly.
                    </p>
                  </div>

                  {/* What's Next */}
                  <Card className="border-border bg-muted/30">
                    <CardContent className="pt-6 text-left space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold text-foreground">Check Your Email</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            Please check your email inbox for order confirmation and next steps. Be sure to check your
                            spam folder if you don't see it within a few minutes.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Expected Timeline */}
                  <div className="space-y-3 pt-4">
                    <h3 className="text-lg font-semibold text-foreground">What Happens Next?</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">1</span>
                        </div>
                        <p className="text-left leading-relaxed">
                          You'll receive an email confirmation with your order details within 24 hours
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">2</span>
                        </div>
                        <p className="text-left leading-relaxed">
                          Our team will review your request and send payment instructions
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-semibold text-primary">3</span>
                        </div>
                        <p className="text-left leading-relaxed">
                          Once payment is confirmed, we'll prepare and ship your order
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center pt-4">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      <Link href="/">
                        <Home className="mr-2 h-5 w-5" />
                        Back to Home
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link href="/products">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Continue Shopping
                      </Link>
                    </Button>
                  </div>

                  {/* Support Text */}
                  <div className="pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Questions about your order?{" "}
                      <Link href="/contact" className="text-primary hover:underline font-medium">
                        Contact our support team
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
