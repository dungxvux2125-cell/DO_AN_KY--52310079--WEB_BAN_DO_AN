# -*- coding: utf-8 -*-
"""
CHƯƠNG TRÌNH XÂY DỰNG CHI TIẾT TOÀN DIỆN BÁO CÁO HỌC THUẬT FOODVD
"""

import sys
from pathlib import Path

BASE = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP")
sys.path.append(str(BASE))

from generate_full_perfect_report import doc, p, h, bullets, fig, tbl, toc_table, add_usecase_spec, OUT_PATH
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Inches, RGBColor

print("Building Title Page and Preliminaries...")

# =========================================================================
# 1. TRANG BÌA CHÍNH (COVER PAGE)
# =========================================================================
p("BỘ GIÁO DỤC VÀ ĐÀO TẠO", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p("TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2, bold_lead="TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG")
p("KHOA CÔNG NGHỆ SỐ VÀ TRUYỀN THÔNG", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=35, bold_lead="KHOA CÔNG NGHỆ SỐ VÀ TRUYỀN THÔNG")

p("ĐỒ ÁN KỲ", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10, bold_lead="ĐỒ ÁN KỲ")
p("CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=30, bold_lead="CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN")

p("ĐỀ TÀI:", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8, bold_lead="ĐỀ TÀI:")
p("XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN ĐỒ ĂN TRỰC TUYẾN FOODVD HỖ TRỢ TRẢI NGHIỆM 3D VÀ QUẢN LÝ VẬN HÀNH ĐA PHÂN HỆ",
  align=WD_ALIGN_PARAGRAPH.CENTER, space_after=65, bold_lead="XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN ĐỒ ĂN TRỰC TUYẾN FOODVD")

p("Sinh viên thực hiện : Vũ Dũng", bold_lead="Sinh viên thực hiện :", space_after=4)
p("Mã số sinh viên     : 52310079", bold_lead="Mã số sinh viên     :", space_after=4)
p("Lớp                 : 523100B", bold_lead="Lớp                 :", space_after=4)
p("Giáo viên hướng dẫn : ThS. Trần Thị Hiền", bold_lead="Giáo viên hướng dẫn :", space_after=55)

p("Hà Nội, Năm 2026", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10, bold_lead="Hà Nội, Năm 2026")
doc.add_page_break()

# =========================================================================
# 2. LỜI MỞ ĐẦU
# =========================================================================
h("LỜI MỞ ĐẦU", level=1)
p("Trong thời đại công nghệ số bùng nổ, ngành dịch vụ ẩm thực và đồ uống (F&B) đang chứng kiến bước chuyển mình mạnh mẽ từ mô hình kinh doanh truyền thống sang nền tảng thương mại điện tử đa kênh. Thói quen tiêu dùng của người dân, đặc biệt là giới trẻ và nhân viên văn phòng, đã chuyển biến sâu sắc: từ việc đến tận nơi dùng bữa sang xu hướng đặt đồ ăn trực tuyến giao tận nhà một cách nhanh chóng, tiện lợi.")
p("Tuy nhiên, phần lớn các website và nền tảng đặt đồ ăn trực tuyến hiện nay trên thị trường vẫn còn bộc lộ nhiều điểm nghẽn hạn chế nghiêm trọng:")
bullets([
    "Thiếu trải nghiệm thị giác trực quan: Hình ảnh sản phẩm chủ yếu là ảnh tĩnh 2D đơn điệu, không phản ánh chân thực khẩu phần, góc nhìn và thành phần topping, khiến khách hàng khó hình dung kích thước và độ tươi ngon của món ăn.",
    "Lỗi tranh chấp đơn hàng đồng thời (Race Condition): Khi một món ăn chỉ còn số lượng tồn kho giới hạn (như các món đặc biệt, suất ăn trưa giới hạn), nếu hai hoặc nhiều khách hàng cùng bấm đặt hàng tại cùng một thời điểm, các hệ thống kém chất lượng thường gặp lỗi đọc ghi bẩn (Dirty Read), dẫn đến tình trạng bán âm kho (Over-selling), gây ra trải nghiệm bức xúc cho người tiêu dùng.",
    "Đánh giá và số sao ảo: Đa phần hệ thống để số sao mặc định hoặc cho phép đánh giá tràn lan mà không có thuật toán kiểm soát tính toán động và xác thực theo giao dịch thực tế.",
    "Sự pha trộn phức tạp giữa giao diện khách hàng và nghiệp vụ nội bộ: Nhiều trang web để chung các thanh công cụ giỏ hàng, đặt món vào cả giao diện quản trị Admin và Nhân viên vận hành, gây rối rắm và thiếu tính chuyên nghiệp trong khâu quản trị nhà hàng."
])
p("Xuất phát từ thực tiễn và những thách thức cấp bách nêu trên, đề tài 'Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ' được nghiên cứu và hiện thực hóa. Hệ thống FoodVD được thiết kế theo kiến trúc hiện đại Client - Server tách biệt, áp dụng các công nghệ tiên tiến hàng đầu bao gồm React 19, TypeScript, Vite, Node.js, Express và hệ quản trị cơ sở dữ liệu NoSQL MongoDB.")
p("Đặc biệt, đồ án tập trung giải quyết triệt để 3 bài toán nghiệp vụ trọng tâm:")
bullets([
    "Tích hợp mô hình 3D tương tác WebGL (Google Model-Viewer): Cho phép khách hàng xoay 360 độ, phóng to, thu nhỏ và khám phá món ăn/đồ uống sinh động trước khi đưa ra quyết định đặt món.",
    "Giải quyết bài toán tranh chấp tồn kho đồng thời (Race Condition) bằng giải thuật Atomic Reservation & Rollback: Ứng dụng cơ chế Document-Level Locking của MongoDB WiredTiger Engine kết hợp câu lệnh nguyên tử findOneAndUpdate có điều kiện, đảm bảo tuyệt đối không bao giờ xảy ra tình trạng âm kho khi nhiều người cùng đặt món.",
    "Phân quyền giao diện 3 vai trò độc lập hoàn toàn (Khách hàng, Nhân viên, Quản trị viên): Mỗi phân hệ sở hữu thanh điều hướng và tính năng nghiệp vụ riêng biệt, từ đặt món, theo dõi đơn, chấm công nhân viên, tính lương tự động cho đến báo cáo doanh thu và quản lý Voucher khuyến mãi."
])
p("Trong quá trình thực hiện đồ án, mặc dù em đã có nhiều nỗ lực tìm tòi, nghiên cứu các chuẩn mực công nghệ mới nhất nhưng chắc chắn khó tránh khỏi những thiếu sót nhất định. Em rất mong nhận được những lời chỉ bảo, đóng góp quý báu từ quý Thầy, Cô giáo trong Hội đồng chấm đồ án để hệ thống ngày càng hoàn thiện hơn nữa.")
p("Em xin bày tỏ lòng biết ơn sâu sắc đến ThS. Trần Thị Hiền cùng toàn thể các Thầy, Cô giáo Khoa Công nghệ Số và Truyền thông – Trường Đại học Phương Đông đã tận tình truyền đạt kiến thức chuyên môn và định hướng giúp em hoàn thành tốt đồ án tốt nghiệp này.")
p("Hà Nội, tháng 09 năm 2026", align=WD_ALIGN_PARAGRAPH.RIGHT, italic=True)
p("Sinh viên thực hiện: Vũ Dũng", align=WD_ALIGN_PARAGRAPH.RIGHT, bold_lead="Sinh viên thực hiện:")
doc.add_page_break()

# =========================================================================
# 3. MỤC LỤC (BẢNG KHÔNG VIỀN, THẲNG HÀNG SỐ TRANG)
# =========================================================================
h("MỤC LỤC", level=1)
toc_entries = [
    ("LỜI MỞ ĐẦU", "1", 0),
    ("DANH MỤC THUẬT NGỮ VÀ KÝ HIỆU VIẾT TẮT", "3", 0),
    ("DANH MỤC HÌNH VẼ", "4", 0),
    ("DANH MỤC BẢNG BIỂU", "5", 0),
    ("CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD", "6", 0),
    ("1.1 Bối cảnh thị trường F&B và thương mại điện tử giao đồ ăn", "6", 1),
    ("1.2 Vai trò của trải nghiệm tương tác 3D và minh bạch vận hành", "7", 1),
    ("1.3 Thực trạng và hạn chế của các hệ thống đặt đồ ăn hiện nay", "8", 1),
    ("1.4 Các vấn đề kỹ thuật tồn tại", "9", 1),
    ("1.5 Lý do chọn đề tài", "10", 1),
    ("1.6 Mục tiêu của đề tài", "11", 1),
    ("1.7 Phạm vi của đề tài", "12", 1),
    ("1.8 Đối tượng sử dụng hệ thống", "12", 1),
    ("1.9 Ý nghĩa khoa học và thực tiễn của đề tài", "13", 1),
    ("1.10 Bố cục của đồ án", "13", 1),
    ("CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG", "14", 0),
    ("2.1 Tổng quan về kiến trúc hệ thống Client - Server", "14", 1),
    ("2.2 Ngôn ngữ lập trình TypeScript và JavaScript hiện đại", "15", 1),
    ("2.3 Thư viện React 19 và kiến trúc Single Page Application (SPA)", "16", 1),
    ("2.4 Công cụ xây dựng dự án Vite Build Tool", "17", 1),
    ("2.5 Nền tảng thực thi Node.js và Framework Express.js", "18", 1),
    ("2.6 Cơ sở dữ liệu NoSQL MongoDB và Mongoose ODM", "19", 1),
    ("2.7 Kiến trúc RESTful API và giao thức trao đổi dữ liệu JSON", "20", 1),
    ("2.8 Công nghệ hiển thị mô hình 3D tương tác WebGL với Google Model-Viewer", "21", 1),
    ("2.9 Cơ chế bảo mật, mã hóa dữ liệu nhạy cảm AES-256 và Masking", "22", 1),
    ("2.10 Công cụ quản lý phiên bản Git, GitHub và công cụ quản trị MongoDB Compass", "23", 1),
    ("CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", "24", 0),
    ("3.1 Khảo sát hiện trạng và mô tả đề tài", "24", 1),
    ("3.2 Phân tích nghiệp vụ hệ thống theo từng vai trò", "25", 1),
    ("3.3 Xây dựng Biểu đồ Use Case và Đặc tả chi tiết các Use Case", "27", 1),
    ("    3.3.1 Use case tổng quát", "27", 2),
    ("    3.3.2 Use case Xem thực đơn & Tìm kiếm món ăn", "28", 2),
    ("    3.3.3 Use case Trải nghiệm tương tác 3D món ăn", "29", 2),
    ("    3.3.4 Use case Đăng ký & Đăng nhập tài khoản", "30", 2),
    ("    3.3.5 Use case Quản lý giỏ hàng & Chọn Topping", "31", 2),
    ("    3.3.6 Use case Đặt món & Thanh toán (COD / VietQR)", "32", 2),
    ("    3.3.7 Use case Theo dõi tiến trình đơn hàng", "33", 2),
    ("    3.3.8 Use case Đánh giá món ăn & Chấm điểm sao", "34", 2),
    ("    3.3.9 Use case Quản lý thực đơn & Tồn kho món ăn (Admin/Staff)", "35", 2),
    ("    3.3.10 Use case Quản lý & Xử lý đơn hàng (Staff)", "36", 2),
    ("    3.3.11 Use case Chấm công vào ca / tan ca (Staff)", "37", 2),
    ("    3.3.12 Use case Quản lý bảng lương & Đồng bộ chấm công (Admin)", "38", 2),
    ("    3.3.13 Use case Báo cáo doanh thu & Quản lý Voucher khuyến mãi (Admin)", "39", 2),
    ("3.4 Thiết kế Biểu đồ hoạt động (Activity Diagrams)", "40", 1),
    ("3.5 Thiết kế Biểu đồ trình tự & Giải thuật giải quyết tranh chấp tồn kho đồng thời", "43", 1),
    ("3.6 Thiết kế Biểu đồ trạng thái vòng đời đơn hàng", "46", 1),
    ("3.7 Thiết kế Biểu đồ lớp miền nghiệp vụ (Domain Class Model)", "47", 1),
    ("3.8 Thiết kế Cấu trúc Cơ sở dữ liệu MongoDB (Collections Schema)", "49", 1),
    ("3.9 Thiết kế Biểu đồ Kiến trúc Thành phần và Triển khai", "52", 1),
    ("CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC", "54", 0),
    ("4.1 Môi trường cài đặt và cấu hình thử nghiệm", "54", 1),
    ("4.2 Giao diện Trang chủ và Hệ thống Đặt món", "55", 1),
    ("4.3 Trải nghiệm tương tác 3D món ăn trên nền tảng Web", "56", 1),
    ("4.4 Giỏ hàng, Áp mã Voucher và Quy trình Thanh toán VietQR / COD", "57", 1),
    ("4.5 Theo dõi hành trình đơn hàng và Chức năng Đánh giá món ăn", "58", 1),
    ("4.6 Giao diện Quản trị Admin - Quản lý Sản phẩm & Tồn kho", "59", 1),
    ("4.7 Giao diện Quản trị Admin - Báo cáo Doanh thu & Thống kê", "60", 1),
    ("4.8 Giao diện Quản trị Admin - Quản lý Bảng lương & Đồng bộ chấm công", "61", 1),
    ("4.9 Giao diện Quản trị Admin - Quản lý Mã giảm giá Voucher", "62", 1),
    ("4.10 Giao diện Vận hành dành cho Nhân viên - Chấm công & Xử lý đơn", "63", 1),
    ("4.11 Kịch bản kiểm thử tình huống tranh chấp kho (Race Condition Test)", "64", 1),
    ("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "66", 0),
    ("TÀI LIỆU THAM KHẢO", "68", 0)
]
toc_table(toc_entries)
doc.add_page_break()

# =========================================================================
# 4. DANH MỤC THUẬT NGỮ & DANH MỤC HÌNH ẢNH / BẢNG BIỂU
# =========================================================================
h("DANH MỤC THUẬT NGỮ VÀ KÝ HIỆU VIẾT TẮT", level=1)
tbl(["Ký hiệu viết tắt", "Thuật ngữ tiếng Anh", "Ý nghĩa / Giải thích tiếng Việt"], [
    ["API", "Application Programming Interface", "Giao diện lập trình ứng dụng kết nối Frontend và Backend"],
    ["REST", "Representational State Transfer", "Kiểu kiến trúc thiết kế dịch vụ web chuẩn mực"],
    ["SPA", "Single Page Application", "Ứng dụng web đơn trang chuyển trang mượt mà không load lại"],
    ["F&B", "Food and Beverage", "Ngành công nghiệp dịch vụ ẩm thực và đồ uống"],
    ["TMĐT", "Thương mại điện tử", "Giao dịch kinh doanh mua bán hàng hóa trực tuyến"],
    ["NoSQL", "Not Only SQL", "Cơ sở dữ liệu phi quan hệ, lưu trữ linh hoạt dạng Document"],
    ["ODM", "Object Data Modeling", "Ánh xạ mô hình dữ liệu đối tượng trong phần mềm vào Database"],
    ["ACID", "Atomicity, Consistency, Isolation, Durability", "Bốn tính chất cốt lõi của giao dịch cơ sở dữ liệu"],
    ["FIFO", "First In, First Out", "Nguyên tắc xếp hàng vào trước thì ra trước"],
    ["VietQR", "Vietnam Quick Response", "Chuẩn mã phản hồi nhanh phục vụ thanh toán ngân hàng"],
    ["COD", "Cash On Delivery", "Phương thức thanh toán tiền mặt trực tiếp khi nhận hàng"],
    ["HMR", "Hot Module Replacement", "Cơ chế cập nhật nóng mã nguồn tức thì của công cụ Vite"],
    ["WebGL", "Web Graphics Library", "Thư viện dựng hình đồ họa 3D trực tiếp trong trình duyệt"]
], [1.2, 2.3, 2.7])

h("DANH MỤC HÌNH VẼ", level=1)
fig_entries = [
    ("Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD", "28", 0),
    ("Hình 3.2: Biểu đồ Use Case chi tiết phân hệ Khách hàng", "31", 0),
    ("Hình 3.3: Biểu đồ Use Case chi tiết phân hệ Quản trị viên và Nhân viên", "35", 0),
    ("Hình 3.4: Biểu đồ hoạt động Quy trình Đặt hàng và Trừ kho nguyên tử", "41", 0),
    ("Hình 3.5: Biểu đồ hoạt động Quy trình Chấm công và Tính lương nhân viên", "42", 0),
    ("Hình 3.6: Biểu đồ hoạt động Quy trình Đánh giá món ăn và Tính số sao động", "43", 0),
    ("Hình 3.7: Biểu đồ trình tự Giải quyết tranh chấp đặt hàng đồng thời (Race Condition)", "44", 0),
    ("Hình 3.8: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)", "46", 0),
    ("Hình 3.9: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD", "48", 0),
    ("Hình 3.10: Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Document Collections Schema)", "50", 0),
    ("Hình 3.11: Biểu đồ thành phần kiến trúc và triển khai hệ thống FoodVD", "53", 0),
    ("Hình 4.1: Giao diện Trang chủ thương mại điện tử FoodVD", "55", 0),
    ("Hình 4.2: Giao diện Thực đơn món ăn, bộ lọc giá và danh mục trực quan", "56", 0),
    ("Hình 4.3: Giao diện Trải nghiệm tương tác 3D món ăn trên trình duyệt web", "57", 0),
    ("Hình 4.4: Giao diện Giỏ hàng, Áp mã Voucher và Thanh toán VietQR", "58", 0),
    ("Hình 4.5: Giao diện Theo dõi tiến trình đơn hàng và Đánh giá món ăn", "59", 0),
    ("Hình 4.6: Giao diện Quản trị Admin - Quản lý Sản phẩm và Tồn kho", "60", 0),
    ("Hình 4.7: Giao diện Quản trị Admin - Báo cáo Doanh thu & Thống kê kinh doanh", "61", 0),
    ("Hình 4.8: Giao diện Quản trị Admin - Quản lý Bảng lương & Đồng bộ chấm công", "62", 0),
    ("Hình 4.9: Giao diện Quản trị Admin - Quản lý Mã giảm giá khuyến mãi Voucher", "63", 0),
    ("Hình 4.10: Giao diện Vận hành Nhân viên - Chấm công Vào ca / Tan ca", "64", 0)
]
toc_table(fig_entries)

h("DANH MỤC BẢNG BIỂU", level=1)
tbl_entries = [
    ("Bảng 1.1: Bảng so sánh đối sánh giữa FoodVD và các hệ thống đặt đồ ăn thông thường", "8", 0),
    ("Bảng 3.1: Ma trận phân tích trách nhiệm nghiệp vụ theo từng vai trò người dùng (RACI)", "26", 0),
    ("Bảng 3.2: Chi tiết cấu trúc các Collection trong cơ sở dữ liệu MongoDB FoodVD", "51", 0),
    ("Bảng 4.1: Thông số cấu hình môi trường thử nghiệm phần cứng và phần mềm", "54", 0),
    ("Bảng 4.2: Bảng tổng kết kết quả kiểm thử các kịch bản nghiệp vụ trọng yếu (Test Cases)", "65", 0)
]
toc_table(tbl_entries)
doc.add_page_break()

print("Preliminaries and Lists created. Writing Chapter 1 and 2...")
