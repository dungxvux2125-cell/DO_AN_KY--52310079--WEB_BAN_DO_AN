import type { Category, Dish, Order, Review, StaffSalary, User } from "./types"

export const ADMIN_ACCOUNT = {
  email: "admin@foodvd.vn",
  password: "FoodVD@2026",
  name: "Quản trị viên FoodVD",
} as const

export const STAFF_ACCOUNT = {
  email: "nhanvien@foodvd.vn",
  password: "NhanVien@2026",
  name: "Nhân viên vận hành",
} as const

export const CUSTOMER_ACCOUNT = {
  email: "dung.foodvd@example.com",
  password: "123456",
  name: "Vũ Dũng",
} as const

export const categoryOptions: Category[] = [
  "Tất cả",
  "Ưu đãi",
  "Món Việt",
  "Món chính",
  "Hoa quả",
  "Đồ uống",
  "Ăn nhẹ",
  "Tráng miệng",
  "Healthy & Ăn kiêng",
  "Gia vị & Đồ khô",
  "Combo",
]

export const vouchers = [
  { code: "FOODVD20", label: "Giảm 20%", type: "percent", value: 20, min: 120000 },
  { code: "FREESHIP", label: "Giảm 15.000đ", type: "fixed", value: 15000, min: 80000 },
] as const

export const TOPPING_PRICES: Record<string, number> = {
  "Trứng chần": 8000,
  "Thêm bò": 25000,
  "Quẩy": 5000,
  "Nem cua bể": 15000,
  "Thêm chả": 15000,
  "Bún thêm": 7000,
  "Ốp la": 8000,
  "Thêm sườn": 25000,
  "Canh rong biển": 10000,
  "Thêm pate": 8000,
  "Phô mai": 10000,
  "Trứng": 8000,
  "Thêm tôm": 18000,
  "Sốt cay": 5000,
  "Rau thêm": 5000,
  "Đổi nước": 10000,
  "Thêm soup": 12000,
  "Ít cay": 0,
  "Ít đá": 0,
  "Ít đường": 0,
  "Thêm đào": 10000,
  "Vị Classic": 0,
  "Vị Zero Lime": 0,
  "Thêm đá lạnh": 0,
  "Thêm mì": 10000,
  "Nước lẩu thêm": 15000,
  "Thêm gà": 18000,
  "Trứng lòng đào": 8000,
  "Kim chi": 8000,
  "Canh miso": 10000,
  "Thêm trứng": 8000,
  "Thêm cá": 15000,
  "Sốt ít béo": 5000,
  "Thêm phô mai": 10000,
  "Sốt BBQ": 5000,
  "Bột rong biển": 5000,
  "Thêm granola": 10000,
  "Thêm dâu": 12000,
  "Ít sữa": 0,
  "Thêm shot": 10000,
  "Đổi món chính": 15000,
  "Khoai ăn kèm": 12000,
  "Thêm phần": 15000,
  "Không hành": 0,
}

export function getToppingPrice(name: string): number {
  return TOPPING_PRICES[name] ?? 8000
}

export const initialDishes: Dish[] = [
  {
    "id": 1,
    "name": "Phở bò tái nạm đặc biệt",
    "category": "Món Việt",
    "price": 75000,
    "promoPrice": 69000,
    "image": "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=900&h=680&fit=crop&auto=format",
    "description": "Nước dùng bò hầm thảo mộc 12 giờ thơm ngào ngạt hoa hồi thảo quả, bánh phở mềm dẻo, bò tươi tái nạm ngọt thịt.",
    "ingredients": [
      "Bánh phở tươi tráng thủ công làm từ 100% gạo tẻ thơm",
      "Thịt thăn bò tái tươi thái mỏng mềm ngọt tự nhiên",
      "Nạm gầu bò giòn thơm, thái lát vừa ăn",
      "Nước dùng hầm xương ống bò 12 tiếng cùng quế, hoa hồi, thảo quả, gừng nướng",
      "Hành hoa, hành tây thái mỏng, ngò gai và rau húng quế sạch"
    ],
    "nutritionInfo": {
      "portion": "1 tô lớn (khoảng 650g)",
      "calories": "550 kcal",
      "protein": "34g protein",
      "origin": "Hà Nội (Chuẩn vị gia truyền)",
      "preservation": "Dùng nóng ngay khi nhận món"
    },
    "toppings": [
      "Trứng chần",
      "Thêm bò",
      "Quẩy"
    ],
    "available": true,
    "sold": 184
  },
  {
    "id": 2,
    "name": "Bún chả que tre Hà Nội",
    "category": "Món Việt",
    "price": 65000,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&h=680&fit=crop&auto=format",
    "description": "Chả viên và chả miếng nướng than hoa thơm nức mũi, bún tươi Phú Đô, nước mắm đu đủ cà rốt và rau thơm.",
    "ingredients": [
      "Chả thịt ba chỉ thái mỏng ướp hành củ, nước mắm cốt",
      "Chả viên nạc vai băm nhuyễn ướp hạt tiêu, kẹp que tre nướng than",
      "Bún sợi mỏng Phú Đô dẻo mềm",
      "Nước mắm pha tỏi ớt, giấm gạo thanh, kèm dưa góp su hào cà rốt",
      "Rau thơm tươi sạch: Tía tô, kinh giới, xà lách, rau mùi"
    ],
    "nutritionInfo": {
      "portion": "1 phần bún chả đầy đặn (550g)",
      "calories": "610 kcal",
      "protein": "28g protein",
      "origin": "Hà Nội",
      "preservation": "Dùng nóng, nhúng bún vào tô nước chấm"
    },
    "toppings": [
      "Nem cua bể",
      "Thêm chả",
      "Bún thêm"
    ],
    "available": true,
    "sold": 151
  },
  {
    "id": 3,
    "name": "Cơm tấm sườn bì chả Sài Gòn",
    "category": "Món Việt",
    "price": 60000,
    "promoPrice": 55000,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=680&fit=crop&auto=format",
    "description": "Cơm tấm dẻo thơm, sườn heo ướp mật ong nướng vàng ươm, bì heo trộn thính gạo, chả trứng và mỡ hành béo ngậy.",
    "ingredients": [
      "Gạo tấm đầu mùa nấu chín tới tơi xốp thơm lừng",
      "Sườn heo cốt lết dày dặn ướp mật ong, nước mắm, tỏi sả nướng than",
      "Bì heo thái sợi chỉ giòn dai trộn thính gạo rang vàng",
      "Chả trứng hấp thịt băm mộc nhĩ nấm hương béo bùi",
      "Mỡ hành lá tươi phi thơm ngậy, tóp mỡ giòn",
      "Nước mắm kẹo chua ngọt tỏi ớt kèm đồ chua củ cải trắng"
    ],
    "nutritionInfo": {
      "portion": "1 đĩa cơm tấm suất lớn (600g)",
      "calories": "680 kcal",
      "protein": "36g protein",
      "origin": "Sài Gòn",
      "preservation": "Dùng nóng, rưới nước mắm đều lên cơm khi ăn"
    },
    "toppings": [
      "Ốp la",
      "Thêm sườn",
      "Canh rong biển"
    ],
    "available": true,
    "sold": 132
  },
  {
    "id": 4,
    "name": "Bánh mì pate thịt nướng giòn rụm",
    "category": "Món Việt",
    "price": 35000,
    "image": "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=900&h=680&fit=crop&auto=format",
    "description": "Bánh mì vỏ giòn ruột xốp, thịt heo nướng sả đậm đà, pate gan béo ngậy tự làm và đồ chua thanh mát.",
    "ingredients": [
      "Vỏ bánh mì nướng nóng giòn rụm đặc ruột",
      "Thịt nạc dăm ướp sả ớt nướng than hoa thơm lừng",
      "Pate gan heo béo bùi tự làm thủ công",
      "Bơ trứng vàng óng béo ngậy",
      "Dưa chuột tươi, đồ chua củ cải cà rốt, rau ngò rí"
    ],
    "nutritionInfo": {
      "portion": "1 ổ bánh mì lớn (khoảng 220g)",
      "calories": "420 kcal",
      "protein": "18g protein",
      "origin": "Việt Nam",
      "preservation": "Nên dùng ngay trong 20 phút"
    },
    "toppings": [
      "Thêm pate",
      "Phô mai",
      "Trứng"
    ],
    "available": true,
    "sold": 203
  },
  {
    "id": 5,
    "name": "Bún bò Huế giò nạc chả cua",
    "category": "Món Việt",
    "price": 75000,
    "promoPrice": 69000,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&h=680&fit=crop&auto=format",
    "description": "Nước dùng bún bò đậm đà thơm ngát mùi mắm ruốc và sả cây, thịt bắp bò hoa giòn sần sật, chả cua Huế và móng giò mềm ngậy.",
    "ingredients": [
      "Sợi bún to tròn chuẩn xứ Huế",
      "Bắp bò hoa thái lát mỏng giòn ngọt",
      "Giò nạc hầm mềm ngọt béo",
      "Chả cua Huế giòn dai thơm ngậy",
      "Nước hầm xương ống bò ninh cùng mắm ruốc Huế và sả cây đập dập",
      "Hành hoa, ớt sa tế cay xé lưỡi, hoa chuối bào tươi"
    ],
    "nutritionInfo": {
      "portion": "1 tô bún lớn (700g)",
      "calories": "620 kcal",
      "protein": "35g protein",
      "origin": "Cố đô Huế",
      "preservation": "Dùng thật nóng kèm rau sống tươi mát"
    },
    "toppings": [
      "Thêm bắp bò",
      "Chả cua thêm",
      "Ớt sa tế"
    ],
    "available": true,
    "sold": 145
  },
  {
    "id": 6,
    "name": "Cơm rang dưa bò giòn hạt",
    "category": "Món chính",
    "price": 65000,
    "image": "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=900&h=680&fit=crop&auto=format",
    "description": "Cơm rang hạt săn giòn óng vàng, bò xào lửa lớn mềm ngọt quyện cùng dưa cải muối chua giòn rụm thơm lừng.",
    "ingredients": [
      "Cơm nguội rang lửa lớn hạt vàng giòn tơi",
      "Thịt thăn bò tươi ướp tỏi gừng xào vừa chín tới",
      "Dưa cải muối chua truyền thống giòn sần sật",
      "Hành khô phi thơm nức mũi"
    ],
    "nutritionInfo": {
      "portion": "1 suất đầy đặn (550g)",
      "calories": "640 kcal",
      "protein": "30g protein",
      "origin": "Hà Nội",
      "preservation": "Dùng nóng kèm canh và nước tương tỏi ớt"
    },
    "toppings": [
      "Ốp la",
      "Thêm thịt bò",
      "Thêm dưa chua"
    ],
    "available": true,
    "sold": 167
  },
  {
    "id": 7,
    "name": "Cơm sườn xào chua ngọt đưa cơm",
    "category": "Món chính",
    "price": 68000,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&h=680&fit=crop&auto=format",
    "description": "Sườn heo non chặt khúc chiên xém vàng, đảo sốt chua ngọt bóng bẩy đậm đà cực kỳ hao cơm.",
    "ingredients": [
      "Sườn heo non nhiều sụn mềm",
      "Sốt cà chua tươi, giấm bỗng, ớt chuông, dứa ngọt",
      "Cơm gạo tám thơm dẻo",
      "Dưa leo và rau thơm ăn kèm"
    ],
    "nutritionInfo": {
      "portion": "1 suất (550g)",
      "calories": "690 kcal",
      "protein": "29g protein",
      "origin": "Việt Nam",
      "preservation": "Dùng nóng sốt"
    },
    "toppings": [
      "Ốp la",
      "Thêm sườn",
      "Canh rong biển"
    ],
    "available": true,
    "sold": 118
  },
  {
    "id": 8,
    "name": "Mì trộn gà xé sốt mè rang",
    "category": "Món chính",
    "price": 52000,
    "image": "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=900&h=680&fit=crop&auto=format",
    "description": "Mì trứng dai ngon, thịt gà xé mềm ngọt, rau củ giòn mát quyện cùng sốt mè rang béo bùi thơm lừng.",
    "ingredients": [
      "Mì trứng tươi trụng vừa tới dai giòn",
      "Ức gà ta luộc xé sợi mềm ngọt",
      "Sốt mè rang Nhật Bản thơm nức mũi",
      "Dưa leo, cà rốt bào sợi, bắp cải tím, trứng lòng đào"
    ],
    "nutritionInfo": {
      "portion": "1 phần (480g)",
      "calories": "490 kcal",
      "protein": "32g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Trộn đều sốt trước khi thưởng thức"
    },
    "toppings": [
      "Thêm gà",
      "Trứng lòng đào",
      "Sốt cay"
    ],
    "available": true,
    "sold": 119
  },
  {
    "id": 9,
    "name": "Cơm gà sốt Teriyaki Nhật Bản",
    "category": "Món chính",
    "price": 68000,
    "image": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=900&h=680&fit=crop&auto=format",
    "description": "Đùi gà lọc xương áp chảo vàng ruộm, sốt Teriyaki ngọt thanh kiểu Nhật, ăn cùng cơm dẻo và rong biển.",
    "ingredients": [
      "Đùi gà rút xương áp chảo giòn da ngọt thịt",
      "Sốt Teriyaki nguyên bản từ rượu Mirin và nước tương Nhật",
      "Cơm gạo Nhật dẻo bùi",
      "Bắp ngọt, súp lơ luộc và kim chi cay nhẹ"
    ],
    "nutritionInfo": {
      "portion": "1 suất cơm (520g)",
      "calories": "580 kcal",
      "protein": "34g protein",
      "origin": "Nhật Bản kết hợp",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm gà",
      "Kim chi",
      "Canh miso"
    ],
    "available": true,
    "sold": 144
  },
  {
    "id": 10,
    "name": "Burger bò nướng phô mai tan chảy",
    "category": "Món chính",
    "price": 79000,
    "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&h=680&fit=crop&auto=format",
    "description": "Bò xay thượng hạng nướng thơm, phô mai Cheddar tan chảy béo ngậy, bánh mì nướng bơ xốp mềm.",
    "ingredients": [
      "Bò Úc xay nhuyễn nướng xém cạnh mọng nước",
      "Phô mai Cheddar tan chảy",
      "Xà lách thủy canh, cà chua, hành tây caramen",
      "Vỏ bánh mì hoa cúc nướng bơ tỏi giòn thơm"
    ],
    "nutritionInfo": {
      "portion": "1 burger lớn (350g)",
      "calories": "610 kcal",
      "protein": "31g protein",
      "origin": "Âu Mỹ",
      "preservation": "Dùng nóng ngay khi nhận bánh"
    },
    "toppings": [
      "Thêm phô mai",
      "Thêm bò",
      "Khoai ăn kèm"
    ],
    "available": true,
    "sold": 127
  },
  {
    "id": 11,
    "name": "Cơm chiên hải sản hoàng kim trứng muối",
    "category": "Món chính",
    "price": 75000,
    "promoPrice": 69000,
    "image": "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=900&h=680&fit=crop&auto=format",
    "description": "Hạt cơm phủ lớp lòng đỏ trứng muối bùi ngậy, tôm sú tươi, mực giòn sần sật và đậu hà lan.",
    "ingredients": [
      "Cơm hạt ngọc đảo cùng sốt trứng muối hoàng kim",
      "Tôm sú tươi xào thơm",
      "Mực ống tươi cắt hoa giòn ngọt",
      "Đậu hà lan, bắp ngọt, hành tây tím thái hạt lựu"
    ],
    "nutritionInfo": {
      "portion": "1 đĩa lớn (520g)",
      "calories": "630 kcal",
      "protein": "28g protein",
      "origin": "Ẩm thực Á Đông",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm tôm",
      "Thêm trứng muối",
      "Canh ngao"
    ],
    "available": true,
    "sold": 112
  },
  {
    "id": 12,
    "name": "Mì Ý bò bằm sốt Bolognese truyền thống",
    "category": "Món chính",
    "price": 69000,
    "image": "/images/mi_y_bolognese.jpg",
    "description": "Sợi mì Ý Spaghettini luộc chuẩn Al Dente, sốt cà chua bò bằm hầm thảo mộc thơm lừng phủ phô mai Parmesan.",
    "ingredients": [
      "Mì Spaghettini nhập khẩu Ý chuẩn độ chín mềm dai",
      "Thịt bò nạc băm nhuyễn xào thơm rượu vang đỏ",
      "Sốt cà chua Ý, lá nguyệt quế, cỏ xạ hương, dầu ô liu",
      "Phô mai bột Parmesan rắc ngập mặt thơm ngậy"
    ],
    "nutritionInfo": {
      "portion": "1 đĩa mì (480g)",
      "calories": "560 kcal",
      "protein": "26g protein",
      "origin": "Ý",
      "preservation": "Dùng nóng khi phô mai còn tan chảy"
    },
    "toppings": [
      "Thêm phô mai",
      "Thêm sốt bò",
      "Bánh mì bơ tỏi"
    ],
    "available": true,
    "sold": 95
  },
  {
    "id": 13,
    "name": "Miến xào cua bể tay cầm Hải Phòng",
    "category": "Món Việt",
    "price": 89000,
    "promoPrice": 79000,
    "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&h=680&fit=crop&auto=format",
    "description": "Miến dong xào tơi không dính, thịt cua bể tươi ngọt bùi ngập tràn, mộc nhĩ nấm hương xào thơm giòn.",
    "ingredients": [
      "Miến dong làng So dẻo dai tự nhiên",
      "Thịt cua biển tươi bóc sẵn thơm ngọt",
      "Mộc nhĩ, nấm hương, giá đỗ, cần tây xào lửa lớn",
      "Hành phi vàng giòn và hạt tiêu Phú Quốc thơm nồng"
    ],
    "nutritionInfo": {
      "portion": "1 thố miến xào (500g)",
      "calories": "510 kcal",
      "protein": "27g protein",
      "origin": "Việt Nam",
      "preservation": "Dùng nóng kèm nước tương tỏi ớt"
    },
    "toppings": [
      "Thêm thịt cua",
      "Thêm nấm",
      "Ớt tươi"
    ],
    "available": true,
    "sold": 84
  },
  {
    "id": 14,
    "name": "Mẹt bún đậu mắm tôm thập cẩm phố cổ",
    "category": "Món Việt",
    "price": 65000,
    "image": "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=900&h=680&fit=crop&auto=format",
    "description": "Bún lá ép miếng, đậu mơ rán giòn rụm, chả cốm dẻo thơm, chân giò luộc và mắm tôm Thanh Hóa đánh bông bọt.",
    "ingredients": [
      "Bún lá ép chắc nịch dẻo ngon",
      "Đậu phụ Mơ chiên ngập dầu vàng ươm",
      "Chả cốm Hà Nội nướng chiên thơm nồng mùi nếp",
      "Thịt chân giò luộc thái lát mỏng",
      "Mắm tôm nguyên chất pha tắc, ớt tươi, đường đánh bông bọt",
      "Rau kinh giới, tía tô, dưa leo tươi giòn"
    ],
    "nutritionInfo": {
      "portion": "1 mẹt đầy đặn (650g)",
      "calories": "670 kcal",
      "protein": "33g protein",
      "origin": "Hà Nội",
      "preservation": "Ăn ngay khi đậu còn giòn rụm nóng hổi"
    },
    "toppings": [
      "Thêm chả cốm",
      "Thêm đậu rán",
      "Thêm dồi sụn"
    ],
    "available": true,
    "sold": 198
  },
  {
    "id": 15,
    "name": "Bánh xèo miền Tây tôm nhảy giòn rụm",
    "category": "Món Việt",
    "price": 55000,
    "image": "https://images.unsplash.com/photo-1559847844-5315695dadae?w=900&h=680&fit=crop&auto=format",
    "description": "Vỏ bánh xèo vàng giòn rụm từ bột gạo pha nghệ và nước cốt dừa, nhân tôm tươi nhảy, thịt ba chỉ và giá đỗ.",
    "ingredients": [
      "Bột gạo xay tươi pha nghệ tươi và nước cốt dừa béo ngậy",
      "Tôm sông tươi sống ngọt thịt",
      "Thịt heo ba chỉ thái mỏng ướp gia vị",
      "Giá đỗ sạch, đậu xanh đồ chín bùi ngậy",
      "Rau rừng bánh xèo: Cải bẹ xanh, lá cóc, lá xoài non, xà lách",
      "Nước mắm chua ngọt củ cải cà rốt"
    ],
    "nutritionInfo": {
      "portion": "2 chiếc bánh xèo lớn kèm rau",
      "calories": "530 kcal",
      "protein": "22g protein",
      "origin": "Miền Tây Nam Bộ",
      "preservation": "Nên dùng ngay để vỏ bánh giữ trọn độ giòn tan"
    },
    "toppings": [
      "Thêm tôm",
      "Thêm rau rừng",
      "Nước chấm thêm"
    ],
    "available": true,
    "sold": 104
  },
  {
    "id": 16,
    "name": "Cơm bò xào lúc lắc khoai tây bơ tỏi",
    "category": "Món chính",
    "price": 79000,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&h=680&fit=crop&auto=format",
    "description": "Thịt bò thăn cắt quân cờ xào lửa lớn mềm ngọt mọng nước, ăn cùng khoai tây chiên giòn và cơm trắng dẻo thơm.",
    "ingredients": [
      "Thịt bò thăn mềm thái khối quân cờ",
      "Ớt chuông đỏ xanh, hành tây tím, tỏi tép đập dập",
      "Sốt bơ tỏi tiêu đen đậm đà",
      "Khoai tây chiên vàng giòn rụm",
      "Cơm trắng dẻo thơm"
    ],
    "nutritionInfo": {
      "portion": "1 đĩa đầy đặn (550g)",
      "calories": "710 kcal",
      "protein": "37g protein",
      "origin": "Việt Nam kết hợp Pháp",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Ốp la",
      "Thêm bò",
      "Thêm khoai tây"
    ],
    "available": true,
    "sold": 133
  },
  {
    "id": 17,
    "name": "Khay hoa quả tươi thập cẩm nhiệt đới",
    "category": "Hoa quả",
    "price": 65000,
    "promoPrice": 55000,
    "image": "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=900&h=680&fit=crop&auto=format",
    "description": "Hộp hoa quả gọt sẵn tươi mát: Dưa lưới Ruột Cam, dâu tây, xoài chín ngọt, kiwi xanh và thanh long ruột đỏ.",
    "ingredients": [
      "Dưa lưới ruột cam giống Nhật Bản giòn ngọt đậm đà",
      "Dâu tây Đà Lạt chín mọng chua ngọt thanh tao",
      "Xoài Cát Chu chín thơm lừng",
      "Kiwi New Zealand xanh mướt mọng nước",
      "Thanh long ruột đỏ giàu chất chống oxy hóa",
      "Kèm muối tôm Tây Ninh hảo hạng chấm kèm"
    ],
    "nutritionInfo": {
      "portion": "Hộp lớn 500g đóng màng bọc thực phẩm kèm dĩa ghim",
      "calories": "180 kcal",
      "protein": "3g protein",
      "origin": "Trái cây sạch VietGAP Đà Lạt & Miền Tây",
      "preservation": "Bảo quản ngăn mát 2-6°C"
    },
    "toppings": [
      "Muối tôm cay",
      "Muối ô mai",
      "Sốt sữa chua"
    ],
    "available": true,
    "sold": 142
  },
  {
    "id": 18,
    "name": "Dưa lưới ruột cam Nhật Bản cắt miếng",
    "category": "Hoa quả",
    "price": 49000,
    "image": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=900&h=680&fit=crop&auto=format",
    "description": "Dưa lưới nhà màng giống Nhật ruột cam, độ ngọt brix cao 14-16, giòn ngọt mọng nước ướp lạnh.",
    "ingredients": [
      "Dưa lưới ruột cam tuyển chọn chín tới",
      "Gọt vỏ và cắt miếng vừa ăn, ướp lạnh sạch sẽ",
      "Tặng kèm hũ muối xí muội thảo mộc"
    ],
    "nutritionInfo": {
      "portion": "Hộp 350g",
      "calories": "120 kcal",
      "protein": "2g protein",
      "origin": "Nông trại công nghệ cao Lâm Đồng",
      "preservation": "Dùng lạnh"
    },
    "toppings": [
      "Muối xí muội",
      "Muối ớt Tây Ninh"
    ],
    "available": true,
    "sold": 98
  },
  {
    "id": 19,
    "name": "Bưởi da xanh Bến Tre tách múi mọng nước",
    "category": "Hoa quả",
    "price": 59000,
    "image": "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=900&h=680&fit=crop&auto=format",
    "description": "Từng múi bưởi da xanh hồng hào căng mọng nước, vị ngọt thanh không chua chát, tách sẵn tiện lợi.",
    "ingredients": [
      "Bưởi da xanh chuẩn Bến Tre vỏ mỏng tép mọng",
      "Tách vỏ, bỏ hạt sạch sẽ từng tép bưởi hồng",
      "Tặng kèm muối ớt tôm rang giòn"
    ],
    "nutritionInfo": {
      "portion": "Hộp 400g múi bưởi tươi",
      "calories": "140 kcal",
      "protein": "3g protein",
      "origin": "Bến Tre (Đặc sản miền Tây)",
      "preservation": "Dùng trong ngày hoặc bảo quản mát"
    },
    "toppings": [
      "Muối tôm Tây Ninh",
      "Muối ớt cay nồng"
    ],
    "available": true,
    "sold": 175
  },
  {
    "id": 20,
    "name": "Xoài cát Hòa Lộc chín cây ướp lạnh",
    "category": "Hoa quả",
    "price": 52000,
    "image": "https://images.unsplash.com/photo-1553279768-865429fa0078?w=900&h=680&fit=crop&auto=format",
    "description": "Xoài cát Hòa Lộc nức tiếng thịt vàng óng, dẻo mịn thơm ngọt ngào không xơ, cắt hạt lựu ướp lạnh.",
    "ingredients": [
      "Xoài cát Hòa Lộc Tiền Giang chín cây tự nhiên",
      "Cắt miếng vuông hạt lựu đẹp mắt",
      "Muối ớt rim cay ngọt đặc chế"
    ],
    "nutritionInfo": {
      "portion": "Hộp 350g",
      "calories": "160 kcal",
      "protein": "2g protein",
      "origin": "Tiền Giang",
      "preservation": "Ướp lạnh ngon nhất"
    },
    "toppings": [
      "Muối ớt rim",
      "Muối ô mai"
    ],
    "available": true,
    "sold": 129
  },
  {
    "id": 21,
    "name": "Hộp dâu tây Đà Lạt giống Nhật New Sky",
    "category": "Hoa quả",
    "price": 85000,
    "promoPrice": 75000,
    "image": "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=900&h=680&fit=crop&auto=format",
    "description": "Dâu tây trồng hữu cơ trên giàn, quả đỏ mọng, thơm nồng mùi sữa, vị ngọt dịu pha chút chua nhẹ thanh mát.",
    "ingredients": [
      "Dâu tây tươi tuyển chọn quả to đều đẹp",
      "Rửa sạch bằng nước Ozone tiệt trùng an toàn",
      "Kèm hũ sữa đặc ngọt bùi hoặc muối tuyết"
    ],
    "nutritionInfo": {
      "portion": "Hộp 300g (khoảng 14-16 quả)",
      "calories": "95 kcal",
      "protein": "2g protein",
      "origin": "Đà Lạt chuẩn Organic",
      "preservation": "Bảo quản lạnh 2-5°C"
    },
    "toppings": [
      "Kèm sữa đặc",
      "Muối ô mai dâu"
    ],
    "available": true,
    "sold": 164
  },
  {
    "id": 22,
    "name": "Thanh long ruột đỏ Tây Ninh giải nhiệt",
    "category": "Hoa quả",
    "price": 39000,
    "image": "https://images.unsplash.com/photo-1527324688151-0e627063f2b1?w=900&h=680&fit=crop&auto=format",
    "description": "Thanh long ruột đỏ tím mọng nước, vị ngọt đậm tự nhiên, giải nhiệt thanh lọc cơ thể cực tốt.",
    "ingredients": [
      "Thanh long ruột đỏ sạch hữu cơ Tây Ninh",
      "Gọt vỏ cắt quân cờ ướp mát"
    ],
    "nutritionInfo": {
      "portion": "Hộp 400g",
      "calories": "130 kcal",
      "protein": "2g protein",
      "origin": "Tây Ninh",
      "preservation": "Bảo quản ngăn mát tủ lạnh"
    },
    "toppings": [
      "Thêm muối tôm"
    ],
    "available": true,
    "sold": 83
  },
  {
    "id": 23,
    "name": "Ổi nữ hoàng giòn ngọt chấm muối tôm",
    "category": "Hoa quả",
    "price": 35000,
    "image": "/images/oi_nu_hoang.jpg",
    "description": "Ổi nữ hoàng ít hạt thịt dày, vị giòn ngọt thanh sảng khoái, giàu vitamin C tăng cường đề kháng.",
    "ingredients": [
      "Ổi nữ hoàng sạch VietGAP quả tròn giòn",
      "Cắt miếng dài vừa miệng, bỏ lõi hạt",
      "Muối tôm Tây Ninh cay nồng đậm vị"
    ],
    "nutritionInfo": {
      "portion": "Hộp 450g",
      "calories": "110 kcal",
      "protein": "3g protein",
      "origin": "Đồng Nai",
      "preservation": "Ăn giòn ngon nhất trong ngày"
    },
    "toppings": [
      "Muối tôm Tây Ninh",
      "Muối ô mai xí muội"
    ],
    "available": true,
    "sold": 188
  },
  {
    "id": 24,
    "name": "Nho ngón tay đen Úc không hạt giòn tan",
    "category": "Hoa quả",
    "price": 89000,
    "promoPrice": 79000,
    "image": "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=900&h=680&fit=crop&auto=format",
    "description": "Nho ngón tay Úc hình thuôn dài độc đáo, thịt giòn tan, vị ngọt sắc đậm đà và không hề có hạt.",
    "ingredients": [
      "Nho đen ngón tay nhập khẩu nguyên chùm Úc",
      "Rửa sục khí Ozone sạch phấn trắng tự nhiên"
    ],
    "nutritionInfo": {
      "portion": "Hộp 300g",
      "calories": "210 kcal",
      "protein": "2g protein",
      "origin": "Úc (Nhập khẩu đường hàng không)",
      "preservation": "Giữ lạnh để giữ độ giòn tan"
    },
    "toppings": [],
    "available": true,
    "sold": 96
  },
  {
    "id": 25,
    "name": "Khay cóc non bao tử chua ngọt lắc bò khô",
    "category": "Hoa quả",
    "price": 38000,
    "image": "https://images.unsplash.com/photo-1546548970-71785318a17b?w=900&h=680&fit=crop&auto=format",
    "description": "Cóc non bao tử hạt lép giòn rụm, trộn sốt bò khô chua cay mặn ngọt ăn là ghiền.",
    "ingredients": [
      "Cóc non bao tử hạt mềm nhai được",
      "Nước mắm đường ớt rim kẹo thơm ngon",
      "Bò khô xé cay, tép sấy giòn rụm"
    ],
    "nutritionInfo": {
      "portion": "Hộp 350g",
      "calories": "150 kcal",
      "protein": "4g protein",
      "origin": "Việt Nam",
      "preservation": "Để mát ăn càng giòn"
    },
    "toppings": [
      "Thêm bò khô",
      "Thêm muối tôm"
    ],
    "available": true,
    "sold": 215
  },
  {
    "id": 26,
    "name": "Trà đào cam sả ủ lạnh thanh mát",
    "category": "Đồ uống",
    "price": 29000,
    "image": "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=900&h=680&fit=crop&auto=format",
    "description": "Cốt trà đen ủ lạnh thơm đậm, đào miếng giòn ngọt, cam vàng tươi mọng nước và hương sả the mát.",
    "ingredients": [
      "Cốt trà đen hảo hạng ủ lạnh 8 tiếng",
      "Miếng đào ngâm vàng ươm giòn ngọt sần sật",
      "Cam vàng tươi vắt lấy nước nguyên chất",
      "Sả cây đập dập đun thơm the mát",
      "Đường mía tự nhiên thanh mát"
    ],
    "nutritionInfo": {
      "portion": "Ly lớn 500ml",
      "calories": "140 kcal",
      "protein": "1g protein",
      "origin": "FoodVD Barista",
      "preservation": "Uống lạnh với đá"
    },
    "toppings": [
      "Ít đá",
      "Ít đường",
      "Thêm đào"
    ],
    "available": true,
    "sold": 176
  },
  {
    "id": 27,
    "name": "Cà phê muối xứ Huế béo mặn",
    "category": "Đồ uống",
    "price": 32000,
    "image": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=900&h=680&fit=crop&auto=format",
    "description": "Cà phê phin truyền thống đậm đà hòa quyện cùng lớp kem béo mặn sánh mịn độc đáo chuẩn xứ Huế.",
    "ingredients": [
      "Cà phê Robusta Buôn Ma Thuột rang mộc pha phin",
      "Lớp kem muối béo ngậy đánh bông bồng bềnh",
      "Sữa đặc ngọt thơm cân bằng vị đắng nhẹ"
    ],
    "nutritionInfo": {
      "portion": "Ly 350ml",
      "calories": "190 kcal",
      "protein": "3g protein",
      "origin": "Huế",
      "preservation": "Khuấy đều trước khi uống"
    },
    "toppings": [
      "Thêm kem muối",
      "Thêm shot cà phê",
      "Ít đá"
    ],
    "available": true,
    "sold": 224
  },
  {
    "id": 28,
    "name": "Cà phê sữa đá pha phin đậm vị",
    "category": "Đồ uống",
    "price": 25000,
    "image": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=900&h=680&fit=crop&auto=format",
    "description": "Cà phê rang đậm nồng nàn, sữa đặc sánh mịn béo ngậy đánh tan cùng đá viên tinh khiết.",
    "ingredients": [
      "Hạt cà phê Robusta & Arabica phối trộn theo tỉ lệ vàng",
      "Sữa đặc Ông Thọ truyền thống",
      "Đá viên sạch tinh khiết"
    ],
    "nutritionInfo": {
      "portion": "Ly 350ml",
      "calories": "160 kcal",
      "protein": "3g protein",
      "origin": "Việt Nam",
      "preservation": "Uống ngon nhất khi đá tan vừa tới"
    },
    "toppings": [
      "Ít sữa",
      "Thêm shot",
      "Ít đá"
    ],
    "available": true,
    "sold": 210
  },
  {
    "id": 29,
    "name": "Trà sen vàng hạt sen nhãn nhục",
    "category": "Đồ uống",
    "price": 38000,
    "image": "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=900&h=680&fit=crop&auto=format",
    "description": "Trà Ô long thanh khiết kết hợp cùng hạt sen bùi ngọt, thịt nhãn thơm giòn và củ năng giòn sần sật.",
    "ingredients": [
      "Cốt trà Ô long cao cấp thơm hương hoa quả",
      "Hạt sen tươi Đồng Tháp ninh mềm bở ngọt",
      "Nhãn lồng Hưng Yên thịt dày giòn",
      "Củ năng bọc bột năng dai giòn thú vị"
    ],
    "nutritionInfo": {
      "portion": "Ly 500ml",
      "calories": "170 kcal",
      "protein": "2g protein",
      "origin": "FoodVD Barista",
      "preservation": "Uống lạnh"
    },
    "toppings": [
      "Thêm hạt sen",
      "Thêm củ năng",
      "Ít ngọt"
    ],
    "available": true,
    "sold": 153
  },
  {
    "id": 30,
    "name": "Nước ép cam vàng nguyên chất không đường",
    "category": "Đồ uống",
    "price": 35000,
    "image": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=900&h=680&fit=crop&auto=format",
    "description": "100% cam tươi vắt nguyên chất, không pha nước, không thêm đường, dồi dào vitamin C tự nhiên.",
    "ingredients": [
      "Cam vàng Navel mọng nước vắt tươi theo đơn",
      "Không pha thêm nước lọc, không đường hóa học"
    ],
    "nutritionInfo": {
      "portion": "Chai 350ml",
      "calories": "120 kcal",
      "protein": "2g protein",
      "origin": "Việt Nam",
      "preservation": "Bảo quản mát, nên uống trong ngày"
    },
    "toppings": [
      "Thêm đá lạnh",
      "Thêm chút đường mía"
    ],
    "available": true,
    "sold": 138
  },
  {
    "id": 31,
    "name": "Trà sữa trân châu đường đen Đài Loan",
    "category": "Đồ uống",
    "price": 39000,
    "image": "/images/tra_sua_tran_chau.jpg",
    "description": "Trà sữa đen truyền thống béo ngậy, trân châu hoàng kim nấu đường nâu thơm lừng dai dẻo.",
    "ingredients": [
      "Trà đen Assam thơm đậm vị trà kết hợp sữa tươi thanh trùng",
      "Trân châu bột sắn nấu mật mía đường đen dẻo quánh"
    ],
    "nutritionInfo": {
      "portion": "Ly 500ml",
      "calories": "320 kcal",
      "protein": "4g protein",
      "origin": "Đài Loan",
      "preservation": "Uống ngay khi trân châu còn mềm ấm"
    },
    "toppings": [
      "Thêm trân châu",
      "Thêm pudding trứng",
      "50% đường"
    ],
    "available": true,
    "sold": 260
  },
  {
    "id": 32,
    "name": "Sữa chua dẻo trái cây ngũ sắc",
    "category": "Tráng miệng",
    "price": 36000,
    "image": "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=900&h=680&fit=crop&auto=format",
    "description": "Sữa chua dẻo nhà làm thơm ngậy cắt miếng, hoa quả theo mùa tươi rói và hạt granola giòn rụm.",
    "ingredients": [
      "Sữa chua lên men tự nhiên ủ dẻo cắt viên",
      "Dâu tây, xoài chín, kiwi, thanh long đỏ tươi gọt hạt lựu",
      "Granola yến mạch hạt sấy mật ong giòn bùi"
    ],
    "nutritionInfo": {
      "portion": "1 tô tráng miệng (350g)",
      "calories": "190 kcal",
      "protein": "6g protein",
      "origin": "FoodVD Bakery",
      "preservation": "Dùng lạnh"
    },
    "toppings": [
      "Thêm granola",
      "Ít đường",
      "Thêm dâu"
    ],
    "available": true,
    "sold": 145
  },
  {
    "id": 33,
    "name": "Chè khúc bạch long nhãn hạt chia",
    "category": "Tráng miệng",
    "price": 35000,
    "image": "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=900&h=680&fit=crop&auto=format",
    "description": "Từng viên khúc bạch sữa tươi phô mai mềm mịn tan chảy, long nhãn giòn ngọt, hạnh nhân lát thơm bùi.",
    "ingredients": [
      "Khúc bạch làm từ kem sữa béo ngậy và phô mai",
      "Long nhãn sấy dẻo thơm ngát",
      "Hạnh nhân thái lát rang vàng giòn rụm",
      "Nước đường phèn hoa bưởi thanh khiết và hạt chia"
    ],
    "nutritionInfo": {
      "portion": "Bát 400ml kèm đá bào",
      "calories": "220 kcal",
      "protein": "5g protein",
      "origin": "Việt Nam",
      "preservation": "Ăn lạnh cùng đá bào"
    },
    "toppings": [
      "Thêm khúc bạch",
      "Thêm hạnh nhân",
      "Ít ngọt"
    ],
    "available": true,
    "sold": 168
  },
  {
    "id": 34,
    "name": "Caramel bánh flan kem dừa cốt dừa",
    "category": "Tráng miệng",
    "price": 25000,
    "image": "https://images.unsplash.com/photo-1528975604071-b4dc52a2d18c?w=900&h=680&fit=crop&auto=format",
    "description": "Bánh flan mềm mịn mướt không rỗ, vị ngọt dịu thơm hương trứng gà tươi và nước cốt dừa béo bùi.",
    "ingredients": [
      "Trứng gà tươi, sữa tươi nguyên kem và đường caramen thắng vàng",
      "Nước cốt dừa thơm béo và cà phê giọt đắng dịu",
      "Đá bào nhuyễn mát lạnh"
    ],
    "nutritionInfo": {
      "portion": "1 hũ bánh flan lớn (180g)",
      "calories": "180 kcal",
      "protein": "5g protein",
      "origin": "Việt Nam",
      "preservation": "Bảo quản lạnh 2-5°C"
    },
    "toppings": [
      "Thêm bánh flan",
      "Thêm thạch cà phê",
      "Ít đá"
    ],
    "available": true,
    "sold": 215
  },
  {
    "id": 35,
    "name": "Diet Soda Zero Sugar lon 330ml",
    "category": "Đồ uống",
    "price": 35000,
    "promoPrice": 29000,
    "image": "https://api.getlayers.ai/storage/v1/object/public/public/assets/soda-14ff8a788d/Green%20Soda.png",
    "description": "Nước ngọt có ga 0 đường, vị thanh mát sảng khoái và giải khát tức thì không lo tăng cân.",
    "ingredients": [
      "Nước khoáng có ga tinh khiết",
      "Hương chanh tự nhiên thanh mát",
      "Chất tạo ngọt tự nhiên 0 calo (Sucralose)"
    ],
    "nutritionInfo": {
      "portion": "Lon 330ml",
      "calories": "0 kcal",
      "protein": "0g protein",
      "origin": "Chính hãng",
      "preservation": "Ướp lạnh"
    },
    "toppings": [
      "Vị Classic",
      "Vị Zero Lime",
      "Thêm đá lạnh"
    ],
    "available": true,
    "sold": 285
  },
  {
    "id": 36,
    "name": "Nước sâm bí đao hạt chia lá dứa mát lành",
    "category": "Đồ uống",
    "price": 22000,
    "image": "https://images.unsplash.com/photo-1556881286-fc6915169721?w=900&h=680&fit=crop&auto=format",
    "description": "Bí đao già nấu cùng thục địa, la hán quả, lá dứa thanh mát giải độc cơ thể ngày nắng nóng.",
    "ingredients": [
      "Bí đao già, thục địa, la hán quả, mía lau",
      "Lá dứa thơm ngát, đường phèn thanh nhẹ",
      "Hạt chia nở mềm giàu chất xơ"
    ],
    "nutritionInfo": {
      "portion": "Chai 500ml",
      "calories": "85 kcal",
      "protein": "1g protein",
      "origin": "Việt Nam",
      "preservation": "Uống lạnh"
    },
    "toppings": [
      "Thêm hạt chia",
      "Ít đường",
      "Thêm sương sáo"
    ],
    "available": true,
    "sold": 194
  },
  {
    "id": 37,
    "name": "Gỏi cuốn tôm thịt tôm sú tươi",
    "category": "Ăn nhẹ",
    "price": 45000,
    "image": "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=900&h=680&fit=crop&auto=format",
    "description": "Bánh tráng dẻo cuốn tôm sú luộc tươi, thịt ba chỉ, bún tươi và chấm sốt tương đậu phộng béo bùi.",
    "ingredients": [
      "Bánh tráng gạo mỏng dẻo dai",
      "Tôm sú tươi luộc đỏ au bóc vỏ",
      "Thịt ba chỉ luộc thái lát mỏng",
      "Bún tươi sợi nhỏ, hẹ xanh tươi, rau thơm các loại",
      "Nước sốt tương đậu phộng béo bùi rắc hành phi"
    ],
    "nutritionInfo": {
      "portion": "3 cuốn lớn kèm chén sốt",
      "calories": "310 kcal",
      "protein": "16g protein",
      "origin": "Nam Bộ",
      "preservation": "Dùng ngay khi bánh tráng còn mềm"
    },
    "toppings": [
      "Thêm tôm",
      "Sốt cay",
      "Rau thêm"
    ],
    "available": true,
    "sold": 88
  },
  {
    "id": 38,
    "name": "Khoai tây lắc phô mai giòn rụm",
    "category": "Ăn nhẹ",
    "price": 39000,
    "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&h=680&fit=crop&auto=format",
    "description": "Khoai tây chiên giòn tan ngập trong lớp bột phô mai béo ngọt mặn mà thơm lừng khó cưỡng.",
    "ingredients": [
      "Khoai tây cắt thanh dài chiên vàng rụm 2 lần lửa",
      "Bột phô mai Hàn Quốc béo ngậy thơm ngọt",
      "Tương ớt và sốt mayonnaise ăn kèm"
    ],
    "nutritionInfo": {
      "portion": "Hộp 250g",
      "calories": "380 kcal",
      "protein": "4g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Ăn nóng để khoai luôn giòn tan"
    },
    "toppings": [
      "Thêm phô mai",
      "Sốt BBQ",
      "Bột rong biển"
    ],
    "available": true,
    "sold": 112
  },
  {
    "id": 39,
    "name": "Nem chua rán phố cổ Hà Nội giòn bùi",
    "category": "Ăn nhẹ",
    "price": 45000,
    "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=900&h=680&fit=crop&auto=format",
    "description": "Nem chua tẩm bột chiên xù giòn tan vỏ ngoài, bên trong dẻo dai nóng hổi chấm tương ớt cay nồng.",
    "ingredients": [
      "Nem chua sống làm từ thịt heo nạc và bì heo giòn",
      "Bột chiên xù vàng ươm",
      "Tương ớt cay nồng Hà Nội và dưa leo ăn kèm"
    ],
    "nutritionInfo": {
      "portion": "Phần 6 cái nem rán lớn",
      "calories": "390 kcal",
      "protein": "18g protein",
      "origin": "Hà Nội",
      "preservation": "Dùng nóng ngay khi vừa vớt ráo dầu"
    },
    "toppings": [
      "Thêm tương ớt",
      "Thêm dưa chuột"
    ],
    "available": true,
    "sold": 182
  },
  {
    "id": 40,
    "name": "Gà lắc phô mai rong biển sốt cay",
    "category": "Ăn nhẹ",
    "price": 49000,
    "image": "https://images.unsplash.com/photo-1562967914-608f82629710?w=900&h=680&fit=crop&auto=format",
    "description": "Thịt ức gà tươi cắt viên tẩm ướp chiên giòn rụm, lắc đều bột phô mai và rong biển sấy thơm ngon.",
    "ingredients": [
      "Thịt gà tươi viên lăn bột xù chiên giòn rụm",
      "Bột phô mai và rong biển nướng vụn",
      "Sốt cay Hàn Quốc hoặc sốt mật ong mù tạt"
    ],
    "nutritionInfo": {
      "portion": "Hộp 280g",
      "calories": "420 kcal",
      "protein": "28g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm sốt mật ong",
      "Thêm phô mai"
    ],
    "available": true,
    "sold": 147
  },
  {
    "id": 41,
    "name": "Bánh bao kim sa trứng muối hấp nóng",
    "category": "Ăn nhẹ",
    "price": 32000,
    "image": "https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=900&h=680&fit=crop&auto=format",
    "description": "Vỏ bánh bao mềm xốp thơm mùi sữa tươi, cắn vào nhân kim sa trứng muối tan chảy béo ngậy ngọt ngào.",
    "ingredients": [
      "Bột mì cao cấp ủ men tự nhiên tạo độ mềm mịn xốp",
      "Nhân sốt lòng đỏ trứng muối, bơ thơm và sữa đặc béo ngậy"
    ],
    "nutritionInfo": {
      "portion": "Phần 2 chiếc bánh bao nóng",
      "calories": "280 kcal",
      "protein": "7g protein",
      "origin": "Hồng Kông",
      "preservation": "Ăn khi bánh còn bốc khói nghi ngút"
    },
    "toppings": [],
    "available": true,
    "sold": 116
  },
  {
    "id": 42,
    "name": "Há cảo tôm thịt hấp Dimsum truyền thống",
    "category": "Ăn nhẹ",
    "price": 45000,
    "image": "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=900&h=680&fit=crop&auto=format",
    "description": "Vỏ há cảo trong suốt dai mềm, nhân tôm nguyên con giòn sần sật quyện thịt nạc thơm ngọt chấm xì dầu giấm tiều.",
    "ingredients": [
      "Vỏ bánh há cảo trong suốt từ bột tàn mì",
      "Tôm sú tươi lột vỏ giữ nguyên độ giòn",
      "Thịt nạc băm và măng tươi thái nhỏ",
      "Nước chấm xì dầu ớt sa tế Dimsum"
    ],
    "nutritionInfo": {
      "portion": "Xửng 4 viên há cảo lớn",
      "calories": "240 kcal",
      "protein": "14g protein",
      "origin": "Quảng Đông",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm sa tế",
      "Thêm giấm tiều"
    ],
    "available": true,
    "sold": 139
  },
  {
    "id": 43,
    "name": "Chân gà rút xương sốt Thái chua cay",
    "category": "Ăn nhẹ",
    "price": 59000,
    "image": "https://images.unsplash.com/photo-1546548970-71785318a17b?w=900&h=680&fit=crop&auto=format",
    "description": "Chân gà rút xương giòn sần sật ngâm sốt Thái chua ngọt cay tê, sả tươi thơm lừng và quất tắc thơm ngát.",
    "ingredients": [
      "Chân gà rút xương làm sạch luộc giòn rụm ngâm đá",
      "Sốt cay kiểu Thái từ nước mắm nhĩ, ớt hiểm, đường thốt nốt",
      "Sả cây thái mỏng, tắc tươi thái lát, lá chanh"
    ],
    "nutritionInfo": {
      "portion": "Hộp 350g",
      "calories": "310 kcal",
      "protein": "22g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Dùng lạnh giòn sần sật"
    },
    "toppings": [
      "Thêm sốt chấm muối ớt sữa"
    ],
    "available": true,
    "sold": 172
  },
  {
    "id": 44,
    "name": "Salad ức gà áp chảo sốt mè rang Healthy",
    "category": "Healthy & Ăn kiêng",
    "price": 55000,
    "image": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&h=680&fit=crop&auto=format",
    "description": "Ức gà tẩm thảo mộc áp chảo ít dầu, rau xà lách thủy canh, cà chua bi, trứng luộc và sốt mè rang ít béo.",
    "ingredients": [
      "Ức gà tươi tẩm ướp tiêu đen và muối hồng áp chảo",
      "Xà lách Romaine, cà chua bi Đà Lạt, bắp ngọt, dưa leo",
      "Trứng gà luộc lòng đào",
      "Sốt mè rang Kewpie thanh nhẹ giảm béo"
    ],
    "nutritionInfo": {
      "portion": "1 tô lớn (420g)",
      "calories": "340 kcal",
      "protein": "36g protein",
      "origin": "Ăn kiêng Eat Clean",
      "preservation": "Dùng mát"
    },
    "toppings": [
      "Thêm ức gà",
      "Thêm trứng",
      "Sốt ít béo"
    ],
    "available": true,
    "sold": 124
  },
  {
    "id": 45,
    "name": "Cơm gạo lứt thịt bò sốt tiêu đen Eat Clean",
    "category": "Healthy & Ăn kiêng",
    "price": 69000,
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&h=680&fit=crop&auto=format",
    "description": "Cơm gạo lứt huyết rồng dẻo thơm giàu chất xơ, bò thăn áp chảo mềm ngọt và súp lơ xanh xào nhẹ.",
    "ingredients": [
      "Gạo lứt đỏ Điện Biên dẻo bùi nấu chuẩn",
      "Thịt thăn bò tươi xào tiêu đen ít gia vị hóa học",
      "Bông cải xanh, cà rốt hấp giữ trọn vitamin"
    ],
    "nutritionInfo": {
      "portion": "1 suất ăn kiêng (450g)",
      "calories": "420 kcal",
      "protein": "34g protein",
      "origin": "Eat Clean FoodVD",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm bò",
      "Thêm trứng luộc",
      "Thêm súp lơ"
    ],
    "available": true,
    "sold": 110
  },
  {
    "id": 46,
    "name": "Salad cá hồi Nauy bơ sáp sốt chanh leo",
    "category": "Healthy & Ăn kiêng",
    "price": 89000,
    "promoPrice": 79000,
    "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=900&h=680&fit=crop&auto=format",
    "description": "Cá hồi tươi Nauy áp chảo xém da, bơ sáp Đắk Lắk béo bùi, rau củ hữu cơ và sốt chanh leo thanh mát.",
    "ingredients": [
      "Phi lê cá hồi Nauy tươi chuẩn sashimi áp chảo xém cạnh",
      "Quả bơ sáp chín tới cắt lát bùi ngậy",
      "Rau mầm, cà chua bi, xà lách giòn",
      "Nước sốt chanh leo chua ngọt thanh dịu không dầu mỡ"
    ],
    "nutritionInfo": {
      "portion": "1 đĩa salad thượng hạng (400g)",
      "calories": "390 kcal",
      "protein": "29g protein",
      "origin": "Nauy & Đà Lạt",
      "preservation": "Dùng mát"
    },
    "toppings": [
      "Thêm cá hồi",
      "Thêm bơ sáp",
      "Sốt chanh leo"
    ],
    "available": true,
    "sold": 91
  },
  {
    "id": 47,
    "name": "Poke Bowl cá ngừ bơ tươi sốt Shoyu",
    "category": "Healthy & Ăn kiêng",
    "price": 79000,
    "image": "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=900&h=680&fit=crop&auto=format",
    "description": "Cơm gạo lứt dẻo, cá ngừ đại dương tươi cắt khối, bơ sáp, đậu nành Edamame và rong biển thơm.",
    "ingredients": [
      "Cá ngừ đại dương tươi tẩm sốt tương Shoyu mè",
      "Đậu nành Nhật Edamame bóc vỏ luộc",
      "Quả bơ, dưa leo, củ cải đỏ, rong biển khô rắc mè rang",
      "Cơm gạo lứt dẻo mềm"
    ],
    "nutritionInfo": {
      "portion": "1 tô Poke (450g)",
      "calories": "430 kcal",
      "protein": "31g protein",
      "origin": "Hawaii phong cách Nhật",
      "preservation": "Dùng mát"
    },
    "toppings": [
      "Thêm cá ngừ",
      "Thêm bơ",
      "Rong biển thêm"
    ],
    "available": true,
    "sold": 87
  },
  {
    "id": 48,
    "name": "Mù tạt vàng Heinz Yellow Mustard 255g",
    "category": "Gia vị & Đồ khô",
    "price": 45000,
    "promoPrice": 39000,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900&h=680&fit=crop&auto=format",
    "description": "Mù tạt vàng nguyên chất Heinz nhập khẩu, vị chua dịu the nồng chuẩn vị ăn kèm xúc xích, burger và bít tết.",
    "ingredients": [
      "Giấm chưng cất, hạt mù tạt loại 1, nước khoáng",
      "Muối biển, bột nghệ tự nhiên, ớt bột và gia vị thảo mộc"
    ],
    "nutritionInfo": {
      "portion": "Chai 255g chính hãng",
      "calories": "0 kcal / khẩu phần",
      "protein": "0g protein",
      "origin": "Mỹ (Heinz chính ngạch)",
      "preservation": "Đậy kín nắp và để nơi khô ráo thoáng mát"
    },
    "toppings": [],
    "available": true,
    "sold": 84
  },
  {
    "id": 49,
    "name": "Hũ sa tế tôm khô xào cay Bếp Hoa 200g",
    "category": "Gia vị & Đồ khô",
    "price": 55000,
    "promoPrice": 49000,
    "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=900&h=680&fit=crop&auto=format",
    "description": "Sa tế tôm khô xào dầu hạt điều đỏ au, tôm biển sấy thơm lừng, ớt cay nồng đậm đà dùng nấu lẩu, ướp nướng.",
    "ingredients": [
      "Tôm khô Cà Mau xay nhuyễn xào thơm",
      "Ớt sừng, ớt chỉ thiên phơi khô cay nồng",
      "Hành củ, tỏi Lý Sơn, sả băm, dầu màu điều tự nhiên"
    ],
    "nutritionInfo": {
      "portion": "Hũ thủy tinh 200g",
      "calories": "180 kcal/100g",
      "protein": "8g protein",
      "origin": "Bếp Hoa chế biến thủ công",
      "preservation": "Bảo quản nơi khô ráo hoặc ngăn mát sau khi mở"
    },
    "toppings": [],
    "available": true,
    "sold": 145
  },
  {
    "id": 50,
    "name": "Nước mắm cá cơm Phú Quốc 40 độ đạm 500ml",
    "category": "Gia vị & Đồ khô",
    "price": 75000,
    "promoPrice": 65000,
    "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=900&h=680&fit=crop&auto=format",
    "description": "Nước mắm nhỉ rút nỏ từ cá cơm than và muối biển Phú Quốc ủ chượp thùng gỗ 18 tháng, màu cánh gián thơm lừng.",
    "ingredients": [
      "100% cá cơm than tươi đánh bắt tại đảo Phú Quốc",
      "Muối biển Bà Rịa tinh khiết ủ chượp thùng gỗ bời lời"
    ],
    "nutritionInfo": {
      "portion": "Chai thủy tinh 500ml",
      "calories": "60 kcal/100ml",
      "protein": "40g đạm/lít",
      "origin": "Phú Quốc",
      "preservation": "Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp"
    },
    "toppings": [],
    "available": true,
    "sold": 120
  },
  {
    "id": 51,
    "name": "Combo bữa trưa văn phòng no nê",
    "category": "Combo",
    "price": 99000,
    "promoPrice": 89000,
    "image": "https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=900&h=680&fit=crop&auto=format",
    "description": "Bữa trưa đầy đủ dinh dưỡng: 1 Món chính tự chọn, 1 Bát canh sườn non hầm rau củ thanh ngọt và 1 Trà đào mát lạnh.",
    "ingredients": [
      "1 Phần món chính dinh dưỡng (Cơm sườn/Phở/Mì)",
      "1 Bát canh sườn non ninh củ quả thanh ngọt",
      "1 Ly trà đào cam sả thanh mát giải nhiệt",
      "1 Phần trái cây tươi tráng miệng trong ngày"
    ],
    "nutritionInfo": {
      "portion": "Khẩu phần no nê cho 1 người lớn",
      "calories": "680 kcal",
      "protein": "32g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Đóng khay giữ nhiệt 3 ngăn riêng biệt"
    },
    "toppings": [
      "Đổi nước",
      "Thêm soup",
      "Ít cay"
    ],
    "available": true,
    "sold": 197
  },
  {
    "id": 52,
    "name": "Combo gia đình đầm ấm (3-4 người)",
    "category": "Combo",
    "price": 249000,
    "promoPrice": 219000,
    "image": "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&h=680&fit=crop&auto=format",
    "description": "Bữa cơm trọn vị sum vầy: Cơm sườn nướng mật ong, Thịt bò xào lúc lắc, Canh ngao nấu chua, Đậu sốt cà chua và Tráng miệng.",
    "ingredients": [
      "4 Suất cơm trắng thơm dẻo",
      "Đĩa lớn sườn heo nướng mật ong than hoa",
      "Thịt bò xào rau củ lúc lắc thơm bơ",
      "Bát canh ngao hoa chua ngọt giải nhiệt",
      "Đậu phụ Mơ sốt cà chua tươi",
      "1 Khay dưa hấu hoa quả tráng miệng"
    ],
    "nutritionInfo": {
      "portion": "Set ăn 3-4 người lớn no nê",
      "calories": "1850 kcal tổng set",
      "protein": "95g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Đóng hộp chuyên dụng giữ nhiệt"
    },
    "toppings": [
      "Thêm canh",
      "Thêm cơm",
      "Thêm sườn"
    ],
    "available": true,
    "sold": 86
  },
  {
    "id": 53,
    "name": "Combo lẩu Thái Tomyum hải sản 2 người",
    "category": "Combo",
    "price": 189000,
    "promoPrice": 169000,
    "image": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&h=680&fit=crop&auto=format",
    "description": "Nước lẩu Thái chua cay chuẩn vị Tomyum nước cốt dừa, tôm sú tươi, mực ống, bò Mỹ, nấm kim châm và mì ramen.",
    "ingredients": [
      "Nước lẩu Tomyum cốt dừa lá chanh Thái thơm nồng",
      "Tôm sú tươi sống, mực ống cắt khoanh giòn",
      "Ba chỉ bò Mỹ thái cuộn nhúng lẩu",
      "Nấm kim châm, nấm đùi gà, bắp ngọt, rau muống non",
      "2 Gói mì ramen trứng dai ngon"
    ],
    "nutritionInfo": {
      "portion": "Nồi lẩu cho 2 người (1.5kg nguyên liệu)",
      "calories": "920 kcal",
      "protein": "58g protein",
      "origin": "Thái Lan kết hợp",
      "preservation": "Kèm nước dùng nấu sôi đóng túi zip bạc giữ nhiệt"
    },
    "toppings": [
      "Thêm tôm",
      "Thêm bò",
      "Thêm mì"
    ],
    "available": true,
    "sold": 105
  },
  {
    "id": 54,
    "name": "Combo hẹn hò lãng mạn cho 2 người",
    "category": "Combo",
    "price": 199000,
    "promoPrice": 179000,
    "image": "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&h=680&fit=crop&auto=format",
    "description": "Bữa tối ngọt ngào: 2 Phần bít tết bò Úc sốt tiêu đen kèm khoai tây, 1 Salad bơ sáp và 2 Ly trà hoa quả nhiệt đới.",
    "ingredients": [
      "2 Phần bò Úc áp chảo xém thơm kèm bánh mì",
      "1 Đĩa salad cá ngừ sốt mè rang thanh mát",
      "2 Ly trà đào cam sả ủ lạnh mát lạnh"
    ],
    "nutritionInfo": {
      "portion": "Set 2 người",
      "calories": "1100 kcal",
      "protein": "65g protein",
      "origin": "FoodVD Kitchen",
      "preservation": "Dùng nóng"
    },
    "toppings": [
      "Thêm khoai tây",
      "Thêm sốt bơ tỏi"
    ],
    "available": true,
    "sold": 77
  }
]

export const initialOrders: Order[] = [
  {
    id: "FVD-260900",
    customerName: "Vũ Dũng",
    phoneMasked: "*******079",
    addressMasked: "523 Kim Mã, Ba Đình, Hà Nội",
    email: "dung.foodvd@example.com",
    payment: "VietQR",
    total: 124000,
    status: "Hoàn tất",
    createdAt: "2026-10-10 11:30",
    items: [
      { dishId: 1, quantity: 1, toppings: ["Quẩy", "Trứng chần"] },
      { dishId: 4, quantity: 1, toppings: ["Thêm pate"] },
    ],
  },
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

export const initialSalaries: StaffSalary[] = [
  { id: "NV01", name: "Nguyễn Minh", role: "Nhân viên xử lý đơn", shiftCount: 22, baseSalary: 7200000, bonus: 700000, deduction: 100000 },
  { id: "NV02", name: "Trần Hoài", role: "Nhân viên bếp", shiftCount: 24, baseSalary: 7800000, bonus: 500000, deduction: 0 },
  { id: "NV03", name: "Lê Anh", role: "Nhân viên giao nhận", shiftCount: 20, baseSalary: 6800000, bonus: 900000, deduction: 150000 },
]

export const initialVouchers: Voucher[] = [
  { id: "v1", code: "FOODVD20", label: "Giảm 20% cho đơn từ 120k", type: "percent", value: 20, min: 120000, active: true },
  { id: "v2", code: "FREESHIP", label: "Giảm 15.000đ phí giao", type: "fixed", value: 15000, min: 80000, active: true },
  { id: "v3", code: "VIP50", label: "Giảm 50.000đ đơn từ 200k", type: "fixed", value: 50000, min: 200000, active: true },
]

export const initialTimekeeping: TimekeepingRecord[] = [
  { id: "tk1", staffId: "NV01", staffName: "Nguyễn Minh", date: "20/09/2026", shift: "Ca sáng (08:00 - 16:00)", checkInTime: "07:55", checkOutTime: "16:05", status: "Hoàn thành" },
  { id: "tk2", staffId: "NV02", staffName: "Trần Hoài", date: "20/09/2026", shift: "Ca tối (16:00 - 23:00)", checkInTime: "15:58", checkOutTime: "23:10", status: "Hoàn thành" },
  { id: "tk3", staffId: "NV03", staffName: "Lê Anh", date: "20/09/2026", shift: "Ca sáng (08:00 - 16:00)", checkInTime: "08:02", checkOutTime: "16:00", status: "Hoàn thành" },
  { id: "tk4", staffId: "NV01", staffName: "Nguyễn Minh", date: "21/09/2026", shift: "Ca sáng (08:00 - 16:00)", checkInTime: "07:50", status: "Đang làm" },
]

export const initialReviews: Review[] = [
  {
    id: "REV-101",
    dishId: 1,
    dishName: "Phở bò đặc biệt",
    customerName: "Nguyễn Hoàng Nam",
    rating: 5,
    comment: "Nước dùng phở bò ngọt thanh từ xương, thơm mùi hồi quế, thịt bò tái nạm rất tươi mềm. Quán đóng gói túi nước dùng nóng hổi 10/10!",
    createdAt: "08/10/2026 12:15",
    reply: "FoodVD cảm ơn bạn Nam rất nhiều! Chúc bạn có bữa trưa thật ngon miệng ạ ❤️",
  },
  {
    id: "REV-102",
    dishId: 1,
    dishName: "Phở bò đặc biệt",
    customerName: "Trần Mai Anh",
    rating: 5,
    comment: "Giao hàng cực nhanh, chỉ 20 phút là tới nơi. Thêm quẩy giòn rụm và trứng chần lòng đào chuẩn vị.",
    createdAt: "07/10/2026 19:40",
  },
  {
    id: "REV-103",
    dishId: 2,
    dishName: "Bún chả Hà Nội",
    customerName: "Lê Quốc Bảo",
    rating: 5,
    comment: "Chả nướng than hoa thơm nức mũi, nước mắm pha chua ngọt đúng gu miền Bắc. Nem cua bể giòn rụm nhiều thịt.",
    createdAt: "08/10/2026 13:20",
    reply: "Dạ FoodVD cảm ơn anh Bảo đã ủng hộ quán ạ!",
  },
  {
    id: "REV-104",
    dishId: 3,
    dishName: "Cơm tấm sườn bì",
    customerName: "Phạm Hải Đăng",
    rating: 4,
    comment: "Miếng sườn to ướp đậm đà, chả trứng béo thơm. Góp ý quán thêm chút mỡ hành thì tuyệt vời hơn nữa.",
    createdAt: "06/10/2026 11:55",
    reply: "FoodVD đã ghi nhận ý kiến của anh Đăng và sẽ tăng thêm mỡ hành thơm nức cho các phần cơm tấm tiếp theo ạ!",
  },
  {
    id: "REV-105",
    dishId: 100,
    dishName: "Diet Soda Zero Sugar",
    customerName: "Hoàng Gia Huy",
    rating: 5,
    comment: "Nước uống thanh mát 0 calo, giải nhiệt cực đã, đóng gói ướp lạnh sẵn rất thích.",
    createdAt: "09/10/2026 10:05",
  },
  {
    id: "REV-106",
    dishId: 4,
    dishName: "Bánh mì thịt nướng",
    customerName: "Vũ Thùy Linh",
    rating: 5,
    comment: "Bánh mì giòn rụm, pate béo ngậy, thịt nướng thơm lừng. Rất thích hợp làm bữa sáng hoặc ăn nhẹ buổi chiều.",
    createdAt: "05/10/2026 08:30",
  },
  {
    id: "REV-107",
    dishId: 7,
    dishName: "Trà đào cam sả",
    customerName: "Đỗ Kim Ngân",
    rating: 4,
    comment: "Trà thơm hương sả, miếng đào giòn sần sật. Giao hàng đá còn nguyên vẹn, uống rất sảng khoái.",
    createdAt: "07/10/2026 15:10",
  },
]

export const initialUsers: User[] = [
  {
    id: "usr_admin",
    name: "Quản trị viên FoodVD",
    email: "admin@foodvd.vn",
    role: "admin",
    phone: "0901234567",
    address: "Tòa nhà FoodVD, Cầu Giấy, Hà Nội",
    status: "active",
    createdAt: "15/01/2026",
  },
  {
    id: "usr_staff1",
    name: "Nhân viên vận hành",
    email: "nhanvien@foodvd.vn",
    role: "staff",
    phone: "0912345678",
    address: "Số 15 Cầu Giấy, Hà Nội",
    status: "active",
    createdAt: "01/02/2026",
  },
  {
    id: "usr_staff2",
    name: "Nguyễn Văn Bếp",
    email: "bep@foodvd.vn",
    role: "staff",
    phone: "0923456789",
    address: "Số 88 Hồ Tùng Mậu, Hà Nội",
    status: "active",
    createdAt: "10/02/2026",
  },
  {
    id: "usr_cust1",
    name: "Vũ Dũng",
    email: "dung.foodvd@example.com",
    role: "customer",
    phone: "0987654321",
    address: "136 Xuân Thủy, Cầu Giấy, Hà Nội",
    status: "active",
    createdAt: "01/03/2026",
  },
  {
    id: "usr_cust2",
    name: "Trần Minh Trang",
    email: "trang.tran@example.com",
    role: "customer",
    phone: "0934567890",
    address: "Số 45 Trần Thái Tông, Cầu Giấy, Hà Nội",
    status: "active",
    createdAt: "12/03/2026",
  },
  {
    id: "usr_cust3",
    name: "Lê Hoàng Long",
    email: "long.le@example.com",
    role: "customer",
    phone: "0978901234",
    address: "Số 12 Chùa Láng, Đống Đa, Hà Nội",
    status: "active",
    createdAt: "20/03/2026",
  },
]


