import { useState, useRef } from "react"
import type { CartDetail, Dish } from "../types"
import { formatCurrency } from "../utils"

// Signature culinary ingredients displayed as clean badges
type GarnishItem = {
  icon: string
  label: string
}

function getDishGarnishes(dish: Dish): GarnishItem[] {
  const name = dish.name.toLowerCase()
  if (name.includes("phở")) {
    return [
      { icon: "🌶️", label: "Ớt sừng tươi" },
      { icon: "🍋", label: "Chanh tươi" },
      { icon: "🌿", label: "Rau húng quế" },
      { icon: "🌱", label: "Ngò gai thơm" },
      { icon: "🧅", label: "Hành tây mỏng" },
    ]
  }
  if (name.includes("bún chả")) {
    return [
      { icon: "🥩", label: "Chả nướng than hoa" },
      { icon: "🌶️", label: "Ớt tỏi băm" },
      { icon: "🥬", label: "Rau sống tươi" },
      { icon: "🧄", label: "Tỏi ngâm giấm" },
      { icon: "🥕", label: "Đu đủ chua giòn" },
    ]
  }
  if (name.includes("cơm tấm") || name.includes("cơm gà") || name.includes("burger")) {
    return [
      { icon: "🍳", label: "Trứng ốp la" },
      { icon: "🥒", label: "Dưa leo tươi" },
      { icon: "🍅", label: "Cà chua bi" },
      { icon: "🧅", label: "Mỡ hành béo" },
    ]
  }
  if (dish.category === "Đồ uống" || name.includes("soda") || name.includes("trà")) {
    return [
      { icon: "🧊", label: "Đá viên mát lạnh" },
      { icon: "🍃", label: "Lá bạc hà" },
      { icon: "🍋", label: "Chanh vàng" },
    ]
  }
  return [
    { icon: "🌶️", label: "Ớt tươi" },
    { icon: "🌿", label: "Rau thơm" },
    { icon: "🍋", label: "Chanh thơm" },
  ]
}

export function Xem3DSanPham({
  dish,
  cartItem,
  onClose,
  onAddToCart,
}: {
  dish: Dish
  cartItem?: CartDetail
  onClose?: () => void
  onAddToCart?: (dish: Dish) => void
}) {
  const isPlaying = true
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const has3DModel = Boolean(dish.model3d)
  const garnishes = getDishGarnishes(dish)

  // Track mouse movement to tilt the 3D dish in real time
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isPlaying || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    // Normalized coordinates from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1
    setMousePos({ x, y })
  }

  const handleMouseLeave = () => {
    // Gently ease back to neutral center
    setMousePos({ x: 0, y: 0 })
  }

  // Calculate 3D tilt angles based on mouse position
  const tiltX = isPlaying ? mousePos.y * -20 : 0
  const tiltY = isPlaying ? mousePos.x * 20 : 0

  return (
    <div className="relative flex flex-col overflow-hidden rounded-[2.25rem] border border-amber-500/25 bg-gradient-to-br from-[#14110f] via-[#1c1613] to-[#0a0807] text-white shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#b42318]/25 blur-[90px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-600/20 blur-[100px]"
        aria-hidden="true"
      />

      {/* Top Header */}
      <div className="relative z-20 flex items-center justify-between border-b border-white/10 bg-black/40 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#b42318] to-amber-500 text-xs font-black text-white shadow-md shadow-[#b42318]/40">
            {has3DModel ? "3D" : "3D"}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-base font-black leading-tight text-white">{dish.name}</h4>
              <span className="rounded-full bg-amber-400/20 px-2.5 py-0.5 text-[10px] font-black uppercase text-amber-300">
                {dish.category}
              </span>
            </div>
            <p className="text-xs text-white/70">
              Di chuột qua lại để tương tác góc nhìn 3D món ăn
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">


          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white hover:bg-white/25 transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Display Stage: Responds and tilts smoothly to mouse movement */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex min-h-[22rem] sm:min-h-[25rem] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-black/40 via-black/20 to-black/60 p-6 select-none cursor-crosshair"
        style={{ perspective: "1000px" }}
      >
        {/* Dynamic ambient ground reflection following mouse */}
        <div
          className="pointer-events-none absolute bottom-6 h-16 w-2/3 rounded-[100%] bg-amber-500/15 blur-2xl transition-transform duration-300 ease-out"
          style={{
            transform: `translate(${isPlaying ? mousePos.x * 20 : 0}px, ${
              isPlaying ? mousePos.y * 10 : 0
            }px)`,
          }}
        />

        {has3DModel ? (
          <div
            className="relative z-10 flex h-72 w-full items-center justify-center transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            }}
          >
            {/* @ts-ignore */}
            <model-viewer
              src={dish.model3d}
              alt={`Mô hình của ${dish.name}`}
              camera-controls
              auto-rotate={isPlaying}
              field-of-view="32deg"
              exposure="1.3"
              shadow-intensity="1"
              environment-image="neutral"
              interaction-prompt="none"
              style={{ width: "100%", height: "100%", outline: "none" }}
            >
              {/* @ts-ignore */}
            </model-viewer>
          </div>
        ) : (
          /* Interactive 3D Gourmet Dish: Moves and tilts as cursor glides across */
          <div className="relative z-10 flex flex-col items-center justify-center">
            {/* 3D Elevated Dish with Real-Time Perspective Tilt */}
            <div
              className="relative flex h-52 w-52 sm:h-64 sm:w-64 items-center justify-center rounded-full p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_35px_rgba(180,35,24,0.35)] border-4 border-[#efe4d6]/40 bg-gradient-to-tr from-[#29221d] via-[#3a3028] to-[#1a1512] transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${
                  isPlaying && (mousePos.x !== 0 || mousePos.y !== 0) ? 1.05 : 1
                }) translateZ(20px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/25">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="h-full w-full object-cover"
                />

                {/* Dynamic 3D lighting reflection gliding across the food surface */}
                {isPlaying && (
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at ${50 + mousePos.x * 40}% ${
                        50 + mousePos.y * 40
                      }%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)`,
                    }}
                  />
                )}
              </div>
            </div>

            {/* Garnishes Tags with slight parallax drift */}
            <div
              className="mt-5 flex flex-wrap items-center justify-center gap-2 transition-transform duration-300 ease-out"
              style={{
                transform: `translate(${isPlaying ? mousePos.x * 8 : 0}px, ${
                  isPlaying ? mousePos.y * 5 : 0
                }px)`,
              }}
            >
              {garnishes.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs font-bold text-white shadow-md backdrop-blur-md"
                >
                  <span>{item.icon}</span>
                  <span className="text-[11px] text-white/90">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Small tip at bottom */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3.5 py-0.5 text-[10px] font-bold text-white/80 backdrop-blur-md">
          {isPlaying
            ? "👆 Di chuột qua lại để nghiêng ảnh 3D · Bấm Tạm dừng để cố định"
            : "⏸️ Đang tạm dừng chuyển động · Bấm để tiếp tục tương tác"}
        </div>
      </div>

      {/* Footer Info & Action Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 bg-black/50 px-6 py-4 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white/60">
              {cartItem ? `Đã chọn trong giỏ: ${cartItem.quantity} phần` : "Giá món:"}
            </span>
            {cartItem && cartItem.toppings.length > 0 && (
              <span className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] font-bold text-amber-300">
                Topping: {cartItem.toppings.join(", ")}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-2xl font-black text-amber-400">
            {formatCurrency(cartItem ? cartItem.lineTotal : dish.promoPrice ?? dish.price)}
          </p>
        </div>

        {onAddToCart && (
          <button
            type="button"
            onClick={() => onAddToCart(dish)}
            className="rounded-xl bg-gradient-to-r from-[#b42318] to-amber-600 px-5 py-2 text-xs font-black text-white shadow-lg shadow-[#b42318]/40 transition-transform hover:scale-105 active:scale-95"
          >
            + Thêm vào giỏ hàng
          </button>
        )}
      </div>
    </div>
  )
}
