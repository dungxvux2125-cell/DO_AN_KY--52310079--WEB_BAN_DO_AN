export type Page =
  | "home"
  | "order"
  | "delivery"
  | "payment"
  | "login"
  | "register"
  | "management"

export type Category =
  | "Tất cả"
  | "Ưu đãi"
  | "Món chính"
  | "Món Việt"
  | "Hoa quả"
  | "Đồ uống"
  | "Ăn nhẹ"
  | "Tráng miệng"
  | "Healthy & Ăn kiêng"
  | "Gia vị & Đồ khô"
  | "Combo"
export type PaymentMethod = "COD" | "VietQR"
export type OrderStatus = "Chờ duyệt" | "Đang chuẩn bị" | "Đang giao" | "Hoàn tất" | "Đã hủy"
export type Role = "customer" | "staff" | "admin"

export type User = {
  id?: string
  name: string
  email: string
  role: Role
  phone?: string
  address?: string
  status?: "active" | "locked"
  createdAt?: string
}

export type ManagementView =
  | "orders"
  | "menu"
  | "reports"
  | "salary"
  | "vouchers"
  | "timekeeping"
  | "reviews"
  | "users"

export type Dish = {
  id: number
  name: string
  category: Exclude<Category, "Tất cả">
  price: number
  promoPrice?: number
  image: string
  description: string
  ingredients?: string[]
  nutritionInfo?: {
    portion?: string
    calories?: string
    protein?: string
    origin?: string
    preservation?: string
  }
  toppings: string[]
  available: boolean
  sold: number
}

export type CartItem = {
  dishId: number
  quantity: number
  toppings: string[]
  note?: string
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

export type Review = {
  id: string
  dishId: number
  dishName: string
  customerName: string
  rating: number
  comment: string
  createdAt: string
  reply?: string
  avatar?: string
  image?: string // Đính kèm ảnh chụp thực tế món ăn
}


