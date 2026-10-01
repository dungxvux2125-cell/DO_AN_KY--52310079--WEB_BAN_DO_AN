import { useState } from "react"
import { ADMIN_ACCOUNT, CUSTOMER_ACCOUNT, STAFF_ACCOUNT } from "../data"
import { SectionHeading } from "../components/TieuDePhan"
import { formatCurrency } from "../utils"
import type { CartItem, Dish, Order, OrderStatus, Page, User } from "../types"

type LoginForm = { email: string; password: string }
type RegisterForm = { name: string; email: string; password: string; confirmPassword: string }

export function AuthPage({
  user,
  setUser,
  orders = [],
  dishes = [],
  onReorder,
  mode,
  loginForm,
  setLoginForm,
  registerForm,
  setRegisterForm,
  authMessage,
  onLogin,
  onRegister,
  go,
}: {
  user?: User | null
  setUser?: (u: User | null) => void
  orders?: Order[]
  dishes?: Dish[]
  onReorder?: (items: CartItem[]) => void
  mode: "login" | "register"
  loginForm: LoginForm
  setLoginForm: (value: LoginForm) => void
  registerForm: RegisterForm
  setRegisterForm: (value: RegisterForm) => void
  authMessage: string
  onLogin: () => void
  onRegister: () => void
  go: (page: Page) => void
}) {
  const [activeQuickFill, setActiveQuickFill] = useState<string>("")
  const [orderFilter, setOrderFilter] = useState<"all" | "active" | "completed">("all")
  const [showAllOrders, setShowAllOrders] = useState(false)

  const fillAccount = (role: "customer" | "staff" | "admin") => {
    setActiveQuickFill(role)
    if (role === "customer") {
      setLoginForm({ email: CUSTOMER_ACCOUNT.email, password: CUSTOMER_ACCOUNT.password })
    } else if (role === "staff") {
      setLoginForm({ email: STAFF_ACCOUNT.email, password: STAFF_ACCOUNT.password })
    } else {
      setLoginForm({ email: ADMIN_ACCOUNT.email, password: ADMIN_ACCOUNT.password })
    }
  }

  // If user is logged in, show User Profile & Live Order Tracking
  if (user) {
    // Filter orders matching logged-in user
    const myOrders = showAllOrders
      ? orders
      : orders.filter(
          (o) =>
            (o.email && o.email.toLowerCase() === user.email.toLowerCase()) ||
            (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase())
        )

    const activeOrders = myOrders.filter((o) => o.status !== "Hoàn tất" && o.status !== "Đã hủy")
    const completedOrders = myOrders.filter((o) => o.status === "Hoàn tất" || o.status === "Đã hủy")

    const displayedOrders =
      orderFilter === "active"
        ? activeOrders
        : orderFilter === "completed"
        ? completedOrders
        : myOrders

    return (
      <section className="page-shell page-shell-wide">
        {/* User Info Header Card */}
        <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-r from-[#2a1b15] via-[#3a221b] to-[#1c120e] p-6 md:p-8 text-white shadow-xl mb-8">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#b42318] to-amber-500 text-2xl font-black text-white shadow-lg shadow-black/40">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black text-white">{user.name}</h1>
                  <span className="rounded-full bg-amber-400/20 border border-amber-300/30 px-3 py-0.5 text-xs font-bold text-amber-300">
                    {user.role === "admin"
                      ? "👑 Quản trị viên"
                      : user.role === "staff"
                      ? "👨‍🍳 Nhân viên vận hành"
                      : "⭐ Khách hàng thân thiết"}
                  </span>
                </div>
                <p className="mt-1 text-sm text-stone-300">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => go("order")}
                className="rounded-xl bg-[#b42318] px-4 py-2.5 text-sm font-black text-white shadow-md hover:bg-[#961c12] transition-colors"
              >
                🍽️ Đặt món ngay
              </button>
              {(user.role === "admin" || user.role === "staff") && (
                <button
                  type="button"
                  onClick={() => go("management")}
                  className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                >
                  ⚙️ Trang quản lý
                </button>
              )}
              {setUser && (
                <button
                  type="button"
                  onClick={() => setUser(null)}
                  className="rounded-xl border border-rose-400/30 bg-rose-950/40 px-4 py-2.5 text-sm font-bold text-rose-300 hover:bg-rose-900/50 transition-colors"
                >
                  🚪 Đăng xuất
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Tracking Dashboard Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-black text-stone-900 flex items-center gap-2">
              <span>📦</span> Theo Dõi Đơn Hàng & Tiến Trình Giao Hàng
            </h2>
            <p className="text-sm text-stone-600 mt-1">
              Xem chi tiết món ăn, thời gian giao và trạng thái vận chuyển thời gian thực.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-xl border border-stone-300 bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setOrderFilter("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  orderFilter === "all" ? "bg-[#b42318] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Tất cả ({myOrders.length})
              </button>
              <button
                type="button"
                onClick={() => setOrderFilter("active")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  orderFilter === "active" ? "bg-[#b42318] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Đang giao ({activeOrders.length})
              </button>
              <button
                type="button"
                onClick={() => setOrderFilter("completed")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  orderFilter === "completed" ? "bg-[#b42318] text-white" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                Đã xong ({completedOrders.length})
              </button>
            </div>

            {myOrders.length === 0 && orders.length > 0 && (
              <button
                type="button"
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="rounded-xl border border-amber-400 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 hover:bg-amber-100 transition-colors"
              >
                {showAllOrders ? "Chỉ xem đơn của tôi" : "👀 Xem đơn mẫu của quán"}
              </button>
            )}
          </div>
        </div>

        {/* Orders List */}
        {displayedOrders.length === 0 ? (
          <div className="rounded-3xl border border-stone-200 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-4xl mb-4">
              🥡
            </div>
            <h3 className="text-lg font-black text-stone-800">Bạn chưa có đơn hàng nào</h3>
            <p className="mt-1 text-sm text-stone-500 max-w-md mx-auto">
              Hãy đặt các món ăn thơm ngon trong thực đơn FoodVD để theo dõi tiến trình giao hàng ngay tại đây!
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => go("order")}
                className="cta-button"
              >
                Xem thực đơn & Đặt món ngay
              </button>
              {orders.length > 0 && !showAllOrders && (
                <button
                  type="button"
                  onClick={() => setShowAllOrders(true)}
                  className="ghost-button"
                >
                  Xem đơn hàng mẫu hệ thống ({orders.length})
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {displayedOrders.map((order) => {
              return (
                <OrderTrackingCard
                  key={order.id}
                  order={order}
                  dishes={dishes}
                  onReorder={onReorder}
                />
              )
            })}
          </div>
        )}
      </section>
    )
  }

  // Default: Login or Register mode when !user
  return (
    <section className="page-shell">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_1fr] items-stretch">
        
        {/* Left Banner: High-End Food Visual & Branding */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl min-h-[420px] lg:min-h-[580px] flex flex-col justify-between p-8 text-white">
          <img
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1000&auto=format&fit=crop"
            alt="Ẩm thực FoodVD"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-900/30" />

          <div className="relative z-10 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#b42318] text-lg font-black shadow-lg">
              🍲
            </span>
            <div>
              <p className="text-xs font-black tracking-widest text-[#fed7aa] uppercase">Hệ Thống Đặt Món</p>
              <h2 className="text-lg font-black tracking-tight text-white">FoodVD Culinary</h2>
            </div>
          </div>

          <div className="relative z-10 mt-auto pt-16">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-950/70 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md mb-4">
              <span>✨</span> Trải nghiệm ẩm thực hiện đại & tươi ngon
            </div>

            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl text-white">
              Hương vị đậm đà, <br />
              <span className="text-[#fca5a5]">giao tận nơi trong 30 phút.</span>
            </h1>

            <p className="mt-3 text-sm leading-relaxed text-stone-300 max-w-md">
              Đăng nhập ngay để khám phá thực đơn hơn 17 món ăn, tùy biến topping theo ý thích và theo dõi tiến trình giao hàng trực tuyến.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
              <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-md text-center">
                <span className="text-xl">🍜</span>
                <p className="mt-1 text-xs font-bold text-white">Chuẩn vị</p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-md text-center">
                <span className="text-xl">🚀</span>
                <p className="mt-1 text-xs font-bold text-white">Giao 30p</p>
              </div>
              <div className="rounded-xl bg-white/10 p-2.5 backdrop-blur-md text-center">
                <span className="text-xl">💳</span>
                <p className="mt-1 text-xs font-bold text-white">VietQR / COD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Clean Form */}
        <div className="soft-panel flex flex-col justify-between">
          <div>
            <div className="mb-6 flex rounded-2xl border border-[#eadfd2] bg-[#fff8ef] p-1.5">
              <button
                type="button"
                onClick={() => go("login")}
                className={`flex-1 rounded-xl py-2.5 text-center text-sm font-black transition-all ${
                  mode === "login"
                    ? "bg-[#b42318] text-white shadow-md"
                    : "text-[#57534e] hover:text-[#211a16]"
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => go("register")}
                className={`flex-1 rounded-xl py-2.5 text-center text-sm font-black transition-all ${
                  mode === "register"
                    ? "bg-[#b42318] text-white shadow-md"
                    : "text-[#57534e] hover:text-[#211a16]"
                }`}
              >
                Đăng ký
              </button>
            </div>

            {mode === "login" ? (
              <>
                <SectionHeading
                  eyebrow="Chào mừng trở lại"
                  title="Đăng nhập tài khoản"
                  description="Nhập thông tin tài khoản của bạn để tiếp tục đặt món hoặc theo dõi đơn hàng."
                />

                <label className="field-label mt-5">
                  Email
                  <input
                    type="email"
                    value={loginForm.email}
                    placeholder="name@example.com"
                    onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })}
                    className="soft-input"
                  />
                </label>

                <label className="field-label mt-4">
                  Mật khẩu
                  <input
                    type="password"
                    value={loginForm.password}
                    placeholder="••••••••"
                    onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })}
                    className="soft-input"
                  />
                </label>

                {authMessage && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-[#b42318]">
                    ⚠️ {authMessage}
                  </div>
                )}

                <button onClick={onLogin} className="mt-6 w-full cta-button">
                  Đăng nhập vào FoodVD
                </button>

                <button onClick={() => go("register")} className="mt-3 w-full ghost-button">
                  Chưa có tài khoản? Đăng ký ngay
                </button>
              </>
            ) : (
              <>
                <SectionHeading
                  eyebrow="Thành viên mới"
                  title="Tạo tài khoản khách hàng"
                  description="Tài khoản mới được lưu trực tiếp vào cơ sở dữ liệu MongoDB và kích hoạt ngay."
                />
                {(["name", "email", "password", "confirmPassword"] as const).map((key) => (
                  <label key={key} className="field-label mt-3">
                    {{
                      name: "Họ tên",
                      email: "Email",
                      password: "Mật khẩu",
                      confirmPassword: "Nhập lại mật khẩu",
                    }[key]}
                    <input
                      type={key.includes("password") || key.includes("Password") ? "password" : "text"}
                      value={registerForm[key]}
                      placeholder={key === "email" ? "name@example.com" : key.includes("password") || key.includes("Password") ? "••••••••" : "Họ và tên"}
                      onChange={(event) => setRegisterForm({ ...registerForm, [key]: event.target.value })}
                      className="soft-input"
                    />
                  </label>
                ))}

                {authMessage && (
                  <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-[#b42318]">
                    ⚠️ {authMessage}
                  </div>
                )}

                <button onClick={onRegister} className="mt-5 w-full cta-button">
                  Hoàn tất đăng ký
                </button>

                <button onClick={() => go("login")} className="mt-3 w-full ghost-button">
                  Đã có tài khoản? Đăng nhập ngay
                </button>
              </>
            )}
          </div>

          {/* Quick Demo Autofill helper for testing/presentation */}
          {mode === "login" && (
            <div className="mt-6 rounded-2xl border border-dashed border-[#e2d5c5] bg-[#fffdfa] p-3 text-xs">
              <p className="font-bold text-stone-500 mb-2">⚡ Điền nhanh tài khoản mẫu thử nghiệm:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => fillAccount("customer")}
                  className={`rounded-lg px-2.5 py-1.5 font-bold transition-all ${
                    activeQuickFill === "customer"
                      ? "bg-stone-800 text-white"
                      : "bg-[#f5ece0] text-stone-700 hover:bg-[#ebdccb]"
                  }`}
                >
                  👤 Khách hàng
                </button>
                <button
                  type="button"
                  onClick={() => fillAccount("staff")}
                  className={`rounded-lg px-2.5 py-1.5 font-bold transition-all ${
                    activeQuickFill === "staff"
                      ? "bg-stone-800 text-white"
                      : "bg-[#f5ece0] text-stone-700 hover:bg-[#ebdccb]"
                  }`}
                >
                  👨‍🍳 Nhân viên
                </button>
                <button
                  type="button"
                  onClick={() => fillAccount("admin")}
                  className={`rounded-lg px-2.5 py-1.5 font-bold transition-all ${
                    activeQuickFill === "admin"
                      ? "bg-stone-800 text-white"
                      : "bg-[#f5ece0] text-stone-700 hover:bg-[#ebdccb]"
                  }`}
                >
                  👑 Quản trị viên
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ----------------------------------------------------
// OrderTrackingCard: Live Visual Tracking for a single order
// ----------------------------------------------------
function OrderTrackingCard({
  order,
  dishes,
  onReorder,
}: {
  order: Order
  dishes: Dish[]
  onReorder?: (items: CartItem[]) => void
}) {
  const steps: Array<{ title: string; desc: string; icon: string }> = [
    { title: "Đã nhận đơn", desc: "Quán đã xác nhận", icon: "📝" },
    { title: "Đang nấu món", desc: "Bếp đang chế biến", icon: "🍳" },
    { title: "Đang giao hàng", desc: "Shipper đang di chuyển", icon: "🛵" },
    { title: "Hoàn tất", desc: "Đã giao tận tay", icon: "🎁" },
  ]

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case "Chờ duyệt":
        return 0
      case "Đang chuẩn bị":
        return 1
      case "Đang giao":
        return 2
      case "Hoàn tất":
        return 3
      default:
        return -1
    }
  }

  const currentStep = getStepIndex(order.status)
  const isCancelled = order.status === "Đã hủy"

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 md:p-7 shadow-sm transition-all hover:shadow-md">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-stone-100 pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-xl font-bold text-amber-800">
            🥢
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-stone-900 text-base">Đơn hàng #{order.id}</h3>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-black ${
                  order.status === "Hoàn tất"
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : order.status === "Đang giao"
                    ? "bg-sky-100 text-sky-800 border border-sky-300 animate-pulse"
                    : order.status === "Đang chuẩn bị"
                    ? "bg-orange-100 text-orange-800 border border-orange-300"
                    : order.status === "Đã hủy"
                    ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : "bg-amber-100 text-amber-800 border border-amber-300"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">Đặt lúc: {order.createdAt}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-stone-500">Tổng thanh toán</p>
          <p className="text-lg font-black text-[#b42318]">{formatCurrency(order.total)}</p>
        </div>
      </div>

      {/* Live Stepper Tracker */}
      {!isCancelled && (
        <div className="my-6 rounded-2xl bg-[#fffaf4] border border-[#f5e7d5] p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-900/70 mb-4">
            🚀 Tiến trình giao hàng thời gian thực:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
            {steps.map((s, idx) => {
              const isPast = idx <= currentStep
              const isCurrent = idx === currentStep

              return (
                <div
                  key={s.title}
                  className={`flex flex-col items-center text-center p-3 rounded-xl border transition-all ${
                    isCurrent
                      ? "border-[#b42318] bg-white shadow-md scale-105"
                      : isPast
                      ? "border-emerald-200 bg-emerald-50/60 text-stone-800"
                      : "border-stone-200 bg-stone-50/70 text-stone-400"
                  }`}
                >
                  <span className="text-2xl mb-1.5">{s.icon}</span>
                  <p className={`text-xs font-black ${isCurrent ? "text-[#b42318]" : isPast ? "text-emerald-900" : "text-stone-400"}`}>
                    {s.title}
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">{s.desc}</p>
                  {isCurrent && (
                    <span className="mt-2 rounded-full bg-[#b42318] px-2 py-0.5 text-[9px] font-bold text-white">
                      Đang xử lý
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Context status banner */}
          <div className="mt-4 flex items-center gap-2 rounded-xl bg-amber-100/70 px-3 py-2 text-xs font-semibold text-amber-950">
            <span>ℹ️</span>
            {order.status === "Chờ duyệt" && (
              <span>Đơn hàng đang chờ quản lý xác nhận. Quán sẽ chuẩn bị ngay sau ít phút.</span>
            )}
            {order.status === "Đang chuẩn bị" && (
              <span>Bếp đang chế biến món ăn tươi nóng và đóng gói cẩn thận.</span>
            )}
            {order.status === "Đang giao" && (
              <span className="text-sky-900 font-bold">
                🛵 Tài xế đang trên đường giao tới bạn! Dự kiến đến trong 15-20 phút. Vui lòng giữ máy!
              </span>
            )}
            {order.status === "Hoàn tất" && (
              <span className="text-emerald-900 font-bold">
                🎉 Đơn hàng đã giao thành công. Chúc bạn có một bữa ăn thật ngon miệng!
              </span>
            )}
          </div>
        </div>
      )}

      {/* Ordered Items Breakdown */}
      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
          Món ăn trong đơn:
        </p>
        <div className="divide-y divide-stone-100 rounded-2xl border border-stone-100 bg-stone-50/40 p-3">
          {order.items.map((item, idx) => {
            const dish = dishes.find((d) => d.id === item.dishId)
            return (
              <div key={idx} className="flex items-center justify-between py-2.5 first:pt-1 last:pb-1">
                <div className="flex items-center gap-3">
                  {dish?.image && (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="h-12 w-12 rounded-xl object-cover border border-stone-200"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      {dish ? dish.name : `Món #${item.dishId}`}{" "}
                      <span className="text-[#b42318] font-black">× {item.quantity}</span>
                    </p>
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-xs text-stone-500">
                        Topping: {item.toppings.join(", ")}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-sm font-bold text-stone-800">
                  {dish ? formatCurrency((dish.promoPrice || dish.price) * item.quantity) : ""}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Delivery & Payment Details Footer */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-stone-100 pt-4 text-xs text-stone-600">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          <p>
            📍 Giao đến: <strong>{order.addressMasked}</strong>
          </p>
          <p>
            📞 SĐT: <strong>{order.phoneMasked}</strong>
          </p>
          <p>
            💳 Phương thức:{" "}
            <strong>{order.payment === "VietQR" ? "VietQR Chuyển khoản" : "Tiền mặt (COD)"}</strong>
          </p>
        </div>

        {onReorder && (
          <button
            type="button"
            onClick={() => onReorder(order.items)}
            className="rounded-xl border border-[#b42318]/30 bg-[#fff5f5] px-3.5 py-1.5 text-xs font-black text-[#b42318] hover:bg-[#b42318] hover:text-white transition-all self-end md:self-center"
          >
            🛒 Đặt lại đơn này
          </button>
        )}
      </div>
    </div>
  )
}
