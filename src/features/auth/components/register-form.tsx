"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRight, Eye, EyeOff, LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ROUTES } from "@/constants/routes"
import { GoogleIcon } from "@/features/auth/components/google-icon"
import { AUTH_ENDPOINTS } from "@/features/auth/constants/auth.constants"
import { registerSchema, type RegisterInput } from "@/features/auth/schemas/register.schema"
import { register } from "@/features/auth/services/auth.service"
import { getAuthFormError } from "@/features/auth/utils/auth-error"

const defaultValues: RegisterInput = {
  name: "",
  phone: "",
  email: "",
  password: "",
  terms: false,
}

export function RegisterForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  })

  async function onSubmit(values: RegisterInput) {
    form.clearErrors("root")
    try {
      await register(values)
      router.replace(`${ROUTES.login}?registered=1`)
    } catch (error) {
      const { field = "root", message } = getAuthFormError(error, "register")
      form.setError(field, { message })
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(24,24,27,0.08)] sm:p-9">
      <header className="mb-7">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-rose-800 uppercase">
          Dewy Membership
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Tạo tài khoản</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Nhận voucher 50K và bắt đầu hành trình làm đẹp của riêng bạn.
        </p>
      </header>

      <Button
        asChild
        variant="outline"
        className="h-12 w-full rounded-xl border-zinc-300 bg-white font-semibold text-zinc-800 shadow-xs hover:bg-zinc-50 hover:text-zinc-950"
      >
        <a href={AUTH_ENDPOINTS.google}>
          <GoogleIcon />
          Tiếp tục với Google
        </a>
      </Button>

      <div className="my-6 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-zinc-200" />
        <span className="text-xs text-zinc-500">hoặc dùng email</span>
        <span className="h-px flex-1 bg-zinc-200" />
      </div>

      <Form {...form}>
        <form className="space-y-4" noValidate onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ và tên</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    autoComplete="name"
                    placeholder="Tên của bạn"
                    className="h-12 rounded-xl border-zinc-300 bg-white px-4"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="0912 345 678"
                    className="h-12 rounded-xl border-zinc-300 bg-white px-4"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="ban@email.com"
                    className="h-12 rounded-xl border-zinc-300 bg-white px-4"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Tối thiểu 8 ký tự"
                      className="h-12 rounded-xl border-zinc-300 bg-white px-4 pr-12"
                    />
                  </FormControl>
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute top-1/2 right-1.5 flex size-9 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                    aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-start gap-2.5 pt-1">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="mt-0.5 rounded"
                    />
                  </FormControl>
                  <FormLabel className="block text-xs leading-5 font-normal text-zinc-600">
                    Tôi đồng ý với{" "}
                    <Link
                      href="/dieu-khoan"
                      className="font-medium text-zinc-950 underline underline-offset-2"
                    >
                      Điều khoản
                    </Link>{" "}
                    và{" "}
                    <Link
                      href="/chinh-sach-bao-mat"
                      className="font-medium text-zinc-950 underline underline-offset-2"
                    >
                      Chính sách bảo mật
                    </Link>
                    .
                  </FormLabel>
                </div>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {form.formState.errors.root?.message && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs leading-5 text-red-800"
            >
              {form.formState.errors.root.message}
            </div>
          )}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="group h-12 w-full rounded-xl font-semibold shadow-lg shadow-zinc-950/10"
          >
            {form.formState.isSubmitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
            {form.formState.isSubmitting ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            {!form.formState.isSubmitting && (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Đã có tài khoản?{" "}
        <Link
          href={ROUTES.login}
          className="font-semibold text-zinc-950 underline-offset-4 hover:underline"
        >
          Đăng nhập
        </Link>
      </p>
    </div>
  )
}
