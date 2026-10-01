import { useState } from "react"
import { CheckoutSteps } from "../components/CacBuocDatHang"
import { MenuFilters, DishGrid } from "../components/ThucDon"
import { CartDrawer } from "../components/TienIchDonHang"
import type { CartDetail, Category, Dish, Page } from "../types"

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
}: {
  query: string
  setQuery: (value: string) => void
  category: Category
  setCategory: (value: Category) => void
  maxPrice: number
  setMaxPrice: (value: number) => void
  filteredDishes: Dish[]
  addToCart: (dish: Dish, toppingOrToppings?: string | string[]) => void
  cartDetails: CartDetail[]
  changeQuantity: (index: number, delta: number) => void
  subtotal: number
  go: (page: Page) => void
}) {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <section className="order-page">
      <div className="order-page__inner">
        <CheckoutSteps active="order" />
        <div className="restaurant-banner">
          <img
            className="restaurant-banner__image"
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1400&h=560&fit=crop&auto=format"
            alt="Không gian nhà hàng FoodVD"
          />
          <div className="restaurant-banner__shade" />
          <div className="restaurant-banner__content">
            <div className="flex flex-wrap items-center gap-2">
              <span className="restaurant-banner__badge">🟢 Đang nhận đơn</span>
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                ⭐ 4.9 (1.2k+ đánh giá)
              </span>
            </div>
            <h1>Bếp ăn FoodVD</h1>
            <p>Món Việt nóng hổi mỗi ngày, chuẩn bị nhanh chóng và giao tận nơi siêu tốc.</p>
            <div className="restaurant-banner__meta">
              <span>⚡ 25 - 35 phút</span>
              <span>🛵 Phí giao từ 15.000 đ</span>
              <span>🛡️ Đảm bảo an toàn thực phẩm</span>
            </div>
          </div>
        </div>

        <div className="order-layout">
          <div className="order-menu-column">
            <div className="order-section-title">
              <div>
                <p className="eyebrow">Thực đơn hôm nay</p>
                <h2>Chọn món bạn muốn ăn</h2>
              </div>
              <p>Bấm giỏ hàng ở cuối màn hình để xem lại món đã chọn và tiếp tục thanh toán.</p>
            </div>
            <MenuFilters
              query={query}
              setQuery={setQuery}
              category={category}
              setCategory={setCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <DishGrid dishes={filteredDishes} addToCart={addToCart} />
          </div>
        </div>
      </div>

      <CartDrawer
        open={cartOpen}
        setOpen={setCartOpen}
        cartDetails={cartDetails}
        changeQuantity={changeQuantity}
        subtotal={subtotal}
        actionLabel="Tiếp tục nhập thông tin"
        onAction={() => go("delivery")}
        disabled={!cartDetails.length}
      />
    </section>
  )
}
