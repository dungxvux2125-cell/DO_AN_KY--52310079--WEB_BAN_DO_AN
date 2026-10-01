import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

os.makedirs("diagrams", exist_ok=True)

def setup_canvas(w=9, h=5.5):
    fig, ax = plt.subplots(figsize=(w, h), dpi=300)
    fig.patch.set_facecolor('white')
    ax.set_facecolor('white')
    ax.axis('off')
    return fig, ax

def save_bw(fig, filename):
    filepath = os.path.join("diagrams", filename)
    fig.savefig(filepath, bbox_inches='tight', facecolor='white', edgecolor='none', dpi=300)
    plt.close(fig)
    print(f"Rendered B&W: {filename}")

def draw_stick_figure(ax, x, y, name, scale=1.0):
    # Sleek, well-proportioned actor (compact & elegant like StarUML)
    r = 0.022 * scale
    head = patches.Circle((x, y + 0.06 * scale), r, edgecolor='black', facecolor='white', lw=1.5, zorder=5)
    ax.add_patch(head)
    # Spine
    ax.plot([x, x], [y + 0.038 * scale, y - 0.02 * scale], color='black', lw=1.5, zorder=5)
    # Arms
    ax.plot([x - 0.030 * scale, x + 0.030 * scale], [y + 0.015 * scale, y + 0.015 * scale], color='black', lw=1.5, zorder=5)
    # Legs
    ax.plot([x, x - 0.025 * scale], [y - 0.02 * scale, y - 0.075 * scale], color='black', lw=1.5, zorder=5)
    ax.plot([x, x + 0.025 * scale], [y - 0.02 * scale, y - 0.075 * scale], color='black', lw=1.5, zorder=5)
    # Name label
    ax.text(x, y - 0.105 * scale, name, ha='center', va='top', fontsize=9.5 * scale, fontweight='bold', color='black', zorder=5)

def draw_usecase(ax, x, y, text, w=0.29, h=0.09, stereo=None, fontsize=10):
    oval = patches.Ellipse((x, y), w, h, edgecolor='black', facecolor='white', lw=1.4, zorder=4)
    ax.add_patch(oval)
    full_text = f"<<{stereo}>>\n{text}" if stereo else text
    ax.text(x, y, full_text, ha='center', va='center', fontsize=fontsize, fontweight='medium', color='black', zorder=5)

def draw_boundary(ax, x, y, w, h, title):
    rect = patches.Rectangle((x, y), w, h, edgecolor='black', facecolor='#FAFAFA', lw=1.4, ls='-', zorder=1)
    ax.add_patch(rect)
    ax.text(x + 0.02, y + h - 0.03, title, ha='left', va='top', fontsize=11, fontweight='bold', color='black', zorder=2)

def draw_assoc(ax, x1, y1, x2, y2, label=None, ls='-', arrow=''):
    if arrow == '->':
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle='->', color='black', lw=1.2, ls=ls), zorder=3)
    elif arrow == '<-':
        ax.annotate('', xy=(x1, y1), xytext=(x2, y2),
                    arrowprops=dict(arrowstyle='->', color='black', lw=1.2, ls=ls), zorder=3)
    else:
        ax.plot([x1, x2], [y1, y2], color='black', lw=1.2, ls=ls, zorder=3)
    
    if label:
        mx, my = (x1 + x2) / 2, (y1 + y2) / 2
        ax.text(mx, my + 0.015, label, ha='center', va='bottom', fontsize=8,
                bbox=dict(boxstyle='square,pad=0.15', fc='white', ec='none'), color='black', zorder=4)

# ==========================================
# 1. HÌNH 3.1: USE CASE TỔNG QUÁT (MONOCHROME - PROPORTIONAL & CLEAR)
# ==========================================
def gen_hinh_3_1():
    fig, ax = setup_canvas(12, 8.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    # Large spacious system boundary (70% of canvas width)
    draw_boundary(ax, 0.15, 0.04, 0.70, 0.92, "HỆ THỐNG THƯƠNG MẠI ĐIỆN TỬ ẨM THỰC FOODVD")
    
    # Sleek, well-proportioned actors
    draw_stick_figure(ax, 0.075, 0.58, "Khách Hàng\n(Customer)")
    draw_stick_figure(ax, 0.925, 0.72, "Quản Trị Viên\n(Admin)")
    draw_stick_figure(ax, 0.925, 0.32, "Nhân Viên\n(Staff)")
    
    # Left Column (Customer Use Cases)
    cust_ucs = [
        (0.33, 0.88, "Xem menu & Trải nghiệm 3D"),
        (0.33, 0.75, "Quản lý giỏ hàng & Đặt hàng"),
        (0.33, 0.62, "Thanh toán VietQR động"),
        (0.33, 0.49, "Theo dõi tiến trình đơn hàng"),
        (0.33, 0.36, "Đánh giá món ăn & Số sao"),
        (0.33, 0.23, "Tra cứu lịch sử đơn hàng")
    ]
    for cx, cy, text in cust_ucs:
        draw_usecase(ax, cx, cy, text, w=0.29, h=0.09, fontsize=10)
        draw_assoc(ax, 0.075, 0.58, cx - 0.145, cy)
        
    # Right Column (Admin & Staff Use Cases)
    admin_ucs = [
        (0.67, 0.88, "Quản lý món ăn & Tồn kho"),
        (0.67, 0.75, "Báo cáo doanh thu & KPI"),
        (0.67, 0.62, "Quản lý mã Voucher khuyến mãi"),
        (0.67, 0.49, "Quản lý đơn hàng & Vận hành bếp"),
        (0.67, 0.36, "Duyệt công & Tính bảng lương"),
        (0.67, 0.23, "Chấm công ca làm (GPS/Wi-Fi)")
    ]
    for ax_pos, ay, text in admin_ucs:
        draw_usecase(ax, ax_pos, ay, text, w=0.29, h=0.09, fontsize=10)
        if ay >= 0.36:
            draw_assoc(ax, 0.925, 0.72, ax_pos + 0.145, ay)
        if ay in [0.49, 0.23]:
            draw_assoc(ax, 0.925, 0.32, ax_pos + 0.145, ay)
            
    # Shared Bottom Use Case: Đăng nhập & Xác thực JWT
    draw_usecase(ax, 0.50, 0.10, "Đăng nhập & Phân quyền JWT", w=0.32, h=0.085, fontsize=10.5)
    draw_assoc(ax, 0.075, 0.58, 0.34, 0.10)
    draw_assoc(ax, 0.925, 0.72, 0.66, 0.10)
    draw_assoc(ax, 0.925, 0.32, 0.66, 0.10)
    
    save_bw(fig, "Hinh_3_1_UseCase_TongQuat.png")

# ==========================================
# 2-13. USE CASES CHI TIẾT TỪNG CHỨC NĂNG (HÌNH 3.2 -> 3.13)
# ==========================================
def gen_detail_usecase(filename, actor_name, main_uc, sub_ucs, title_boundary):
    fig, ax = setup_canvas(8.5, 4.8)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    draw_boundary(ax, 0.22, 0.06, 0.74, 0.88, title_boundary)
    draw_stick_figure(ax, 0.11, 0.52, actor_name)
    
    # Main UC
    mx, my = 0.44, 0.52
    draw_usecase(ax, mx, my, main_uc, 0.28, 0.14, fontsize=9.5)
    draw_assoc(ax, 0.14, 0.52, mx - 0.14, my)
    
    # Sub UCs (include/extend)
    n = len(sub_ucs)
    if n == 1:
        positions = [(0.79, 0.52)]
    elif n == 2:
        positions = [(0.79, 0.70), (0.79, 0.34)]
    elif n == 3:
        positions = [(0.79, 0.78), (0.79, 0.52), (0.79, 0.26)]
    else:
        positions = [(0.79, 0.82 - i * 0.22) for i in range(n)]
        
    for i, (suc, stype) in enumerate(sub_ucs):
        sx, sy = positions[i]
        draw_usecase(ax, sx, sy, suc, 0.27, 0.12, fontsize=9.0)
        if stype == "include":
            draw_assoc(ax, mx + 0.14, my, sx - 0.135, sy, label="<<include>>", ls='--', arrow='->')
        elif stype == "extend":
            draw_assoc(ax, sx - 0.135, sy, mx + 0.14, my, label="<<extend>>", ls='--', arrow='->')
        else:
            draw_assoc(ax, mx + 0.14, my, sx - 0.135, sy, ls='-', arrow='')
            
    save_bw(fig, filename)

def gen_all_detail_usecases():
    # UC01 - Hình 3.2
    gen_detail_usecase(
        "Hinh_3_2_UseCase_XemMenu_3D.png",
        "Khách Hàng",
        "Xem thực đơn &\nTrải nghiệm 3D",
        [("Tải mô hình 3D WebGL", "include"), ("Lọc món theo danh mục", "extend")],
        "Phân hệ Xem Thực Đơn & Mô Hình 3D"
    )
    # UC02 - Hình 3.3
    gen_detail_usecase(
        "Hinh_3_3_UseCase_DatHang_Kho.png",
        "Khách Hàng",
        "Quản lý giỏ hàng &\nĐặt hàng",
        [("Kiểm tra tồn kho nguyên tử", "include"), ("Áp dụng mã giảm giá", "extend")],
        "Phân hệ Giỏ Hàng & Đặt Hàng Trực Tuyến"
    )
    # UC03 - Hình 3.4
    gen_detail_usecase(
        "Hinh_3_4_UseCase_ThanhToan_VietQR.png",
        "Khách Hàng",
        "Thanh toán đơn hàng",
        [("Sinh mã VietQR động", "include"), ("Xác nhận chuyển khoản", "include")],
        "Phân hệ Thanh Toán Trực Tuyến VietQR"
    )
    # UC04 - Hình 3.5
    gen_detail_usecase(
        "Hinh_3_5_UseCase_TheoDoiDonHang.png",
        "Khách Hàng",
        "Tra cứu & Theo dõi\ntiến độ đơn",
        [("Cập nhật trạng thái thời gian thực", "include"), ("Hủy đơn chờ thanh toán", "extend")],
        "Phân hệ Tra Cứu & Lịch Sử Đơn Hàng"
    )
    # UC05 - Hình 3.6
    gen_detail_usecase(
        "Hinh_3_6_UseCase_DanhGia_Rating.png",
        "Khách Hàng",
        "Đánh giá món ăn &\nDịch vụ",
        [("Chấm điểm số sao (1-5)", "include"), ("Đính kèm ảnh thực tế", "extend")],
        "Phân hệ Đánh Giá & Phản Hồi Chất Lượng"
    )
    # UC06 - Hình 3.7
    gen_detail_usecase(
        "Hinh_3_7_UseCase_DangNhap_HoSo.png",
        "Người Dùng\n(Tất cả vai trò)",
        "Đăng nhập hệ thống",
        [("Đăng ký tài khoản mới", "extend"), ("Cập nhật thông tin cá nhân", "extend")],
        "Phân hệ Xác Thực & Quản Lý Hồ Sơ"
    )
    # UC07 - Hình 3.8
    gen_detail_usecase(
        "Hinh_3_8_UseCase_Admin_MonAn_Kho.png",
        "Quản Trị Viên",
        "Quản lý món ăn &\nKiểm soát kho",
        [("Thêm / Sửa / Xóa món ăn", "include"), ("Khóa đặt hàng khi hết tồn kho", "include")],
        "Phân hệ Quản Lý Món Ăn & Tồn Kho"
    )
    # UC08 - Hình 3.9
    gen_detail_usecase(
        "Hinh_3_9_UseCase_QuanLyDon_Bep.png",
        "Quản Trị / Bếp",
        "Điều phối đơn hàng &\nVận hành bếp",
        [("Tiếp nhận đơn & Bắt đầu nấu", "include"), ("Chuyển trạng thái giao hàng", "include")],
        "Phân hệ Điều Phối Đơn Hàng & Vận Hành Bếp"
    )
    # UC09 - Hình 3.10
    gen_detail_usecase(
        "Hinh_3_10_UseCase_Admin_DoanhThu.png",
        "Quản Trị Viên",
        "Báo cáo phân tích\ndoanh thu",
        [("Lọc doanh thu theo ngày/tháng", "include"), ("Thống kê món ăn bán chạy", "extend")],
        "Phân hệ Thống Kê & Báo Cáo Doanh Thu"
    )
    # UC10 - Hình 3.11
    gen_detail_usecase(
        "Hinh_3_11_UseCase_Admin_Voucher.png",
        "Quản Trị Viên",
        "Quản lý Voucher\nkhuyến mại",
        [("Thiết lập mã & tỷ lệ giảm", "include"), ("Giới hạn số lượt & thời hạn", "include")],
        "Phân hệ Khuyến Mại & Mã Giảm Giá"
    )
    # UC11 - Hình 3.12
    gen_detail_usecase(
        "Hinh_3_12_UseCase_NhanVien_ChamCong.png",
        "Nhân Viên",
        "Điểm danh ca làm",
        [("Xác thực vị trí GPS / Wi-Fi", "include"), ("Ghi nhận giờ Vào / Tan ca", "include")],
        "Phân hệ Điểm Danh & Chấm Công Nhân Viên"
    )
    # UC12 - Hình 3.13
    gen_detail_usecase(
        "Hinh_3_13_UseCase_Admin_Luong.png",
        "Quản Trị Viên",
        "Duyệt công &\nTính bảng lương",
        [("Đồng bộ dữ liệu chấm công", "include"), ("Tính lương tự động & Xuất Excel", "include")],
        "Phân hệ Bảng Lương & Phê Duyệt Chấm Công"
    )

# ==========================================
# 14. BIỂU ĐỒ HOẠT ĐỘNG TỔNG QUÁT (HÌNH 3.14)
# ==========================================
def gen_hinh_3_14():
    fig, ax = setup_canvas(10, 7)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    # 4 Swimlanes
    lanes = [
        (0.04, 0.22, "Khách Hàng"),
        (0.26, 0.22, "Hệ Thống FoodVD"),
        (0.48, 0.24, "Bộ Phận Bếp"),
        (0.72, 0.24, "Vận Chuyển / Giao Hàng")
    ]
    for lx, lw, lt in lanes:
        rect = patches.Rectangle((lx, 0.05), lw, 0.90, edgecolor='black', facecolor='#FAFAFA' if lx%0.2>0.1 else 'white', lw=1.2, ls='-', zorder=1)
        ax.add_patch(rect)
        ax.text(lx + lw/2, 0.92, lt, ha='center', va='center', fontsize=9.5, fontweight='bold', color='black')
        
    def act(x, y, text, w=0.18, h=0.07):
        box = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.015,rounding_size=0.02',
                                     edgecolor='black', facecolor='white', lw=1.2, zorder=3)
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=8, color='black', zorder=4)

    # Start
    start = patches.Circle((0.15, 0.85), 0.018, facecolor='black', edgecolor='black', zorder=4)
    ax.add_patch(start)
    
    act(0.15, 0.74, "Xem món 3D &\nChọn vào giỏ")
    draw_assoc(ax, 0.15, 0.832, 0.15, 0.775, arrow='->')
    
    act(0.15, 0.60, "Xác nhận đặt hàng &\nQuét VietQR")
    draw_assoc(ax, 0.15, 0.705, 0.15, 0.635, arrow='->')
    
    # Flow to System
    draw_assoc(ax, 0.24, 0.60, 0.37, 0.60, arrow='->')
    act(0.37, 0.60, "Xác thực giao dịch &\nKhóa trừ tồn kho")
    
    # Flow to Kitchen
    draw_assoc(ax, 0.46, 0.60, 0.60, 0.60, arrow='->')
    act(0.60, 0.60, "Tiếp nhận đơn &\nTiến hành chế biến")
    
    act(0.60, 0.44, "Đóng gói món ăn &\nBáo hoàn thành")
    draw_assoc(ax, 0.60, 0.565, 0.60, 0.475, arrow='->')
    
    # Flow to Delivery
    draw_assoc(ax, 0.69, 0.44, 0.84, 0.44, arrow='->')
    act(0.84, 0.44, "Nhận đơn &\nVận chuyển tới khách")
    
    act(0.84, 0.28, "Giao món thành công &\nCập nhật 'Delivered'")
    draw_assoc(ax, 0.84, 0.405, 0.84, 0.315, arrow='->')
    
    # Back to Customer
    draw_assoc(ax, 0.75, 0.28, 0.15, 0.28, arrow='->')
    act(0.15, 0.28, "Nhận món ăn &\nGửi đánh giá sao")
    
    # End node
    end_outer = patches.Circle((0.15, 0.14), 0.02, facecolor='white', edgecolor='black', lw=1.5, zorder=4)
    end_inner = patches.Circle((0.15, 0.14), 0.012, facecolor='black', edgecolor='black', zorder=5)
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    draw_assoc(ax, 0.15, 0.245, 0.15, 0.16, arrow='->')
    
    save_bw(fig, "Hinh_3_14_Activity_TongQuat.png")

# ==========================================
# 15. BIỂU ĐỒ HOẠT ĐỘNG: ĐẶT HÀNG & ATOMIC (HÌNH 3.15)
# ==========================================
def gen_hinh_3_15():
    fig, ax = setup_canvas(8.5, 7.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    draw_boundary(ax, 0.05, 0.04, 0.90, 0.92, "Quy Trình Đặt Hàng & Trừ Tồn Kho Nguyên Tử (Atomic Decrement)")
    
    def rbox(x, y, text, w=0.28, h=0.08):
        box = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.015,rounding_size=0.02',
                                     edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, color='black', zorder=4)
        
    def diamond(x, y, text, w=0.24, h=0.09):
        pts = [[x, y + h/2], [x + w/2, y], [x, y - h/2], [x - w/2, y]]
        poly = patches.Polygon(pts, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(poly)
        ax.text(x, y, text, ha='center', va='center', fontsize=8, color='black', zorder=4)

    # Start
    start = patches.Circle((0.5, 0.90), 0.018, facecolor='black', edgecolor='black', zorder=4)
    ax.add_patch(start)
    
    rbox(0.5, 0.80, "Khách hàng gửi yêu cầu\nĐặt hàng (Checkout)")
    draw_assoc(ax, 0.5, 0.882, 0.5, 0.84, arrow='->')
    
    rbox(0.5, 0.67, "Hệ thống mở giao dịch &\nThực thi findOneAndUpdate atomic")
    draw_assoc(ax, 0.5, 0.76, 0.5, 0.71, arrow='->')
    
    diamond(0.5, 0.53, "Số lượng tồn kho\n>= Số lượng đặt?")
    draw_assoc(ax, 0.5, 0.63, 0.5, 0.575, arrow='->')
    
    # Branch No
    draw_assoc(ax, 0.62, 0.53, 0.82, 0.53, label="[Không đủ]", arrow='->')
    rbox(0.82, 0.40, "Hủy giao dịch (Rollback)\nBáo lỗi 'Món đã hết'")
    draw_assoc(ax, 0.82, 0.53, 0.82, 0.44, arrow='->')
    
    # Branch Yes
    draw_assoc(ax, 0.5, 0.485, 0.5, 0.42, label="[Thỏa mãn]", arrow='->')
    rbox(0.5, 0.38, "Trừ kho nguyên tử (stock -= qty)\nKhóa đơn hàng ở DB")
    
    rbox(0.5, 0.25, "Sinh mã thanh toán VietQR động\nChờ xác nhận thanh toán")
    draw_assoc(ax, 0.5, 0.34, 0.5, 0.29, arrow='->')
    
    # End
    end_outer = patches.Circle((0.5, 0.12), 0.02, facecolor='white', edgecolor='black', lw=1.5, zorder=4)
    end_inner = patches.Circle((0.5, 0.12), 0.012, facecolor='black', edgecolor='black', zorder=5)
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    draw_assoc(ax, 0.5, 0.21, 0.5, 0.14, arrow='->')
    draw_assoc(ax, 0.82, 0.36, 0.82, 0.12, arrow='->')
    draw_assoc(ax, 0.82, 0.12, 0.52, 0.12, arrow='->')
    
    save_bw(fig, "Hinh_3_15_Activity_DatHang_Atomic.png")

# ==========================================
# 16. BIỂU ĐỒ HOẠT ĐỘNG: CHẤM CÔNG & LƯƠNG (HÌNH 3.16)
# ==========================================
def gen_hinh_3_16():
    fig, ax = setup_canvas(8.5, 7.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    draw_boundary(ax, 0.05, 0.04, 0.90, 0.92, "Quy Trình Chấm Công Nhân Viên & Tính Bảng Lương Tự Động")
    
    def rbox(x, y, text, w=0.28, h=0.08):
        box = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.015,rounding_size=0.02',
                                     edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, color='black', zorder=4)
        
    def diamond(x, y, text, w=0.24, h=0.09):
        pts = [[x, y + h/2], [x + w/2, y], [x, y - h/2], [x - w/2, y]]
        poly = patches.Polygon(pts, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(poly)
        ax.text(x, y, text, ha='center', va='center', fontsize=8, color='black', zorder=4)

    start = patches.Circle((0.5, 0.90), 0.018, facecolor='black', edgecolor='black', zorder=4)
    ax.add_patch(start)
    
    rbox(0.5, 0.80, "Nhân viên bấm Check-in\ngửi tọa độ GPS & BSSID Wi-Fi")
    draw_assoc(ax, 0.5, 0.882, 0.5, 0.84, arrow='->')
    
    diamond(0.5, 0.67, "Khoảng cách GPS <= 50m\nhoặc khớp Wi-Fi quán?")
    draw_assoc(ax, 0.5, 0.76, 0.5, 0.715, arrow='->')
    
    # Ineligible
    draw_assoc(ax, 0.62, 0.67, 0.82, 0.67, label="[Ngoài phạm vi]", arrow='->')
    rbox(0.82, 0.53, "Từ chối chấm công\nBáo lỗi 'Không đúng vị trí'")
    draw_assoc(ax, 0.82, 0.67, 0.82, 0.57, arrow='->')
    
    # Eligible
    draw_assoc(ax, 0.5, 0.625, 0.5, 0.55, label="[Hợp lệ]", arrow='->')
    rbox(0.5, 0.51, "Ghi nhận giờ vào ca (InTime)\nvà trạng thái ca làm việc")
    
    rbox(0.5, 0.38, "Kết thúc ca: Check-out &\nTính số giờ công thực tế")
    draw_assoc(ax, 0.5, 0.47, 0.5, 0.42, arrow='->')
    
    rbox(0.5, 0.25, "Hệ thống tự động tính lương:\nLương = Tổng giờ * Lương ca + Thưởng")
    draw_assoc(ax, 0.5, 0.34, 0.5, 0.29, arrow='->')
    
    end_outer = patches.Circle((0.5, 0.12), 0.02, facecolor='white', edgecolor='black', lw=1.5, zorder=4)
    end_inner = patches.Circle((0.5, 0.12), 0.012, facecolor='black', edgecolor='black', zorder=5)
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    draw_assoc(ax, 0.5, 0.21, 0.5, 0.14, arrow='->')
    draw_assoc(ax, 0.82, 0.49, 0.82, 0.12, arrow='->')
    draw_assoc(ax, 0.82, 0.12, 0.52, 0.12, arrow='->')
    
    save_bw(fig, "Hinh_3_16_Activity_ChamCong_Luong.png")

# ==========================================
# 17. BIỂU ĐỒ HOẠT ĐỘNG: ĐÁNH GIÁ & RATING (HÌNH 3.17)
# ==========================================
def gen_hinh_3_17():
    fig, ax = setup_canvas(8.5, 7.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    
    draw_boundary(ax, 0.05, 0.04, 0.90, 0.92, "Quy Trình Khách Hàng Đánh Giá Món Ăn & Cập Nhật Sao Động")
    
    def rbox(x, y, text, w=0.28, h=0.08):
        box = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.015,rounding_size=0.02',
                                     edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(box)
        ax.text(x, y, text, ha='center', va='center', fontsize=8.5, color='black', zorder=4)
        
    def diamond(x, y, text, w=0.24, h=0.09):
        pts = [[x, y + h/2], [x + w/2, y], [x, y - h/2], [x - w/2, y]]
        poly = patches.Polygon(pts, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(poly)
        ax.text(x, y, text, ha='center', va='center', fontsize=8, color='black', zorder=4)

    start = patches.Circle((0.5, 0.90), 0.018, facecolor='black', edgecolor='black', zorder=4)
    ax.add_patch(start)
    
    rbox(0.5, 0.80, "Khách hàng chọn đơn hàng\nđã giao thành công (Delivered)")
    draw_assoc(ax, 0.5, 0.882, 0.5, 0.84, arrow='->')
    
    diamond(0.5, 0.67, "Đơn hàng đã được\nđánh giá trước đó chưa?")
    draw_assoc(ax, 0.5, 0.76, 0.5, 0.715, arrow='->')
    
    # Already reviewed
    draw_assoc(ax, 0.62, 0.67, 0.82, 0.67, label="[Đã đánh giá]", arrow='->')
    rbox(0.82, 0.53, "Hiển thị đánh giá cũ\nKhông cho tạo trùng lặp")
    draw_assoc(ax, 0.82, 0.67, 0.82, 0.57, arrow='->')
    
    # Not yet
    draw_assoc(ax, 0.5, 0.625, 0.5, 0.55, label="[Chưa đánh giá]", arrow='->')
    rbox(0.5, 0.51, "Nhập số sao (1-5), lời bình luận\nvà tải ảnh món ăn kèm theo")
    
    rbox(0.5, 0.38, "Lưu bản ghi vào Collection Reviews\nvới UserId và ProductId")
    draw_assoc(ax, 0.5, 0.47, 0.5, 0.42, arrow='->')
    
    rbox(0.5, 0.25, "MongoDB Aggregation Pipeline:\nTính lại số sao trung bình món ăn")
    draw_assoc(ax, 0.5, 0.34, 0.5, 0.29, arrow='->')
    
    end_outer = patches.Circle((0.5, 0.12), 0.02, facecolor='white', edgecolor='black', lw=1.5, zorder=4)
    end_inner = patches.Circle((0.5, 0.12), 0.012, facecolor='black', edgecolor='black', zorder=5)
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    draw_assoc(ax, 0.5, 0.21, 0.5, 0.14, arrow='->')
    draw_assoc(ax, 0.82, 0.49, 0.82, 0.12, arrow='->')
    draw_assoc(ax, 0.82, 0.12, 0.52, 0.12, arrow='->')
    
    save_bw(fig, "Hinh_3_17_Activity_DanhGia_Rating.png")

# ==========================================
# 18-23. BIỂU ĐỒ TRÌNH TỰ (SEQUENCE DIAGRAMS - HÌNH 3.18 -> 3.23)
# ==========================================
def draw_sequence_base(ax, actors, title):
    draw_boundary(ax, 0.04, 0.04, 0.92, 0.92, title)
    n = len(actors)
    step = 0.84 / (n - 1)
    xs = [0.08 + i * step for i in range(n)]
    
    for x, act in zip(xs, actors):
        rect = patches.Rectangle((x - 0.07, 0.85), 0.14, 0.06, edgecolor='black', facecolor='white', lw=1.2, zorder=3)
        ax.add_patch(rect)
        ax.text(x, 0.88, act, ha='center', va='center', fontsize=8.5, fontweight='bold', color='black', zorder=4)
        ax.plot([x, x], [0.85, 0.08], color='black', lw=1.0, ls='--', zorder=2)
    return xs

def draw_seq_msg(ax, x1, x2, y, text, is_reply=False, is_async=False):
    ls = '--' if is_reply else '-'
    arrow = '->'
    ax.annotate('', xy=(x2, y), xytext=(x1, y),
                arrowprops=dict(arrowstyle=arrow, color='black', lw=1.2, ls=ls), zorder=4)
    mx = (x1 + x2) / 2
    ax.text(mx, y + 0.015, text, ha='center', va='bottom', fontsize=8,
            bbox=dict(boxstyle='square,pad=0.15', fc='white', ec='none'), color='black', zorder=5)

def gen_hinh_3_18():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Khách A & B", "Web Client", "Order Controller", "Product Model", "MongoDB Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Xử Lý Tranh Chấp Kho Đồng Thời (Atomic Lock)")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Cùng bấm 'Thanh toán' (Qty=1, Tồn=1)")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Gửi đồng thời 2 request POST /orders")
    draw_seq_msg(ax, xs[2], xs[3], 0.64, "3. Khách A chạm DB trước: findOneAndUpdate({_id, stock: {$gte: 1}})")
    draw_seq_msg(ax, xs[3], xs[4], 0.57, "4. DB khóa tài liệu, trừ stock: 1 -> 0 thành công")
    draw_seq_msg(ax, xs[4], xs[2], 0.50, "5. Trả về doc hợp lệ cho Khách A", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[3], 0.43, "6. Khách B chạm DB sau: findOneAndUpdate({_id, stock: {$gte: 1}})")
    draw_seq_msg(ax, xs[3], xs[4], 0.36, "7. DB kiểm tra: stock=0 (<1) -> Không thỏa điều kiện")
    draw_seq_msg(ax, xs[4], xs[2], 0.29, "8. DB trả về null (Atomic Conflict Rejected)", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.22, "9. Khách A: Mã QR | Khách B: Lỗi 409 'Món đã hết'")
    draw_seq_msg(ax, xs[1], xs[0], 0.15, "10. Thông báo kết quả trực quan trên giao diện", is_reply=True)
    
    save_bw(fig, "Hinh_3_18_Sequence_RaceCondition.png")

def gen_hinh_3_19():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Khách Hàng", "Giao Diện App", "Payment Service", "VietQR Gateway", "Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Sinh Mã VietQR Động & Xác Nhận Webhook Tự Động")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Chọn phương thức 'Chuyển khoản VietQR'")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Request POST /api/payment/vietqr")
    draw_seq_msg(ax, xs[2], xs[3], 0.64, "3. Tạo mã QR động kèm nội dung đơn (VD: FOODVD_OD123)")
    draw_seq_msg(ax, xs[3], xs[2], 0.57, "4. Trả về hình ảnh QR Code & URL", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.50, "5. Hiển thị mã QR và thời gian đếm ngược", is_reply=True)
    draw_seq_msg(ax, xs[0], xs[3], 0.43, "6. Quét QR trên ứng dụng ngân hàng và chuyển khoản")
    draw_seq_msg(ax, xs[3], xs[2], 0.36, "7. Ngân hàng bắn IPN / Webhook báo chuyển tiền thành công")
    draw_seq_msg(ax, xs[2], xs[4], 0.29, "8. Cập nhật Order status = 'Paid', lưu TransactionId")
    draw_seq_msg(ax, xs[4], xs[2], 0.22, "9. DB ghi nhận thành công", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.15, "10. Realtime thông báo: 'Thanh toán thành công!'")
    
    save_bw(fig, "Hinh_3_19_Sequence_ThanhToan_VietQR.png")

def gen_hinh_3_20():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Nhân Viên", "Mobile/Web Client", "Attendance Service", "Geo/Wi-Fi Engine", "Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Điểm Danh & Chấm Công Xác Thực Vị Trí")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Nhấn nút 'Chấm công Vào ca'")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Gửi tọa độ GPS + BSSID mạng Wi-Fi")
    draw_seq_msg(ax, xs[2], xs[3], 0.64, "3. Tính khoảng cách Haversine tới quán ăn")
    draw_seq_msg(ax, xs[3], xs[2], 0.57, "4. Kết quả: Khoảng cách = 18m (< 50m) -> Hợp lệ", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[4], 0.50, "5. Ghi nhận bản ghi Attendance (InTime, Date, Status='OnTime')")
    draw_seq_msg(ax, xs[4], xs[2], 0.43, "6. Bản ghi được lưu trữ thành công", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.36, "7. Trả về thông báo Check-in thành công", is_reply=True)
    draw_seq_msg(ax, xs[1], xs[0], 0.29, "8. Hiển thị giờ vào ca và trạng thái hợp lệ trên màn hình")
    
    save_bw(fig, "Hinh_3_20_Sequence_ChamCong.png")

def gen_hinh_3_21():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Quản Trị Viên", "Admin Dashboard", "Inventory Controller", "Product Model", "Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Quản Lý Món Ăn & Kiểm Soát Tồn Kho")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Cập nhật số lượng nhập kho hoặc thông tin món")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Request PUT /api/products/:id/stock")
    draw_seq_msg(ax, xs[2], xs[3], 0.64, "3. Validate dữ liệu & kiểm tra quyền Admin")
    draw_seq_msg(ax, xs[3], xs[4], 0.57, "4. updateOne({_id}, {$set: {stock: newStock, isAvailable}})")
    draw_seq_msg(ax, xs[4], xs[3], 0.50, "5. MongoDB xác nhận cập nhật thành công", is_reply=True)
    draw_seq_msg(ax, xs[3], xs[2], 0.43, "6. Kích hoạt sự kiện WebSocket đồng bộ kho tới Client")
    draw_seq_msg(ax, xs[2], xs[1], 0.36, "7. Trả về thông tin sản phẩm mới nhất", is_reply=True)
    draw_seq_msg(ax, xs[1], xs[0], 0.29, "8. Bảng dữ liệu tự động làm mới, hiển thị tồn kho mới")
    
    save_bw(fig, "Hinh_3_21_Sequence_Admin_Kho.png")

def gen_hinh_3_22():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Khách Hàng", "Chi Tiết Đơn Hàng", "Review Controller", "Aggregation Engine", "Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Gửi Đánh Giá Món Ăn & Tính Sao Động")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Nhập 5 sao, viết nhận xét và đính kèm ảnh")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Gửi POST /api/reviews kèm thông tin đơn hàng")
    draw_seq_msg(ax, xs[2], xs[4], 0.64, "3. Lưu bản ghi đánh giá vào Collection Reviews")
    draw_seq_msg(ax, xs[4], xs[2], 0.57, "4. Ghi nhận thành công", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[3], 0.50, "5. Chạy Aggregation: Tính avgRating của ProductId")
    draw_seq_msg(ax, xs[3], xs[4], 0.43, "6. Cập nhật rating và numReviews vào Product")
    draw_seq_msg(ax, xs[4], xs[2], 0.36, "7. DB phản hồi kết quả tính toán", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.29, "8. Trả về kết quả đánh giá thành công", is_reply=True)
    draw_seq_msg(ax, xs[1], xs[0], 0.22, "9. Hiển thị lời cảm ơn và số sao mới trên trang món ăn")
    
    save_bw(fig, "Hinh_3_22_Sequence_DanhGia_Rating.png")

def gen_hinh_3_23():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    actors = ["Quản Trị Viên", "Trang Báo Cáo", "Analytics Controller", "MongoDB Aggregation", "Database"]
    xs = draw_sequence_base(ax, actors, "Biểu Đồ Tuần Tự: Tổng Hợp Doanh Thu & Báo Cáo Kinh Doanh")
    
    draw_seq_msg(ax, xs[0], xs[1], 0.78, "1. Chọn khoảng thời gian báo cáo (Hôm nay / Tuần / Tháng)")
    draw_seq_msg(ax, xs[1], xs[2], 0.71, "2. Request GET /api/admin/reports/revenue?from=...&to=...")
    draw_seq_msg(ax, xs[2], xs[3], 0.64, "3. Gọi pipeline: $match -> $unwind -> $group -> $sort")
    draw_seq_msg(ax, xs[3], xs[4], 0.57, "4. Truy vấn tính tổng tiền và thống kê top món bán chạy")
    draw_seq_msg(ax, xs[4], xs[3], 0.50, "5. Trả về mảng dữ liệu phân tích", is_reply=True)
    draw_seq_msg(ax, xs[3], xs[2], 0.43, "6. Đóng gói kết quả doanh thu, đơn hàng, KPI", is_reply=True)
    draw_seq_msg(ax, xs[2], xs[1], 0.36, "7. Trả về JSON chứa số liệu biểu đồ", is_reply=True)
    draw_seq_msg(ax, xs[1], xs[0], 0.29, "8. Render biểu đồ trực quan (Cột, Đường, Tròn)")
    
    save_bw(fig, "Hinh_3_23_Sequence_Admin_DoanhThu.png")

# ==========================================
# 24. BIỂU ĐỒ TRẠNG THÁI VÒNG ĐỜI ĐƠN HÀNG (HÌNH 3.24)
# ==========================================
def gen_hinh_3_24():
    fig, ax = setup_canvas(9.5, 6)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    draw_boundary(ax, 0.05, 0.05, 0.90, 0.90, "Biểu Đồ Trạng Thái: Vòng Đời Đơn Hàng (Order State Machine)")
    
    def state_box(x, y, title, actions=""):
        w, h = 0.22, 0.11
        box = patches.FancyBboxPatch((x - w/2, y - h/2), w, h, boxstyle='round,pad=0.015,rounding_size=0.03',
                                     edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(box)
        ax.text(x, y + 0.02, title, ha='center', va='center', fontsize=9, fontweight='bold', color='black', zorder=4)
        if actions:
            ax.plot([x - w/2 + 0.01, x + w/2 - 0.01], [y, y], color='black', lw=0.8, zorder=4)
            ax.text(x, y - 0.03, actions, ha='center', va='center', fontsize=7.5, color='black', zorder=4)

    # Start
    start = patches.Circle((0.10, 0.72), 0.018, facecolor='black', edgecolor='black', zorder=4)
    ax.add_patch(start)
    
    state_box(0.28, 0.72, "Pending (Chờ thanh toán)", "entry: Giữ tồn kho\ndo: Đếm ngược VietQR")
    draw_assoc(ax, 0.118, 0.72, 0.17, 0.72, label="Đặt hàng", arrow='->')
    
    state_box(0.62, 0.72, "Paid (Đã thanh toán)", "entry: Xác nhận GD\ndo: Thông báo bếp")
    draw_assoc(ax, 0.39, 0.72, 0.51, 0.72, label="Quét VietQR thành công", arrow='->')
    
    state_box(0.62, 0.44, "Preparing (Đang nấu)", "entry: In phiếu bếp\ndo: Đầu bếp nấu món")
    draw_assoc(ax, 0.62, 0.665, 0.62, 0.495, label="Bếp nhận đơn", arrow='->')
    
    state_box(0.62, 0.20, "Delivering (Đang giao)", "entry: Giao Shipper\ndo: Di chuyển tới khách")
    draw_assoc(ax, 0.62, 0.385, 0.62, 0.255, label="Đóng gói xong", arrow='->')
    
    state_box(0.28, 0.20, "Delivered (Hoàn tất)", "entry: Khách nhận món\ndo: Mở tính năng đánh giá")
    draw_assoc(ax, 0.51, 0.20, 0.39, 0.20, label="Giao thành công", arrow='->')
    
    state_box(0.28, 0.44, "Cancelled (Đã hủy)", "entry: Hoàn trả tồn kho\ndo: Báo lý do hủy")
    draw_assoc(ax, 0.28, 0.665, 0.28, 0.495, label="Quá hạn / Hủy", arrow='->')
    
    # End node
    end_outer = patches.Circle((0.10, 0.20), 0.02, facecolor='white', edgecolor='black', lw=1.5, zorder=4)
    end_inner = patches.Circle((0.10, 0.20), 0.012, facecolor='black', edgecolor='black', zorder=5)
    ax.add_patch(end_outer)
    ax.add_patch(end_inner)
    draw_assoc(ax, 0.17, 0.20, 0.12, 0.20, arrow='->')
    draw_assoc(ax, 0.28, 0.385, 0.12, 0.21, arrow='->')
    
    save_bw(fig, "Hinh_3_24_State_DonHang.png")

# ==========================================
# 25. BIỂU ĐỒ LỚP MIỀN NGHIỆP VỤ (HÌNH 3.25)
# ==========================================
def gen_hinh_3_25():
    fig, ax = setup_canvas(10, 7.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    draw_boundary(ax, 0.04, 0.04, 0.92, 0.92, "Biểu Đồ Lớp Miền Nghiệp Vụ (Domain Class Model)")
    
    def uml_class(x, y, name, attrs, methods, w=0.25, h=0.24):
        rect = patches.Rectangle((x, y), w, h, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(rect)
        # Header
        ax.text(x + w/2, y + h - 0.03, name, ha='center', va='center', fontsize=9, fontweight='bold', color='black', zorder=4)
        ax.plot([x, x + w], [y + h - 0.05, y + h - 0.05], color='black', lw=1.0, zorder=4)
        # Attributes
        ay = y + h - 0.07
        for a in attrs:
            ax.text(x + 0.015, ay, a, ha='left', va='center', fontsize=7.5, color='black', zorder=4)
            ay -= 0.024
        # Divider
        ax.plot([x, x + w], [ay - 0.005, ay - 0.005], color='black', lw=1.0, zorder=4)
        # Methods
        my = ay - 0.024
        for m in methods:
            ax.text(x + 0.015, my, m, ha='left', va='center', fontsize=7.5, color='black', zorder=4)
            my -= 0.024

    uml_class(0.06, 0.65, "User", 
              ["- id: ObjectId", "- fullName: String", "- email: String", "- role: String"], 
              ["+ login(): Boolean", "+ updateProfile()", "+ getPermissions()"], 0.25, 0.24)
              
    uml_class(0.38, 0.65, "Product", 
              ["- id: ObjectId", "- name: String", "- price: Number", "- stock: Number", "- model3dUrl: String"], 
              ["+ checkStock(qty): Bool", "+ atomicDecStock(qty)", "+ updateRating()"], 0.26, 0.26)
              
    uml_class(0.70, 0.65, "Order", 
              ["- id: ObjectId", "- userId: ObjectId", "- totalAmount: Number", "- status: String"], 
              ["+ calculateTotal()", "+ applyVoucher(code)", "+ updateStatus(st)"], 0.25, 0.24)
              
    uml_class(0.06, 0.20, "Attendance", 
              ["- id: ObjectId", "- staffId: ObjectId", "- checkInTime: Date", "- gpsLat / Long: Num"], 
              ["+ verifyLocation(): Bool", "+ recordCheckOut()"], 0.25, 0.22)
              
    uml_class(0.38, 0.20, "Payroll", 
              ["- id: ObjectId", "- staffId: ObjectId", "- totalHours: Number", "- finalSalary: Number"], 
              ["+ syncAttendance()", "+ calculateSalary()", "+ exportPayslip()"], 0.26, 0.24)
              
    uml_class(0.70, 0.20, "Review", 
              ["- id: ObjectId", "- orderId: ObjectId", "- rating: Number", "- comment: String"], 
              ["+ submitReview()", "+ validateOrderDelivered()"], 0.25, 0.22)
              
    # Associations
    draw_assoc(ax, 0.31, 0.77, 0.38, 0.77, label="1..* xem 1..*", ls='-')
    draw_assoc(ax, 0.64, 0.77, 0.70, 0.77, label="1 chứa 1..*", ls='-')
    draw_assoc(ax, 0.18, 0.65, 0.18, 0.42, label="1 có 0..*", ls='-')
    draw_assoc(ax, 0.31, 0.31, 0.38, 0.31, label="tổng hợp", ls='--', arrow='->')
    draw_assoc(ax, 0.82, 0.65, 0.82, 0.42, label="1 tạo 0..1", ls='-')

    save_bw(fig, "Hinh_3_25_Class_Diagram.png")

# ==========================================
# 26. BIỂU ĐỒ CƠ SỞ DỮ LIỆU MONGODB (HÌNH 3.26)
# ==========================================
def gen_hinh_3_26():
    fig, ax = setup_canvas(10, 7.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    draw_boundary(ax, 0.04, 0.04, 0.92, 0.92, "Cấu Trúc Các Document Collection Trong MongoDB (Database Schema)")
    
    def mongo_coll(x, y, coll_name, fields, w=0.26, h=0.23):
        rect = patches.Rectangle((x, y), w, h, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(rect)
        hdr = patches.Rectangle((x, y + h - 0.045), w, 0.045, edgecolor='black', facecolor='#EEEEEE', lw=1.0, zorder=3)
        ax.add_patch(hdr)
        ax.text(x + w/2, y + h - 0.023, f"Collection: {coll_name}", ha='center', va='center', fontsize=8.5, fontweight='bold', color='black', zorder=4)
        
        fy = y + h - 0.07
        for f in fields:
            ax.text(x + 0.015, fy, f, ha='left', va='center', fontsize=7.5, color='black', zorder=4)
            fy -= 0.024

    mongo_coll(0.06, 0.67, "users", [
        "_id: ObjectId (PK)", "email: String (Indexed)", "passwordHash: String", 
        "role: Enum['customer', 'staff', 'admin']", "fullName: String", "createdAt: ISODate"
    ], 0.26, 0.22)
    
    mongo_coll(0.37, 0.67, "products", [
        "_id: ObjectId (PK)", "name: String (Indexed)", "price: Number", "stock: Number (Int32)", 
        "category: String", "model3dUrl: String (GLB)", "rating: Number", "numReviews: Number"
    ], 0.26, 0.24)
    
    mongo_coll(0.68, 0.67, "orders", [
        "_id: ObjectId (PK)", "userId: ObjectId (FK)", "items: Array<OrderItem>", 
        "totalAmount: Number", "paymentMethod: String", "paymentStatus: String", "status: String (Indexed)"
    ], 0.26, 0.24)
    
    mongo_coll(0.06, 0.24, "attendances", [
        "_id: ObjectId (PK)", "staffId: ObjectId (FK)", "checkInTime: ISODate", 
        "checkOutTime: ISODate", "workHours: Number", "gpsLatitude / Longitude: Number", "verified: Boolean"
    ], 0.26, 0.24)
    
    mongo_coll(0.37, 0.24, "payrolls", [
        "_id: ObjectId (PK)", "staffId: ObjectId (FK)", "monthYear: String", 
        "totalWorkHours: Number", "hourlyRate: Number", "bonus: Number", "netSalary: Number", "isApproved: Boolean"
    ], 0.26, 0.25)
    
    mongo_coll(0.68, 0.24, "reviews", [
        "_id: ObjectId (PK)", "userId: ObjectId (FK)", "productId: ObjectId (FK)", 
        "orderId: ObjectId (FK)", "rating: Number (1-5)", "comment: String", "images: Array<String>"
    ], 0.26, 0.24)
    
    # DB Relations
    draw_assoc(ax, 0.32, 0.78, 0.37, 0.78, ls='--', arrow='->')
    draw_assoc(ax, 0.63, 0.78, 0.68, 0.78, ls='--', arrow='->')
    draw_assoc(ax, 0.19, 0.67, 0.19, 0.48, ls='--', arrow='->')
    draw_assoc(ax, 0.32, 0.36, 0.37, 0.36, ls='--', arrow='->')
    draw_assoc(ax, 0.81, 0.67, 0.81, 0.48, ls='--', arrow='->')

    save_bw(fig, "Hinh_3_26_MongoDB_Schema.png")

# ==========================================
# 27. BIỂU ĐỒ THÀNH PHẦN KIẾN TRÚC (HÌNH 3.27)
# ==========================================
def gen_hinh_3_27():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    draw_boundary(ax, 0.04, 0.04, 0.92, 0.92, "Biểu Đồ Thành Phần Kiến Trúc Hệ Thống (Component Diagram)")
    
    def comp(x, y, name, details, w=0.24, h=0.18):
        rect = patches.Rectangle((x, y), w, h, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(rect)
        # 2 port tabs
        p1 = patches.Rectangle((x - 0.015, y + h - 0.05), 0.03, 0.025, edgecolor='black', facecolor='white', lw=1.0, zorder=4)
        p2 = patches.Rectangle((x - 0.015, y + h - 0.09), 0.03, 0.025, edgecolor='black', facecolor='white', lw=1.0, zorder=4)
        ax.add_patch(p1); ax.add_patch(p2)
        ax.text(x + w/2, y + h - 0.035, f"<<component>>\n{name}", ha='center', va='center', fontsize=8.5, fontweight='bold', color='black', zorder=5)
        ax.text(x + w/2, y + 0.045, details, ha='center', va='center', fontsize=7.5, color='black', zorder=5)

    comp(0.08, 0.65, "Frontend SPA", "React 19 + TypeScript\nVite + Tailwind CSS\nGoogle Model-Viewer 3D", 0.25, 0.22)
    comp(0.42, 0.65, "API Gateway", "Express.js REST Engine\nJWT Auth & Masking\nRate Limiter & CORS", 0.25, 0.22)
    comp(0.74, 0.65, "Core Services", "Order & Inventory Service\nPayroll & Geo Service\nVoucher Engine", 0.22, 0.22)
    
    comp(0.08, 0.16, "VietQR Service", "Banking Webhook Listener\nDynamic QR Generator\nTransaction Reconcile", 0.25, 0.20)
    comp(0.42, 0.16, "Database Layer", "MongoDB Community Server\nMongoose ODM Models\nAtomic Transactions", 0.25, 0.20)
    comp(0.74, 0.16, "Storage / Assets", "Static 3D GLB Files\nFood Product Media\nPayslip Documents", 0.22, 0.20)
    
    # Connectors
    draw_assoc(ax, 0.33, 0.76, 0.42, 0.76, label="HTTPS / JSON", ls='-', arrow='->')
    draw_assoc(ax, 0.67, 0.76, 0.74, 0.76, label="Internal Call", ls='-', arrow='->')
    draw_assoc(ax, 0.20, 0.65, 0.20, 0.36, label="Payment Intent", ls='--', arrow='->')
    draw_assoc(ax, 0.54, 0.65, 0.54, 0.36, label="Mongoose Connection", ls='-', arrow='->')
    draw_assoc(ax, 0.85, 0.65, 0.85, 0.36, label="Static Fetch", ls='--', arrow='->')

    save_bw(fig, "Hinh_3_27_Component_Diagram.png")

# ==========================================
# 28. BIỂU ĐỒ TRIỂN KHAI HỆ THỐNG (HÌNH 3.28)
# ==========================================
def gen_hinh_3_28():
    fig, ax = setup_canvas(10, 6.5)
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    draw_boundary(ax, 0.04, 0.04, 0.92, 0.92, "Biểu Đồ Triển Khai Hệ Thống (Deployment Diagram)")
    
    def node_3d(x, y, w, h, name, desc=""):
        rect = patches.Rectangle((x, y), w, h, edgecolor='black', facecolor='white', lw=1.3, zorder=3)
        ax.add_patch(rect)
        # 3D isometric roof
        dx, dy = 0.02, 0.025
        roof = patches.Polygon([[x, y+h], [x+dx, y+h+dy], [x+w+dx, y+h+dy], [x+w, y+h]], edgecolor='black', facecolor='#F0F0F0', lw=1.2, zorder=2)
        side = patches.Polygon([[x+w, y], [x+w+dx, y+dy], [x+w+dx, y+h+dy], [x+w, y+h]], edgecolor='black', facecolor='#E0E0E0', lw=1.2, zorder=2)
        ax.add_patch(roof); ax.add_patch(side)
        ax.text(x + w/2, y + h - 0.035, f"<<device>>\n{name}", ha='center', va='center', fontsize=8.5, fontweight='bold', color='black', zorder=5)
        ax.text(x + w/2, y + 0.06, desc, ha='center', va='center', fontsize=7.5, color='black', zorder=5)

    node_3d(0.08, 0.52, 0.25, 0.34, "Client Device", "Web Browser (Chrome, Safari)\n<<artifact>>\nFoodVD React App (SPA)\nThree.js / Model-Viewer")
    node_3d(0.42, 0.52, 0.26, 0.34, "Application Server", "Node.js v20.x Runtime\n<<artifact>>\nExpress Server (Port 5000)\nAPI Gateway & Business Logic")
    node_3d(0.75, 0.52, 0.18, 0.34, "Database Server", "MongoDB 7.x Community\n<<artifact>>\nfoodvd_database\nCollections & B-Tree Indexes")
    
    node_3d(0.42, 0.08, 0.26, 0.28, "Payment Gateway Node", "VietQR Banking API\n<<artifact>>\nWebhook Listener (IPN)\nSecure HMAC Verification")
    
    # Deployment links
    draw_assoc(ax, 0.33, 0.69, 0.42, 0.69, label="TCP/IP (Port 5000)\nHTTPS / REST", ls='-', arrow='<->')
    draw_assoc(ax, 0.68, 0.69, 0.75, 0.69, label="TCP/IP (Port 27017)\nMongodb Protocol", ls='-', arrow='<->')
    draw_assoc(ax, 0.55, 0.52, 0.55, 0.36, label="HTTPS Webhook\nCallback", ls='-', arrow='<->')

    save_bw(fig, "Hinh_3_28_Deployment_Diagram.png")

print("Rendering all 28 B&W diagrams...")
gen_hinh_3_1()
gen_all_detail_usecases()
gen_hinh_3_14()
gen_hinh_3_15()
gen_hinh_3_16()
gen_hinh_3_17()
gen_hinh_3_18()
gen_hinh_3_19()
gen_hinh_3_20()
gen_hinh_3_21()
gen_hinh_3_22()
gen_hinh_3_23()
gen_hinh_3_24()
gen_hinh_3_25()
gen_hinh_3_26()
gen_hinh_3_27()
gen_hinh_3_28()
print("All 28 B&W UML Diagrams generated successfully!")
