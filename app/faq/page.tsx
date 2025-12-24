import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

const faqs = [
  {
    category: "Ordering",
    questions: [
      {
        question: "How do I place an order?",
        answer:
          "Simply fill out our contact form with your details including the product name and quantity you'd like to order. We'll respond within 24 hours with order confirmation and payment instructions.",
      },
      {
        question: "Do you have online payment?",
        answer:
          "We currently don't offer online payment directly on the website. After receiving your order request, we'll send you payment instructions via email with secure payment options.",
      },
      {
        question: "Can I order multiple products at once?",
        answer:
          "Yes! You can mention multiple products in the message section of the contact form, or you can submit separate order requests for different products.",
      },
      {
        question: "How long does it take to get order confirmation?",
        answer:
          "We typically respond to order requests within 24 hours during business days (Monday-Friday). You'll receive an email confirmation with order details and next steps.",
      },
    ],
  },
  {
    category: "Delivery & Shipping",
    questions: [
      {
        question: "How long does delivery take?",
        answer:
          "Standard delivery takes 5-7 business days after order confirmation and payment. Express shipping options are available and will be discussed during order confirmation.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to most countries worldwide. International shipping times vary by location (typically 7-14 business days). Shipping costs will be calculated based on your location.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can use this to track your package through our shipping partner's website.",
      },
      {
        question: "What if my package is damaged during delivery?",
        answer:
          "Please contact us immediately with photos of the damaged items. We'll arrange for a replacement or refund as quickly as possible at no additional cost to you.",
      },
    ],
  },
  {
    category: "Products & Quality",
    questions: [
      {
        question: "Are all products eco-friendly?",
        answer:
          "Yes! Every product in our catalog is carefully selected for its environmental credentials. We only stock items made from sustainable materials with minimal environmental impact.",
      },
      {
        question: "Do you offer product warranties?",
        answer:
          "Many of our products come with manufacturer warranties. Specific warranty information will be included in your order confirmation email and product documentation.",
      },
      {
        question: "Can I return a product if I'm not satisfied?",
        answer:
          "Yes, we offer a 30-day return policy for unused products in original packaging. Please contact us to initiate a return, and we'll provide return instructions and address.",
      },
      {
        question: "How do I know which product is right for me?",
        answer:
          "Each product page includes detailed descriptions, specifications, and features. If you need help choosing, feel free to contact us with your specific needs and we'll recommend the best options.",
      },
    ],
  },
  {
    category: "Email Confirmation",
    questions: [
      {
        question: "What will the confirmation email include?",
        answer:
          "Your confirmation email will include order details, total cost (including shipping), payment instructions, expected delivery timeframe, and our contact information for any questions.",
      },
      {
        question: "I haven't received my confirmation email. What should I do?",
        answer:
          "First, check your spam/junk folder. If it's not there and 24 hours have passed, please contact us directly via phone or email with your order details.",
      },
      {
        question: "Can I modify my order after submitting the form?",
        answer:
          "Yes, as long as we haven't processed your order yet. Reply to the confirmation email or contact us directly as soon as possible with the changes you'd like to make.",
      },
      {
        question: "How will I know when my order ships?",
        answer:
          "You'll receive a shipping confirmation email with tracking information as soon as your order is dispatched from our warehouse.",
      },
    ],
  },
  {
    category: "Payment & Pricing",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept major credit cards, bank transfers, and PayPal. Specific payment options and instructions will be provided in your order confirmation email.",
      },
      {
        question: "Are prices shown on the website final?",
        answer:
          "Product information on our website is for reference. Final prices including any applicable taxes and shipping costs will be confirmed in your order confirmation email.",
      },
      {
        question: "Do you offer bulk discounts?",
        answer:
          "Yes! For orders of 10 or more units of the same product, we offer volume discounts. Mention this in your order request and we'll provide a custom quote.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Absolutely. We use industry-standard encryption and secure payment processors. We never store your payment information on our servers.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl text-balance">
                Frequently Asked Questions
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Find answers to common questions about ordering, delivery, and our products
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-12">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-1 w-12 bg-primary rounded-full" />
                    <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>
                  </div>

                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, questionIndex) => (
                      <AccordionItem
                        key={questionIndex}
                        value={`item-${categoryIndex}-${questionIndex}`}
                        className="border border-border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-5">
                          <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-accent/20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
                  Still Have Questions?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Can't find the answer you're looking for? Our friendly customer support team is here to help!
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">Email Us</h3>
                    <p className="text-sm text-muted-foreground">Get a response within 24 hours</p>
                    <a href="mailto:info@ecoshop.com" className="text-primary hover:underline font-medium inline-block">
                      info@ecoshop.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">Contact Form</h3>
                    <p className="text-sm text-muted-foreground">Send us a detailed message</p>
                    <Button asChild variant="link" className="text-primary p-0 h-auto font-medium">
                      <Link href="/contact">Go to Contact Form</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
