import { useState, useEffect } from "react"
import type { Dish, Page, User } from "../types"

const HERO_VIDEOS = [
  {
    src: "/shorts/8064831-hd_1920_1080_24fps.mp4",
    title: "Mì Tươi Kéo Sợi Thượng Hạng",
  },
  {
    src: "/shorts/7008564-hd_1920_1080_25fps.mp4",
    title: "Nước Dùng Ninh Xương 12 Giờ",
  },
  {
    src: "/shorts/13681662_1920_1080_50fps.mp4",
    title: "Thưởng Thức Nóng Hổi Tại Bàn",
  },
  {
    src: "/shorts/3967242-uhd_4096_2160_24fps.mp4",
    title: "Nghệ Thuật Nấu Nướng Đỉnh Cao",
  },
]

export function HomePage({
  go,
  orderSuccess,
  user,
}: {
  go: (page: Page) => void
  orderSuccess: string
  featuredDishes?: Dish[]
  user?: User | null
}) {
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0)

  // Điều hướng: Nếu đã đăng nhập thì sang trang "order", chưa đăng nhập thì sang "login"
  const handleOrderClick = () => {
    if (user) {
      go("order")
    } else {
      go("login")
    }
  }

  // Tự động xoay vòng 4 video mỗi 6.5 giây hoặc khi video kết thúc
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  const nextVideo = () => {
    setCurrentVideoIdx((prev) => (prev + 1) % HERO_VIDEOS.length)
  }

  const prevVideo = () => {
    setCurrentVideoIdx((prev) => (prev - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length)
  }

  return (
    <div className="bg-[#fbfbfb] text-stone-900">
      {orderSuccess && (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-8">
          <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-xs">
            {orderSuccess}
          </div>
        </div>
      )}

      {/* 1. CINEMATIC HERO BANNER WITH 4 ROTATING VIDEOS */}
      <section className="relative w-full overflow-hidden bg-black text-white">
        {/* Background 4-Video Carousel Rotating in Loop */}
        <div className="relative h-[420px] sm:h-[500px] md:h-[580px] w-full">
          <video
            key={HERO_VIDEOS[currentVideoIdx].src}
            autoPlay
            loop={false}
            muted
            playsInline
            onEnded={nextVideo}
            className="h-full w-full object-cover object-center opacity-65 transition-opacity duration-700"
            src={HERO_VIDEOS[currentVideoIdx].src}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/35" />

          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-6 sm:px-12 w-full">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#fceae5] mb-4">
                  Thương hiệu ẩm thực trực tuyến
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.02] text-white">
                  food <br />
                  and groceries <br />
                  in a tap
                </h1>
                <p className="mt-4 text-base sm:text-xl font-medium text-stone-200 leading-relaxed max-w-lg drop-shadow">
                  Ẩm thực nóng sốt, thơm ngon chuẩn vị chỉ với một chạm. Giao tận nhà và văn phòng trong 20 - 30 phút.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <button
                    onClick={handleOrderClick}
                    className="rounded-full bg-white px-8 py-3.5 text-sm font-black text-stone-900 hover:bg-stone-100 transition-all shadow-lg hover:scale-105"
                  >
                    Khám phá thực đơn ngay →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Video Carousel Indicators & Controls */}
          <div className="absolute bottom-5 right-6 sm:right-12 z-20 flex items-center gap-3 rounded-full bg-black/50 backdrop-blur-md px-4 py-2 border border-white/20">
            <button
              onClick={prevVideo}
              className="text-stone-300 hover:text-white text-xs font-bold transition-colors"
              title="Video trước"
              type="button"
            >
              ◀
            </button>
            <div className="flex items-center gap-1.5">
              {HERO_VIDEOS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentVideoIdx(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentVideoIdx === idx
                      ? "w-7 bg-white shadow-xs"
                      : "w-2 bg-white/40 hover:bg-white/75"
                  }`}
                  title={item.title}
                  aria-label={`Chuyển tới video ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextVideo}
              className="text-stone-300 hover:text-white text-xs font-bold transition-colors"
              title="Video tiếp theo"
              type="button"
            >
              ▶
            </button>
            <span className="text-[11px] font-bold text-stone-300 border-l border-white/20 pl-2">
              {currentVideoIdx + 1}/4
            </span>
          </div>
        </div>
      </section>

      {/* 2. SUB-HERO INTRO STATEMENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-12 border-b border-stone-200">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-900 leading-tight">
            Chúng tôi ở đây để đồng hành cùng từng bữa ăn ngon miệng của bạn mỗi ngày.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed">
            Dành nhiều thời gian hơn cho những điều bạn yêu thích. Từ bữa trưa bận rộn tại văn phòng đến bữa tối ấm cúng cùng gia đình, FoodVD luôn đảm bảo từng phần ăn đến tay bạn đều nóng hổi, vệ sinh và trọn vẹn hương vị.
          </p>
        </div>
      </section>

      {/* 3. CONTINUOUS LOOPING SHORTS VIDEO SHOWCASE */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:px-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-700 border border-rose-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              Shorts Ẩm Thực Trực Tuyến
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              Khoảnh khắc nóng hổi từ gian bếp FoodVD
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Video ngắn chất lượng cao chuyển động lặp liên tục, ghi lại trọn vẹn hương vị hấp dẫn.
            </p>
          </div>
          <button
            onClick={handleOrderClick}
            className="self-start sm:self-auto rounded-full bg-stone-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-stone-800 transition-colors"
          >
            Đặt món ngay →
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              src: "/shorts/8064831-hd_1920_1080_24fps.mp4",
              title: "Mì Kéo Sợi Thượng Hạng",
              tag: "Nóng sốt",
            },
            {
              src: "/shorts/7008564-hd_1920_1080_25fps.mp4",
              title: "Nước Dùng Ninh 12 Giờ",
              tag: "Đặc biệt",
            },
            {
              src: "/shorts/13681662_1920_1080_50fps.mp4",
              title: "Thưởng Thức Tại Bàn",
              tag: "Chuẩn vị",
            },
            {
              src: "/shorts/3967242-uhd_4096_2160_24fps.mp4",
              title: "Nghệ Thuật Nấu Nướng",
              tag: "Đầu bếp",
            },
            {
              src: "/shorts/12691834-uhd_3840_2160_60fps.mp4",
              title: "Chế Biến Tươi Sạch",
              tag: "Vệ sinh 100%",
            },
          ].map((short, idx) => (
            <div
              key={idx}
              onClick={handleOrderClick}
              className="group relative cursor-pointer overflow-hidden rounded-2xl bg-stone-900 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  src={short.src}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                    {short.tag}
                  </span>
                </div>

                {/* Bottom Overlay Title & Action */}
                <div className="absolute bottom-0 inset-x-0 p-3.5 text-white">
                  <p className="text-xs font-black line-clamp-2 leading-snug drop-shadow-sm">
                    {short.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-bold text-amber-300">
                    <span>Xem món</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUR CORE BRAND PILLARS */}
      <section className="mx-auto max-w-7xl px-6 py-14 sm:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#842018]">
            Giá trị nổi bật của FoodVD
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Trải nghiệm ẩm thực thời đại mới
          </h2>
          <p className="mt-3 text-sm text-stone-600">
            Kết hợp tinh hoa ẩm thực truyền thống với công nghệ trực tuyến hiện đại.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-2xl mb-4 border border-amber-200">
              🍲
            </span>
            <h3 className="text-lg font-black text-stone-900">Món ăn chuẩn vị Việt</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Công thức chế biến tinh tế, nước dùng ninh xương 12 tiếng, nguyên liệu tươi nhập mới mỗi sáng từ các nông trại uy tín.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-2xl mb-4 border border-sky-200">
              🌿
            </span>
            <h3 className="text-lg font-black text-stone-900">Nguyên liệu tươi sạch 100%</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Nguồn gốc rau củ thịt cá rõ ràng, đạt chuẩn VietGAP, tuyển chọn tươi mới mỗi sáng và không dùng chất bảo quản.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl mb-4 border border-emerald-200">
              ⚡
            </span>
            <h3 className="text-lg font-black text-stone-900">Giao siêu tốc 25 phút</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Hệ thống đóng gói hộp giữ nhiệt chuyên dụng 3 lớp giúp món ăn luôn giữ được độ giòn, nóng sốt và thơm ngon nguyên bản.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 border border-stone-200 shadow-xs hover:shadow-md transition-all">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-2xl mb-4 border border-purple-200">
              💳
            </span>
            <h3 className="text-lg font-black text-stone-900">Thanh toán VietQR động</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              Quét mã QR tự động điền sẵn số tiền và mã đơn hàng, xác nhận tức thì mà không cần đối soát hay chuyển khoản thủ công.
            </p>
          </div>
        </div>
      </section>

      {/* 4. IMPRESSIVE METRICS / SOCIAL PROOF */}
      <section className="bg-white border-y border-stone-200 py-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-stone-900">50.000+</p>
              <p className="mt-1 text-xs font-bold text-stone-500 uppercase tracking-wider">Suất ăn đã phục vụ</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-stone-900">4.9 / 5.0 ⭐</p>
              <p className="mt-1 text-xs font-bold text-stone-500 uppercase tracking-wider">Hơn 1.200 đánh giá 5 sao</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-stone-900">22 Phút</p>
              <p className="mt-1 text-xs font-bold text-stone-500 uppercase tracking-wider">Thời gian giao trung bình</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-black text-stone-900">100%</p>
              <p className="mt-1 text-xs font-bold text-stone-500 uppercase tracking-wider">Chuẩn Vệ sinh An toàn Thực phẩm</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER (Guides user to Order Tab) */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-12">
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 text-white p-8 sm:p-14 shadow-xl">
          <div className="relative z-10 max-w-xl">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-[#fceae5]">
              Ưu đãi mở bán hôm nay
            </span>
            <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bắt đầu bữa ăn nóng hổi cùng FoodVD ngay bây giờ.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed">
              Nhập mã <strong>FOODVD20</strong> để được giảm ngay 20% cho đơn hàng đầu tiên từ 120.000đ.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={handleOrderClick}
                className="rounded-full bg-white px-8 py-3.5 text-sm font-black text-stone-900 hover:bg-stone-100 transition-all shadow-md hover:scale-105"
              >
                👉 Đi đến trang Đặt hàng
              </button>
              <button
                onClick={() => go("login")}
                className="rounded-full border border-white/40 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-all"
              >
                Đăng nhập tài khoản
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
