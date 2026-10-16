import { CheckoutSteps } from "../components/CacBuocDatHang"
import { DishGrid } from "../components/ThucDon"
import type { CartDetail, Category, Dish, Page, Review, User } from "../types"

export function OrderPage({
  query,
  setQuery,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  filteredDishes,
  addToCart,
  cartDetails,
  changeQuantity,
  subtotal,
  go,
  reviews = [],
  onAddReview,
  user,
  orderSuccess,
}: {
  query: string
  setQuery: (value: string) => void
  category: Category
  setCategory: (value: Category) => void
  maxPrice: number
  setMaxPrice: (value: number) => void
  filteredDishes: Dish[]
  addToCart: (dish: Dish, toppingOrToppings?: string | string[]) => void
  cartDetails?: CartDetail[]
  changeQuantity?: (index: number, delta: number) => void
  subtotal?: number
  go: (page: Page) => void
  reviews?: Review[]
  onAddReview?: (reviewData: {
    dishId: number
    dishName: string
    customerName: string
    rating: number
    comment: string
  }) => void
  user?: User | null
  orderSuccess?: string
}) {

  return (
    <section className="order-page">
      <div className="order-page__inner">
        <CheckoutSteps active="order" />

        {/* Uber Eats Style Clean Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white my-6 shadow-md">
          <img
            className="h-48 sm:h-64 w-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1400&h=560&fit=crop&auto=format"
            alt="Không gian nhà hàng FoodVD"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white">
                🟢 Mở cửa nhận đơn
              </span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                ⭐ 4.9 ({reviews.length ? `${reviews.length * 20}+` : "1.2k+"} đánh giá)
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">FoodVD Kitchen</h1>
            <p className="mt-1 text-xs sm:text-sm text-stone-200 max-w-xl">
              Món ăn thuần Việt thơm ngon mỗi ngày • Nóng hổi đóng gói cẩn thận giao tận nơi siêu tốc.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs font-bold text-stone-300">
              <span>⚡ 20 - 35 phút</span>
              <span>•</span>
              <span>🛵 Phí giao từ 15.000 đ</span>
              <span>•</span>
              <span>🛡️ Đạt chuẩn VSATTP</span>
            </div>
          </div>
        </div>

        {orderSuccess && (
          <div className="my-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-900 shadow-xs flex items-center gap-2">
            <span className="text-base">🎉</span>
            <span>{orderSuccess}</span>
          </div>
        )}

        {/* Clean, Full-Width Category & Search Bar (Uber Eats Style) */}
        <div className="my-6 rounded-3xl bg-white border border-stone-200 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-lg">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm kiếm món ăn, đồ uống, hoa quả..."
                className="w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-10 py-3 text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-900 focus:outline-hidden transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-stone-200 text-stone-600 text-xs font-bold hover:bg-stone-300"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Price Filter */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500 whitespace-nowrap">Giá tối đa:</span>
              <input
                type="range"
                min={20000}
                max={240000}
                step={5000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-32 accent-[#842018] cursor-pointer"
              />
              <span className="rounded-full bg-[#fbe8e2] px-3 py-1 text-xs font-black text-[#842018] whitespace-nowrap">
                {maxPrice.toLocaleString("vi-VN")} đ
              </span>
            </div>
          </div>

          {/* Horizontal Scrollable Category Chips (Uber Eats / GrabFood standard) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {(
              [
                ["Tất cả", "🍽️"],
                ["Ưu đãi", "🏷️"],
                ["Món Việt", "🥢"],
                ["Món chính", "🍛"],
                ["Hoa quả", "🍎"],
                ["Đồ uống", "🥤"],
                ["Ăn nhẹ", "🥟"],
                ["Tráng miệng", "🍮"],
                ["Healthy & Ăn kiêng", "🥗"],
                ["Gia vị & Đồ khô", "🥫"],
                ["Combo", "🍱"],
              ] as Array<[Category, string]>
            ).map(([cat, icon]) => {
              const isSelected = category === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex shrink-0 items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#842018] text-white shadow-xs font-black scale-[1.02]"
                      : "bg-stone-100 text-stone-700 hover:bg-stone-200/80 hover:text-black"
                  }`}
                >
                  <span className="text-sm">{icon}</span>
                  <span>{cat}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Full Width Dish Grid */}
        <div className="w-full">
          <div className="mb-4">
            <h2 className="text-2xl font-black text-stone-900 tracking-tight">Thực đơn món ăn</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              {filteredDishes.length} món ăn thơm ngon, đóng gói chuẩn VSATTP giao tận nơi.
            </p>
          </div>

          <DishGrid
            dishes={filteredDishes}
            addToCart={addToCart}
            reviews={reviews}
            onAddReview={onAddReview}
            user={user}
          />
        </div>
      </div>
    </section>
  )
}
