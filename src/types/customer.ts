export type CustomerAddress = {
  id: number
  recipientName: string
  recipientPhone: string
  provinceName: string
  districtName: string
  wardName: string
  addressLine: string
  postalCode: string
  defaultAddress: boolean
}

export type CustomerProfile = {
  id: number
  publicId: string
  fullName: string
  phone: string
  email: string
  status: string
  addresses: CustomerAddress[]
}

export type CustomerProfileResponse = {
  success: true
  data: CustomerProfile
}
