import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Check, PackageCheck, ShieldCheck } from "lucide-react"
import { SITE_CONFIG } from "@/config/site"

const benefits = [
  { icon: PackageCheck, label: "Theo dõi hành trình đơn hàng từ Seoul" },
  { icon: ShieldCheck, label: "Thông tin cá nhân luôn được bảo mật" },
  { icon: Check, label: "Ưu đãi riêng dành cho thành viên Dewy" },
]

export default function AuthLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="grid min-h-svh bg-stone-50 lg:grid-cols-[minmax(0,1.05fr)_minmax(520px,0.95fr)]">
      <aside className="relative hidden min-h-svh overflow-hidden bg-zinc-950 lg:block">
        <Image
          src="/hero-natural-cosmetics.jpg"
          alt="Bộ sưu tập mỹ phẩm Hàn Quốc được Dewy tuyển chọn"
          fill
          priority
          sizes="55vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/45 to-zinc-900/15" />
        <div className="absolute -right-24 -bottom-24 size-80 rounded-full border border-white/10" />
        <div className="absolute -right-10 -bottom-10 size-52 rounded-full border border-white/10" />

        <div className="relative z-10 flex min-h-svh flex-col justify-between p-10 xl:p-14">
          <Link
            href="/"
            className="w-fit text-2xl font-bold tracking-[0.08em] text-white uppercase"
          >
            {SITE_CONFIG.name}
          </Link>

          <div className="max-w-xl pb-2 text-white">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.12em] backdrop-blur-md">
              SEOUL EDITORIAL · MEMBER PRIVILEGES
            </span>
            <h2 className="mt-6 text-4xl leading-[1.15] font-bold tracking-tight xl:text-5xl">
              Vẻ đẹp tinh tế,
              <br /> dành riêng cho bạn.
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-7 text-zinc-200">
              Khám phá mỹ phẩm Hàn Quốc được tuyển chọn kỹ lưỡng và tận hưởng trải nghiệm mua sắm
              minh bạch, riêng tư.
            </p>

            <ul className="mt-9 space-y-4">
              {benefits.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-zinc-100">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs tracking-wide text-zinc-400">© 2026 Dewy · Curated in Seoul</p>
        </div>
      </aside>

      <section className="relative flex min-h-svh items-center justify-center px-4 py-20 sm:px-8 lg:py-12">
        <Link
          href="/"
          className="absolute top-6 left-5 text-xl font-bold tracking-[0.08em] text-zinc-950 uppercase lg:hidden"
        >
          {SITE_CONFIG.name}
        </Link>
        {children}
      </section>
    </main>
  )
}
