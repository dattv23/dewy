import type { ReactNode } from "react"

type PageIntroProps = {
  title: string
  description: ReactNode
  children?: ReactNode
}

export function PageIntro({ title, description, children }: PageIntroProps) {
  return (
    <section className="bg-secondary/30 border-b">
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <h1 className="text-[28px] leading-tight font-bold">{title}</h1>
        <p className="text-muted-foreground mt-2 text-sm">{description}</p>
        {children}
      </div>
    </section>
  )
}
