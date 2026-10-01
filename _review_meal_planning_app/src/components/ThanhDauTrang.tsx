import type { Page, User } from "../types"

export function Header({
  page,
  go,
  cartCount,
  user,
  setUser,
  managementView,
  setManagementView,
}: {
  page: Page
  go: (page: Page) => void
  cartCount: number
  user: User | null
  setUser: (value: User | null) => void
  managementView?: "orders" | "menu" | "reports" | "salary" | "vouchers" | "timekeeping"
  setManagementView?: (value: "orders" | "menu" | "reports" | "salary" | "vouchers" | "timekeeping") => void
}) {
  // 1. ADMIN HEADER (100% Dedicated Admin Portal)
  if (user?.role === "admin") {
    const adminNav: Array<["menu" | "reports" | "salary" | "vouchers", string, string]> = [
      ["menu", "Quản lý sản phẩm", "📦"],
      ["reports", "Báo cáo doanh thu", "📊"],
      ["salary", "Nhân viên & Lương", "👥"],
      ["vouchers", "Quản lý mã giảm giá", "🎟️"],
    ]

    return (
      <header className="sticky top-0 z-40 border-b border-amber-900/10 bg-[#1c1410] text-white shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button
            onClick={() => {
              go("management")
              if (setManagementView) setManagementView("menu")
            }}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#b42318] to-amber-500 text-lg font-black text-white shadow-lg shadow-black/40">
              👑
            </span>
            <div>
              <span className="block text-lg font-black leading-none tracking-tight text-white">FoodVD Admin</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-[#fed7aa] mt-0.5">
                Cổng Quản Trị Hệ Thống
              </span>
            </div>
          </button>

          <nav className="hidden rounded-full border border-white/15 bg-white/10 p-1 lg:flex items-center gap-1 backdrop-blur-md">
            {adminNav.map(([targetView, label, icon]) => {
              const isActive = page === "management" && managementView === targetView
              return (
                <button
                  key={targetView}
                  onClick={() => {
                    go("management")
                    if (setManagementView) setManagementView(targetView)
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition-all ${
                    isActive
                      ? "bg-[#b42318] text-white shadow-md shadow-[#b42318]/50"
                      : "text-stone-300 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 border border-white/15">
              <span className="text-amber-400 font-bold text-xs">👑 Admin:</span>
              <span className="text-xs font-bold text-stone-200">{user.email}</span>
            </div>
            <button
              onClick={() => setUser(null)}
              className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/60 transition-colors"
            >
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </header>
    )
  }

  // 2. STAFF HEADER (100% Dedicated Staff Portal)
  if (user?.role === "staff") {
    const staffNav: Array<["menu" | "orders" | "timekeeping", string, string]> = [
      ["menu", "Quản lý sản phẩm", "📦"],
      ["orders", "Quản lý đơn hàng", "📝"],
      ["timekeeping", "Chấm công ca làm", "⏱️"],
    ]

    return (
      <header className="sticky top-0 z-40 border-b border-stone-800 bg-[#1e2329] text-white shadow-xl backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button
            onClick={() => {
              go("management")
              if (setManagementView) setManagementView("orders")
            }}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-lg font-black text-white shadow-lg">
              👨‍🍳
            </span>
            <div>
              <span className="block text-lg font-black leading-none tracking-tight text-white">FoodVD Vận Hành</span>
              <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-sky-300 mt-0.5">
                Cổng Nhân Viên Quán
              </span>
            </div>
          </button>

          <nav className="hidden rounded-full border border-white/15 bg-white/10 p-1 lg:flex items-center gap-1 backdrop-blur-md">
            {staffNav.map(([targetView, label, icon]) => {
              const isActive = page === "management" && managementView === targetView
              return (
                <button
                  key={targetView}
                  onClick={() => {
                    go("management")
                    if (setManagementView) setManagementView(targetView)
                  }}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-black transition-all ${
                    isActive
                      ? "bg-sky-600 text-white shadow-md shadow-sky-600/50"
                      : "text-stone-300 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  <span>{icon}</span>
                  <span>{label}</span>
                </button>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/10 px-3 py-1.5 border border-white/15">
              <span className="text-sky-300 font-bold text-xs">👨‍🍳 NV:</span>
              <span className="text-xs font-bold text-stone-200">{user.name}</span>
            </div>
            <button
              onClick={() => setUser(null)}
              className="rounded-xl border border-rose-500/40 bg-rose-950/40 px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:bg-rose-900/60 transition-colors"
            >
              🚪 Đăng xuất
            </button>
          </div>
        </div>
      </header>
    )
  }

  // 3. CUSTOMER / GUEST HEADER (Full Food Ordering Experience)
  const baseNav: Array<[Page, string]> = [
    ["home", "Trang chủ"],
    ["order", "Đặt hàng"],
    ["delivery", "Nhận hàng"],
    ["payment", "Thanh toán"],
  ]
  const publicNav = user
    ? [...baseNav, ["login", "Đơn hàng của tôi"] as [Page, string]]
    : baseNav

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-[#fffaf2]/86 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-8">
        <button onClick={() => go("home")} className="flex items-center gap-3 text-left">
          <span className="brand-mark">F</span>
          <span>
            <span className="block text-lg font-black leading-none tracking-tight">FoodVD</span>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#9f2f22]">
              Hệ thống đặt món
            </span>
          </span>
        </button>

        <nav className="hidden rounded-full border border-white/70 bg-white/65 px-2 py-2 shadow-sm lg:flex">
          {publicNav.map(([target, label]) => (
            <button
              key={target}
              onClick={() => go(target)}
              className={`nav-button ${page === target ? "active" : ""}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              <button
                className={`ghost-button flex items-center gap-1.5 ${page === "login" ? "!border-[#b42318] !bg-white text-[#b42318]" : ""}`}
                onClick={() => go("login")}
              >
                <span>👤</span>
                <span className="font-black">{user.name}</span>
                <span className="text-[11px] text-stone-500 font-normal">(Đơn hàng)</span>
              </button>
              <button className="ghost-button !text-rose-700 hover:!bg-rose-50" onClick={() => setUser(null)}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <button
                className={`ghost-button ${page === "login" ? "!border-[#b42318] !bg-white text-[#b42318]" : ""}`}
                onClick={() => go("login")}
              >
                Đăng nhập
              </button>
              <button
                className={`nav-button border border-[#e8d8c8] ${page === "register" ? "active !bg-[#b42318] !text-white" : "hover:border-[#b42318] text-[#8f1d14]"}`}
                onClick={() => go("register")}
              >
                Đăng ký
              </button>
            </div>
          )}
          <button onClick={() => go("order")} className="primary-link">
            Giỏ hàng <span>{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
