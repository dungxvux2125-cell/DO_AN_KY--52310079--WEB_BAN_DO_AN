import { useState } from "react"
import { categoryOptions } from "../data"
import { StatusPill } from "../components/TienIchDonHang"
import { ReportMetric, SalaryMetric } from "./TienIchQuanLy"
import { SectionHeading } from "../components/TieuDePhan"
import type { Dispatch, SetStateAction } from "react"
import type { Category, Dish, Order, StaffSalary, TimekeepingRecord, User, Voucher } from "../types"
import { formatCurrency } from "../utils"

export type ManagementView = "orders" | "menu" | "reports" | "salary" | "vouchers" | "timekeeping"

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

  // Admin tabs (No orders, no customer functions)
  const adminTabs: Array<[ManagementView, string, string]> = [
    ["menu", "Quản lý sản phẩm", "📦"],
    ["reports", "Báo cáo doanh thu", "📊"],
    ["salary", "Nhân viên & Lương", "👥"],
    ["vouchers", "Quản lý mã giảm giá", "🎟️"],
  ]

  // Staff tabs (Only menu, orders, timekeeping)
  const staffTabs: Array<[ManagementView, string, string]> = [
    ["menu", "Quản lý sản phẩm", "📦"],
    ["orders", "Quản lý đơn hàng", "📝"],
    ["timekeeping", "Chấm công ca làm", "⏱️"],
  ]

  const availableTabs = isAdmin ? adminTabs : staffTabs

  // Ensure active view is allowed for this role
  const isViewAllowed = availableTabs.some(([k]) => k === view)
  const activeView = isViewAllowed ? view : isAdmin ? "menu" : "orders"

  return (
    <section className="page-shell page-shell-wide">
      <div className="soft-panel">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-stone-200 pb-5">
          <SectionHeading
            eyebrow={isAdmin ? "Cổng Quản Trị Hệ Thống (Admin Portal)" : "Cổng Vận Hành Nội Bộ (Staff Portal)"}
            title={
              isAdmin
                ? "Quản trị sản phẩm, doanh thu, nhân sự và khuyến mãi."
                : "Vận hành thực đơn, tiếp nhận đơn hàng và chấm công."
            }
            description={
              isAdmin
                ? "Quản trị viên có toàn quyền cấu hình món ăn, xem thống kê kinh doanh, điều chỉnh bảng lương nhân viên và tạo mã giảm giá."
                : "Nhân viên thực hiện kiểm tra trạng thái món ăn, cập nhật tiến trình đơn hàng và chấm công ca làm việc hàng ngày."
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

        {/* 1. ORDERS VIEW (Staff only) */}
        {activeView === "orders" && !isAdmin && (
          <OrdersPanel orders={orders} setOrders={setOrders} advanceOrder={advanceOrder} />
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
      </div>
    </section>
  )
}

// ----------------------------------------------------
// 1. ORDERS PANEL
// ----------------------------------------------------
function OrdersPanel({
  orders,
  setOrders,
  advanceOrder,
}: {
  orders: Order[]
  setOrders: Dispatch<SetStateAction<Order[]>>
  advanceOrder: (id: string) => void
}) {
  return (
    <div className="mt-6 grid gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-stone-900">Danh sách đơn hàng cần xử lý ({orders.length})</h3>
        <span className="text-xs text-stone-500 font-semibold">Nhấn "Cập nhật" để chuyển tiến trình giao</span>
      </div>

      {orders.length === 0 ? (
        <p className="text-center py-8 text-stone-500">Chưa có đơn hàng nào.</p>
      ) : (
        orders.map((order) => (
          <article key={order.id} className="admin-card">
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr_190px] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-black">{order.id}</h3>
                  <StatusPill status={order.status} />
                </div>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Khách: <strong>{order.customerName}</strong> · SĐT: {order.phoneMasked} · Đ/C: {order.addressMasked}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  {order.createdAt} · Email: {order.email}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Thanh toán: {order.payment}
                </p>
                <p className="text-2xl font-black text-[#b42318]">{formatCurrency(order.total)}</p>
              </div>

              <div className="flex gap-2 md:justify-end">
                {order.status !== "Hoàn tất" && order.status !== "Đã hủy" && (
                  <button className="admin-button" onClick={() => advanceOrder(order.id)}>
                    Cập nhật tiến trình
                  </button>
                )}
                {order.status === "Chờ duyệt" && (
                  <button
                    className="admin-button danger"
                    onClick={() =>
                      setOrders((current) =>
                        current.map((candidate) =>
                          candidate.id === order.id ? { ...candidate, status: "Đã hủy" } : candidate,
                        ),
                      )
                    }
                  >
                    Hủy đơn
                  </button>
                )}
              </div>
            </div>
          </article>
        ))
      )}
    </div>
  )
}

// ----------------------------------------------------
// 2. MENU PANEL
// ----------------------------------------------------
function MenuPanel({
  dishes,
  newDish,
  setNewDish,
  setDishes,
  addDishFromAdmin,
  isAdmin,
}: {
  dishes: Dish[]
  newDish: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }
  setNewDish: (value: { name: string; category: Exclude<Category, "Tất cả">; price: string; image: string }) => void
  setDishes: Dispatch<SetStateAction<Dish[]>>
  addDishFromAdmin: () => void
  isAdmin: boolean
}) {
  return (
    <div className={`mt-6 grid gap-6 ${isAdmin ? "lg:grid-cols-[360px_1fr]" : ""}`}>
      {isAdmin && (
        <div className="admin-card h-fit sticky top-24">
          <h3 className="text-xl font-black text-stone-900 flex items-center gap-2">
            <span>✨</span> Thêm món ăn mới
          </h3>
          <p className="text-xs text-stone-500 mt-1">Điền thông tin món để mở bán trên menu web.</p>
          <div className="mt-4 grid gap-3">
            <input
              value={newDish.name}
              onChange={(event) => setNewDish({ ...newDish, name: event.target.value })}
              className="soft-input"
              placeholder="Tên món ăn"
            />
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
            <input
              value={newDish.price}
              onChange={(event) => setNewDish({ ...newDish, price: event.target.value })}
              className="soft-input"
              placeholder="Giá niêm yết (VNĐ)"
            />
            <input
              value={newDish.image}
              onChange={(event) => setNewDish({ ...newDish, image: event.target.value })}
              className="soft-input"
              placeholder="Link ảnh món (URL)"
            />
            <button onClick={addDishFromAdmin} className="cta-button justify-center mt-2">
              ➕ Lưu & Mở bán món
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-xl font-black text-stone-900">Danh sách thực đơn hiện tại ({dishes.length} món)</h3>
          <span className="text-xs text-stone-500">Bấm nút để Bật/Tắt còn món</span>
        </div>

        {dishes.map((dish) => (
          <div key={dish.id} className="menu-admin-row">
            <img className="h-16 w-16 rounded-2xl object-cover border border-stone-200" src={dish.image} alt={dish.name} />
            <div className="flex-1">
              <p className="font-black text-stone-900">{dish.name}</p>
              <p className="text-xs text-stone-500 mt-0.5">
                Danh mục: <strong>{dish.category}</strong> · Giá: <strong>{formatCurrency(dish.promoPrice ?? dish.price)}</strong> · Đã bán: <strong>{dish.sold} suất</strong>
              </p>
            </div>
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
        ))}
      </div>
    </div>
  )
}

// ----------------------------------------------------
// 3. REPORTS PANEL (Fixed Crash)
// ----------------------------------------------------
function ReportsPanel({
  revenue,
  orderCount,
  cancelled,
  bestSeller,
  dishes,
}: {
  revenue: number
  orderCount: number
  cancelled: number
  bestSeller: string
  dishes: Dish[]
}) {
  const safeBestSeller = typeof bestSeller === "string" ? bestSeller : (bestSeller as any)?.name || "Phở bò đặc biệt"

  return (
    <div className="mt-6 grid gap-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ReportMetric label="Doanh thu hoàn tất" value={formatCurrency(revenue)} />
        <ReportMetric label="Tổng đơn phát sinh" value={String(orderCount)} />
        <ReportMetric label="Đơn đã hủy" value={String(cancelled)} />
        <ReportMetric label="Món bán chạy nhất" value={safeBestSeller} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-stone-900">Biểu đồ doanh thu 7 ngày gần nhất</h3>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              📈 Tăng trưởng +18%
            </span>
          </div>
          <div className="mt-6 flex h-64 items-end gap-3 px-2">
            {[820000, 540000, 730000, 960000, revenue || 850000, 680000, 1120000].map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-stone-500">{formatCurrency(value).replace("₫", "")}</span>
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#b42318] via-[#ea580c] to-amber-400 transition-all hover:brightness-110"
                  style={{ height: `${Math.max(22, (value / 1120000) * 100)}%` }}
                />
                <span className="text-xs font-black text-stone-600">Thứ {index + 2 <= 7 ? index + 2 : "CN"}</span>
              </div>
            ))}
          </div>
        </div>

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
