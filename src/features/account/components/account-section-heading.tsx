export function AccountSectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-rose-900 uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-950 md:text-[28px]">
        {title}
      </h2>
      <p className="text-muted-foreground mt-2 text-sm leading-6">{description}</p>
    </div>
  )
}
