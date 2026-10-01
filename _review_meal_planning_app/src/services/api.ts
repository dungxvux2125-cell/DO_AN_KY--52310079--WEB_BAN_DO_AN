import type { Dish, Order, PaymentMethod, Role, User } from "../types"

const API_BASE = "http://localhost:5000/api"

export async function checkServerHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: "GET" })
    if (!res.ok) return false
    const data = await res.json()
    return Boolean(data.connected)
  } catch {
    return false
  }
}

// 1. Auth APIs
export async function apiLogin(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { success: false, error: data.error || "Đăng nhập thất bại." }
    }
    return { success: true, user: data.user }
  } catch (err: any) {
    return { success: false, error: "Không thể kết nối đến máy chủ MongoDB (Port 5000)." }
  }
}

export async function apiRegister(
  name: string,
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    if (!res.ok) {
      return { success: false, error: data.error || "Đăng ký thất bại." }
    }
    return { success: true, user: data.user }
  } catch (err: any) {
    return { success: false, error: "Không thể kết nối đến máy chủ MongoDB (Port 5000)." }
  }
}

// 2. Dishes APIs
export async function apiGetDishes(): Promise<Dish[] | null> {
  try {
    const res = await fetch(`${API_BASE}/dishes`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function apiAddDish(dish: {
  name: string
  category: string
  price: number
  promoPrice?: number
  image?: string
  description?: string
  toppings?: string[]
}): Promise<Dish | null> {
  try {
    const res = await fetch(`${API_BASE}/dishes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dish),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function apiToggleDish(dishId: number): Promise<Dish | null> {
  try {
    const res = await fetch(`${API_BASE}/dishes/${dishId}/toggle`, {
      method: "PATCH",
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

// 3. Orders APIs
export async function apiGetOrders(): Promise<Order[] | null> {
  try {
    const res = await fetch(`${API_BASE}/orders`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function apiCreateOrder(orderData: {
  customerName: string
  phoneMasked: string
  addressMasked: string
  email: string
  payment: PaymentMethod
  total: number
  items: Array<{ dishId: number; quantity: number; toppings: string[] }>
}): Promise<Order | null> {
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

export async function apiUpdateOrderStatus(orderId: string, status: string): Promise<Order | null> {
  try {
    const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

