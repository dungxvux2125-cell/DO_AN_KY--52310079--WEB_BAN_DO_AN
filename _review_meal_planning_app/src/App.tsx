import { useEffect, useMemo, useState } from "react"
import { Header } from "./components/ThanhDauTrang"
import { SiteFooter } from "./components/ChanTrang"
import {
  ADMIN_ACCOUNT,
  CUSTOMER_ACCOUNT,
  STAFF_ACCOUNT,
  initialDishes,
  initialOrders,
  initialSalaries,
  initialTimekeeping,
  initialVouchers,
  getToppingPrice,
} from "./data"
import { AuthPage } from "./pages/TrangTaiKhoan"
import { DeliveryPage } from "./pages/TrangGiaoHang"
import { HomePage } from "./pages/TrangChu"
import { ManagementPage, type ManagementView } from "./pages/TrangQuanLy"
import { OrderPage } from "./pages/TrangDatHang"
import { PaymentPage } from "./pages/TrangThanhToan"
import type { CartDetail, CartItem, Category, Dish, Order, OrderStatus, Page, PaymentMethod, Role, StaffSalary, TimekeepingRecord, User, Voucher } from "./types"
import { maskAddress, maskPhone } from "./utils"
import {
  apiAddDish,
  apiCreateOrder,
  apiGetDishes,
  apiGetOrders,
  apiLogin,
  apiRegister,
  apiUpdateOrderStatus,
  checkServerHealth,
} from "./services/api"

const statusFlow: OrderStatus[] = ["Chờ duyệt", "Đang chuẩn bị", "Đang giao", "Hoàn tất"]

function App() {
  const [page, setPage] = useState<Page>("home")
  const [user, setUser] = useState<User | null>(null)
  const [isMongoConnected, setIsMongoConnected] = useState(false)
  const [registeredUser, setRegisteredUser] = useState({
    name: CUSTOMER_ACCOUNT.name,
    email: CUSTOMER_ACCOUNT.email,
    password: CUSTOMER_ACCOUNT.password,
  })
  const [loginForm, setLoginForm] = useState({
    email: CUSTOMER_ACCOUNT.email,
    password: CUSTOMER_ACCOUNT.password,
  })
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [authMessage, setAuthMessage] = useState("")
  const [dishes, setDishes] = useState<Dish[]>(initialDishes)
  const [category, setCategory] = useState<Category>("Tất cả")
  const [query, setQuery] = useState("")
  const [maxPrice, setMaxPrice] = useState(240000)
  const [cart, setCart] = useState<CartItem[]>([])
  const [voucherInput, setVoucherInput] = useState("")
  const [appliedVoucherCode, setAppliedVoucherCode] = useState("")
  const [voucherMessage, setVoucherMessage] = useState("")
  const [payment, setPayment] = useState<PaymentMethod>("VietQR")
  const [managementView, setManagementView] = useState<ManagementView>("menu")
  const [salaries, setSalaries] = useState<StaffSalary[]>(initialSalaries)
  const [timekeeping, setTimekeeping] = useState<TimekeepingRecord[]>(initialTimekeeping)
  const [vouchersList, setVouchersList] = useState<Voucher[]>(initialVouchers)
  const [orderSuccess, setOrderSuccess] = useState("")
  const [form, setForm] = useState({
    name: "",
    phone: "0901234567",
    email: "",
    address: "136 Xuân Thủy, Cầu Giấy, Hà Nội",
    note: "Ít hành, giao giờ trưa.",
  })
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [newDish, setNewDish] = useState({
    name: "",
    category: "Món chính" as Exclude<Category, "Tất cả">,
    price: "55000",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=900&h=680&fit=crop&auto=format",
  })

  // Sync data with MongoDB on startup
  useEffect(() => {
    async function initMongoDB() {
      const connected = await checkServerHealth()
      setIsMongoConnected(connected)
      if (connected) {
        const dbDishes = await apiGetDishes()
        if (dbDishes && dbDishes.length > 0) {
          setDishes(dbDishes)
        }
        const dbOrders = await apiGetOrders()
        if (dbOrders && dbOrders.length > 0) {
          setOrders(dbOrders)
        }
      }
    }
    initMongoDB()
  }, [])

  const filteredDishes = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    return dishes.filter((dish) => {
      const price = dish.promoPrice ?? dish.price
      const matchCategory = category === "Tất cả" || dish.category === category
      const matchQuery =
        !normalized ||
        dish.name.toLowerCase().includes(normalized) ||
        dish.description.toLowerCase().includes(normalized)
      return matchCategory && matchQuery && price <= maxPrice
    })
  }, [category, dishes, maxPrice, query])

  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const dish = dishes.find((candidate) => candidate.id === item.dishId)
          if (!dish) return null
          const toppingsTotal = item.toppings.reduce((sum, top) => sum + getToppingPrice(top), 0)
          const unitPrice = (dish.promoPrice ?? dish.price) + toppingsTotal
          return { ...item, dish, unitPrice, lineTotal: unitPrice * item.quantity }
        })
        .filter((item): item is CartDetail => Boolean(item)),
    [cart, dishes],
  )

  const subtotal = cartDetails.reduce((sum, item) => sum + item.lineTotal, 0)
  const activeVoucher = vouchersList.find((voucher) => voucher.code === appliedVoucherCode && voucher.active)
  const discount =
    activeVoucher && subtotal >= activeVoucher.min
      ? activeVoucher.type === "percent"
        ? Math.round((subtotal * activeVoucher.value) / 100)
        : activeVoucher.value
      : 0
  const shippingFee = subtotal >= 150000 || subtotal === 0 ? 0 : 15000
  const total = Math.max(subtotal - discount + shippingFee, 0)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const revenue = useMemo(
    () =>
      orders
        .filter((order) => order.status !== "Đã hủy")
        .reduce((sum, order) => sum + order.total, 0),
    [orders],
  )

  const cancelled = useMemo(
    () => orders.filter((order) => order.status === "Đã hủy").length,
    [orders],
  )

  const bestSeller = useMemo(() => {
    return dishes.reduce((top, dish) => (dish.sold > top.sold ? dish : top), dishes[0])
    const top = dishes.reduce((acc, dish) => (dish.sold > acc.sold ? dish : acc), dishes[0])
    return top ? top.name : "Phở bò đặc biệt"
  }, [dishes])

  function go(nextPage: Page) {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  async function handleLogin() {
    setAuthMessage("")
    // 1. Try real MongoDB backend first
    const res = await apiLogin(loginForm.email, loginForm.password)
    if (res.success && res.user) {
      setUser(res.user)
      if (res.user.role === "customer") {
        setForm((current) => ({ ...current, name: res.user!.name, email: res.user!.email }))
        if (cart.length > 0) {
          go("payment")
          return
        }
        go("order")
        return
      }
      if (res.user.role === "admin") {
        setManagementView("menu")
        go("management")
        return
      }
      setManagementView("orders")
      go("management")
      return
    }

    // 2. Fallback to local demo accounts
    const email = loginForm.email.trim().toLowerCase()
    const accounts: Array<{ email: string; password: string; name: string; role: Role }> = [
      { ...CUSTOMER_ACCOUNT, role: "customer" },
      { ...STAFF_ACCOUNT, role: "staff" },
      { ...ADMIN_ACCOUNT, role: "admin" },
      { ...registeredUser, role: "customer" },
    ]
    const match = accounts.find(
      (account) => account.email.toLowerCase() === email && account.password === loginForm.password,
    )

    if (!match) {
      setAuthMessage(res.error || "Sai tài khoản hoặc mật khẩu. Bạn có thể dùng tài khoản demo bên trái.")
      setAuthMessage(res.error || "Sai tài khoản hoặc mật khẩu. Bạn có thể dùng tài khoản demo bên dưới.")
      return
    }

    setUser({ name: match.name, email: match.email, role: match.role })
    setAuthMessage("")

    if (match.role === "customer") {
      setForm((current) => ({ ...current, name: match.name, email: match.email }))
      if (cart.length > 0) {
        go("payment")
        return
      }
      go("order")
      return
    }

    if (match.role === "admin") {
      setManagementView("menu")
      go("management")
      return
    }

    setManagementView("orders")
    go("management")
  }

  async function handleRegister() {
    if (!registerForm.name || !registerForm.email || !registerForm.password) {
      setAuthMessage("Vui lòng nhập đủ họ tên, email và mật khẩu.")
      return
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setAuthMessage("Mật khẩu xác nhận chưa khớp.")
      return
    }

    // 1. Try real MongoDB backend first
    const res = await apiRegister(registerForm.name, registerForm.email, registerForm.password)
    if (res.success && res.user) {
      setUser(res.user)
      setForm((current) => ({ ...current, name: res.user!.name, email: res.user!.email }))
      setAuthMessage("")
      if (cart.length > 0) {
        go("payment")
        return
      }
      go("order")
      return
    }

    // 2. Fallback to local registration
    setRegisteredUser({
      name: registerForm.name,
      email: registerForm.email,
      password: registerForm.password,
    })
    setUser({ name: registerForm.name, email: registerForm.email, role: "customer" })
    setForm((current) => ({ ...current, name: registerForm.name, email: registerForm.email }))
    setAuthMessage("")
    if (cart.length > 0) {
      go("payment")
      return
    }
    go("order")
  }

  function addToCart(dish: Dish, toppingOrToppings?: string | string[]) {
    if (!dish.available) return
    setOrderSuccess("")
    const selectedToppings = Array.isArray(toppingOrToppings)
      ? toppingOrToppings
      : toppingOrToppings
      ? [toppingOrToppings]
      : []
    const toppingKey = [...selectedToppings].sort().join("|")
    setCart((current) => {
      const match = current.find(
        (item) => item.dishId === dish.id && [...item.toppings].sort().join("|") === toppingKey,
      )
      if (match) {
        return current.map((item) =>
          item === match ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { dishId: dish.id, quantity: 1, toppings: selectedToppings }]
    })
  }

  function changeQuantity(index: number, delta: number) {
    setCart((current) =>
      current
        .map((item, itemIndex) =>
          itemIndex === index ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function applyVoucher() {
    const normalized = voucherInput.trim().toUpperCase()
    const voucher = vouchersList.find((item) => item.code === normalized && item.active)

    if (!normalized) {
      setAppliedVoucherCode("")
      setVoucherMessage("Vui lòng nhập mã giảm giá trước khi áp dụng.")
      return
    }

    if (!voucher) {
      setAppliedVoucherCode("")
      setVoucherMessage("Mã giảm giá không hợp lệ, đơn hàng chưa được trừ tiền.")
      return
    }

    if (subtotal < voucher.min) {
      setAppliedVoucherCode("")
      setVoucherMessage(`Mã ${voucher.code} cần đơn tối thiểu ${voucher.min.toLocaleString("vi-VN")} đ.`)
      return
    }

    setAppliedVoucherCode(voucher.code)
    setVoucherMessage(`Đã áp dụng ${voucher.code}: ${voucher.label}.`)
  }

  async function placeOrder() {
    if (!user) {
      setAuthMessage("Vui lòng đăng nhập hoặc đăng ký tài khoản trước khi hoàn tất đặt hàng.")
      go("login")
      return
    }

    if (!cart.length || !form.name || !form.phone || !form.address || !form.email) return

    // 1. Try creating order in MongoDB
    const apiOrder = await apiCreateOrder({
      customerName: form.name,
      phoneMasked: maskPhone(form.phone),
      addressMasked: maskAddress(form.address),
      email: form.email,
      payment,
      total,
      items: cart,
    })

    const createdOrder: Order = apiOrder || {
      id: `FVD-${String(Date.now()).slice(-6)}`,
      customerName: form.name,
      phoneMasked: maskPhone(form.phone),
      addressMasked: maskAddress(form.address),
      email: form.email,
      payment,
      total,
      status: "Chờ duyệt",
      createdAt: new Date().toLocaleString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
      items: cart,
    }

    setOrders((current) => [createdOrder, ...current])
    setCart([])
    setOrderSuccess(
      `Đặt hàng thành công. Mã đơn của bạn là ${createdOrder.id}. Dữ liệu đã lưu vào MongoDB!`,
    )
    go("home")
  }

  async function advanceOrder(id: string) {
    const target = orders.find((o) => o.id === id)
    if (!target) return
    const currentIndex = statusFlow.indexOf(target.status)
    const nextStatus = statusFlow[currentIndex + 1] ?? "Hoàn tất"

    // Update in MongoDB
    await apiUpdateOrderStatus(id, nextStatus)

    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id || order.status === "Hoàn tất" || order.status === "Đã hủy") {
          return order
        }
        return { ...order, status: nextStatus }
      }),
    )
  }

  async function addDishFromAdmin() {
    const price = Number(newDish.price)
    if (!newDish.name.trim() || Number.isNaN(price) || price <= 0) return

    // 1. Try saving to MongoDB
    const createdDish = await apiAddDish({
      name: newDish.name,
      category: newDish.category,
      price,
      image: newDish.image,
      description: "Món mới được thêm từ cổng quản lý FoodVD.",
      toppings: ["Thêm phần", "Ít cay", "Không hành"],
    })

    if (createdDish) {
      setDishes((current) => [createdDish, ...current])
    } else {
      setDishes((current) => [
        {
          id: Math.max(...current.map((dish) => dish.id), 0) + 1,
          name: newDish.name,
          category: newDish.category,
          price,
          image: newDish.image,
          description: "Món mới được thêm từ cổng quản lý FoodVD.",
          toppings: ["Thêm phần", "Ít cay", "Không hành"],
          available: true,
          sold: 0,
        },
        ...current,
      ])
    }

    setNewDish({ ...newDish, name: "" })
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#fbf7ef] text-[#211a16]">
      <div className="site-ambient" aria-hidden="true" />
      <Header
        page={page}
        go={go}
        cartCount={cartCount}
        user={user}
        setUser={setUser}
        managementView={managementView}
        setManagementView={setManagementView}
      />

      {page === "home" && (
        <HomePage go={go} orderSuccess={orderSuccess} featuredDishes={dishes.slice(0, 4)} />
      )}

      {page === "order" && (
        <OrderPage
          query={query}
          setQuery={setQuery}
          category={category}
          setCategory={setCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          filteredDishes={filteredDishes}
          addToCart={addToCart}
          cartDetails={cartDetails}
          changeQuantity={changeQuantity}
          subtotal={subtotal}
          go={go}
        />
      )}

      {page === "delivery" && (
        <DeliveryPage
          user={user}
          form={form}
          setForm={setForm}
          subtotal={subtotal}
          discount={discount}
          shippingFee={shippingFee}
          total={total}
          hasCart={Boolean(cart.length)}
          go={go}
        />
      )}

      {page === "payment" && (
        <PaymentPage
          user={user}
          go={go}
          payment={payment}
          setPayment={setPayment}
          voucherInput={voucherInput}
          setVoucherInput={setVoucherInput}
          appliedVoucherCode={appliedVoucherCode}
          voucherMessage={voucherMessage}
          applyVoucher={applyVoucher}
          phone={form.phone}
          cartDetails={cartDetails}
          subtotal={subtotal}
          discount={discount}
          shippingFee={shippingFee}
          total={total}
          hasCart={Boolean(cart.length)}
          placeOrder={placeOrder}
        />
      )}

      {(page === "login" || page === "register") && (
        <AuthPage
          user={user}
          setUser={setUser}
          orders={orders}
          dishes={dishes}
          onReorder={(items) => {
            items.forEach((item) => {
              const dish = dishes.find((d) => d.id === item.dishId)
              if (dish) addToCart(dish, item.toppings)
            })
            go("order")
          }}
          mode={page}
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          authMessage={authMessage}
          onLogin={handleLogin}
          onRegister={handleRegister}
          go={go}
        />
      )}

      {page === "management" && (
        <ManagementPage
          user={user}
          goLogin={() => go("login")}
          view={managementView}
          setView={setManagementView}
          orders={orders}
          dishes={dishes}
          revenue={revenue}
          cancelled={cancelled}
          bestSeller={bestSeller}
          salaries={salaries}
          setSalaries={setSalaries}
          timekeeping={timekeeping}
          setTimekeeping={setTimekeeping}
          vouchers={vouchersList}
          setVouchers={setVouchersList}
          newDish={newDish}
          setNewDish={setNewDish}
          setDishes={setDishes}
          setOrders={setOrders}
          advanceOrder={advanceOrder}
          addDishFromAdmin={addDishFromAdmin}
        />
      )}

      {user?.role !== "admin" && user?.role !== "staff" && <SiteFooter />}
    </main>
  )
}

export default App
