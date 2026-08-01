import type { TrackingRecord, TrackingType } from "@/types/order"

export const trackingRecords: TrackingRecord[] = [
  {
    type: "order",
    trackingCode: "DH2481",
    phoneNumber: "0901234567",
    customerName: "Nguyễn Minh Anh",
    updatedAt: "10:20 - 03/02/2026",
    status: "shipping",
    summary: "Đơn hàng đang vận chuyển đến địa chỉ nhận.",
    timeline: [
      { label: "Đã tiếp nhận", time: "09:00 - 01/02/2026", done: true },
      { label: "Đang xử lý", time: "16:30 - 01/02/2026", done: true },
      { label: "Đã gửi", time: "11:10 - 03/02/2026", done: true },
      { label: "Hoàn tất", time: "Dự kiến 05/02/2026", done: false },
    ],
    nextAction: "Vui lòng giữ điện thoại để nhận hàng đúng hẹn.",
  },
  {
    type: "request",
    trackingCode: "KR2481",
    phoneNumber: "0901234567",
    customerName: "Nguyễn Minh Anh",
    updatedAt: "14:45 - 04/02/2026",
    status: "quoting",
    summary: "Đang xác nhận báo giá cho sản phẩm bạn yêu cầu.",
    timeline: [
      { label: "Đã tiếp nhận", time: "10:14 - 04/02/2026", done: true },
      { label: "Đang báo giá", time: "14:45 - 04/02/2026", done: true },
      { label: "Đang xử lý", time: "Chờ cập nhật", done: false },
      { label: "Hoàn tất", time: "Chờ cập nhật", done: false },
    ],
    nextAction: "Bạn sẽ nhận thông báo SMS/email khi có báo giá chi tiết.",
  },
]

export function findTrackingRecord(type: TrackingType, trackingCode: string, phoneNumber: string) {
  return trackingRecords.find(
    (item) =>
      item.type === type &&
      item.trackingCode.toLowerCase() === trackingCode.trim().toLowerCase() &&
      item.phoneNumber === phoneNumber.trim(),
  )
}
