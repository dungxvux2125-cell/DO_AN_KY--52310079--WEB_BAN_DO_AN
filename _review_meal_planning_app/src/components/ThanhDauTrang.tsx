import { useState } from "react"
import { categoryOptions } from "../data"
import type { CartDetail, Category, ManagementView, Page, User } from "../types"

export function Header({
  page,
  go,
  cartCount,
  user,
  setUser,
  managementView,
  setManagementView,
  query = "",
  setQuery,
  category = "Tất cả",
  setCategory,
  cartDetails = [],
  changeQuantity,
  subtotal = 0,
}: {
  page: Page
  go: (page: Page) => void
  cartCount: number
  user: User | null
  setUser: (value: User | null) => void
  managementView?: "orders" | "menu" | "reports" | "salary" | "vouchers" | "timekeeping" | "reviews"
  setManagementView?: (value: "orders" | "menu" | "reports" | "salary" | "vouchers" | "timekeeping" | "reviews") => void
  query?: string
  setQuery?: (value: string) => void
  category?: Category
  setCategory?: (cat: Category) => void
  cartDetails?: CartDetail[]
  changeQuantity?: (index: number, delta: number) => void
  subtotal?: number
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  // 1. ADMIN HEADER (Clean, Modern & Minimalist)
  if (user?.role === "admin") {
    const adminNav: Array<[ManagementView, string, string]> = [
      ["reports", "Doanh thu", "📊"],
      ["orders", "Đơn hàng", "📦"],
      ["menu", "Sản phẩm", "🍔"],
      ["users", "Người dùng", "👥"],
      ["salary", "Lương", "💼"],
      ["vouchers", "Voucher", "🎟️"],
      ["reviews", "Đánh giá", "⭐"],
    ]
    return (
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          {/* Brand */}
          <button
            onClick={() => {
              go("management")
              if (setManagementView) setManagementView("menu")
            }}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <span className="text-2xl font-black tracking-tight text-black">FoodVD</span>
            <span className="rounded-md bg-stone-900 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              Admin
            </span>
          </button>

          {/* Clean Modern Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-stone-100/80 p-1 border border-stone-200/70">
            {adminNav.map(([targetView, label, icon]) => {
              const isActive = page === "management" && managementView === targetView
              return (
                <button
                  key={targetView}
                  onClick={() => {
                    go("management")
                    if (setManagementView) setManagementView(targetView)
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-stone-950 shadow-xs font-black"
                      : "text-stone-600 hover:text-black hover:bg-stone-200/50"
                  }`}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go("order")}
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200"
            >
              <span>🍽️</span>
              <span>Menu khách</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-stone-50 border border-stone-200 px-3 py-1 text-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] font-black text-amber-900">
                A
              </span>
              <span className="font-bold text-stone-800 text-[11px] max-w-[140px] truncate">
                {user.email}
              </span>
            </div>
            <button
              onClick={() => setUser(null)}
              className="rounded-full px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
    )
  }

  // 2. STAFF HEADER (Clean, Modern & Minimalist)
  if (user?.role === "staff") {
    const staffNav: Array<["menu" | "orders" | "timekeeping" | "reviews", string, string]> = [
      ["menu", "Sản phẩm", "📦"],
      ["orders", "Đơn hàng", "📝"],
      ["timekeeping", "Chấm công", "⏱️"],
      ["reviews", "Đánh giá", "⭐"],
    ]
    return (
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          {/* Brand */}
          <button
            onClick={() => {
              go("management")
              if (setManagementView) setManagementView("orders")
            }}
            className="flex items-center gap-2 text-left cursor-pointer"
          >
            <span className="text-2xl font-black tracking-tight text-black">FoodVD</span>
            <span className="rounded-md bg-emerald-700 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white">
              Nhân viên
            </span>
          </button>

          {/* Clean Modern Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-2xl bg-stone-100/80 p-1 border border-stone-200/70">
            {staffNav.map(([targetView, label, icon]) => {
              const isActive = page === "management" && managementView === targetView
              return (
                <button
                  key={targetView}
                  onClick={() => {
                    go("management")
                    if (setManagementView) setManagementView(targetView)
                  }}
                  className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-white text-stone-950 shadow-xs font-black"
                      : "text-stone-600 hover:text-black hover:bg-stone-200/50"
                  }`}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => go("order")}
              className="hidden sm:flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer border border-stone-200"
            >
              <span>🍽️</span>
              <span>Menu khách</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-stone-50 border border-stone-200 px-3 py-1 text-xs">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-100 text-[10px] font-black text-sky-900">
                NV
              </span>
              <span className="font-bold text-stone-800 text-[11px] max-w-[140px] truncate">
                {user.name}
              </span>
            </div>
            <button
              onClick={() => setUser(null)}
              className="rounded-full px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </header>
    )
  }

  // 3. LOGIN / REGISTER HEADER (minimal)
  if (page === "login" || page === "register") {
    return (
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 md:px-8">
          <button onClick={() => go("home")} className="flex items-center gap-1.5 text-left cursor-pointer">
            <span className="text-2xl font-black tracking-tight text-black">FoodVD</span>
            <span className="h-2 w-2 rounded-full bg-emerald-600 mb-1" />
          </button>
          <button onClick={() => go("home")} className="flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 transition-colors cursor-pointer">
            ← Về trang chủ
          </button>
        </div>
      </header>
    )
  }

  const isOrderingPage = page === "order" || page === "delivery" || page === "payment"

  return (
    <>
      {/* ===== HEADER BAR ===== */}
      <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 md:px-8">

          {/* LEFT: Hamburger + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { setDrawerOpen(true); setCartDrawerOpen(false) }}
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100 text-stone-900 transition-colors cursor-pointer"
              aria-label="Mở menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <button onClick={() => go("home")} className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-2xl font-black tracking-tight text-black">FoodVD</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 mb-1" />
            </button>
          </div>

          {/* CENTER: Tab nav (ordering pages only) */}
          {isOrderingPage ? (
            <nav className="hidden sm:inline-flex items-center rounded-full border border-stone-200 bg-white p-1 shadow-xs">
              {[
                { target: "home", label: "Trang chủ" },
                { target: "order", label: "Đặt hàng" },
                { target: "delivery", label: "Nhận hàng" },
                { target: "payment", label: "Thanh toán" },
              ].map(({ target, label }) => {
                const isActive = page === target
                return (
                  <button
                    key={target}
                    onClick={() => go(target as Page)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                      isActive ? "bg-[#fbe8e2] text-[#842018] font-black" : "text-stone-600 hover:text-black hover:bg-stone-50"
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </nav>
          ) : (
            <div />
          )}

          {/* RIGHT: Cart + User */}
          <div className="flex items-center gap-2.5">
            {isOrderingPage && (
              <button
                type="button"
                onClick={() => { setCartDrawerOpen((v) => !v); setDrawerOpen(false) }}
                className="relative flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-xs font-black text-white hover:bg-stone-700 transition-all shadow-sm cursor-pointer"
              >
                <span>🛍️</span>
                <span className="hidden sm:inline">Giỏ hàng</span>
                {cartCount > 0 && (
                  <span className="flex h-5 min-w-5 px-1 items-center justify-center rounded-full bg-[#842018] text-white text-[11px] font-black">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={() => { setDrawerOpen(false); setCartDrawerOpen(false); go("login") }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-stone-800 hover:bg-[#842018] hover:text-white transition-all cursor-pointer shadow-xs"
              title={user ? `${user.name} - Xem tài khoản & đơn đã mua` : "Đăng nhập / Đăng ký"}
            >
              {user
                ? <span className="font-black text-xs">{user.name.charAt(0).toUpperCase()}</span>
                : <span className="text-base">👤</span>
              }
            </button>
          </div>
        </div>
      </header>

      {/* ===== 1. LEFT NAVIGATION DRAWER (Uber Eats Style) ===== */}
      {drawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99998, display: "flex", justifyContent: "flex-start" }}>
          {/* Backdrop tối nhẹ đè lên trang web */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(2px)",
              cursor: "pointer",
            }}
          />

          {/* Menu Drawer trượt từ bên trái tràn đầy màn hình */}
          <aside
            style={{
              position: "relative",
              zIndex: 99999,
              width: "320px",
              maxWidth: "85vw",
              height: "100vh",
              backgroundColor: "#ffffff",
              boxShadow: "4px 0 24px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* User Profile Card */}
            <div className="border-b border-stone-100 p-5">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => { setDrawerOpen(false); go("login") }}
                  className="flex items-center gap-3 text-left group flex-1 cursor-pointer"
                  title="Xem thông tin tài khoản và lịch sử đơn hàng"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-stone-800 text-xl font-black group-hover:bg-[#842018] group-hover:text-white transition-colors">
                    {user ? user.name.charAt(0).toUpperCase() : "👤"}
                  </div>
                  <div>
                    <h3 className="font-black text-stone-900 leading-tight group-hover:text-[#842018] transition-colors">{user ? user.name : "Khách FoodVD"}</h3>
                    <p className="text-xs text-emerald-700 font-bold mt-0.5">{user ? "Hồ sơ & Đơn đã mua →" : "Chưa đăng nhập"}</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-black text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {!user && (
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setDrawerOpen(false); go("login") }}
                    className="flex-1 rounded-xl bg-stone-900 py-2 text-xs font-bold text-white hover:bg-stone-700 cursor-pointer"
                  >
                    Đăng nhập
                  </button>
                  <button
                    type="button"
                    onClick={() => { setDrawerOpen(false); go("register") }}
                    className="flex-1 rounded-xl border border-stone-300 py-2 text-xs font-bold text-stone-700 hover:bg-stone-50 cursor-pointer"
                  >
                    Đăng ký
                  </button>
                </div>
              )}
            </div>

            {/* Navigation List */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {[
                { page: "home" as Page, icon: "🏠", label: "Trang chủ" },
                { page: "order" as Page, icon: "🍜", label: "Thực đơn món ăn" },
                { page: "delivery" as Page, icon: "📦", label: "Tiến độ giao hàng" },
                { page: "login" as Page, icon: "👤", label: "Tài khoản & Đơn đã mua" },
                { page: "payment" as Page, icon: "💳", label: "Thanh toán & Hóa đơn" },
              ].map(({ page: pg, icon, label }) => (
                <button
                  key={pg}
                  type="button"
                  onClick={() => { setDrawerOpen(false); go(pg) }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors cursor-pointer ${
                    page === pg ? "bg-[#fbe8e2] text-[#842018]" : "text-stone-800 hover:bg-stone-100"
                  }`}
                >
                  <span className="text-lg">{icon}</span>
                  <span>{label}</span>
                </button>
              ))}

              {/* Danh mục thực đơn */}
              <div className="pt-3 border-t border-stone-100">
                <p className="px-3.5 mb-2 text-[11px] font-black uppercase tracking-wider text-stone-400">
                  Danh mục món ăn
                </p>
                {[
                  ["Tất cả", "🍽️"], ["Ưu đãi", "🏷️"], ["Món Việt", "🥢"], ["Món chính", "🍛"],
                  ["Hoa quả", "🍎"], ["Đồ uống", "🥤"], ["Ăn nhẹ", "🥟"], ["Tráng miệng", "🍮"],
                  ["Healthy & Ăn kiêng", "🥗"], ["Gia vị & Đồ khô", "🥫"], ["Combo", "🍱"],
                ].map(([cat, icon]) => {
                  const isSelected = category === cat
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => { if (setCategory) setCategory(cat as Category); setDrawerOpen(false); go("order") }}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        isSelected ? "bg-[#842018] text-white" : "text-stone-700 hover:bg-stone-100"
                      }`}
                    >
                      <span className="flex items-center gap-2.5"><span>{icon}</span><span>{cat}</span></span>
                      {isSelected && <span>✓</span>}
                    </button>
                  )
                })}
              </div>

              {user && (user.role === "admin" || user.role === "staff") && (
                <div className="pt-2 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => { setDrawerOpen(false); go("management") }}
                    className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-black text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 cursor-pointer"
                  >
                    <span>{user.role === "admin" ? "👑" : "👨‍🍳"}</span>
                    <span>{user.role === "admin" ? "Cổng Quản Trị" : "Cổng Vận Hành"}</span>
                  </button>
                </div>
              )}

              {user && (
                <button
                  type="button"
                  onClick={() => { setUser(null); setDrawerOpen(false) }}
                  className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-50 cursor-pointer"
                >
                  <span>🚪</span><span>Đăng xuất</span>
                </button>
              )}
            </nav>

            <div className="border-t border-stone-200 px-5 py-3 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
              <span className="font-bold text-stone-700">FoodVD</span>
              <span>Hotline: 1900 8888</span>
            </div>
          </aside>
        </div>
      )}

      {/* ===== 2. RIGHT CART DRAWER (Uber Eats Style) ===== */}
      {cartDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99998, display: "flex", justifyContent: "flex-end" }}>
          {/* Backdrop tối nhẹ đè lên trang web */}
          <div
            onClick={() => setCartDrawerOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(2px)",
              cursor: "pointer",
            }}
          />

          {/* Giỏ hàng Drawer trượt từ bên phải tràn đầy màn hình */}
          <aside
            style={{
              position: "relative",
              zIndex: 99999,
              width: "380px",
              maxWidth: "90vw",
              height: "100vh",
              backgroundColor: "#ffffff",
              boxShadow: "-4px 0 24px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header giỏ hàng */}
            <div className="flex items-center justify-between border-b border-stone-200 px-5 py-4 bg-stone-50">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-stone-900 text-white text-base">🛍️</span>
                <div>
                  <h3 className="font-black text-stone-900 text-base leading-tight">Giỏ hàng của bạn</h3>
                  <p className="text-xs text-emerald-700 font-semibold">{cartCount > 0 ? `${cartCount} món đã chọn` : "Chưa có món nào"}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCartDrawerOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-stone-200 text-stone-700 hover:bg-stone-300 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Danh sách món trong giỏ */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartDetails && cartDetails.length > 0 ? (
                cartDetails.map((item, index) => (
                  <div key={`${item.dish.id}-${index}`} className="flex items-start gap-3 rounded-2xl border border-stone-200 p-3 bg-stone-50/70">
                    <img src={item.dish.image} alt={item.dish.name} className="h-14 w-14 rounded-xl object-cover shrink-0 border border-stone-200" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-stone-900 leading-snug">{item.dish.name}</p>
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="text-[11px] text-stone-500 mt-0.5">+ {item.toppings.join(", ")}</p>
                      )}
                      {item.note && (
                        <p className="text-[11px] text-amber-700 font-medium mt-0.5">📝 {item.note}</p>
                      )}
                      <p className="mt-1 font-black text-xs text-[#842018]">{item.lineTotal.toLocaleString("vi-VN")} đ</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 bg-white border border-stone-200 rounded-xl p-1">
                      <button
                        type="button"
                        onClick={() => changeQuantity && changeQuantity(index, -1)}
                        className="h-6 w-6 flex items-center justify-center rounded-lg bg-stone-100 text-xs font-bold hover:bg-stone-200 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-5 text-center text-xs font-black text-stone-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => changeQuantity && changeQuantity(index, 1)}
                        className="h-6 w-6 flex items-center justify-center rounded-lg bg-stone-100 text-xs font-bold hover:bg-stone-200 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-full flex-col items-center justify-center text-center p-6 text-stone-500">
                  <span className="text-5xl mb-3">🛒</span>
                  <p className="font-black text-sm text-stone-800">Giỏ hàng trống</p>
                  <p className="text-xs text-stone-500 mt-1">Chọn món ngon từ thực đơn nhé!</p>
                  <button
                    type="button"
                    onClick={() => { setCartDrawerOpen(false); go("order") }}
                    className="mt-4 rounded-full bg-stone-900 px-6 py-2.5 text-xs font-bold text-white hover:bg-stone-700 cursor-pointer"
                  >
                    Xem thực đơn →
                  </button>
                </div>
              )}
            </div>

            {/* Footer giỏ hàng */}
            {cartDetails && cartDetails.length > 0 && (
              <div className="border-t border-stone-200 bg-white p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-stone-500">Tạm tính ({cartCount} món)</span>
                  <span className="font-black text-stone-900 text-base">{subtotal.toLocaleString("vi-VN")} đ</span>
                </div>
                <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-2 text-[11px] font-bold text-emerald-800">
                  <span>🛵</span>
                  <span>{subtotal >= 150000 ? "Đủ điều kiện FREESHIP!" : `Thêm ${(150000 - subtotal).toLocaleString("vi-VN")} đ để FREESHIP`}</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setCartDrawerOpen(false); go("delivery") }}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#842018] py-3.5 text-sm font-black text-white hover:bg-[#6c1a13] shadow-md cursor-pointer transition-transform active:scale-98"
                >
                  Tiến hành đặt hàng →
                </button>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(false)}
                  className="w-full text-center text-xs font-bold text-stone-500 hover:text-stone-900 py-1 cursor-pointer"
                >
                  ← Tiếp tục chọn món
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}
