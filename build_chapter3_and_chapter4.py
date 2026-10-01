# -*- coding: utf-8 -*-
"""
PHẦN THÂN BÁO CÁO: CHƯƠNG 3, CHƯƠNG 4 VÀ PHẦN KẾT LUẬN
"""

import sys
from pathlib import Path

BASE = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP")
sys.path.append(str(BASE))

from generate_full_perfect_report import doc, p, h, bullets, fig, tbl, add_usecase_spec, OUT_PATH
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Inches, RGBColor

# Import previous chapters
import build_full_chapters

print("Appending Chapter 3: Phân tích và Thiết kế hệ thống...")

# =========================================================================
# CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
# =========================================================================
h("CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", level=1)

h("3.1 Khảo sát hiện trạng và mô tả đề tài", level=2)
p("Hệ thống FoodVD được xây dựng nhằm mục đích số hóa toàn diện quy trình vận hành và kinh doanh ẩm thực. Qua khảo sát thực tế, hệ thống được phân rã thành ba phân hệ nghiệp vụ chính với sự phối hợp nhịp nhàng:")
bullets([
    "Phân hệ Bán hàng (Storefront Client): Phục vụ khách hàng tìm kiếm món ăn, khám phá 3D trực quan, tùy biến chọn topping, quản lý giỏ hàng, áp mã khuyến mãi và thanh toán.",
    "Phân hệ Vận hành Bếp & Giao nhận (Staff Portal): Phục vụ nhân viên nhà hàng theo dõi các đơn hàng mới, cập nhật trạng thái chế biến và giao hàng, bật tắt món ăn hết nguyên liệu và chấm công làm việc.",
    "Phân hệ Quản trị Doanh nghiệp (Admin Portal): Phục vụ chủ nhà hàng kiểm soát toàn diện bảng thực đơn, chỉnh sửa lương và thưởng phạt nhân viên, xem báo cáo doanh thu tài chính và thiết lập chiến dịch giảm giá."
])

h("3.2 Phân tích nghiệp vụ hệ thống theo từng vai trò", level=2)
p("Bảng 3.1: Ma trận phân tích trách nhiệm nghiệp vụ theo từng vai trò người dùng (RACI)", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=3)
tbl(["Vai trò (Actor)", "Mô tả trách nhiệm", "Các quyền hạn chức năng chính"], [
    ["Khách vãng lai", "Người dùng chưa đăng nhập hệ thống", "Xem thực đơn, tìm kiếm món, lọc giá, trải nghiệm xem 3D xoay 360 độ."],
    ["Khách hàng (Customer)", "Người dùng đã đăng ký & đăng nhập tài khoản", "Thêm giỏ hàng, chọn topping, áp mã Voucher, đặt hàng (COD/VietQR), theo dõi đơn hàng trực tiếp, viết đánh giá và chấm điểm sao."],
    ["Nhân viên (Staff)", "Nhân viên phục vụ và vận hành cửa hàng", "Quản lý trạng thái món ăn (Còn món/Tạm hết), chuyển trạng thái đơn hàng (Chờ duyệt -> Đang chuẩn bị -> Đang giao -> Hoàn tất), chấm công theo ca (Vào ca/Tan ca)."],
    ["Quản trị viên (Admin)", "Chủ nhà hàng / Quản lý cấp cao", "Thêm món mới vào kho, xem báo cáo doanh thu và đơn hủy, chỉnh sửa bảng lương nhân viên, đồng bộ chấm công tự động, tạo và quản lý mã Voucher."]
], [1.3, 2.0, 3.2])

h("3.3 Xây dựng Biểu đồ Use Case và Đặc tả chi tiết các Use Case", level=2)
p("Dưới đây là các biểu đồ Use Case mô hình hóa chi tiết tương tác của các tác nhân đối với hệ thống FoodVD, được trích xuất và chuẩn hóa từ công cụ StarUML:")

fig("Hinh_3_1_UseCase_TongQuat.png", "Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD")
p("Biểu đồ Hình 3.1 thể hiện cấu trúc Use Case tổng quát toàn hệ thống. Bốn tác nhân chính tương tác với 10 ca sử dụng cốt lõi nằm trong ranh giới hệ thống (System Boundary) FoodVD.")

# 3.3.1
h("3.3.1. Use case tổng quát", level=3)
p("Use case tổng quát xác định ranh giới giữa các tác nhân bên ngoài và các phân hệ dịch vụ bên trong hệ thống FoodVD. Mỗi nhóm người dùng có một không gian làm việc độc lập.")

# 3.3.2
h("3.3.2. Use case Xem thực đơn & Tìm kiếm món ăn", level=3)
add_usecase_spec(
    "UC01", "Xem thực đơn & Tìm kiếm món ăn",
    "Khách vãng lai, Khách hàng",
    "Cho phép người dùng tra cứu danh sách món ăn, tìm kiếm theo tên hoặc nguyên liệu, lọc theo mức giá tối đa và phân loại danh mục.",
    "Người dùng truy cập vào trang web FoodVD (trang Chủ hoặc trang Đặt hàng).",
    "1. Người dùng nhập từ khóa tìm kiếm vào ô input hoặc chọn danh mục (Món chính, Ăn nhẹ, Đồ uống, Combo).\n2. Người dùng kéo thanh trượt điều chỉnh mức giá tối đa (30.000đ - 240.000đ).\n3. Hệ thống lọc dữ liệu thời gian thực và hiển thị danh sách thẻ món ăn phù hợp gồm ảnh, tên, giá, số sao và số lượng đã bán.",
    "Không tìm thấy món ăn phù hợp: Hệ thống hiển thị thông báo 'Không tìm thấy món ăn nào phù hợp với bộ lọc' kèm nút Xóa tìm kiếm.",
    "Danh sách các món ăn thỏa mãn điều kiện hiển thị trên màn hình."
)

# 3.3.3
h("3.3.3. Use case Trải nghiệm tương tác 3D món ăn", level=3)
add_usecase_spec(
    "UC02", "Trải nghiệm tương tác 3D món ăn",
    "Khách vãng lai, Khách hàng",
    "Cho phép người dùng tương tác xoay 360 độ, phóng to thu nhỏ mô hình 3D thực tế của đồ uống/món ăn trực tiếp trên trình duyệt WebGL.",
    "Người dùng đang xem danh sách món ăn trên thực đơn.",
    "1. Người dùng bấm vào nút '✨ Trải nghiệm 3D' trên thẻ món ăn.\n2. Hệ thống tải component Google Model-Viewer và nạp tệp mô hình 3D (.glb).\n3. Người dùng dùng chuột hoặc ngón tay xoay góc nhìn 360 độ, phóng to chi tiết.\n4. Người dùng bấm 'Thêm vào giỏ' hoặc đóng cửa sổ popup.",
    "Mô hình 3D chưa được hỗ trợ cho món ăn này: Hệ thống hiển thị ảnh 2D chất lượng cao thay thế.",
    "Người dùng nắm bắt được hình dáng và chi tiết thực tế của sản phẩm."
)

# 3.3.4
h("3.3.4. Use case Đăng ký & Đăng nhập tài khoản", level=3)
add_usecase_spec(
    "UC03", "Đăng ký & Đăng nhập tài khoản",
    "Khách vãng lai, Khách hàng, Nhân viên, Admin",
    "Xác thực danh tính người dùng và điều hướng phân quyền giao diện chính xác theo vai trò (Role-based Authorization).",
    "Người dùng chọn chức năng Đăng nhập hoặc Đăng ký trên thanh menu.",
    "1. Người dùng nhập Email và Mật khẩu (hoặc nhập thêm Họ tên khi Đăng ký).\n2. Bấm nút 'Đăng nhập' / 'Đăng ký'.\n3. Backend kiểm tra tài khoản trong MongoDB (Collection users).\n4. Hệ thống cấp quyền và điều hướng: Customer về giỏ hàng/thực đơn; Staff về trang Quản lý đơn hàng; Admin về trang Quản trị thực đơn & doanh thu.",
    "Sai mật khẩu hoặc email chưa tồn tại: Hệ thống hiển thị thông báo lỗi màu đỏ 'Sai tài khoản hoặc mật khẩu. Vui lòng kiểm tra lại'.",
    "Người dùng đăng nhập thành công, phiên làm việc được lưu trữ an toàn."
)

# 3.3.5
h("3.3.5. Use case Quản lý giỏ hàng & Chọn Topping", level=3)
fig("Hinh_3_2_UseCase_KhachHang.png", "Hình 3.2: Biểu đồ Use Case chi tiết phân hệ Khách hàng")
add_usecase_spec(
    "UC04", "Quản lý giỏ hàng & Chọn Topping",
    "Khách hàng (Bắt buộc đăng nhập)",
    "Cho phép khách hàng thêm món, tùy chọn các loại topping gia tăng, điều chỉnh số lượng hoặc xóa món khỏi giỏ hàng.",
    "Khách hàng đã đăng nhập tài khoản vào hệ thống.",
    "1. Khách hàng bấm chọn các loại Topping kèm theo (Trứng chần, Thêm bò, Quẩy...).\n2. Giá món ăn tự động cộng dồn minh bạch theo đơn giá topping.\n3. Khách bấm 'Thêm vào giỏ hàng'.\n4. Huy hiệu số lượng trên Giỏ hàng cập nhật tăng tức thời.",
    "Khách hàng chưa đăng nhập mà bấm 'Thêm vào giỏ': Hệ thống chặn lại, hiển thị thông báo cảnh báo 'Vui lòng đăng nhập để thêm món vào giỏ hàng' và tự động chuyển hướng đến trang Login.",
    "Món ăn kèm topping được lưu trữ vào giỏ hàng của khách hàng."
)

# 3.3.6
h("3.3.6. Use case Đặt món & Thanh toán (COD / VietQR)", level=3)
add_usecase_spec(
    "UC05", "Đặt món & Thanh toán (COD / VietQR)",
    "Khách hàng",
    "Cho phép khách hàng nhập thông tin giao nhận, áp mã Voucher giảm giá, chọn phương thức thanh toán và gửi đơn hàng lên hệ thống.",
    "Giỏ hàng có ít nhất một món ăn hợp lệ và khách hàng đã đăng nhập.",
    "1. Khách hàng kiểm tra giỏ hàng, nhập mã Voucher (nếu có) và bấm 'Áp dụng'.\n2. Hệ thống kiểm tra điều kiện đơn tối thiểu và trừ tiền giảm giá tương ứng.\n3. Khách hàng điền thông tin địa chỉ và số điện thoại nhận hàng.\n4. Khách hàng chọn phương thức thanh toán: COD (Tiền mặt) hoặc VietQR (Chuyển khoản).\n5. Khách bấm 'Xác nhận đặt hàng'. Backend thực thi kiểm tra tồn kho nguyên tử (Atomic Lock) và tạo đơn hàng.",
    "Món ăn bị hết hàng do có khách khác đặt trước (Tranh chấp tồn kho): Hệ thống trả mã lỗi HTTP 409 Conflict, thông báo 'Món vừa hết hàng do có khách đặt trước' và giữ nguyên giỏ hàng để khách chọn món khác.",
    "Đơn hàng được lưu thành công vào MongoDB với trạng thái 'Chờ duyệt'."
)

# 3.3.7
h("3.3.7. Use case Theo dõi tiến trình đơn hàng", level=3)
add_usecase_spec(
    "UC06", "Theo dõi tiến trình đơn hàng",
    "Khách hàng",
    "Cho phép khách hàng theo dõi trạng thái chế biến và hành trình giao hàng của đơn hàng theo thời gian thực.",
    "Khách hàng đã đặt ít nhất một đơn hàng thành công.",
    "1. Khách hàng truy cập vào trang 'Tài khoản'.\n2. Hệ thống truy vấn danh sách đơn hàng của khách hàng từ MongoDB theo Email.\n3. Hiển thị tiến trình trực quan với 4 mốc: Chờ duyệt -> Đang chuẩn bị -> Đang giao -> Hoàn tất.",
    "Khách hàng muốn hủy đơn khi đơn còn ở trạng thái 'Chờ duyệt': Bấm nút 'Hủy đơn hàng', hệ thống cập nhật trạng thái đơn thành 'Đã hủy'.",
    "Khách hàng nắm bắt được thời gian chính xác đồ ăn sẽ được giao tới nơi."
)

# 3.3.8
h("3.3.8. Use case Đánh giá món ăn & Chấm điểm sao", level=3)
add_usecase_spec(
    "UC07", "Đánh giá món ăn & Chấm điểm sao",
    "Khách hàng",
    "Cho phép khách hàng gửi đánh giá nhận xét và chấm điểm từ 1 đến 5 sao cho món ăn; hệ thống tự động tính toán lại điểm trung bình động.",
    "Khách hàng đã đăng nhập và đã trải nghiệm món ăn.",
    "1. Khách hàng bấm nút '⭐ Đánh giá' trên thẻ món ăn hoặc trong đơn hàng hoàn tất.\n2. Chọn số sao tương tác (từ 1 đến 5 sao) và nhập lời bình luận.\n3. Bấm 'Gửi đánh giá'.\n4. Hệ thống lưu vào Collection reviews, tính toán lại điểm rating trung bình cộng và cập nhật ngay lập tức vào Collection dishes.",
    "Người dùng để trống nội dung hoặc chưa chọn số sao: Hệ thống yêu cầu điền đầy đủ trước khi gửi.",
    "Đánh giá được ghi nhận và điểm số sao của món ăn trên toàn hệ thống được cập nhật động."
)

# 3.3.9
h("3.3.9. Use case Quản lý thực đơn & Tồn kho món ăn (Admin/Staff)", level=3)
fig("Hinh_3_3_UseCase_Admin_NhanVien.png", "Hình 3.3: Biểu đồ Use Case chi tiết phân hệ Quản trị viên và Nhân viên")
add_usecase_spec(
    "UC08", "Quản lý thực đơn & Tồn kho món ăn",
    "Admin, Staff",
    "Cho phép Admin thêm món ăn mới, chỉnh sửa giá bán, danh mục, thiết lập số lượng tồn kho (stock); cho phép Staff bật/tắt trạng thái Còn hàng / Tạm hết.",
    "Người dùng đăng nhập với vai trò Admin hoặc Staff.",
    "1. Người dùng truy cập phân hệ Quản lý sản phẩm.\n2. Admin điền thông tin món mới (Tên, Danh mục, Giá, Tồn kho) và bấm 'Thêm món'. Dữ liệu lưu vào MongoDB.\n3. Staff/Admin bấm nút toggle để bật hoặc tắt trạng thái còn món.",
    "Món ăn có số lượng tồn kho về 0: Hệ thống tự động chuyển trạng thái hiển thị sang 'Tạm hết' trên giao diện khách hàng.",
    "Thực đơn và số lượng kho được cập nhật đồng bộ toàn hệ thống."
)

# 3.3.10
h("3.3.10. Use case Quản lý & Xử lý đơn hàng (Staff)", level=3)
add_usecase_spec(
    "UC09", "Quản lý & Xử lý đơn hàng",
    "Nhân viên (Staff)",
    "Tiếp nhận đơn hàng mới từ khách, xác nhận nguyên liệu bếp và điều phối chuyển trạng thái đơn hàng.",
    "Nhân viên đăng nhập tài khoản Staff.",
    "1. Nhân viên mở tab 'Quản lý đơn hàng'.\n2. Xem chi tiết danh sách đơn hàng đang chờ duyệt gồm tên khách, số điện thoại che mờ, địa chỉ và các món đặt kèm topping.\n3. Bấm nút chuyển trạng thái tuần tự: Duyệt đơn (Đang chuẩn bị) -> Bắt đầu giao (Đang giao) -> Đã giao xong (Hoàn tất).",
    "Khách gọi điện xin hủy đơn hoặc hết nguyên liệu bếp: Nhân viên bấm 'Hủy đơn', hệ thống hoàn trả lại số lượng tồn kho về cơ sở dữ liệu.",
    "Trạng thái đơn hàng được cập nhật trực tiếp đến giao diện theo dõi của khách hàng."
)

# 3.3.11
h("3.3.11. Use case Chấm công vào ca / tan ca (Staff)", level=3)
add_usecase_spec(
    "UC10", "Chấm công vào ca / tan ca",
    "Nhân viên (Staff)",
    "Ghi nhận thời gian bắt đầu làm việc và kết thúc ca làm của nhân viên để phục vụ công tác tính lương.",
    "Nhân viên đăng nhập tài khoản Staff.",
    "1. Nhân viên mở tab 'Chấm công'.\n2. Chọn ca làm việc hôm nay: Ca Sáng (08:00 - 14:00) hoặc Ca Tối (16:00 - 22:00).\n3. Bấm nút '🟢 Vào ca': Hệ thống ghi nhận giờ check-in và trạng thái 'Đang làm'.\n4. Kết thúc ca, bấm nút '🛑 Tan ca': Hệ thống ghi nhận giờ check-out và trạng thái 'Hoàn thành'.",
    "Nhân viên quên bấm Tan ca: Bản ghi giữ trạng thái 'Đang làm' để Quản trị viên đối soát thủ công.",
    "Lịch sử ca làm việc được lưu vào Collection timekeepings phục vụ đồng bộ bảng lương."
)

# 3.3.12
h("3.3.12. Use case Quản lý bảng lương & Đồng bộ chấm công (Admin)", level=3)
add_usecase_spec(
    "UC11", "Quản lý bảng lương & Đồng bộ chấm công",
    "Quản trị viên (Admin)",
    "Quản lý danh sách lương nhân viên, chỉnh sửa đơn giá ca làm, tiền thưởng, tiền phạt và tự động đồng bộ số ca từ dữ liệu chấm công.",
    "Người dùng đăng nhập tài khoản Admin.",
    "1. Admin truy cập tab 'Nhân viên & Lương'.\n2. Xem bảng tổng hợp lương: Tên, Chức vụ, Số ca làm, Lương/ca, Thưởng, Phạt, Tổng lương.\n3. Admin bấm '🔄 Đồng bộ từ Chấm công': Hệ thống quét Collection timekeepings đếm số ca 'Hoàn thành' của từng nhân viên và tự động cập nhật lại số ca.\n4. Admin có thể bấm 'Chỉnh sửa' trực tiếp trên từng dòng để điều chỉnh thưởng/phạt. Tổng lương tự động tính toán lại theo công thức: Lương = Số ca * Đơn giá + Thưởng - Phạt.",
    "Không có bản ghi chấm công mới: Bảng lương giữ nguyên số ca hiện tại.",
    "Bảng lương nhân viên chính xác, minh bạch và sẵn sàng phục vụ chi trả."
)

# 3.3.13
h("3.3.13. Use case Báo cáo doanh thu & Quản lý Voucher (Admin)", level=3)
add_usecase_spec(
    "UC12", "Báo cáo doanh thu & Quản lý Voucher",
    "Quản trị viên (Admin)",
    "Xem báo cáo số liệu tài chính tổng quan, tỷ lệ đơn hoàn tất/đơn hủy, món bán chạy nhất; tạo và kích hoạt các chiến dịch mã giảm giá Voucher.",
    "Người dùng đăng nhập tài khoản Admin.",
    "1. Admin mở tab 'Doanh thu': Hệ thống tổng hợp doanh thu từ các đơn hàng có trạng thái khác 'Đã hủy', tính tổng số đơn thành công, số đơn hủy và tìm ra món có lượt bán cao nhất.\n2. Admin mở tab 'Mã giảm giá': Nhập mã code (VD: FOODVD50), nhãn, loại giảm (phần trăm hoặc tiền mặt), giá trị và đơn tối thiểu.\n3. Bấm 'Thêm mã giảm giá' hoặc bấm bật/tắt kích hoạt voucher trên bảng danh sách.",
    "Nhập trùng mã code Voucher đã có: Hệ thống cảnh báo mã giảm giá đã tồn tại.",
    "Dữ liệu báo cáo tài chính hiển thị trực quan và các mã Voucher sẵn sàng áp dụng tại bước thanh toán của khách."
)

h("3.4 Thiết kế Biểu đồ hoạt động (Activity Diagrams)", level=2)
p("Biểu đồ hoạt động mô tả chi tiết luồng xử lý nghiệp vụ theo thời gian của các quy trình quan trọng trong hệ thống:")

fig("Hinh_3_4_Activity_DatHang_Atomic.png", "Hình 3.4: Biểu đồ hoạt động Quy trình Đặt hàng và Trừ kho nguyên tử")
p("Biểu đồ Hình 3.4 mô tả toàn bộ luồng hoạt động từ lúc khách chọn món, kiểm tra đăng nhập bắt buộc khi bấm thêm giỏ hàng, đến bước then chốt: Database thực thi câu lệnh nguyên tử findOneAndUpdate. Nếu kho không đủ, luồng rẽ nhánh sang việc tự động kích hoạt Rollback hoàn trả kho và thông báo lỗi HTTP 409 cho khách hàng.")

fig("Hinh_3_5_Activity_ChamCong_Luong.png", "Hình 3.5: Biểu đồ hoạt động Quy trình Chấm công và Tính lương nhân viên")
p("Biểu đồ Hình 3.5 mô tả chu trình khép kín: Nhân viên thực hiện bấm 'Vào ca' và 'Tan ca' theo ca làm việc (Sáng/Tối). Dữ liệu được lưu trữ tự động vào bảng timekeepings. Khi Quản trị viên bấm nút 'Đồng bộ từ Chấm công', hệ thống tự động tổng hợp số ca đã hoàn thành và nhân với đơn giá lương ca, cộng thưởng, trừ phạt để ra tổng lương thực nhận.")

fig("Hinh_3_6_Activity_DanhGia_Rating.png", "Hình 3.6: Biểu đồ hoạt động Quy trình Đánh giá món ăn và Tính số sao động")
p("Biểu đồ Hình 3.6 minh họa giải thuật tính điểm sao động: Khi nhận được một đánh giá mới, hệ thống truy vấn tổng số điểm sao và tổng số đánh giá của món ăn đó trong cơ sở dữ liệu MongoDB, áp dụng công thức trung bình cộng và làm tròn 1 chữ số thập phân, sau đó cập nhật ngược lại vào thuộc tính rating của bảng món ăn.")

h("3.5 Thiết kế Biểu đồ trình tự & Giải thuật giải quyết tranh chấp tồn kho đồng thời", level=2)
p("Để giải quyết tận gốc bài toán hai khách hàng cùng đặt một sản phẩm mà kho chỉ còn đúng 1 suất, hệ thống áp dụng cơ chế Khóa mức tài liệu (Document-Level Lock) của MongoDB WiredTiger kết hợp lệnh nguyên tử Compare-And-Swap:")

fig("Hinh_3_7_Sequence_RaceCondition.png", "Hình 3.7: Biểu đồ trình tự Giải quyết tranh chấp đặt hàng đồng thời (Race Condition)")
p("Biểu đồ trình tự Hình 3.7 mô tả chính xác tương tác qua lại giữa Khách hàng A, Khách hàng B, Backend Express API và MongoDB:")
bullets([
    "Bước 1 & 2: Cả hai khách hàng A và B cùng gửi yêu cầu POST /api/orders đến máy chủ máy chủ để mua cùng món ăn X có số lượng là 1 (trong kho chỉ còn stock = 1).",
    "Bước 3: Lệnh của Khách A được đưa vào vùng Critical Section của MongoDB trước (do chênh lệch nano-giây hoặc thứ tự luồng). Lệnh findOneAndUpdate({ id: X, stock: {$gte: 1} }, {$inc: {stock: -1}}) kiểm tra thấy stock = 1 thỏa mãn điều kiện, liền lập tức trừ kho về 0.",
    "Bước 4: MongoDB trả về bản ghi món ăn đã cập nhật thành công cho Khách A. Đơn hàng của A được tạo và trả về mã HTTP 201 Created.",
    "Bước 5: Lệnh của Khách B được đưa vào xử lý ngay sau đó. Lúc này giá trị stock trong cơ sở dữ liệu đã bằng 0. Điều kiện stock: {$gte: 1} không còn thỏa mãn.",
    "Bước 6: MongoDB trả về kết quả null, từ chối việc giảm tồn kho.",
    "Bước 7 & 8: Backend phát hiện lệnh trừ kho thất bại, lập tức kích hoạt hàm hoàn tác (Rollback) các món khác trong giỏ (nếu có) và trả về mã lỗi HTTP 409 Conflict với thông báo rõ ràng cho Khách B: 'Rất tiếc! Món ăn vừa hết hàng do có khách đặt trước. Vui lòng chọn món khác!'.",
    "Kết quả: Kho hàng được bảo vệ nguyên vẹn ở mức 0 suất, tuyệt đối không bị âm thành -1 suất."
])

h("3.6 Thiết kế Biểu đồ trạng thái vòng đời đơn hàng", level=2)
p("Đơn hàng trong hệ thống FoodVD trải qua một vòng đời trạng thái hữu hạn được quản lý chặt chẽ:")

fig("Hinh_3_8_State_DonHang.png", "Hình 3.8: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)")
p("Hình 3.8 mô tả các trạng thái của một đơn hàng: Khởi tạo (Created) -> Chờ duyệt (Pending) -> Đang chuẩn bị (Preparing) -> Đang giao (Delivering) -> Hoàn tất (Completed). Trường hợp hết hàng hoặc khách hủy đơn, đơn hàng chuyển thẳng sang trạng thái Đã hủy (Cancelled).")

h("3.7 Thiết kế Biểu đồ lớp miền nghiệp vụ (Domain Class Model)", level=2)
p("Biểu đồ lớp biểu diễn các thực thể đối tượng trong miền nghiệp vụ của hệ thống FoodVD cùng các thuộc tính và phương thức thao tác:")

fig("Hinh_3_9_Class_Diagram.png", "Hình 3.9: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD")
p("Hình 3.9 thể hiện các lớp cốt lõi: User (Người dùng), Dish (Món ăn), Order (Đơn hàng), Review (Đánh giá), Voucher (Mã giảm giá), TimekeepingRecord (Bản ghi chấm công) và StaffSalary (Bảng lương). Mối quan hệ giữa User và Order là quan hệ 1 - N (một người dùng có thể đặt nhiều đơn hàng); quan hệ giữa Dish và Review là quan hệ 1 - N (một món ăn có thể nhận được nhiều đánh giá).")

h("3.8 Thiết kế Cấu trúc Cơ sở dữ liệu MongoDB (Collections Schema)", level=2)
p("Cơ sở dữ liệu FoodVD được thiết kế theo mô hình Document NoSQL chuẩn mực trên MongoDB, bao gồm 6 Collection chính:")

fig("Hinh_3_10_MongoDB_Schema.png", "Hình 3.10: Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Document Collections Schema)")
p("Bảng 3.2: Chi tiết cấu trúc các Collection trong cơ sở dữ liệu MongoDB FoodVD", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=3)
tbl(["Tên Collection", "Mô tả chức năng", "Các trường thuộc tính chính và Chỉ mục (Indexes)"], [
    ["users", "Lưu trữ tài khoản người dùng", "_id (PK), name, email (Unique Index), password, role ('customer'|'staff'|'admin'), createdAt"],
    ["dishes", "Lưu trữ danh mục thực đơn món ăn", "_id (PK), id (Unique Index), name, category, price, promoPrice, stock (Atomic Checked), rating, reviewsCount, available, toppings"],
    ["orders", "Lưu trữ lịch sử đơn đặt hàng", "_id (PK), id (FVD-XXXXXX), customerName, phoneMasked, addressMasked, payment, total, status, items (Array), createdAt"],
    ["reviews", "Lưu trữ đánh giá & nhận xét của khách", "_id (PK), id, dishId (Index), userName, userEmail, rating (1..5), comment, createdAt"],
    ["vouchers", "Lưu trữ mã khuyến mãi giảm giá", "_id (PK), code (Unique Index), label, type ('percent'|'fixed'), value, min, active"],
    ["timekeepings", "Lưu trữ lịch sử chấm công nhân viên", "_id (PK), id, staffId, staffName, date, shift ('Sáng'|'Tối'), checkInTime, checkOutTime, status"]
], [1.2, 2.0, 3.3])

h("3.9 Thiết kế Biểu đồ Kiến trúc Thành phần và Triển khai", level=2)
p("Biểu đồ Kiến trúc Thành phần và Triển khai mô tả cấu trúc vật lý và các module phần mềm vận hành trên môi trường thực tế:")

fig("Hinh_3_11_Component_Deployment.png", "Hình 3.11: Biểu đồ thành phần kiến trúc và triển khai hệ thống FoodVD")
p("Hình 3.11 làm rõ sự tương tác giữa 3 nút kiến trúc phần cứng chính: Trình duyệt Client (chạy React 19 SPA và Google Model-Viewer 3D), Máy chủ ứng dụng Node.js (chạy Express API, Atomic Stock Controller và Mongoose ODM) và Máy chủ cơ sở dữ liệu MongoDB (chạy WiredTiger Engine với Document Locking) giao tiếp qua cổng bảo mật 27017.")
doc.add_page_break()

# =========================================================================
# CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC
# =========================================================================
h("CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC", level=1)

h("4.1 Môi trường cài đặt và cấu hình thử nghiệm", level=2)
p("Bảng 4.1: Thông số cấu hình môi trường thử nghiệm phần cứng và phần mềm", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=3)
tbl(["Thành phần phần cứng / phần mềm", "Thông số cấu hình môi trường thử nghiệm"], [
    ["Hệ điều hành", "Microsoft Windows 11 64-bit"],
    ["Môi trường thực thi Frontend", "Vite v8.0.3, React 19.2.4, TypeScript, cổng lắng nghe 8443"],
    ["Môi trường thực thi Backend", "Node.js v24.14.0, Express.js, cổng lắng nghe 5000"],
    ["Hệ quản trị cơ sở dữ liệu", "MongoDB Server v8.2 Community Edition, cổng lắng nghe 27017"],
    ["Công cụ quản trị CSDL", "MongoDB Compass v1.45.0"],
    ["Trình duyệt thử nghiệm", "Google Chrome 134.0, Microsoft Edge 134.0"]
], [2.5, 4.0])

h("4.2 Giao diện Trang chủ và Hệ thống Đặt món", level=2)
p("Trang chủ FoodVD được thiết kế theo phong cách hiện đại với tông màu cam đất ấm áp đặc trưng của ngành ẩm thực, hỗ trợ các khối banner ưu đãi, các bước đặt món trực quan và danh mục món ăn thịnh hành:")
fig("Hinh_4_1_UI_TrangChu.png", "Hình 4.1: Giao diện Trang chủ thương mại điện tử FoodVD")

p("Trang Thực đơn hỗ trợ bộ lọc đa năng: tìm kiếm theo từ khóa, lọc theo danh mục (Món chính, Ăn nhẹ, Đồ uống, Combo) và thanh trượt mức giá tối đa từ 30.000đ đến 240.000đ:")
fig("Hinh_4_2_UI_ThucDon.png", "Hình 4.2: Giao diện Thực đơn món ăn, bộ lọc giá và danh mục trực quan")

h("4.3 Trải nghiệm tương tác 3D món ăn trên nền tảng Web", level=2)
p("Điểm nhấn công nghệ nổi bật của FoodVD là tính năng trải nghiệm mô hình 3D thực phẩm ngay trên trình duyệt web. Khách hàng bấm nút '✨ Trải nghiệm 3D' trên thẻ món ăn để mở popup tương tác:")
fig("Hinh_4_3_UI_Xem3D.png", "Hình 4.3: Giao diện Trải nghiệm tương tác 3D món ăn trên trình duyệt web")
p("Khách hàng có thể dùng chuột xoay 360 độ quanh món ăn, phóng to để xem cận cảnh nguyên liệu và bấm chọn thêm vào giỏ hàng trực tiếp từ màn hình 3D.")

h("4.4 Giỏ hàng, Áp mã Voucher và Quy trình Thanh toán VietQR / COD", level=2)
p("Khách hàng có thể tùy chọn thêm các loại topping đa dạng (như trứng chần, thêm bò, quẩy, phô mai...) với mức giá tự động cộng dồn minh bạch. Hệ thống hỗ trợ nhập mã giảm giá Voucher (ví dụ: FOODVD20 giảm 20%, FREESHIP giảm 15.000đ):")
fig("Hinh_4_4_UI_ThanhToan_VietQR.png", "Hình 4.4: Giao diện Giỏ hàng, Áp mã Voucher và Thanh toán VietQR")
p("Khách hàng có thể lựa chọn thanh toán COD (tiền mặt khi nhận hàng) hoặc quét mã chuyển khoản ngân hàng VietQR tự động có hiển thị sẵn số tiền và mã đơn hàng.")

h("4.5 Theo dõi hành trình đơn hàng và Chức năng Đánh giá món ăn", level=2)
p("Khách hàng sau khi đăng nhập có thể truy cập trang Tài khoản cá nhân để theo dõi hành trình đơn hàng theo thời gian thực (Chờ duyệt -> Đang chuẩn bị -> Đang giao -> Hoàn tất) và bấm viết đánh giá sao cho các món ăn đã trải nghiệm:")
fig("Hinh_4_5_UI_TheoDoiDonHang.png", "Hình 4.5: Giao diện Theo dõi tiến trình đơn hàng và Đánh giá món ăn")

h("4.6 Giao diện Quản trị Admin - Quản lý Sản phẩm và Tồn kho", level=2)
p("Giao diện Quản lý sản phẩm của Admin cung cấp form thêm món mới trực tiếp (nhập tên món, chọn danh mục, giá bán và số lượng tồn kho ban đầu). Danh sách sản phẩm hiển thị đầy đủ số lượng tồn kho (đặc biệt có gắn nhãn cảnh báo món chỉ còn 1 suất) và các nút thao tác nhanh:")
fig("Hinh_4_6_Admin_SanPham.png", "Hình 4.6: Giao diện Quản trị Admin - Quản lý Sản phẩm và Tồn kho")

h("4.7 Giao diện Quản trị Admin - Báo cáo Doanh thu & Thống kê", level=2)
p("Giao diện Báo cáo doanh thu tài chính hiển thị các thẻ chỉ số KPI tổng hợp: Tổng doanh thu thực tế, Tổng số đơn hàng hoàn tất, Số đơn bị hủy hoặc hết hàng, và Món ăn bán chạy nhất hệ thống kèm biểu đồ tăng trưởng doanh thu 7 ngày gần nhất:")
fig("Hinh_4_7_Admin_DoanhThu.png", "Hình 4.7: Giao diện Quản trị Admin - Báo cáo Doanh thu & Thống kê kinh doanh")

h("4.8 Giao diện Quản trị Admin - Quản lý Bảng lương & Đồng bộ chấm công", level=2)
p("Giao diện Quản lý bảng lương cho phép Admin xem danh sách toàn bộ nhân viên, số ca làm việc, mức lương theo ca, tiền thưởng và phạt. Khi bấm nút '🔄 Đồng bộ từ Chấm công', hệ thống tự động quét dữ liệu check-in/out của nhân viên để cập nhật lại số ca và tính tổng lương chính xác:")
fig("Hinh_4_8_Admin_LuongNhanVien.png", "Hình 4.8: Giao diện Quản trị Admin - Quản lý Bảng lương & Đồng bộ chấm công")

h("4.9 Giao diện Quản trị Admin - Quản lý Mã giảm giá Voucher", level=2)
p("Giao diện Quản lý Voucher cho phép Admin tạo các chiến dịch khuyến mãi mới (giảm theo % hoặc giảm tiền mặt cố định kèm điều kiện giá trị đơn tối thiểu). Admin có thể bật/tắt kích hoạt voucher hoặc xóa voucher trực tiếp:")
fig("Hinh_4_9_Admin_Voucher.png", "Hình 4.9: Giao diện Quản trị Admin - Quản lý Mã giảm giá khuyến mãi Voucher")

h("4.10 Giao diện Vận hành dành cho Nhân viên - Chấm công & Xử lý đơn", level=2)
p("Giao diện dành riêng cho Nhân viên vận hành hỗ trợ chức năng Chấm công theo ca (chọn ca sáng hoặc ca tối, bấm nút Vào ca / Tan ca) và bảng theo dõi lịch sử chấm công minh bạch:")
fig("Hinh_4_10_NhanVien_ChamCong.png", "Hình 4.10: Giao diện Vận hành Nhân viên - Chấm công Vào ca / Tan ca")

h("4.11 Kịch bản kiểm thử tình huống tranh chấp kho (Race Condition Test)", level=2)
p("Bảng 4.2: Bảng tổng kết kết quả kiểm thử các kịch bản nghiệp vụ trọng yếu (Test Cases)", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=3)
tbl(["Kịch bản thử nghiệm", "Thao tác thực hiện", "Kết quả mong đợi", "Kết quả thực tế đạt được", "Đánh giá"], [
    ["Test 1: Khách vãng lai thêm giỏ", "Chưa đăng nhập, bấm nút 'Thêm vào giỏ hàng'", "Chặn không cho thêm, chuyển hướng trang Login kèm thông báo", "Hệ thống hiển thị cảnh báo đỏ và chuyển ngay sang trang Đăng nhập", "ĐẠT (100%)"],
    ["Test 2: Tranh chấp đồng thời món cuối cùng", "Hai trình duyệt A và B cùng bấm đặt món khi tồn kho stock = 1", "Một khách đặt thành công, một khách nhận lỗi HTTP 409, kho còn 0", "Khách A nhận đơn thành công, Khách B nhận thông báo lỗi tranh chấp rõ ràng, kho không bị âm", "ĐẠT (100%)"],
    ["Test 3: Đánh giá món và tính sao động", "Khách gửi đánh giá 4 sao cho món đang có 5 sao (1 lượt)", "Điểm sao trung bình tính lại thành: (5 + 4)/2 = 4.5 sao", "Món ăn cập nhật ngay thành ⭐ 4.5 (2 đánh giá) trên thực đơn", "ĐẠT (100%)"],
    ["Test 4: Chấm công và tính lương", "Nhân viên bấm hoàn thành 2 ca, Admin bấm 'Đồng bộ từ Chấm công'", "Bảng lương tự động cập nhật số ca = 2 và tính lại tổng lương", "Số ca cập nhật chính xác, lương nhảy chuẩn công thức", "ĐẠT (100%)"]
], [1.3, 1.8, 1.8, 1.8, 0.8])
doc.add_page_break()

# =========================================================================
# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
# =========================================================================
h("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", level=1)

h("1. Kết quả đạt được", level=2)
p("Sau quá trình nỗ lực nghiên cứu, phân tích và triển khai thực nghiệm, đề tài 'Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ' đã hoàn thành trọn vẹn tất cả các mục tiêu đề ra:")
bullets([
    "Xây dựng thành công hệ thống website thương mại điện tử hoàn chỉnh theo kiến trúc Client - Server hiện đại với giao diện đẹp mắt, thân thiện và đạt chuẩn Responsive.",
    "Hiện thực hóa tính năng trải nghiệm mô hình 3D tương tác WebGL trực tiếp trên trình duyệt bằng Google Model-Viewer, tạo nên nét độc đáo và lợi thế cạnh tranh vượt trội cho thương hiệu FoodVD.",
    "Giải quyết triệt để bài toán tranh chấp tồn kho đồng thời (Race Condition) bằng giải thuật Atomic Reservation kết hợp Document-Level Locking của MongoDB WiredTiger Engine, đảm bảo tính toàn vẹn dữ liệu ACID tuyệt đối.",
    "Phân tách hoàn toàn giao diện và quyền hạn nghiệp vụ cho 3 đối tượng người dùng: Khách hàng, Nhân viên và Quản trị viên, không bị chồng chéo tính năng.",
    "Xây dựng cơ chế chấm công theo ca và tự động đồng bộ tính lương cho nhân viên; hệ thống quản lý mã giảm giá Voucher liên kết trực tiếp vào bước thanh toán.",
    "Hiện thực hóa chức năng đánh giá món ăn với thuật toán tính số sao trung bình động chính xác dựa trên dữ liệu đánh giá thực tế của khách hàng."
])

h("2. Hạn chế của hệ thống", level=2)
bullets([
    "Số lượng mô hình 3D tích hợp hiện tại chủ yếu tập trung vào các món đồ uống tiêu biểu do thời gian dựng mô hình 3D chuyên nghiệp (3D Modeling/Blender) đòi hỏi nhiều thời gian và dung lượng đồ họa.",
    "Hệ thống thanh toán VietQR hiện tại đang hoạt động ở chế độ quét mã tĩnh (Static QR Code), chưa tích hợp Webhook thông báo giao dịch biến động số dư tự động từ cổng thanh toán ngân hàng (Payment Gateway API) thực tế."
])

h("3. Hướng phát triển trong tương lai", level=2)
bullets([
    "Mở rộng kho thư viện mô hình 3D cho toàn bộ thực đơn món ăn bằng công nghệ quét 3D thực tế (3D Photogrammetry Scanner).",
    "Tích hợp Webhook kết nối trực tiếp với các cổng thanh toán điện tử lớn như VNPay, MoMo, ZaloPay để tự động xác nhận đơn hàng thành công trong vòng 3 giây ngay khi khách chuyển khoản.",
    "Ứng dụng thuật toán Trí tuệ nhân tạo (AI Machine Learning) để phân tích thói quen ăn uống của người dùng, từ đó đưa ra gợi ý món ăn cá nhân hóa (Personalized Food Recommendation) trên trang chủ.",
    "Phát triển ứng dụng di động đa nền tảng (Mobile App) bằng React Native cho tài xế giao hàng (Shipper) định vị GPS hành trình giao đồ ăn theo thời gian thực."
])
doc.add_page_break()

# =========================================================================
# TÀI LIỆU THAM KHẢO
# =========================================================================
h("TÀI LIỆU THAM KHẢO", level=1)
p("[1] Nguyễn Văn Ba (2018), Giáo trình Phân tích và Thiết kế Hệ thống Thông tin, Nhà xuất bản Đại học Quốc gia Hà Nội.")
p("[2] Đặng Văn Đức (2019), Phân tích thiết kế hướng đối tượng với UML, Nhà xuất bản Khoa học và Kỹ thuật.")
p("[3] Facebook Open Source (2024), React Documentation – The library for web and native user interfaces, https://react.dev/.")
p("[4] Microsoft Corporation (2024), TypeScript Handbook – The typed JavaScript at any scale, https://www.typescriptlang.org/docs/.")
p("[5] MongoDB Inc. (2024), MongoDB Manual – Document-level Concurrency and WiredTiger Storage Engine, https://www.mongodb.com/docs/manual/core/wiredtiger/.")
p("[6] Google Inc. (2024), Google Model-Viewer Web Component Documentation – Easily display interactive 3D models on the web, https://modelviewer.dev/.")
p("[7] Expressjs.com (2024), Express - Fast, unopinionated, minimalist web framework for Node.js, https://expressjs.com/.")
p("[8] Martin Fowler (2018), Patterns of Enterprise Application Architecture, Addison-Wesley Professional.")
p("[9] Robert C. Martin (2017), Clean Architecture: A Craftsman's Guide to Software Structure and Design, Prentice Hall.")

# Save final doc
doc.save(OUT_PATH)
print("===========================================================")
print("HOÀN TẤT XÂY DỰNG BÁO CÁO HỌC THUẬT ĐẠT CHUẨN 100%!")
print(f"Tệp lưu tại: {OUT_PATH}")
print(f"Kích thước: {OUT_PATH.stat().st_size} bytes")
print("===========================================================")
