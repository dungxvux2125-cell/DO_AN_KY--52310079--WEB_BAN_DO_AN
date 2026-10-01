import type { Dish, Page } from "../types"

function ProcessPill({ step, text }: { step: string; text: string }) {
  return (
    <div className="process-pill">
      <span>{step}</span>
      <p>{text}</p>
    </div>
  )
}

function FeatureCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="admin-card">
      <h3 className="text-xl font-black">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-600">{text}</p>
    </article>
  )
}

export function HomePage({
  go,
  orderSuccess,
  featuredDishes,
}: {
  go: (page: Page) => void
  orderSuccess: string
  featuredDishes: Dish[]
}) {
  return (
    <>
      <section className="hero-shell">
        <div className="floating-chip chip-a">VietQR</div>
        <div className="floating-chip chip-b">AES-256</div>
        <div className="floating-chip chip-c">SMTP</div>
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-[1.02fr_0.98fr] md:px-8 md:py-14">
          <div className="relative z-10 flex flex-col justify-center">
            <p className="eyebrow">Website thương mại điện tử F&B</p>
            <h1 className="mt-4 max-w-3xl text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
              FoodVD đặt món nhanh, theo dõi đơn rõ ràng.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-700 md:text-lg">
              Trang chủ dành cho khách hàng xem thông tin, ưu đãi và bắt đầu đặt món. Khu vực quản
              lý chỉ xuất hiện sau khi nhân viên hoặc admin đăng nhập.
            </p>
            {orderSuccess && <p className="mt-5 success-banner">{orderSuccess}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => go("order")} className="cta-button">
                Bắt đầu đặt món
              </button>
              <button onClick={() => go("login")} className="ghost-button">
                Đăng nhập
              </button>
              <button onClick={() => go("register")} className="ghost-button">
                Đăng ký
              </button>
            </div>
            <div className="mt-9 flex max-w-3xl flex-wrap gap-3">
              <ProcessPill step="01" text="Chọn món" />
              <ProcessPill step="02" text="Nhập địa chỉ" />
              <ProcessPill step="03" text="Thanh toán" />
              <ProcessPill step="04" text="Theo dõi đơn" />
            </div>
          </div>
          <div className="hero-showcase">
            <div className="dish-orbit orbit-one">
              <img src={featuredDishes[3]?.image} alt="Món bán chạy" />
              <span>Bán chạy</span>
            </div>
            <div className="dish-orbit orbit-two">
              <img src={featuredDishes[0]?.image} alt="Món gợi ý" />
              <span>Gợi ý hôm nay</span>
            </div>
            <img
              className="hero-food"
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1200&fit=crop&auto=format"
              alt="Mâm đồ ăn giao tận nơi"
            />
            <div className="order-glass">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#9f2f22]">
                Banner khuyến mãi
              </p>
              <h2 className="mt-1 text-2xl font-black">Combo trưa giảm 20%</h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Áp mã FOODVD20 cho đơn từ 120.000đ, thanh toán COD hoặc VietQR.
              </p>
              <button onClick={() => go("order")} className="mt-5 cta-button w-full">
                Xem thực đơn
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="promo-strip">
          <div>
            <p className="eyebrow">Ưu đãi hôm nay</p>
            <h2>Miễn phí giao hàng nội thành cho đơn từ 150.000đ.</h2>
          </div>
          <button onClick={() => go("order")} className="ghost-button">
            Đặt ngay
          </button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <FeatureCard title="Thực đơn trực quan" text="Ảnh món lớn hơn, topping dễ chọn và lọc theo giá." />
          <FeatureCard title="Thanh toán tách riêng" text="COD/VietQR nằm ở bước cuối để khách kiểm tra đơn trước." />
          <FeatureCard title="Phân quyền nội bộ" text="Nhân viên quản lý đơn/món; admin có thêm quản lý lương." />
        </div>
      </section>
    </>
  )
}
