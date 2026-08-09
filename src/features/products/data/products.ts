import { COMMERCE_CONFIG } from "@/config/commerce"
import type { ProductCardDTO, ProductDetailDTO, ProductStatus } from "@/types/product"

const productsData: ProductDetailDTO[] = [
  {
    id: "P001",
    slug: "serum-vitamin-c-15",
    name: "Serum Vitamin C 15%",
    price: 420000,
    compareAtPrice: 520000,
    status: "in_stock",
    tags: ["Bán chạy", "Có sẵn"],
    image: "/vitamin-c-serum.jpg",
    categorySlug: "cham-soc-da",
    brand: "Dear, Klairs",
    origin: "Hàn Quốc",
    size: "35ml",
    skinTypes: ["Da xỉn màu", "Da hỗn hợp", "Da thường"],
    shortDescription: "Serum giúp da sáng đều màu, kết cấu thấm nhanh, phù hợp da xỉn màu.",
    benefits: [
      "Hỗ trợ làm sáng và đều màu da.",
      "Giảm cảm giác khô ráp sau rửa mặt.",
      "Bổ sung chống oxy hóa cho da ban ngày.",
    ],
    directions: [
      "Dùng 2-3 giọt sau bước làm sạch và toner.",
      "Dùng 1-2 lần/ngày trước kem dưỡng.",
      "Ban ngày dùng thêm kem chống nắng.",
    ],
    cautions: [
      "Thử trước trên vùng da nhỏ.",
      "Ngưng dùng nếu có dấu hiệu kích ứng.",
      "Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.",
    ],
  },
  {
    id: "P002",
    slug: "kem-duong-am-ceramide",
    name: "Kem Dưỡng Ẩm Ceramide",
    price: 380000,
    compareAtPrice: 450000,
    status: "in_stock",
    tags: ["Mới", "Có sẵn"],
    image: "/rose-face-cream.jpg",
    categorySlug: "cham-soc-da",
    brand: "Illiyoon",
    origin: "Hàn Quốc",
    size: "75ml",
    skinTypes: ["Da khô", "Da nhạy cảm"],
    shortDescription: "Kem dưỡng phục hồi hàng rào ẩm, chất kem mịn, không bết dính.",
    benefits: [
      "Hỗ trợ giảm khô căng sau khi rửa mặt.",
      "Giữ ẩm tốt trong môi trường máy lạnh.",
      "Tăng độ mềm mượt bề mặt da.",
    ],
    directions: ["Lấy lượng vừa đủ sau serum.", "Vỗ nhẹ để kem thấm đều.", "Dùng sáng và tối."],
    cautions: ["Tránh để sản phẩm dính vào mắt.", "Đậy nắp kín sau khi dùng."],
  },
  {
    id: "P003",
    slug: "sua-rua-mat-do-pH-thap",
    name: "Sữa Rửa Mặt pH Thấp",
    price: 210000,
    compareAtPrice: 260000,
    status: "low_stock",
    tags: ["Phổ biến", "Có sẵn"],
    image: "/cleansing-foam.jpg",
    categorySlug: "cham-soc-da",
    brand: "COSRX",
    origin: "Hàn Quốc",
    size: "150ml",
    skinTypes: ["Da dầu", "Da hỗn hợp", "Da nhạy cảm"],
    shortDescription: "Làm sạch dịu nhẹ, hỗ trợ cân bằng da với độ pH thân thiện.",
    benefits: [
      "Làm sạch bụi bẩn và dầu thừa cuối ngày.",
      "Giảm cảm giác khô rít sau khi rửa.",
      "Phù hợp dùng hằng ngày.",
    ],
    directions: ["Làm ướt mặt, lấy lượng nhỏ sản phẩm.", "Massage nhẹ 30-40 giây rồi rửa sạch."],
    cautions: ["Không chà xát mạnh khi rửa mặt.", "Kết hợp kem dưỡng để giữ ẩm tốt hơn."],
  },
  {
    id: "P004",
    slug: "son-tint-mau-tu-nhien",
    name: "Son Tint Màu Tự Nhiên",
    price: 245000,
    compareAtPrice: 290000,
    status: "in_stock",
    tags: ["Bán chạy", "Có sẵn"],
    image: "/lip-tint.jpg",
    categorySlug: "trang-diem",
    brand: "Rom&nd",
    origin: "Hàn Quốc",
    size: "4g",
    skinTypes: ["Mọi loại da"],
    shortDescription: "Son tint mỏng nhẹ, màu tươi tự nhiên, độ bám tốt trong ngày.",
    benefits: ["Tạo màu môi trong trẻo, dễ chồng lớp.", "Bề mặt môi căng nhẹ, không dày môi."],
    directions: [
      "Thoa 1 lớp mỏng lòng môi để hiệu ứng tự nhiên.",
      "Có thể thoa full môi để màu rõ hơn.",
    ],
    cautions: ["Dưỡng ẩm môi trước khi thoa để màu đều hơn."],
  },
  {
    id: "P005",
    slug: "mascara-cong-mi-lau-troi",
    name: "Mascara Cong Mi Lâu Trôi",
    price: 310000,
    compareAtPrice: 360000,
    status: "sourcing",
    tags: ["Tìm theo yêu cầu"],
    image: "/mascara.jpg",
    categorySlug: "trang-diem",
    brand: "Kiss Me",
    origin: "Hàn Quốc",
    size: "6g",
    skinTypes: ["Mọi loại da"],
    shortDescription: "Mascara chống lem, giữ độ cong mi và dễ làm sạch cuối ngày.",
    benefits: ["Giúp mi trông dày và cong tự nhiên.", "Hạn chế lem khi hoạt động cả ngày."],
    directions: ["Kẹp mi trước khi chuốt.", "Chuốt từ chân mi theo đường ziczac."],
    cautions: ["Dùng tẩy trang chuyên dụng cho mắt để làm sạch."],
  },
  {
    id: "P006",
    slug: "tay-da-chet-body-duong-am",
    name: "Tẩy Da Chết Body Dưỡng Ẩm",
    price: 330000,
    compareAtPrice: 390000,
    status: "in_stock",
    tags: ["Có sẵn"],
    image: "/body-scrub.jpg",
    categorySlug: "cham-soc-co-the",
    brand: "Ariul",
    origin: "Hàn Quốc",
    size: "200ml",
    skinTypes: ["Da thường", "Da khô"],
    shortDescription: "Tẩy tế bào chết cơ thể với hạt mịn, hỗ trợ da mềm mượt hơn.",
    benefits: ["Làm mịn bề mặt da vùng khuỷu tay, đầu gối.", "Giúp dưỡng thể thấm tốt hơn."],
    directions: ["Dùng 2-3 lần/tuần trên da ẩm.", "Massage nhẹ rồi rửa sạch với nước."],
    cautions: ["Không dùng lên vùng da đang tổn thương."],
  },
  {
    id: "P007",
    slug: "duong-the-huong-thao-moc",
    name: "Dưỡng Thể Hương Thảo Mộc",
    price: 295000,
    compareAtPrice: 340000,
    status: "in_stock",
    tags: ["Mới", "Có sẵn"],
    image: "/body-butter.jpg",
    categorySlug: "cham-soc-co-the",
    brand: "The Saem",
    origin: "Hàn Quốc",
    size: "250ml",
    skinTypes: ["Da khô", "Da thường"],
    shortDescription: "Dưỡng thể kết cấu mịn, mùi dịu nhẹ, phù hợp dùng mỗi ngày.",
    benefits: ["Dưỡng ẩm và giảm cảm giác khô ráp da cơ thể.", "Giữ da mềm mượt sau khi tắm."],
    directions: [
      "Thoa sau khi tắm khi da còn hơi ẩm.",
      "Tập trung vào vùng da khô như khuỷu tay, đầu gối.",
    ],
    cautions: ["Ngưng dùng nếu có dấu hiệu không phù hợp."],
  },
  {
    id: "P008",
    slug: "kem-chong-nang-spf50",
    name: "Kem Chống Nắng SPF50+",
    price: 360000,
    compareAtPrice: 420000,
    status: "out_of_stock",
    tags: ["Phổ biến"],
    image: "/sunscreen.jpg",
    categorySlug: "cham-soc-da",
    brand: "Beauty of Joseon",
    origin: "Hàn Quốc",
    size: "50ml",
    skinTypes: ["Da dầu", "Da hỗn hợp", "Da thường"],
    shortDescription: "Chống nắng phổ rộng, chất kem nhẹ, phù hợp dùng hằng ngày.",
    benefits: ["Hỗ trợ bảo vệ da trước tia UV.", "Lớp finish tự nhiên, không nặng mặt."],
    directions: [
      "Thoa trước khi ra nắng 15 phút.",
      "Thoa lại sau mỗi 2-3 giờ khi hoạt động ngoài trời.",
    ],
    cautions: ["Dùng đủ lượng để đạt hiệu quả bảo vệ tốt."],
  },
]

export const featuredProducts: ProductCardDTO[] = productsData.slice(0, 6).map(toProductCard)

export const allProducts: ProductCardDTO[] = productsData.map(toProductCard)

export function getProductBySlug(slug: string) {
  return productsData.find((item) => item.slug === slug)
}

export function getProductsByCategory(slug: string) {
  return allProducts.filter((item) => item.categorySlug === slug)
}

export function getProductDetailsByCategory(slug: string) {
  return productsData.filter((item) => item.categorySlug === slug)
}

export function formatVnd(price: number) {
  return new Intl.NumberFormat(COMMERCE_CONFIG.locale, {
    style: "currency",
    currency: COMMERCE_CONFIG.currency,
    maximumFractionDigits: 0,
  }).format(price)
}

export function statusLabel(status: ProductStatus) {
  switch (status) {
    case "in_stock":
      return "Còn hàng"
    case "low_stock":
      return "Sắp hết"
    case "out_of_stock":
      return "Hết hàng"
    case "sourcing":
      return "Tìm theo yêu cầu"
    default:
      return "Đang cập nhật"
  }
}

function toProductCard(product: ProductDetailDTO): ProductCardDTO {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    status: product.status,
    tags: product.tags,
    image: product.image,
    categorySlug: product.categorySlug,
    brand: product.brand,
    skinTypes: product.skinTypes,
    highlights: product.benefits,
  }
}
