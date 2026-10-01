import { useState } from "react"
import { categoryOptions, getToppingPrice } from "../data"
import type { Category, Dish } from "../types"
import { formatCurrency } from "../utils"
import { Xem3DSanPham } from "./Xem3DSanPham"

const categoryIcons: Record<Category, string> = {
  "Tất cả": "🍽️",
  "Món chính": "🍛",
  "Ăn nhẹ": "🥟",
  "Đồ uống": "🥤",
  "Combo": "🍱",
}

export function MenuFilters({
  query,
  setQuery,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
}: {
  query: string
  setQuery: (value: string) => void
  category: Category
  setCategory: (value: Category) => void
  maxPrice: number
  setMaxPrice: (value: number) => void
}) {
  return (
    <div className="menu-toolbar">
      <div className="menu-toolbar__search">
        <label className="field-label flex items-center justify-between">
          <span>Tìm kiếm món ăn</span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-xs font-bold text-[#b42318] hover:underline"
            >
              Xóa tìm kiếm
            </button>
          )}
        </label>
        <div className="relative mt-1">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="soft-input pl-10 pr-9"
            placeholder="Tìm theo tên món, nguyên liệu, hương vị..."
          />
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">
            🔍
          </span>
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-stone-200 px-1.5 py-0.5 text-xs font-bold text-stone-600 hover:bg-stone-300"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="menu-toolbar__categories" aria-label="Danh mục món ăn">
        {categoryOptions.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setCategory(option)}
            className={`category-chip ${category === option ? "active" : ""}`}
          >
            <span className="mr-1.5">{categoryIcons[option]}</span>
            {option}
          </button>
        ))}
      </div>

      <div className="menu-toolbar__price">
        <div className="flex items-center justify-between">
          <label className="field-label">Mức giá tối đa</label>
          <span className="rounded-full bg-[#b42318]/10 px-2.5 py-0.5 text-xs font-black text-[#b42318]">
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
          className="mt-3 w-full accent-[#b42318]"
        />
        <div className="mt-1 flex justify-between text-[11px] font-bold text-stone-600">
          <span>30.000 đ</span>
          <span>240.000 đ</span>
        </div>
      </div>
    </div>
  )
}

export function DishGrid({
  dishes,
  addToCart,
}: {
  dishes: Dish[]
  addToCart: (dish: Dish, toppingOrToppings?: string | string[]) => void
}) {
  const [previewDish, setPreviewDish] = useState<Dish | null>(null)
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
        <p className="menu-result__count">
          Hiển thị <strong>{dishes.length}</strong> món ăn phù hợp
        </p>
        <span className="text-xs font-bold text-stone-600">
          Giao hàng nóng hổi trong 30 phút
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

          return (
            <article key={dish.id} className="dish-card dish-card-large group">
              <div className="relative overflow-hidden rounded-[1.25rem]">
                <img
                  className="dish-card__image transition-transform duration-500 group-hover:scale-105"
                  src={dish.image}
                  alt={dish.name}
                  loading="lazy"
                />
                <span className={`availability ${dish.available ? "is-on" : "is-off"}`}>
                  {dish.available ? "Còn món" : "Tạm hết"}
                </span>
                {hasDiscount && (
                  <span className="absolute right-3 top-3 rounded-full bg-[#b42318] px-2.5 py-1 text-xs font-black text-white shadow-md">
                    -{discountPercent}%
                  </span>
                )}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs font-bold text-white drop-shadow">
                  <span className="rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                    ⭐ 4.9
                  </span>
                  <button
                    type="button"
                    onClick={() => setPreviewDish(dish)}
                    className="rounded-full border border-white/40 bg-black/60 px-3 py-1 text-[11px] font-black text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-[#b42318]"
                  >
                    ✨ Trải nghiệm 3D
                  </button>
                  <span className="rounded-full bg-black/50 px-2 py-0.5 backdrop-blur-sm">
                    🔥 Đã bán {dish.sold}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="inline-block rounded-md bg-[#fff0ea] px-2 py-0.5 text-[11px] font-black uppercase tracking-wider text-[#9f2f22]">
                      {dish.category}
                    </span>
                    <h3 className="mt-1.5 text-xl font-black leading-tight text-stone-900 group-hover:text-[#b42318] transition-colors">
                      {dish.name}
                    </h3>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xl font-black text-[#b42318]">
                      {formatCurrency(finalPrice)}
                    </p>
                    {hasDiscount && (
                      <p className="text-xs font-bold text-stone-600 line-through">
                        {formatCurrency(dish.price + toppingsExtra)}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-2.5 min-h-12 text-sm leading-6 text-stone-600">
                  {dish.description}
                </p>

                {dish.toppings.length > 0 && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-black text-stone-700">
                        Tùy chọn topping:
                      </p>
                      {chosenToppings.length > 0 && (
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedToppingsMap((prev) => ({ ...prev, [dish.id]: [] }))
                          }
                          className="text-[11px] font-bold text-[#b42318] hover:underline"
                        >
                          Bỏ chọn ({chosenToppings.length})
                        </button>
                      )}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {dish.toppings.map((topping) => {
                        const isSelected = chosenToppings.includes(topping)
                        const price = getToppingPrice(topping)
                        return (
                          <button
                            key={topping}
                            type="button"
                            onClick={() => toggleTopping(dish.id, topping)}
                            disabled={!dish.available}
                            className={`rounded-xl border px-2.5 py-1 text-xs font-bold transition-all ${
                              isSelected
                                ? "border-[#b42318] bg-[#b42318] text-white shadow-sm"
                                : "border-[#e0d6c8] bg-white text-stone-700 hover:border-[#b42318]/50 hover:bg-[#fff7f4]"
                            }`}
                            title={`Bấm để ${isSelected ? "bỏ chọn" : "chọn"} topping ${topping}`}
                          >
                            <span>{isSelected ? "✓" : "+"} {topping}</span>{" "}
                            <span
                              className={`text-[11px] font-bold ${
                                isSelected ? "text-white/90" : "text-[#b42318]"
                              }`}
                            >
                              ({price === 0 ? "0đ" : `+${formatCurrency(price)}`})
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-auto pt-5">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(dish)}
                    disabled={!dish.available}
                    className={`dish-card__add transition-all ${
                      addedNotice[dish.id] ? "!bg-emerald-600" : ""
                    }`}
                  >
                    <span>
                      {addedNotice[dish.id]
                        ? "✓ Đã thêm vào giỏ!"
                        : chosenToppings.length > 0
                        ? `Thêm vào giỏ (${formatCurrency(finalPrice)})`
                        : "Thêm vào giỏ hàng"}
                    </span>
                    <span className="plus-icon-small">+</span>
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Interactive 3D Preview Modal */}
      {previewDish && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={() => setPreviewDish(null)}
        >
          <div
            className="w-full max-w-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Xem3DSanPham
              dish={previewDish}
              onClose={() => setPreviewDish(null)}
              onAddToCart={(dish) => {
                const chosen = selectedToppingsMap[dish.id] || []
                addToCart(dish, chosen)
                setPreviewDish(null)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
