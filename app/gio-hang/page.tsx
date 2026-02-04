import type { Metadata } from "next"
import { CartPageClient } from "./page-client"

export const metadata: Metadata = {
  title: "Gi? hàng | M? ph?m Hàn",
  description: "Ki?m tra s?n ph?m trong gi? hàng, c?p nh?t s? lu?ng và chuy?n sang thanh toán nhanh.",
}

export default function CartPage() {
  return <CartPageClient />
}

