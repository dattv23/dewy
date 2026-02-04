"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { addToCart } from "@/lib/cart"
import type { ProductCardDTO } from "@/lib/products"

type AddCartButtonProps = {
  product: ProductCardDTO
  disabled?: boolean
}

export function AddCartButton({ product, disabled }: AddCartButtonProps) {
  const [added, setAdded] = useState(false)
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      <Button
        type="button"
        className="h-11 rounded-lg"
        disabled={disabled}
        onClick={() => {
          addToCart(product, 1)
          setAdded(true)
          setTimeout(() => setAdded(false), 1500)
        }}
      >
        {disabled ? "Hết hàng" : added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
      </Button>
      <Button type="button" variant="outline" className="h-11 rounded-lg" onClick={() => router.push("/gio-hang")}>
        Mua ngay
      </Button>
    </div>
  )
}
