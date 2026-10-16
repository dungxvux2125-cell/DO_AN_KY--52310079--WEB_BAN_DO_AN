import { CheckoutSteps } from "../components/CacBuocDatHang"
import { OrderSideCard } from "../components/TienIchDonHang"
import { SectionHeading } from "../components/TieuDePhan"
import type { CartDetail, Page, PaymentMethod, User } from "../types"
import { formatCurrency } from "../utils"

export function PaymentPage({
  user,
  go,
  payment,
  setPayment,
  voucherInput,
  setVoucherInput,
  appliedVoucherCode,
  voucherMessage,
  applyVoucher,
  phone,
  cartDetails,
  subtotal,
  discount,
  shippingFee,
  total,
  hasCart,
  placeOrder,
}: {
  user?: User | null
  go?: (page: Page) => void
  payment: PaymentMethod
  setPayment: (value: PaymentMethod) => void
  voucherInput: string
  setVoucherInput: (value: string) => void
  appliedVoucherCode: string
  voucherMessage: string
  applyVoucher: () => void
  phone: string
  cartDetails: CartDetail[]
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  hasCart: boolean
  placeOrder: () => void
}) {

  return (
    <section className="page-shell page-shell-wide">
      <CheckoutSteps active="payment" />

      {!user && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-amber-400/90 bg-amber-50 p-4 text-amber-950 sm:flex-row sm:items-center sm:justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔐</span>
            <div>
              <h4 className="font-black text-sm">Yêu cầu đăng nhập tài khoản để đặt hàng</h4>
              <p className="text-xs text-amber-900/80">
                Bạn cần đăng nhập hoặc đăng ký tài khoản thành viên trước khi tạo đơn hàng thành công.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => go?.("login")}
              className="rounded-xl bg-[#b42318] px-4 py-2 text-xs font-black text-white shadow-md hover:bg-[#961c12] transition-colors"
            >
              Đăng nhập ngay
            </button>
            <button
              type="button"
              onClick={() => go?.("register")}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors"
            >
              Đăng ký tài khoản
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-6">
          {/* Payment Method Panel */}
          <div className="soft-panel">
            <SectionHeading
              eyebrow="Thanh toán"
              title="Chọn phương thức thanh toán và kiểm tra lại đơn hàng."
              description="Mã giảm giá chỉ được trừ khi bạn nhập đúng mã và bấm áp dụng."
            />

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(["COD", "VietQR"] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPayment(method)}
                  className={`payment-tile ${payment === method ? "active" : ""}`}
                >
                  <span>{method}</span>
                  <p>{method === "COD" ? "Thanh toán khi nhận món" : "Quét mã chuyển khoản nhanh"}</p>
                </button>
              ))}
            </div>

            <div className="voucher-box">
              <label className="field-label">
                Nhập mã giảm giá
                <div className="voucher-box__row">
                  <input
                    value={voucherInput}
                    onChange={(event) => setVoucherInput(event.target.value)}
                    className="soft-input"
                    placeholder="Ví dụ: FOODVD20 hoặc FREESHIP"
                  />
                  <button type="button" className="voucher-box__button" onClick={applyVoucher}>
                    Áp dụng
                  </button>
                </div>
              </label>
              {voucherMessage && (
                <p className={`voucher-box__message ${appliedVoucherCode ? "is-valid" : "is-invalid"}`}>
                  {voucherMessage}
                </p>
              )}
            </div>

            {payment === "VietQR" && (
              <div className="mt-5 flex items-center gap-4 rounded-[1.5rem] border border-[#f2d3c6] bg-[#fff5f1] p-5">
                <div className="qr-grid" aria-label="Mã VietQR demo" />
                <div>
                  <p className="font-black text-[#8f1d14]">VietQR demo</p>
                  <p className="text-sm leading-6 text-stone-600">
                    Nội dung chuyển khoản: FOODVD {phone.slice(-3) || "000"}.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product List Panel */}
          <div className="soft-panel">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <div>
                <p className="eyebrow">Danh sách món ăn</p>
                <h2 className="text-xl font-black text-stone-900">Chi tiết các món trong đơn hàng</h2>
              </div>
              <span className="flex items-center gap-1.5 rounded-full bg-stone-100 px-3.5 py-1.5 text-xs font-black text-stone-800">
                🛍️ {cartDetails.reduce((sum, item) => sum + item.quantity, 0)} phần ăn
              </span>
            </div>

            {cartDetails.length ? (
              <div className="mt-5 space-y-3 max-h-[30rem] overflow-y-auto pr-1">
                {cartDetails.map((item, index) => (
                  <div
                    key={`${item.dish.id}-${index}`}
                    className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-white p-3.5 sm:p-4 shadow-2xs hover:border-stone-300 transition-all"
                  >
                    <img
                      src={item.dish.image}
                      alt={item.dish.name}
                      className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-black text-stone-900 text-sm sm:text-base leading-snug">
                            {item.dish.name}
                          </h3>
                          <p className="text-xs text-stone-500 mt-0.5">
                            {item.dish.category}
                          </p>
                        </div>
                        <strong className="text-base font-black text-stone-900 shrink-0">
                          {formatCurrency(item.lineTotal)}
                        </strong>
                      </div>

                      {item.toppings.length > 0 && (
                        <p className="text-xs text-amber-800 font-medium mt-1">
                          Topping: {item.toppings.join(", ")}
                        </p>
                      )}

                      {item.note && (
                        <p className="text-xs text-rose-700 font-semibold mt-1 bg-rose-50 px-2 py-0.5 rounded-md inline-block">
                          📝 Ghi chú bếp: {item.note}
                        </p>
                      )}

                      <div className="mt-2 flex items-center justify-between text-xs text-stone-600">
                        <span className="font-bold bg-stone-100 px-2 py-0.5 rounded-md">
                          Số lượng: {item.quantity}
                        </span>
                        <span>Đơn giá: {formatCurrency(item.dish.promoPrice ?? item.dish.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-stone-200 bg-stone-50 p-8 text-center text-sm font-semibold text-stone-600">
                Chưa có món ăn nào trong đơn hàng.
              </div>
            )}
          </div>
        </div>

        {/* Right Summary Sidebar */}
        <OrderSideCard
          title="Xác nhận thanh toán"
          total={total}
          subtotal={subtotal}
          discount={discount}
          shippingFee={shippingFee}
          actionLabel={!user ? "Đăng nhập để đặt hàng" : "Tạo đơn hàng"}
          onAction={!user ? () => go?.("login") : placeOrder}
          disabled={!hasCart}
        />
      </div>
    </section>
  )
}
