"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    productName: "",
    quantity: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate form submission
    console.log("[v0] Form submitted:", formData)

    // In a real application, you would send this data to your backend
    // For now, we'll just redirect to the success page
    router.push("/order-success")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Contact Us to Order
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Fill out the form below and we'll confirm your order via email within 24 hours
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Information */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-foreground">Get in Touch</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Have questions or ready to place an order? We're here to help! Reach out via the form or contact us
                    directly.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">Email</p>
                          <a
                            href="mailto:info@ecoshop.com"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            info@ecoshop.com
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">Phone</p>
                          <a
                            href="tel:+1234567890"
                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                          >
                            +1 (234) 567-890
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-semibold text-foreground">Address</p>
                          <p className="text-sm text-muted-foreground">123 Green Street, Eco City, EC 12345</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-foreground">Business Hours</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Monday - Friday:</span>
                          <span className="font-medium text-foreground">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday:</span>
                          <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday:</span>
                          <span className="font-medium text-foreground">Closed</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="border-border">
                  <CardContent className="pt-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-foreground">
                            Full Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            type="text"
                            placeholder="John Doe"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone" className="text-foreground">
                            Phone Number <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (234) 567-890"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">
                          Email Address <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background"
                        />
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="productName" className="text-foreground">
                            Product Name <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="productName"
                            name="productName"
                            type="text"
                            placeholder="e.g., Bamboo Utensil Set"
                            value={formData.productName}
                            onChange={handleChange}
                            required
                            className="bg-background"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="quantity" className="text-foreground">
                            Quantity <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="quantity"
                            name="quantity"
                            type="number"
                            min="1"
                            placeholder="1"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                            className="bg-background"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground">
                          Message / Notes
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Any special requests or questions about your order..."
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="bg-background resize-none"
                        />
                      </div>

                      <div className="space-y-4">
                        <Button
                          type="submit"
                          size="lg"
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Send className="mr-2 h-5 w-5" />
                          Send Order Request
                        </Button>
                        <p className="text-sm text-center text-muted-foreground leading-relaxed">
                          We will confirm your order via email within 24 hours
                        </p>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
