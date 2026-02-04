import { Download, Filter, Plus, Search } from "lucide-react"
import type { AdminModuleConfig } from "@/lib/admin-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

function StatusBadge({ label }: { label: string }) {
  if (["Thành công", "Đang bán", "Hoạt động", "Hoàn tất", "Đang áp dụng", "Đang hiển thị", "Sẵn sàng tải"].includes(label)) {
    return <Badge className="bg-[#dcfce7] text-[#166534]">{label}</Badge>
  }

  if (["Hủy", "Thất bại", "Bị chặn", "Từ chối", "Tạm khóa"].includes(label)) {
    return <Badge variant="destructive">{label}</Badge>
  }

  return <Badge variant="outline">{label}</Badge>
}

function FormShowcase({ moduleKey }: { moduleKey: string }) {
  if (moduleKey === "products") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Tên sản phẩm (VD: Kem chống nắng Skin1004)" />
        <Input placeholder="SKU (VD: SKIN1004-SUN-50ML)" />
        <Input placeholder="Giá bán (VND)" />
        <Input placeholder="Giá vốn (VND)" />
        <Textarea className="md:col-span-2" placeholder="Mô tả ngắn (tối đa 160 ký tự)" />
      </div>
    )
  }

  if (moduleKey === "inventory") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="SKU" />
        <Input placeholder="Kho" />
        <Input placeholder="Loại điều chỉnh (Nhập/Xuất/Điều chỉnh)" />
        <Input placeholder="Số lượng" />
        <Textarea className="md:col-span-2" placeholder="Lý do điều chỉnh (bắt buộc)" />
      </div>
    )
  }

  if (moduleKey === "orders") {
    return (
      <div className="space-y-2 text-sm">
        <p>Luồng xử lý: Tiếp nhận đơn → Xác nhận thanh toán → Đóng gói → Bàn giao vận chuyển → Hoàn tất</p>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Xác nhận đơn</Button>
          <Button size="sm" variant="outline">
            In phiếu đóng gói
          </Button>
          <Button size="sm" variant="outline">
            Tạo vận đơn
          </Button>
          <Button size="sm" variant="secondary">
            Đánh dấu đã giao
          </Button>
        </div>
      </div>
    )
  }

  if (moduleKey === "sourcing-requests") {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        <Input placeholder="Link sản phẩm hoặc mô tả chi tiết" />
        <Input placeholder="Số lượng yêu cầu" />
        <Input placeholder="Giá hàng tại Hàn (KRW)" />
        <Input placeholder="Tỷ giá áp dụng" />
        <Input placeholder="Tổng ước tính (VND)" />
        <Input placeholder="ETA dự kiến" />
        <Textarea className="md:col-span-2" placeholder="Ghi chú nội bộ (rủi ro, trao đổi nhà cung cấp...)" />
      </div>
    )
  }

  return <p className="text-sm text-muted-foreground">Module này dùng biểu mẫu cấu hình theo nghiệp vụ riêng.</p>
}

export function AdminModuleView({ module }: { module: AdminModuleConfig }) {
  return (
    <div className="space-y-4">
      <Card className="gap-4 py-4">
        <CardHeader className="px-4">
          <CardTitle>{module.title}</CardTitle>
          <CardDescription>{module.purpose}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 px-4">
          <div className="grid gap-3 rounded-lg border bg-muted/30 p-3 text-sm md:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Màn hình chính</p>
              <p className="mt-1">{module.keyScreens.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Sắp xếp</p>
              <p className="mt-1">{module.sortableFields.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Bộ lọc</p>
              <p className="mt-1">{module.filterableFields.join(", ")}</p>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Tìm kiếm..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4" /> Bộ lọc
            </Button>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4" /> Export
              </Button>
              <Button>
                <Plus className="h-4 w-4" /> Tạo mới
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="py-4">
        <CardHeader className="px-4">
          <CardTitle className="text-base">Bảng dữ liệu chính</CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <Table>
            <TableHeader>
              <TableRow>
                {module.tableColumns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {module.tableRows.map((row) => (
                <TableRow key={row.join("-")}>
                  {row.map((cell, index) => {
                    const isStatus = index === row.length - 1
                    return <TableCell key={`${cell}-${index}`}>{isStatus ? <StatusBadge label={cell} /> : cell}</TableCell>
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="actions">
        <TabsList>
          <TabsTrigger value="actions">Hành động</TabsTrigger>
          <TabsTrigger value="status">Luồng trạng thái</TabsTrigger>
          <TabsTrigger value="form">Biểu mẫu / Quy trình</TabsTrigger>
          <TabsTrigger value="validation">Ràng buộc dữ liệu</TabsTrigger>
        </TabsList>

        <TabsContent value="actions">
          <Card className="py-4">
            <CardContent className="grid gap-3 px-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-sm font-semibold">Hành động cốt lõi</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {module.coreActions.map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold">Hành động hàng loạt</p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {module.bulkActions.map((action) => (
                    <li key={action}>• {action}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="status">
          <Card className="py-4">
            <CardContent className="space-y-2 px-4">
              <p className="text-sm font-semibold">Luồng trạng thái chuẩn</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {module.statusFlow.map((status, index) => (
                  <div key={status} className="flex items-center gap-2">
                    <StatusBadge label={status} />
                    {index < module.statusFlow.length - 1 ? <span className="text-muted-foreground">→</span> : null}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card className="py-4">
            <CardHeader className="px-4">
              <CardTitle className="text-base">Mẫu biểu mẫu & workflow</CardTitle>
              <CardDescription>UI tiếng Việt, ưu tiên thao tác nhanh và rõ trạng thái</CardDescription>
            </CardHeader>
            <CardContent className="px-4">
              <FormShowcase moduleKey={module.key} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation">
          <Card className="py-4">
            <CardContent className="space-y-1 px-4 text-sm text-muted-foreground">
              {module.validations.map((message) => (
                <p key={message}>• {message}</p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
