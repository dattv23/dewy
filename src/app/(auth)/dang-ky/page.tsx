import type { Metadata } from "next"
import { RegisterForm } from "@/features/auth/components/register-form"
import { SITE_CONFIG } from "@/config/site"

export const metadata: Metadata = {
  title: `Đăng ký thành viên | ${SITE_CONFIG.name}`,
  description: "Tạo tài khoản Dewy hoặc tiếp tục với Google để mua sắm thuận tiện hơn.",
}

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
