import type { CartDetail, OrderStatus } from "../types"
import { formatCurrency } from "../utils"

export function CartSummary({
  cartDetails,
  changeQuantity,
  subtotal,
  actionLabel,
  onAction,
  disabled,
}: {
  cartDetails: CartDetail[]
  changeQuantity: (index: number, delta: number) => void
  subtotal: number
  actionLabel: string
  onAction: () => void
  disabled: boolean
}) {
  return (
    <aside className="cart-summary h-fit xl:sticky xl:top-5">
      <div className="cart-summary__heading">
        <div>
          <p className="eyebrow">Đơn của bạn</p>
          <h2 className="text-2xl font-black">Giỏ hàng</h2>
        </div>
        <span>{cartDetails.reduce((total, item) => total + item.quantity, 0)} món</span>
      </div>
      <div className="mt-5 grid gap-3">
        {cartDetails.length ? (
          cartDetails.map((item, index) => (
            <div key={`${item.dish.id}-${index}`} className="cart-row">
              <img src={item.dish.image} alt={item.dish.name} className="h-14 w-14 rounded-2xl object-cover" />
              <div className="min-w-0 flex-1">
                <p className="font-black">{item.dish.name}</p>
                <p className="truncate text-sm text-stone-500">
                  {item.toppings.join(", ") || "Không topping"}
                </p>
                <p className="mt-1 font-black text-[#b42318]">{formatCurrency(item.lineTotal)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="qty-button" onClick={() => changeQuantity(index, -1)}>
                  -
                </button>
                <span className="w-6 text-center font-bold">{item.quantity}</span>
                <button className="qty-button" onClick={() => changeQuantity(index, 1)}>
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-dashed border-[#e6d7c7] bg-[#fff8ef] p-5 text-sm text-stone-600">
            Chưa có món nào trong giỏ.
          </p>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-[#eadfd2] pt-4 text-lg font-black">
        <span>Tạm tính</span>
        <span className="text-[#b42318]">{formatCurrency(subtotal)}</span>
      </div>
      <button
        disabled={disabled}
        onClick={onAction}
        className="mt-4 w-full cta-button disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
      >
        {actionLabel}
      </button>
    </aside>
  )
}

export function CartDrawer({
  open,
  setOpen,
  cartDetails,
  changeQuantity,
  subtotal,
  actionLabel,
  onAction,
  disabled,
}: {
  open: boolean
  setOpen: (value: boolean) => void
  cartDetails: CartDetail[]
  changeQuantity: (index: number, delta: number) => void
  subtotal: number
  actionLabel: string
  onAction: () => void
  disabled: boolean
}) {
  const totalQuantity = cartDetails.reduce((total, item) => total + item.quantity, 0)

  return (
    <>
      <button type="button" className="cart-float-button" onClick={() => setOpen(true)}>
        <span className="cart-float-button__count">{totalQuantity}</span>
        <span className="cart-float-button__text">
          <strong>Giỏ hàng</strong>
          <small>{totalQuantity ? `${totalQuantity} món đã chọn` : "Chưa có món"}</small>
        </span>
        <span className="cart-float-button__price">{formatCurrency(subtotal)}</span>
      </button>

      <div className={`cart-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <button type="button" className="cart-drawer__backdrop" onClick={() => setOpen(false)} />
        <aside className="cart-drawer__panel" role="dialog" aria-modal="true" aria-label="Giỏ hàng">
          <div className="cart-drawer__handle" />
          <div className="cart-drawer__top">
            <div>
              <p className="eyebrow">Đơn của bạn</p>
              <h2>Giỏ hàng</h2>
            </div>
            <button type="button" className="cart-drawer__close" onClick={() => setOpen(false)}>
              Đóng
            </button>
          </div>

          <div className="cart-drawer__body">
            {cartDetails.length ? (
              cartDetails.map((item, index) => (
                <div key={`${item.dish.id}-${index}`} className="cart-row">
                  <img src={item.dish.image} alt={item.dish.name} className="h-14 w-14 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-black">{item.dish.name}</p>
                    <p className="truncate text-sm text-stone-500">
                      {item.toppings.join(", ") || "Không topping"}
                    </p>
                    <p className="mt-1 font-black text-[#b42318]">{formatCurrency(item.lineTotal)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="qty-button" onClick={() => changeQuantity(index, -1)}>
                      -
                    </button>
                    <span className="w-6 text-center font-bold">{item.quantity}</span>
                    <button className="qty-button" onClick={() => changeQuantity(index, 1)}>
                      +
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-[#e6d7c7] bg-[#fff8ef] p-5 text-sm text-stone-600">
                Chưa có món nào trong giỏ.
              </p>
            )}
          </div>

          <div className="cart-drawer__footer">
            <div className="flex items-center justify-between text-lg font-black">
              <span>Tạm tính</span>
              <span className="text-[#b42318]">{formatCurrency(subtotal)}</span>
            </div>
            <button
              disabled={disabled}
              onClick={onAction}
              className="mt-4 w-full cta-button disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
            >
              {actionLabel}
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}

export function OrderSideCard({
  title,
  subtotal,
  discount,
  shippingFee,
  total,
  actionLabel,
  onAction,
  disabled,
}: {
  title: string
  subtotal: number
  discount: number
  shippingFee: number
  total: number
  actionLabel: string
  onAction: () => void
  disabled: boolean
}) {
  return (
    <aside className="h-fit rounded-[1.75rem] border border-[#efe4d6] bg-white p-5 shadow-[0_18px_70px_rgba(126,54,30,0.1)] lg:sticky lg:top-24">
      <h2 className="text-2xl font-black">{title}</h2>
      <div className="mt-5 rounded-[1.25rem] border border-[#eadfd2] bg-[#fff8ef] p-4">
        <PriceRow label="Tạm tính" value={subtotal} />
        <PriceRow label="Giảm giá" value={-discount} />
        <PriceRow label="Phí giao hàng" value={shippingFee} />
        <div className="mt-3 flex items-center justify-between border-t border-[#eadfd2] pt-3 text-lg font-black">
          <span>Tổng thanh toán</span>
          <span className="text-[#b42318]">{formatCurrency(total)}</span>
        </div>
      </div>
      <button
        disabled={disabled}
        onClick={onAction}
        className="mt-4 w-full cta-button disabled:cursor-not-allowed disabled:bg-stone-300 disabled:shadow-none"
      >
        {actionLabel}
      </button>
    </aside>
  )
}

export function PriceRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mt-3 flex items-center justify-between text-sm font-semibold text-stone-600">
      <span>{label}</span>
      <span>{formatCurrency(value)}</span>
    </div>
  )
}

export function StatusPill({ status }: { status: OrderStatus }) {
  const styleByStatus: Record<OrderStatus, string> = {
    "Chờ duyệt": "bg-amber-100 text-amber-800",
    "Đang chuẩn bị": "bg-sky-100 text-sky-800",
    "Đang giao": "bg-violet-100 text-violet-800",
    "Hoàn tất": "bg-emerald-100 text-emerald-800",
    "Đã hủy": "bg-red-100 text-red-800",
  }

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-black ${styleByStatus[status]}`}>
      {status}
    </span>
  )
}
