import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Mail, MessageCircle } from "lucide-react"

const faqs = [
  {
    category: "Đặt hàng mỹ phẩm",
    questions: [
      {
        question: "Tôi đặt hàng như thế nào?",
        answer:
          "Chỉ cần điền biểu mẫu liên hệ với thông tin của bạn, bao gồm tên sản phẩm mỹ phẩm và số lượng muốn đặt. Dewy sẽ phản hồi trong 24 giờ với xác nhận đơn hàng và hướng dẫn thanh toán.",
      },
      {
        question: "Dewy có thanh toán trực tuyến không?",
        answer:
          "Hiện tại chúng tôi chưa hỗ trợ thanh toán trực tuyến ngay trên trang web. Sau khi nhận yêu cầu, Dewy sẽ gửi hướng dẫn thanh toán an toàn qua thư điện tử.",
      },
      {
        question: "Tôi có thể đặt nhiều sản phẩm cùng lúc không?",
        answer:
          "Có! Bạn có thể liệt kê nhiều sản phẩm trong phần tin nhắn của biểu mẫu, hoặc gửi các yêu cầu riêng cho từng sản phẩm.",
      },
      {
        question: "Bao lâu tôi nhận được xác nhận đơn hàng?",
        answer:
          "Thông thường chúng tôi phản hồi trong vòng 24 giờ vào ngày làm việc (Thứ Hai - Thứ Sáu). Bạn sẽ nhận thư điện tử xác nhận kèm chi tiết và các bước tiếp theo.",
      },
    ],
  },
  {
    category: "Giao hàng & vận chuyển",
    questions: [
      {
        question: "Thời gian giao hàng bao lâu?",
        answer:
          "Giao hàng tiêu chuẩn mất 5-7 ngày làm việc sau khi xác nhận và thanh toán. Tùy chọn giao nhanh sẽ được trao đổi trong quá trình xác nhận đơn hàng.",
      },
      {
        question: "Dewy có giao hàng quốc tế không?",
        answer:
          "Có, chúng tôi giao hàng đến hầu hết các quốc gia. Thời gian giao hàng quốc tế tùy khu vực (thường 7-14 ngày làm việc). Phí vận chuyển sẽ được tính theo địa điểm của bạn.",
      },
      {
        question: "Làm sao để theo dõi đơn hàng?",
        answer:
          "Sau khi đơn hàng được gửi đi, bạn sẽ nhận mã theo dõi qua thư điện tử. Bạn có thể dùng mã này để kiểm tra tình trạng trên trang web của đối tác vận chuyển.",
      },
      {
        question: "Nếu hàng bị hư hỏng khi giao thì sao?",
        answer:
          "Vui lòng liên hệ với chúng tôi ngay và gửi kèm ảnh sản phẩm bị hư hỏng. Dewy sẽ sắp xếp đổi mới hoặc hoàn tiền nhanh nhất có thể mà không phát sinh thêm chi phí.",
      },
    ],
  },
  {
    category: "Sản phẩm & chất lượng",
    questions: [
      {
        question: "Sản phẩm của Dewy phù hợp với loại da nào?",
        answer:
          "Dewy có danh mục mỹ phẩm hữu cơ cho nhiều loại da khác nhau. Mỗi trang sản phẩm đều nêu rõ loại da phù hợp và công dụng chính.",
      },
      {
        question: "Sản phẩm có được kiểm nghiệm da liễu không?",
        answer:
          "Tất cả sản phẩm đều được kiểm tra và phê duyệt bởi các chuyên gia da liễu trước khi đến tay khách hàng.",
      },
      {
        question: "Tôi có thể đổi trả nếu không hài lòng không?",
        answer:
          "Có, chúng tôi có chính sách đổi trả trong 30 ngày với sản phẩm chưa sử dụng và còn nguyên bao bì. Vui lòng liên hệ để được hướng dẫn đổi trả và địa chỉ gửi.",
      },
      {
        question: "Mất bao lâu để thấy hiệu quả trên da?",
        answer:
          "Hiệu quả thường thấy rõ sau 2-4 tuần sử dụng đều đặn, tùy theo tình trạng da và chu trình chăm sóc.",
      },
    ],
  },
  {
    category: "Thư điện tử xác nhận",
    questions: [
      {
        question: "Thư điện tử xác nhận sẽ bao gồm những gì?",
        answer:
          "Thư điện tử xác nhận sẽ gồm chi tiết đơn hàng, tổng chi phí (bao gồm phí vận chuyển), hướng dẫn thanh toán, thời gian giao dự kiến và thông tin liên hệ.",
      },
      {
        question: "Tôi chưa nhận thư điện tử xác nhận thì làm sao?",
        answer:
          "Hãy kiểm tra thư rác trước. Nếu vẫn chưa có và đã quá 24 giờ, vui lòng liên hệ trực tiếp qua điện thoại hoặc thư điện tử và cung cấp thông tin đơn hàng.",
      },
      {
        question: "Tôi có thể thay đổi đơn hàng sau khi gửi không?",
        answer:
          "Có, miễn là chúng tôi chưa xử lý đơn hàng. Hãy phản hồi thư điện tử xác nhận hoặc liên hệ trực tiếp càng sớm càng tốt với thay đổi mong muốn.",
      },
      {
        question: "Khi nào tôi biết đơn hàng đã được gửi?",
        answer:
          "Bạn sẽ nhận thư điện tử thông báo giao hàng kèm mã theo dõi ngay khi đơn hàng rời kho.",
      },
    ],
  },
  {
    category: "Thanh toán & giá cả",
    questions: [
      {
        question: "Dewy chấp nhận phương thức thanh toán nào?",
        answer:
          "Chúng tôi chấp nhận thẻ tín dụng chính, chuyển khoản ngân hàng và PayPal. Các lựa chọn cụ thể sẽ được gửi trong thư điện tử xác nhận đơn hàng.",
      },
      {
        question: "Giá hiển thị trên trang web đã là giá cuối cùng chưa?",
        answer:
          "Thông tin giá trên trang web chỉ mang tính tham khảo. Giá cuối cùng bao gồm thuế và phí vận chuyển sẽ được xác nhận trong thư điện tử đơn hàng.",
      },
      {
        question: "Dewy có ưu đãi cho đơn hàng số lượng lớn không?",
        answer:
          "Có! Với đơn hàng từ 10 sản phẩm trở lên cùng loại, chúng tôi có chính sách chiết khấu. Hãy ghi chú trong yêu cầu đặt hàng để Dewy gửi báo giá riêng.",
      },
      {
        question: "Thông tin thanh toán của tôi có an toàn không?",
        answer:
          "Hoàn toàn an toàn. Chúng tôi sử dụng mã hóa tiêu chuẩn và các nhà xử lý thanh toán bảo mật. Dewy không lưu trữ thông tin thanh toán trên máy chủ.",
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
                Câu hỏi thường gặp
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                Tìm câu trả lời cho các thắc mắc về đặt hàng, giao hàng và sản phẩm làm đẹp của Dewy
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
                  Bạn vẫn còn thắc mắc?
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                  Không tìm thấy câu trả lời? Đội ngũ hỗ trợ làm đẹp của Dewy luôn sẵn sàng giúp bạn!
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
                <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">Thư điện tử</h3>
                    <p className="text-sm text-muted-foreground">Phản hồi trong vòng 24 giờ</p>
                    <a href="mailto:info@dewy.com" className="text-primary hover:underline font-medium inline-block">
                      info@dewy.com
                    </a>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card border border-border">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <MessageCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-foreground">Biểu mẫu liên hệ</h3>
                    <p className="text-sm text-muted-foreground">Gửi yêu cầu chi tiết cho chúng tôi</p>
                    <Button asChild variant="link" className="text-primary p-0 h-auto font-medium">
                      <Link href="/contact">Đến trang liên hệ</Link>
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
