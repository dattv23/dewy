import { ImageIcon } from "lucide-react"

export function CategoryImage({
  src,
  alt,
  className,
}: {
  src?: string | null
  alt: string
  className: string
}) {
  if (!src) return <ImageIcon className="text-muted-foreground" aria-hidden="true" />

  // Remote upload hosts are supplied by the backend and cannot be enumerated in next.config.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />
}
