export type TrackingStatus =
  | "da_tiep_nhan"
  | "dang_bao_gia"
  | "dang_xu_ly"
  | "dang_van_chuyen"
  | "hoan_tat"
  | "can_bo_sung"

export type TrackingRecord = {
  loai: "don_mua" | "yeu_cau"
  ma_tra_cuu: string
  so_dien_thoai: string
  ten_khach: string
  cap_nhat_luc: string
  status: TrackingStatus
  tom_tat: string
  timeline: {
    label: string
    time: string
    done: boolean
  }[]
  hanh_dong_tiep_theo: string
}

export const trackingRecords: TrackingRecord[] = [
  {
    loai: "don_mua",
    ma_tra_cuu: "DH2481",
    so_dien_thoai: "0901234567",
    ten_khach: "Nguyễn Minh Anh",
    cap_nhat_luc: "10:20 - 03/02/2026",
    status: "dang_van_chuyen",
    tom_tat: "Đơn hàng đang vận chuyển đến địa chỉ nhận.",
    timeline: [
      { label: "Đã tiếp nhận", time: "09:00 - 01/02/2026", done: true },
      { label: "Đang xử lý", time: "16:30 - 01/02/2026", done: true },
      { label: "Đã gửi", time: "11:10 - 03/02/2026", done: true },
      { label: "Hoàn tất", time: "Dự kiến 05/02/2026", done: false },
    ],
    hanh_dong_tiep_theo: "Vui lòng giữ điện thoại để nhận hàng đúng hẹn.",
  },
  {
    loai: "yeu_cau",
    ma_tra_cuu: "KR2481",
    so_dien_thoai: "0901234567",
    ten_khach: "Nguyễn Minh Anh",
    cap_nhat_luc: "14:45 - 04/02/2026",
    status: "dang_bao_gia",
    tom_tat: "Đang xác nhận báo giá cho sản phẩm bạn yêu cầu.",
    timeline: [
      { label: "Đã tiếp nhận", time: "10:14 - 04/02/2026", done: true },
      { label: "Đang báo giá", time: "14:45 - 04/02/2026", done: true },
      { label: "Đang xử lý", time: "Chờ cập nhật", done: false },
      { label: "Hoàn tất", time: "Chờ cập nhật", done: false },
    ],
    hanh_dong_tiep_theo: "Bạn sẽ nhận thông báo SMS/email khi có báo giá chi tiết.",
  },
]

export function findTrackingRecord(
  loai: "don_mua" | "yeu_cau",
  maTraCuu: string,
  soDienThoai: string,
) {
  return trackingRecords.find(
    (item) =>
      item.loai === loai &&
      item.ma_tra_cuu.toLowerCase() === maTraCuu.trim().toLowerCase() &&
      item.so_dien_thoai === soDienThoai.trim(),
  )
}
