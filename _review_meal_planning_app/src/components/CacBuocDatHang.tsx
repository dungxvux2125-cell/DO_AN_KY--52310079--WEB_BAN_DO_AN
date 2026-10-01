export function CheckoutSteps({ active }: { active: "order" | "delivery" | "payment" }) {
  const steps: Array<["order" | "delivery" | "payment", string]> = [
    ["order", "Đặt hàng"],
    ["delivery", "Thông tin nhận hàng"],
    ["payment", "Thanh toán"],
  ]

  return (
    <div className="checkout-steps">
      {steps.map(([key, label], index) => (
        <div key={key} className={`checkout-step ${active === key ? "active" : ""}`}>
          <span>{index + 1}</span>
          <p>{label}</p>
        </div>
      ))}
    </div>
  )
}
