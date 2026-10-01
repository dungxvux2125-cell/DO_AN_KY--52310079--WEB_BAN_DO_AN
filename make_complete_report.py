# -*- coding: utf-8 -*-
"""
TỔNG HỢP MÃ NGUỒN TẠO BÁO CÁO HOÀN CHỈNH BẬC CAO
Bao gồm toàn bộ 4 Chương, 11 Biểu đồ UML và 7 Hình ảnh Giao diện
"""

import sys
from pathlib import Path

# Configure utf-8 stdout for Windows command prompt
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

BASE = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP")
sys.path.append(str(BASE))

from generate_complete_report import doc, p, h, bullets, fig, tbl, set_font, OUT_PATH
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Inches, RGBColor

# Import the base preamble from build_full_document
import build_full_document

print("Writing Chapter 1: Tổng quan...")

# =========================================================================
# CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD
# =========================================================================
h("CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD", level=1)

h("1.1 Bối cảnh thị trường F&B và thương mại điện tử giao đồ ăn", level=2)
p("Ngành dịch vụ thực phẩm và đồ uống (Food & Beverage - F&B) tại Việt Nam trong những năm gần đây đang trải qua giai đoạn chuyển đổi số thần tốc. Theo các báo cáo thị trường gần nhất, quy mô thị trường F&B trực tuyến tại Việt Nam duy trì tốc độ tăng trưởng kép hàng năm (CAGR) trên 18%, được thúc đẩy bởi sự phổ cập của mạng Internet băng thông rộng, sự phổ biến của thiết bị di động thông minh và các giải pháp thanh toán số không tiền mặt (như chuẩn quét mã VietQR và ví điện tử).")
p("Thế hệ người tiêu dùng hiện đại, đặc biệt là nhóm khách hàng trẻ tuổi thuộc thế hệ Gen Z và nhân viên văn phòng, ngày càng ưu tiên sử dụng các dịch vụ đặt đồ ăn trực tuyến để tối ưu hóa thời gian sinh hoạt và làm việc. Nhu cầu thưởng thức các bữa ăn chất lượng cao, đa dạng hương vị với tốc độ giao hàng nhanh chóng đang đặt ra một tiêu chuẩn vận hành vô cùng khắt khe đối với các doanh nghiệp kinh doanh dịch vụ ăn uống.")

h("1.2 Vai trò của trải nghiệm tương tác 3D và minh bạch vận hành", level=2)
p("Trong môi trường thương mại điện tử, rào cản lớn nhất ngăn cản khách hàng đưa ra quyết định mua hàng chính là khoảng cách cảm nhận thực tế: người mua không thể trực tiếp chạm, ngửi hay nhìn thấy món ăn thật trước khi thanh toán. Các bức ảnh chụp tĩnh 2D truyền thống thường bị nghi ngờ là ảnh chỉnh sửa photoshop quá đà, làm giảm sút nghiêm trọng niềm tin của khách hàng.")
p("Sự xuất hiện của công nghệ đồ họa 3D tương tác trên nền tảng Web (WebGL) đã tạo nên một bước đột phá mang tính cách mạng:")
bullets([
    "Tăng cường tính trực quan và chân thực: Khách hàng có thể dùng chuột hoặc ngón tay để tự do xoay 360 độ quanh món ăn, xem cận cảnh lớp topping, màu sắc nước sốt, thành phần dinh dưỡng từ mọi góc độ.",
    "Nâng cao tỷ lệ chuyển đổi đơn hàng: Các nghiên cứu thương mại quốc tế chỉ ra rằng việc tích hợp mô hình 3D giúp tăng tỷ lệ tương tác lên 40% và nâng tỷ lệ chốt đơn hàng thêm 25% so với website chỉ dùng ảnh 2D thông thường.",
    "Giảm thiểu sự thất vọng và khiếu nại sau khi nhận hàng: Người mua hiểu rõ chính xác sản phẩm mình sẽ nhận được, tạo ra sự an tâm và hài lòng tối đa."
])

h("1.3 Thực trạng và hạn chế của các hệ thống đặt đồ ăn hiện nay", level=2)
p("Mặc dù các ứng dụng đặt đồ ăn lớn đã xuất hiện trên thị trường, phần lớn các hệ thống website đặt hàng riêng lẻ của các chuỗi nhà hàng hoặc doanh nghiệp vừa và nhỏ (SMB) vẫn đang đối mặt với những khiếm khuyết lớn:")
tbl(["Tiêu chí đánh giá", "Hệ thống đặt đồ ăn thông thường", "Hệ thống FoodVD đề xuất"], [
    ["Trải nghiệm sản phẩm", "Chỉ hiển thị ảnh 2D chụp sẵn, dễ bị góc khuất", "Tích hợp mô hình 3D tương tác 360 độ bằng WebGL"],
    ["Kiểm soát tồn kho đồng thời", "Dễ bị âm kho khi nhiều khách đặt cùng lúc (Race condition)", "Áp dụng Atomic Lock có điều kiện & Rollback tự động"],
    ["Cơ chế đánh giá món", "Số sao cố định hoặc đánh giá ảo thiếu kiểm định", "Chỉ khách có đơn hàng thực tế mới được đánh giá, tính số sao động"],
    ["Phân quyền người dùng", "Giao diện chung chung, Admin vẫn thấy giỏ hàng", "Phân quyền 3 giao diện riêng biệt: Khách hàng, Nhân viên, Admin"],
    ["Quản trị lương & Chấm công", "Ghi chép sổ sách hoặc file Excel tách rời", "Tích hợp chấm công theo ca và tự động đồng bộ tính lương"]
], [1.3, 2.4, 2.5])

h("1.4 Các vấn đề kỹ thuật tồn tại", level=2)
p("Qua quá trình khảo sát và phân tích sâu sắc các hệ thống thương mại điện tử, đồ án nhận diện ba bài toán kỹ thuật nhức nhối cần phải giải quyết bằng thuật toán và kiến trúc cơ sở dữ liệu chuyên nghiệp:")
p("Thứ nhất là bài toán Tranh chấp tồn kho đồng thời (Race Condition): Giả sử nhà hàng chỉ còn duy nhất 1 suất ăn trưa đặc biệt trong kho dữ liệu (stock = 1). Hai khách hàng A và B cùng lúc thêm món vào giỏ và bấm thanh toán tại cùng một mili-giây. Trong các hệ thống thông thường sử dụng cơ chế đọc rồi mới ghi (Read-Modify-Write), cả hai luồng xử lý đều đọc được stock = 1, dẫn đến việc cả hai đơn hàng đều được chấp thuận và stock bị trừ thành -1 (âm kho). Đây là lỗi nghiêm trọng làm đứt gãy chuỗi cung ứng của nhà hàng.", bold_lead="Thứ nhất:")
p("Thứ hai là bài toán Ràng buộc giỏ hàng và danh tính khách hàng: Nhiều website cho phép khách vãng lai thêm đồ vô tội vạ vào giỏ mà không kiểm tra đăng nhập, dẫn đến việc lưu trữ dữ liệu rác, nghẽn bộ nhớ đệm và xung đột mã giảm giá khi tiến hành thanh toán.", bold_lead="Thứ hai:")
p("Thứ ba là bài toán Thuật toán Đánh giá số sao động: Cần xây dựng công thức toán học để khi có một lượt đánh giá mới (từ 1 đến 5 sao) gửi về, điểm trung bình của món ăn phải được tính toán lại ngay lập tức theo trọng số thực tế và cập nhật vào cơ sở dữ liệu NoSQL.", bold_lead="Thứ ba:")

h("1.5 Lý do chọn đề tài", level=2)
p("Xuất phát từ niềm đam mê ứng dụng các công nghệ hiện đại vào giải quyết các bài toán thực tiễn của cuộc sống, cùng với mong muốn xây dựng một giải pháp hoàn chỉnh từ A đến Z cho một mô hình kinh doanh F&B trực tuyến, em đã quyết định lựa chọn đề tài: \"Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ\".")
p("Đề tài không chỉ dừng lại ở một ứng dụng bán hàng thông thường, mà còn là công trình kết tinh các kiến thức về kiến trúc phần mềm, cơ sở dữ liệu NoSQL, kỹ thuật xử lý bất đồng bộ và đồ họa web hiện đại.")

h("1.6 Mục tiêu của đề tài", level=2)
p("Đề tài đặt ra các mục tiêu cụ thể cần đạt được:")
bullets([
    "Mục tiêu 1: Xây dựng hoàn chỉnh ứng dụng web thương mại điện tử đặt món ăn FoodVD đạt chuẩn Responsive trên cả máy tính và điện thoại.",
    "Mục tiêu 2: Tích hợp thành công công nghệ Google Model-Viewer để hiển thị và điều khiển tương tác mô hình 3D thực phẩm mượt mà.",
    "Mục tiêu 3: Giải quyết triệt để lỗi tranh chấp đồng thời (Race Condition) bằng giải thuật Atomic Reservation trên MongoDB WiredTiger Engine.",
    "Mục tiêu 4: Thiết kế hệ thống phân quyền 3 tầng độc lập: Khách hàng (đặt món, xem 3D, đánh giá), Nhân viên (xử lý đơn, quản lý món, chấm công vào/tan ca), Quản trị viên (quản lý thực đơn, tính lương, báo cáo doanh thu, quản lý Voucher).",
    "Mục tiêu 5: Xây dựng cơ chế đánh giá món ăn và thuật toán tính số sao trung bình động chính xác dựa trên đánh giá thực tế của khách hàng."
])

h("1.7 Phạm vi của đề tài", level=2)
bullets([
    "Về nghiệp vụ: Bao quát toàn bộ quy trình từ giới thiệu món, tìm kiếm, trải nghiệm 3D, thêm giỏ hàng, áp mã giảm giá, đặt hàng, xử lý đơn, giao hàng, đến quản lý kho, chấm công nhân viên và thống kê tài chính.",
    "Về công nghệ: Sử dụng React 19, TypeScript, Tailwind CSS ở Frontend; Node.js, Express.js ở Backend; MongoDB làm hệ quản trị cơ sở dữ liệu; kết nối API qua kiến trúc RESTful.",
    "Về thanh toán: Tích hợp chuẩn thanh toán COD (tiền mặt khi nhận) và chuyển khoản ngân hàng tự động qua chuẩn VietQR."
])

h("1.8 Đối tượng sử dụng hệ thống", level=2)
bullets([
    "Khách vãng lai: Người dùng mới truy cập website, xem thực đơn, xem thông tin giới thiệu và trải nghiệm mô hình 3D.",
    "Khách hàng thành viên: Người dùng đã đăng ký tài khoản, có quyền quản lý giỏ hàng, đặt món, chọn topping, theo dõi tiến trình đơn hàng và viết đánh giá sao.",
    "Nhân viên vận hành: Nhân viên nhà hàng phụ trách kiểm tra nguyên liệu, bật/tắt trạng thái còn món, duyệt và cập nhật trạng thái đơn hàng, thực hiện chấm công hàng ngày.",
    "Quản trị viên (Admin): Chủ cửa hàng / Người quản lý toàn diện có quyền thêm sửa xóa thực đơn, thiết lập giá và tồn kho, quản trị bảng lương nhân viên, xem báo cáo doanh thu và cấu hình mã Voucher."
])

h("1.9 Ý nghĩa khoa học và thực tiễn của đề tài", level=2)
p("Về mặt khoa học: Đề tài kiểm chứng tính khả thi và hiệu năng vượt trội của mô hình kiến trúc Client - Server hiện đại với giao thức RESTful API; áp dụng thành công các nguyên lý cơ sở dữ liệu nâng cao như Document-Level Locking, Atomic Operations và Compensating Transactions trong môi trường NoSQL MongoDB.")
p("Về mặt thực tiễn: Hệ thống FoodVD có khả năng ứng dụng trực tiếp vào các chuỗi cửa hàng ăn uống, quán cafe, nhà hàng fast-food vừa và nhỏ, giúp tối ưu hóa chi phí vận hành, loại bỏ sai sót thủ công và nâng cao uy tín thương hiệu trong mắt người tiêu dùng.")

h("1.10 Bố cục của đồ án", level=2)
p("Báo cáo đồ án được cấu trúc thành 4 chương chính như sau:")
bullets([
    "Chương 1: Tổng quan về hệ thống thương mại điện tử F&B và bài toán FoodVD.",
    "Chương 2: Cơ sở lý thuyết và công nghệ ứng dụng.",
    "Chương 3: Phân tích và thiết kế hệ thống (Mô hình hóa toàn diện bằng StarUML).",
    "Chương 4: Thực nghiệm và kết quả đạt được (Demo các màn hình chức năng và kịch bản kiểm thử)."
])
doc.add_page_break()

# =========================================================================
# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG
# =========================================================================
h("CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG", level=1)

h("2.1 Tổng quan về kiến trúc hệ thống Client - Server", level=2)
p("Kiến trúc Client - Server (Máy khách - Máy chủ) là mô hình điện toán phân tán kinh điển, trong đó khối lượng công việc được phân chia giữa các nhà cung cấp tài nguyên/dịch vụ (Server) và các bên yêu cầu dịch vụ (Client). Trong dự án FoodVD, kiến trúc này được tổ chức theo mô hình tách biệt hoàn toàn giữa Frontend và Backend:")
bullets([
    "Tầng Client (Frontend): Ứng dụng Single Page Application (SPA) xây dựng trên nền tảng React 19 và TypeScript, chạy trực tiếp trên trình duyệt của người dùng. Tầng này chịu trách nhiệm hiển thị giao diện, tiếp nhận tương tác, điều khiển mô hình 3D và gửi các yêu cầu HTTP không đồng bộ.",
    "Tầng Server (Backend): Máy chủ Node.js chạy framework Express.js, lắng nghe tại cổng 5000. Tầng này chịu trách nhiệm xử lý logic nghiệp vụ, xác thực danh tính, thực thi giải thuật Atomic Lock trừ kho và giao tiếp với cơ sở dữ liệu.",
    "Tầng Data Storage: Hệ quản trị cơ sở dữ liệu NoSQL MongoDB lắng nghe tại cổng 27017, lưu trữ toàn bộ các Collection dữ liệu một cách an toàn và bền vững."
])

h("2.2 Ngôn ngữ lập trình TypeScript và JavaScript hiện đại", level=2)
p("TypeScript là một siêu tập (superset) mã nguồn mở của JavaScript được phát triển bởi Microsoft, bổ sung hệ thống kiểu tĩnh tùy chọn (Static Typing) và các tính năng hướng đối tượng nâng cao. Việc sử dụng TypeScript trong toàn bộ dự án FoodVD mang lại những ưu thế vượt bậc:")
bullets([
    "Bắt lỗi ngay từ thời điểm biên dịch (Compile-time Type Checking): Giúp phát hiện sớm các lỗi sai kiểu dữ liệu, thiếu trường thuộc tính (như lỗi vouchers/vouchersList hay stock undefined) trước khi mã nguồn được chạy trên môi trường thực tế.",
    "Hỗ trợ tái cấu trúc mã nguồn (Refactoring) an toàn và tự động gợi ý mã (IntelliSense) tuyệt vời trong các trình soạn thảo mã nguồn.",
    "Định nghĩa kiểu dữ liệu đồng nhất: Các Interface và Type như Dish, Order, User, Voucher, TimekeepingRecord được chia sẻ chặt chẽ, tạo nên cấu trúc mã nguồn sáng sủa và dễ bảo trì."
])

h("2.3 Thư viện React 19 và kiến trúc Single Page Application (SPA)", level=2)
p("React là thư viện JavaScript hàng đầu thế giới được xây dựng bởi Meta (Facebook) để phát triển giao diện người dùng tương tác cao. Phiên bản React 19 mang đến những cải tiến mạnh mẽ về hiệu năng kết hợp với mô hình Virtual DOM (Cây DOM ảo), cho phép ứng dụng chỉ vẽ lại (re-render) đúng những thành phần có dữ liệu thay đổi thay vì tải lại toàn bộ trang web.")
p("Nhờ kiến trúc Single Page Application (SPA), trải nghiệm của khách hàng trên FoodVD trở nên mượt mà như một ứng dụng native trên điện thoại: việc chuyển đổi giữa Thực đơn, Giỏ hàng, Trang thanh toán hay Bảng điều khiển quản trị diễn ra tức thì trong nháy mắt mà không bao giờ bị hiện tượng nhấp nháy trắng màn hình.")

h("2.4 Công cụ xây dựng dự án Vite Build Tool", level=2)
p("Vite là công cụ xây dựng (build tool) thế hệ mới được tạo ra bởi Evan You, giải quyết triệt để sự cồng kềnh và chậm chạp của các công cụ đóng gói truyền thống như Webpack. Vite tận dụng cơ chế Native ES Modules của các trình duyệt hiện đại kết hợp với trình biên dịch siêu tốc esbuild (viết bằng ngôn ngữ Go), cho phép máy chủ phát triển khởi động trong vòng chưa đầy 1 giây và hỗ trợ tính năng Hot Module Replacement (HMR) tức thời.")

h("2.5 Nền tảng thực thi Node.js và Framework Express.js", level=2)
p("Node.js là môi trường chạy mã JavaScript đa nền tảng phía máy chủ, được xây dựng trên nền tảng V8 JavaScript Engine của Google Chrome. Điểm mạnh cốt lõi của Node.js là mô hình I/O phi chặn (Non-blocking I/O) và kiến trúc điều khiển theo sự kiện (Event-driven Event Loop), giúp máy chủ có thể xử lý hàng nghìn kết nối đồng thời với mức tiêu hao tài nguyên phần cứng cực kỳ thấp.")
p("Express.js là khung ứng dụng web tối giản, nhanh và linh hoạt nhất cho Node.js, cung cấp hệ thống định tuyến (Routing) mạnh mẽ và cơ chế Middleware tiện lợi, giúp xây dựng các điểm cuối REST API chuẩn mực phục vụ cho dự án FoodVD.")

h("2.6 Cơ sở dữ liệu NoSQL MongoDB và Mongoose ODM", level=2)
p("MongoDB là hệ quản trị cơ sở dữ liệu hướng tài liệu (Document-oriented NoSQL Database) phổ biến nhất hiện nay. Thay vì lưu trữ dữ liệu dưới dạng các bảng hàng và cột cố định như hệ thống RDBMS truyền thống, MongoDB lưu dữ liệu dưới định dạng BSON (Binary JSON), cho phép các tài liệu có cấu trúc linh hoạt và lồng nhau một cách tự nhiên.")
p("Mongoose là thư viện ODM (Object Data Modeling) dành cho Node.js và MongoDB, cung cấp giải pháp lập mô hình dữ liệu ứng dụng thông qua các Schema định nghĩa kiểu, giá trị mặc định, bộ xác thực và quan hệ khóa ngoại, giúp kiểm soát tính toàn vẹn của dữ liệu một cách tuyệt đối.")

h("2.7 Kiến trúc RESTful API và giao thức trao đổi dữ liệu JSON", level=2)
p("Hệ thống giao tiếp giữa Frontend và Backend FoodVD tuân thủ hoàn toàn các nguyên lý thiết kế REST (Representational State Transfer), sử dụng các phương thức chuẩn HTTP:")
bullets([
    "GET: Truy xuất tài nguyên (Lấy danh sách món ăn, danh sách đơn hàng, lấy đánh giá).",
    "POST: Khởi tạo tài nguyên mới (Đăng ký, Đăng nhập, Tạo đơn hàng, Gửi đánh giá).",
    "PATCH / PUT: Cập nhật tài nguyên (Bật/tắt trạng thái món ăn, Cập nhật trạng thái đơn hàng).",
    "Mã trạng thái phản hồi chuẩn: 200 OK (Thành công), 201 Created (Tạo mới thành công), 400 Bad Request (Dữ liệu lỗi), 401 Unauthorized (Chưa đăng nhập), 409 Conflict (Tranh chấp tài nguyên tồn kho), 500 Internal Server Error (Lỗi máy chủ)."
])

h("2.8 Công nghệ hiển thị mô hình 3D tương tác WebGL với Google Model-Viewer", level=2)
p("Google Model-Viewer là thành phần web (Web Component) mã nguồn mở do Google phát triển, cho phép hiển thị các mô hình 3D tương tác định dạng tiêu chuẩn glTF / GLB trực tiếp trong trình duyệt web mà không cần cài đặt thêm bất kỳ plugin nào. Nó sử dụng công nghệ WebGL và Three.js ngầm định, tự động tối ưu hóa ánh sáng, đổ bóng, phản xạ vật lý (PBR - Physically Based Rendering) và hỗ trợ đầy đủ cử chỉ xoay, zoom, kéo thả trên cả máy tính và màn hình cảm ứng.")

h("2.9 Cơ chế bảo mật, mã hóa dữ liệu nhạy cảm AES-256 và Masking", level=2)
p("Để bảo vệ quyền riêng tư của khách hàng và tuân thủ các quy định về an toàn thông tin mạng, hệ thống FoodVD tích hợp hai lớp bảo vệ dữ liệu:")
bullets([
    "Kỹ thuật che dấu dữ liệu (Data Masking): Số điện thoại và địa chỉ của khách hàng khi hiển thị trên giao diện công khai hoặc tài khoản được che mờ tự động (Ví dụ: số '0901234567' được che thành '*******567', địa chỉ '136 Xuân Thủy, Cầu Giấy' được mã hóa bảo mật), ngăn chặn hành vi chụp lén màn hình.",
    "Thuật toán mã hóa đối xứng AES-256 (Advanced Encryption Standard): Chuẩn mã hóa cấp quân sự sử dụng khóa 256-bit, được áp dụng để mã hóa các chuỗi thông tin nhạy cảm của đơn hàng trước khi truyền qua mạng."
])

h("2.10 Công cụ quản lý phiên bản Git, GitHub và công cụ quản trị MongoDB Compass", level=2)
p("Git là hệ thống quản lý phiên bản phân tán (Distributed Version Control System) tiêu chuẩn công nghiệp. Toàn bộ mã nguồn dự án FoodVD được theo dõi lịch sử chỉnh sửa chặt chẽ và lưu trữ đồng bộ trên kho lưu trữ đám mây GitHub tại địa chỉ: https://github.com/dungxvux2125-cell/DO_AN_KY--52310079--WEB_BAN_DO_AN.")
p("MongoDB Compass là giao diện đồ họa (GUI) chính thức của MongoDB, cung cấp công cụ trực quan hóa các Collection, chỉnh sửa document trực tiếp, phân tích chỉ mục (Index) và tối ưu hóa câu lệnh truy vấn thời gian thực.")
doc.add_page_break()

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
tbl(["Vai trò (Actor)", "Mô tả trách nhiệm", "Các quyền hạn chức năng chính"], [
    ["Khách vãng lai", "Người dùng chưa đăng nhập hệ thống", "Xem thực đơn, tìm kiếm món, lọc giá, trải nghiệm xem 3D xoay 360 độ."],
    ["Khách hàng (Customer)", "Người dùng đã đăng ký & đăng nhập tài khoản", "Thêm giỏ hàng, chọn topping, áp mã Voucher, đặt hàng (COD/VietQR), theo dõi đơn hàng trực tiếp, viết đánh giá và chấm điểm sao."],
    ["Nhân viên (Staff)", "Nhân viên phục vụ và vận hành cửa hàng", "Quản lý trạng thái món ăn (Còn món/Tạm hết), chuyển trạng thái đơn hàng (Chờ duyệt -> Đang chuẩn bị -> Đang giao -> Hoàn tất), chấm công theo ca (Vào ca/Tan ca)."],
    ["Quản trị viên (Admin)", "Chủ nhà hàng / Quản lý cấp cao", "Thêm món mới vào kho, xem báo cáo doanh thu và đơn hủy, chỉnh sửa bảng lương nhân viên, đồng bộ chấm công tự động, tạo và quản lý mã Voucher."]
], [1.3, 2.0, 3.2])

h("3.3 Thiết kế Biểu đồ Use Case", level=2)
p("Dưới đây là các biểu đồ Use Case mô hình hóa chi tiết tương tác của các tác nhân đối với hệ thống FoodVD, được thiết kế chuẩn xác bằng công cụ StarUML:")

fig("Hinh_3_1_UseCase_TongQuat.png", "Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD")
p("Biểu đồ Hình 3.1 thể hiện cấu trúc Use Case tổng quát toàn hệ thống. Bốn tác nhân chính tương tác với 10 ca sử dụng cốt lõi nằm trong ranh giới hệ thống (System Boundary) FoodVD.")

fig("Hinh_3_2_UseCase_KhachHang.png", "Hình 3.2: Biểu đồ Use Case chi tiết phân hệ Khách hàng")
p("Biểu đồ Hình 3.2 mô tả chi tiết phân hệ Khách hàng. Quan hệ giữa ca sử dụng 'Thêm món vào giỏ hàng' và 'Chọn Topping' là quan hệ <<extend>> (tùy chọn mở rộng). Quan hệ giữa 'Đặt hàng & Thanh toán' và 'Trừ tồn kho Atomic' là quan hệ <<include>> (bắt buộc phải thực thi kiểm tra kho nguyên tử khi tạo đơn hàng).")

fig("Hinh_3_3_UseCase_Admin_NhanVien.png", "Hình 3.3: Biểu đồ Use Case chi tiết phân hệ Quản trị viên và Nhân viên")
p("Biểu đồ Hình 3.3 làm nổi bật tính phân quyền độc lập hoàn toàn: Nhân viên chỉ tập trung vào các Use Case vận hành thực đơn, xử lý đơn hàng và chấm công; Quản trị viên nắm giữ toàn quyền trên các Use Case chiến lược như thêm sản phẩm, báo cáo doanh thu tài chính, quản lý lương và cấu hình Voucher.")

h("3.4 Thiết kế Biểu đồ hoạt động (Activity Diagrams)", level=2)
p("Biểu đồ hoạt động mô tả chi tiết luồng xử lý nghiệp vụ theo thời gian của các quy trình quan trọng trong hệ thống:")

fig("Hinh_3_4_Activity_DatHang_Atomic.png", "Hình 3.4: Biểu đồ hoạt động Quy trình Đặt hàng và Trừ kho nguyên tử")
p("Biểu đồ Hình 3.4 mô tả toàn bộ luồng hoạt động từ lúc khách chọn món, kiểm tra đăng nhập bắt buộc khi bấm thêm giỏ hàng, đến bước then chốt: Database thực thi câu lệnh nguyên tử findOneAndUpdate. Nếu kho không đủ, luồng rẽ nhánh sang việc tự động kích hoạt Rollback hoàn trả kho và thông báo lỗi HTTP 409 cho khách hàng.")

fig("Hinh_3_9_Activity_ChamCong_Luong.png", "Hình 3.9: Biểu đồ hoạt động Quy trình Chấm công và Tính lương nhân viên")
p("Biểu đồ Hình 3.9 mô tả chu trình khép kín: Nhân viên thực hiện bấm 'Vào ca' và 'Tan ca' theo ca làm việc (Sáng/Tối). Dữ liệu được lưu trữ tự động vào bảng timekeepings. Khi Quản trị viên bấm nút 'Đồng bộ từ Chấm công', hệ thống tự động tổng hợp số ca đã hoàn thành và nhân với đơn giá lương ca, cộng thưởng, trừ phạt để ra tổng lương thực nhận.")

fig("Hinh_3_10_Activity_DanhGia_Rating.png", "Hình 3.10: Biểu đồ hoạt động Quy trình Đánh giá món ăn và Tính số sao động")
p("Biểu đồ Hình 3.10 minh họa giải thuật tính điểm sao động: Khi nhận được một đánh giá mới, hệ thống truy vấn tổng số điểm sao và tổng số đánh giá của món ăn đó trong cơ sở dữ liệu MongoDB, áp dụng công thức trung bình cộng và làm tròn 1 chữ số thập phân, sau đó cập nhật ngược lại vào thuộc tính rating của bảng món ăn.")

h("3.5 Thiết kế Biểu đồ trình tự & Giải thuật giải quyết tranh chấp tồn kho đồng thời", level=2)
p("Để giải quyết tận gốc bài toán hai khách hàng cùng đặt một sản phẩm mà kho chỉ còn đúng 1 suất, hệ thống áp dụng cơ chế Khóa mức tài liệu (Document-Level Lock) của MongoDB WiredTiger kết hợp lệnh nguyên tử Compare-And-Swap:")

fig("Hinh_3_5_Sequence_RaceCondition.png", "Hình 3.5: Biểu đồ trình tự Giải quyết tranh chấp đặt hàng đồng thời (Race Condition)")
p("Biểu đồ trình tự Hình 3.5 mô tả chính xác tương tác qua lại giữa Khách hàng A, Khách hàng B, Backend Express API và MongoDB:")
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

fig("Hinh_3_11_State_DonHang.png", "Hình 3.11: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)")
p("Hình 3.11 mô tả các trạng thái của một đơn hàng: Khởi tạo (Created) -> Chờ duyệt (Pending) -> Đang chuẩn bị (Preparing) -> Đang giao (Delivering) -> Hoàn tất (Completed). Trường hợp hết hàng hoặc khách hủy đơn, đơn hàng chuyển thẳng sang trạng thái Đã hủy (Cancelled).")

h("3.7 Thiết kế Biểu đồ lớp miền nghiệp vụ (Class Diagram)", level=2)
p("Biểu đồ lớp biểu diễn các thực thể đối tượng trong miền nghiệp vụ của hệ thống FoodVD cùng các thuộc tính và phương thức thao tác:")

fig("Hinh_3_6_Class_Diagram.png", "Hình 3.6: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD")
p("Hình 3.6 thể hiện các lớp cốt lõi: User (Người dùng), Dish (Món ăn), Order (Đơn hàng), Review (Đánh giá), Voucher (Mã giảm giá), TimekeepingRecord (Bản ghi chấm công) và StaffSalary (Bảng lương). Mối quan hệ giữa User và Order là quan hệ 1 - N (một người dùng có thể đặt nhiều đơn hàng); quan hệ giữa Dish và Review là quan hệ 1 - N (một món ăn có thể nhận được nhiều đánh giá).")

h("3.8 Thiết kế Cấu trúc Cơ sở dữ liệu MongoDB (Collections Schema)", level=2)
p("Cơ sở dữ liệu FoodVD được thiết kế theo mô hình Document NoSQL chuẩn mực trên MongoDB, bao gồm 6 Collection chính:")

fig("Hinh_3_7_MongoDB_Schema.png", "Hình 3.7: Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Document Collections Schema)")
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

fig("Hinh_3_8_Component_Deployment.png", "Hình 3.8: Biểu đồ thành phần kiến trúc và triển khai hệ thống FoodVD")
p("Hình 3.8 làm rõ sự tương tác giữa 3 nút kiến trúc phần cứng chính: Trình duyệt Client (chạy React 19 SPA và Google Model-Viewer 3D), Máy chủ ứng dụng Node.js (chạy Express API, Atomic Stock Controller và Mongoose ODM) và Máy chủ cơ sở dữ liệu MongoDB (chạy WiredTiger Engine với Document Locking) giao tiếp qua cổng bảo mật 27017.")
doc.add_page_break()

# =========================================================================
# CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC
# =========================================================================
h("CHƯƠNG 4: THỰC NGHIỆM VÀ KẾT QUẢ ĐẠT ĐƯỢC", level=1)

h("4.1 Môi trường cài đặt và cấu hình thử nghiệm", level=2)
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

h("4.5 Theo dõi hành trình đơn hàng và Chức năng Đánh giá món ăn tính số sao động", level=2)
p("Khách hàng sau khi đăng nhập có thể truy cập trang Tài khoản cá nhân để theo dõi hành trình đơn hàng theo thời gian thực (Chờ duyệt -> Đang chuẩn bị -> Đang giao -> Hoàn tất) và bấm viết đánh giá sao cho các món ăn đã trải nghiệm:")

fig("Hinh_4_5_UI_TheoDoiDonHang.png", "Hình 4.5: Giao diện Theo dõi tiến trình đơn hàng và Đánh giá món ăn")

h("4.6 Giao diện Vận hành dành cho Nhân viên", level=2)
p("Giao diện dành riêng cho tài khoản Nhân viên (nhanvien@foodvd.vn) sở hữu thanh công cụ độc lập gồm 3 chức năng: Quản lý sản phẩm (bật/tắt còn món), Quản lý đơn hàng (duyệt và cập nhật trạng thái đơn) và Chấm công (Vào ca/Tan ca):")

fig("Hinh_4_7_UI_VanHanh_NhanVien.png", "Hình 4.7: Giao diện Vận hành dành cho Nhân viên (Đơn hàng & Chấm công)")

h("4.7 Giao diện Quản trị dành cho Admin", level=2)
p("Giao diện dành riêng cho tài khoản Quản trị viên (admin@foodvd.vn) sở hữu giao diện quản trị chuyên nghiệp với 4 phân hệ cao cấp: Quản lý thực đơn (thêm món mới và số lượng kho), Báo cáo doanh thu tài chính (không bị lỗi văng màn hình, hiển thị món bán chạy), Quản lý bảng lương nhân viên (chỉnh sửa trực tiếp số ca, lương cơ bản, thưởng phạt và nút Đồng bộ từ Chấm công), và Quản lý mã giảm giá Voucher:")

fig("Hinh_4_6_UI_QuanTri_Admin.png", "Hình 4.6: Giao diện Bảng điều khiển Quản trị Admin (Sản phẩm, Doanh thu, Lương)")

h("4.8 Kịch bản kiểm thử tình huống tranh chấp kho (Race Condition Test)", level=2)
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

# Save the final document
doc.save(OUT_PATH)
print(f"===========================================================")
print(f"BÁO CÁO ĐỒ ÁN KỲ ĐÃ ĐƯỢC XUẤT THÀNH CÔNG TẠI:")
print(f"{OUT_PATH}")
print(f"Kích thước tệp: {OUT_PATH.stat().st_size} bytes")
print(f"===========================================================")
