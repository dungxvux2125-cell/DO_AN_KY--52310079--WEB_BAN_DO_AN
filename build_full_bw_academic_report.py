import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

sys.stdout.reconfigure(encoding='utf-8')

OUT_DIR = r"c:\Users\Admin\Desktop\523100B"
DOC_NAME = "BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN.docx"
OUT_PATH_LOCAL = os.path.join(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP", DOC_NAME)
OUT_PATH_DESKTOP = os.path.join(OUT_DIR, "BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN_BAN_CHUAN.docx")

doc = docx.Document()

# Setup Section & Margins
sec = doc.sections[0]
sec.top_margin = Inches(0.787)     # 2.0 cm
sec.bottom_margin = Inches(0.787)  # 2.0 cm
sec.left_margin = Inches(1.181)    # 3.0 cm (đóng gáy)
sec.right_margin = Inches(0.787)   # 2.0 cm
sec.page_width = Inches(8.27)      # A4
sec.page_height = Inches(11.69)

# Base Styles
style_normal = doc.styles['Normal']
style_normal.font.name = 'Times New Roman'
style_normal.font.size = Pt(13)
style_normal.font.color.rgb = RGBColor(0, 0, 0)
style_normal.paragraph_format.line_spacing = 1.3
style_normal.paragraph_format.space_after = Pt(6)

def p(text="", bold=False, italic=False, size=13, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_before=0, space_after=6, line_spacing=1.3):
    par = doc.add_paragraph()
    par.alignment = align
    par.paragraph_format.space_before = Pt(space_before)
    par.paragraph_format.space_after = Pt(space_after)
    par.paragraph_format.line_spacing = line_spacing
    if text:
        r = par.add_run(text)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(size)
        r.bold = bold
        r.italic = italic
        r.font.color.rgb = RGBColor(0, 0, 0)
    return par

def h(text, level=1):
    par = doc.add_paragraph()
    par.paragraph_format.keep_with_next = True
    r = par.add_run(text)
    r.font.name = 'Times New Roman'
    r.bold = True
    r.font.color.rgb = RGBColor(0, 0, 0)
    
    if level == 1:
        par.alignment = WD_ALIGN_PARAGRAPH.CENTER
        par.paragraph_format.space_before = Pt(18)
        par.paragraph_format.space_after = Pt(12)
        r.font.size = Pt(16)
    elif level == 2:
        par.alignment = WD_ALIGN_PARAGRAPH.LEFT
        par.paragraph_format.space_before = Pt(14)
        par.paragraph_format.space_after = Pt(6)
        r.font.size = Pt(14)
    elif level == 3:
        par.alignment = WD_ALIGN_PARAGRAPH.LEFT
        par.paragraph_format.space_before = Pt(10)
        par.paragraph_format.space_after = Pt(4)
        r.font.size = Pt(13)
    return par

def bullets(items):
    for item in items:
        par = doc.add_paragraph(style='List Bullet')
        par.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        par.paragraph_format.space_after = Pt(3)
        par.paragraph_format.line_spacing = 1.3
        r = par.add_run(item)
        r.font.name = 'Times New Roman'
        r.font.size = Pt(13)
        r.font.color.rgb = RGBColor(0, 0, 0)

def fig(filename, caption_text, width_in=6.0):
    img_path = os.path.join("diagrams", filename)
    if os.path.exists(img_path):
        p_img = doc.add_paragraph()
        p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_img.paragraph_format.space_before = Pt(8)
        p_img.paragraph_format.space_after = Pt(4)
        r_img = p_img.add_run()
        r_img.add_picture(img_path, width=Inches(width_in))
        
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(0)
        p_cap.paragraph_format.space_after = Pt(10)
        r_cap = p_cap.add_run(caption_text)
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(11.5)
        r_cap.italic = True
        r_cap.bold = True
        r_cap.font.color.rgb = RGBColor(0, 0, 0)
    else:
        print(f"Warning: Figure not found: {filename}")

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def set_table_borders(table, color="000000", sz="4", val="single"):
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>\n'
        f'  <w:top w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'  <w:bottom w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'  <w:left w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'  <w:right w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'  <w:insideH w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'  <w:insideV w:val="{val}" w:sz="{sz}" w:space="0" w:color="{color}"/>\n'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)

def tbl(headers, rows, col_widths, caption=None):
    if caption:
        p_cap = doc.add_paragraph()
        p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cap.paragraph_format.space_before = Pt(8)
        p_cap.paragraph_format.space_after = Pt(4)
        r_cap = p_cap.add_run(caption)
        r_cap.font.name = 'Times New Roman'
        r_cap.font.size = Pt(11.5)
        r_cap.bold = True
        r_cap.font.color.rgb = RGBColor(0, 0, 0)
        
    table = doc.add_table(rows=len(rows) + 1, cols=len(headers))
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    set_table_borders(table, color="000000", sz="4")
    
    # Headers
    hdr_cells = table.rows[0].cells
    for i, title in enumerate(headers):
        hdr_cells[i].text = title
        hdr_cells[i].width = Inches(col_widths[i])
        set_cell_margins(hdr_cells[i], top=120, bottom=120, left=140, right=140)
        p_cell = hdr_cells[i].paragraphs[0]
        p_cell.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p_cell.paragraph_format.space_after = Pt(0)
        for r in p_cell.runs:
            r.font.name = 'Times New Roman'
            r.font.size = Pt(11.5)
            r.bold = True
            r.font.color.rgb = RGBColor(0, 0, 0)
            
    # Rows
    for r_idx, row_data in enumerate(rows):
        row_cells = table.rows[r_idx + 1].cells
        for c_idx, cell_value in enumerate(row_data):
            row_cells[c_idx].text = str(cell_value)
            row_cells[c_idx].width = Inches(col_widths[c_idx])
            set_cell_margins(row_cells[c_idx], top=100, bottom=100, left=140, right=140)
            p_cell = row_cells[c_idx].paragraphs[0]
            p_cell.alignment = WD_ALIGN_PARAGRAPH.CENTER if c_idx == 0 and len(str(cell_value)) < 15 else WD_ALIGN_PARAGRAPH.LEFT
            p_cell.paragraph_format.space_after = Pt(0)
            for r in p_cell.runs:
                r.font.name = 'Times New Roman'
                r.font.size = Pt(11)
                r.font.color.rgb = RGBColor(0, 0, 0)
                
    p_sp = doc.add_paragraph()
    p_sp.paragraph_format.space_before = Pt(0)
    p_sp.paragraph_format.space_after = Pt(8)

def toc_table(entries):
    table = doc.add_table(rows=len(entries), cols=2)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    tblPr = table._tbl.tblPr
    borders = parse_xml(
        f'<w:tblBorders {nsdecls("w")}>\n'
        f'  <w:top w:val="none"/>\n'
        f'  <w:bottom w:val="none"/>\n'
        f'  <w:left w:val="none"/>\n'
        f'  <w:right w:val="none"/>\n'
        f'  <w:insideH w:val="none"/>\n'
        f'  <w:insideV w:val="none"/>\n'
        f'</w:tblBorders>'
    )
    tblPr.append(borders)
    
    for idx, (title, page, level) in enumerate(entries):
        row = table.rows[idx]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(5.6)
        c1.width = Inches(0.8)
        set_cell_margins(c0, top=30, bottom=30, left=0, right=0)
        set_cell_margins(c1, top=30, bottom=30, left=0, right=0)
        
        indent = "    " * level
        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(1)
        p0.paragraph_format.space_before = Pt(1)
        r0 = p0.add_run(f"{indent}{title}")
        r0.font.name = 'Times New Roman'
        r0.font.size = Pt(11 if level > 0 else 11.5)
        r0.bold = (level == 0)
        r0.font.color.rgb = RGBColor(0, 0, 0)
        
        p1 = c1.paragraphs[0]
        p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        p1.paragraph_format.space_after = Pt(1)
        p1.paragraph_format.space_before = Pt(1)
        r1 = p1.add_run(str(page))
        r1.font.name = 'Times New Roman'
        r1.font.size = Pt(11 if level > 0 else 11.5)
        r1.bold = (level == 0)
        r1.font.color.rgb = RGBColor(0, 0, 0)

def add_usecase_spec(uc_id, uc_name, actor, desc, pre_cond, main_flow, alt_flow, post_cond, table_num):
    headers = ["Thuộc tính", "Nội dung đặc tả chi tiết"]
    rows = [
        ["Mã & Tên Use Case", f"{uc_id} - {uc_name}"],
        ["Tác nhân (Actor)", actor],
        ["Mô tả nghiệp vụ", desc],
        ["Tiền điều kiện", pre_cond],
        ["Luồng sự kiện chính (Main Flow)", main_flow],
        ["Luồng ngoại lệ (Alternative Flow)", alt_flow],
        ["Hậu điều kiện", post_cond]
    ]
    tbl(headers, rows, [1.6, 4.8], caption=f"Bảng {table_num}: Đặc tả chi tiết Use Case {uc_id}: {uc_name}")

print("Framework initialized. Building complete academic report with 28 B&W diagrams...")

# ==========================================
# TRANG BÌA (COVER PAGE)
# ==========================================
p("BỘ GIÁO DỤC VÀ ĐÀO TẠO", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p("TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG", bold=True, size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p("KHOA CÔNG NGHỆ SỐ VÀ TRUYỀN THÔNG", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=30)

p("BÁO CÁO ĐỒ ÁN TỐT NGHIỆP", bold=True, size=18, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12)
p("NGÀNH: CÔNG NGHỆ THÔNG TIN", bold=True, size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=25)

p("ĐỀ TÀI:", bold=True, size=14, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
p("XÂY DỰNG WEBSITE THƯƠNG MẠI ĐIỆN TỬ BÁN ĐỒ ĂN TRỰC TUYẾN FOODVD HỖ TRỢ TRẢI NGHIỆM 3D VÀ QUẢN LÝ VẬN HÀNH ĐA PHÂN HỆ",
  bold=True, size=16, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=60)

info_table = doc.add_table(rows=4, cols=2)
info_table.alignment = WD_TABLE_ALIGNMENT.CENTER
for r in info_table.rows:
    r.cells[0].width = Inches(2.5)
    r.cells[1].width = Inches(3.5)
    set_cell_margins(r.cells[0], top=30, bottom=30, left=0, right=0)
    set_cell_margins(r.cells[1], top=30, bottom=30, left=0, right=0)

info_data = [
    ("Sinh viên thực hiện:", "Vũ Dũng"),
    ("Mã sinh viên:", "52310079"),
    ("Lớp:", "523100B"),
    ("Giảng viên hướng dẫn:", "TS. Nguyễn Văn Hướng")
]
for idx, (lbl, val) in enumerate(info_data):
    p0 = info_table.rows[idx].cells[0].paragraphs[0]
    p0.paragraph_format.space_after = Pt(2)
    r0 = p0.add_run(lbl)
    r0.font.name = 'Times New Roman'
    r0.font.size = Pt(13)
    r0.bold = True
    
    p1 = info_table.rows[idx].cells[1].paragraphs[0]
    p1.paragraph_format.space_after = Pt(2)
    r1 = p1.add_run(val)
    r1.font.name = 'Times New Roman'
    r1.font.size = Pt(13)
    r1.bold = True

p("", space_before=50)
p("Hà Nội, Năm 2026", bold=True, size=13, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==========================================
# LỜI CẢM ƠN
# ==========================================
h("LỜI CẢM ƠN", level=1)
p("Trong suốt quá trình học tập và nghiên cứu tại Khoa Công nghệ Số và Truyền thông – Trường Đại học Phương Đông, em đã được tiếp cận với những nền tảng tri thức vững chắc và môi trường giáo dục sáng tạo, chuyên nghiệp.")
p("Trước hết, em xin bày tỏ lòng biết ơn sâu sắc và chân thành nhất tới Ban Giám hiệu nhà trường, các thầy cô giáo trong Khoa Công nghệ Số và Truyền thông đã tận tình truyền đạt kiến thức, kỹ năng lập trình và đạo đức nghề nghiệp trong suốt những năm tháng đại học.")
p("Đặc biệt, em xin gửi lời cảm ơn sâu sắc nhất tới Thầy hướng dẫn đã luôn dành thời gian quý báu để định hướng đề tài, giải đáp những vướng mắc kỹ thuật về mô hình kiến trúc, cơ chế xử lý tranh chấp giao dịch đồng thời và chỉ dẫn phương pháp nghiên cứu học thuật chuẩn mực để em hoàn thành tốt đồ án này.")
p("Mặc dù em đã nỗ lực hết mình để phân tích, thiết kế và cài đặt hệ thống một cách chỉn chu, bài bản, nhưng do giới hạn về thời gian và kinh nghiệm thực tế, đề tài khó tránh khỏi những thiếu sót nhất định. Em rất mong nhận được những ý kiến đóng góp, nhận xét quý báu từ quý Thầy Cô trong Hội đồng chấm đồ án để hệ thống ngày một hoàn thiện hơn.")
p("Em xin kính chúc quý Thầy Cô luôn dồi dào sức khỏe, hạnh phúc và gặt hái thêm nhiều thành công vẻ vang trong sự nghiệp trồng người!")
doc.add_page_break()

# ==========================================
# MỤC LỤC
# ==========================================
h("MỤC LỤC", level=1)
toc_items = [
    ("LỜI CẢM ƠN", "i", 0),
    ("MỤC LỤC", "ii", 0),
    ("DANH MỤC TỪ VIẾT TẮT VÀ THUẬT NGỮ", "iv", 0),
    ("DANH MỤC HÌNH ẢNH", "v", 0),
    ("DANH MỤC BẢNG BIỂU", "viii", 0),
    ("CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD", "1", 0),
    ("1.1 Bối cảnh thị trường F&B và thương mại điện tử giao đồ ăn", "1", 1),
    ("1.2 Vai trò của trải nghiệm tương tác 3D và minh bạch vận hành", "2", 1),
    ("1.3 Thực trạng và hạn chế của các hệ thống đặt đồ ăn hiện nay", "3", 1),
    ("1.4 Các vấn đề kỹ thuật tồn tại trong hệ thống F&B", "4", 1),
    ("1.5 Lý do chọn đề tài", "5", 1),
    ("1.6 Mục tiêu của đề tài", "6", 1),
    ("1.7 Phạm vi của đề tài", "6", 1),
    ("1.8 Đối tượng sử dụng hệ thống", "7", 1),
    ("1.9 Ý nghĩa khoa học và thực tiễn của đề tài", "7", 1),
    ("1.10 Bố cục của đồ án", "8", 1),
    ("CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG", "9", 0),
    ("2.1 Tổng quan về kiến trúc hệ thống Client - Server", "9", 1),
    ("2.2 Ngôn ngữ lập trình TypeScript và JavaScript hiện đại", "10", 1),
    ("2.3 Thư viện React 19 và kiến trúc Single Page Application (SPA)", "11", 1),
    ("2.4 Công cụ xây dựng dự án Vite Build Tool", "12", 1),
    ("2.5 Nền tảng thực thi Node.js và Framework Express.js", "13", 1),
    ("2.6 Cơ sở dữ liệu NoSQL MongoDB và Mongoose ODM", "14", 1),
    ("2.7 Kiến trúc RESTful API và giao thức trao đổi dữ liệu JSON", "15", 1),
    ("2.8 Công nghệ hiển thị mô hình 3D tương tác WebGL với Google Model-Viewer", "16", 1),
    ("2.9 Cơ chế bảo mật, mã hóa dữ liệu nhạy cảm AES-256 và Masking", "17", 1),
    ("2.10 Công cụ quản lý phiên bản Git, GitHub và công cụ quản trị MongoDB Compass", "18", 1),
    ("CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", "19", 0),
    ("3.1 Khảo sát hiện trạng và mô tả đề tài", "19", 1),
    ("3.2 Phân tích nghiệp vụ hệ thống theo từng vai trò (Ma trận RACI)", "20", 1),
    ("3.3 Xây dựng biểu đồ Use Case", "22", 1),
    ("3.3.1 Biểu đồ Use Case tổng quát", "22", 2),
    ("3.3.2 Use Case UC01: Xem menu và Trải nghiệm mô hình 3D WebGL", "24", 2),
    ("3.3.3 Use Case UC02: Quản lý giỏ hàng và Đặt hàng trực tuyến", "26", 2),
    ("3.3.4 Use Case UC03: Thanh toán tự động qua mã VietQR động", "28", 2),
    ("3.3.5 Use Case UC04: Tra cứu lịch sử và Theo dõi tiến trình đơn hàng", "30", 2),
    ("3.3.6 Use Case UC05: Đánh giá món ăn và Phản hồi chất lượng dịch vụ", "32", 2),
    ("3.3.7 Use Case UC06: Đăng ký, Đăng nhập và Quản lý hồ sơ cá nhân", "34", 2),
    ("3.3.8 Use Case UC07: Quản lý danh mục món ăn và Kiểm soát kho hàng (Admin)", "36", 2),
    ("3.3.9 Use Case UC08: Quản lý đơn hàng và Điều phối vận hành bếp (Admin/Staff)", "38", 2),
    ("3.3.10 Use Case UC09: Báo cáo phân tích doanh thu và Thống kê kinh doanh (Admin)", "40", 2),
    ("3.3.11 Use Case UC10: Quản lý chương trình khuyến mãi và Mã giảm giá Voucher", "42", 2),
    ("3.3.12 Use Case UC11: Điểm danh và Chấm công theo ca làm việc (Nhân viên)", "44", 2),
    ("3.3.13 Use Case UC12: Duyệt bảng chấm công và Tính lương nhân viên tự động", "46", 2),
    ("3.4 Biểu đồ hoạt động (Activity Diagram)", "48", 1),
    ("3.4.1 Biểu đồ hoạt động tổng quát của hệ thống FoodVD", "48", 2),
    ("3.4.2 Biểu đồ hoạt động chi tiết quy trình Đặt hàng và Trừ kho nguyên tử", "50", 2),
    ("3.4.3 Biểu đồ hoạt động chi tiết quy trình Chấm công GPS/Wi-Fi và Tính lương", "52", 2),
    ("3.4.4 Biểu đồ hoạt động chi tiết quy trình Đánh giá món ăn và Tính sao động", "54", 2),
    ("3.5 Biểu đồ trình tự (Sequence Diagram)", "56", 1),
    ("3.5.1 Biểu đồ tuần tự Xử lý tranh chấp đặt hàng đồng thời (Race Condition)", "56", 2),
    ("3.5.2 Biểu đồ tuần tự Sinh mã thanh toán VietQR động và Webhook tự động", "58", 2),
    ("3.5.3 Biểu đồ tuần tự Chấm công nhân viên và Kiểm tra hợp lệ ca làm", "60", 2),
    ("3.5.4 Biểu đồ tuần tự Quản lý tồn kho món ăn và Cập nhật trạng thái", "62", 2),
    ("3.5.5 Biểu đồ tuần tự Gửi đánh giá món ăn và Tính toán điểm trung bình", "64", 2),
    ("3.5.6 Biểu đồ tuần tự Tổng hợp báo cáo doanh thu và Thống kê KPI kinh doanh", "66", 2),
    ("3.6 Biểu đồ trạng thái (State Machine Diagram)", "68", 1),
    ("3.6.1 Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)", "68", 2),
    ("3.7 Biểu đồ lớp và Thiết kế cơ sở dữ liệu", "70", 1),
    ("3.7.1 Biểu đồ lớp miền nghiệp vụ (Domain Class Model)", "70", 2),
    ("3.7.2 Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Collections Schema)", "72", 2),
    ("3.8 Biểu đồ kiến trúc thành phần và Triển khai", "74", 1),
    ("3.8.1 Biểu đồ thành phần kiến trúc hệ thống (Component Diagram)", "74", 2),
    ("3.8.2 Biểu đồ triển khai hệ thống (Deployment Diagram)", "76", 2),
    ("CHƯƠNG 4: CÀI ĐẶT, TRIỂN KHAI VÀ THỰC NGHIỆM CHƯƠNG TRÌNH", "78", 0),
    ("4.1 Môi trường cài đặt và Cấu hình thử nghiệm", "78", 1),
    ("4.2 Giao diện Trang chủ FoodVD và Banner khuyến mại", "79", 1),
    ("4.3 Giao diện Thực đơn, tìm kiếm và Bộ lọc đa tiêu chí", "80", 1),
    ("4.4 Giao diện Trải nghiệm xoay và Xem mô hình món ăn 3D tương tác", "81", 1),
    ("4.5 Giao diện Thông tin nhận hàng và Tóm tắt đơn hàng trực tuyến", "82", 1),
    ("4.6 Giao diện Thanh toán tự động qua mã VietQR động", "83", 1),
    ("4.7 Giao diện Lịch sử và Theo dõi tiến trình đơn hàng thời gian thực", "84", 1),
    ("4.8 Giao diện Cổng nhân viên: Vận hành thực đơn và Bật/tắt trạng thái món ăn", "85", 1),
    ("4.9 Giao diện Cổng nhân viên: Tiếp nhận đơn hàng và Điều phối tiến trình", "86", 1),
    ("4.10 Giao diện Cổng nhân viên: Điểm danh vào ca và Theo dõi lịch sử chấm công", "87", 1),
    ("4.11 Giao diện Quản trị viên: Quản lý danh mục món ăn và Kiểm soát kho", "88", 1),
    ("4.12 Giao diện Quản trị viên: Báo cáo phân tích doanh thu và Biểu đồ KPI", "89", 1),
    ("4.13 Giao diện Quản trị viên: Quản lý bảng lương và Đồng bộ dữ liệu chấm công", "90", 1),
    ("4.14 Giao diện Quản trị viên: Quản lý mã giảm giá Voucher", "91", 1),
    ("4.15 Đánh giá kết quả kiểm thử hệ thống (Test Cases trọng yếu)", "92", 1),
    ("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", "94", 0),
    ("TÀI LIỆU THAM KHẢO", "96", 0)
]
toc_table(toc_items)
doc.add_page_break()

# ==========================================
# DANH MỤC TỪ VIẾT TẮT
# ==========================================
h("DANH MỤC TỪ VIẾT TẮT VÀ THUẬT NGỮ", level=1)
abbr_headers = ["Từ viết tắt", "Thuật ngữ tiếng Anh", "Ý nghĩa / Diễn giải tiếng Việt"]
abbr_rows = [
    ["API", "Application Programming Interface", "Giao diện lập trình ứng dụng kết nối Client và Server"],
    ["F&B", "Food and Beverage", "Ngành công nghiệp dịch vụ ẩm thực và đồ uống"],
    ["JSON", "JavaScript Object Notation", "Định dạng trao đổi dữ liệu dạng chuỗi văn bản tiêu chuẩn"],
    ["JWT", "JSON Web Token", "Chuẩn mã hóa thông tin xác thực phiên người dùng an toàn"],
    ["ODM", "Object Document Mapper", "Thư viện ánh xạ tài liệu NoSQL thành đối tượng lập trình"],
    ["NoSQL", "Not Only SQL", "Cơ sở dữ liệu phi quan hệ, lưu trữ dưới dạng Document linh hoạt"],
    ["REST", "Representational State Transfer", "Kiến trúc thiết kế dịch vụ web dựa trên chuẩn HTTP"],
    ["SPA", "Single Page Application", "Ứng dụng web tải một trang duy nhất, nâng cao trải nghiệm"],
    ["UML", "Unified Modeling Language", "Ngôn ngữ mô hình hóa thống nhất trong công nghệ phần mềm"],
    ["WebGL", "Web Graphics Library", "Công nghệ kết xuất đồ họa 3D trực tiếp trong trình duyệt web"],
    ["VietQR", "Vietnam Quick Response Code", "Chuẩn nhận diện thanh toán ngân hàng chuyển khoản nhanh Việt Nam"],
    ["RACI", "Responsible, Accountable, Consulted, Informed", "Ma trận phân bổ trách nhiệm nghiệp vụ các vai trò"],
    ["GLB", "Binary glTF", "Định dạng tệp nén mô hình 3D tiêu chuẩn cho web"]
]
tbl(abbr_headers, abbr_rows, [1.1, 2.3, 3.0])
doc.add_page_break()

# ==========================================
# DANH MỤC HÌNH ẢNH (DANH MỤC HÌNH VẼ: 41 HÌNH)
# ==========================================
h("DANH MỤC HÌNH ẢNH", level=1)
fig_entries = [
    ("Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD", "23", 0),
    ("Hình 3.2: Biểu đồ Use Case chức năng Xem menu & Trải nghiệm mô hình 3D WebGL", "25", 0),
    ("Hình 3.3: Biểu đồ Use Case chức năng Quản lý giỏ hàng & Đặt hàng trực tuyến", "27", 0),
    ("Hình 3.4: Biểu đồ Use Case chức năng Thanh toán tự động qua mã VietQR động", "29", 0),
    ("Hình 3.5: Biểu đồ Use Case chức năng Tra cứu lịch sử & Theo dõi tiến trình đơn hàng", "31", 0),
    ("Hình 3.6: Biểu đồ Use Case chức năng Đánh giá món ăn & Phản hồi chất lượng dịch vụ", "33", 0),
    ("Hình 3.7: Biểu đồ Use Case chức năng Đăng ký, Đăng nhập & Quản lý hồ sơ cá nhân", "35", 0),
    ("Hình 3.8: Biểu đồ Use Case chức năng Quản lý danh mục món ăn & Kiểm soát kho (Admin)", "37", 0),
    ("Hình 3.9: Biểu đồ Use Case chức năng Quản lý đơn hàng & Điều phối vận hành bếp", "39", 0),
    ("Hình 3.10: Biểu đồ Use Case chức năng Báo cáo phân tích doanh thu & Thống kê kinh doanh", "41", 0),
    ("Hình 3.11: Biểu đồ Use Case chức năng Quản lý chương trình khuyến mãi & Mã giảm giá", "43", 0),
    ("Hình 3.12: Biểu đồ Use Case chức năng Điểm danh & Chấm công theo ca làm việc", "45", 0),
    ("Hình 3.13: Biểu đồ Use Case chức năng Duyệt bảng chấm công & Tính lương nhân viên tự động", "47", 0),
    ("Hình 3.14: Biểu đồ hoạt động (Activity Diagram) tổng quát của hệ thống FoodVD", "49", 0),
    ("Hình 3.15: Biểu đồ hoạt động chi tiết quy trình Đặt hàng và Trừ kho nguyên tử (Atomic)", "51", 0),
    ("Hình 3.16: Biểu đồ hoạt động chi tiết quy trình Chấm công GPS/Wi-Fi và Tính lương tự động", "53", 0),
    ("Hình 3.17: Biểu đồ hoạt động chi tiết quy trình Đánh giá món ăn và Tính sao động", "55", 0),
    ("Hình 3.18: Biểu đồ tuần tự Xử lý tranh chấp đặt hàng đồng thời (Race Condition)", "57", 0),
    ("Hình 3.19: Biểu đồ tuần tự Sinh mã thanh toán VietQR động và Xác nhận Webhook tự động", "59", 0),
    ("Hình 3.20: Biểu đồ tuần tự Điểm danh chấm công nhân viên và Xác thực vị trí hợp lệ", "61", 0),
    ("Hình 3.21: Biểu đồ tuần tự Quản lý tồn kho món ăn và Cập nhật trạng thái tự động", "63", 0),
    ("Hình 3.22: Biểu đồ tuần tự Gửi đánh giá món ăn và Tính toán điểm trung bình", "65", 0),
    ("Hình 3.23: Biểu đồ tuần tự Tổng hợp báo cáo doanh thu và Thống kê KPI kinh doanh", "67", 0),
    ("Hình 3.24: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)", "69", 0),
    ("Hình 3.25: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD", "71", 0),
    ("Hình 3.26: Cấu trúc các Document Collection trong cơ sở dữ liệu MongoDB", "73", 0),
    ("Hình 3.27: Biểu đồ thành phần kiến trúc hệ thống (Component Diagram)", "75", 0),
    ("Hình 3.28: Biểu đồ triển khai hệ thống (Deployment Diagram)", "77", 0),
    ("Hình 4.1: Giao diện Trang chủ FoodVD & Banner khuyến mại", "79", 0),
    ("Hình 4.2: Giao diện Thực đơn, tìm kiếm & bộ lọc đa tiêu chí", "80", 0),
    ("Hình 4.3: Giao diện Trải nghiệm xoay & xem mô hình món ăn 3D tương tác", "81", 0),
    ("Hình 4.4: Giao diện Nhập thông tin nhận hàng & Tóm tắt đơn hàng", "82", 0),
    ("Hình 4.5: Giao diện Giỏ hàng & Thanh toán tự động mã VietQR động", "83", 0),
    ("Hình 4.6: Giao diện Lịch sử & Theo dõi trạng thái đơn hàng thời gian thực", "84", 0),
    ("Hình 4.7: Giao diện Cổng nhân viên: Vận hành thực đơn & Bật/tắt trạng thái món ăn", "85", 0),
    ("Hình 4.8: Giao diện Cổng nhân viên: Tiếp nhận đơn hàng & Điều phối tiến trình giao", "86", 0),
    ("Hình 4.9: Giao diện Cổng nhân viên: Điểm danh vào ca & Theo dõi lịch sử chấm công", "87", 0),
    ("Hình 4.10: Giao diện Quản trị viên: Quản lý danh mục món ăn và Tồn kho", "88", 0),
    ("Hình 4.11: Giao diện Quản trị viên: Báo cáo thống kê doanh thu và Biểu đồ KPI", "89", 0),
    ("Hình 4.12: Giao diện Quản trị viên: Quản lý bảng lương và đồng bộ dữ liệu chấm công", "90", 0),
    ("Hình 4.13: Giao diện Quản trị viên: Quản lý mã giảm giá Voucher", "91", 0)
]
toc_table(fig_entries)
doc.add_page_break()

# ==========================================
# DANH MỤC BẢNG BIỂU
# ==========================================
h("DANH MỤC BẢNG BIỂU", level=1)
tbl_entries = [
    ("Bảng 1.1: So sánh đối sánh giữa FoodVD và các hệ thống đặt đồ ăn thông thường", "4", 0),
    ("Bảng 3.1: Ma trận phân tích trách nhiệm nghiệp vụ theo từng vai trò (RACI)", "21", 0),
    ("Bảng 3.2: Đặc tả chi tiết Use Case UC01: Xem menu và Trải nghiệm mô hình 3D WebGL", "24", 0),
    ("Bảng 3.3: Đặc tả chi tiết Use Case UC02: Quản lý giỏ hàng và Đặt hàng trực tuyến", "26", 0),
    ("Bảng 3.4: Đặc tả chi tiết Use Case UC03: Thanh toán tự động qua mã VietQR động", "28", 0),
    ("Bảng 3.5: Đặc tả chi tiết Use Case UC04: Tra cứu lịch sử và Theo dõi tiến trình đơn hàng", "30", 0),
    ("Bảng 3.6: Đặc tả chi tiết Use Case UC05: Đánh giá món ăn và Phản hồi chất lượng dịch vụ", "32", 0),
    ("Bảng 3.7: Đặc tả chi tiết Use Case UC06: Đăng ký, Đăng nhập và Quản lý hồ sơ cá nhân", "34", 0),
    ("Bảng 3.8: Đặc tả chi tiết Use Case UC07: Quản lý danh mục món ăn và Kiểm soát kho hàng", "36", 0),
    ("Bảng 3.9: Đặc tả chi tiết Use Case UC08: Quản lý đơn hàng và Điều phối vận hành bếp", "38", 0),
    ("Bảng 3.10: Đặc tả chi tiết Use Case UC09: Báo cáo phân tích doanh thu và Thống kê kinh doanh", "40", 0),
    ("Bảng 3.11: Đặc tả chi tiết Use Case UC10: Quản lý chương trình khuyến mãi và Mã giảm giá", "42", 0),
    ("Bảng 3.12: Đặc tả chi tiết Use Case UC11: Điểm danh và Chấm công theo ca làm việc", "44", 0),
    ("Bảng 3.13: Đặc tả chi tiết Use Case UC12: Duyệt bảng chấm công và Tính lương nhân viên tự động", "46", 0),
    ("Bảng 3.14: Chi tiết cấu trúc các Document Collection trong cơ sở dữ liệu MongoDB", "72", 0),
    ("Bảng 4.1: Thông số cấu hình môi trường thử nghiệm phần cứng và phần mềm", "78", 0),
    ("Bảng 4.2: Bảng tổng kết kết quả kiểm thử các kịch bản nghiệp vụ trọng yếu (Test Cases)", "89", 0)
]
toc_table(tbl_entries)
doc.add_page_break()

# ==========================================
# CHƯƠNG 1: TỔNG QUAN
# ==========================================
h("CHƯƠNG 1: TỔNG QUAN VỀ HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ F&B VÀ BÀI TOÁN FOODVD", level=1)
h("1.1 Bối cảnh thị trường F&B và thương mại điện tử giao đồ ăn", level=2)
p("Thương mại điện tử trong lĩnh vực ẩm thực (Food & Beverage - F&B) tại Việt Nam và trên thế giới đang chứng kiến tốc độ tăng trưởng bùng nổ, đặc biệt là sau giai đoạn chuyển đổi số toàn diện. Thói quen tiêu dùng của khách hàng đã chuyển dịch mạnh mẽ từ việc đến trực tiếp nhà hàng sang việc tìm kiếm món ăn, đặt hàng trực tuyến qua website hoặc ứng dụng di động để được giao tận nơi.")
p("Sự phát triển nhanh chóng này đặt ra yêu cầu khắt khe đối với các doanh nghiệp F&B: làm thế nào để số hóa toàn diện quy trình bán hàng, mang lại trải nghiệm tương tác chân thực nhất cho khách hàng, đồng thời tối ưu hóa chi phí vận hành nội bộ từ khâu chế biến, kiểm soát tồn kho đến quản lý nhân sự.")

h("1.2 Vai trò của trải nghiệm tương tác 3D và minh bạch vận hành", level=2)
p("Một trong những rào cản tâm lý lớn nhất của khách hàng khi đặt đồ ăn trực tuyến là sự hoài nghi về chất lượng thực tế so với hình ảnh quảng cáo (vấn đề 'hình ảnh chỉ mang tính chất minh họa'). Việc ứng dụng công nghệ đồ họa 3D tương tác WebGL trực tiếp trên trình duyệt cho phép thực khách xoay 360 độ, phóng to, quan sát chi tiết từng thành phần món ăn trước khi quyết định gọi món.")
p("Bên cạnh đó, tính minh bạch trong vận hành thể hiện ở khả năng theo dõi tiến trình đơn hàng thời gian thực: khách hàng biết chính xác khi nào món ăn được bếp tiếp nhận, khi nào hoàn thành chế biến và khi nào shipper đang trên đường giao.")

h("1.3 Thực trạng và hạn chế của các hệ thống đặt đồ ăn hiện nay", level=2)
p("Qua khảo sát thực tế các website và ứng dụng bán đồ ăn phổ biến hiện nay, tác giả nhận thấy tồn tại các hạn chế nổi cộm:")
bullets([
    "Trải nghiệm trực quan nghèo nàn: Đa số website chỉ sử dụng hình ảnh 2D tĩnh, chất lượng không đồng đều, thiếu góc nhìn trực quan chân thực.",
    "Lỗi tranh chấp tồn kho (Race Condition): Khi có chương trình flash-sale hoặc vào giờ cao điểm, nhiều khách hàng cùng đặt món cuối cùng dẫn tới hiện tượng bán vượt số lượng tồn thực tế (overselling), gây bức xúc cho khách hàng.",
    "Thanh toán thủ công, đối soát chậm chạp: Phương thức chuyển khoản ngân hàng thường yêu cầu khách chụp biên lai gửi nhân viên đối soát bằng mắt, dễ bị làm giả hoặc chậm trễ tiếp nhận đơn.",
    "Rời rạc giữa bán hàng và quản trị nội bộ: Hầu hết phần mềm chỉ tập trung vào khâu bán món mà bỏ qua khâu quản trị nhân sự nội bộ (chấm công ca làm, tính lương nhân viên tự động)."
])

# Bảng 1.1
tbl(["Tiêu chí đối sánh", "Website F&B thông thường", "Hệ sinh thái FoodVD đề xuất"], [
    ["Hiển thị sản phẩm", "Ảnh chụp 2D tĩnh, dễ gây tranh cãi", "Tương tác mô hình 3D WebGL 360 độ chân thực"],
    ["Kiểm soát tồn kho", "Kiểm tra bất đồng bộ, dễ bị overselling", "Atomic Stock Decrement (Khóa nguyên tử DB)"],
    ["Thanh toán chuyển khoản", "Khách tự gõ STK, đối soát thủ công", "VietQR động, tự động xác nhận qua Webhook IPN"],
    ["Theo dõi đơn hàng", "Chỉ hiển thị trạng thái chung chung", "Timeline trực quan: Chờ thanh toán -> Nấu -> Giao"],
    ["Quản lý nội bộ", "Tách rời, phải mua thêm phần mềm ngoài", "Tích hợp sẵn chấm công GPS/Wi-Fi và bảng lương"]
], [1.8, 2.3, 2.3], caption="Bảng 1.1: So sánh đối sánh giữa FoodVD và các hệ thống đặt đồ ăn thông thường")

h("1.4 Các vấn đề kỹ thuật tồn tại trong hệ thống F&B", level=2)
p("Dưới góc độ kỹ thuật phần mềm, các bài toán nan giải cần giải quyết triệt để bao gồm:")
bullets([
    "Bài toán xung đột dữ liệu đồng thời (Concurrency Control): Khi 2 khách hàng A và B cùng bấm thanh toán 1 suất ăn cuối cùng ở cùng 1 mili-giây.",
    "Bài toán tích hợp thanh toán tài chính an toàn: Tự động hóa việc sinh mã QR chuẩn VietQR và xử lý bảo mật mã hóa HMAC-SHA256 với Webhook.",
    "Bài toán hiệu năng WebGL trên thiết bị di động: Tối ưu hóa dung lượng mô hình 3D (dưới 5MB, định dạng GLB nén) để kết xuất mượt mà ở 60 FPS.",
    "Bài toán chấm công gian lận: Ngăn ngừa tình trạng nhân viên điểm danh hộ bằng thuật toán kiểm tra tọa độ GPS Haversine và xác thực BSSID mạng Wi-Fi cửa hàng."
])

h("1.5 Lý do chọn đề tài", level=2)
p("Xuất phát từ nhu cầu thực tiễn của các nhà hàng, chuỗi quán ăn hiện đại và mong muốn ứng dụng các công nghệ web tiên tiến nhất, tác giả đã chọn đề tài: 'Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ'. Đề tài mang tính ứng dụng thực tiễn cao, giải quyết trọn vẹn cả bài toán thương mại điện tử cho khách hàng và bài toán vận hành tinh gọn cho chủ doanh nghiệp.")

h("1.6 Mục tiêu của đề tài", level=2)
p("Mục tiêu tổng quát của đồ án gồm:")
bullets([
    "Xây dựng thành công nền tảng web bán đồ ăn trực tuyến hiện đại với giao diện mượt mà trên cả máy tính và điện thoại thông minh.",
    "Tích hợp công nghệ hiển thị và xoay tương tác 3D WebGL với độ mượt mà cao.",
    "Hiện thực hóa cơ chế thanh toán tự động VietQR động và trừ kho nguyên tử (Atomic Update) bảo đảm toàn vẹn dữ liệu 100%.",
    "Xây dựng phân hệ quản trị vận hành toàn diện: quản lý món, kho hàng, điều phối bếp, chấm công nhân viên và tính bảng lương tự động."
])

h("1.7 Phạm vi của đề tài", level=2)
p("Về nghiệp vụ: Tập trung vào chu trình hoàn chỉnh của một thương hiệu F&B hiện đại (Khách hàng đặt món - Thanh toán - Bếp nấu - Giao hàng - Đánh giá; Quản trị viên quản lý kho, doanh thu, voucher; Nhân viên chấm công ca làm).")
p("Về công nghệ: Ứng dụng React 19, TypeScript, Vite, Tailwind CSS, Google Model-Viewer ở Frontend; Node.js, Express.js, MongoDB và Mongoose ở Backend.")

h("1.8 Đối tượng sử dụng hệ thống", level=2)
p("Hệ thống phục vụ 3 nhóm đối tượng chính:")
bullets([
    "Khách hàng (Customer): Thực khách trực tuyến duyệt thực đơn, trải nghiệm 3D, đặt hàng, thanh toán VietQR và theo dõi tiến trình đơn hàng.",
    "Quản trị viên (Admin / Chủ nhà hàng): Quản lý menu, kiểm soát tồn kho, theo dõi doanh thu KPI, duyệt chấm công và bảng lương nhân viên.",
    "Nhân viên (Staff / Đầu bếp / Shipper): Điểm danh ca làm việc, tiếp nhận phiếu order món, chuyển trạng thái chế biến và giao hàng."
])

h("1.9 Ý nghĩa khoa học và thực tiễn của đề tài", level=2)
p("Ý nghĩa thực tiễn: Giúp các cửa hàng ẩm thực tăng tỷ lệ chuyển đổi đơn hàng nhờ trải nghiệm 3D độc đáo, tiết kiệm hàng chục giờ đối soát thanh toán và tính toán bảng lương mỗi tháng.")
p("Ý nghĩa khoa học: Là công trình minh chứng cho việc kết hợp hoàn hảo giữa công nghệ đồ họa WebGL trên nền tảng web truyền thống và kỹ thuật xử lý tranh chấp giao dịch nguyên tử trong cơ sở dữ liệu phân tán NoSQL.")

h("1.10 Bố cục của đồ án", level=2)
p("Nội dung báo cáo đồ án được cấu trúc thành 4 chương chính:")
bullets([
    "Chương 1: Tổng quan về hệ thống thương mại điện tử F&B và bài toán FoodVD.",
    "Chương 2: Cơ sở lý thuyết và công nghệ ứng dụng.",
    "Chương 3: Phân tích và thiết kế hệ thống (Đầy đủ hệ thống biểu đồ UML đen trắng chuyên nghiệp và 12 bảng đặc tả Use Case chi tiết).",
    "Chương 4: Cài đặt, triển khai và thực nghiệm chương trình (Hình ảnh giao diện chi tiết các phân hệ và kết quả kiểm thử).",
    "Kết luận và Hướng phát triển: Tổng kết kết quả đạt được và định hướng mở rộng hệ thống."
])
doc.add_page_break()

# ==========================================
# CHƯƠNG 2: CƠ SỞ LÝ THUYẾT
# ==========================================
h("CHƯƠNG 2: CƠ SỞ LÝ THUYẾT VÀ CÔNG NGHỆ ỨNG DỤNG", level=1)
h("2.1 Tổng quan về kiến trúc hệ thống Client - Server", level=2)
p("Hệ thống FoodVD được xây dựng theo mô hình phân tầng Client - Server kinh điển nhưng được hiện đại hóa với sự phân tách hoàn toàn giữa tầng hiển thị giao diện (Frontend Single Page Application) và tầng dịch vụ cung cấp dữ liệu nghiệp vụ (Backend RESTful API). Cách tiếp cận này giúp mã nguồn hai phía hoàn toàn độc lập, dễ dàng nâng cấp, mở rộng hoặc tích hợp thêm ứng dụng di động trong tương lai.")

h("2.2 Ngôn ngữ lập trình TypeScript và JavaScript hiện đại", level=2)
p("TypeScript là ngôn ngữ được phát triển bởi Microsoft, bổ sung hệ thống kiểu tĩnh (static typing) mạnh mẽ cho JavaScript. Việc áp dụng TypeScript trong dự án FoodVD mang lại những lợi ích vượt trội:")
bullets([
    "Phát hiện sớm lỗi gõ sai kiểu dữ liệu ngay trong quá trình biên dịch (Compile-time checking), giảm thiểu tối đa các lỗi tiềm ẩn Runtime Error.",
    "Tự động gợi ý mã (IntelliSense) chính xác cho các Interface cấu trúc dữ liệu: User, Product, Order, Attendance, Payroll.",
    "Tăng cường khả năng tái cấu trúc mã nguồn (Refactoring) và độ tin cậy khi dự án mở rộng quy mô."
])

h("2.3 Thư viện React 19 và kiến trúc Single Page Application (SPA)", level=2)
p("React 19 là thư viện JavaScript hàng đầu hiện nay cho việc xây dựng giao diện người dùng theo cơ chế hướng thành phần (Component-Based Architecture). Nhờ công nghệ Virtual DOM tối ưu hóa, các trang web xây dựng bằng React phản hồi tức thì với thao tác của khách hàng mà không cần phải tải lại toàn bộ trang (Full Page Reload), mang lại trải nghiệm mượt mà tương đương với phần mềm cài đặt trên máy tính.")

h("2.4 Công cụ xây dựng dự án Vite Build Tool", level=2)
p("Vite là công cụ đóng gói và phát triển frontend thế hệ mới, tận dụng sức mạnh của Native ES Modules trong trình duyệt và bộ biên dịch Esbuild viết bằng Go. Tốc độ khởi động máy chủ thử nghiệm (Cold Start) của Vite chỉ tính bằng mili-giây và tính năng Hot Module Replacement (HMR) cập nhật thay đổi giao diện ngay lập tức khi lưu tệp tin mã nguồn.")

h("2.5 Nền tảng thực thi Node.js và Framework Express.js", level=2)
p("Node.js cung cấp môi trường thực thi JavaScript phía máy chủ dựa trên V8 Engine của Google Chrome. Với cơ chế xử lý bất đồng bộ không chặn (Non-blocking I/O) và kiến trúc Event-Driven, Node.js cực kỳ phù hợp cho các ứng dụng web thương mại điện tử cần xử lý hàng ngàn kết nối đồng thời với lượng tài nguyên CPU và RAM tối thiểu. Express.js đóng vai trò là khung ứng dụng web nhẹ và linh hoạt, cung cấp hệ thống định tuyến (Routing) mạnh mẽ và cơ chế Middleware xử lý xác thực, mã hóa và ghi log.")

h("2.6 Cơ sở dữ liệu NoSQL MongoDB và Mongoose ODM", level=2)
p("MongoDB là hệ quản trị cơ sở dữ liệu hướng tài liệu (Document-oriented NoSQL Database) phổ biến nhất hiện nay. Thay vì các bảng với cột cố định như CSDL quan hệ truyền thống, MongoDB lưu trữ dữ liệu dưới định dạng JSON-like (BSON), cho phép cấu trúc dữ liệu linh hoạt, dễ dàng mở rộng các trường thông tin món ăn (như mảng topping, danh sách ảnh, thông số dinh dưỡng). Mongoose đóng vai trò là Object Document Mapper (ODM) giúp định nghĩa Schema chặt chẽ, tự động kiểm tra tính hợp lệ của dữ liệu trước khi lưu vào CSDL.")

h("2.7 Kiến trúc RESTful API và giao thức trao đổi dữ liệu JSON", level=2)
p("Toàn bộ các giao tiếp giữa React Client và Node.js Backend được thực hiện thông qua chuẩn RESTful API qua giao thức HTTPS. Các phương thức HTTP tiêu chuẩn (GET, POST, PUT, DELETE) được ánh xạ tương ứng với các thao tác nghiệp vụ, sử dụng mã trạng thái HTTP chuẩn (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 409 Conflict) để phản hồi minh bạch cho máy khách.")

h("2.8 Công nghệ hiển thị mô hình 3D tương tác WebGL với Google Model-Viewer", level=2)
p("WebGL (Web Graphics Library) là chuẩn công nghệ đồ họa đa nền tảng cho phép hiển thị các mô hình 3D phức tạp trực tiếp trên trình duyệt mà không cần cài đặt thêm bất kỳ plugin nào. Dự án sử dụng thư viện chuẩn của Google `<model-viewer>`, cho phép render các tệp 3D định dạng GLB với ánh sáng môi trường chân thực (PBR Materials), hỗ trợ khách hàng dùng chuột hoặc ngón tay để xoay, lật, phóng to và thu nhỏ món ăn mượt mà.")

h("2.9 Cơ chế bảo mật, mã hóa dữ liệu nhạy cảm AES-256 và Masking", level=2)
p("Hệ thống bảo vệ dữ liệu người dùng ở mức cao nhất: Mật khẩu được băm một chiều bằng thuật toán Bcrypt với Salt Rounds = 10; Các thông tin nhạy cảm (như số điện thoại, địa chỉ nhà) được mã hóa bằng thuật toán đối xứng tiêu chuẩn quân sự AES-256-CBC; Cơ chế che giấu dữ liệu (Data Masking) chỉ hiển thị một phần thông tin trên giao diện (ví dụ: 098****123) để chống rò rỉ dữ liệu khi chụp màn hình.")

h("2.10 Công cụ quản lý phiên bản Git, GitHub và công cụ quản trị MongoDB Compass", level=2)
p("Dự án được quản lý phiên bản nghiêm ngặt bằng Git và lưu trữ mã nguồn trên GitHub theo mô hình phân nhánh Feature Branch. Cơ sở dữ liệu được theo dõi và quản trị trực quan thông qua công cụ chuyên dụng MongoDB Compass, hỗ trợ kiểm tra tốc độ thực thi của các câu truy vấn và đánh chỉ mục B-Tree Index tối ưu hóa hiệu năng.")
doc.add_page_break()

# ==========================================
# CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG
# ==========================================
h("CHƯƠNG 3: PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG", level=1)
h("3.1 Khảo sát hiện trạng và mô tả đề tài", level=2)
p("Để thiết kế một hệ thống thương mại điện tử ẩm thực toàn diện, tác giả đã tiến hành khảo sát quy trình vận hành thực tế tại các nhà hàng và chuỗi quán ăn ăn nhanh. Kết quả cho thấy quy trình hiện tại gặp phải nhiều 'nút thắt cổ chai': khâu đối soát chuyển khoản ngân hàng thủ công gây chậm trễ từ 5 đến 15 phút cho mỗi đơn hàng; khâu chấm công ghi chép sổ sách hoặc vân tay dễ xảy ra sai sót khi tính bảng lương cuối tháng.")
p("Đề tài FoodVD giải quyết triệt để các tồn tại trên bằng cách xây dựng một kiến trúc hợp nhất: tích hợp thanh toán tự động VietQR, áp dụng cơ chế khóa nguyên tử loại trừ xung đột kho, hỗ trợ trải nghiệm thực đơn 3D và tự động hóa toàn bộ quy trình chấm công - tính lương nội bộ.")

h("3.2 Phân tích nghiệp vụ hệ thống theo từng vai trò (Ma trận RACI)", level=2)
p("Hệ thống phân định rạch ròi trách nhiệm của 3 nhóm tác nhân thông qua ma trận phân bổ trách nhiệm nghiệp vụ RACI:")
bullets([
    "R (Responsible - Người trực tiếp thực hiện): Người trực tiếp thao tác để hoàn thành nhiệm vụ.",
    "A (Accountable - Người chịu trách nhiệm phê duyệt): Người có thẩm quyền phê duyệt cuối cùng.",
    "C (Consulted - Người được tham vấn): Đối tượng cung cấp dữ liệu đầu vào hoặc tư vấn.",
    "I (Informed - Người được thông báo): Đối tượng nhận thông báo cập nhật kết quả."
])

# Bảng 3.1
tbl(["Quy trình nghiệp vụ hệ thống", "Khách hàng", "Quản trị viên (Admin)", "Nhân viên (Staff)"], [
    ["1. Duyệt thực đơn & Trải nghiệm mô hình 3D", "R (Thực hiện)", "A (Quản lý nội dung)", "I (Xem thông tin)"],
    ["2. Đặt hàng & Trừ kho nguyên tử (Atomic)", "R (Gửi đơn)", "A (Theo dõi tổng thể)", "I (Nhận thông báo)"],
    ["3. Quét mã thanh toán VietQR động", "R (Chuyển khoản)", "I (Nhận báo cáo tiền)", "I (Hệ thống tự động)"],
    ["4. Tiếp nhận order & Chế biến món tại bếp", "I (Xem trạng thái)", "A (Giám sát tiến độ)", "R (Chế biến món)"],
    ["5. Giao hàng & Cập nhật trạng thái hoàn tất", "I (Nhận đồ ăn)", "I (Thống kê đơn)", "R (Giao đồ ăn)"],
    ["6. Gửi đánh giá món ăn & Chấm sao", "R (Đánh giá)", "A (Kiểm duyệt review)", "I (Xem phản hồi)"],
    ["7. Quản lý danh mục món ăn & Tồn kho", "I (Xem kết quả)", "R / A (Thêm/Sửa/Khóa)", "I (Báo cáo hết hàng)"],
    ["8. Quản lý mã giảm giá Voucher", "I (Áp dụng mã)", "R / A (Cấu hình mã)", "I (Không tham gia)"],
    ["9. Điểm danh & Chấm công GPS/Wi-Fi", "Không tham gia", "A (Giám sát đi trễ)", "R (Bấm Check-in)"],
    ["10. Duyệt bảng công & Tính bảng lương", "Không tham gia", "R / A (Duyệt & Chi lương)", "I (Xem phiếu lương)"]
], [2.2, 1.4, 1.4, 1.4], caption="Bảng 3.1: Ma trận phân tích trách nhiệm nghiệp vụ theo từng vai trò (RACI)")

h("3.3 Xây dựng biểu đồ Use Case", level=2)
h("3.3.1 Biểu đồ Use Case tổng quát", level=3)
p("Biểu đồ Use Case tổng quát của hệ thống FoodVD thể hiện mối tương tác toàn diện giữa 3 tác nhân chính (Khách hàng, Quản trị viên, Nhân viên) với các khối chức năng nghiệp vụ trọng yếu nằm trong biên giới hệ thống (System Boundary).")
fig("Hinh_3_1_UseCase_TongQuat.png", "Hình 3.1: Biểu đồ Use Case tổng quát của hệ thống FoodVD", width_in=6.2)
p("Như được minh họa trên Hình 3.1, hệ thống được cấu trúc thành các nhóm chức năng mạch lạc: nhóm chức năng hướng người dùng cuối (Khách hàng), nhóm chức năng vận hành bếp và điểm danh (Nhân viên), và nhóm chức năng quản trị chiến lược (Quản trị viên).")

# UC01
h("3.3.2 Use Case UC01: Xem menu và Trải nghiệm mô hình 3D WebGL", level=3)
p("Chức năng cho phép khách hàng duyệt danh mục các món ăn, tìm kiếm món theo từ khóa, lọc theo nhóm ẩm thực và đặc biệt là tương tác xoay 360 độ với mô hình 3D của món ăn trực tiếp trên nền web.")
fig("Hinh_3_2_UseCase_XemMenu_3D.png", "Hình 3.2: Biểu đồ Use Case chức năng Xem menu & Trải nghiệm mô hình 3D WebGL", width_in=5.8)
add_usecase_spec(
    "UC01", "Xem menu & Trải nghiệm mô hình 3D WebGL",
    "Khách hàng (Customer)",
    "Cho phép thực khách duyệt menu, tìm kiếm món ăn, lọc theo thể loại và mở trình xem 3D xoay 360 độ tương tác.",
    "Khách hàng truy cập vào hệ thống FoodVD trên trình duyệt web có hỗ trợ WebGL.",
    "1. Khách hàng truy cập trang Thực đơn.\n2. Hệ thống tải danh sách món ăn từ MongoDB và kết xuất ra màn hình.\n3. Khách hàng bấm chọn một món ăn bất kỳ để xem chi tiết.\n4. Hệ thống tải tệp mô hình 3D (.glb) và hiển thị trình điều khiển xoay, phóng to thu nhỏ.\n5. Khách hàng tương tác xoay món ăn và quyết định bấm 'Thêm vào giỏ hàng'.",
    "A1: Thiết bị không hỗ trợ WebGL hoặc kết nối mạng yếu không tải được file 3D. Hệ thống tự động chuyển sang chế độ hiển thị ảnh 2D dự phòng chất lượng cao.",
    "Khách hàng nắm rõ chi tiết món ăn và sẵn sàng chuyển sang bước đặt hàng.",
    "3.2"
)

# UC02
h("3.3.3 Use Case UC02: Quản lý giỏ hàng và Đặt hàng trực tuyến", level=3)
p("Chức năng cho phép khách hàng quản lý các món đã chọn trong giỏ, điều chỉnh số lượng, nhập địa chỉ nhận hàng và tiến hành tạo đơn hàng với cơ chế khóa tồn kho nguyên tử.")
fig("Hinh_3_3_UseCase_DatHang_Kho.png", "Hình 3.3: Biểu đồ Use Case chức năng Quản lý giỏ hàng & Đặt hàng trực tuyến", width_in=5.8)
add_usecase_spec(
    "UC02", "Quản lý giỏ hàng & Đặt hàng trực tuyến",
    "Khách hàng (Customer)",
    "Quản lý danh sách món ăn trong giỏ, tăng giảm số lượng, nhập thông tin giao hàng và gửi yêu cầu đặt hàng an toàn.",
    "Khách hàng đã thêm ít nhất một món ăn vào giỏ hàng và giỏ hàng có số lượng > 0.",
    "1. Khách hàng mở trang Giỏ hàng để kiểm tra danh sách món.\n2. Khách điều chỉnh số lượng hoặc nhập mã Voucher khuyến mãi.\n3. Khách hàng nhập họ tên, số điện thoại và địa chỉ giao hàng.\n4. Bấm 'Tiến hành đặt hàng'.\n5. Hệ thống gọi Atomic Decrement để kiểm tra và trừ kho ngay lập tức.\n6. Hệ thống tạo bản ghi Order với trạng thái 'Pending' và chuyển sang trang thanh toán.",
    "A1: Một trong các món trong giỏ bị hết hàng trong lúc khách đang chọn. Hệ thống lập tức thông báo món hết hàng và mời khách chọn món khác.",
    "Đơn hàng được lưu vào cơ sở dữ liệu và tồn kho được trừ an toàn, không bị âm.",
    "3.3"
)

# UC03
h("3.3.4 Use Case UC03: Thanh toán tự động qua mã VietQR động", level=3)
p("Chức năng sinh mã QR thanh toán ngân hàng chứa sẵn số tiền và nội dung chuyển khoản duy nhất, đồng thời lắng nghe Webhook ngân hàng để tự động xác nhận đơn hàng thành công.")
fig("Hinh_3_4_UseCase_ThanhToan_VietQR.png", "Hình 3.4: Biểu đồ Use Case chức năng Thanh toán tự động qua mã VietQR động", width_in=5.8)
add_usecase_spec(
    "UC03", "Thanh toán tự động qua mã VietQR động",
    "Khách hàng, Cổng thanh toán VietQR / Ngân hàng",
    "Hệ thống sinh mã QR ngân hàng chuẩn NAPAS247 kèm số tiền chính xác và mã đơn hàng, tự động xác nhận khi có tiền về tài khoản.",
    "Đơn hàng đã được tạo ở trạng thái 'Pending'.",
    "1. Hệ thống sinh mã VietQR động chứa số tiền cần thanh toán và mã đơn hàng (VD: FOODVD123).\n2. Khách hàng mở ứng dụng Mobile Banking quét mã QR và xác nhận chuyển tiền.\n3. Ngân hàng chuyển tiền thành công và bắn Webhook IPN về máy chủ FoodVD.\n4. Hệ thống kiểm tra chữ ký HMAC, cập nhật trạng thái đơn thành 'Paid'.\n5. Giao diện người dùng tự động chuyển sang thông báo thanh toán thành công.",
    "A1: Khách hàng chuyển khoản sai số tiền hoặc sai cú pháp nội dung. Hệ thống chuyển đơn sang trạng thái 'Cần đối soát thủ công' và thông báo cho Quản trị viên.",
    "Đơn hàng được đánh dấu đã thanh toán và chuyển thông tin xuống bộ phận bếp chuẩn bị món.",
    "3.4"
)

# UC04
h("3.3.5 Use Case UC04: Tra cứu lịch sử và Theo dõi tiến trình đơn hàng", level=3)
p("Chức năng cho phép thực khách theo dõi sát sao tình trạng xử lý của món ăn theo thời gian thực: Bếp đang chuẩn bị, Món đã nấu xong, Shipper đang giao.")
fig("Hinh_3_5_UseCase_TheoDoiDonHang.png", "Hình 3.5: Biểu đồ Use Case chức năng Tra cứu lịch sử & Theo dõi tiến trình đơn hàng", width_in=5.8)
add_usecase_spec(
    "UC04", "Tra cứu lịch sử & Theo dõi tiến trình đơn hàng",
    "Khách hàng (Customer)",
    "Theo dõi tiến độ chế biến và vận chuyển của đơn hàng theo dạng Timeline trực quan.",
    "Khách hàng có mã đơn hàng hoặc đã đăng nhập tài khoản mua hàng.",
    "1. Khách hàng truy cập trang 'Đơn hàng của tôi'.\n2. Hệ thống tải danh sách các đơn hàng đã đặt kèm trạng thái hiện tại.\n3. Khách bấm xem chi tiết đơn hàng đang diễn ra.\n4. Hệ thống hiển thị thanh tiến trình trực quan: Chờ thanh toán -> Bếp nhận đơn -> Đang nấu -> Đang giao -> Đã hoàn thành.",
    "A1: Không tìm thấy mã đơn hàng. Hệ thống thông báo mã đơn không hợp lệ.",
    "Khách hàng nắm bắt được chính xác thời gian nhận đồ ăn, tăng sự an tâm và tin tưởng.",
    "3.5"
)

# UC05
h("3.3.6 Use Case UC05: Đánh giá món ăn và Phản hồi chất lượng dịch vụ", level=3)
p("Sau khi nhận được đồ ăn, khách hàng có thể chấm điểm số sao (1 đến 5 sao), viết cảm nhận chi tiết và tải ảnh chụp thực tế để đóng góp ý kiến nâng cao chất lượng quán.")
fig("Hinh_3_6_UseCase_DanhGia_Rating.png", "Hình 3.6: Biểu đồ Use Case chức năng Đánh giá món ăn & Phản hồi chất lượng dịch vụ", width_in=5.8)
add_usecase_spec(
    "UC05", "Đánh giá món ăn & Phản hồi chất lượng dịch vụ",
    "Khách hàng (Customer)",
    "Gửi phản hồi, chấm điểm số sao và đính kèm hình ảnh thực tế cho các món ăn trong đơn hàng đã hoàn tất.",
    "Đơn hàng phải ở trạng thái 'Delivered' (Đã giao hàng thành công) và chưa từng được đánh giá trước đó.",
    "1. Khách hàng vào mục Đơn hàng hoàn tất và bấm nút 'Đánh giá món ăn'.\n2. Chọn số sao từ 1 đến 5 cho từng món.\n3. Nhập lời nhận xét và chọn tệp ảnh thực tế tải lên.\n4. Bấm 'Gửi đánh giá'.\n5. Hệ thống lưu bản ghi đánh giá vào CSDL và tự động tính toán lại số sao trung bình của món ăn.",
    "A1: Đơn hàng chưa giao xong hoặc đã đánh giá rồi. Hệ thống khóa chức năng đánh giá để chống spam.",
    "Đánh giá mới xuất hiện trên trang chi tiết sản phẩm và điểm trung bình món ăn được cập nhật tự động.",
    "3.6"
)

# UC06
h("3.3.7 Use Case UC06: Đăng ký, Đăng nhập và Quản lý hồ sơ cá nhân", level=3)
p("Chức năng xác thực danh tính người dùng bằng chuẩn bảo mật JWT, hỗ trợ phân quyền vai trò (Role-Based Access Control) cho Khách hàng, Nhân viên và Quản trị viên.")
fig("Hinh_3_7_UseCase_DangNhap_HoSo.png", "Hình 3.7: Biểu đồ Use Case chức năng Đăng ký, Đăng nhập & Quản lý hồ sơ cá nhân", width_in=5.8)
add_usecase_spec(
    "UC06", "Đăng ký, Đăng nhập & Quản lý hồ sơ cá nhân",
    "Tất cả người dùng (Khách hàng, Nhân viên, Admin)",
    "Xác thực danh tính, phân quyền bảo mật truy cập hệ thống và cập nhật thông tin cá nhân an toàn.",
    "Người dùng có kết nối mạng internet và thông tin tài khoản hợp lệ.",
    "1. Người dùng nhập Email và Mật khẩu tại trang Đăng nhập.\n2. Hệ thống kiểm tra mật khẩu bằng thuật toán đối sánh Bcrypt.\n3. Nếu khớp, hệ thống cấp phát JSON Web Token (JWT) có chữ ký số bí mật.\n4. Trình duyệt lưu JWT và chuyển hướng người dùng đến giao diện tương ứng với quyền hạn (Customer, Staff, hoặc Admin).",
    "A1: Sai thông tin đăng nhập quá 5 lần. Hệ thống tạm khóa đăng nhập trong 5 phút để chống tấn công Brute-force.",
    "Phiên làm việc bảo mật được thiết lập thành công.",
    "3.7"
)

# UC07
h("3.3.8 Use Case UC07: Quản lý danh mục món ăn và Kiểm soát kho hàng (Admin)", level=3)
p("Phân hệ quản trị cho phép Admin thêm món ăn mới, gắn tệp mô hình 3D, cập nhật giá bán, số lượng tồn kho và thiết lập cảnh báo khi lượng nguyên liệu xuống thấp.")
fig("Hinh_3_8_UseCase_Admin_MonAn_Kho.png", "Hình 3.8: Biểu đồ Use Case chức năng Quản lý danh mục món ăn & Kiểm soát kho (Admin)", width_in=5.8)
add_usecase_spec(
    "UC07", "Quản lý món ăn & Kiểm soát kho hàng",
    "Quản trị viên (Admin)",
    "Toàn quyền quản trị danh mục thực đơn, số lượng tồn kho, giá tiền và tệp mô hình 3D của quán ăn.",
    "Người dùng đã đăng nhập với tài khoản có quyền Quản trị viên (role: 'admin').",
    "1. Admin truy cập mục 'Quản lý Sản phẩm & Tồn kho'.\n2. Bấm 'Thêm món ăn mới' hoặc chọn món hiện có để chỉnh sửa.\n3. Nhập tên, danh mục, giá tiền, số lượng tồn kho và tải lên tệp ảnh kèm tệp 3D (.glb).\n4. Bấm 'Lưu thông tin'.\n5. Hệ thống cập nhật bản ghi vào MongoDB và phát thông báo cập nhật tức thời.",
    "A1: Tệp 3D sai định dạng hoặc vượt quá kích thước cho phép (>10MB). Hệ thống từ chối và yêu cầu tải tệp .glb hợp lệ.",
    "Thông tin món ăn và số lượng tồn kho được cập nhật chính xác trên toàn hệ thống.",
    "3.8"
)

# UC08
h("3.3.9 Use Case UC08: Quản lý đơn hàng và Điều phối vận hành bếp (Admin/Staff)", level=3)
p("Chức năng cho phép bộ phận điều phối và nhân viên bếp tiếp nhận đơn hàng vừa đặt, chuyển trạng thái 'Đang chuẩn bị', 'Hoàn tất nấu' và điều phối nhân viên giao hàng.")
fig("Hinh_3_9_UseCase_QuanLyDon_Bep.png", "Hình 3.9: Biểu đồ Use Case chức năng Quản lý đơn hàng & Điều phối vận hành bếp", width_in=5.8)
add_usecase_spec(
    "UC08", "Quản lý đơn hàng & Điều phối vận hành bếp",
    "Quản trị viên (Admin), Nhân viên bếp / Điều phối (Staff)",
    "Theo dõi luồng đơn hàng trực tiếp, chuyển trạng thái chế biến và phân công vận chuyển.",
    "Tài khoản có quyền 'admin' hoặc 'staff' được giao nhiệm vụ vận hành.",
    "1. Nhân viên mở màn hình 'Điều phối đơn hàng'.\n2. Hệ thống hiển thị danh sách đơn hàng được sắp xếp theo thời gian đặt.\n3. Đơn mới chuyển sang màu vàng, nhân viên bếp bấm 'Bắt đầu nấu'.\n4. Khi nấu xong, bấm 'Hoàn thành' để chuyển sang bộ phận đóng gói và giao hàng.\n5. Shipper nhận đơn và bấm 'Đang giao'.",
    "A1: Khách hàng yêu cầu hủy đơn khi bếp chưa chế biến. Quản trị viên kiểm tra, bấm 'Hủy đơn' và hệ thống tự động hoàn lại số lượng tồn kho.",
    "Mọi giai đoạn chế biến và vận chuyển đều được ghi nhận thời gian chính xác, nâng cao năng suất phục vụ.",
    "3.9"
)

# UC09
h("3.3.10 Use Case UC09: Báo cáo phân tích doanh thu và Thống kê kinh doanh (Admin)", level=3)
p("Cung cấp các biểu đồ trực quan giúp chủ cửa hàng nắm bắt doanh thu theo ngày, tuần, tháng, phân tích top món ăn bán chạy nhất và tỷ lệ thanh toán online.")
fig("Hinh_3_10_UseCase_Admin_DoanhThu.png", "Hình 3.10: Biểu đồ Use Case chức năng Báo cáo phân tích doanh thu & Thống kê kinh doanh", width_in=5.8)
add_usecase_spec(
    "UC09", "Báo cáo phân tích doanh thu & Thống kê kinh doanh",
    "Quản trị viên (Admin)",
    "Tổng hợp số liệu tài chính, biểu diễn biểu đồ tăng trưởng doanh thu và phân tích các chỉ số KPI then chốt.",
    "Người dùng có quyền 'admin'.",
    "1. Admin chọn mục 'Báo cáo & Thống kê'.\n2. Chọn mốc thời gian cần xem (Hôm nay, 7 ngày qua, Tháng này, hoặc tùy chọn ngày).\n3. Hệ thống chạy MongoDB Aggregation Pipeline để tổng hợp dữ liệu doanh thu, số đơn, giá trị đơn trung bình (AOV).\n4. Render trực quan các biểu đồ cột, biểu đồ đường và bảng xếp hạng top 5 món bán chạy nhất.",
    "A1: Khoảng thời gian chọn không có dữ liệu giao dịch. Hệ thống hiển thị biểu đồ rỗng và thông báo 'Không có giao dịch'.",
    "Chủ cửa hàng có cơ sở dữ liệu xác thực để ra các quyết định nhập nguyên liệu và điều chỉnh chiến lược giá.",
    "3.10"
)

# UC10
h("3.3.11 Use Case UC10: Quản lý chương trình khuyến mãi và Mã giảm giá Voucher", level=3)
p("Cho phép tạo các chiến dịch khuyến mại linh hoạt: giảm theo phần trăm (%), giảm số tiền cố định, thiết lập đơn hàng tối thiểu và giới hạn số lượt dùng của mỗi khách.")
fig("Hinh_3_11_UseCase_Admin_Voucher.png", "Hình 3.11: Biểu đồ Use Case chức năng Quản lý chương trình khuyến mãi & Mã giảm giá Voucher", width_in=5.8)
add_usecase_spec(
    "UC10", "Quản lý chương trình khuyến mãi & Mã giảm giá",
    "Quản trị viên (Admin)",
    "Thiết lập mã khuyến mãi (Voucher Code), cấu hình điều kiện áp dụng, hạn dùng và theo dõi lượt sử dụng.",
    "Người dùng có quyền 'admin'.",
    "1. Admin truy cập trang 'Quản lý Mã giảm giá'.\n2. Bấm 'Tạo Voucher mới'.\n3. Nhập mã code (VD: FOODVD50K), tỷ lệ giảm hoặc số tiền giảm, đơn hàng tối thiểu và thời hạn áp dụng.\n4. Bấm 'Kích hoạt mã'.\n5. Hệ thống lưu Voucher vào CSDL và sẵn sàng cho khách hàng áp dụng tại trang giỏ hàng.",
    "A1: Mã code đã tồn tại trong hệ thống. Hệ thống báo lỗi trùng lặp và yêu cầu đặt mã khác.",
    "Mã giảm giá được phân phối hợp lệ tới khách hàng, kích cầu tiêu dùng hiệu quả.",
    "3.11"
)

# UC11
h("3.3.12 Use Case UC11: Điểm danh và Chấm công theo ca làm việc (Nhân viên)", level=3)
p("Nhân viên sử dụng điện thoại hoặc máy tính tại quán để bấm Vào ca / Tan ca. Hệ thống tự động kiểm tra định vị GPS và địa chỉ mạng Wi-Fi để chống gian lận điểm danh hộ.")
fig("Hinh_3_12_UseCase_NhanVien_ChamCong.png", "Hình 3.12: Biểu đồ Use Case chức năng Điểm danh & Chấm công theo ca làm việc", width_in=5.8)
add_usecase_spec(
    "UC11", "Điểm danh & Chấm công theo ca làm việc",
    "Nhân viên (Staff)",
    "Thực hiện chấm công trực tuyến khi bắt đầu và kết thúc ca làm, hệ thống tự động xác thực tọa độ vị trí.",
    "Tài khoản có quyền 'staff', thiết bị có bật định vị GPS hoặc kết nối mạng Wi-Fi của cửa hàng.",
    "1. Nhân viên đăng nhập vào hệ thống và chọn mục 'Chấm công ca làm'.\n2. Trình duyệt yêu cầu cấp quyền vị trí, nhân viên bấm 'Đồng ý'.\n3. Bấm nút 'Chấm công Vào ca' (Check-in).\n4. Hệ thống tính khoảng cách giữa tọa độ nhân viên và tọa độ quán (bán kính cho phép <= 50 mét).\n5. Nếu hợp lệ, hệ thống lưu thời gian InTime và xác nhận chấm công thành công.",
    "A1: Nhân viên bấm chấm công khi đang ở xa quán (> 50m). Hệ thống từ chối và báo lỗi 'Vị trí không hợp lệ'.",
    "Bản ghi chấm công được lưu chính xác, làm căn cứ tính bảng lương cuối tháng.",
    "3.12"
)

# UC12
h("3.3.13 Use Case UC12: Duyệt bảng chấm công và Tính lương nhân viên tự động", level=3)
p("Tự động hóa hoàn toàn việc tính lương dựa trên tổng số giờ công thực tế của từng nhân viên, mức lương theo giờ và các khoản phụ cấp thưởng/phạt.")
fig("Hinh_3_13_UseCase_Admin_Luong.png", "Hình 3.13: Biểu đồ Use Case chức năng Duyệt bảng chấm công & Tính lương nhân viên tự động", width_in=5.8)
add_usecase_spec(
    "UC12", "Duyệt bảng chấm công & Tính lương nhân viên",
    "Quản trị viên (Admin)",
    "Đồng bộ số liệu chấm công, phê duyệt công ca làm việc và tính toán bảng lương tự động cho toàn bộ nhân viên.",
    "Tài khoản có quyền 'admin', đã có dữ liệu chấm công trong kỳ tính lương.",
    "1. Admin mở mục 'Quản lý Chấm công & Bảng lương'.\n2. Chọn tháng/năm cần tổng kết lương.\n3. Bấm nút 'Đồng bộ & Tính lương tự động'.\n4. Hệ thống quét toàn bộ bản ghi Attendance, tính tổng số giờ công, nhân với HourlyRate và cộng tiền thưởng.\n5. Kết xuất bảng lương hoàn chỉnh và cho phép Admin xuất tệp bảng lương.",
    "A1: Có nhân viên quên bấm Tan ca (thiếu Check-out). Hệ thống đánh dấu cảnh báo để Admin chỉnh sửa thủ công trước khi chốt lương.",
    "Bảng lương được tính toán chuẩn xác trong 1 giây, tiết kiệm tối đa thời gian quản lý.",
    "3.13"
)

# 3.4 ACTIVITY DIAGRAMS
h("3.4 Biểu đồ hoạt động (Activity Diagram)", level=2)
h("3.4.1 Biểu đồ hoạt động tổng quát của hệ thống FoodVD", level=3)
p("Biểu đồ hoạt động tổng quát mô tả toàn bộ vòng đời tương tác của một phiên làm việc điển hình trong hệ thống FoodVD thông qua 4 làn bơi (Swimlanes): Khách hàng, Hệ thống FoodVD, Bộ phận bếp và Đội ngũ giao hàng.")
fig("Hinh_3_14_Activity_TongQuat.png", "Hình 3.14: Biểu đồ hoạt động (Activity Diagram) tổng quát của hệ thống FoodVD", width_in=6.2)
p("Luồng nghiệp vụ diễn ra tuần tự và liên tục: Khách hàng tương tác 3D chọn món -> Hệ thống xác thực thanh toán VietQR và khóa kho -> Bếp tiếp nhận và nấu món -> Giao hàng chuyển tới thực khách -> Thực khách gửi phản hồi đánh giá.")

h("3.4.2 Biểu đồ hoạt động chi tiết quy trình Đặt hàng và Trừ kho nguyên tử", level=3)
p("Đi sâu vào cơ chế cốt lõi giải quyết bài toán chống overselling: Khi nhận yêu cầu checkout, hệ thống thực thi lệnh cập nhật có điều kiện `findOneAndUpdate({_id, stock: {$gte: qty}})`.")
fig("Hinh_3_15_Activity_DatHang_Atomic.png", "Hình 3.15: Biểu đồ hoạt động chi tiết quy trình Đặt hàng và Trừ kho nguyên tử (Atomic)", width_in=5.8)
p("Nếu điều kiện tồn kho thỏa mãn, thao tác trừ kho diễn ra trong tích tắc và giao dịch thành công. Nếu tồn kho không đủ, hệ thống lập tức rẽ nhánh từ chối và hoàn tiền an toàn.")

h("3.4.3 Biểu đồ hoạt động chi tiết quy trình Chấm công GPS/Wi-Fi và Tính lương", level=3)
p("Quy trình điểm danh nhân viên thông minh: Kiểm tra tính hợp lệ của tọa độ địa lý và thời gian ca làm việc trước khi ghi nhận công.")
fig("Hinh_3_16_Activity_ChamCong_Luong.png", "Hình 3.16: Biểu đồ hoạt động chi tiết quy trình Chấm công GPS/Wi-Fi và Tính lương tự động", width_in=5.8)

h("3.4.4 Biểu đồ hoạt động chi tiết quy trình Đánh giá món ăn và Tính sao động", level=3)
p("Quy trình thu thập ý kiến khách hàng sau khi nhận món, kiểm tra điều kiện đơn hàng đã hoàn tất và kích hoạt pipeline tính toán lại số sao trung bình của sản phẩm.")
fig("Hinh_3_17_Activity_DanhGia_Rating.png", "Hình 3.17: Biểu đồ hoạt động chi tiết quy trình Đánh giá món ăn và Tính sao động", width_in=5.8)

# 3.5 SEQUENCE DIAGRAMS
h("3.5 Biểu đồ trình tự (Sequence Diagram)", level=2)
h("3.5.1 Biểu đồ tuần tự Xử lý tranh chấp đặt hàng đồng thời (Race Condition)", level=3)
p("Biểu đồ trình tự mô tả chính xác tương tác giữa các đối tượng khi có 2 khách hàng A và B cùng đặt món ăn cuối cùng tại cùng một thời điểm:")
fig("Hinh_3_18_Sequence_RaceCondition.png", "Hình 3.18: Biểu đồ tuần tự Xử lý tranh chấp đặt hàng đồng thời (Race Condition)", width_in=6.2)
p("Khách hàng A chạm tới CSDL trước ở cấp độ micro-giây, lệnh nguyên tử trừ kho thành công từ 1 về 0. Khách hàng B chạm tới CSDL sau đó, điều kiện stock >= 1 không còn thỏa mãn, hệ thống từ chối ngay lập tức với mã lỗi 409 Conflict.")

h("3.5.2 Biểu đồ tuần tự Sinh mã thanh toán VietQR động và Webhook tự động", level=3)
p("Mô tả quy trình tương tác giữa giao diện ứng dụng, dịch vụ thanh toán FoodVD và hệ thống cổng ngân hàng VietQR NAPAS247:")
fig("Hinh_3_19_Sequence_ThanhToan_VietQR.png", "Hình 3.19: Biểu đồ tuần tự Sinh mã thanh toán VietQR động và Xác nhận Webhook tự động", width_in=6.2)

h("3.5.3 Biểu đồ tuần tự Điểm danh chấm công nhân viên và Xác thực vị trí hợp lệ", level=3)
p("Mô tả chuỗi tương tác khi nhân viên bấm Check-in, hệ thống gọi dịch vụ GeoLocation Engine để tính toán khoảng cách và lưu bản ghi công:")
fig("Hinh_3_20_Sequence_ChamCong.png", "Hình 3.20: Biểu đồ tuần tự Điểm danh chấm công nhân viên và Xác thực vị trí hợp lệ", width_in=6.2)

h("3.5.4 Biểu đồ tuần tự Quản lý tồn kho món ăn và Cập nhật trạng thái", level=3)
p("Mô tả quy trình Admin cập nhật lượng hàng nhập kho, hệ thống kiểm tra phân quyền, cập nhật DB và đồng bộ tức thời ra màn hình khách hàng:")
fig("Hinh_3_21_Sequence_Admin_Kho.png", "Hình 3.21: Biểu đồ tuần tự Quản lý tồn kho món ăn và Cập nhật trạng thái tự động", width_in=6.2)

h("3.5.5 Biểu đồ tuần tự Gửi đánh giá món ăn và Tính toán điểm trung bình", level=3)
p("Mô tả luồng dữ liệu khi khách hàng gửi form đánh giá, backend lưu bản ghi Review và gọi Aggregation tính lại điểm sao của món:")
fig("Hinh_3_22_Sequence_DanhGia_Rating.png", "Hình 3.22: Biểu đồ tuần tự Gửi đánh giá món ăn và Tính toán điểm trung bình", width_in=6.2)

h("3.5.6 Biểu đồ tuần tự Tổng hợp báo cáo doanh thu và Thống kê KPI kinh doanh", level=3)
p("Mô tả luồng truy vấn dữ liệu phân tích khi Admin mở trang dashboard thống kê doanh thu:")
fig("Hinh_3_23_Sequence_Admin_DoanhThu.png", "Hình 3.23: Biểu đồ tuần tự Tổng hợp báo cáo doanh thu và Thống kê KPI kinh doanh", width_in=6.2)

# 3.6 STATE MACHINE
h("3.6 Biểu đồ trạng thái (State Machine Diagram)", level=2)
h("3.6.1 Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)", level=3)
p("Mỗi đơn hàng trong hệ thống FoodVD đều trải qua một chu trình trạng thái khép kín được kiểm soát nghiêm ngặt:")
fig("Hinh_3_24_State_DonHang.png", "Hình 3.24: Biểu đồ trạng thái Vòng đời đơn hàng (Order State Machine)", width_in=6.0)
p("Các trạng thái bao gồm: Pending (Chờ thanh toán) -> Paid (Đã thanh toán) -> Preparing (Đang chế biến) -> Delivering (Đang giao hàng) -> Delivered (Hoàn tất giao). Trường hợp quá hạn thanh toán hoặc hủy đơn, trạng thái chuyển về Cancelled và kích hoạt hoàn trả kho hàng.")

# 3.7 CLASS & DATABASE
h("3.7 Biểu đồ lớp và Thiết kế cơ sở dữ liệu", level=2)
h("3.7.1 Biểu đồ lớp miền nghiệp vụ (Domain Class Model)", level=3)
p("Biểu đồ lớp thể hiện các thực thể nghiệp vụ cốt lõi, bao gồm thuộc tính, phương thức và mối quan hệ kết tập, phụ thuộc giữa chúng:")
fig("Hinh_3_25_Class_Diagram.png", "Hình 3.25: Biểu đồ lớp miền nghiệp vụ (Domain Class Model) hệ thống FoodVD", width_in=6.2)

h("3.7.2 Thiết kế cấu trúc cơ sở dữ liệu MongoDB (Collections Schema)", level=3)
p("Cơ sở dữ liệu MongoDB của hệ thống bao gồm 6 Document Collection chính được chuẩn hóa và thiết lập B-Tree Index tối ưu:")
fig("Hinh_3_26_MongoDB_Schema.png", "Hình 3.26: Cấu trúc các Document Collection trong cơ sở dữ liệu MongoDB", width_in=6.2)

# Bảng 3.14
tbl(["Tên Collection", "Khóa chính / Khóa ngoại", "Mục đích lưu trữ", "Chỉ mục (Indexes)"], [
    ["users", "_id (PK)", "Thông tin tài khoản, mật khẩu băm, vai trò (admin/staff/customer)", "email (Unique), role"],
    ["products", "_id (PK)", "Món ăn, giá tiền, số lượng tồn kho, đường dẫn file 3D GLB", "name, category, price"],
    ["orders", "_id (PK), userId (FK)", "Đơn hàng, danh sách món, tổng tiền, trạng thái đơn, mã VietQR", "userId, status, createdAt"],
    ["attendances", "_id (PK), staffId (FK)", "Nhật ký chấm công, giờ vào/ra, tọa độ GPS, trạng thái hợp lệ", "staffId, checkInTime"],
    ["payrolls", "_id (PK), staffId (FK)", "Bảng lương theo tháng, tổng giờ công, hệ số lương, thực lĩnh", "staffId, monthYear"],
    ["reviews", "_id (PK), productId (FK)", "Đánh giá của khách, số sao chấm (1-5), nhận xét, hình ảnh", "productId, rating"]
], [1.3, 1.6, 2.3, 1.2], caption="Bảng 3.14: Chi tiết cấu trúc các Document Collection trong cơ sở dữ liệu MongoDB")

# 3.8 COMPONENT & DEPLOYMENT
h("3.8 Biểu đồ kiến trúc thành phần và Triển khai", level=2)
h("3.8.1 Biểu đồ thành phần kiến trúc hệ thống (Component Diagram)", level=3)
p("Mô tả kiến trúc phân rã thành các khối thành phần phần mềm độc lập:")
fig("Hinh_3_27_Component_Diagram.png", "Hình 3.27: Biểu đồ thành phần kiến trúc hệ thống (Component Diagram)", width_in=6.2)

h("3.8.2 Biểu đồ triển khai hệ thống (Deployment Diagram)", level=3)
p("Mô tả kiến trúc vật lý và các nút phần cứng thực tế triển khai ứng dụng:")
fig("Hinh_3_28_Deployment_Diagram.png", "Hình 3.28: Biểu đồ triển khai hệ thống (Deployment Diagram)", width_in=6.2)
doc.add_page_break()

# ==========================================
# CHƯƠNG 4: CÀI ĐẶT, TRIỂN KHAI VÀ THỰC NGHIỆM
# ==========================================
h("CHƯƠNG 4: CÀI ĐẶT, TRIỂN KHAI VÀ THỰC NGHIỆM CHƯƠNG TRÌNH", level=1)
h("4.1 Môi trường cài đặt và Cấu hình thử nghiệm", level=2)
p("Hệ thống FoodVD đã được lập trình hoàn thiện và triển khai thực nghiệm trên môi trường máy chủ và máy trạm với các thông số kỹ thuật tiêu chuẩn:")

# Bảng 4.1
tbl(["Thành phần môi trường", "Thông số phần cứng / Công nghệ phần mềm", "Ghi chú vai trò"], [
    ["Máy trạm kiểm thử (Client)", "CPU Intel Core i7, 16GB RAM, GPU Intel Iris Xe", "Trình duyệt Google Chrome v122, Edge"],
    ["Máy chủ ứng dụng (Server)", "Node.js v20.11 LTS, Express.js Framework", "Chạy trên cổng dịch vụ Port 5000"],
    ["Máy chủ cơ sở dữ liệu", "MongoDB Community Server v7.0", "Lưu trữ dữ liệu NoSQL, Port 27017"],
    ["Công cụ xây dựng Frontend", "Vite v5.4, React v19, TypeScript v5.3", "Biên dịch ứng dụng SPA Client"],
    ["Thư viện đồ họa 3D", "Google <model-viewer> v3.4, Three.js engine", "Kết xuất mô hình GLB qua WebGL"],
    ["Cổng thanh toán điện tử", "VietQR Open API & Webhook Listener", "Tạo mã QR NAPAS247 chuẩn động"]
], [1.8, 2.8, 1.8], caption="Bảng 4.1: Thông số cấu hình môi trường thử nghiệm phần cứng và phần mềm")

h("4.2 Giao diện Trang chủ FoodVD và Banner khuyến mại", level=2)
p("Trang chủ FoodVD được thiết kế hiện đại, tinh tế với thanh điều hướng thông minh, banner sự kiện ẩm thực nổi bật và danh mục các món ăn bán chạy nhất.")
fig("Hinh_4_1_UI_TrangChu.png", "Hình 4.1: Giao diện Trang chủ FoodVD & Banner khuyến mại", width_in=6.0)

h("4.3 Giao diện Thực đơn, tìm kiếm và Bộ lọc đa tiêu chí", level=2)
p("Khách hàng có thể dễ dàng tìm kiếm món ăn yêu thích thông qua thanh tìm kiếm nhanh, lọc theo phân loại (Món chính, Đồ uống, Tráng miệng) hoặc lọc theo mức giá.")
fig("Hinh_4_2_UI_ThucDon.png", "Hình 4.2: Giao diện Thực đơn, tìm kiếm & bộ lọc đa tiêu chí", width_in=6.0)

h("4.4 Giao diện Trải nghiệm xoay và Xem mô hình món ăn 3D tương tác", level=2)
p("Khi bấm vào nút 'Xem 3D' trên thẻ món ăn, trình xem 3D WebGL mở ra toàn màn hình. Thực khách có thể dùng ngón tay hoặc chuột để xoay 360 độ, kiểm tra chi tiết các góc nhìn của món ăn trước khi đặt hàng.")
fig("Hinh_4_3_UI_Xem3D.png", "Hình 4.3: Giao diện Trải nghiệm xoay & xem mô hình món ăn 3D tương tác", width_in=6.0)

h("4.5 Giao diện Thông tin nhận hàng và Tóm tắt đơn hàng trực tuyến", level=2)
p("Tại bước 2 của quy trình đặt hàng ('Thông tin nhận hàng'), khách hàng tiến hành điền các thông tin phục vụ giao đồ ăn bao gồm: Họ tên người nhận (ví dụ: Vũ Dũng), Số điện thoại (0901234567), Email nhận hóa đơn điện tử và Địa chỉ giao hàng chi tiết (136 Xuân Thủy, Cầu Giấy, Hà Nội). Khối 'Tóm tắt đơn' ở bên phải tính toán trực tiếp tiền tạm tính (65.000 đ), số tiền giảm giá và phí giao hàng (15.000 đ), cho ra Tổng thanh toán chính xác (80.000 đ) trước khi khách bấm nút 'Sang trang thanh toán'.")
fig("Hinh_4_4_UI_ThongTin_NhanHang.png", "Hình 4.4: Giao diện Nhập thông tin nhận hàng & Tóm tắt đơn hàng", width_in=6.0)

h("4.6 Giao diện Thanh toán tự động qua mã VietQR động", level=2)
p("Khi khách hàng bấm xác nhận thanh toán chuyển khoản, hệ thống chuyển sang bước 3 ('Thanh toán'). Tại đây, hệ thống tự động gọi API sinh mã VietQR động chuẩn NAPAS247 chứa chính xác số tiền cần trả và mã giao dịch đơn hàng. Khách hàng chỉ cần mở ứng dụng ngân hàng quét mã, không cần nhập thủ công số tài khoản hay số tiền.")
fig("Hinh_4_5_UI_ThanhToan_VietQR.png", "Hình 4.5: Giao diện Giỏ hàng & Thanh toán tự động mã VietQR động", width_in=6.0)

h("4.7 Giao diện Lịch sử và Theo dõi tiến trình đơn hàng thời gian thực", level=2)
p("Sau khi đặt hàng và thanh toán thành công, khách hàng có thể tra cứu đơn hàng trong mục 'Lịch sử đơn hàng'. Hệ thống cung cấp thanh tiến trình Timeline trực quan theo thời gian thực: Chờ thanh toán -> Bếp nhận đơn -> Đang chuẩn bị món -> Đang giao hàng -> Đã giao thành công, giúp khách hàng nắm rõ thời gian nhận đồ ăn.")
fig("Hinh_4_6_UI_TheoDoiDonHang.png", "Hình 4.6: Giao diện Lịch sử & Theo dõi trạng thái đơn hàng thời gian thực", width_in=6.0)

h("4.8 Giao diện Cổng nhân viên: Vận hành thực đơn và Bật/tắt trạng thái món ăn", level=2)
p("Cổng vận hành nội bộ (Staff Portal) dành cho nhân viên quán ăn với thanh điều hướng tiện lợi gồm 3 phân hệ chính: 'Quản lý sản phẩm', 'Quản lý đơn hàng' và 'Chấm công ca làm'. Tại tab 'Quản lý sản phẩm', nhân viên có thể theo dõi danh sách toàn bộ thực đơn hiện tại (17 món ăn như Phở bò đặc biệt, Bún chả Hà Nội, Cơm tấm sườn bì...), kiểm tra số lượng suất đã bán và bấm nút gạt tiện lợi để Bật/Tắt trạng thái 'Đang mở bán' hoặc 'Tạm hết món' khi nhà bếp hết nguyên liệu.")
fig("Hinh_4_7_Staff_QuanLy_ThucDon.png", "Hình 4.7: Giao diện Cổng nhân viên: Vận hành thực đơn & Bật/tắt trạng thái món ăn", width_in=6.0)

h("4.9 Giao diện Cổng nhân viên: Tiếp nhận đơn hàng và Điều phối tiến trình", level=2)
p("Tại tab 'Quản lý đơn hàng' của Staff Portal, nhân viên theo dõi danh sách các đơn hàng vừa được khách đặt và cần xử lý ngay (ví dụ đơn FVD-100989 của khách Vũ Dũng - 80.000 đ VietQR, đơn FVD-260901 của Minh Anh - 178.000 đ...). Nhân viên bếp có thể bấm 'Cập nhật tiến trình' để chuyển trạng thái từ 'Chờ duyệt' sang 'Đang chuẩn bị' và 'Giao hàng', hoặc bấm nút 'Hủy đơn' nếu xảy ra sự cố đột xuất kèm tính năng hoàn trả tồn kho.")
fig("Hinh_4_8_Staff_TiepNhan_DonHang.png", "Hình 4.8: Giao diện Cổng nhân viên: Tiếp nhận đơn hàng & Điều phối tiến trình giao", width_in=6.0)

h("4.10 Giao diện Cổng nhân viên: Điểm danh vào ca và Theo dõi lịch sử chấm công", level=2)
p("Tại tab 'Chấm công ca làm', nhân viên quán thực hiện điểm danh hàng ngày với nút bấm trực quan 'Vào ca làm việc' (Check-in). Giao diện hiển thị các thẻ tổng kết chỉ số: 'Tổng ca hoàn thành tháng này' và 'Dự toán lương theo số ca' (đơn giá 300.000 đ/ca). Phía dưới là bảng 'Lịch sử chấm công của nhân viên' liệt kê đầy đủ tên nhân viên (Nguyễn Minh, Trần Hoài, Lê Anh...), ngày làm việc, ca làm (Ca sáng 08:00 - 16:00, Ca tối 16:00 - 23:00), giờ vào, giờ ra và trạng thái (Hoàn thành / Đang làm).")
fig("Hinh_4_9_Staff_ChamCong_LichSu.png", "Hình 4.9: Giao diện Cổng nhân viên: Điểm danh vào ca & Theo dõi lịch sử chấm công", width_in=6.0)

h("4.11 Giao diện Quản trị viên: Quản lý danh mục món ăn và Kiểm soát kho", level=2)
p("Phân hệ dành cho Quản trị viên (Admin) quản lý toàn diện các món ăn, cập nhật đơn giá, thêm mô hình 3D (.glb), và điều chỉnh số lượng tồn kho nguyên liệu trực tiếp.")
fig("Hinh_4_10_Admin_SanPham.png", "Hình 4.10: Giao diện Quản trị viên: Quản lý danh mục món ăn và Tồn kho", width_in=6.0)

h("4.12 Giao diện Quản trị viên: Báo cáo phân tích doanh thu và Biểu đồ KPI", level=2)
p("Màn hình Dashboard phân tích tài chính của Admin hiển thị tổng doanh thu, số lượng đơn hàng hoàn tất, giá trị đơn trung bình và các biểu đồ KPI trực quan theo mốc thời gian.")
fig("Hinh_4_11_Admin_DoanhThu.png", "Hình 4.11: Giao diện Quản trị viên: Báo cáo thống kê doanh thu và Biểu đồ KPI", width_in=6.0)

h("4.13 Giao diện Quản trị viên: Quản lý bảng lương và Đồng bộ dữ liệu chấm công", level=2)
p("Màn hình duyệt công và chốt lương cho phép quản trị viên xem tổng hợp công ca của tất cả nhân viên và bấm 'Đồng bộ & Tính lương' tự động chỉ trong 1 tích tắc.")
fig("Hinh_4_12_Admin_LuongNhanVien.png", "Hình 4.12: Giao diện Quản trị viên: Quản lý bảng lương và đồng bộ dữ liệu chấm công", width_in=6.0)

h("4.14 Giao diện Quản trị viên: Quản lý mã giảm giá Voucher", level=2)
p("Trang cấu hình chương trình khuyến mãi cho phép Admin tạo mã giảm giá mới, đặt hạn sử dụng và số lượng lượt áp dụng.")
fig("Hinh_4_13_Admin_Voucher.png", "Hình 4.13: Giao diện Quản trị viên: Quản lý mã giảm giá Voucher", width_in=6.0)

h("4.15 Đánh giá kết quả kiểm thử hệ thống (Test Cases trọng yếu)", level=2)
p("Tác giả đã tiến hành kiểm thử toàn diện trên tất cả các kịch bản nghiệp vụ trọng yếu bằng cả phương pháp kiểm thử hộp đen (Black-box Testing) và kiểm thử hiệu năng đồng thời (Concurrency Testing):")

# Bảng 4.2
tbl(["Mã Test Case", "Kịch bản kiểm thử (Test Scenario)", "Kết quả kỳ vọng", "Kết quả thực tế", "Đánh giá"], [
    ["TC01", "Duyệt menu và tải mô hình 3D xoay 360 độ", "Mô hình GLB tải mượt mà dưới 2s, xoay không giật lag", "Tải mượt ở 60 FPS, phóng to thu nhỏ tốt", "ĐẠT (PASS)"],
    ["TC02", "Hai khách hàng cùng đặt 1 suất ăn cuối cùng (Race Condition)", "Khách A đặt thành công, Khách B nhận thông báo lỗi 409", "Kho trừ về 0 chuẩn xác, không bị âm kho", "ĐẠT (PASS)"],
    ["TC03", "Quét mã VietQR và bắn Webhook xác nhận tiền về", "Đơn hàng tự động đổi sang trạng thái 'Paid' trong 1 giây", "Đơn hàng cập nhật ngay lập tức không cần F5", "ĐẠT (PASS)"],
    ["TC04", "Nhân viên chấm công khi đứng ngoài bán kính quán (>50m)", "Hệ thống từ chối chấm công, báo lỗi tọa độ", "Bị chặn chính xác, không ghi nhận công", "ĐẠT (PASS)"],
    ["TC05", "Đồng bộ chấm công và tính bảng lương tự động", "Bảng lương tính đúng: Tổng giờ * Đơn giá + Thưởng", "Tính chính xác 100% cho toàn bộ nhân sự", "ĐẠT (PASS)"],
    ["TC06", "Áp dụng mã Voucher đã hết hạn sử dụng", "Hệ thống từ chối áp dụng, báo mã hết hiệu lực", "Báo lỗi rõ ràng, giữ nguyên giá gốc", "ĐẠT (PASS)"]
], [0.8, 2.0, 1.8, 1.4, 0.8], caption="Bảng 4.2: Bảng tổng kết kết quả kiểm thử các kịch bản nghiệp vụ trọng yếu (Test Cases)")
doc.add_page_break()

# ==========================================
# KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN
# ==========================================
h("KẾT LUẬN VÀ HƯỚNG PHÁT TRIỂN", level=1)
p("Sau thời gian nghiêm túc nghiên cứu lý thuyết và thực hành phát triển hệ thống, đề tài 'Xây dựng website thương mại điện tử bán đồ ăn trực tuyến FoodVD hỗ trợ trải nghiệm 3D và quản lý vận hành đa phân hệ' đã hoàn thành xuất sắc các mục tiêu đã đề ra ban đầu.")

p("1. Kết quả đạt được:", bold=True)
bullets([
    "Về mặt khoa học và kỹ thuật: Đã giải quyết triệt để bài toán xung đột tranh chấp dữ liệu đồng thời (Race Condition) bằng giải pháp khóa nguyên tử Atomic Decrement trên cơ sở dữ liệu NoSQL MongoDB, đảm bảo kho hàng không bao giờ bị âm.",
    "Về mặt trải nghiệm người dùng: Đã ứng dụng thành công công nghệ WebGL với Google <model-viewer>, mang lại trải nghiệm tương tác món ăn 3D 360 độ trực quan, sinh động.",
    "Về mặt vận hành tài chính: Đã tự động hóa hoàn toàn quy trình thanh toán chuyển khoản thông qua chuẩn VietQR động và cơ chế Webhook IPN, triệt tiêu thời gian đối soát thủ công.",
    "Về mặt quản trị nội bộ: Đã xây dựng trọn vẹn phân hệ chấm công nhân viên định vị GPS/Wi-Fi và cơ chế tính bảng lương tự động, tạo nên một hệ sinh thái F&B khép kín và hoàn chỉnh."
])

p("2. Hạn chế của đề tài:", bold=True)
bullets([
    "Số lượng mô hình món ăn 3D chất lượng cao (.glb) còn phụ thuộc vào khâu thiết kế đồ họa 3D ban đầu.",
    "Hệ thống hiện mới thử nghiệm triển khai trên môi trường máy chủ cục bộ và mạng nội bộ, chưa đưa lên hạ tầng đám mây phân tán đa vùng (Multi-Region Cloud)."
])

p("3. Hướng phát triển trong tương lai:", bold=True)
bullets([
    "Ứng dụng công nghệ thực tế ảo tăng cường (WebXR / Augmented Reality) để khách hàng có thể chiếu trực tiếp đĩa đồ ăn lên bàn ăn thực tế thông qua camera điện thoại.",
    "Tích hợp mô hình Trí tuệ nhân tạo (AI Recommendation) gợi ý món ăn thông minh dựa trên lịch sử đặt hàng, thời tiết và khẩu vị của từng thực khách.",
    "Phát triển ứng dụng di động gốc (Native Mobile App) sử dụng React Native để tận dụng tối đa cảm biến sinh trắc học (vân tay, FaceID) của điện thoại thông minh."
])
doc.add_page_break()

# ==========================================
# TÀI LIỆU THAM KHẢO
# ==========================================
h("TÀI LIỆU THAM KHẢO", level=1)
refs = [
    "[1] Nguyễn Văn Ba (2018), Phát triển ứng dụng Web hiện đại với JavaScript và React, NXB Thông tin và Truyền thông, Hà Nội.",
    "[2] Đặng Văn Đức (2019), Phân tích thiết kế hệ thống hướng đối tượng với UML, NXB Khoa học và Kỹ thuật, Hà Nội.",
    "[3] Alex Banks, Eve Porcello (2020), Learning React: Modern Patterns for Developing React Apps (2nd Edition), O'Reilly Media.",
    "[4] David Flanagan (2020), JavaScript: The Definitive Guide (7th Edition), O'Reilly Media.",
    "[5] Kyle Simpson (2015), You Don't Know JS: Scope & Closures, O'Reilly Media.",
    "[6] MongoDB Inc. (2024), MongoDB Server Documentation - Atomic Operations and Concurrency, https://www.mongodb.com/docs/manual/core/write-operations-atomicity/.",
    "[7] Google Developers (2024), <model-viewer> - Easily display interactive 3D models on the web, https://modelviewer.dev/.",
    "[8] National Payment Corporation of Vietnam (NAPAS) (2023), Tiêu chuẩn kỹ thuật mã phản hồi nhanh VietQR, Cổng thông tin VietQR.net.",
    "[9] Express.js Foundation (2024), Express.js Web Application Framework Documentation, https://expressjs.com/.",
    "[10] W3C WebGL Working Group (2023), WebGL 2.0 Specification, Khronos Group, https://www.khronos.org/registry/webgl/specs/latest/2.0/."
]
for ref in refs:
    p(ref, space_after=4)

# SAVE TO MULTIPLE TARGETS WITH FALLBACK IF WORD HAS A LOCK
save_targets = [
    r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN.docx",
    r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN_BAN_MOI_NHAT.docx",
    r"c:\Users\Admin\Desktop\523100B\BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN.docx",
    r"c:\Users\Admin\Desktop\523100B\BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN_BAN_CHUAN.docx",
    r"c:\Users\Admin\Desktop\523100B\BAO_CAO_DO_AN_KY_FOODVD_HOAN_THIEN_BAN_MOI_NHAT.docx"
]

saved_paths = []
for target in save_targets:
    try:
        doc.save(target)
        saved_paths.append(target)
        print(f"Successfully saved: {target}")
    except PermissionError:
        print(f"File locked by Word: {target} (will use alternate file)")
    except Exception as e:
        print(f"Error saving to {target}: {e}")

print("===========================================================")
print(f"REPORT GENERATION FINISHED! Saved to {len(saved_paths)} locations.")
for pth in saved_paths:
    print(f" -> {pth}")
print("===========================================================")
