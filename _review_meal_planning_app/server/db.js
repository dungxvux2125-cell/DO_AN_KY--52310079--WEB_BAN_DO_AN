import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/foodvd"

// 1. User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["customer", "staff", "admin"], default: "customer" },
  createdAt: { type: Date, default: Date.now },
})

export const User = mongoose.model("User", userSchema)

// 2. Dish Schema
const dishSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  promoPrice: { type: Number },
  image: { type: String, required: true },
  model3d: { type: String },
  description: { type: String, default: "" },
  toppings: [{ type: String }],
  available: { type: Boolean, default: true },
  sold: { type: Number, default: 0 },
})

export const Dish = mongoose.model("Dish", dishSchema)

// 3. Order Schema
const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phoneMasked: { type: String, required: true },
  addressMasked: { type: String, required: true },
  email: { type: String, required: true },
  payment: { type: String, required: true, enum: ["COD", "VietQR"] },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Chờ duyệt", "Đang chuẩn bị", "Đang giao", "Hoàn tất", "Đã hủy"],
    default: "Chờ duyệt",
  },
  items: [
    {
      dishId: Number,
      quantity: Number,
      toppings: [String],
    },
  ],
  createdAt: { type: String, required: true },
})

export const Order = mongoose.model("Order", orderSchema)

// Initial Seed Data to populate MongoDB on first startup
const INITIAL_DISHES = [
  {
    id: 1,
    name: "Phở bò đặc biệt",
    category: "Món chính",
    price: 75000,
    promoPrice: 69000,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&h=680&fit=crop&auto=format",
    description: "Nước dùng bò hầm, bánh phở mềm, rau thơm và thịt tái nạm.",
    toppings: ["Trứng chần", "Thêm bò", "Quẩy"],
    available: true,
    sold: 184,
  },
  {
    id: 2,
    name: "Bún chả Hà Nội",
    category: "Món chính",
    price: 65000,
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&h=680&fit=crop&auto=format",
    description: "Chả nướng than, bún tươi, nước mắm chua ngọt và rau sống.",
    toppings: ["Nem cua bể", "Thêm chả", "Bún thêm"],
    available: true,
    sold: 151,
  },
  {
    id: 3,
    name: "Cơm tấm sườn bì",
    category: "Món chính",
    price: 59000,
    promoPrice: 54000,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&h=680&fit=crop&auto=format",
    description: "Sườn nướng mật ong, bì, chả trứng và nước mắm pha.",
    toppings: ["Ốp la", "Thêm sườn", "Canh rong biển"],
    available: true,
    sold: 132,
  },
  {
    id: 4,
    name: "Bánh mì thịt nướng",
    category: "Ăn nhẹ",
    price: 35000,
    image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=900&h=680&fit=crop&auto=format",
    description: "Bánh mì giòn, thịt nướng, pate, đồ chua và rau mùi.",
    toppings: ["Thêm pate", "Phô mai", "Trứng"],
    available: true,
    sold: 203,
  },
  {
    id: 5,
    name: "Gỏi cuốn tôm thịt",
    category: "Ăn nhẹ",
    price: 45000,
    image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=900&h=680&fit=crop&auto=format",
    description: "Cuốn tươi với tôm, thịt, bún, rau và sốt đậu phộng.",
    toppings: ["Thêm tôm", "Sốt cay", "Rau thêm"],
    available: true,
    sold: 88,
  },
  {
    id: 6,
    name: "Combo văn phòng",
    category: "Combo",
    price: 99000,
    promoPrice: 89000,
    image: "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&h=680&fit=crop&auto=format",
    description: "Một món chính, một đồ uống và phần tráng miệng trong ngày.",
    toppings: ["Đổi nước", "Thêm soup", "Ít cay"],
    available: true,
    sold: 97,
  },
  {
    id: 7,
    name: "Trà đào cam sả",
    category: "Đồ uống",
    price: 29000,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&h=680&fit=crop&auto=format",
    description: "Trà đào mát, cam tươi và hương sả nhẹ.",
    toppings: ["Ít đá", "Ít đường", "Thêm đào"],
    available: true,
    sold: 176,
  },
  {
    id: 100,
    name: "Diet Soda Zero Sugar (3D)",
    category: "Đồ uống",
    price: 35000,
    promoPrice: 29000,
    image: "https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Green%20Soda.png",
    model3d: "https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/deit_soda2.glb",
    description: "Nước ngọt có ga 0 đường, vị thanh mát sảng khoái với mô hình 3D tương tác.",
    toppings: ["Vị Classic", "Vị Zero Lime", "Thêm đá lạnh"],
    available: true,
    sold: 285,
  },
  {
    id: 8,
    name: "Lẩu hải sản mini",
    category: "Combo",
    price: 149000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&h=680&fit=crop&auto=format",
    description: "Nước lẩu chua cay, tôm, mực, rau và mì dùng cho hai người.",
    toppings: ["Thêm tôm", "Thêm mì", "Nước lẩu thêm"],
    available: false,
    sold: 64,
  },
  {
    id: 9,
    name: "Mì trộn gà xé",
    category: "Món chính",
    price: 52000,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=900&h=680&fit=crop&auto=format",
    description: "Mì dai, gà xé mềm, sốt mè rang và rau củ giòn.",
    toppings: ["Thêm gà", "Trứng lòng đào", "Sốt cay"],
    available: true,
    sold: 119,
  },
  {
    id: 10,
    name: "Cơm gà sốt teriyaki",
    category: "Món chính",
    price: 68000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&h=680&fit=crop&auto=format",
    description: "Gà áp chảo, cơm nóng, rau củ và sốt teriyaki đậm vị.",
    toppings: ["Thêm gà", "Kim chi", "Canh miso"],
    available: true,
    sold: 144,
  },
  {
    id: 11,
    name: "Salad cá ngừ",
    category: "Ăn nhẹ",
    price: 49000,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=680&fit=crop&auto=format",
    description: "Rau xanh, cá ngừ, trứng, bắp ngọt và sốt mè.",
    toppings: ["Thêm trứng", "Thêm cá", "Sốt ít béo"],
    available: true,
    sold: 75,
  },
  {
    id: 12,
    name: "Khoai tây phô mai",
    category: "Ăn nhẹ",
    price: 39000,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&h=680&fit=crop&auto=format",
    description: "Khoai chiên giòn phủ phô mai, dùng kèm sốt cay nhẹ.",
    toppings: ["Thêm phô mai", "Sốt BBQ", "Bột rong biển"],
    available: true,
    sold: 112,
  },
  {
    id: 13,
    name: "Sữa chua trái cây",
    category: "Đồ uống",
    price: 36000,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&h=680&fit=crop&auto=format",
    description: "Sữa chua mát lạnh, trái cây theo mùa và hạt granola.",
    toppings: ["Thêm granola", "Ít đường", "Thêm dâu"],
    available: true,
    sold: 90,
  },
  {
    id: 14,
    name: "Cà phê sữa đá",
    category: "Đồ uống",
    price: 25000,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&h=680&fit=crop&auto=format",
    description: "Cà phê rang đậm, sữa đặc và đá viên.",
    toppings: ["Ít sữa", "Thêm shot", "Ít đá"],
    available: true,
    sold: 210,
  },
  {
    id: 15,
    name: "Combo gia đình",
    category: "Combo",
    price: 229000,
    promoPrice: 199000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&h=680&fit=crop&auto=format",
    description: "Ba món chính, hai đồ uống và một phần ăn nhẹ.",
    toppings: ["Đổi món chính", "Thêm nước", "Ít cay"],
    available: true,
    sold: 58,
  },
  {
    id: 16,
    name: "Burger bò phô mai",
    category: "Món chính",
    price: 79000,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=680&fit=crop&auto=format",
    description: "Bò nướng, phô mai tan chảy, rau xà lách và sốt đặc biệt.",
    toppings: ["Thêm phô mai", "Thêm bò", "Khoai ăn kèm"],
    available: true,
    sold: 127,
  },
]

const INITIAL_USERS = [
  {
    name: "Quản trị viên FoodVD",
    email: "admin@foodvd.vn",
    password: "FoodVD@2026",
    role: "admin",
  },
  {
    name: "Nhân viên vận hành",
    email: "nhanvien@foodvd.vn",
    password: "NhanVien@2026",
    role: "staff",
  },
  {
    name: "Vũ Dũng",
    email: "dung.foodvd@example.com",
    password: "123456",
    role: "customer",
  },
]

const INITIAL_ORDERS = [
  {
    id: "FVD-260901",
    customerName: "Minh Anh",
    phoneMasked: "*******321",
    addressMasked: "18 Lê Lợi...Q.1",
    email: "minhanh@example.com",
    payment: "VietQR",
    total: 178000,
    status: "Đang chuẩn bị",
    createdAt: "2026-09-09 10:18",
    items: [
      { dishId: 1, quantity: 2, toppings: ["Quẩy"] },
      { dishId: 7, quantity: 1, toppings: ["Ít đá"] },
    ],
  },
  {
    id: "FVD-260902",
    customerName: "Phương Thảo",
    phoneMasked: "*******889",
    addressMasked: "43 CMT8...Q.3",
    email: "thaop@example.com",
    payment: "COD",
    total: 124000,
    status: "Hoàn tất",
    createdAt: "2026-09-09 09:42",
    items: [
      { dishId: 2, quantity: 1, toppings: ["Nem cua bể"] },
      { dishId: 4, quantity: 1, toppings: ["Trứng"] },
    ],
  },
]

export async function connectDB() {
  try {
    console.log(`[MongoDB] Đang kết nối tới ${MONGODB_URI}...`)
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log("[MongoDB] ✅ Kết nối thành công cơ sở dữ liệu FoodVD!")

    // Seed initial dishes if empty
    const dishCount = await Dish.countDocuments()
    if (dishCount === 0) {
      await Dish.insertMany(INITIAL_DISHES)
      console.log(`[MongoDB] 🌱 Đã nạp thành công ${INITIAL_DISHES.length} món ăn ban đầu.`)
    }

    // Seed initial users if empty
    const userCount = await User.countDocuments()
    if (userCount === 0) {
      await User.insertMany(INITIAL_USERS)
      console.log(`[MongoDB] 🌱 Đã nạp thành công ${INITIAL_USERS.length} tài khoản mẫu (Admin, Staff, Customer).`)
    }

    // Seed initial orders if empty
    const orderCount = await Order.countDocuments()
    if (orderCount === 0) {
      await Order.insertMany(INITIAL_ORDERS)
      console.log(`[MongoDB] 🌱 Đã nạp thành công ${INITIAL_ORDERS.length} đơn hàng mẫu.`)
    }
  } catch (error) {
    console.error("[MongoDB] ❌ Lỗi kết nối MongoDB:", error.message)
    throw error
  }
}

