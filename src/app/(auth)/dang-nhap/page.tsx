import type { Metadata } from "next"
import { SITE_CONFIG } from "@/config/site"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata: Metadata = {
  title: `Đăng nhập | ${SITE_CONFIG.name}`,
  description: "Đăng nhập Dewy bằng email hoặc tài khoản Google.",
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <LoginForm />
      <p className="mt-8 text-center text-[11px] leading-5 text-zinc-500">
        Dewy bảo vệ dữ liệu của bạn theo tiêu chuẩn riêng tư và bảo mật hiện đại.
      </p>
    </div>
  )
}
