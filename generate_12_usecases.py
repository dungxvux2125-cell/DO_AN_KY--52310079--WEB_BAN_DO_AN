import os
import plantuml
import time

out_dir = r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\diagrams_plantuml"
os.makedirs(out_dir, exist_ok=True)

skin_header = """@startuml
skinparam shadowing false
skinparam dpi 200
skinparam defaultFontName "Times New Roman"
skinparam defaultFontSize 13

skinparam actor {
    BorderColor #333333
    BackgroundColor #FFFFFF
}

skinparam usecase {
    BorderColor #333333
    BackgroundColor #FFFFFF
    ArrowColor #333333
}

left to right direction
"""

DIAGRAMS = {
    # UC01 - Hình 2.2
    "hinh_2_2_uc01_xem_menu": {
        "num": "Hình 2.2",
        "actor": 'actor "Khách Hàng" as Actor',
        "main": 'usecase "Xem thực đơn &\\nThông tin dinh dưỡng" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Lọc món theo 11 danh mục" as UC1', 'UC1', 'extend'),
            ('usecase "Tra cứu Calo, Protein & Xuất xứ" as UC2', 'UC2', 'extend'),
            ('usecase "Tìm kiếm món ăn theo tên" as UC3', 'UC3', 'extend'),
            ('usecase "Xem đánh giá và phản hồi" as UC4', 'UC4', 'extend')
        ]
    },
    # UC02 - Hình 2.3
    "hinh_2_3_uc02_gio_hang": {
        "num": "Hình 2.3",
        "actor": 'actor "Khách Hàng" as Actor',
        "main": 'usecase "Quản lý giỏ hàng &\\nĐặt hàng trực tuyến" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Kiểm tra tồn kho mở bán" as UC1', 'UC1', 'include'),
            ('usecase "Thêm / Xóa món trong giỏ hàng" as UC2', 'UC2', 'extend'),
            ('usecase "Tùy chọn Topping và số lượng" as UC3', 'UC3', 'extend'),
            ('usecase "Áp dụng chính sách Freeship" as UC4', 'UC4', 'extend')
        ]
    },
    # UC03 - Hình 2.4
    "hinh_2_4_uc03_thanh_toan": {
        "num": "Hình 2.4",
        "actor": 'actor "Khách Hàng" as Actor',
        "main": 'usecase "Thanh toán đơn hàng" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Xác nhận & Lưu đơn hàng" as UC1', 'UC1', 'include'),
            ('usecase "Chuyển khoản VietQR động NAPAS247" as UC2', 'UC2', 'extend'),
            ('usecase "Thanh toán tiền mặt khi nhận (COD)" as UC3', 'UC3', 'extend'),
            ('usecase "Áp dụng Voucher giảm giá" as UC4', 'UC4', 'extend')
        ]
    },
    # UC04 - Hình 2.5
    "hinh_2_5_uc04_theo_doi_don": {
        "num": "Hình 2.5",
        "actor": 'actor "Khách Hàng" as Actor',
        "main": 'usecase "Tra cứu & Theo dõi\\ntiến độ đơn hàng" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Cập nhật tiến trình Live Stepper" as UC1', 'UC1', 'include'),
            ('usecase "Xem chi tiết thông tin đơn hàng" as UC2', 'UC2', 'extend'),
            ('usecase "Tra cứu lịch sử đơn đã mua" as UC3', 'UC3', 'extend'),
            ('usecase "Hủy đơn hàng chờ xác nhận" as UC4', 'UC4', 'extend')
        ]
    },
    # UC05 - Hình 2.6
    "hinh_2_6_uc05_danh_gia": {
        "num": "Hình 2.6",
        "actor": 'actor "Khách Hàng" as Actor',
        "main": 'usecase "Đánh giá món ăn &\\nChất lượng dịch vụ" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Kiểm tra điều kiện đơn Hoàn tất" as UC1', 'UC1', 'include'),
            ('usecase "Chấm điểm số sao (1 đến 5 sao)" as UC2', 'UC2', 'extend'),
            ('usecase "Nhập nội dung nhận xét chi tiết" as UC3', 'UC3', 'extend'),
            ('usecase "Đính kèm hình ảnh thực tế món ăn" as UC4', 'UC4', 'extend')
        ]
    },
    # UC06 - Hình 2.7
    "hinh_2_7_uc06_ho_so": {
        "num": "Hình 2.7",
        "actor": 'actor "Người Dùng" as Actor',
        "main": 'usecase "Đăng ký, Đăng nhập &\\nQuản lý hồ sơ cá nhân" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập hệ thống" as Login',
        "subs": [
            ('usecase "Xác thực tài khoản và cấp JWT" as UC1', 'UC1', 'include'),
            ('usecase "Đăng ký tài khoản mới" as UC2', 'UC2', 'extend'),
            ('usecase "Cập nhật thông tin hồ sơ & Địa chỉ" as UC3', 'UC3', 'extend'),
            ('usecase "Đổi mật khẩu bảo mật" as UC4', 'UC4', 'extend')
        ]
    },
    # UC07 - Hình 2.8 (Quản lý món ăn -> Quản lý => Include)
    "hinh_2_8_uc07_quan_ly_mon_an": {
        "num": "Hình 2.8",
        "actor": 'actor "Quản Trị Viên" as Actor',
        "main": 'usecase "Quản lý danh mục 54 món &\\nKiểm soát mở bán" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Thêm mới món ăn vào hệ thống" as UC1', 'UC1', 'include'),
            ('usecase "Chỉnh sửa thông tin, giá & dinh dưỡng" as UC2', 'UC2', 'include'),
            ('usecase "Khóa mở bán khi hết nguyên liệu" as UC3', 'UC3', 'include'),
            ('usecase "Xóa hoặc ẩn món ăn khỏi thực đơn" as UC4', 'UC4', 'include')
        ]
    },
    # UC08 - Hình 2.9 (Quản lý đơn hàng & bếp -> Quản lý => Include)
    "hinh_2_9_uc08_quan_ly_don_bep": {
        "num": "Hình 2.9",
        "actor": 'actor "Nhân Viên Bếp" as Actor',
        "main": 'usecase "Quản lý đơn hàng &\\nĐiều phối vận hành bếp" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Tiếp nhận đơn hàng mới & Xác nhận" as UC1', 'UC1', 'include'),
            ('usecase "Chuyển trạng thái Đang chế biến" as UC2', 'UC2', 'include'),
            ('usecase "Xác nhận Hoàn thành & Chuyển Shipper" as UC3', 'UC3', 'include'),
            ('usecase "Cập nhật đơn hoàn tất giao thành công" as UC4', 'UC4', 'include')
        ]
    },
    # UC09 - Hình 2.10 (Báo cáo doanh thu & Lịch sử đơn hoàn tất -> Quản lý/Thống kê => Include, Lọc => Extend)
    "hinh_2_10_uc09_doanh_thu": {
        "num": "Hình 2.10",
        "actor": 'actor "Quản Trị Viên" as Actor',
        "main": 'usecase "Báo cáo phân tích doanh thu &\\nLịch sử đơn hoàn tất" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Tổng hợp doanh thu theo ngày/tháng" as UC1', 'UC1', 'include'),
            ('usecase "Thống kê 4 thẻ chỉ số KPI tài chính" as UC2', 'UC2', 'include'),
            ('usecase "Đối soát danh sách đơn hoàn tất & hủy" as UC3', 'UC3', 'include'),
            ('usecase "Lọc báo cáo theo khoảng thời gian" as UC4', 'UC4', 'extend')
        ]
    },
    # UC10 - Hình 2.11 (Quản lý Voucher -> Quản lý => Include)
    "hinh_2_11_uc10_voucher": {
        "num": "Hình 2.11",
        "actor": 'actor "Quản Trị Viên" as Actor',
        "main": 'usecase "Quản lý chương trình khuyến mãi &\\nMã giảm giá Voucher" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Tạo mới mã Voucher khuyến mãi" as UC1', 'UC1', 'include'),
            ('usecase "Cấu hình tỷ lệ giảm & đơn tối thiểu" as UC2', 'UC2', 'include'),
            ('usecase "Kích hoạt hoặc tạm dừng mã Voucher" as UC3', 'UC3', 'include'),
            ('usecase "Xóa mã giảm giá hết hiệu lực" as UC4', 'UC4', 'include')
        ]
    },
    # UC11 - Hình 2.12 (Điểm danh & Chấm công -> Quản lý chấm công => Include)
    "hinh_2_12_uc11_cham_cong": {
        "num": "Hình 2.12",
        "actor": 'actor "Nhân Viên" as Actor',
        "main": 'usecase "Điểm danh & Chấm công\\ntheo ca làm việc" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Xác nhận chọn ca làm việc trong ngày" as UC1', 'UC1', 'include'),
            ('usecase "Ghi nhận thời gian Check-in vào ca" as UC2', 'UC2', 'include'),
            ('usecase "Ghi nhận thời gian Check-out kết ca" as UC3', 'UC3', 'include'),
            ('usecase "Lưu trữ lịch sử chấm công vào CSDL" as UC4', 'UC4', 'include')
        ]
    },
    # UC12 - Hình 2.13 (Duyệt bảng chấm công & Tính lương -> Quản lý lương => Include)
    "hinh_2_13_uc12_tinh_luong": {
        "num": "Hình 2.13",
        "actor": 'actor "Quản Trị Viên" as Actor',
        "main": 'usecase "Duyệt bảng chấm công &\\nTính lương nhân viên" as Main #E8F4F8',
        "login": 'usecase "Đăng nhập" as Login',
        "subs": [
            ('usecase "Đồng bộ dữ liệu chấm công từ nhân viên" as UC1', 'UC1', 'include'),
            ('usecase "Tính lương tự động theo số ca làm" as UC2', 'UC2', 'include'),
            ('usecase "Phê duyệt và chốt bảng lương tháng" as UC3', 'UC3', 'include'),
            ('usecase "Xuất báo cáo bảng lương ra Excel" as UC4', 'UC4', 'include')
        ]
    }
}

server = plantuml.PlantUML(url='http://www.plantuml.com/plantuml/img/')

print(f"Starting rendering {len(DIAGRAMS)} diagrams...")
for key, d in DIAGRAMS.items():
    puml_lines = [skin_header]
    puml_lines.append(d["actor"])
    puml_lines.append("")
    puml_lines.append(d["main"])
    puml_lines.append(d["login"])
    puml_lines.append("")
    for sub_def, _, _ in d["subs"]:
        puml_lines.append(sub_def)
    puml_lines.append("")
    puml_lines.append("Actor -- Main")
    puml_lines.append("")
    # Top Login is ALWAYS <<include>>
    puml_lines.append("Main ..> Login : <<include>>")
    puml_lines.append("")
    # Subs: if include: Main ..> Sub : <<include>>
    #       if extend:  Main <.. Sub : <<extend>>
    for _, sub_var, rel_type in d["subs"]:
        if rel_type == "include":
            puml_lines.append(f"Main ..> {sub_var} : <<include>>")
        else:
            puml_lines.append(f"Main <.. {sub_var} : <<extend>>")
    puml_lines.append("")
    puml_lines.append("@enduml")

    puml_code = "\n".join(puml_lines)
    
    # Save .puml
    puml_file = os.path.join(out_dir, f"{key}.puml")
    with open(puml_file, "w", encoding="utf-8") as f:
        f.write(puml_code)

    # Render .png
    png_file = os.path.join(out_dir, f"{key}.png")
    success = False
    for attempt in range(3):
        try:
            raw = server.processes(puml_code)
            with open(png_file, "wb") as f:
                f.write(raw)
            print(f"[{d['num']}] OK: {key}.png ({len(raw)} bytes)")
            success = True
            break
        except Exception as e:
            print(f"[{d['num']}] Attempt {attempt+1} failed: {e}")
            time.sleep(1)
            
    if not success:
        print(f"[{d['num']}] FAILED: {key}")

print("Rendering process completed!")
