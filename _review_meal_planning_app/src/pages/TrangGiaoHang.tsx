import { CheckoutSteps } from "../components/CacBuocDatHang"
import { OrderSideCard } from "../components/TienIchDonHang"
import { SectionHeading } from "../components/TieuDePhan"
import type { Page, User } from "../types"

type DeliveryForm = {
  name: string
  phone: string
  email: string
  address: string
  note: string
}

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
}) {
  return (
    <section className="page-shell page-shell-wide">
      <CheckoutSteps active="delivery" />

      {!user && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border-2 border-amber-400/90 bg-amber-50 p-4 text-amber-950 sm:flex-row sm:items-center sm:justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🔐</span>
            <div>
              <h4 className="font-black text-sm">Yêu cầu đăng nhập tài khoản</h4>
              <p className="text-xs text-amber-900/80">
                Bạn cần đăng nhập hoặc đăng ký tài khoản thành viên để hoàn tất thông tin nhận hàng và thanh toán.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => go("login")}
              className="rounded-xl bg-[#b42318] px-4 py-2 text-xs font-black text-white shadow-md hover:bg-[#961c12] transition-colors"
            >
              Đăng nhập ngay
            </button>
            <button
              type="button"
              onClick={() => go("register")}
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-50 transition-colors"
            >
              Đăng ký tài khoản
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid gap-6">
          <div className="soft-panel">
            <SectionHeading
              eyebrow="Thông tin nhận hàng"
              title="Chọn địa chỉ giao trong khu vực Hà Nội."
              description="Bản demo giới hạn phạm vi giao quanh Hà Nội để luồng đặt hàng rõ ràng và thực tế hơn."
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {(["name", "phone", "email"] as const).map((key) => (
                <label key={key} className="field-label">
                  {{
                    name: "Họ tên",
                    phone: "Số điện thoại",
                    email: "Email nhận hóa đơn",
                  }[key]}
                  <input
                    value={form[key]}
                    onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                    className="soft-input"
                  />
                </label>
              ))}
              <label className="field-label md:col-span-2">
                Địa chỉ giao hàng
                <input
                  value={form.address}
                  onChange={(event) => setForm({ ...form, address: event.target.value })}
                  className="soft-input"
                  placeholder="Ví dụ: 136 Xuân Thủy, Cầu Giấy, Hà Nội"
                />
              </label>
              <label className="field-label md:col-span-2">
                Ghi chú cho quán
                <textarea
                  value={form.note}
                  onChange={(event) => setForm({ ...form, note: event.target.value })}
                  className="min-h-24 resize-none soft-input"
                />
              </label>
            </div>
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
    </section>
  )
}
