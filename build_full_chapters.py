# -*- coding: utf-8 -*-
"""
PHẦN THÂN BÁO CÁO: NỘI DUNG 4 CHƯƠNG CHI TIẾT
"""

import sys
from pathlib import Path

BASE = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP")
sys.path.append(str(BASE))

from generate_full_perfect_report import doc, p, h, bullets, fig, tbl, add_usecase_spec, OUT_PATH
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Pt, Inches, RGBColor

# Import the title & prelims
import build_complete_academic_report

print("Appending Chapter 1: Tổng quan...")

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

p("Bảng 1.1: Bảng so sánh đối sánh giữa FoodVD và các hệ thống đặt đồ ăn thông thường", bold=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=3)
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
p("Xuất phát từ niềm đam mê ứng dụng các công nghệ hiện đại vào giải quyết các bài toán thực tiễn của cuộc sống, cùng với mong muốn xây dựng một giải pháp hoàn chỉnh từ A đến Z cho một mô hình kinh doanh F&B trực tuyến, em đã quyết định lựa chọn đề tài: 'Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ'.")
p("Đề tài không chỉ dừng lại ở một ứng dụng bán hàng thông thường, mà còn là công trình kết tinh các kiến thức về kiến trúc phần mềm, cơ sở dữ liệu NoSQL, kỹ thuật xử lý bất đồng bộ và đồ họa web hiện đại.")

h("1.6 Mục tiêu của đề tài", level=2)
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

print("Chapters 1 and 2 completed. Writing Chapter 3: Phân tích & Thiết kế (Full UML & Use Case Specs)...")
