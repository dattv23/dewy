import {
  Bell,
  ChartColumnBig,
  ClipboardCheck,
  FolderTree,
  LayoutDashboard,
  Package,
  ReceiptText,
  ScrollText,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Truck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"

export type AdminModuleKey =
  | "products"
  | "categories"
  | "inventory"
  | "orders"
  | "sourcing-requests"
  | "customers"
  | "pricing-fees"
  | "content"
  | "notifications"
  | "reports"
  | "settings"
  | "audit-logs"

export type AdminModuleConfig = {
  key: AdminModuleKey
  title: string
  menuLabel: string
  purpose: string
  keyScreens: string[]
  tableColumns: string[]
  tableRows: string[][]
  sortableFields: string[]
  filterableFields: string[]
  coreActions: string[]
  bulkActions: string[]
  statusFlow: string[]
  validations: string[]
}

export const adminMenu: Array<{
  href: string
  label: string
  icon: LucideIcon
}> = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Sản phẩm", icon: Package },
  { href: "/admin/categories", label: "Danh mục", icon: FolderTree },
  { href: "/admin/inventory", label: "Tồn kho", icon: Truck },
  { href: "/admin/orders", label: "Đơn hàng", icon: ShoppingCart },
  {
    href: "/admin/sourcing-requests",
    label: "Yêu cầu sourcing Hàn",
    icon: ClipboardCheck,
  },
  { href: "/admin/customers", label: "Khách hàng", icon: Users },
  { href: "/admin/pricing-fees", label: "Giá & Phí", icon: Wallet },
  { href: "/admin/content", label: "Nội dung", icon: ScrollText },
  { href: "/admin/notifications", label: "Thông báo", icon: Bell },
  { href: "/admin/reports", label: "Báo cáo", icon: ChartColumnBig },
  { href: "/admin/settings", label: "Cài đặt", icon: Settings },
  { href: "/admin/audit-logs", label: "Audit log", icon: ShieldCheck },
]

export const kpiCards = [
  { label: "Đơn hàng hôm nay", value: "126", delta: "+18.2%" },
  { label: "Doanh thu tuần này", value: "248.000.000đ", delta: "+11.4%" },
  { label: "Yêu cầu sourcing mới", value: "37", delta: "+6.8%" },
  { label: "Đơn chờ xử lý", value: "42", delta: "-9.1%" },
  { label: "SKU sắp hết hàng", value: "16", delta: "+4 SKU" },
]

export const dashboardSeries = {
  orders: [
    { label: "T2", value: 64 },
    { label: "T3", value: 72 },
    { label: "T4", value: 68 },
    { label: "T5", value: 81 },
    { label: "T6", value: 74 },
    { label: "T7", value: 88 },
    { label: "CN", value: 79 },
  ],
  sourcing: [
    { label: "Mới nhận", value: 14 },
    { label: "Đang thẩm định", value: 22 },
    { label: "Chờ xác nhận", value: 18 },
    { label: "Đã chốt mua", value: 11 },
  ],
}

export const dashboardActivities = [
  [
    "09:12",
    "Linh Nguyen",
    "Đơn hàng",
    "Cập nhật trạng thái",
    "#DH-240204-019",
    "Thành công",
  ],
  [
    "09:04",
    "Vũ Trần",
    "Sourcing",
    "Gửi báo giá",
    "#SRC-240204-011",
    "Thành công",
  ],
  [
    "08:53",
    "Minh Phạm",
    "Tồn kho",
    "Điều chỉnh số lượng",
    "SKIN1004-SUN-50ML",
    "Thành công",
  ],
  [
    "08:39",
    "Hà Lê",
    "Sản phẩm",
    "Đổi trạng thái",
    "Round Lab Dokdo Toner",
    "Thành công",
  ],
]

export const dashboardAlerts = [
  "5 đơn hàng vượt SLA đóng gói",
  "3 yêu cầu sourcing chưa báo giá quá 24h",
  "8 SKU dưới ngưỡng tồn kho an toàn",
]

export const moduleConfigs: AdminModuleConfig[] = [
  {
    key: "products",
    title: "Quản lý sản phẩm",
    menuLabel: "Sản phẩm",
    purpose: "Quản lý SKU, thông tin bán, hiển thị và vòng đời sản phẩm.",
    keyScreens: ["Danh sách sản phẩm", "Tạo/Sửa sản phẩm", "Lịch sử thay đổi"],
    tableColumns: [
      "SKU",
      "Tên sản phẩm",
      "Danh mục",
      "Giá bán",
      "Tồn khả dụng",
      "Trạng thái",
      "Cập nhật lúc",
    ],
    tableRows: [
      ["SKIN1004-SUN-50", "Skin1004 Air-fit Suncream", "Chống nắng", "289.000đ", "124", "Đang bán", "09:10"],
      ["ANUA-TONER-77", "Anua Heartleaf 77 Toner", "Nước cân bằng", "449.000đ", "38", "Đang bán", "08:47"],
      ["CLIO-KILLCOVER-04", "Clio Kill Cover Cushion", "Trang điểm", "559.000đ", "0", "Tạm ẩn", "08:22"],
    ],
    sortableFields: ["Giá bán", "Tồn khả dụng", "Cập nhật lúc"],
    filterableFields: ["Danh mục", "Trạng thái", "Thương hiệu"],
    coreActions: ["Tạo", "Sửa", "Xóa mềm", "Bật/Tắt hiển thị", "Export"],
    bulkActions: ["Bật hiển thị", "Ẩn", "Cập nhật danh mục", "Gắn tag"],
    statusFlow: ["Nháp", "Chờ duyệt", "Đang bán", "Tạm ẩn", "Ngừng bán"],
    validations: [
      "Tên sản phẩm không được để trống.",
      "SKU đã tồn tại.",
      "Giá bán phải lớn hơn 0.",
      "Phải có ít nhất 1 ảnh sản phẩm.",
    ],
  },
  {
    key: "categories",
    title: "Quản lý danh mục",
    menuLabel: "Danh mục",
    purpose: "Tổ chức cây danh mục, slug và thứ tự hiển thị.",
    keyScreens: ["Danh sách danh mục", "Sắp xếp thứ tự", "Gộp danh mục"],
    tableColumns: ["Tên danh mục", "Slug", "Danh mục cha", "Số sản phẩm", "Trạng thái"],
    tableRows: [
      ["Chăm sóc da", "cham-soc-da", "-", "168", "Hoạt động"],
      ["Trang điểm", "trang-diem", "-", "102", "Hoạt động"],
      ["Làm sạch", "lam-sach", "Chăm sóc da", "34", "Ẩn"],
    ],
    sortableFields: ["Tên danh mục", "Số sản phẩm"],
    filterableFields: ["Danh mục cha", "Trạng thái"],
    coreActions: ["Tạo", "Sửa", "Xóa", "Sắp xếp", "Gộp"],
    bulkActions: ["Bật/Tắt", "Đổi danh mục cha", "Export"],
    statusFlow: ["Hoạt động", "Ẩn"],
    validations: [
      "Slug đã được sử dụng.",
      "Không thể xóa danh mục đang chứa sản phẩm.",
      "Danh mục cha không hợp lệ.",
    ],
  },
  {
    key: "inventory",
    title: "Quản lý tồn kho",
    menuLabel: "Tồn kho",
    purpose: "Theo dõi tồn theo kho, điều chỉnh nhập/xuất và cảnh báo tồn thấp.",
    keyScreens: ["Tồn hiện tại", "Phiếu điều chỉnh", "Cảnh báo tồn thấp"],
    tableColumns: ["SKU", "Kho", "Tồn thực", "Tồn giữ chỗ", "Tồn khả dụng", "Ngưỡng cảnh báo", "Trạng thái"],
    tableRows: [
      ["SKIN1004-SUN-50", "Kho HCM", "134", "10", "124", "30", "Còn hàng"],
      ["ANUA-TONER-77", "Kho HN", "44", "6", "38", "20", "Sắp hết"],
      ["CLIO-KILLCOVER-04", "Kho HCM", "0", "0", "0", "15", "Hết hàng"],
    ],
    sortableFields: ["Tồn khả dụng", "Ngưỡng cảnh báo"],
    filterableFields: ["Kho", "Trạng thái"],
    coreActions: ["Nhập kho", "Xuất kho", "Điều chỉnh", "Khóa SKU"],
    bulkActions: ["Cập nhật ngưỡng cảnh báo", "Điều chỉnh tồn hàng loạt"],
    statusFlow: ["Còn hàng", "Sắp hết", "Hết hàng", "Đặt trước"],
    validations: [
      "Số lượng điều chỉnh không hợp lệ.",
      "Không đủ tồn khả dụng để xuất kho.",
      "Lý do điều chỉnh là bắt buộc.",
    ],
  },
  {
    key: "orders",
    title: "Quản lý đơn hàng",
    menuLabel: "Đơn hàng",
    purpose: "Xử lý vòng đời đơn hàng, giao vận và hoàn tiền.",
    keyScreens: ["Danh sách đơn", "Chi tiết đơn", "Vận chuyển và hoàn tiền"],
    tableColumns: ["Mã đơn", "Khách hàng", "Tổng tiền", "Thanh toán", "Vận chuyển", "Trạng thái", "Tạo lúc"],
    tableRows: [
      ["DH-240204-019", "Lê Hồng Nhung", "1.249.000đ", "Đã thanh toán", "GHN", "Đang chuẩn bị", "09:00"],
      ["DH-240204-017", "Nguyễn Hương", "589.000đ", "COD", "GHTK", "Đang giao", "08:41"],
      ["DH-240204-011", "Mai Trần", "299.000đ", "Đã thanh toán", "-", "Mới", "08:01"],
    ],
    sortableFields: ["Tổng tiền", "Tạo lúc"],
    filterableFields: ["Trạng thái", "Thanh toán", "Đơn vị vận chuyển"],
    coreActions: ["Xác nhận đơn", "Đóng gói", "Tạo vận đơn", "Hủy", "Hoàn tiền"],
    bulkActions: ["Xác nhận nhiều đơn", "In phiếu đóng gói", "Cập nhật trạng thái giao"],
    statusFlow: ["Mới", "Đã xác nhận", "Đang chuẩn bị", "Đang giao", "Hoàn tất", "Hủy", "Hoàn tiền"],
    validations: [
      "Không thể hủy đơn đã giao thành công.",
      "Số tiền hoàn vượt quá giá trị thanh toán.",
      "Thiếu thông tin đơn vị vận chuyển.",
    ],
  },
  {
    key: "sourcing-requests",
    title: "Yêu cầu sourcing mỹ phẩm Hàn",
    menuLabel: "Yêu cầu sourcing Hàn",
    purpose: "Tiếp nhận, thẩm định, báo giá và theo dõi yêu cầu mua hộ.",
    keyScreens: ["Danh sách yêu cầu", "Thẩm định", "Báo giá và chốt mua"],
    tableColumns: ["Mã yêu cầu", "Khách hàng", "Sản phẩm yêu cầu", "Giá ước tính", "ETA", "Người xử lý", "Trạng thái"],
    tableRows: [
      ["SRC-240204-011", "Ngọc Trâm", "Rom&nd Juicy Lasting Tint", "420.000đ", "10-12 ngày", "Vũ Trần", "Chờ khách xác nhận"],
      ["SRC-240204-008", "Quỳnh Anh", "Round Lab Birch Juice", "595.000đ", "8-10 ngày", "Linh Nguyen", "Đang thẩm định"],
      ["SRC-240204-002", "Ngọc Hà", "Clio Pro Eye Palette", "689.000đ", "7-9 ngày", "Hà Lê", "Đã chốt mua"],
    ],
    sortableFields: ["Giá ước tính", "ETA"],
    filterableFields: ["Trạng thái", "Người xử lý"],
    coreActions: ["Tiếp nhận", "Yêu cầu bổ sung", "Gửi báo giá", "Duyệt/Từ chối", "Chuyển thành đơn"],
    bulkActions: ["Phân công xử lý", "Cập nhật ETA", "Gửi thông báo trạng thái"],
    statusFlow: [
      "Mới nhận",
      "Đang thẩm định",
      "Chờ khách xác nhận",
      "Đã chốt mua",
      "Đang về kho",
      "Hoàn tất",
      "Từ chối",
      "Hủy",
    ],
    validations: [
      "Thiếu link sản phẩm hoặc mô tả chi tiết.",
      "Giá ước tính phải lớn hơn 0.",
      "Vui lòng nhập lý do từ chối.",
    ],
  },
  {
    key: "customers",
    title: "Khách hàng / Người dùng",
    menuLabel: "Khách hàng",
    purpose: "Quản lý hồ sơ khách hàng, phân nhóm và lịch sử mua.",
    keyScreens: ["Danh sách khách hàng", "Chi tiết khách", "Lịch sử đơn hàng"],
    tableColumns: ["Mã KH", "Họ tên", "SĐT", "Hạng", "Tổng chi tiêu", "Đơn gần nhất", "Trạng thái"],
    tableRows: [
      ["KH-00192", "Lê Hồng Nhung", "0912 334 189", "Vàng", "18.400.000đ", "DH-240204-019", "Hoạt động"],
      ["KH-00421", "Nguyễn Hương", "0903 112 886", "Bạc", "7.220.000đ", "DH-240204-017", "Hoạt động"],
      ["KH-00813", "Mai Trần", "0981 889 211", "Mới", "1.180.000đ", "DH-240204-011", "Tạm khóa"],
    ],
    sortableFields: ["Tổng chi tiêu", "Đơn gần nhất"],
    filterableFields: ["Hạng", "Trạng thái"],
    coreActions: ["Tạo", "Sửa", "Khóa/Mở tài khoản", "Gắn tag", "Merge trùng"],
    bulkActions: ["Gắn tag", "Khóa tạm", "Export"],
    statusFlow: ["Hoạt động", "Tạm khóa", "Chặn"],
    validations: [
      "Số điện thoại không đúng định dạng.",
      "Email không hợp lệ.",
      "Không thể merge hồ sơ khác tenant.",
    ],
  },
  {
    key: "pricing-fees",
    title: "Giá bán & Phí",
    menuLabel: "Giá & Phí",
    purpose: "Quản lý giá bán, biên lợi nhuận, phụ phí và lịch áp dụng.",
    keyScreens: ["Bảng giá SKU", "Quy tắc định giá", "Cấu hình phí sourcing"],
    tableColumns: ["SKU", "Giá vốn", "Biên lợi nhuận", "Giá bán", "Phí dịch vụ", "Hiệu lực", "Trạng thái"],
    tableRows: [
      ["SKIN1004-SUN-50", "208.000đ", "38%", "289.000đ", "0đ", "01/02 - 28/02", "Đang áp dụng"],
      ["ANUA-TONER-77", "320.000đ", "40%", "449.000đ", "0đ", "01/02 - 28/02", "Đang áp dụng"],
      ["SRC-FEE-STD", "-", "-", "-", "8%", "01/02 - 31/03", "Đã duyệt"],
    ],
    sortableFields: ["Giá bán", "Biên lợi nhuận"],
    filterableFields: ["Trạng thái", "Hiệu lực"],
    coreActions: ["Cập nhật giá", "Lên lịch giá", "Bật/Tắt quy tắc"],
    bulkActions: ["Tăng/Giảm theo %", "Áp dụng phí theo nhóm"],
    statusFlow: ["Nháp", "Đã duyệt", "Đang áp dụng", "Hết hiệu lực"],
    validations: [
      "Giá bán không được thấp hơn giá sàn.",
      "Khoảng hiệu lực bị chồng chéo.",
      "Biên lợi nhuận tối thiểu chưa đạt.",
    ],
  },
  {
    key: "content",
    title: "Quản lý nội dung",
    menuLabel: "Nội dung",
    purpose: "Điều phối banner và block trang chủ theo lịch hiển thị.",
    keyScreens: ["Danh sách block", "Lên lịch hiển thị", "Preview"],
    tableColumns: ["Tên block", "Vị trí", "Loại", "Thiết bị", "Thời gian hiển thị", "Trạng thái"],
    tableRows: [
      ["Hero tháng 2", "Trang chủ", "Banner", "Desktop + Mobile", "04/02 - 28/02", "Đang hiển thị"],
      ["Flash sale cuối tuần", "Trang chủ", "Block sản phẩm", "Desktop", "08/02 - 09/02", "Đã lên lịch"],
      ["Korean sourcing CTA", "Trang yêu cầu", "Banner nhỏ", "Mobile", "01/02 - 28/02", "Đang hiển thị"],
    ],
    sortableFields: ["Thời gian hiển thị"],
    filterableFields: ["Vị trí", "Thiết bị", "Trạng thái"],
    coreActions: ["Tạo", "Sửa", "Xóa", "Lên lịch", "Preview"],
    bulkActions: ["Bật/Tắt nhiều block", "Đổi lịch hiển thị"],
    statusFlow: ["Nháp", "Đã lên lịch", "Đang hiển thị", "Đã ẩn"],
    validations: [
      "Ảnh chưa đúng kích thước yêu cầu.",
      "Thiếu liên kết đích cho banner.",
      "Thời gian bắt đầu phải trước thời gian kết thúc.",
    ],
  },
  {
    key: "notifications",
    title: "Thông báo & trạng thái",
    menuLabel: "Thông báo",
    purpose: "Quản lý mẫu thông báo hệ thống và lịch gửi.",
    keyScreens: ["Danh sách mẫu", "Test gửi", "Lịch sử gửi"],
    tableColumns: ["Mã mẫu", "Kênh", "Đối tượng", "Tiêu đề", "Biến dữ liệu", "Trạng thái"],
    tableRows: [
      ["TPL-ORDER-CONFIRM", "SMS", "Khách hàng", "Xác nhận đơn hàng", "{ten_khach},{ma_don}", "Đang hoạt động"],
      ["TPL-SOURCING-QUOTE", "Zalo", "Khách hàng", "Báo giá sourcing", "{ma_yeu_cau},{tong_tam_tinh}", "Đang hoạt động"],
      ["TPL-SLA-WARN", "Email", "Nội bộ", "Cảnh báo đơn quá SLA", "{ma_don},{gio_tre}", "Tạm dừng"],
    ],
    sortableFields: ["Kênh", "Trạng thái"],
    filterableFields: ["Kênh", "Đối tượng", "Trạng thái"],
    coreActions: ["Tạo", "Sửa", "Test gửi", "Bật/Tắt"],
    bulkActions: ["Kích hoạt", "Tạm dừng"],
    statusFlow: ["Nháp", "Đang hoạt động", "Tạm dừng"],
    validations: [
      "Nội dung mẫu không được để trống.",
      "Biến dữ liệu không hợp lệ.",
      "Không thể gửi thử do thiếu người nhận.",
    ],
  },
  {
    key: "reports",
    title: "Báo cáo & xuất dữ liệu",
    menuLabel: "Báo cáo",
    purpose: "Tổng hợp báo cáo vận hành và tải dữ liệu CSV/Excel.",
    keyScreens: ["Thư viện báo cáo", "Tạo báo cáo", "Lịch export"],
    tableColumns: ["Tên báo cáo", "Loại", "Khoảng thời gian", "Định dạng", "Người tạo", "Trạng thái"],
    tableRows: [
      ["Doanh thu theo ngày", "Tài chính", "01/02 - 04/02", "Excel", "Admin", "Sẵn sàng tải"],
      ["Tồn kho dưới ngưỡng", "Kho vận", "04/02", "CSV", "Linh Nguyen", "Sẵn sàng tải"],
      ["Hiệu suất sourcing", "Vận hành", "01/01 - 31/01", "Excel", "Vũ Trần", "Đang xử lý"],
    ],
    sortableFields: ["Khoảng thời gian", "Trạng thái"],
    filterableFields: ["Loại", "Định dạng", "Người tạo"],
    coreActions: ["Chạy báo cáo", "Lưu bộ lọc", "Export CSV/Excel"],
    bulkActions: ["Tải nhiều báo cáo", "Gửi email nội bộ"],
    statusFlow: ["Đang xử lý", "Sẵn sàng tải", "Thất bại"],
    validations: [
      "Khoảng thời gian vượt quá giới hạn cho phép.",
      "Vui lòng chọn ít nhất 1 cột dữ liệu.",
      "Không có dữ liệu trong phạm vi đã chọn.",
    ],
  },
  {
    key: "settings",
    title: "Cài đặt hệ thống",
    menuLabel: "Cài đặt",
    purpose: "Thiết lập tham số vận hành, tích hợp và phân quyền.",
    keyScreens: ["Cấu hình chung", "Tích hợp", "Phân quyền"],
    tableColumns: ["Nhóm cấu hình", "Khóa", "Giá trị", "Môi trường", "Cập nhật bởi", "Lúc cập nhật"],
    tableRows: [
      ["Thanh toán", "refund_partial_enabled", "true", "Production", "Super Admin", "03/02 16:22"],
      ["Sourcing", "exchange_rate_source", "Naver Finance", "Production", "Super Admin", "03/02 15:41"],
      ["Đơn hàng", "packing_sla_hours", "12", "Production", "Admin", "02/02 11:08"],
    ],
    sortableFields: ["Lúc cập nhật"],
    filterableFields: ["Nhóm cấu hình", "Môi trường"],
    coreActions: ["Sửa", "Rollback", "Quản lý API key"],
    bulkActions: ["Import/Export cấu hình không nhạy cảm"],
    statusFlow: ["Bản nháp", "Áp dụng", "Lưu trữ"],
    validations: [
      "Giá trị cấu hình không đúng định dạng.",
      "Không thể lưu do thiếu quyền hệ thống.",
      "API key không hợp lệ.",
    ],
  },
  {
    key: "audit-logs",
    title: "Nhật ký hoạt động / Audit",
    menuLabel: "Audit log",
    purpose: "Truy vết mọi thay đổi dữ liệu và hành động nhạy cảm.",
    keyScreens: ["Nhật ký hành động", "So sánh trước/sau", "Export log"],
    tableColumns: ["Thời gian", "Người dùng", "IP", "Module", "Hành động", "Đối tượng", "Kết quả"],
    tableRows: [
      ["04/02 09:12", "Linh Nguyen", "10.30.22.18", "Orders", "Cập nhật trạng thái", "DH-240204-019", "Thành công"],
      ["04/02 08:53", "Minh Phạm", "10.30.22.27", "Inventory", "Điều chỉnh tồn", "SKIN1004-SUN-50", "Thành công"],
      ["04/02 08:20", "Viewer", "10.30.22.42", "Pricing", "Thử sửa giá", "ANUA-TONER-77", "Bị chặn"],
    ],
    sortableFields: ["Thời gian", "Module"],
    filterableFields: ["Người dùng", "Kết quả", "Module"],
    coreActions: ["Xem chi tiết", "Export"],
    bulkActions: ["Export theo khoảng thời gian"],
    statusFlow: ["Thành công", "Thất bại", "Bị chặn"],
    validations: [
      "Khoảng thời gian tra cứu không hợp lệ.",
      "Bạn không có quyền xem dữ liệu nhạy cảm.",
      "Không thể export quá 200.000 dòng.",
    ],
  },
]

export function getModuleConfig(key: string) {
  return moduleConfigs.find((module) => module.key === key)
}
