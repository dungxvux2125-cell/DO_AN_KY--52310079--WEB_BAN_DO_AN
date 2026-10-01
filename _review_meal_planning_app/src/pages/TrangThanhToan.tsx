import { useState } from "react"
import { CheckoutSteps } from "../components/CacBuocDatHang"
import { OrderSideCard } from "../components/TienIchDonHang"
import { SectionHeading } from "../components/TieuDePhan"
import { Xem3DSanPham } from "../components/Xem3DSanPham"
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
  const [selected3DIndex, setSelected3DIndex] = useState(0)

  const activeCartItem = cartDetails[selected3DIndex] || cartDetails[0]

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

          {/* 3D Model Inspection & Product List Panel */}
          <div className="soft-panel">
            <div className="payment-order-title">
              <div>
                <p className="eyebrow">Trực quan hóa món ăn 3D & Giỏ hàng</p>
                <h2>Kiểm tra chi tiết món ăn trong đơn</h2>
              </div>
              <span className="flex items-center gap-1.5 font-black">
                ✨ {cartDetails.reduce((sum, item) => sum + item.quantity, 0)} món
              </span>
            </div>

            {cartDetails.length ? (
              <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_1fr]">
                {/* Left: Product List with selector */}
                <div className="space-y-3">
                  <p className="text-xs font-black uppercase tracking-wider text-stone-600">
                    Chọn món để xem hiệu ứng 3D sống động:
                  </p>
                  <div className="payment-order-list max-h-[38rem] overflow-y-auto pr-1">
                    {cartDetails.map((item, index) => {
                      const isSelected = selected3DIndex === index

                      return (
                        <div
                          key={`${item.dish.id}-${index}`}
                          onClick={() => setSelected3DIndex(index)}
                          className={`payment-order-item cursor-pointer transition-all ${
                            isSelected
                              ? "border-2 border-[#b42318] bg-[#fff5f1] shadow-md ring-2 ring-[#b42318]/20"
                              : "border border-[#efe4d6] bg-white hover:border-[#b42318]/50 hover:bg-[#fffcf8]"
                          }`}
                        >
                          <img src={item.dish.image} alt={item.dish.name} className="h-16 w-16 rounded-xl object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="truncate font-black">{item.dish.name}</h3>
                              {isSelected && (
                                <span
                                  className={`rounded-full px-2 py-0.5 text-[10px] font-black text-white ${
                                    item.dish.model3d ? "bg-[#b42318]" : "bg-stone-700"
                                  }`}
                                >
                                  {item.dish.model3d ? "Đang xem 3D" : "Đang xem ảnh"}
                                </span>
                              )}
                            </div>
                            <p className="truncate text-xs text-stone-600">
                              {item.toppings.join(", ") || "Không topping"}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <small className="font-bold text-stone-600">SL: {item.quantity}</small>
                              <strong className="text-[#b42318]">{formatCurrency(item.lineTotal)}</strong>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right: Live Interactive 3D Model Display */}
                <div className="flex flex-col">
                  {activeCartItem && (
                    <Xem3DSanPham
                      dish={activeCartItem.dish}
                      cartItem={activeCartItem}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-[#e6d7c7] bg-[#fff8ef] p-8 text-center text-sm font-semibold text-stone-600">
                Chưa có sản phẩm nào trong đơn hàng để xem mô hình 3D.
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
