export type Page =
  | "home"
  | "order"
  | "delivery"
  | "payment"
  | "login"
  | "register"
  | "management"

export type Category = "Tất cả" | "Món chính" | "Ăn nhẹ" | "Đồ uống" | "Combo"
export type PaymentMethod = "COD" | "VietQR"
export type OrderStatus = "Chờ duyệt" | "Đang chuẩn bị" | "Đang giao" | "Hoàn tất" | "Đã hủy"
export type Role = "customer" | "staff" | "admin"

export type User = {
  name: string
  email: string
  role: Role
}

export type Dish = {
  id: number
  name: string
  category: Exclude<Category, "Tất cả">
  price: number
  promoPrice?: number
  image: string
  model3d?: string
  description: string
  toppings: string[]
  available: boolean
  sold: number
}

export type CartItem = {
  dishId: number
  quantity: number
  toppings: string[]
}

export type CartDetail = CartItem & {
  dish: Dish
  unitPrice: number
  lineTotal: number
}

export type Order = {
  id: string
  customerName: string
  phoneMasked: string
  addressMasked: string
  email: string
  payment: PaymentMethod
  total: number
  status: OrderStatus
  createdAt: string
  items: CartItem[]
}

export type StaffSalary = {
  id: string
  name: string
  role: string
  shiftCount: number
  baseSalary: number
  bonus: number
  deduction: number
}

export type Voucher = {
  id: string
  code: string
  label: string
  type: "percent" | "fixed"
  value: number
  min: number
  active: boolean
}

export type TimekeepingRecord = {
  id: string
  staffId: string
  staffName: string
  date: string
  shift: string
  checkInTime: string
  checkOutTime?: string
  status: "Đang làm" | "Hoàn thành"
}

