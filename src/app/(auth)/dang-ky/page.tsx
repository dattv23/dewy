import type { Metadata } from "next"
import { RegisterForm } from "@/features/auth/components/register-form"
import { createPageMetadata } from "@/lib/seo"

export const metadata: Metadata = createPageMetadata({
  title: "Đăng ký thành viên",
  description: "Tạo tài khoản Dewy hoặc tiếp tục với Google để mua sắm thuận tiện hơn.",
  path: "/dang-ky",
  noIndex: true,
})

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md">
      <RegisterForm />
      <p className="mt-8 text-center text-[11px] leading-5 text-zinc-500">
        Dewy bảo vệ dữ liệu của bạn theo tiêu chuẩn riêng tư và bảo mật hiện đại.
      </p>
    </div>
  )
}
