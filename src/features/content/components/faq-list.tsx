import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQGroup } from "@/features/content/faq"

export function FAQList({ groups }: { groups: FAQGroup[] }) {
  if (groups.length === 0) {
    return (
      <div className="bg-card rounded-xl border p-6 text-center">
        <p className="text-muted-foreground text-sm">Không có câu hỏi phù hợp từ khóa bạn nhập.</p>
      </div>
    )
  }

  return groups.map((group) => (
    <div key={group.category} className="bg-card rounded-xl border p-4">
      <h2 className="text-lg font-semibold">{group.category}</h2>
      <Accordion type="single" collapsible className="mt-2 space-y-2">
        {group.items.map((item, index) => (
          <AccordionItem
            key={`${group.category}-${index}`}
            value={`${group.category}-${index}`}
            className="rounded-lg border px-4"
          >
            <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-sm">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  ))
}
