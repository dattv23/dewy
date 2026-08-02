"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import {
  AUTH_ENDPOINTS,
  AUTH_ERROR_CODES,
  AUTH_ERROR_MESSAGES,
} from "@/features/auth/constants/auth.constants"
import { loginSchema, type LoginInput } from "@/features/auth/schemas/login.schema"
import { AuthRequestError, login } from "@/features/auth/services/auth.service"

const defaultValues: LoginInput = {
  email: "",
  password: "",
  remember: false,
}

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginInput>({ resolver: zodResolver(loginSchema), defaultValues })

  async function onSubmit(values: LoginInput) {
    form.clearErrors("root")
    try {
      const result = await login(values, searchParams.get("next"))
      router.replace(result.redirectTo)
      router.refresh()
    } catch (error) {
      const message =
        error instanceof AuthRequestError && error.message === AUTH_ERROR_CODES.invalidCredentials
          ? AUTH_ERROR_MESSAGES.login
          : AUTH_ERROR_MESSAGES.unavailable

      form.setError("root", { message })
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-[0_24px_80px_rgba(24,24,27,0.08)] sm:p-9">
      <header className="mb-7">
        <p className="mb-2 text-[11px] font-bold tracking-[0.16em] text-rose-800 uppercase">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-950">Đăng nhập</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Tiếp tục khám phá những sản phẩm được tuyển chọn dành cho bạn.
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
          {searchParams.get("registered") === "1" && (
            <div
              role="status"
              className="rounded-xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs leading-5 text-emerald-800"
            >
              {AUTH_ERROR_MESSAGES.registrationSuccess}
            </div>
          )}
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
                <div className="flex items-center justify-between">
                  <FormLabel>Mật khẩu</FormLabel>
                  <Link
                    href="/quen-mat-khau"
                    className="text-xs font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline"
                  >
                    Quên mật khẩu?
                  </Link>
                </div>
                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Nhập mật khẩu"
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
            name="remember"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2.5">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="rounded"
                    />
                  </FormControl>
                  <FormLabel className="text-xs font-normal text-zinc-600">
                    Duy trì đăng nhập trên thiết bị này
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
            {form.formState.isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            {!form.formState.isSubmitting && (
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            )}
          </Button>
        </form>
      </Form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Chưa có tài khoản?{" "}
        <Link
          href={ROUTES.register}
          className="font-semibold text-zinc-950 underline-offset-4 hover:underline"
        >
          Đăng ký ngay
        </Link>
      </p>
    </div>
  )
}
