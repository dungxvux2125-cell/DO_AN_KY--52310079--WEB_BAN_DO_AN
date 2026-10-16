import { useState } from "react"
import { CheckoutSteps } from "../components/CacBuocDatHang"
import { OrderSideCard } from "../components/TienIchDonHang"
import { SectionHeading } from "../components/TieuDePhan"
import type { Dish, Order, OrderStatus, Page, Review, User } from "../types"
import { formatCurrency } from "../utils"

type DeliveryForm = {
  name: string
  phone: string
  email: string
  address: string
  note: string
}

const statusSteps: Array<{ status: OrderStatus; label: string; icon: string; desc: string }> = [
  { status: "Chờ duyệt", label: "Chờ duyệt", icon: "🕒", desc: "Quán đã tiếp nhận đơn" },
  { status: "Đang chuẩn bị", label: "Đang chuẩn bị", icon: "🍳", desc: "Bếp đang nấu nóng hổi" },
  { status: "Đang giao", label: "Đang giao hàng", icon: "🛵", desc: "Shipper đang trên đường giao" },
  { status: "Hoàn tất", label: "Hoàn tất", icon: "🎉", desc: "Giao thành công • Mời thưởng thức" },
]

export function DeliveryPage({
  user,
  form,
  setForm,
  subtotal,
  discount,
  shippingFee,
  total,
  hasCart,
  go,
  orders = [],
  dishes = [],
  reviews = [],
  onAddReview,
  onAdvanceOrder,
}: {
  user?: User | null
  form: DeliveryForm
  setForm: (value: DeliveryForm) => void
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  hasCart: boolean
  go: (page: Page) => void
  orders?: Order[]
  dishes?: Dish[]
  reviews?: Review[]
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
    image?: string
  }) => void
  onAdvanceOrder?: (id: string) => void
}) {
  const [activeTab, setActiveTab] = useState<"tracking" | "checkout">("tracking")
  
  // Review Modal State
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedDishForReview, setSelectedDishForReview] = useState<{ id: number; name: string } | null>(null)
  const [ratingInput, setRatingInput] = useState(5)
  const [commentInput, setCommentInput] = useState("")
  const [reviewImage, setReviewImage] = useState("")
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("")

  // Lọc các đơn hàng của khách hàng hiện tại
  const customerOrders = user
    ? orders.filter(
        (o) =>
          o.email?.toLowerCase() === user.email.toLowerCase() ||
          o.customerName?.toLowerCase() === user.name.toLowerCase(),
      )
    : orders

  function openReviewModal(dishId: number, dishName: string) {
    setSelectedDishForReview({ id: dishId, name: dishName })
    setRatingInput(5)
    setCommentInput("")
    setReviewImage("")
    setReviewSuccessMsg("")
    setReviewModalOpen(true)
  }

  function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedDishForReview || !onAddReview) return
    if (!commentInput.trim()) {
      alert("Vui lòng nhập cảm nhận/đánh giá của bạn về món ăn!")
      return
    }

    onAddReview({
      dishId: selectedDishForReview.id,
      dishName: selectedDishForReview.name,
      customerName: user ? user.name : form.name || "Khách hàng thân thiết",
      rating: ratingInput,
      comment: commentInput.trim(),
      image: reviewImage || undefined,
    })

    setReviewSuccessMsg("Cảm ơn bạn! Đánh giá của bạn đã được ghi nhận vào hệ thống.")
    setTimeout(() => {
      setReviewModalOpen(false)
      setReviewSuccessMsg("")
    }, 1500)
  }

  return (
    <section className="page-shell page-shell-wide">
      <CheckoutSteps active="delivery" />

      {/* Header Tabs */}
      <div className="my-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white border border-stone-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fbe8e2] text-[#842018] text-2xl font-black">
            📦
          </span>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              Theo dõi đơn hàng & Nhận món
            </h1>
            <p className="text-xs text-stone-500 mt-0.5">
              Kiểm tra tiến độ thực tế từng bước và viết đánh giá món ăn sau khi nhận.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="inline-flex rounded-2xl bg-stone-100 p-1 border border-stone-200">
          <button
            type="button"
            onClick={() => setActiveTab("tracking")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === "tracking"
                ? "bg-white text-stone-950 shadow-xs font-black"
                : "text-stone-600 hover:text-black"
            }`}
          >
            <span>🛵</span>
            <span>Tiến độ đơn ({customerOrders.length})</span>
          </button>
          {hasCart && (
            <button
              type="button"
              onClick={() => setActiveTab("checkout")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeTab === "checkout"
                  ? "bg-[#842018] text-white shadow-xs font-black"
                  : "text-stone-600 hover:text-black"
              }`}
            >
              <span>📝</span>
              <span>Thông tin nhận hàng mới</span>
            </button>
          )}
        </div>
      </div>

      {/* Yêu cầu đăng nhập nếu chưa đăng nhập */}
      {!user && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-amber-400/90 bg-amber-50 p-4 text-amber-950 sm:flex-row sm:items-center sm:justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔐</span>
            <div>
              <h4 className="font-black text-sm">Đăng nhập để theo dõi chính xác đơn của bạn</h4>
              <p className="text-xs text-amber-900/80">
                Đăng nhập giúp bạn lưu lịch sử đơn hàng, theo dõi trực tiếp shipper và tích điểm đánh giá.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => go("login")}
              className="rounded-xl bg-[#b42318] px-4 py-2 text-xs font-black text-white shadow-md hover:bg-[#961c12] transition-colors cursor-pointer"
            >
              Đăng nhập ngay
            </button>
            <button
              type="button"
              onClick={() => go("register")}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              Đăng ký tài khoản
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: THEO DÕI TIẾN ĐỘ ĐƠN HÀNG (LIVE TRACKING & ORDER HISTORY) */}
      {activeTab === "tracking" && (
        <div className="space-y-6">
          {customerOrders.length > 0 ? (
            customerOrders.map((order) => {
              const currentStepIndex = statusSteps.findIndex((s) => s.status === order.status)
              const isFinished = order.status === "Hoàn tất"

              return (
                <div
                  key={order.id}
                  className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-7 shadow-xs space-y-6"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl bg-stone-900 px-3 py-1 font-mono text-xs font-black text-white">
                          #{order.id}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          📅 {order.createdAt}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-stone-800">
                        Người nhận: <span className="font-black text-stone-950">{order.customerName}</span> ({order.phoneMasked})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-4 py-1.5 text-xs font-black flex items-center gap-1.5 ${
                          order.status === "Hoàn tất"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : order.status === "Đang giao"
                            ? "bg-sky-100 text-sky-800 border border-sky-300 animate-pulse"
                            : order.status === "Đang chuẩn bị"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-stone-100 text-stone-800 border border-stone-300"
                        }`}
                      >
                        <span>
                          {order.status === "Hoàn tất"
                            ? "🎉"
                            : order.status === "Đang giao"
                            ? "🛵"
                            : order.status === "Đang chuẩn bị"
                            ? "🍳"
                            : "🕒"}
                        </span>
                        <span>{order.status}</span>
                      </span>
                      <span className="text-base font-black text-[#842018]">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>

                  {/* 4-STEP PROGRESS BAR (Uber Eats / ShopeeFood Standard) */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 mb-4">
                      Tiến độ đơn hàng trực tiếp
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {statusSteps.map((step, idx) => {
                        const isDone = idx <= currentStepIndex
                        const isCurrent = idx === currentStepIndex

                        return (
                          <div
                            key={step.status}
                            className={`rounded-2xl p-3.5 border transition-all ${
                              isCurrent
                                ? "border-[#842018] bg-[#fbe8e2]/60 shadow-xs ring-2 ring-[#842018]/20"
                                : isDone
                                ? "border-emerald-200 bg-emerald-50/70"
                                : "border-stone-100 bg-stone-50 opacity-50"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl">{step.icon}</span>
                              <span
                                className={`text-[10px] font-black rounded-full px-2 py-0.5 ${
                                  isDone
                                    ? "bg-emerald-600 text-white"
                                    : "bg-stone-200 text-stone-600"
                                }`}
                              >
                                {isDone ? "✓ Xong" : `Bước ${idx + 1}`}
                              </span>
                            </div>
                            <p className="font-black text-xs text-stone-900 leading-tight">
                              {step.label}
                            </p>
                            <p className="text-[11px] text-stone-500 mt-0.5">
                              {step.desc}
                            </p>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Chi tiết các món trong đơn & Nút đánh giá */}
                  <div className="rounded-2xl bg-stone-50 p-4 border border-stone-200">
                    <h4 className="text-xs font-black uppercase tracking-wider text-stone-500 mb-3">
                      Món ăn trong đơn ({order.items.reduce((s, i) => s + i.quantity, 0)} phần)
                    </h4>
                    <div className="divide-y divide-stone-200">
                      {order.items.map((item, i) => {
                        const dishInfo = dishes.find((d) => d.id === item.dishId)
                        const dishName = dishInfo ? dishInfo.name : `Món #${item.dishId}`
                        const dishImage = dishInfo?.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300"

                        return (
                          <div
                            key={i}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={dishImage}
                                alt={dishName}
                                className="h-12 w-12 rounded-xl object-cover border border-stone-200 shrink-0"
                              />
                              <div>
                                <p className="font-bold text-sm text-stone-900">
                                  {dishName}{" "}
                                  <span className="text-xs font-black text-[#842018]">
                                    x{item.quantity}
                                  </span>
                                </p>
                                {item.toppings && item.toppings.length > 0 && (
                                  <p className="text-[11px] text-stone-500">
                                    Topping: {item.toppings.join(", ")}
                                  </p>
                                )}
                                {item.note && (
                                  <p className="text-[11px] text-amber-700 font-medium">
                                    📝 {item.note}
                                  </p>
                                )}
                              </div>
                            </div>

                            {/* Nút Đánh giá món ăn - CHỈ HIỆN KHI ĐƠN ĐÃ GIAO THÀNH CÔNG (Hoàn tất) */}
                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {isFinished ? (
                                <button
                                  type="button"
                                  onClick={() => openReviewModal(item.dishId, dishName)}
                                  className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-amber-500 px-3.5 py-1.5 text-xs font-black text-white hover:bg-amber-600 transition-all cursor-pointer shadow-sm hover:scale-105"
                                >
                                  <span>⭐</span>
                                  <span>Đánh giá món ăn</span>
                                </button>
                              ) : (
                                <span className="rounded-xl bg-stone-100 px-3 py-1 text-[11px] font-bold text-stone-400 border border-stone-200">
                                  ⏳ Đánh giá sau khi nhận món
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Banner & Nút xác nhận nhận hàng khi Shipper đang giao */}
                  {order.status === "Đang giao" && onAdvanceOrder && (
                    <div className="rounded-2xl bg-sky-50 border border-sky-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl animate-bounce">🛵</span>
                        <div>
                          <p className="text-xs font-black text-sky-950">Shipper đang trên đường giao hàng đến bạn!</p>
                          <p className="text-[11px] text-sky-800">Khi nhận được đồ ăn thơm ngon, hãy bấm xác nhận để đánh giá chất lượng món nhé.</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAdvanceOrder(order.id)}
                        className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-black text-white hover:bg-emerald-700 shadow-sm transition-all cursor-pointer whitespace-nowrap self-end sm:self-center"
                      >
                        ✅ Tôi đã nhận được món
                      </button>
                    </div>
                  )}

                  {/* Banner chúc mừng khi đơn hàng đã hoàn tất */}
                  {isFinished && (
                    <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between gap-3 text-xs text-emerald-900 font-bold">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🎉</span>
                        <span>Đơn hàng đã hoàn tất! Hãy để lại đánh giá để FoodVD nâng cao chất lượng phục vụ nhé.</span>
                      </div>
                    </div>
                  )}

                  {/* Delivery Location Note */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 pt-1">
                    <span>📍 Địa chỉ nhận: <strong>{order.addressMasked}</strong></span>
                    <span>💳 Phương thức: <strong>{order.payment}</strong></span>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-white p-12 text-center">
              <span className="text-6xl">🛵</span>
              <h3 className="mt-4 text-lg font-black text-stone-900">
                Bạn chưa có đơn hàng nào đang tiến hành
              </h3>
              <p className="mt-1 text-xs text-stone-500 max-w-md mx-auto">
                Hãy ghé qua thực đơn món ăn thơm ngon của FoodVD Kitchen và đặt ngay những món bạn yêu thích nhé!
              </p>
              <button
                type="button"
                onClick={() => go("order")}
                className="mt-6 rounded-full bg-stone-900 px-6 py-3 text-xs font-black text-white hover:bg-stone-700 transition-all cursor-pointer shadow-md"
              >
                Khám phá thực đơn ngay →
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NHẬP THÔNG TIN NHẬN HÀNG KHI CHECKOUT */}
      {activeTab === "checkout" && (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="soft-panel bg-white rounded-3xl border border-stone-200 p-6 shadow-xs">
            <SectionHeading
              eyebrow="Thông tin giao nhận"
              title="Địa chỉ giao hàng tận nơi"
              description="Điền thông tin nhận hàng chính xác để tài xế giao món đúng hẹn."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(["name", "phone", "email"] as const).map((key) => (
                <label key={key} className="field-label font-bold text-xs text-stone-700">
                  {{
                    name: "Họ và tên người nhận",
                    phone: "Số điện thoại liên hệ",
                    email: "Email nhận hóa đơn & cập nhật",
                  }[key]}
                  <input
                    value={form[key]}
                    onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                    className="soft-input mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm focus:border-stone-900 focus:bg-white focus:outline-hidden"
                    placeholder={`Nhập ${key}...`}
                  />
                </label>
              ))}
              <label className="field-label font-bold text-xs text-stone-700 md:col-span-2">
                Địa chỉ chi tiết (Hà Nội)
                <input
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  className="soft-input mt-1 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm focus:border-stone-900 focus:bg-white focus:outline-hidden"
                  placeholder="Ví dụ: Số 136 Xuân Thủy, Cầu Giấy, Hà Nội"
                />
              </label>
              <label className="field-label font-bold text-xs text-stone-700 md:col-span-2">
                Ghi chú giao hàng cho quán / tài xế
                <textarea
                  value={form.note}
                  onChange={(event) => setForm({ ...form, note: event.target.value })}
                  className="soft-input mt-1 min-h-24 w-full resize-none rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm focus:border-stone-900 focus:bg-white focus:outline-hidden"
                  placeholder="Ví dụ: Giao giờ trưa, không để ớt cay, gọi trước khi giao..."
                />
              </label>
            </div>
          </div>

          <OrderSideCard
            title="Tóm tắt đơn"
            total={total}
            subtotal={subtotal}
            discount={discount}
            shippingFee={shippingFee}
            actionLabel={!user ? "Đăng nhập để tiếp tục" : "Sang trang thanh toán"}
            onAction={!user ? () => go("login") : () => go("payment")}
            disabled={!hasCart || !form.name || !form.phone || !form.address || !form.email}
          />
        </div>
      )}

      {/* ===== MODAL ĐÁNH GIÁ MÓN ĂN (RATING & REVIEW) ===== */}
      {reviewModalOpen && selectedDishForReview && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(3px)",
            padding: "1rem",
          }}
          onClick={() => setReviewModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-600">
                  ⭐ Đánh giá trải nghiệm món ăn
                </span>
                <h3 className="text-lg font-black text-stone-900 leading-tight mt-0.5">
                  {selectedDishForReview.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="h-8 w-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 font-bold flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {reviewSuccessMsg ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-2">
                <span className="text-4xl">🎉</span>
                <h4 className="font-black text-emerald-900 text-base">{reviewSuccessMsg}</h4>
                <p className="text-xs text-emerald-700">
                  Đánh giá của bạn sẽ giúp nhà hàng cải thiện chất lượng phục vụ ngày một tốt hơn!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Chọn số sao */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-2">
                    Mức độ hài lòng của bạn:
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl text-xl transition-all cursor-pointer ${
                          star <= ratingInput
                            ? "bg-amber-100 text-amber-500 scale-105 border border-amber-300"
                            : "bg-stone-100 text-stone-300 border border-stone-200"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-black text-stone-800">
                      {ratingInput === 5
                        ? "Tuyệt vời (5/5) ⭐"
                        : ratingInput === 4
                        ? "Hài lòng (4/5) 👍"
                        : ratingInput === 3
                        ? "Bình thường (3/5) 😐"
                        : ratingInput === 2
                        ? "Chưa ngon (2/5) 👎"
                        : "Tệ (1/5) 💔"}
                    </span>
                  </div>
                </div>

                {/* Nhập bình luận */}
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1.5">
                    Nhận xét chi tiết về hương vị & chất lượng đóng gói:
                  </label>
                  <textarea
                    rows={4}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Món ăn nóng hổi, vị đậm đà vừa miệng, đóng gói sạch sẽ cẩn thận..."
                    className="w-full rounded-2xl border border-stone-200 bg-stone-50 p-3.5 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:bg-white focus:outline-hidden resize-none"
                    required
                  />
                </div>

                {/* ĐÍNH KÈM ẢNH THỰC TẾ (Use Case UC05: <<extend>> Đính kèm ảnh thực tế) */}
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <span>📸</span>
                      <span>Đính kèm ảnh thực tế món ăn (Tùy chọn)</span>
                    </span>
                    {reviewImage && (
                      <button
                        type="button"
                        onClick={() => setReviewImage("")}
                        className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                      >
                        ✕ Gỡ ảnh
                      </button>
                    )}
                  </div>

                  {reviewImage ? (
                    <div className="relative inline-block rounded-xl overflow-hidden border border-stone-300 shadow-sm">
                      <img
                        src={reviewImage}
                        alt="Ảnh thực tế món ăn"
                        className="h-28 w-28 sm:h-36 sm:w-36 object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 py-0.5 text-center text-[10px] font-bold text-white">
                        ✓ Đã đính kèm ảnh
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer shadow-2xs">
                        <span className="text-sm">📁</span>
                        <span>Chọn ảnh từ máy / Chụp ảnh</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const reader = new FileReader()
                              reader.onload = () => {
                                if (typeof reader.result === "string") {
                                  setReviewImage(reader.result)
                                }
                              }
                              reader.readAsDataURL(file)
                            }
                          }}
                        />
                      </label>
                      {selectedDishForReview && (
                        <button
                          type="button"
                          onClick={() => {
                            const dish = dishes.find((d) => d.id === selectedDishForReview.id)
                            if (dish) setReviewImage(dish.image)
                          }}
                          className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer"
                        >
                          ✨ Dùng ảnh thực tế từ quán
                        </button>
                      )}
                    </div>
                  )}
                  <p className="text-[11px] text-stone-400">
                    Hình ảnh thực tế giúp các thực khách khác có cái nhìn chân thực nhất về món ăn.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="rounded-xl border border-stone-200 px-4 py-2.5 text-xs font-bold text-stone-600 hover:bg-stone-100 cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-[#842018] px-6 py-2.5 text-xs font-black text-white hover:bg-[#6b1913] shadow-md transition-all cursor-pointer"
                  >
                    Gửi đánh giá ngay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
