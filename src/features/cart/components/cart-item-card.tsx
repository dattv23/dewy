import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { formatVnd } from "@/features/products/data/products"
import type { CartItem } from "@/types/cart"

type CartItemCardProps = {
  item: CartItem
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export function CartItemCard({ item, onQuantityChange, onRemove }: CartItemCardProps) {
  return (
    <article className="bg-card grid grid-cols-[88px_1fr] gap-3 rounded-xl border p-3">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
      </div>
      <div className="space-y-2">
        <Link href={`/san-pham/${item.slug}`} className="hover:text-primary text-sm font-semibold">
          {item.name}
        </Link>
        <p className="text-primary text-sm">{formatVnd(item.price)}</p>
        <div className="flex items-center gap-2">
          <label htmlFor={`qty-${item.id}`} className="text-muted-foreground text-sm">
            Số lượng
          </label>
          <Input
            id={`qty-${item.id}`}
            type="number"
            min={1}
            value={item.quantity}
            onChange={(event) => onQuantityChange(Math.max(1, Number(event.target.value || 1)))}
            className="h-10 w-20 rounded-lg"
          />
          <Button
            type="button"
            variant="ghost"
            className="text-destructive hover:text-destructive h-10 rounded-lg"
            onClick={onRemove}
          >
            Xóa
          </Button>
        </div>
      </div>
    </article>
  )
}
