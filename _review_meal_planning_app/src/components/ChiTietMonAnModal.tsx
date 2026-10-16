import { useState } from "react"
import type { Dish } from "../types"
import { formatCurrency } from "../utils"
import { getToppingPrice } from "../data"

export function ChiTietMonAnModal({
  dish,
  onClose,
  onAddToCart,
}: {
  dish: Dish
  onClose: () => void
  onAddToCart: (dish: Dish, chosenToppings: string[], note: string, quantity: number) => void
}) {
  const [quantity, setQuantity] = useState(1)
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [note, setNote] = useState("")

  const toggleTopping = (topping: string) => {
    setSelectedToppings((prev) =>
      prev.includes(topping) ? prev.filter((t) => t !== topping) : [...prev, topping],
    )
  }

  const basePrice = dish.promoPrice ?? dish.price
  const toppingsPrice = selectedToppings.reduce((sum, top) => sum + getToppingPrice(top), 0)
  const unitPrice = basePrice + toppingsPrice
  const totalPrice = unitPrice * quantity

  const handleConfirm = () => {
    onAddToCart(dish, selectedToppings, note, quantity)
    onClose()
  }

  // Fallback ingredients if not specified
  const ingredientsList = dish.ingredients && dish.ingredients.length > 0
    ? dish.ingredients
    : [
        `Nguyên liệu chính: Tuyển chọn tươi ngon theo ngày chuẩn vị ${dish.name}.`,
        "Gia vị tự nhiên: Nước mắm truyền thống, hành tỏi phi, tiêu sọ, không lạm dụng bột ngọt.",
        "Rau củ ăn kèm: Rau sạch đạt chuẩn VietGAP nhập mới từ nông trại mỗi sáng.",
        "Quy trình chế biến: Đảm bảo vệ sinh ATTP 100%, chế biến nóng sốt ngay khi nhận đơn.",
      ]

  const nutrition = dish.nutritionInfo || {
    portion: "1 phần đầy đặn",
    calories: "khoảng 450 - 580 kcal",
    protein: "khoảng 22 - 35g",
    origin: "Việt Nam (Nguyên liệu sạch chọn lọc)",
    preservation: "Nên dùng ngay trong 30 - 45 phút khi món còn nóng sốt",
  }

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/65 p-3 sm:p-5 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col w-full max-w-lg max-h-[92vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. Header Image with Badges & Close Button (Matches user screenshot 1) */}
        <div className="relative h-56 sm:h-64 w-full shrink-0 overflow-hidden bg-stone-100">
          <img
            src={dish.image}
            alt={dish.name}
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />

          {/* Close button top right */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md hover:bg-black transition-all text-sm font-black"
            aria-label="Đóng"
          >
            ✕
          </button>

          {/* Photo Counter Badge top left */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] font-black text-white backdrop-blur-md">
            <span>📷</span>
            <span>1/1</span>
          </div>

          {/* Restaurant Brand Stamp bottom right */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[#8f1d14] px-3 py-1 text-xs font-black text-white shadow-md">
            <span>👨‍🍳</span>
            <span>Bếp FoodVD</span>
          </div>
        </div>

        {/* 2. Scrollable Detail Content (Matches user screenshots 1 & 2) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-stone-900">
          {/* Dish Name, Price and Quantity Stepper */}
          <div className="border-b border-stone-100 pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
                  {dish.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-2.5">
                  <span className="text-2xl font-black text-[#b42318]">
                    {formatCurrency(basePrice)}
                  </span>
                  {dish.promoPrice && (
                    <span className="text-sm font-bold text-stone-400 line-through">
                      {formatCurrency(dish.price)}
                    </span>
                  )}
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[11px] font-bold text-stone-600">
                    {dish.category}
                  </span>
                </div>
              </div>

              {/* Quantity Counter (Matches user screenshot: [ - 1 + ]) */}
              <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-2xs hover:bg-stone-100 font-black text-sm"
                  aria-label="Giảm số lượng"
                >
                  –
                </button>
                <span className="w-8 text-center text-sm font-black text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-700 shadow-2xs hover:bg-stone-100 font-black text-sm"
                  aria-label="Tăng số lượng"
                >
                  +
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 font-medium">
              ✓ {dish.description} Món ăn được nêm nếm gia vị đậm đà, chế biến công phu, giúp giữ trọn vẹn vị tươi ngọt tự nhiên của nguyên liệu và kích thích vị giác tuyệt vời.
            </p>
          </div>

          {/* Section: Chi tiết thành phần nguyên liệu (Đáp ứng: nói rõ món ăn có thành phần gì) */}
          <div className="space-y-2.5 bg-stone-50/70 rounded-2xl p-4 border border-stone-200/70">
            <h3 className="text-sm font-black text-stone-900 flex items-center gap-1.5">
              <span>🍲</span>
              <span>Thành phần & Nguyên liệu chế biến:</span>
            </h3>
            <ul className="space-y-1.5 text-xs text-stone-700 pl-2">
              {ingredientsList.map((ing, idx) => (
                <li key={idx} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-emerald-600 font-black shrink-0">•</span>
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Thông tin sản phẩm & Dinh dưỡng (Matches user screenshot 2) */}
          <div className="space-y-2 text-xs text-stone-700 border-t border-stone-100 pt-3">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <span>📋</span>
              <span>Thông tin sản phẩm & Dinh dưỡng</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
              {nutrition.portion && (
                <p>
                  <strong className="text-stone-900">- Khẩu phần:</strong> {nutrition.portion}
                </p>
              )}
              {nutrition.calories && (
                <p>
                  <strong className="text-stone-900">- Năng lượng:</strong> {nutrition.calories}
                </p>
              )}
              {nutrition.protein && (
                <p>
                  <strong className="text-stone-900">- Hàm lượng đạm:</strong> {nutrition.protein}
                </p>
              )}
              {nutrition.origin && (
                <p>
                  <strong className="text-stone-900">- Xuất xứ:</strong> {nutrition.origin}
                </p>
              )}
            </div>
          </div>

          {/* Section: Điều kiện bảo quản & Thưởng thức (Matches user screenshot 2) */}
          <div className="space-y-1.5 text-xs text-stone-700 border-t border-stone-100 pt-3">
            <h3 className="font-black text-stone-900 text-sm flex items-center gap-1.5">
              <span>🛡️</span>
              <span>Điều kiện bảo quản & Thưởng thức</span>
            </h3>
            <p>
              - {nutrition.preservation || "Nên thưởng thức ngay trong 30-45 phút sau khi nhận."}
            </p>
            <p>
              - Đóng gói trong hộp giữ nhiệt 3 lớp vệ sinh an toàn thực phẩm, tránh ánh nắng trực tiếp.
            </p>
          </div>

          {/* Section: Topping ăn kèm tùy chọn */}
          {dish.toppings && dish.toppings.length > 0 && (
            <div className="border-t border-stone-100 pt-3">
              <h3 className="text-sm font-black text-stone-900 mb-2.5 flex items-center gap-1.5">
                <span>➕</span>
                <span>Topping ăn kèm (Tùy chọn)</span>
              </h3>
              <div className="space-y-2">
                {dish.toppings.map((top) => {
                  const isChecked = selectedToppings.includes(top)
                  const topPrice = getToppingPrice(top)
                  return (
                    <label
                      key={top}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isChecked
                          ? "border-[#b42318] bg-rose-50/50"
                          : "border-stone-200 bg-white hover:border-stone-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleTopping(top)}
                          className="h-4 w-4 rounded accent-[#b42318] cursor-pointer"
                        />
                        <span className="text-xs font-bold text-stone-800">{top}</span>
                      </div>
                      <span className="text-xs font-black text-stone-600">
                        +{formatCurrency(topPrice)}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          )}

          {/* Section: GHI CHÚ (Exact match with user screenshot 2) */}
          <div className="border-t border-stone-100 pt-3">
            <label className="block text-xs font-black uppercase tracking-wider text-stone-500 mb-2">
              GHI CHÚ
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Nhập thông tin cần lưu ý... (ví dụ: ít cay, không hành, để riêng nước chấm, mang thêm tương ớt...)"
              rows={3}
              className="w-full rounded-2xl bg-stone-50 p-3.5 border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
            />
          </div>
        </div>

        {/* 3. Sticky Bottom Action Bar (Matches user screenshots 1 & 2: Thành tiền + Mua ngay) */}
        <div className="border-t border-stone-200 bg-white px-5 sm:px-6 py-4 flex items-center justify-between shadow-lg shrink-0">
          <div>
            <p className="text-[11px] font-bold text-stone-500">Thành tiền</p>
            <p className="text-xl sm:text-2xl font-black text-stone-900 leading-tight">
              {formatCurrency(totalPrice)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="rounded-full bg-[#b42318] hover:bg-[#961c12] text-white font-black px-7 sm:px-8 py-3 text-sm sm:text-base shadow-md hover:scale-102 transition-all active:scale-98"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  )
}
