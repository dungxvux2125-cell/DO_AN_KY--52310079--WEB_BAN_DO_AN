import { useState } from "react"
import { ADMIN_ACCOUNT, CUSTOMER_ACCOUNT, STAFF_ACCOUNT } from "../data"
import { SectionHeading } from "../components/TieuDePhan"
import { formatCurrency } from "../utils"
import type { CartItem, Dish, Order, OrderStatus, Page, Review, User, Voucher } from "../types"

type LoginForm = { email: string; password: string }
type RegisterForm = { name: string; email: string; password: string; confirmPassword: string }

export function AuthPage({
  user,
  setUser,
  orders = [],
  dishes = [],
  reviews = [],
  onAddReview,
  onReorder,
  onCancelOrder,
  onUpdateProfile,
  vouchers = [],
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
  reviews?: Review[]
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
    image?: string
  }) => void
  onReorder?: (items: CartItem[]) => void
  onCancelOrder?: (orderId: string, reason?: string) => void
  onUpdateProfile?: (profile: { name: string; phone?: string; address?: string }) => void
  vouchers?: Voucher[]
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

  // Review Modal States in Account Page
  const [reviewModalOpen, setReviewModalOpen] = useState(false)
  const [selectedDishForReview, setSelectedDishForReview] = useState<{ id: number; name: string } | null>(null)
  const [ratingInput, setRatingInput] = useState(5)
  const [commentInput, setCommentInput] = useState("")
  const [reviewImage, setReviewImage] = useState("")
  const [reviewSuccessMsg, setReviewSuccessMsg] = useState("")

  const openReviewModal = (dishId: number, dishName: string) => {
    setSelectedDishForReview({ id: dishId, name: dishName })
    setRatingInput(5)
    setCommentInput("")
    setReviewImage("")
    setReviewSuccessMsg("")
    setReviewModalOpen(true)
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDishForReview || !onAddReview) return
    if (!commentInput.trim()) {
      alert("Vui lòng nhập cảm nhận/đánh giá của bạn về món ăn!")
      return
    }

    onAddReview({
      dishId: selectedDishForReview.id,
      dishName: selectedDishForReview.name,
      customerName: user ? user.name : "Khách hàng thân thiết",
      rating: ratingInput,
      comment: commentInput.trim(),
      image: reviewImage || undefined,
    })

    setReviewSuccessMsg("Cảm ơn bạn! Đánh giá món ăn và số sao đã được ghi nhận thành công 🎉")
    setTimeout(() => {
      setReviewModalOpen(false)
      setReviewSuccessMsg("")
    }, 1500)
  }

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
    // Smart Filter: Filter orders matching logged-in user, or fallback to all orders so customer never sees empty screen
    const userMatchedOrders = orders.filter(
      (o) =>
        (o.email && o.email.toLowerCase() === user.email.toLowerCase()) ||
        (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase())
    )
    const myOrders = showAllOrders
      ? orders
      : userMatchedOrders.length > 0
      ? userMatchedOrders
      : orders // Fallback to all orders for demo convenience

    const activeOrders = myOrders.filter((o) => o.status !== "Hoàn tất" && o.status !== "Đã hủy")
    const completedOrders = myOrders.filter((o) => o.status === "Hoàn tất")

    const displayedOrders =
      orderFilter === "active"
        ? activeOrders
        : orderFilter === "completed"
        ? completedOrders
        : myOrders

    return (
      <UserLoggedInView
        user={user}
        setUser={setUser}
        myOrders={myOrders}
        activeOrders={activeOrders}
        completedOrders={completedOrders}
        displayedOrders={displayedOrders}
        orderFilter={orderFilter}
        setOrderFilter={setOrderFilter}
        showAllOrders={showAllOrders}
        setShowAllOrders={setShowAllOrders}
        orders={orders}
        dishes={dishes}
        reviews={reviews}
        onAddReview={onAddReview}
        onReorder={onReorder}
        onCancelOrder={onCancelOrder}
        onUpdateProfile={onUpdateProfile}
        vouchers={vouchers}
        openReviewModal={openReviewModal}
        reviewModalOpen={reviewModalOpen}
        setReviewModalOpen={setReviewModalOpen}
        selectedDishForReview={selectedDishForReview}
        ratingInput={ratingInput}
        setRatingInput={setRatingInput}
        commentInput={commentInput}
        setCommentInput={setCommentInput}
        reviewImage={reviewImage}
        setReviewImage={setReviewImage}
        reviewSuccessMsg={reviewSuccessMsg}
        handleSubmitReview={handleSubmitReview}
        go={go}
      />
    )
  }
// ----------------------------------------------------
// UserLoggedInView: Customer Dashboard & Profile Manager
// ----------------------------------------------------
function UserLoggedInView({
  user,
  setUser,
  myOrders,
  activeOrders,
  completedOrders,
  displayedOrders,
  orderFilter,
  setOrderFilter,
  showAllOrders,
  setShowAllOrders,
  orders,
  dishes,
  reviews,
  onAddReview,
  onReorder,
  onCancelOrder,
  onUpdateProfile,
  vouchers = [],
  openReviewModal,
  reviewModalOpen,
  setReviewModalOpen,
  selectedDishForReview,
  ratingInput,
  setRatingInput,
  commentInput,
  setCommentInput,
  reviewImage,
  setReviewImage,
  reviewSuccessMsg,
  handleSubmitReview,
  go,
}: {
  user: User
  setUser?: (u: User | null) => void
  myOrders: Order[]
  activeOrders: Order[]
  completedOrders: Order[]
  displayedOrders: Order[]
  orderFilter: "all" | "active" | "completed"
  setOrderFilter: (f: "all" | "active" | "completed") => void
  showAllOrders: boolean
  setShowAllOrders: (b: boolean) => void
  orders: Order[]
  dishes: Dish[]
  reviews: Review[]
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
    image?: string
  }) => void
  onReorder?: (items: CartItem[]) => void
  onCancelOrder?: (orderId: string, reason?: string) => void
  onUpdateProfile?: (profile: { name: string; phone?: string; address?: string }) => void
  vouchers?: Voucher[]
  openReviewModal: (dishId: number, dishName: string) => void
  reviewModalOpen: boolean
  setReviewModalOpen: (b: boolean) => void
  selectedDishForReview: { id: number; name: string } | null
  ratingInput: number
  setRatingInput: (r: number) => void
  commentInput: string
  setCommentInput: (c: string) => void
  reviewImage: string
  setReviewImage: (img: string) => void
  reviewSuccessMsg: string
  handleSubmitReview: (e: React.FormEvent) => void
  go: (p: Page) => void
}) {
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState(user.name)
  const [phoneInput, setPhoneInput] = useState(user.phone || "0987654321")
  const [addressInput, setAddressInput] = useState(user.address || "136 Xuân Thủy, Cầu Giấy, Hà Nội")
  const [saveMsg, setSaveMsg] = useState("")

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nameInput.trim()) {
      alert("Vui lòng nhập họ tên!")
      return
    }
    if (onUpdateProfile) {
      onUpdateProfile({
        name: nameInput.trim(),
        phone: phoneInput.trim(),
        address: addressInput.trim(),
      })
    }
    setSaveMsg("✓ Cập nhật thông tin giao hàng thành công!")
    setTimeout(() => {
      setSaveMsg("")
      setProfileModalOpen(false)
    }, 1200)
  }

  return (
    <section className="page-shell page-shell-wide">
      {/* User Info Header Card */}
      <div className="relative overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-r from-[#2a1b15] via-[#3a221b] to-[#1c120e] p-6 md:p-8 text-white shadow-xl mb-6">
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
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-300">
                <span>📞 {user.phone || "0987654321"}</span>
                <span>📍 {user.address || "136 Xuân Thủy, Cầu Giấy, Hà Nội"}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                setNameInput(user.name)
                setPhoneInput(user.phone || "0987654321")
                setAddressInput(user.address || "136 Xuân Thủy, Cầu Giấy, Hà Nội")
                setProfileModalOpen(true)
              }}
              className="rounded-xl border border-white/30 bg-white/10 px-3.5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              ✏️ Sửa thông tin nhận hàng
            </button>
            <button
              type="button"
              onClick={() => go("order")}
              className="rounded-xl bg-[#b42318] px-4 py-2.5 text-xs font-black text-white shadow-md hover:bg-[#961c12] transition-colors cursor-pointer"
            >
              🍽️ Đặt món ngay
            </button>
            {(user.role === "admin" || user.role === "staff") && (
              <button
                type="button"
                onClick={() => go("management")}
                className="rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                ⚙️ Trang quản lý
              </button>
            )}
            {setUser && (
              <button
                type="button"
                onClick={() => setUser(null)}
                className="rounded-xl border border-rose-400/30 bg-rose-950/40 px-3.5 py-2.5 text-xs font-bold text-rose-300 hover:bg-rose-900/50 transition-colors cursor-pointer"
              >
                🚪 Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Kho Voucher Ưu Đãi Của Tôi */}
      {vouchers && vouchers.filter((v) => v.active).length > 0 && (
        <div className="mb-8 rounded-3xl border border-stone-200 bg-white p-5 md:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-black text-stone-900 flex items-center gap-2">
                <span>🎟️</span> Kho Mã Giảm Giá Của Bạn ({vouchers.filter((v) => v.active).length} mã)
              </h3>
              <p className="text-xs text-stone-500">Mã khuyến mãi áp dụng khi đặt món tại FoodVD</p>
            </div>
            <button
              type="button"
              onClick={() => go("order")}
              className="text-xs font-black text-[#b42318] hover:underline self-start sm:self-center"
            >
              Chọn món dùng mã ngay ➔
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vouchers
              .filter((v) => v.active)
              .map((v) => (
                <div
                  key={v.id}
                  className="rounded-2xl border border-dashed border-red-300 bg-red-50/40 p-3.5 flex items-center justify-between"
                >
                  <div>
                    <span className="font-mono font-black text-xs text-[#b42318] bg-white border border-red-200 px-2 py-0.5 rounded-lg shadow-2xs">
                      {v.code}
                    </span>
                    <p className="text-xs font-bold text-stone-900 mt-1">{v.label}</p>
                    <p className="text-[11px] text-stone-500">Đơn từ: {formatCurrency(v.min)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(v.code)
                      alert(`Đã sao chép mã ${v.code}! Hãy dán vào ô Mã giảm giá tại bước Thanh toán nhé.`)
                    }}
                    className="rounded-xl bg-[#b42318] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#961c12] transition-colors cursor-pointer"
                  >
                    Sao chép
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

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
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 ${
                orderFilter === "completed"
                  ? "bg-[#b42318] text-white"
                  : "text-stone-700 hover:text-stone-900 bg-amber-50 border border-amber-200"
              }`}
            >
              <span>⭐ Đơn hoàn tất ({completedOrders.length})</span>
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
            <button type="button" onClick={() => go("order")} className="cta-button">
              Xem thực đơn & Đặt món ngay
            </button>
            {orders.length > 0 && !showAllOrders && (
              <button type="button" onClick={() => setShowAllOrders(true)} className="ghost-button">
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
                onCancelOrder={onCancelOrder}
                reviews={reviews}
                onOpenReview={openReviewModal}
                user={user}
              />
            )
          })}
        </div>
      )}

      {/* MODAL CHỈNH SỬA THÔNG TIN NHẬN HÀNG */}
      {profileModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => setProfileModalOpen(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}
          />
          <div className="relative z-10 w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-stone-100">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="text-base font-black text-stone-900">✏️ Cập nhật thông tin giao hàng</h3>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="rounded-full p-1.5 text-stone-400 hover:bg-stone-100 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {saveMsg ? (
              <div className="py-6 text-center text-emerald-800 font-bold text-sm">
                <span className="text-3xl block mb-2">🎉</span>
                {saveMsg}
              </div>
            ) : (
              <form onSubmit={handleSaveProfile} className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Họ và tên người nhận</label>
                  <input
                    type="text"
                    required
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="soft-input w-full"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Số điện thoại nhận hàng</label>
                  <input
                    type="text"
                    required
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="soft-input w-full"
                    placeholder="VD: 0987654321"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Địa chỉ giao hàng mặc định</label>
                  <textarea
                    required
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    rows={2}
                    className="soft-input w-full text-xs"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 cta-button justify-center py-2.5 text-xs font-bold cursor-pointer"
                  >
                    ✓ Lưu thông tin
                  </button>
                  <button
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    className="rounded-xl border border-stone-300 px-4 py-2.5 text-xs font-bold text-stone-700 hover:bg-stone-100 cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* MODAL ĐÁNH GIÁ MÓN ĂN */}
      {reviewModalOpen && selectedDishForReview && (
        <div style={{ position: "fixed", inset: 0, zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div
            onClick={() => setReviewModalOpen(false)}
            style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(3px)" }}
          />
          <div className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-6 sm:p-7 shadow-2xl border border-stone-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-xl font-bold">
                  ⭐
                </span>
                <div>
                  <h3 className="text-base font-black text-stone-900">Đánh giá món ăn</h3>
                  <p className="text-xs font-bold text-[#b42318]">{selectedDishForReview.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(false)}
                className="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            {reviewSuccessMsg ? (
              <div className="py-8 text-center">
                <span className="text-5xl animate-bounce">🎉</span>
                <p className="mt-3 text-sm font-black text-emerald-800">{reviewSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Mức độ hài lòng của bạn:</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRatingInput(star)}
                        className="text-3xl transition-transform hover:scale-125 cursor-pointer"
                      >
                        {star <= ratingInput ? "⭐" : "☆"}
                      </button>
                    ))}
                    <span className="ml-2 text-xs font-bold text-amber-800">
                      ({ratingInput === 5 ? "Rất ngon / Tuyệt vời" : ratingInput === 4 ? "Ngon miệng" : ratingInput === 3 ? "Bình thường" : "Chưa hài lòng"})
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Cảm nhận & Đánh giá chi tiết:</label>
                  <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    rows={3}
                    placeholder="Món ăn vừa miệng, nước dùng đậm đà, đóng gói cẩn thận và giao nhanh..."
                    className="w-full rounded-2xl border border-stone-300 bg-stone-50 p-3 text-xs focus:bg-white focus:border-[#b42318] focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
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
                      <img src={reviewImage} alt="Ảnh thực tế món ăn" className="h-28 w-28 sm:h-36 sm:w-36 object-cover" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 py-0.5 text-center text-[10px] font-bold text-white">
                        ✓ Đã đính kèm ảnh
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <label className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-3.5 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer shadow-xs">
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
                </div>

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
                    className="rounded-xl bg-[#b42318] px-6 py-2.5 text-xs font-black text-white hover:bg-[#961c12] shadow-md transition-all cursor-pointer"
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
  onCancelOrder,
  reviews = [],
  onOpenReview,
  user,
}: {
  order: Order
  dishes: Dish[]
  onReorder?: (items: CartItem[]) => void
  onCancelOrder?: (orderId: string, reason?: string) => void
  reviews?: Review[]
  onOpenReview?: (dishId: number, dishName: string) => void
  user?: User | null
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

      {/* Banner thông báo khi đơn hoàn tất */}
      {order.status === "Hoàn tất" && (
        <div className="my-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🎉</span>
            <div>
              <p className="font-black text-emerald-950 text-sm">Đơn hàng đã được giao thành công!</p>
              <p className="text-emerald-800 text-xs mt-0.5">Mời bạn đánh giá chất lượng từng món ăn bên dưới để giúp FoodVD ngày càng hoàn thiện nhé.</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-600 px-3.5 py-1 text-white text-xs font-black shadow-xs self-start sm:self-center">
            ✓ Hoàn tất
          </span>
        </div>
      )}

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
            const dishName = dish ? dish.name : `Món #${item.dishId}`
            const userReview = reviews.find(
              (r) =>
                r.dishId === item.dishId &&
                ((user?.name && r.customerName.toLowerCase() === user.name.toLowerCase()) ||
                  r.customerName.toLowerCase() === order.customerName.toLowerCase())
            )

            return (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3 first:pt-1 last:pb-1">
                <div className="flex items-center gap-3">
                  {dish?.image && (
                    <img
                      src={dish.image}
                      alt={dishName}
                      className="h-14 w-14 rounded-2xl object-cover border border-stone-200 shadow-2xs"
                    />
                  )}
                  <div>
                    <p className="text-sm font-bold text-stone-900">
                      {dishName}{" "}
                      <span className="text-[#b42318] font-black">× {item.quantity}</span>
                    </p>
                    {item.toppings && item.toppings.length > 0 && (
                      <p className="text-xs text-stone-500 mt-0.5">
                        Topping: {item.toppings.join(", ")}
                      </p>
                    )}
                    <p className="text-xs font-black text-stone-800 mt-0.5">
                      {dish ? formatCurrency((dish.promoPrice || dish.price) * item.quantity) : ""}
                    </p>
                  </div>
                </div>

                {/* Phần Đánh Giá Món Ăn Trong Đơn Hoàn Tất */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {order.status === "Hoàn tất" && onOpenReview ? (
                    userReview ? (
                      <div className="flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-950 font-bold shadow-2xs">
                        <span className="text-amber-500">⭐ {userReview.rating}/5</span>
                        <span className="text-stone-700 font-medium max-w-[140px] truncate" title={userReview.comment}>
                          "{userReview.comment}"
                        </span>
                        {userReview.image && (
                          <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] px-1 font-black">
                            Ảnh 📷
                          </span>
                        )}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onOpenReview(item.dishId, dishName)}
                        className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-gradient-to-r from-amber-500 to-amber-600 px-3.5 py-2 text-xs font-black text-white hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer shadow-sm hover:scale-105"
                      >
                        <span>⭐</span>
                        <span>Đánh giá món này</span>
                      </button>
                    )
                  ) : order.status !== "Hoàn tất" && order.status !== "Đã hủy" ? (
                    <span className="rounded-xl bg-stone-100 px-2.5 py-1 text-[11px] font-bold text-stone-400 border border-stone-200">
                      ⏳ Đánh giá sau khi nhận món
                    </span>
                  ) : null}
                </div>
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

        <div className="flex items-center gap-2 self-end md:self-center">
          {order.status === "Chờ duyệt" && onCancelOrder && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?")) {
                  onCancelOrder(order.id, "Khách hàng hủy đơn")
                }
              }}
              className="rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              ✕ Hủy đơn
            </button>
          )}

          {onReorder && (
            <button
              type="button"
              onClick={() => onReorder(order.items)}
              className="rounded-xl border border-[#b42318]/30 bg-[#fff5f5] px-3.5 py-1.5 text-xs font-black text-[#b42318] hover:bg-[#b42318] hover:text-white transition-all cursor-pointer"
            >
              🛒 Đặt lại đơn này
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
