"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { faqGroups } from "@/features/content/faq"
import { PageIntro } from "@/components/website/page-intro"
import { FAQList } from "@/features/content/components/faq-list"
import { FAQContactCard } from "@/features/content/components/faq-contact-card"

export function FAQView() {
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    if (!query.trim()) return faqGroups
    const lower = query.toLowerCase()
    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.question.toLowerCase().includes(lower) ||
            item.answer.toLowerCase().includes(lower),
        ),
      }))
      .filter((group) => group.items.length > 0)
  }, [query])

  return (
    <div>
      <PageIntro
        title="FAQ mua hàng và tìm theo yêu cầu"
        description="Chỉ bao gồm thông tin liên quan đến đặt mua, yêu cầu mỹ phẩm Hàn, thanh toán và vận chuyển."
      >
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tìm câu hỏi..."
          className="mt-4 h-11 max-w-xl rounded-lg"
        />
      </PageIntro>

      <section className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
        <FAQList groups={filtered} />
      </section>
      <FAQContactCard />
    </div>
  )
}
