"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { faqGroups } from "@/lib/faq"

export function FAQClient() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return faqGroups
    const lower = query.toLowerCase()
    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.cau_hoi.toLowerCase().includes(lower) || item.tra_loi.toLowerCase().includes(lower),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b bg-secondary/30">
          <div className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="text-[28px] font-bold leading-[1.25]">FAQ mua hàng và tìm theo yêu cầu</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Chỉ bao gồm thông tin liên quan đến đặt mua, yêu cầu mỹ phẩm Hàn, thanh toán và vận chuyển.
            </p>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm câu hỏi..."
              className="mt-4 h-11 max-w-xl rounded-lg"
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-card p-6 text-center">
              <p className="text-sm text-muted-foreground">Không có câu hỏi phù hợp từ khóa bạn nhập.</p>
            </div>
          ) : (
            filtered.map((group) => (
              <div key={group.nhom} className="rounded-xl border bg-card p-4">
                <h2 className="text-lg font-semibold">{group.nhom}</h2>
                <Accordion type="single" collapsible className="mt-2 space-y-2">
                  {group.items.map((item, index) => (
                    <AccordionItem
                      key={`${group.nhom}-${index}`}
                      value={`${group.nhom}-${index}`}
                      className="rounded-lg border px-4"
                    >
                      <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                        {item.cau_hoi}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{item.tra_loi}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
        </section>

        <section className="border-t py-8">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="text-lg font-semibold">Chưa thấy câu trả lời?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Gửi yêu cầu, chúng tôi sẽ phản hồi theo nhu cầu thực tế của bạn.</p>
              <Button asChild className="mt-4 h-11 rounded-lg">
                <Link href="/yeu-cau-my-pham-han">Gửi yêu cầu mỹ phẩm Hàn</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
