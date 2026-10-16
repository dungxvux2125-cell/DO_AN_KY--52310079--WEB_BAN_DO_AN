import { useState } from "react"
import { categoryOptions, getToppingPrice } from "../data"
import type { Category, Dish, Review, User } from "../types"
import { formatCurrency } from "../utils"
import { ChiTietMonAnModal } from "./ChiTietMonAnModal"

const categoryIcons: Record<Category, string> = {
  "Tất cả": "🍽️",
  "Ưu đãi": "🏷️",
  "Món Việt": "🥢",
  "Món chính": "🍛",
  "Hoa quả": "🍎",
  "Đồ uống": "🥤",
  "Ăn nhẹ": "🥟",
  "Tráng miệng": "🍮",
  "Healthy & Ăn kiêng": "🥗",
  "Gia vị & Đồ khô": "🥫",
  "Combo": "🍱",
}

export function MenuFilters({
  query,
  setQuery,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  isCollapsed = false,
  onToggleCollapse,
}: {
  query: string
  setQuery: (value: string) => void
  category: Category
  setCategory: (value: Category) => void
  maxPrice: number
  setMaxPrice: (value: number) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}) {
  if (isCollapsed) {
    return (
      <aside className="sticky top-24 bg-white border border-stone-200 rounded-3xl p-3 shadow-xs flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex flex-col items-center justify-center gap-1.5 w-12 py-3 rounded-2xl bg-stone-100 hover:bg-[#842018] text-stone-700 hover:text-white transition-all shadow-xs cursor-pointer group"
          title="Mở thanh danh mục món ăn"
        >
          <span className="text-base group-hover:scale-110 transition-transform">☰</span>
          <span className="text-[10px] font-black uppercase tracking-tighter [writing-mode:vertical-lr] rotate-180">
            Danh mục
          </span>
        </button>

        <div className="w-8 border-t border-stone-200" />

        {/* Selected Category Mini Icon Badge */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-base border border-rose-200 cursor-pointer"
          title={`Đang chọn: ${category}`}
          onClick={onToggleCollapse}
        >
          {categoryIcons[category]}
        </div>
      </aside>
    )
  }

  return (
    <aside className="bg-white border border-stone-200 rounded-3xl p-4 sm:p-5 shadow-xs sticky top-24 transition-all">
      {/* Header bar with Collapse/Hide Button */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-sm">
            ☰
          </span>
          <span className="text-xs font-black uppercase tracking-wider text-stone-800">
            Bộ lọc & Menu
          </span>
        </div>
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center gap-1 text-[11px] font-bold text-stone-500 hover:text-[#842018] bg-stone-100 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
            title="Thu gọn thanh danh mục"
          >
            <span>◀</span>
            <span className="hidden sm:inline">Thu gọn</span>
          </button>
        )}
      </div>

      {/* Search Input on Left Sidebar */}
      <div>
        <label className="flex items-center justify-between text-xs font-bold text-stone-900 mb-1.5">
          <span>Tìm kiếm món</span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[11px] font-bold text-[#842018] hover:underline"
            >
              Xóa tìm
            </button>
          )}
        </label>
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl bg-stone-50 pl-9 pr-8 py-2 text-xs font-medium text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#842018] border border-stone-200 transition-all"
            placeholder="Tên món, nguyên liệu..."
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs">
            🔍
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-stone-200 px-1.5 py-0.2 text-[10px] font-bold text-stone-600 hover:bg-stone-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Bếp Hoa Style Left Vertical Menu */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-stone-500">
            Danh mục sản phẩm
          </h3>
          <span className="text-[11px] font-bold text-[#842018] bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
            {categoryOptions.length} nhóm
          </span>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Danh mục thực đơn">
          {categoryOptions.map((option) => {
            const isActive = category === option
            const isHighlight = option === "Ưu đãi"
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-left transition-all ${
                  isActive
                    ? "bg-[#842018] text-white shadow-sm font-black translate-x-1"
                    : isHighlight
                    ? "bg-rose-50/70 text-[#842018] hover:bg-rose-100 font-extrabold"
                    : "text-stone-700 hover:bg-stone-100 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm shrink-0">{categoryIcons[option]}</span>
                  <span className="leading-snug">{option}</span>
                </div>
                <span
                  className={`text-[11px] transition-transform ${
                    isActive
                      ? "text-rose-200 font-black translate-x-0.5"
                      : "text-stone-400 group-hover:translate-x-0.5 group-hover:text-stone-700"
                  }`}
                >
                  ›
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Price Slider Filter */}
      <div className="mt-5 pt-4 border-t border-stone-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-stone-800">Khoảng giá tối đa</label>
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-black text-[#842018]">
            {formatCurrency(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="30000"
          max="240000"
          step="10000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-[#842018] cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-[10px] font-bold text-stone-400">
          <span>30.000 đ</span>
          <span>240.000 đ</span>
        </div>
      </div>
    </aside>
  )
}

export function DishGrid({
  dishes,
  addToCart,
  reviews = [],
  onAddReview,
  user,
}: {
  dishes: Dish[]
  addToCart: (
    dish: Dish,
    toppingOrToppings?: string | string[],
    note?: string,
    quantity?: number,
  ) => void
  reviews?: Review[]
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
  }) => void
  user?: User | null
}) {
  const [detailDish, setDetailDish] = useState<Dish | null>(null)
  const [reviewingDish, setReviewingDish] = useState<Dish | null>(null)
  const [selectedToppingsMap, setSelectedToppingsMap] = useState<Record<number, string[]>>({})
  const [addedNotice, setAddedNotice] = useState<Record<number, boolean>>({})

  const toggleTopping = (dishId: number, topping: string) => {
    setSelectedToppingsMap((prev) => {
      const current = prev[dishId] || []
      const exists = current.includes(topping)
      const next = exists ? current.filter((item) => item !== topping) : [...current, topping]
      return { ...prev, [dishId]: next }
    })
  }

  const handleAddToCart = (dish: Dish) => {
    const chosenToppings = selectedToppingsMap[dish.id] || []
    addToCart(dish, chosenToppings)
    setAddedNotice((prev) => ({ ...prev, [dish.id]: true }))
    setTimeout(() => {
      setAddedNotice((prev) => ({ ...prev, [dish.id]: false }))
    }, 1200)
  }

  return (
    <div className="menu-result">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-bold text-stone-700">
          Hiển thị <strong>{dishes.length}</strong> món ăn phù hợp
        </p>
        <span className="text-xs font-bold text-stone-500">
          🛵 Giao tận nơi 20 - 35 phút
        </span>
      </div>

      <div className="dish-grid">
        {dishes.map((dish) => {
          const hasDiscount = Boolean(dish.promoPrice && dish.promoPrice < dish.price)
          const discountPercent = hasDiscount
            ? Math.round(((dish.price - dish.promoPrice!) / dish.price) * 100)
            : 0

          const chosenToppings = selectedToppingsMap[dish.id] || []
          const toppingsExtra = chosenToppings.reduce((sum, top) => sum + getToppingPrice(top), 0)
          const basePrice = dish.promoPrice ?? dish.price
          const finalPrice = basePrice + toppingsExtra

          const dishReviews = reviews.filter((r) => r.dishId === dish.id)
          const dishAvgRating = dishReviews.length
            ? (dishReviews.reduce((sum, r) => sum + r.rating, 0) / dishReviews.length).toFixed(1)
            : "4.9"
          const reviewCount = dishReviews.length || 18

          return (
            <article
              key={dish.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Photo Area (Click to view details & ingredients) */}
              <div
                onClick={() => setDetailDish(dish)}
                className="relative aspect-[4/3] overflow-hidden bg-stone-100 cursor-pointer"
                title="Bấm để xem chi tiết thành phần & ghi chú món ăn"
              >
                <img
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                />

                <span className={`availability ${dish.available ? "is-on" : "is-off"}`}>
                  {dish.available ? "Còn món" : "Tạm hết"}
                </span>

                {hasDiscount && (
                  <span className="absolute right-3 top-3 rounded-full bg-black px-2.5 py-1 text-xs font-black text-white shadow-md">
                    -{discountPercent}%
                  </span>
                )}

                {/* Overlaid Badges (Rating, Ingredients/Notes & Sold) */}
                <div
                  className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-bold text-white drop-shadow"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Clickable Rating Badge */}
                  <button
                    type="button"
                    onClick={() => setReviewingDish(dish)}
                    className="flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-black text-amber-300 backdrop-blur-md hover:bg-black transition-all cursor-pointer"
                    title="Xem đánh giá từ khách hàng"
                  >
                    <span>⭐</span>
                    <span>{dishAvgRating}</span>
                    <span className="text-[10px] text-stone-300 font-normal">({reviewCount})</span>
                  </button>

                  {/* Nút Xem Thành phần & Ghi chú (Thay thế cho 3D) */}
                  <button
                    type="button"
                    onClick={() => setDetailDish(dish)}
                    className="rounded-full border border-white/40 bg-black/75 px-2.5 sm:px-3 py-1 text-[11px] font-black text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-black cursor-pointer shadow-xs"
                    title="Xem chi tiết thành phần & ghi chú món ăn"
                  >
                    📋 Thành phần
                  </button>

                  <span className="rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-stone-200 backdrop-blur-xs">
                    🔥 Đã bán {dish.sold}
                  </span>
                </div>
              </div>

              {/* Information Area (Uber Eats Clean Meta) */}
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      onClick={() => setDetailDish(dish)}
                      className="text-lg font-black text-stone-900 group-hover:text-[#b42318] transition-colors leading-snug cursor-pointer"
                      title="Bấm để xem chi tiết món ăn"
                    >
                      {dish.name}
                    </h3>
                    <p className="text-xs font-semibold text-stone-500 mt-1">
                      ₫ • {dish.category} • 20-30 phút
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-lg font-black text-stone-900">
                      {formatCurrency(finalPrice)}
                    </p>
                    {hasDiscount && (
                      <p className="text-xs font-bold text-stone-400 line-through">
                        {formatCurrency(dish.price + toppingsExtra)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-xs leading-relaxed text-stone-600 line-clamp-2">
                  {dish.description}
                </p>

                {/* Toppings Selection */}
                {dish.toppings.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[11px] font-bold text-stone-700">Tùy chọn topping:</p>
                      {chosenToppings.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setSelectedToppingsMap((prev) => ({ ...prev, [dish.id]: [] }))}
                          className="text-[10px] font-bold text-stone-500 hover:text-black"
                        >
                          Bỏ chọn ({chosenToppings.length})
                        </button>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {dish.toppings.map((topping) => {
                        const isSelected = chosenToppings.includes(topping)
                        const price = getToppingPrice(topping)
                        return (
                          <button
                            key={topping}
                            type="button"
                            onClick={() => toggleTopping(dish.id, topping)}
                            disabled={!dish.available}
                            className={`rounded-lg border px-2 py-0.5 text-[11px] font-bold transition-all ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : "border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100"
                            }`}
                          >
                            <span>{isSelected ? "✓" : "+"} {topping}</span>{" "}
                            <span className={isSelected ? "text-stone-300" : "text-stone-500"}>
                              ({price === 0 ? "0đ" : `+${formatCurrency(price)}`})
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-auto pt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDetailDish(dish)}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors flex items-center gap-1"
                    title="Xem chi tiết nguyên liệu, dinh dưỡng & ghi chú"
                  >
                    <span>📋</span>
                    <span>Chi tiết</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewingDish(dish)}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-2.5 sm:px-3 py-2 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors"
                    title="Xem đánh giá của khách"
                  >
                    ⭐
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(dish)}
                    disabled={!dish.available}
                    className={`flex-1 rounded-xl py-2 px-3 text-xs font-black transition-all shadow-xs flex items-center justify-center gap-1.5 ${
                      addedNotice[dish.id]
                        ? "bg-emerald-600 text-white"
                        : "bg-black text-white hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400"
                    }`}
                  >
                    <span>
                      {addedNotice[dish.id]
                        ? "✓ Đã thêm vào giỏ!"
                        : chosenToppings.length > 0
                        ? `Thêm (${formatCurrency(finalPrice)})`
                        : "Thêm vào giỏ"}
                    </span>
                    <span className="font-normal text-sm">+</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Customer Reviews & Ratings Modal */}
      {reviewingDish && (
        <DishReviewsModal
          dish={reviewingDish}
          reviews={reviews}
          onClose={() => setReviewingDish(null)}
          onAddReview={onAddReview}
          user={user}
        />
      )}

      {/* Chi Tiết Món Ăn & Thành Phần / Ghi Chú Modal (Thay thế cơ chế 3D) */}
      {detailDish && (
        <ChiTietMonAnModal
          dish={detailDish}
          onClose={() => setDetailDish(null)}
          onAddToCart={(dish, chosenToppings, note, qty) => {
            addToCart(dish, chosenToppings, note, qty)
            setAddedNotice((prev) => ({ ...prev, [dish.id]: true }))
            setTimeout(() => {
              setAddedNotice((prev) => ({ ...prev, [dish.id]: false }))
            }, 1200)
          }}
        />
      )}
    </div>
  )
}

// ----------------------------------------------------
// CUSTOMER DISH REVIEWS MODAL
// ----------------------------------------------------
function DishReviewsModal({
  dish,
  reviews,
  onClose,
  onAddReview,
  user,
}: {
  dish: Dish
  reviews: Review[]
  onClose: () => void
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
  }) => void
  user?: User | null
}) {
  const dishReviews = reviews.filter((r) => r.dishId === dish.id)
  const avg = dishReviews.length
    ? (dishReviews.reduce((sum, r) => sum + r.rating, 0) / dishReviews.length).toFixed(1)
    : "5.0"

  const [ratingInput, setRatingInput] = useState(5)
  const [nameInput, setNameInput] = useState(user?.name || "")
  const [commentInput, setCommentInput] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentInput.trim() || !nameInput.trim() || !onAddReview) return
    onAddReview({
      dishId: dish.id,
      dishName: dish.name,
      customerName: nameInput.trim(),
      rating: ratingInput,
      comment: commentInput.trim(),
    })
    setSubmitted(true)
    setCommentInput("")
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-stone-100 p-2 text-stone-500 hover:bg-stone-200 hover:text-black transition-colors"
        >
          ✕
        </button>

        {/* Dish Summary Header */}
        <div className="flex items-center gap-4 border-b border-stone-100 pb-5">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-20 w-20 rounded-2xl object-cover border border-stone-200"
          />
          <div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              {dish.category}
            </span>
            <h3 className="text-2xl font-black text-stone-900">{dish.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-amber-500 text-lg font-black">⭐ {avg}</span>
              <span className="text-xs text-stone-500">
                ({dishReviews.length} lượt đánh giá thực tế từ khách)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="mt-5">
          <h4 className="text-base font-black text-stone-900 mb-3">
            Nhận xét từ thực khách ({dishReviews.length})
          </h4>
          {dishReviews.length === 0 ? (
            <p className="py-6 text-center text-sm text-stone-500 bg-stone-50 rounded-2xl">
              Chưa có nhận xét nào cho món này. Hãy là người đầu tiên trải nghiệm và để lại đánh giá!
            </p>
          ) : (
            <div className="divide-y divide-stone-100 max-h-60 overflow-y-auto pr-2 space-y-3">
              {dishReviews.map((rev) => (
                <div key={rev.id} className="pt-3 first:pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-stone-100 flex items-center justify-center text-xs font-black text-stone-700">
                        {rev.customerName.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-stone-900">{rev.customerName}</span>
                    </div>
                    <span className="text-[11px] text-stone-400">{rev.createdAt}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-amber-500 text-xs font-black">
                    {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                  </div>
                  <p className="mt-1.5 text-xs text-stone-700 leading-relaxed font-medium">"{rev.comment}"</p>
                  {rev.reply && (
                    <div className="mt-2 rounded-xl bg-stone-50 p-2.5 text-[11px] text-stone-600 border border-stone-200/80">
                      <span className="font-bold text-stone-900">💬 Phản hồi từ FoodVD: </span>
                      {rev.reply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Write a Review Form */}
        <form onSubmit={handleSubmit} className="mt-6 rounded-2xl bg-stone-50 p-5 border border-stone-200">
          <h4 className="text-sm font-black text-stone-900 flex items-center gap-1.5 mb-3">
            <span>✍️</span> Viết đánh giá của bạn cho món này
          </h4>

          {submitted && (
            <div className="mb-3 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-800 border border-emerald-200">
              ✓ Cảm ơn bạn! Đánh giá của bạn đã được ghi nhận vào hệ thống.
            </div>
          )}

          <div className="mb-3">
            <label className="block text-xs font-bold text-stone-700 mb-1">Chấm điểm số sao:</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRatingInput(star)}
                  className="text-2xl transition-transform hover:scale-125 focus:outline-none"
                >
                  <span className={star <= ratingInput ? "text-amber-500" : "text-stone-300"}>
                    ★
                  </span>
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-stone-600">
                {ratingInput === 5
                  ? "Tuyệt vời (5 sao)"
                  : ratingInput === 4
                  ? "Rất ngon (4 sao)"
                  : ratingInput === 3
                  ? "Tạm ổn (3 sao)"
                  : `${ratingInput} sao`}
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-bold text-stone-700 mb-1">Tên của bạn:</label>
            <input
              required
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Nhập tên của bạn"
              className="w-full rounded-xl border border-stone-300 p-2 text-xs bg-white focus:outline-none focus:border-stone-900"
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-bold text-stone-700 mb-1">Cảm nhận và góp ý:</label>
            <textarea
              required
              rows={3}
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Hương vị món ăn thế nào? Độ nóng giòn, bao bì đóng gói..."
              className="w-full rounded-xl border border-stone-300 p-2 text-xs bg-white focus:outline-none focus:border-stone-900"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-black py-2.5 text-xs font-black text-white hover:bg-stone-800 transition-colors shadow-sm"
          >
            Gửi đánh giá món ăn
          </button>
        </form>
      </div>
    </div>
  )
}
