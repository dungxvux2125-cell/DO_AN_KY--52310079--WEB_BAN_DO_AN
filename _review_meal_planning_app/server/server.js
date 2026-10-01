import express from "express"
import cors from "cors"
import { connectDB, Dish, Order, User } from "./db.js"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    database: "MongoDB",
    connected: true,
    timestamp: new Date().toISOString(),
  })
})

// ================= AUTHENTICATION APIS =================

// Register new user
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Vui lòng nhập đầy đủ họ tên, email và mật khẩu." })
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() })
    if (existingUser) {
      return res.status(400).json({ error: "Email này đã được đăng ký trên hệ thống." })
    }

    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password, // In real app use bcrypt; plain/salted for student demo
      role: "customer",
    })

    await newUser.save()
    console.log(`[Auth] Đăng ký thành công người dùng mới: ${newUser.email}`)

    return res.status(201).json({
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error("[Auth] Lỗi đăng ký:", error)
    return res.status(500).json({ error: "Lỗi máy chủ khi đăng ký tài khoản." })
  }
})

// Login user
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: "Vui lòng nhập email và mật khẩu." })
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
      password: password,
    })

    if (!user) {
      return res.status(401).json({
        error: "Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại.",
      })
    }

    console.log(`[Auth] Người dùng đăng nhập thành công: ${user.email} (${user.role})`)

    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error("[Auth] Lỗi đăng nhập:", error)
    return res.status(500).json({ error: "Lỗi máy chủ khi đăng nhập." })
  }
})

// Get all users (Admin view)
app.get("/api/auth/users", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: "Không thể lấy danh sách người dùng." })
  }
})

// ================= DISHES APIS =================

// Get all dishes from MongoDB
app.get("/api/dishes", async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ id: 1 })
    res.json(dishes)
  } catch (error) {
    console.error("[Dishes] Lỗi lấy thực đơn:", error)
    res.status(500).json({ error: "Không thể lấy danh sách món ăn từ MongoDB." })
  }
})

// Add new dish (Admin)
app.post("/api/dishes", async (req, res) => {
  try {
    const { name, category, price, promoPrice, image, description, toppings } = req.body

    if (!name || !category || !price) {
      return res.status(400).json({ error: "Thiếu thông tin món ăn." })
    }

    // Auto increment id
    const highest = await Dish.findOne().sort({ id: -1 })
    const nextId = highest ? highest.id + 1 : 1

    const newDish = new Dish({
      id: nextId,
      name,
      category,
      price: Number(price),
      promoPrice: promoPrice ? Number(promoPrice) : undefined,
      image: image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=680&fit=crop&auto=format",
      description: description || "Món ăn tươi ngon đặc biệt tại FoodVD.",
      toppings: toppings || [],
      available: true,
      sold: 0,
    })

    await newDish.save()
    console.log(`[Dishes] Đã thêm món mới vào MongoDB: [${newDish.id}] ${newDish.name}`)
    res.status(201).json(newDish)
  } catch (error) {
    console.error("[Dishes] Lỗi thêm món:", error)
    res.status(500).json({ error: "Không thể lưu món mới vào MongoDB." })
  }
})

// Toggle dish availability (Admin)
app.patch("/api/dishes/:id/toggle", async (req, res) => {
  try {
    const dishId = Number(req.params.id)
    const dish = await Dish.findOne({ id: dishId })
    if (!dish) {
      return res.status(404).json({ error: "Không tìm thấy món ăn." })
    }

    dish.available = !dish.available
    await dish.save()
    console.log(`[Dishes] Bật/tắt trạng thái món [${dish.id}]: ${dish.available ? "Còn món" : "Hết món"}`)
    res.json(dish)
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật trạng thái món ăn." })
  }
})

// ================= ORDERS APIS =================

// Get all orders from MongoDB (for Admin dashboard & customer history)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ _id: -1 })
    res.json(orders)
  } catch (error) {
    console.error("[Orders] Lỗi lấy đơn hàng:", error)
    res.status(500).json({ error: "Không thể lấy danh sách đơn hàng từ MongoDB." })
  }
})

// Create new order (Customer checkout)
app.post("/api/orders", async (req, res) => {
  try {
    const { customerName, phoneMasked, addressMasked, email, payment, total, items } = req.body

    if (!customerName || !email || !items || !items.length) {
      return res.status(400).json({ error: "Thông tin đơn hàng không hợp lệ hoặc giỏ hàng trống." })
    }

    const orderId = `FVD-${String(Date.now()).slice(-6)}`
    const now = new Date().toLocaleString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })

    const newOrder = new Order({
      id: orderId,
      customerName,
      phoneMasked: phoneMasked || "*******000",
      addressMasked: addressMasked || "Địa chỉ nhận hàng",
      email,
      payment: payment || "VietQR",
      total: Number(total),
      status: "Chờ duyệt",
      items,
      createdAt: now,
    })

    await newOrder.save()
    console.log(`[Orders] 🛒 ĐÃ LƯU ĐƠN HÀNG VÀO MONGODB THÀNH CÔNG: Mã ${newOrder.id} - Tổng tiền: ${newOrder.total}đ - Khách: ${newOrder.customerName}`)

    // Update dish sold counts
    for (const item of items) {
      if (item.dishId) {
        await Dish.updateOne({ id: item.dishId }, { $inc: { sold: item.quantity || 1 } })
      }
    }

    res.status(201).json(newOrder)
  } catch (error) {
    console.error("[Orders] Lỗi tạo đơn hàng:", error)
    res.status(500).json({ error: "Không thể tạo đơn hàng vào cơ sở dữ liệu MongoDB." })
  }
})

// Update order status (Admin)
app.patch("/api/orders/:id/status", async (req, res) => {
  try {
    const orderId = req.params.id
    const { status } = req.body

    const validStatuses = ["Chờ duyệt", "Đang chuẩn bị", "Đang giao", "Hoàn tất", "Đã hủy"]
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Trạng thái đơn hàng không hợp lệ." })
    }

    const order = await Order.findOne({ id: orderId })
    if (!order) {
      return res.status(404).json({ error: "Không tìm thấy đơn hàng trong MongoDB." })
    }

    order.status = status
    await order.save()
    console.log(`[Orders] Cập nhật trạng thái đơn [${order.id}]: ${order.status}`)
    res.json(order)
  } catch (error) {
    res.status(500).json({ error: "Không thể cập nhật trạng thái đơn hàng." })
  }
})

// Start server
async function startServer() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`====================================================`)
      console.log(`🚀 FoodVD Backend API đang chạy tại: http://localhost:${PORT}`)
      console.log(`🗄️ Đã kết nối cơ sở dữ liệu MongoDB: mongodb://127.0.0.1:27017/foodvd`)
      console.log(`====================================================`)
    })
  } catch (err) {
    console.error("Không thể khởi động server do lỗi kết nối cơ sở dữ liệu:", err)
    process.exit(1)
  }
}

startServer()

