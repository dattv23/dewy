export type TinhTrangSanPham = "con_hang" | "sap_het" | "het_hang" | "dat_sourcing"

export type ProductCardDTO = {
  id: string
  slug: string
  ten: string
  gia_ban: number
  gia_goc?: number
  tinh_trang: TinhTrangSanPham
  tags: string[]
  anh_chinh: string
  danh_muc_slug: string
  thuong_hieu?: string
  loai_da?: string[]
  cong_dung_tom_tat?: string[]
}

export type ProductDetailDTO = ProductCardDTO & {
  thuong_hieu: string
  xuat_xu: string
  dung_tich: string
  loai_da: string[]
  mo_ta_ngan: string
  cong_dung: string[]
  cach_dung: string[]
  luu_y: string[]
}

export type CategoryDTO = {
  slug: string
  ten: string
  mo_ta: string
  anh: string
}

export const categories: CategoryDTO[] = [
  {
    slug: "cham-soc-da",
    ten: "Chăm sóc da",
    mo_ta: "Serum, kem dưỡng, chống nắng và làm sạch da hằng ngày.",
    anh: "/category-skincare.jpg",
  },
  {
    slug: "trang-diem",
    ten: "Trang điểm",
    mo_ta: "Son, mascara, má hồng với tông màu dễ dùng cho mỗi ngày.",
    anh: "/category-makeup.jpg",
  },
  {
    slug: "cham-soc-co-the",
    ten: "Chăm sóc cơ thể",
    mo_ta: "Dưỡng thể, tẩy da chết và dầu dưỡng giúp da mềm mịn.",
    anh: "/category-bodycare.jpg",
  },
]

const productsData: ProductDetailDTO[] = [
  {
    id: "P001",
    slug: "serum-vitamin-c-15",
    ten: "Serum Vitamin C 15%",
    gia_ban: 420000,
    gia_goc: 520000,
    tinh_trang: "con_hang",
    tags: ["Bán chạy", "Có sẵn"],
    anh_chinh: "/vitamin-c-serum.jpg",
    danh_muc_slug: "cham-soc-da",
    thuong_hieu: "Dear, Klairs",
    xuat_xu: "Hàn Quốc",
    dung_tich: "35ml",
    loai_da: ["Da xỉn màu", "Da hỗn hợp", "Da thường"],
    mo_ta_ngan: "Serum giúp da sáng đều màu, kết cấu thấm nhanh, phù hợp da xỉn màu.",
    cong_dung: [
      "Hỗ trợ làm sáng và đều màu da.",
      "Giảm cảm giác khô ráp sau rửa mặt.",
      "Bổ sung chống oxy hóa cho da ban ngày.",
    ],
    cach_dung: [
      "Dùng 2-3 giọt sau bước làm sạch và toner.",
      "Dùng 1-2 lần/ngày trước kem dưỡng.",
      "Ban ngày dùng thêm kem chống nắng.",
    ],
    luu_y: [
      "Thử trước trên vùng da nhỏ.",
      "Ngưng dùng nếu có dấu hiệu kích ứng.",
      "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.",
    ],
  },
  {
    id: "P002",
    slug: "kem-duong-am-ceramide",
    ten: "Kem Dưỡng Ẩm Ceramide",
    gia_ban: 380000,
    gia_goc: 450000,
    tinh_trang: "con_hang",
    tags: ["Mới", "Có sẵn"],
    anh_chinh: "/rose-face-cream.jpg",
    danh_muc_slug: "cham-soc-da",
    thuong_hieu: "Illiyoon",
    xuat_xu: "Hàn Quốc",
    dung_tich: "75ml",
    loai_da: ["Da khô", "Da nhạy cảm"],
    mo_ta_ngan: "Kem dưỡng phục hồi hàng rào ẩm, chất kem mịn, không bết dính.",
    cong_dung: [
      "Hỗ trợ giảm khô căng sau khi rửa mặt.",
      "Giữ ẩm tốt trong môi trường máy lạnh.",
      "Tăng độ mềm mượt bề mặt da.",
    ],
    cach_dung: [
      "Lấy lượng vừa đủ sau serum.",
      "Vỗ nhẹ để kem thấm đều.",
      "Dùng sáng và tối.",
    ],
    luu_y: [
      "Tránh để sản phẩm dính vào mắt.",
      "Đậy nắp kín sau khi dùng.",
    ],
  },
  {
    id: "P003",
    slug: "sua-rua-mat-do-pH-thap",
    ten: "Sữa Rửa Mặt pH Thấp",
    gia_ban: 210000,
    gia_goc: 260000,
    tinh_trang: "sap_het",
    tags: ["Phổ biến", "Có sẵn"],
    anh_chinh: "/cleansing-foam.jpg",
    danh_muc_slug: "cham-soc-da",
    thuong_hieu: "COSRX",
    xuat_xu: "Hàn Quốc",
    dung_tich: "150ml",
    loai_da: ["Da dầu", "Da hỗn hợp", "Da nhạy cảm"],
    mo_ta_ngan: "Làm sạch dịu nhẹ, hỗ trợ cân bằng da với độ pH thân thiện.",
    cong_dung: [
      "Làm sạch bụi bẩn và dầu thừa cuối ngày.",
      "Giảm cảm giác khô rít sau khi rửa.",
      "Phù hợp dùng hằng ngày.",
    ],
    cach_dung: [
      "Làm ướt mặt, lấy lượng nhỏ sản phẩm.",
      "Massage nhẹ 30-40 giây rồi rửa sạch.",
    ],
    luu_y: [
      "Không chà xát mạnh khi rửa mặt.",
      "Kết hợp kem dưỡng để giữ ẩm tốt hơn.",
    ],
  },
  {
    id: "P004",
    slug: "son-tint-mau-tu-nhien",
    ten: "Son Tint Màu Tự Nhiên",
    gia_ban: 245000,
    gia_goc: 290000,
    tinh_trang: "con_hang",
    tags: ["Bán chạy", "Có sẵn"],
    anh_chinh: "/lip-tint.jpg",
    danh_muc_slug: "trang-diem",
    thuong_hieu: "Rom&nd",
    xuat_xu: "Hàn Quốc",
    dung_tich: "4g",
    loai_da: ["Mọi loại da"],
    mo_ta_ngan: "Son tint mỏng nhẹ, màu tươi tự nhiên, độ bám tốt trong ngày.",
    cong_dung: [
      "Tạo màu môi trong trẻo, dễ chồng lớp.",
      "Bề mặt môi căng nhẹ, không dày môi.",
    ],
    cach_dung: [
      "Thoa 1 lớp mỏng lòng môi để hiệu ứng tự nhiên.",
      "Có thể thoa full môi để màu rõ hơn.",
    ],
    luu_y: [
      "Dưỡng ẩm môi trước khi thoa để màu đều hơn.",
    ],
  },
  {
    id: "P005",
    slug: "mascara-cong-mi-lau-troi",
    ten: "Mascara Cong Mi Lâu Trôi",
    gia_ban: 310000,
    gia_goc: 360000,
    tinh_trang: "dat_sourcing",
    tags: ["Đặt sourcing"],
    anh_chinh: "/mascara.jpg",
    danh_muc_slug: "trang-diem",
    thuong_hieu: "Kiss Me",
    xuat_xu: "Hàn Quốc",
    dung_tich: "6g",
    loai_da: ["Mọi loại da"],
    mo_ta_ngan: "Mascara chống lem, giữ độ cong mi và dễ làm sạch cuối ngày.",
    cong_dung: [
      "Giúp mi trông dày và cong tự nhiên.",
      "Hạn chế lem khi hoạt động cả ngày.",
    ],
    cach_dung: [
      "Kẹp mi trước khi chuốt.",
      "Chuốt từ chân mi theo đường ziczac.",
    ],
    luu_y: [
      "Dùng tẩy trang chuyên dụng cho mắt để làm sạch.",
    ],
  },
  {
    id: "P006",
    slug: "tay-da-chet-body-duong-am",
    ten: "Tẩy Da Chết Body Dưỡng Ẩm",
    gia_ban: 330000,
    gia_goc: 390000,
    tinh_trang: "con_hang",
    tags: ["Có sẵn"],
    anh_chinh: "/body-scrub.jpg",
    danh_muc_slug: "cham-soc-co-the",
    thuong_hieu: "Ariul",
    xuat_xu: "Hàn Quốc",
    dung_tich: "200ml",
    loai_da: ["Da thường", "Da khô"],
    mo_ta_ngan: "Tẩy tế bào chết cơ thể với hạt mịn, hỗ trợ da mềm mượt hơn.",
    cong_dung: [
      "Làm mịn bề mặt da vùng khuỷu tay, đầu gối.",
      "Giúp dưỡng thể thấm tốt hơn.",
    ],
    cach_dung: [
      "Dùng 2-3 lần/tuần trên da ẩm.",
      "Massage nhẹ rồi rửa sạch với nước.",
    ],
    luu_y: [
      "Không dùng lên vùng da đang tổn thương.",
    ],
  },
  {
    id: "P007",
    slug: "duong-the-huong-thao-moc",
    ten: "Dưỡng Thể Hương Thảo Mộc",
    gia_ban: 295000,
    gia_goc: 340000,
    tinh_trang: "con_hang",
    tags: ["Mới", "Có sẵn"],
    anh_chinh: "/body-butter.jpg",
    danh_muc_slug: "cham-soc-co-the",
    thuong_hieu: "The Saem",
    xuat_xu: "Hàn Quốc",
    dung_tich: "250ml",
    loai_da: ["Da khô", "Da thường"],
    mo_ta_ngan: "Dưỡng thể kết cấu mịn, mùi dịu nhẹ, phù hợp dùng mỗi ngày.",
    cong_dung: [
      "Dưỡng ẩm và giảm cảm giác khô ráp da cơ thể.",
      "Giữ da mềm mượt sau khi tắm.",
    ],
    cach_dung: [
      "Thoa sau khi tắm khi da còn hơi ẩm.",
      "Tập trung vào vùng da khô như khuỷu tay, đầu gối.",
    ],
    luu_y: [
      "Ngưng dùng nếu có dấu hiệu không phù hợp.",
    ],
  },
  {
    id: "P008",
    slug: "kem-chong-nang-spf50",
    ten: "Kem Chống Nắng SPF50+",
    gia_ban: 360000,
    gia_goc: 420000,
    tinh_trang: "het_hang",
    tags: ["Phổ biến"],
    anh_chinh: "/sunscreen.jpg",
    danh_muc_slug: "cham-soc-da",
    thuong_hieu: "Beauty of Joseon",
    xuat_xu: "Hàn Quốc",
    dung_tich: "50ml",
    loai_da: ["Da dầu", "Da hỗn hợp", "Da thường"],
    mo_ta_ngan: "Chống nắng phổ rộng, chất kem nhẹ, phù hợp dùng hằng ngày.",
    cong_dung: [
      "Hỗ trợ bảo vệ da trước tia UV.",
      "Lớp finish tự nhiên, không nặng mặt.",
    ],
    cach_dung: [
      "Thoa trước khi ra nắng 15 phút.",
      "Thoa lại sau mỗi 2-3 giờ khi hoạt động ngoài trời.",
    ],
    luu_y: [
      "Dùng đủ lượng để đạt hiệu quả bảo vệ tốt.",
    ],
  },
]

export const featuredProducts: ProductCardDTO[] = productsData.slice(0, 6).map(toProductCard)

export const allProducts: ProductCardDTO[] = productsData.map(toProductCard)

export function getCategoryBySlug(slug: string) {
  return categories.find((item) => item.slug === slug)
}

export function getProductBySlug(slug: string) {
  return productsData.find((item) => item.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return allProducts.filter((item) => item.danh_muc_slug === slug)
}

export function getProductDetailsByCategory(slug: string) {
  return productsData.filter((item) => item.danh_muc_slug === slug)
}

export function formatVnd(price: number) {
  return `${price.toLocaleString("vi-VN")}đ`
}

export function statusLabel(status: TinhTrangSanPham) {
  switch (status) {
    case "con_hang":
      return "Còn hàng"
    case "sap_het":
      return "Sắp hết"
    case "het_hang":
      return "Hết hàng"
    case "dat_sourcing":
      return "Đặt sourcing"
    default:
      return "Đang cập nhật"
  }
}

function toProductCard(product: ProductDetailDTO): ProductCardDTO {
  return {
    id: product.id,
    slug: product.slug,
    ten: product.ten,
    gia_ban: product.gia_ban,
    gia_goc: product.gia_goc,
    tinh_trang: product.tinh_trang,
    tags: product.tags,
    anh_chinh: product.anh_chinh,
    danh_muc_slug: product.danh_muc_slug,
    thuong_hieu: product.thuong_hieu,
    loai_da: product.loai_da,
    cong_dung_tom_tat: product.cong_dung,
  }
}
