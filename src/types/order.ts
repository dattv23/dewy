export type TrackingType = "order" | "request"

export type TrackingStatus =
  "received" | "quoting" | "processing" | "shipping" | "completed" | "needs_information"

export type TrackingRecord = {
  type: TrackingType
  trackingCode: string
  phoneNumber: string
  customerName: string
  updatedAt: string
  status: TrackingStatus
  summary: string
  timeline: Array<{
    label: string
    time: string
    done: boolean
  }>
  nextAction: string
}
