<<<<<<< HEAD
# FoodVD - Nền tảng đặt món trực tuyến

## 1. Thông tin sinh viên

- Họ và Tên: Vũ Anh Dũng
- MSSV: 523100079
- Lớp: 523100B
- Giảng viên hướng dẫn: GV. Bùi Thị Thanh

## 2. Mục tiêu đề tài

FoodVD là website thương mại điện tử trong lĩnh vực F&B, hỗ trợ khách hàng xem thực đơn, tìm kiếm món ăn, thêm món vào giỏ hàng, nhập thông tin nhận hàng và thanh toán bằng COD hoặc VietQR.

Hệ thống hướng tới giải quyết bài toán các cửa hàng vừa và nhỏ phải quản lý đơn hàng thủ công, khó theo dõi trạng thái đơn, khó cập nhật món còn/hết và chưa có quy trình đặt món trực tuyến rõ ràng. Bên cạnh đó, đề tài mô phỏng cơ chế bảo vệ dữ liệu nhạy cảm như số điện thoại và địa chỉ khách hàng trước khi hiển thị ở cổng quản trị.

## 3. Chức năng cốt lõi

- Trang chủ giới thiệu nền tảng, banner khuyến mãi và các điểm nổi bật của FoodVD.
- Trang đặt hàng riêng để khách hàng tìm kiếm, lọc món theo danh mục/giá, chọn topping và thêm món vào giỏ.
- Trang thông tin nhận hàng riêng để nhập họ tên, số điện thoại, email, địa chỉ và ghi chú đơn hàng.
- Trang thanh toán riêng hỗ trợ chọn COD hoặc VietQR, nhập mã voucher và xác nhận tạo đơn.
- Đăng ký và đăng nhập tài khoản khách hàng.
- Cổng quản trị chỉ mở sau khi đăng nhập bằng tài khoản admin.
- Admin quản lý đơn hàng, cập nhật trạng thái đơn, hủy đơn chờ duyệt, thêm món mới, bật/tắt trạng thái mở bán và xem báo cáo doanh thu.

## 4. Tài khoản demo

Tài khoản quản trị:

```text
TK: admin@foodvd.vn
MK: FoodVD@2026
```

Tài khoản khách hàng demo:

```text
TK: dung.foodvd@example.com
MK: 123456
```

## 5. Công nghệ sử dụng

- Front-end: React, TypeScript, TailwindCSS.
- Build tool: Vite.
- Quản lý package: pnpm.
- Giao diện: Responsive layout, component-based UI, state management bằng React Hooks.
- Version Control: Git/GitHub.

Định hướng mở rộng theo đề cương:

- Back-end: Python, FastAPI, Pydantic.
- Database: MongoDB.
- Email: Gmail SMTP để gửi hóa đơn.
- Bảo mật: AES-256 để mã hóa số điện thoại và địa chỉ.
- Testing: Pytest cho backend, kiểm thử UI cho frontend.

## 6. Hướng dẫn cài đặt và chạy project

Mở terminal tại thư mục project:

```powershell
cd C:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\_review_meal_planning_app
```

Cài thư viện:

```powershell
pnpm install
```

Chạy website ở môi trường phát triển:

```powershell
pnpm dev
```

Mở trình duyệt tại:

```text
http://127.0.0.1:8443/
```

Build bản production:

```powershell
pnpm build
```

Xem thử bản production sau khi build:

```powershell
pnpm preview
```

## 7. Tiến độ thực hiện

- Checkpoint 01: Khảo sát bài toán đặt món trực tuyến cho cửa hàng F&B, xác định mục tiêu và phạm vi hệ thống.
- Checkpoint 02: Đặc tả yêu cầu khách hàng và quản trị viên, thiết kế Use Case cho đặt hàng, thanh toán và quản lý đơn.
- Checkpoint 03: Xây dựng giao diện React/TypeScript gồm trang chủ, trang đặt hàng, trang thông tin nhận hàng và trang thanh toán.
- Checkpoint 04: Hoàn thiện luồng giỏ hàng, voucher, COD/VietQR demo và tạo đơn hàng.
- Checkpoint 05: Bổ sung đăng ký/đăng nhập, phân quyền tài khoản admin và cổng quản trị riêng.
- Checkpoint 06: Hoàn thiện dashboard admin, báo cáo doanh thu, tối ưu giao diện responsive và chuẩn bị tài liệu báo cáo tốt nghiệp.

## 8. Ghi chú

Phiên bản hiện tại là prototype front-end chạy bằng dữ liệu mẫu trong React state. Các chức năng backend như FastAPI, MongoDB, gửi email hóa đơn và mã hóa AES-256 được mô tả theo định hướng triển khai trong báo cáo/đề cương và có thể phát triển tiếp ở giai đoạn sau.
=======
# DO_AN_KY--52310079--WEB_BAN_DO_AN
>>>>>>> 99373b10613b16c1953df5b4ff392240de219838
