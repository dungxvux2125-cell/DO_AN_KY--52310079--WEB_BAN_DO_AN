# -*- coding: utf-8 -*-
"""
CHƯƠNG TRÌNH XÂY DỰNG TOÀN DIỆN BÁO CÁO ĐỒ ÁN KỲ FOODVD
Chuẩn mực theo mẫu: BAO_CAO_DO_AN_Ky_HOAN_THIEN.docx
Khoa Công nghệ Số và Truyền thông - Trường Đại học Phương Đông
"""

import sys
from pathlib import Path

BASE = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP")
sys.path.append(str(BASE))

from generate_complete_report import doc, p, h, bullets, fig, tbl, set_font, OUT_PATH
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Inches, RGBColor

print("Starting to write report content...")

# =========================================================================
# TRANG BÌA CHÍNH (COVER PAGE)
# =========================================================================
p("BỘ GIÁO DỤC VÀ ĐÀO TẠO", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p("TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2, bold_lead="TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG")
p("KHOA CÔNG NGHỆ SỐ VÀ TRUYỀN THÔNG", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20, bold_lead="KHOA CÔNG NGHỆ SỐ VÀ TRUYỀN THÔNG")

p("", space_after=30)
p("ĐỒ ÁN KỲ", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12, bold_lead="ĐỒ ÁN KỲ")
p("CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=25, bold_lead="CHUYÊN NGÀNH: CÔNG NGHỆ THÔNG TIN")

p("ĐỀ TÀI:", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8, bold_lead="ĐỀ TÀI:")
p("XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN ĐỒ ĂN TRỰC TUYẾN FOODVD HỖ TRỢ TRẢI NGHIỆM 3D VÀ QUẢN LÝ VẬN HÀNH ĐA PHÂN HỆ",
  align=WD_ALIGN_PARAGRAPH.CENTER, space_after=60, bold_lead="XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN ĐỒ ĂN TRỰC TUYẾN FOODVD")

p("Sinh viên thực hiện : Vũ Dũng", bold_lead="Sinh viên thực hiện :", space_after=4)
p("Mã số sinh viên     : 52310079", bold_lead="Mã số sinh viên     :", space_after=4)
p("Lớp                 : 523100B", bold_lead="Lớp                 :", space_after=4)
p("Giáo viên hướng dẫn : ThS. Trần Thị Hiền", bold_lead="Giáo viên hướng dẫn :", space_after=50)

p("Hà Nội, Năm 2026", align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20, bold_lead="Hà Nội, Năm 2026")
doc.add_page_break()

# =========================================================================
# LỜI MỞ ĐẦU
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
p("Xuất phát từ thực tiễn và những thách thức cấp bách nêu trên, đề tài \"Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ\" được nghiên cứu và hiện thực hóa. Hệ thống FoodVD được thiết kế theo kiến trúc hiện đại Client - Server tách biệt, áp dụng các công nghệ tiên tiến hàng đầu bao gồm React 19, TypeScript, Vite, Node.js, Express và hệ quản trị cơ sở dữ liệu NoSQL MongoDB.")
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
# MỤC LỤC
# =========================================================================
h("MỤC LỤC", level=1)
p("LỜI MỞ ĐẦU ............................................................................................................................ 1")
p("DANH MỤC THUẬT NGỮ VÀ KÝ HIỆU VIẾT TẮT ..................................................................... 3")
p("DANH MỤC HÌNH VẼ ................................................................................................................ 4")
p("DANH MỤC BẢNG BIỂU ............................................................................................................ 5")
p("CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD ..... 6")
p("  1.1 Bối cảnh thị trường F&B và thương mại điện tử giao đồ ăn ......................................... 6")
p("  1.2 Vai trò của trải nghiệm tương tác 3D và minh bạch vận hành .................................... 7")
p("  1.3 Thực trạng và hạn chế của các hệ thống đặt đồ ăn hiện nay ...................................... 8")
p("  1.4 Các vấn đề kỹ thuật tồn tại .................................................................................... 9")
p("  1.5 Lý do chọn đề tài ................................................................................................. 10")
p("  1.6 Mục tiêu của đề tài ............................................................................................... 11")
p("  1.7 Phạm vi của đề tài ................................................................................................ 12")
p("  1.8 Đối tượng sử dụng hệ thống ................................................................................. 12")
p("  1.9 Ý nghĩa khoa học và thực tiễn của đề tài ................................................................ 13")
p("  1.10 Bố cục của đồ án ................................................................................................ 13")
p("CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG ................................................ 14")
p("  2.1 Tổng quan về kiến trúc hệ thống Client - Server ..................................................... 14")
p("  2.2 Ngôn ngữ lập trình TypeScript và JavaScript hiện đại ............................................ 15")
p("  2.3 Thư viện React 19 và kiến trúc Single Page Application (SPA) ................................ 16")
p("  2.4 Công cụ xây dựng dự án Vite Build Tool ................................................................ 17")
p("  2.5 Nền tảng thực thi Node.js và Framework Express.js ............................................... 18")
p("  2.6 Cơ sở dữ liệu NoSQL MongoDB và Mongoose ODM .............................................. 19")
p("  2.7 Kiến trúc RESTful API và giao thức trao đổi dữ liệu JSON ....................................... 20")
p("  2.8 Công nghệ hiển thị mô hình 3D tương tác WebGL với Google Model-Viewer .......... 21")
p("  2.9 Cơ chế bảo mật, mã hóa dữ liệu nhạy cảm AES-256 và Masking .............................. 22")
p("  2.10 Công cụ quản lý phiên bản Git, GitHub và công cụ quản trị MongoDB Compass .... 23")
p("CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG ................................................................. 24")
p("  3.1 Khảo sát hiện trạng và mô tả đề tài ....................................................................... 24")
p("  3.2 Phân tích nghiệp vụ hệ thống theo từng vai trò ....................................................... 25")
p("  3.3 Thiết kế Biểu đồ Use Case .................................................................................... 27")
p("  3.4 Thiết kế Biểu đồ hoạt động (Activity Diagrams) ..................................................... 31")
p("  3.5 Thiết kế Biểu đồ trình tự & Giải thuật giải quyết tranh chấp tồn kho đồng thời ....... 34")
p("  3.6 Thiết kế Biểu đồ trạng thái vòng đời đơn hàng ....................................................... 37")
p("  3.7 Thiết kế Biểu đồ lớp miền nghiệp vụ (Class Diagram) ............................................ 38")
p("  3.8 Thiết kế Cấu trúc Cơ sở dữ liệu MongoDB (Collections Schema) ........................... 40")
p("  3.9 Thiết kế Biểu đồ Kiến trúc Thành phần và Triển khai ............................................. 43")
p("CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC ........................................................... 45")
p("  4.1 Môi trường cài đặt và cấu hình thử nghiệm ........................................................... 45")
p("  4.2 Giao diện Trang chủ và Hệ thống Đặt món ............................................................ 46")
p("  4.3 Trải nghiệm tương tác 3D món ăn trên nền tảng Web ............................................ 47")
p("  4.4 Giỏ hàng, Áp mã Voucher và Quy trình Thanh toán VietQR / COD ........................... 48")
p("  4.5 Theo dõi hành trình đơn hàng và Chức năng Đánh giá món ăn tính số sao động ..... 49")
p("  4.6 Giao diện Vận hành dành cho Nhân viên ................................................................ 50")
p("  4.7 Giao diện Quản trị dành cho Admin ....................................................................... 51")
p("  4.8 Kịch bản kiểm thử tình huống tranh chấp kho (Race Condition Test) ...................... 52")
p("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN ...................................................................................... 54")
p("TÀI LIỆU THAM KHẢO ............................................................................................................ 56")
doc.add_page_break()

# =========================================================================
# DANH MỤC THUẬT NGỮ & HÌNH VẼ
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
p("Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD ................................................... 28")
p("Hình 3.2: Biểu đồ Use Case chi tiết phân hệ Khách hàng ......................................................... 29")
p("Hình 3.3: Biểu đồ Use Case chi tiết phân hệ Quản trị viên và Nhân viên ................................... 30")
p("Hình 3.4: Biểu đồ hoạt động Quy trình Đặt hàng và Trừ kho nguyên tử ..................................... 32")
p("Hình 3.5: Biểu đồ trình tự Giải quyết tranh chấp đặt hàng đồng thời (Race Condition) .............. 35")
p("Hình 3.6: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD ........................ 39")
p("Hình 3.7: Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Document Collections Schema) .............. 41")
p("Hình 3.8: Biểu đồ thành phần kiến trúc và triển khai hệ thống FoodVD .................................... 44")
p("Hình 3.9: Biểu đồ hoạt động Quy trình Chấm công và Tính lương nhân viên ............................ 33")
p("Hình 3.10: Biểu đồ hoạt động Quy trình Đánh giá món ăn và Tính số sao động ......................... 34")
p("Hình 3.11: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine) ................................. 37")
p("Hình 4.1: Giao diện Trang chủ thương mại điện tử FoodVD ...................................................... 46")
p("Hình 4.2: Giao diện Thực đơn món ăn, bộ lọc giá và danh mục trực quan .................................. 47")
p("Hình 4.3: Giao diện Trải nghiệm tương tác 3D món ăn trên trình duyệt web .............................. 47")
p("Hình 4.4: Giao diện Giỏ hàng, Áp mã Voucher và Thanh toán VietQR ....................................... 48")
p("Hình 4.5: Giao diện Theo dõi tiến trình đơn hàng và Đánh giá món ăn ..................................... 49")
p("Hình 4.6: Giao diện Bảng điều khiển Quản trị Admin (Sản phẩm, Doanh thu, Lương) .............. 51")
p("Hình 4.7: Giao diện Vận hành dành cho Nhân viên (Đơn hàng & Chấm công) .......................... 50")
doc.add_page_break()

print("Preliminaries created. Proceeding to Chapters 1 to 4...")
