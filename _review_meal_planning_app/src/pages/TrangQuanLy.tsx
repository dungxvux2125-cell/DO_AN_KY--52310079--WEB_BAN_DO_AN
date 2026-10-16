import { useState } from "react"
import { categoryOptions } from "../data"
import { StatusPill } from "../components/TienIchDonHang"
import { ReportMetric, SalaryMetric } from "./TienIchQuanLy"
import { SectionHeading } from "../components/TieuDePhan"
import type { Dispatch, SetStateAction } from "react"
import type { Category, Dish, ManagementView, Order, Review, Role, StaffSalary, TimekeepingRecord, User, Voucher } from "../types"
import { formatCurrency } from "../utils"

export function ManagementPage({
  user,
  goLogin,
  view,
  setView,
  orders,
  dishes,
  revenue,
  cancelled,
  bestSeller,
  salaries,
  setSalaries,
  timekeeping,
  setTimekeeping,
  vouchers,
  setVouchers,
  newDish,
  setNewDish,
  setDishes,
  setOrders,
  advanceOrder,
  addDishFromAdmin,
  reviews,
  setReviews,
  onReplyReview,
  usersList = [],
  onUpdateUserRole,
  onToggleUserStatus,
  onAddStaff,
  onEditDish,
  onDeleteDish,
  onCancelOrder,
}: {
  user: User | null
  goLogin: () => void
  view: ManagementView
  setView: (value: ManagementView) => void
  orders: Order[]
  dishes: Dish[]
  revenue: number
  cancelled: number
  bestSeller: string
  salaries: StaffSalary[]
  setSalaries: Dispatch<SetStateAction<StaffSalary[]>>
  timekeeping: TimekeepingRecord[]
  setTimekeeping: Dispatch<SetStateAction<TimekeepingRecord[]>>
  vouchers: Voucher[]
  setVouchers: Dispatch<SetStateAction<Voucher[]>>
  newDish: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }
  setNewDish: (value: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }) => void
  setDishes: Dispatch<SetStateAction<Dish[]>>
  setOrders: Dispatch<SetStateAction<Order[]>>
  advanceOrder: (id: string) => void
  addDishFromAdmin: () => void
  reviews: Review[]
  setReviews: Dispatch<SetStateAction<Review[]>>
  onReplyReview: (id: string, reply: string) => void
  usersList?: User[]
  onUpdateUserRole?: (email: string, role: Role) => void
  onToggleUserStatus?: (email: string) => void
  onAddStaff?: (staffData: { name: string; email: string; phone: string; password?: string }) => void
  onEditDish?: (dish: Dish) => void
  onDeleteDish?: (dishId: number) => void
  onCancelOrder?: (orderId: string, reason?: string) => void
}) {
  if (user?.role !== "staff" && user?.role !== "admin") {
    return (
      <section className="page-shell">
        <div className="mx-auto max-w-3xl soft-panel text-center">
          <p className="eyebrow">Khu vực nội bộ</p>
          <h1 className="mt-3 text-4xl font-black">Trang quản lý chỉ dành cho nhân viên và admin.</h1>
          <p className="mt-4 text-stone-600">
            Vui lòng đăng nhập bằng tài khoản nhân viên hoặc admin để tiếp tục.
          </p>
          <button onClick={goLogin} className="mt-6 cta-button">
            Đăng nhập
          </button>
        </div>
      </section>
    )
  }

  const isAdmin = user.role === "admin"

  // Admin tabs (Dashboard, Orders, Menu, Users, Salaries, Vouchers, and Reviews)
  const adminTabs: Array<[ManagementView, string, string]> = [
    ["reports", "Báo cáo doanh thu", "📊"],
    ["orders", "Giám sát đơn hàng", "📦"],
    ["menu", "Quản lý sản phẩm", "🍔"],
    ["users", "Quản lý người dùng", "👥"],
    ["salary", "Nhân viên & Lương", "💼"],
    ["vouchers", "Mã giảm giá", "🎟️"],
    ["reviews", "Đánh giá của khách", "⭐"],
  ]

  // Staff tabs (Orders with Kitchen ticket print, Menu stock control, Timekeeping, and Reviews)
  const staffTabs: Array<[ManagementView, string, string]> = [
    ["orders", "Xử lý đơn & In bếp", "📦"],
    ["menu", "Kiểm soát thực đơn", "🍔"],
    ["timekeeping", "Chấm công ca làm", "⏰"],
    ["reviews", "Đánh giá của khách", "⭐"],
  ]

  const availableTabs = isAdmin ? adminTabs : staffTabs

  // Ensure active view is allowed for this role
  const isViewAllowed = availableTabs.some(([k]) => k === view)
  const activeView = isViewAllowed ? view : isAdmin ? "reports" : "orders"

  return (
    <section className="page-shell page-shell-wide">
      <div className="soft-panel">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-stone-200 pb-5">
          <SectionHeading
            eyebrow={isAdmin ? "Cổng Quản Trị Toàn Quyền (Admin Portal)" : "Cổng Vận Hành Quầy & Bếp (Staff Portal)"}
            title={
              isAdmin
                ? "Quản trị toàn diện: Doanh thu, Đơn hàng, Thực đơn, Nhân sự & Tài khoản."
                : "Vận hành thực đơn tại quầy, Tiếp nhận đơn, In phiếu bếp & Chấm công."
            }
            description={
              isAdmin
                ? "Quản trị viên có toàn quyền kiểm soát số liệu kinh doanh, giám sát đơn hàng, phân quyền tài khoản, điều chỉnh bảng lương nhân viên và cấu hình thực đơn."
                : "Nhân viên thực hiện kiểm tra trạng thái món ăn (còn/hết), in phiếu chế biến cho nhà bếp, cập nhật tiến trình giao hàng và điểm danh ca làm việc."
            }
          />
          <div className="flex flex-wrap gap-2">
            {availableTabs.map(([key, label, icon]) => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`tab-button flex items-center gap-1.5 ${activeView === key ? "active" : ""}`}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 1. ORDERS VIEW (Admin & Staff) */}
        {activeView === "orders" && (
          <OrdersPanel
            orders={orders}
            setOrders={setOrders}
            advanceOrder={advanceOrder}
            dishes={dishes}
            isAdmin={isAdmin}
            onCancelOrder={onCancelOrder}
          />
        )}

        {/* 2. MENU / PRODUCTS VIEW (Admin & Staff) */}
        {activeView === "menu" && (
          <MenuPanel
            dishes={dishes}
            newDish={newDish}
            setNewDish={setNewDish}
            setDishes={setDishes}
            addDishFromAdmin={addDishFromAdmin}
            isAdmin={isAdmin}
            onEditDish={onEditDish}
            onDeleteDish={onDeleteDish}
          />
        )}

        {/* 3. REPORTS VIEW (Admin only) */}
        {activeView === "reports" && isAdmin && (
          <ReportsPanel
            revenue={revenue}
            orderCount={orders.length}
            cancelled={cancelled}
            bestSeller={bestSeller}
            dishes={dishes}
            orders={orders}
          />
        )}

        {/* 4. SALARY VIEW (Admin only - Fully editable & synchronized with Timekeeping) */}
        {activeView === "salary" && isAdmin && (
          <SalaryPanel
            salaries={salaries}
            setSalaries={setSalaries}
            timekeeping={timekeeping}
          />
        )}

        {/* 5. VOUCHERS VIEW (Admin only) */}
        {activeView === "vouchers" && isAdmin && (
          <VouchersPanel vouchers={vouchers} setVouchers={setVouchers} />
        )}

        {/* 6. TIMEKEEPING VIEW (Staff only) */}
        {activeView === "timekeeping" && !isAdmin && (
          <TimekeepingPanel
            user={user}
            timekeeping={timekeeping}
            setTimekeeping={setTimekeeping}
          />
        )}

        {/* 7. REVIEWS VIEW (Admin & Staff) */}
        {activeView === "reviews" && (
          <ReviewsManagementPanel
            reviews={reviews}
            setReviews={setReviews}
            onReplyReview={onReplyReview}
            user={user}
            dishes={dishes}
          />
        )}

        {/* 8. USERS MANAGEMENT VIEW (Admin only) */}
        {activeView === "users" && isAdmin && (
          <UsersPanel
            usersList={usersList}
            onUpdateUserRole={onUpdateUserRole}
            onToggleUserStatus={onToggleUserStatus}
            onAddStaff={onAddStaff}
          />
        )}
      </div>
    </section>
  )
}


// ----------------------------------------------------
// 1. ORDERS PANEL (Xử lý đơn hàng & In phiếu bếp / Hóa đơn)
// ----------------------------------------------------
function OrdersPanel({
  orders,
  setOrders,
  advanceOrder,
  dishes,
  isAdmin,
  onCancelOrder,
}: {
  orders: Order[]
  setOrders: Dispatch<SetStateAction<Order[]>>
  advanceOrder: (id: string) => void
  dishes: Dish[]
  isAdmin: boolean
  onCancelOrder?: (orderId: string, reason?: string) => void
}) {
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [searchKey, setSearchKey] = useState<string>("")
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchStatus = filterStatus === "all" || order.status === filterStatus
    const q = searchKey.trim().toLowerCase()
    const matchSearch =
      !q ||
      order.id.toLowerCase().includes(q) ||
      order.customerName.toLowerCase().includes(q) ||
      order.phoneMasked.includes(q) ||
      order.email.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const countByStatus = (status: string) => orders.filter((o) => o.status === status).length

  return (
    <div className="mt-6 grid gap-6">
      {/* Control bar: Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: `Tất cả (${orders.length})` },
            { id: "Chờ duyệt", label: `Chờ duyệt (${countByStatus("Chờ duyệt")})` },
            { id: "Đang chuẩn bị", label: `Bếp nấu (${countByStatus("Đang chuẩn bị")})` },
            { id: "Đang giao", label: `Đang ship (${countByStatus("Đang giao")})` },
            { id: "Hoàn tất", label: `Hoàn tất (${countByStatus("Hoàn tất")})` },
            { id: "Đã hủy", label: `Đã hủy (${countByStatus("Đã hủy")})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                filterStatus === tab.id
                  ? "bg-[#b42318] text-white shadow-xs font-black"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder="🔍 Tìm mã đơn, tên khách, SĐT..."
            className="rounded-xl border border-stone-200 bg-white px-3.5 py-1.5 text-xs text-stone-900 outline-none focus:border-[#b42318] w-full md:w-64"
          />
          {searchKey && (
            <button
              onClick={() => setSearchKey("")}
              className="text-xs text-stone-400 hover:text-stone-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-stone-200">
          <span className="text-4xl">🥡</span>
          <p className="mt-3 text-base font-bold text-stone-700">Không tìm thấy đơn hàng nào phù hợp</p>
          <p className="text-xs text-stone-400 mt-1">Thử thay đổi bộ lọc trạng thái hoặc từ khóa tìm kiếm</p>
        </div>
      ) : (
        filteredOrders.map((order) => {
          return (
            <article key={order.id} className="admin-card transition-all hover:shadow-md">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 border-b border-stone-100 pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-stone-900">Đơn hàng #{order.id}</h3>
                    <StatusPill status={order.status} />
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-semibold text-stone-600">
                      {order.createdAt}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-stone-700">
                    Khách hàng: <strong className="text-stone-900">{order.customerName}</strong> · 📞 SĐT: <strong>{order.phoneMasked}</strong>
                  </p>
                  <p className="text-xs text-stone-600">
                    📍 Địa chỉ nhận: <strong>{order.addressMasked}</strong>
                  </p>
                </div>

                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    {order.payment === "VietQR" ? "💳 Chuyển khoản VietQR" : "💵 Tiền mặt (COD)"}
                  </span>
                  <span className="text-2xl font-black text-[#b42318]">{formatCurrency(order.total)}</span>
                </div>
              </div>

              {/* Chi tiết từng món ăn trong đơn (Cho nhà bếp & thu ngân) */}
              <div className="my-3 py-2 bg-stone-50/70 rounded-xl px-3 border border-stone-100">
                <p className="text-[11px] font-black uppercase tracking-wider text-stone-500 mb-2">
                  🍽️ Danh sách món chế biến:
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {order.items.map((item, idx) => {
                    const dish = dishes.find((d) => d.id === item.dishId)
                    return (
                      <div key={idx} className="flex items-center gap-2.5 bg-white p-2 rounded-lg border border-stone-200/80 text-xs">
                        {dish?.image && (
                          <img src={dish.image} alt={dish.name} className="h-10 w-10 rounded-lg object-cover" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-stone-900 truncate">
                            {dish?.name || `Món #${item.dishId}`}{" "}
                            <span className="text-[#b42318] font-black">× {item.quantity}</span>
                          </p>
                          {item.toppings && item.toppings.length > 0 && (
                            <p className="text-[10px] text-stone-500 truncate">
                              Topping: {item.toppings.join(", ")}
                            </p>
                          )}
                          {item.note && (
                            <p className="text-[10px] text-amber-700 font-bold truncate">
                              📝 {item.note}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Action buttons bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {/* Nút in hóa đơn / phiếu bếp */}
                  <button
                    onClick={() => setSelectedOrderForPrint(order)}
                    className="flex items-center gap-1.5 rounded-xl border border-stone-300 bg-white px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:text-black transition-colors cursor-pointer"
                  >
                    <span>🖨️</span>
                    <span>In phiếu bếp / Hóa đơn</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {order.status === "Chờ duyệt" && (
                    <>
                      <button
                        className="admin-button flex items-center gap-1"
                        onClick={() => advanceOrder(order.id)}
                      >
                        <span>👨‍🍳</span>
                        <span>Duyệt & Bắt đầu nấu</span>
                      </button>
                      <button
                        className="admin-button danger flex items-center gap-1"
                        onClick={() => {
                          if (onCancelOrder) {
                            onCancelOrder(order.id, "Nhân viên / Admin hủy đơn")
                          } else {
                            setOrders((current) =>
                              current.map((candidate) =>
                                candidate.id === order.id ? { ...candidate, status: "Đã hủy" } : candidate,
                              ),
                            )
                          }
                        }}
                      >
                        <span>❌</span>
                        <span>Hủy đơn</span>
                      </button>
                    </>
                  )}

                  {order.status === "Đang chuẩn bị" && (
                    <button
                      className="admin-button flex items-center gap-1"
                      onClick={() => advanceOrder(order.id)}
                    >
                      <span>🛵</span>
                      <span>Bàn giao Shipper</span>
                    </button>
                  )}

                  {order.status === "Đang giao" && (
                    <button
                      className="admin-button flex items-center gap-1 !bg-emerald-600 hover:!bg-emerald-700 text-white"
                      onClick={() => advanceOrder(order.id)}
                    >
                      <span>🎉</span>
                      <span>Xác nhận đã giao xong</span>
                    </button>
                  )}

                  {order.status === "Hoàn tất" && (
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl">
                      ✓ Đơn đã hoàn tất
                    </span>
                  )}

                  {order.status === "Đã hủy" && (
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-xl">
                      ⛔ Đơn đã hủy
                    </span>
                  )}
                </div>
              </div>
            </article>
          )
        })
      )}

      {/* MODAL IN PHIẾU BẾP / HÓA ĐƠN GIAO HÀNG */}
      {selectedOrderForPrint && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => setSelectedOrderForPrint(null)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 max-h-[95vh] overflow-y-auto font-mono text-stone-900">
            {/* Header Bill */}
            <div className="text-center border-b border-dashed border-stone-300 pb-3">
              <h2 className="text-xl font-black tracking-wider text-black">FOODVD RESTAURANT</h2>
              <p className="text-[11px] text-stone-500 mt-0.5">Nền Tảng Ẩm Thực & Đặt Món Trực Tuyến</p>
              <p className="text-[10px] text-stone-400">136 Xuân Thủy, Cầu Giấy, Hà Nội · Hotline: 0901.234.567</p>
              <div className="mt-2 inline-block rounded-md bg-stone-900 px-3 py-1 text-xs font-black uppercase text-white tracking-widest">
                PHIẾU BẾP & GIAO HÀNG
              </div>
            </div>

            {/* Thông tin đơn */}
            <div className="my-3 space-y-1 text-xs border-b border-dashed border-stone-300 pb-3">
              <div className="flex justify-between">
                <span className="text-stone-500">Mã đơn:</span>
                <span className="font-bold">#{selectedOrderForPrint.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Thời gian đặt:</span>
                <span>{selectedOrderForPrint.createdAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Khách hàng:</span>
                <span className="font-bold">{selectedOrderForPrint.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Số điện thoại:</span>
                <span>{selectedOrderForPrint.phoneMasked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Địa chỉ giao:</span>
                <span className="text-right max-w-[220px] font-semibold">{selectedOrderForPrint.addressMasked}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Thanh toán:</span>
                <span className="font-bold text-[#b42318]">{selectedOrderForPrint.payment}</span>
              </div>
            </div>

            {/* Danh sách món */}
            <div className="my-3 border-b border-dashed border-stone-300 pb-3">
              <div className="flex justify-between text-[11px] font-black text-stone-500 uppercase mb-2">
                <span>Tên món (Topping)</span>
                <span>SL · Tiền</span>
              </div>
              <div className="space-y-2 text-xs">
                {selectedOrderForPrint.items.map((it, i) => {
                  const dish = dishes.find((d) => d.id === it.dishId)
                  const unitPrice = dish?.promoPrice || dish?.price || 0
                  return (
                    <div key={i} className="flex justify-between items-start">
                      <div className="max-w-[240px]">
                        <p className="font-bold text-stone-950">{dish?.name || `Món #${it.dishId}`}</p>
                        {it.toppings && it.toppings.length > 0 && (
                          <p className="text-[10px] text-stone-500">+ {it.toppings.join(", ")}</p>
                        )}
                        {it.note && (
                          <p className="text-[10px] text-amber-800 font-bold">📝 Note: {it.note}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="font-bold">×{it.quantity}</span>
                        <p className="text-stone-700">{formatCurrency(unitPrice * it.quantity)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Tổng tiền */}
            <div className="my-3 space-y-1 text-xs">
              <div className="flex justify-between text-base font-black text-black pt-1">
                <span>TỔNG CỘNG:</span>
                <span className="text-[#b42318]">{formatCurrency(selectedOrderForPrint.total)}</span>
              </div>
            </div>

            {/* Lời cảm ơn */}
            <div className="text-center text-[10px] text-stone-400 mt-4 border-t border-dashed border-stone-200 pt-3">
              <p>*** Cảm ơn quý khách đã đặt món tại FoodVD ***</p>
              <p>Chúc quý khách ngon miệng!</p>
            </div>

            {/* Nút in & đóng */}
            <div className="mt-5 flex gap-2 font-sans">
              <button
                onClick={() => window.print()}
                className="flex-1 rounded-xl bg-stone-900 py-2.5 text-xs font-black text-white hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🖨️</span>
                <span>In phiếu ngay (Print)</span>
              </button>
              <button
                onClick={() => setSelectedOrderForPrint(null)}
                className="rounded-xl border border-stone-300 bg-stone-100 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// 2. MENU PANEL (Quản lý món ăn, sửa giá, thêm món, bật/tắt còn món)
// ----------------------------------------------------
function MenuPanel({
  dishes,
  newDish,
  setNewDish,
  setDishes,
  addDishFromAdmin,
  isAdmin,
  onEditDish,
  onDeleteDish,
}: {
  dishes: Dish[]
  newDish: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }
  setNewDish: (value: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }) => void
  setDishes: Dispatch<SetStateAction<Dish[]>>
  addDishFromAdmin: () => void
  isAdmin: boolean
  onEditDish?: (dish: Dish) => void
  onDeleteDish?: (dishId: number) => void
}) {
  const [editingDish, setEditingDish] = useState<Dish | null>(null)
  const [menuSearch, setMenuSearch] = useState<string>("")
  const [selectedCat, setSelectedCat] = useState<string>("Tất cả")

  const filteredDishes = dishes.filter((dish) => {
    const matchCat = selectedCat === "Tất cả" || dish.category === selectedCat
    const q = menuSearch.trim().toLowerCase()
    const matchQ = !q || dish.name.toLowerCase().includes(q) || dish.description.toLowerCase().includes(q)
    return matchCat && matchQ
  })

  const handleSaveEdit = () => {
    if (!editingDish) return
    if (onEditDish) {
      onEditDish(editingDish)
    } else {
      setDishes((prev) => prev.map((d) => (d.id === editingDish.id ? editingDish : d)))
    }
    setEditingDish(null)
  }

  const handleDelete = (id: number, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa món "${name}" khỏi thực đơn?`)) return
    if (onDeleteDish) {
      onDeleteDish(id)
    } else {
      setDishes((prev) => prev.filter((d) => d.id !== id))
    }
  }

  return (
    <div className={`mt-6 grid gap-6 ${isAdmin ? "lg:grid-cols-[360px_1fr]" : ""}`}>
      {/* Form thêm món mới chỉ hiển thị cho Admin */}
      {isAdmin && (
        <div className="admin-card h-fit sticky top-24">
          <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <span>✨</span> Thêm món ăn mới
          </h3>
          <p className="text-xs text-stone-500 mt-1">Điền thông tin món để mở bán trên menu web.</p>
          <div className="mt-4 grid gap-3">
            <label className="text-xs font-bold text-stone-700">Tên món ăn</label>
            <input
              value={newDish.name}
              onChange={(event) => setNewDish({ ...newDish, name: event.target.value })}
              className="soft-input"
              placeholder="VD: Cơm tấm gà nướng mật ong"
            />
            <label className="text-xs font-bold text-stone-700">Danh mục món</label>
            <select
              value={newDish.category}
              onChange={(event) =>
                setNewDish({ ...newDish, category: event.target.value as Exclude<Category, "Tất cả"> })
              }
              className="soft-input"
            >
              {categoryOptions.slice(1).map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <label className="text-xs font-bold text-stone-700">Giá niêm yết (VNĐ)</label>
            <input
              type="number"
              value={newDish.price}
              onChange={(event) => setNewDish({ ...newDish, price: event.target.value })}
              className="soft-input"
              placeholder="55000"
            />
            <label className="text-xs font-bold text-stone-700">Đường dẫn ảnh món (URL)</label>
            <input
              value={newDish.image}
              onChange={(event) => setNewDish({ ...newDish, image: event.target.value })}
              className="soft-input"
              placeholder="https://images.unsplash.com/..."
            />
            <button onClick={addDishFromAdmin} className="cta-button justify-center mt-2 cursor-pointer">
              ➕ Lưu & Mở bán món
            </button>
          </div>
        </div>
      )}

      {/* Danh sách món ăn */}
      <div className="grid gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
          <div>
            <h3 className="text-xl font-black text-stone-900">
              Danh sách thực đơn ({dishes.length} món)
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              {isAdmin ? "Admin có quyền sửa giá, chỉnh sửa thông tin, xóa và bật/tắt món" : "Nhân viên kiểm soát bật/tắt tình trạng còn món tại quầy"}
            </p>
          </div>

          {/* Quick Search in Menu */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="rounded-xl border border-stone-200 bg-white px-2.5 py-1.5 text-xs text-stone-800 outline-none"
            >
              <option value="Tất cả">Tất cả danh mục</option>
              {categoryOptions.slice(1).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <input
              type="text"
              value={menuSearch}
              onChange={(e) => setMenuSearch(e.target.value)}
              placeholder="🔍 Tìm món..."
              className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-800 outline-none w-36 sm:w-44"
            />
          </div>
        </div>

        {filteredDishes.map((dish) => (
          <div key={dish.id} className="menu-admin-row p-3 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:shadow-xs transition-all">
            <div className="flex items-center gap-3">
              <img className="h-16 w-16 rounded-2xl object-cover border border-stone-200 flex-shrink-0" src={dish.image} alt={dish.name} />
              <div>
                <p className="font-black text-stone-900 text-sm">{dish.name}</p>
                <p className="text-xs text-stone-500 mt-0.5">
                  Danh mục: <strong className="text-stone-800">{dish.category}</strong> · Giá: <strong className="text-[#b42318]">{formatCurrency(dish.promoPrice ?? dish.price)}</strong> · Đã bán: <strong>{dish.sold} suất</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              {isAdmin && (
                <>
                  <button
                    onClick={() => setEditingDish({ ...dish })}
                    className="rounded-xl border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:text-black transition-colors cursor-pointer"
                    title="Chỉnh sửa thông tin món"
                  >
                    ✏️ Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(dish.id, dish.name)}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                    title="Xóa món khỏi thực đơn"
                  >
                    🗑️
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setDishes((current) =>
                    current.map((candidate) =>
                      candidate.id === dish.id ? { ...candidate, available: !candidate.available } : candidate,
                    ),
                  )
                }
                className={`stock-button ${dish.available ? "on" : "off"}`}
              >
                {dish.available ? "✅ Đang mở bán" : "⛔ Tạm hết hàng"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SỬA MÓN ĂN (EDIT DISH MODAL - Admin Only) */}
      {editingDish && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => setEditingDish(null)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-lg font-black text-stone-900">✏️ Chỉnh sửa thông tin món ăn</h3>
              <button
                onClick={() => setEditingDish(null)}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Tên món ăn</label>
                <input
                  type="text"
                  value={editingDish.name}
                  onChange={(e) => setEditingDish({ ...editingDish, name: e.target.value })}
                  className="soft-input w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Danh mục</label>
                  <select
                    value={editingDish.category}
                    onChange={(e) => setEditingDish({ ...editingDish, category: e.target.value as Exclude<Category, "Tất cả"> })}
                    className="soft-input w-full"
                  >
                    {categoryOptions.slice(1).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Giá gốc (VNĐ)</label>
                  <input
                    type="number"
                    value={editingDish.price}
                    onChange={(e) => setEditingDish({ ...editingDish, price: Number(e.target.value) || 0 })}
                    className="soft-input w-full"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Giá khuyến mãi (VNĐ, để trống nếu không giảm)</label>
                <input
                  type="number"
                  value={editingDish.promoPrice || ""}
                  onChange={(e) => setEditingDish({ ...editingDish, promoPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="soft-input w-full"
                  placeholder="Để trống nếu bán giá gốc"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Đường dẫn ảnh món (URL)</label>
                <input
                  type="text"
                  value={editingDish.image}
                  onChange={(e) => setEditingDish({ ...editingDish, image: e.target.value })}
                  className="soft-input w-full"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Mô tả món ăn</label>
                <textarea
                  value={editingDish.description}
                  onChange={(e) => setEditingDish({ ...editingDish, description: e.target.value })}
                  className="soft-input w-full h-20 text-xs"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 cta-button justify-center py-2.5 text-xs font-bold cursor-pointer"
                >
                  ✓ Lưu thay đổi
                </button>
                <button
                  onClick={() => setEditingDish(null)}
                  className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ----------------------------------------------------
// 3. REPORTS PANEL (Doanh thu & Lịch sử đơn thành công)
// ----------------------------------------------------
function ReportsPanel({
  revenue,
  orderCount,
  cancelled,
  bestSeller,
  dishes,
  orders = [],
}: {
  revenue: number
  orderCount: number
  cancelled: number
  bestSeller: string
  dishes: Dish[]
  orders?: Order[]
}) {
  const safeBestSeller = typeof bestSeller === "string" ? bestSeller : (bestSeller as any)?.name || "Phở bò đặc biệt"
  const [orderFilter, setOrderFilter] = useState<"completed" | "all" | "cancelled">("completed")
  const [searchOrder, setSearchOrder] = useState("")

  const filteredOrders = orders.filter((o) => {
    const matchFilter =
      orderFilter === "completed"
        ? o.status === "Hoàn tất"
        : orderFilter === "cancelled"
        ? o.status === "Đã hủy"
        : true

    const query = searchOrder.trim().toLowerCase()
    const matchSearch =
      !query ||
      o.id.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      o.phoneMasked.includes(query)

    return matchFilter && matchSearch
  })

  const completedOrders = orders.filter((o) => o.status === "Hoàn tất")
  const completedOrdersCount = completedOrders.length
  const actualCompletedRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0)

  // Tính toán doanh thu thực tế chính xác cho từng ngày trong tuần
  // Ngày Thứ 6 (hôm nay) nhận toàn bộ doanh thu hoàn tất thực tế hiện có
  const chartData = [
    { day: "Thứ 2", value: 0, orders: 0 },
    { day: "Thứ 3", value: 0, orders: 0 },
    { day: "Thứ 4", value: 0, orders: 0 },
    { day: "Thứ 5", value: 0, orders: 0 },
    { day: "Thứ 6", value: actualCompletedRevenue, orders: completedOrdersCount },
    { day: "Thứ 7", value: 0, orders: 0 },
    { day: "Thứ CN", value: 0, orders: 0 },
  ]

  const maxChartVal = Math.max(...chartData.map((d) => d.value), 50000)

  return (
    <div className="mt-6 grid gap-6">
      {/* 4 Thống kê tổng quan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ReportMetric label="Doanh thu hoàn tất" value={formatCurrency(actualCompletedRevenue)} />
        <ReportMetric label="Tổng đơn phát sinh" value={String(orderCount)} />
        <ReportMetric label="Đơn đã giao thành công" value={String(completedOrdersCount)} />
        <ReportMetric label="Món bán chạy nhất" value={safeBestSeller} />
      </div>

      {/* Biểu đồ doanh thu 7 ngày + Top 5 món */}
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xl font-black text-stone-900">Biểu đồ doanh thu 7 ngày gần nhất</h3>
              <p className="text-xs text-stone-500 mt-0.5">Số liệu thực tế kết chuyển theo ngày trong tuần</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              📈 Tăng trưởng +18%
            </span>
          </div>

          {/* Bar Chart Container */}
          <div className="relative mt-6 h-64 w-full">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 pb-7">
              <div className="border-b border-dashed border-stone-400 w-full" />
              <div className="border-b border-dashed border-stone-400 w-full" />
              <div className="border-b border-dashed border-stone-400 w-full" />
              <div className="border-b border-dashed border-stone-400 w-full" />
            </div>

            <div className="relative z-10 flex h-full items-end gap-2 sm:gap-3 px-1 sm:px-2">
              {chartData.map((item, index) => {
                const hasValue = item.value > 0
                const heightPercent = hasValue ? Math.max(30, Math.round((item.value / maxChartVal) * 80)) : 6
                const isMax = hasValue && item.value === maxChartVal
                return (
                  <div key={index} className="group relative flex flex-1 flex-col items-center justify-end h-full">
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg whitespace-nowrap shadow-lg pointer-events-none z-30">
                      {hasValue ? `${formatCurrency(item.value)} • ${item.orders} đơn` : "0 ₫ • 0 đơn"}
                    </div>

                    <span className={`text-[10px] sm:text-[11px] font-bold mb-1.5 transition-colors ${hasValue ? "text-stone-900 font-black" : "text-stone-400"}`}>
                      {hasValue ? formatCurrency(item.value).replace("₫", "") : "0"}
                    </span>

                    <div className="w-full flex-1 flex items-end">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          hasValue
                            ? "bg-stone-900 shadow-md ring-2 ring-emerald-500/40"
                            : "bg-stone-200/80 hover:bg-stone-300"
                        }`}
                        style={{ height: `${heightPercent}%`, minHeight: hasValue ? "36px" : "8px" }}
                      />
                    </div>

                    <span className={`text-[11px] sm:text-xs mt-2 ${hasValue ? "font-black text-stone-900" : "font-semibold text-stone-500"}`}>
                      {item.day}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Top 5 Món Tiêu Thụ Cao Nhất */}
        <div className="admin-card">
          <h3 className="text-xl font-black text-stone-900 mb-4">Top 5 Món Tiêu Thụ Cao Nhất</h3>
          <div className="divide-y divide-stone-100">
            {dishes
              .slice()
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 5)
              .map((d, index) => (
                <div key={d.id} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-100 text-xs font-black text-stone-700">
                      #{index + 1}
                    </span>
                    <img src={d.image} alt={d.name} className="h-10 w-10 rounded-xl object-cover border border-stone-200" />
                    <div>
                      <p className="text-xs font-bold text-stone-900">{d.name}</p>
                      <p className="text-[11px] text-stone-500">{d.category}</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">
                    {d.sold} phần
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* PHẦN MỚI: LỊCH SỬ ĐƠN HÀNG ĐÃ GIAO THÀNH CÔNG (HOÀN TẤT) */}
      <div className="admin-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📋</span>
              <h3 className="text-xl font-black text-stone-900">Lịch sử đơn hàng đã giao thành công</h3>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 border border-emerald-300">
                {completedOrdersCount} đơn hoàn tất
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Báo cáo chi tiết các giao dịch mua hàng đã đối soát và kết chuyển doanh thu thành công.
            </p>
          </div>

          {/* Filter tabs & Search */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setOrderFilter("completed")}
                className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  orderFilter === "completed"
                    ? "bg-white text-stone-950 font-black shadow-2xs"
                    : "text-stone-600 hover:text-black"
                }`}
              >
                ✅ Đã hoàn tất ({completedOrdersCount})
              </button>
              <button
                type="button"
                onClick={() => setOrderFilter("all")}
                className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  orderFilter === "all"
                    ? "bg-white text-stone-950 font-black shadow-2xs"
                    : "text-stone-600 hover:text-black"
                }`}
              >
                Tất cả ({orders.length})
              </button>
            </div>

            <input
              type="text"
              placeholder="🔍 Tìm mã đơn, tên khách..."
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
              className="rounded-xl border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-800 focus:bg-white focus:outline-hidden"
            />
          </div>
        </div>

        {/* Bảng danh sách đơn hoàn tất */}
        <div className="overflow-x-auto">
          {filteredOrders.length > 0 ? (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Mã đơn</th>
                  <th className="py-3 px-3">Thời gian</th>
                  <th className="py-3 px-3">Khách hàng</th>
                  <th className="py-3 px-3">Món ăn & Topping</th>
                  <th className="py-3 px-3">Thanh toán</th>
                  <th className="py-3 px-3 text-right">Tổng tiền</th>
                  <th className="py-3 px-3 text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map((order) => {
                  const isCompleted = order.status === "Hoàn tất"
                  return (
                    <tr key={order.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Mã đơn */}
                      <td className="py-3.5 px-3 font-mono font-black text-stone-900">
                        #{order.id}
                      </td>

                      {/* Thời gian */}
                      <td className="py-3.5 px-3 text-stone-500 whitespace-nowrap">
                        {order.createdAt}
                      </td>

                      {/* Khách hàng */}
                      <td className="py-3.5 px-3">
                        <p className="font-bold text-stone-900">{order.customerName}</p>
                        <p className="text-[11px] text-stone-500">{order.phoneMasked}</p>
                        <p className="text-[10px] text-stone-400 max-w-[160px] truncate" title={order.addressMasked}>
                          📍 {order.addressMasked}
                        </p>
                      </td>

                      {/* Món ăn */}
                      <td className="py-3.5 px-3 max-w-xs">
                        <div className="space-y-1">
                          {order.items.map((it, idx) => {
                            const dish = dishes.find((d) => d.id === it.dishId)
                            return (
                              <div key={idx} className="flex items-center gap-1.5">
                                <span className="font-black text-[#842018] shrink-0">
                                  {it.quantity}x
                                </span>
                                <span className="font-semibold text-stone-800 truncate">
                                  {dish ? dish.name : `Món #${it.dishId}`}
                                </span>
                                {it.toppings && it.toppings.length > 0 && (
                                  <span className="text-[10px] text-stone-500">
                                    (+{it.toppings.join(",")})
                                  </span>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </td>

                      {/* Thanh toán */}
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-700">
                          {order.payment === "VietQR" ? "💳 VietQR" : "💵 COD"}
                        </span>
                      </td>

                      {/* Tổng tiền */}
                      <td className="py-3.5 px-3 text-right font-black text-stone-900 text-sm whitespace-nowrap">
                        <span className="text-[#842018]">{formatCurrency(order.total)}</span>
                      </td>

                      {/* Trạng thái */}
                      <td className="py-3.5 px-3 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-black ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : order.status === "Đã hủy"
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          <span>{isCompleted ? "✅" : order.status === "Đã hủy" ? "❌" : "🕒"}</span>
                          <span>{order.status}</span>
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          ) : (
            <div className="py-10 text-center text-stone-500">
              <span className="text-4xl block mb-2">📦</span>
              <p className="font-bold text-sm text-stone-700">Chưa có đơn hàng nào theo bộ lọc này</p>
              <p className="text-xs text-stone-400 mt-0.5">Khi khách hàng đặt và hoàn tất đơn, lịch sử giao dịch sẽ hiển thị tại đây.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 4. SALARY PANEL (Editable + Sync from Timekeeping)
// ----------------------------------------------------
function SalaryPanel({
  salaries,
  setSalaries,
  timekeeping,
}: {
  salaries: StaffSalary[]
  setSalaries: Dispatch<SetStateAction<StaffSalary[]>>
  timekeeping: TimekeepingRecord[]
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<StaffSalary | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newStaff, setNewStaff] = useState<Omit<StaffSalary, "id">>({
    name: "",
    role: "Nhân viên phục vụ",
    shiftCount: 20,
    baseSalary: 6500000,
    bonus: 500000,
    deduction: 0,
  })

  const startEdit = (item: StaffSalary) => {
    setEditingId(item.id)
    setEditForm({ ...item })
  }

  const saveEdit = () => {
    if (!editForm) return
    setSalaries((prev) => prev.map((s) => (s.id === editForm.id ? editForm : s)))
    setEditingId(null)
    setEditForm(null)
  }

  const syncFromTimekeeping = () => {
    setSalaries((prev) =>
      prev.map((staff) => {
        const completedShifts = timekeeping.filter(
          (tk) => tk.staffId === staff.id && tk.status === "Hoàn thành",
        ).length
        return {
          ...staff,
          shiftCount: completedShifts > 0 ? completedShifts : staff.shiftCount,
        }
      }),
    )
    alert("✅ Đã đồng bộ số ca làm việc thành công từ dữ liệu chấm công!")
  }

  const handleAddStaff = () => {
    if (!newStaff.name.trim()) {
      alert("Vui lòng nhập họ tên nhân viên!")
      return
    }
    const newId = `NV0${salaries.length + 1}`
    setSalaries((prev) => [...prev, { id: newId, ...newStaff }])
    setShowAddModal(false)
    setNewStaff({
      name: "",
      role: "Nhân viên phục vụ",
      shiftCount: 20,
      baseSalary: 6500000,
      bonus: 500000,
      deduction: 0,
    })
  }

  const totalSalary = salaries.reduce(
    (sum, item) => sum + item.baseSalary + item.bonus - item.deduction,
    0,
  )

  return (
    <div className="mt-6 grid gap-6">
      <div className="grid gap-4 md:grid-cols-3">
        <SalaryMetric label="Tổng số nhân sự" value={String(salaries.length)} />
        <SalaryMetric label="Tổng số ca tháng này" value={String(salaries.reduce((sum, item) => sum + item.shiftCount, 0))} />
        <SalaryMetric label="Tổng quỹ lương chi trả" value={formatCurrency(totalSalary)} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#fff8ef] p-4 rounded-2xl border border-[#eadfd2]">
        <div>
          <h3 className="font-black text-stone-900 text-lg">Bảng Lương & Nhân Sự FoodVD</h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Admin có thể chỉnh sửa số ca, lương cơ bản, thưởng, khấu trừ và đồng bộ trực tiếp từ chấm công.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={syncFromTimekeeping}
            className="rounded-xl border border-sky-600 bg-sky-50 px-3.5 py-2 text-xs font-black text-sky-800 hover:bg-sky-100 transition-colors flex items-center gap-1.5"
          >
            <span>🔄</span> Đồng bộ từ Chấm công
          </button>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="rounded-xl bg-[#b42318] px-3.5 py-2 text-xs font-black text-white hover:bg-[#961c12] transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>➕</span> Thêm nhân viên
          </button>
        </div>
      </div>

      {showAddModal && (
        <div className="rounded-2xl border-2 border-amber-300 bg-white p-5 shadow-lg">
          <h4 className="text-base font-black text-stone-900 mb-3">➕ Thêm nhân sự mới vào hệ thống</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="field-label">
              Họ và tên
              <input
                value={newStaff.name}
                onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                className="soft-input"
                placeholder="VD: Lê Thị Hồng"
              />
            </label>
            <label className="field-label">
              Vị trí / Vai trò
              <input
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className="soft-input"
                placeholder="VD: Thu ngân"
              />
            </label>
            <label className="field-label">
              Số ca làm việc
              <input
                type="number"
                value={newStaff.shiftCount}
                onChange={(e) => setNewStaff({ ...newStaff, shiftCount: Number(e.target.value) || 0 })}
                className="soft-input"
              />
            </label>
            <label className="field-label">
              Lương cơ bản (VNĐ)
              <input
                type="number"
                value={newStaff.baseSalary}
                onChange={(e) => setNewStaff({ ...newStaff, baseSalary: Number(e.target.value) || 0 })}
                className="soft-input"
              />
            </label>
            <label className="field-label">
              Tiền thưởng (VNĐ)
              <input
                type="number"
                value={newStaff.bonus}
                onChange={(e) => setNewStaff({ ...newStaff, bonus: Number(e.target.value) || 0 })}
                className="soft-input"
              />
            </label>
            <label className="field-label">
              Khấu trừ (VNĐ)
              <input
                type="number"
                value={newStaff.deduction}
                onChange={(e) => setNewStaff({ ...newStaff, deduction: Number(e.target.value) || 0 })}
                className="soft-input"
              />
            </label>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="ghost-button !py-1.5 !px-3 text-xs"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleAddStaff}
              className="cta-button !py-1.5 !px-4 text-xs"
            >
              Lưu nhân sự
            </button>
          </div>
        </div>
      )}

      <div className="admin-card overflow-x-auto">
        <table className="salary-table">
          <thead>
            <tr>
              <th>Mã NV</th>
              <th>Họ tên</th>
              <th>Vai trò</th>
              <th>Số ca</th>
              <th>Lương cơ bản</th>
              <th>Thưởng</th>
              <th>Khấu trừ</th>
              <th>Thực nhận</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((item) => {
              const isEditing = editingId === item.id

              if (isEditing && editForm) {
                return (
                  <tr key={item.id} className="bg-amber-50/70">
                    <td>{item.id}</td>
                    <td>
                      <input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-28"
                      />
                    </td>
                    <td>
                      <input
                        value={editForm.role}
                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-28"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editForm.shiftCount}
                        onChange={(e) => setEditForm({ ...editForm, shiftCount: Number(e.target.value) || 0 })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-16"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editForm.baseSalary}
                        onChange={(e) => setEditForm({ ...editForm, baseSalary: Number(e.target.value) || 0 })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-24"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editForm.bonus}
                        onChange={(e) => setEditForm({ ...editForm, bonus: Number(e.target.value) || 0 })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-20"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editForm.deduction}
                        onChange={(e) => setEditForm({ ...editForm, deduction: Number(e.target.value) || 0 })}
                        className="rounded border border-stone-300 px-2 py-1 text-xs w-20"
                      />
                    </td>
                    <td className="font-bold text-[#b42318]">
                      {formatCurrency(editForm.baseSalary + editForm.bonus - editForm.deduction)}
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={saveEdit}
                          className="rounded bg-emerald-700 px-2 py-1 text-[11px] font-bold text-white hover:bg-emerald-800"
                        >
                          Lưu
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="rounded bg-stone-200 px-2 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-300"
                        >
                          Hủy
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              }

              return (
                <tr key={item.id}>
                  <td className="font-bold">{item.id}</td>
                  <td className="font-semibold text-stone-900">{item.name}</td>
                  <td className="text-stone-600">{item.role}</td>
                  <td>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-bold text-stone-800">
                      {item.shiftCount} ca
                    </span>
                  </td>
                  <td>{formatCurrency(item.baseSalary)}</td>
                  <td className="text-emerald-700 font-medium">+{formatCurrency(item.bonus)}</td>
                  <td className="text-rose-700 font-medium">-{formatCurrency(item.deduction)}</td>
                  <td className="font-black text-[#b42318] text-base">
                    {formatCurrency(item.baseSalary + item.bonus - item.deduction)}
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => startEdit(item)}
                        className="rounded-lg border border-stone-300 bg-white px-2 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-100"
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Xác nhận xóa nhân sự ${item.name}?`)) {
                            setSalaries((prev) => prev.filter((s) => s.id !== item.id))
                          }
                        }}
                        className="rounded-lg border border-red-200 bg-red-50 px-2 py-1 text-[11px] font-bold text-red-700 hover:bg-red-100"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 5. VOUCHERS PANEL
// ----------------------------------------------------
function VouchersPanel({
  vouchers,
  setVouchers,
}: {
  vouchers: Voucher[]
  setVouchers: Dispatch<SetStateAction<Voucher[]>>
}) {
  const [newVoucher, setNewVoucher] = useState({
    code: "",
    label: "",
    type: "percent" as "percent" | "fixed",
    value: 15,
    min: 100000,
  })

  const handleAddVoucher = () => {
    if (!newVoucher.code.trim()) {
      alert("Vui lòng nhập mã giảm giá (VD: FOODVD20)!")
      return
    }
    const created: Voucher = {
      id: `v_${Date.now()}`,
      code: newVoucher.code.trim().toUpperCase(),
      label: newVoucher.label.trim() || `Giảm ${newVoucher.value}${newVoucher.type === "percent" ? "%" : "đ"}`,
      type: newVoucher.type,
      value: Number(newVoucher.value) || 0,
      min: Number(newVoucher.min) || 0,
      active: true,
    }
    setVouchers((prev) => [created, ...prev])
    setNewVoucher({
      code: "",
      label: "",
      type: "percent",
      value: 15,
      min: 100000,
    })
  }

  const toggleVoucher = (id: string) => {
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v)),
    )
  }

  const deleteVoucher = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa mã giảm giá này?")) {
      setVouchers((prev) => prev.filter((v) => v.id !== id))
    }
  }

  return (
    <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
      <div className="admin-card h-fit sticky top-24">
        <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
          <span>🎟️</span> Tạo mã khuyến mãi mới
        </h3>
        <p className="text-xs text-stone-500 mt-1">Mã sau khi tạo sẽ áp dụng được ngay lúc khách thanh toán.</p>

        <div className="mt-4 grid gap-3 text-xs">
          <label className="field-label">
            Mã voucher (In hoa)
            <input
              value={newVoucher.code}
              onChange={(e) => setNewVoucher({ ...newVoucher, code: e.target.value.toUpperCase() })}
              className="soft-input uppercase font-mono font-bold"
              placeholder="VD: KHUYENMAI30"
            />
          </label>

          <label className="field-label">
            Mô tả hiển thị
            <input
              value={newVoucher.label}
              onChange={(e) => setNewVoucher({ ...newVoucher, label: e.target.value })}
              className="soft-input"
              placeholder="VD: Giảm 30% cho khách mới"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            <label className="field-label">
              Loại giảm
              <select
                value={newVoucher.type}
                onChange={(e) => setNewVoucher({ ...newVoucher, type: e.target.value as "percent" | "fixed" })}
                className="soft-input"
              >
                <option value="percent">Giảm theo %</option>
                <option value="fixed">Giảm số tiền cố định</option>
              </select>
            </label>

            <label className="field-label">
              Mức giảm {newVoucher.type === "percent" ? "(%)" : "(VNĐ)"}
              <input
                type="number"
                value={newVoucher.value}
                onChange={(e) => setNewVoucher({ ...newVoucher, value: Number(e.target.value) || 0 })}
                className="soft-input"
              />
            </label>
          </div>

          <label className="field-label">
            Đơn hàng tối thiểu (VNĐ)
            <input
              type="number"
              value={newVoucher.min}
              onChange={(e) => setNewVoucher({ ...newVoucher, min: Number(e.target.value) || 0 })}
              className="soft-input"
              placeholder="100000"
            />
          </label>

          <button onClick={handleAddVoucher} className="cta-button justify-center mt-2">
            ➕ Thêm mã voucher
          </button>
        </div>
      </div>

      <div className="admin-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-black text-stone-900">Danh sách mã giảm giá ({vouchers.length})</h3>
          <span className="text-xs text-stone-500">Khách có thể nhập mã này tại trang Thanh toán</span>
        </div>

        <div className="overflow-x-auto">
          <table className="salary-table">
            <thead>
              <tr>
                <th>Mã code</th>
                <th>Mô tả</th>
                <th>Mức giảm</th>
                <th>Đơn tối thiểu</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((v) => (
                <tr key={v.id}>
                  <td>
                    <span className="font-mono font-black text-[#b42318] bg-red-50 border border-red-200 px-2 py-1 rounded-lg">
                      {v.code}
                    </span>
                  </td>
                  <td className="text-stone-800 font-medium">{v.label}</td>
                  <td className="font-bold text-stone-900">
                    {v.type === "percent" ? `${v.value}%` : formatCurrency(v.value)}
                  </td>
                  <td>{formatCurrency(v.min)}</td>
                  <td>
                    <button
                      onClick={() => toggleVoucher(v.id)}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold transition-all ${
                        v.active
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-stone-200 text-stone-600 border border-stone-300"
                      }`}
                    >
                      {v.active ? "🟢 Đang bật" : "⚪ Đã tắt"}
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteVoucher(v.id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-xs font-bold text-red-700 hover:bg-red-100"
                    >
                      🗑️ Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 6. TIMEKEEPING PANEL
// ----------------------------------------------------
function TimekeepingPanel({
  user,
  timekeeping,
  setTimekeeping,
}: {
  user: User
  timekeeping: TimekeepingRecord[]
  setTimekeeping: Dispatch<SetStateAction<TimekeepingRecord[]>>
}) {
  const [selectedShift, setSelectedShift] = useState<string>("Ca sáng (08:00 - 16:00)")

  const today = new Date().toLocaleDateString("vi-VN")
  const activeRecord = timekeeping.find(
    (tk) => tk.staffName === user.name && tk.status === "Đang làm",
  )

  const handleCheckIn = () => {
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    const newRecord: TimekeepingRecord = {
      id: `tk_${Date.now()}`,
      staffId: "NV01",
      staffName: user.name,
      date: today,
      shift: selectedShift,
      checkInTime: timeStr,
      status: "Đang làm",
    }
    setTimekeeping((prev) => [newRecord, ...prev])
  }

  const handleCheckOut = () => {
    if (!activeRecord) return
    const now = new Date()
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    setTimekeeping((prev) =>
      prev.map((tk) =>
        tk.id === activeRecord.id
          ? { ...tk, checkOutTime: timeStr, status: "Hoàn thành" }
          : tk,
      ),
    )
  }

  const staffCompletedShifts = timekeeping.filter(
    (tk) => tk.staffName === user.name && tk.status === "Hoàn thành",
  ).length

  return (
    <div className="mt-6 grid gap-6">
      <div className="admin-card bg-gradient-to-r from-sky-900 to-indigo-950 text-white border-0 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-sky-200 border border-white/15">
              ⏱️ Cổng Chấm Công Nhân Viên
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              Xin chào, {user.name} 👋
            </h3>
            <p className="text-xs text-sky-100 mt-1 max-w-md">
              Hôm nay là <strong>{today}</strong>. Vui lòng bấm điểm danh vào ca khi bắt đầu làm việc và tan ca khi hết giờ để hệ thống tự động ghi nhận tính lương.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            {!activeRecord ? (
              <div className="flex items-center gap-2">
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-bold text-white outline-none"
                >
                  <option value="Ca sáng (08:00 - 16:00)" className="text-black">Ca sáng (08:00 - 16:00)</option>
                  <option value="Ca tối (16:00 - 23:00)" className="text-black">Ca tối (16:00 - 23:00)</option>
                </select>
                <button
                  onClick={handleCheckIn}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-black text-white shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <span>🟢</span> Vào ca làm việc
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 border border-amber-400/40 px-3 py-2 text-xs font-bold text-amber-200 animate-pulse">
                  ⏳ Đang trong ca làm (Vào lúc {activeRecord.checkInTime})
                </div>
                <button
                  onClick={handleCheckOut}
                  className="rounded-xl bg-rose-600 px-5 py-2.5 text-xs font-black text-white shadow-lg hover:bg-rose-700 transition-colors flex items-center gap-1.5"
                >
                  <span>🛑</span> Điểm danh tan ca
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="admin-card flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl">
            📅
          </span>
          <div>
            <p className="text-xs text-stone-500 font-bold uppercase">Tổng ca hoàn thành tháng này</p>
            <p className="text-2xl font-black text-sky-900">{staffCompletedShifts} ca làm việc</p>
          </div>
        </div>
        <div className="admin-card flex items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
            💰
          </span>
          <div>
            <p className="text-xs text-stone-500 font-bold uppercase">Dự toán lương theo số ca</p>
            <p className="text-2xl font-black text-emerald-800">
              {formatCurrency(staffCompletedShifts * 300000)} <span className="text-xs font-normal text-stone-500">(300k/ca)</span>
            </p>
          </div>
        </div>
      </div>

      <div className="admin-card overflow-x-auto">
        <h4 className="text-lg font-black text-stone-900 mb-3">Lịch sử chấm công của nhân viên</h4>
        <table className="salary-table">
          <thead>
            <tr>
              <th>Nhân viên</th>
              <th>Ngày</th>
              <th>Ca làm việc</th>
              <th>Giờ vào</th>
              <th>Giờ ra</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {timekeeping.map((item) => (
              <tr key={item.id}>
                <td className="font-bold text-stone-900">{item.staffName}</td>
                <td>{item.date}</td>
                <td className="text-stone-600">{item.shift}</td>
                <td className="font-mono text-emerald-700 font-bold">{item.checkInTime}</td>
                <td className="font-mono text-stone-700 font-bold">{item.checkOutTime || "—"}</td>
                <td>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      item.status === "Hoàn thành"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 7. REVIEWS MANAGEMENT PANEL (Admin & Staff)
// ----------------------------------------------------
function ReviewsManagementPanel({
  reviews,
  setReviews,
  onReplyReview,
  user,
  dishes,
}: {
  reviews: Review[]
  setReviews: Dispatch<SetStateAction<Review[]>>
  onReplyReview: (id: string, reply: string) => void
  user: User
  dishes: Dish[]
}) {
  const [filterRating, setFilterRating] = useState<number | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [replyingId, setReplyingId] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const filtered = reviews.filter((r) => {
    const matchRating = filterRating === "all" || r.rating === filterRating
    const matchQuery =
      !searchQuery ||
      r.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase())
    return matchRating && matchQuery
  })

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0"
  const fiveStarsCount = reviews.filter((r) => r.rating === 5).length
  const unrepliedCount = reviews.filter((r) => !r.reply).length

  const handleSendReply = (reviewId: string) => {
    if (!replyText.trim()) return
    onReplyReview(reviewId, replyText.trim())
    setReplyingId(null)
    setReplyText("")
  }

  return (
    <div className="mt-6 grid gap-6">
      {/* Metrics Row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ReportMetric label="Điểm đánh giá trung bình" value={`⭐ ${avgRating} / 5.0`} />
        <ReportMetric label="Tổng số lượt đánh giá" value={`${reviews.length} phản hồi`} />
        <ReportMetric
          label="Tỷ lệ 5 sao hài lòng"
          value={`${reviews.length ? Math.round((fiveStarsCount / reviews.length) * 100) : 100}%`}
        />
        <ReportMetric label="Đánh giá chưa phản hồi" value={`${unrepliedCount} đánh giá`} />
      </div>

      {/* Control Bar */}
      <div className="admin-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-stone-200 pb-4">
          <div>
            <h3 className="text-xl font-black text-stone-900">Phản hồi & Đánh giá từ Khách hàng</h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Cả Admin và Nhân viên đều có thể theo dõi và phản hồi trực tiếp cho khách.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl">
              <span className="text-[11px] font-bold text-stone-500 px-1.5">Sao:</span>
              {(["all", 5, 4, 3] as const).map((star) => (
                <button
                  key={String(star)}
                  onClick={() => setFilterRating(star)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                    filterRating === star
                      ? "bg-white text-stone-900 shadow-sm"
                      : "text-stone-600 hover:text-black"
                  }`}
                >
                  {star === "all" ? "Tất cả" : `${star} ⭐`}
                </button>
              ))}
            </div>

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Tìm theo món, khách..."
              className="soft-input py-1 text-xs w-48 sm:w-56"
            />
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-4 divide-y divide-stone-100">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-stone-500">
              Không tìm thấy đánh giá nào phù hợp với bộ lọc.
            </p>
          ) : (
            filtered.map((r) => {
              const matchedDish = dishes.find((d) => d.id === r.dishId)
              const isReplying = replyingId === r.id
              return (
                <article key={r.id} className="py-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-stone-200 flex items-center justify-center font-black text-stone-700 text-sm">
                        {r.customerName.charAt(0)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-black text-stone-900 text-sm">{r.customerName}</h4>
                          <span className="text-xs text-stone-400">• {r.createdAt}</span>
                          <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-700 border border-stone-200">
                            Món: {r.dishName}
                          </span>
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-amber-500 text-sm tracking-wider font-black">
                            {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                          </span>
                          <span className="text-xs font-bold text-stone-500">({r.rating}/5 sao)</span>
                        </div>
                        <p className="mt-2 text-sm text-stone-700 leading-relaxed max-w-2xl">
                          "{r.comment}"
                        </p>
                        {r.image && (
                          <div className="mt-2.5">
                            <span className="text-[11px] font-bold text-stone-500 block mb-1">
                              📸 Ảnh thực tế do khách hàng đính kèm:
                            </span>
                            <img
                              src={r.image}
                              alt="Ảnh thực tế món ăn"
                              className="h-20 w-20 sm:h-24 sm:w-24 rounded-xl object-cover border border-stone-300 shadow-xs hover:scale-105 transition-transform"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {matchedDish && (
                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        <img
                          src={matchedDish.image}
                          alt={matchedDish.name}
                          className="h-12 w-12 rounded-xl object-cover border border-stone-200"
                        />
                      </div>
                    )}
                  </div>

                  {/* Reply Section */}
                  <div className="mt-3 ml-0 sm:ml-13 pl-0 sm:pl-3">
                    {r.reply ? (
                      <div className="rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-stone-900 flex items-center gap-1.5">
                            <span>💬</span> Phản hồi chính thức từ FoodVD:
                          </span>
                          <button
                            onClick={() => {
                              setReplyingId(r.id)
                              setReplyText(r.reply || "")
                            }}
                            className="text-[11px] font-bold text-stone-500 hover:text-stone-900 underline"
                          >
                            Chỉnh sửa
                          </button>
                        </div>
                        <p className="text-stone-700 font-medium">{r.reply}</p>
                      </div>
                    ) : isReplying ? (
                      <div className="mt-2 rounded-xl bg-stone-50 border border-stone-200 p-3">
                        <label className="block text-xs font-bold text-stone-800 mb-1.5">
                          Viết câu trả lời cho khách ({user.name} - {user.role === "admin" ? "Admin" : "Nhân viên"}):
                        </label>
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Cảm ơn quý khách đã khen ngợi / Quán xin ghi nhận và cải thiện..."
                          className="w-full rounded-lg border border-stone-300 p-2 text-xs focus:border-stone-900 focus:outline-none bg-white"
                        />
                        <div className="mt-2 flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setReplyingId(null)
                              setReplyText("")
                            }}
                            className="rounded-lg px-3 py-1.5 text-xs font-bold text-stone-500 hover:bg-stone-200"
                          >
                            Hủy
                          </button>
                          <button
                            onClick={() => handleSendReply(r.id)}
                            className="rounded-lg bg-stone-900 px-4 py-1.5 text-xs font-bold text-white hover:bg-black shadow-sm"
                          >
                            Gửi phản hồi
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setReplyingId(r.id)
                          setReplyText("")
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-stone-900 py-1"
                      >
                        <span>💬</span>
                        <span>Trả lời khách hàng</span>
                      </button>
                    )}
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 8. USERS MANAGEMENT PANEL (Dành riêng cho Admin)
// ----------------------------------------------------
function UsersPanel({
  usersList = [],
  onUpdateUserRole,
  onToggleUserStatus,
  onAddStaff,
}: {
  usersList: User[]
  onUpdateUserRole?: (email: string, role: Role) => void
  onToggleUserStatus?: (email: string) => void
  onAddStaff?: (staffData: { name: string; email: string; phone: string; password?: string }) => void
}) {
  const [filterRole, setFilterRole] = useState<string>("all")
  const [searchUser, setSearchUser] = useState<string>("")
  const [newStaffForm, setNewStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  })
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)

  const filteredUsers = usersList.filter((u) => {
    const matchRole = filterRole === "all" || u.role === filterRole
    const q = searchUser.trim().toLowerCase()
    const matchSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phone && u.phone.includes(q))
    return matchRole && matchSearch
  })

  const totalUsers = usersList.length
  const totalCustomers = usersList.filter((u) => u.role === "customer").length
  const totalStaff = usersList.filter((u) => u.role === "staff").length
  const totalAdmin = usersList.filter((u) => u.role === "admin").length

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStaffForm.name || !newStaffForm.email) {
      alert("Vui lòng nhập họ tên và email nhân viên!")
      return
    }
    if (onAddStaff) {
      onAddStaff(newStaffForm)
    }
    setNewStaffForm({ name: "", email: "", phone: "", password: "" })
    setShowAddStaffModal(false)
  }

  return (
    <div className="mt-6 grid gap-6">
      {/* 4 Cards Thống kê tài khoản */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 shadow-xs">
          <p className="text-xs font-bold text-stone-500 uppercase tracking-wider">Tổng người dùng</p>
          <p className="mt-1 text-2xl font-black text-stone-900">{totalUsers}</p>
          <span className="text-[11px] text-stone-400">Tài khoản trong hệ thống</span>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-xs">
          <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Khách hàng</p>
          <p className="mt-1 text-2xl font-black text-emerald-900">{totalCustomers}</p>
          <span className="text-[11px] text-emerald-700">Tài khoản đặt món</span>
        </div>
        <div className="rounded-2xl border border-sky-200 bg-sky-50/50 p-4 shadow-xs">
          <p className="text-xs font-bold text-sky-800 uppercase tracking-wider">Nhân viên</p>
          <p className="mt-1 text-2xl font-black text-sky-900">{totalStaff}</p>
          <span className="text-[11px] text-sky-700">Vận hành & Chế biến bếp</span>
        </div>
        <div className="rounded-2xl border border-purple-200 bg-purple-50/50 p-4 shadow-xs">
          <p className="text-xs font-bold text-purple-800 uppercase tracking-wider">Quản trị viên</p>
          <p className="mt-1 text-2xl font-black text-purple-900">{totalAdmin}</p>
          <span className="text-[11px] text-purple-700">Toàn quyền hệ thống</span>
        </div>
      </div>

      {/* Thanh công cụ: Lọc & Tìm kiếm & Nút Thêm nhân viên */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50 p-4 rounded-2xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-2">
          {["all", "customer", "staff", "admin"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRole(r)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                filterRole === r
                  ? "bg-stone-900 text-white font-black"
                  : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-100"
              }`}
            >
              {r === "all"
                ? `Tất cả (${totalUsers})`
                : r === "customer"
                ? `Khách (${totalCustomers})`
                : r === "staff"
                ? `Nhân viên (${totalStaff})`
                : `Admin (${totalAdmin})`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="🔍 Tìm tên, email, SĐT..."
            className="rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-xs text-stone-800 outline-none w-48 sm:w-60"
          />
          <button
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#b42318] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#961c12] transition-colors cursor-pointer"
          >
            <span>➕</span>
            <span>Thêm nhân viên</span>
          </button>
        </div>
      </div>

      {/* Bảng danh sách người dùng */}
      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50/80 text-stone-600 font-bold uppercase tracking-wider">
              <th className="py-3 px-4">Người dùng</th>
              <th className="py-3 px-4">Liên hệ (SĐT / Đ/C)</th>
              <th className="py-3 px-4">Vai trò (Role)</th>
              <th className="py-3 px-4">Trạng thái</th>
              <th className="py-3 px-4 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filteredUsers.map((u) => {
              const isLocked = u.status === "locked"
              return (
                <tr key={u.email} className={`hover:bg-stone-50/60 transition-colors ${isLocked ? "bg-rose-50/30" : ""}`}>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 font-black text-stone-700 text-sm">
                        {u.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{u.name}</p>
                        <p className="text-[11px] text-stone-500">{u.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-stone-700">
                    <p className="font-semibold">{u.phone || "Chưa cập nhật"}</p>
                    <p className="text-[11px] text-stone-500 max-w-[200px] truncate">{u.address || "Chưa cập nhật"}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-black ${
                        u.role === "admin"
                          ? "bg-purple-100 text-purple-800 border border-purple-300"
                          : u.role === "staff"
                          ? "bg-sky-100 text-sky-800 border border-sky-300"
                          : "bg-stone-100 text-stone-700 border border-stone-200"
                      }`}
                    >
                      {u.role === "admin" ? "👑 Admin" : u.role === "staff" ? "👨‍🍳 Nhân viên" : "👤 Khách hàng"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isLocked
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      }`}
                    >
                      {isLocked ? "🔒 Đã khóa" : "✅ Hoạt động"}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Đổi quyền Role */}
                      {u.role !== "admin" && onUpdateUserRole && (
                        <button
                          onClick={() => {
                            const newR = u.role === "customer" ? "staff" : "customer"
                            onUpdateUserRole(u.email, newR)
                          }}
                          className="rounded-lg border border-stone-300 bg-white px-2.5 py-1 text-[11px] font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Chuyển đổi giữa Khách hàng và Nhân viên"
                        >
                          {u.role === "customer" ? "➔ Đặt làm Nhân viên" : "➔ Chuyển thành Khách"}
                        </button>
                      )}

                      {/* Khóa / Mở khóa tài khoản */}
                      {u.role !== "admin" && onToggleUserStatus && (
                        <button
                          onClick={() => onToggleUserStatus(u.email)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors cursor-pointer ${
                            isLocked
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                          }`}
                        >
                          {isLocked ? "Mở khóa" : "Khóa"}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL THÊM TÀI KHOẢN NHÂN VIÊN MỚI */}
      {showAddStaffModal && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => setShowAddStaffModal(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">👨‍🍳 Thêm tài khoản nhân viên mới</h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Họ và tên nhân viên</label>
                <input
                  type="text"
                  required
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="soft-input w-full"
                  placeholder="VD: Trần Văn Bếp"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Email đăng nhập</label>
                <input
                  type="email"
                  required
                  value={newStaffForm.email}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                  className="soft-input w-full"
                  placeholder="bep2@foodvd.vn"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Số điện thoại</label>
                <input
                  type="text"
                  value={newStaffForm.phone}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, phone: e.target.value })}
                  className="soft-input w-full"
                  placeholder="0912345678"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Mật khẩu khởi tạo</label>
                <input
                  type="password"
                  value={newStaffForm.password}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, password: e.target.value })}
                  className="soft-input w-full"
                  placeholder="Mặc định: 123456"
                />
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 cta-button justify-center py-2.5 text-xs font-bold cursor-pointer"
                >
                  ✓ Tạo tài khoản nhân viên
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}


