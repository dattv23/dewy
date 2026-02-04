import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-foreground">Mua nhanh mỹ phẩm Hàn</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Chỉ tập trung vào sản phẩm, yêu cầu tìm theo yêu cầu và theo dõi trạng thái đơn/yêu cầu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <Link href="/danh-muc/cham-soc-da" className="text-muted-foreground hover:text-primary">
              Danh mục
            </Link>
            <Link href="/gio-hang" className="text-muted-foreground hover:text-primary">
              Giỏ hàng
            </Link>
            <Link href="/yeu-cau-my-pham-han" className="text-muted-foreground hover:text-primary">
              Tìm theo yêu cầu
            </Link>
            <Link href="/tra-cuu" className="text-muted-foreground hover:text-primary">
              Tra cứu
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-primary">
              FAQ
            </Link>
            <Link href="/thanh-toan" className="text-muted-foreground hover:text-primary">
              Thanh toán
            </Link>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Dewy Korea</p>
      </div>
    </footer>
  )
}
