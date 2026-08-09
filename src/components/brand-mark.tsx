import Image from "next/image"
import { cn } from "@/lib/utils"

type BrandMarkProps = {
  className?: string
  priority?: boolean
}

export function BrandMark({ className, priority = false }: BrandMarkProps) {
  return (
    <Image
      src="/brand/dewy-d-mark.png"
      alt=""
      width={1254}
      height={1254}
      className={cn("object-contain", className)}
      priority={priority}
    />
  )
}
