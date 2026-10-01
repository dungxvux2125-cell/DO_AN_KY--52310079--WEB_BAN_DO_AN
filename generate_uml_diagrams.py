import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from pathlib import Path

# Setup Matplotlib style for crisp professional UML diagrams
plt.rcParams['font.family'] = 'Segoe UI'
plt.rcParams['font.size'] = 10
plt.rcParams['axes.edgecolor'] = '#334155'
plt.rcParams['axes.linewidth'] = 1.2

OUT_DIR = Path(r"c:\Users\Admin\Desktop\523100B\DOANTOTNGHIEP\diagrams")
OUT_DIR.mkdir(parents=True, exist_ok=True)

# Helper to save diagram
def save_chart(fig, filename):
    filepath = OUT_DIR / filename
    fig.savefig(filepath, dpi=300, bbox_inches='tight', facecolor='white')
    plt.close(fig)
    print(f"Saved: {filepath}")

# -------------------------------------------------------------
# 1. USE CASE TỔNG QUÁT (Hinh_3_1_UseCase_TongQuat.png)
# -------------------------------------------------------------
def make_usecase_general():
    fig, ax = plt.subplots(figsize=(13, 9))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 9)
    ax.axis('off')

    # System boundary
    rect = patches.FancyBboxPatch((2.6, 0.4), 7.8, 8.2, boxstyle="round,pad=0.2",
                                  ec="#0284c7", fc="#f0f9ff", lw=2, linestyle='--')
    ax.add_patch(rect)
    ax.text(6.5, 8.3, "HỆ THỐNG ĐẶT MÓN ĂN TRỰC TUYẾN FOODVD", ha='center', va='center',
            fontsize=13, fontweight='bold', color="#0369a1")

    # Actors
    def draw_actor(x, y, name, color="#b42318"):
        # Head
        circle = patches.Circle((x, y + 0.35), 0.18, ec=color, fc="#fee2e2", lw=2)
        ax.add_patch(circle)
        # Body
        ax.plot([x, x], [y + 0.17, y - 0.25], color=color, lw=2.5)
        # Arms
        ax.plot([x - 0.28, x + 0.28], [y + 0.05, y + 0.05], color=color, lw=2.5)
        # Legs
        ax.plot([x, x - 0.22], [y - 0.25, y - 0.65], color=color, lw=2.5)
        ax.plot([x, x + 0.22], [y - 0.25, y - 0.65], color=color, lw=2.5)
        # Label
        ax.text(x, y - 0.85, name, ha='center', va='center', fontsize=11, fontweight='bold', color="#1e293b")

    draw_actor(1.2, 7.0, "Khách vãng lai", color="#0284c7")
    draw_actor(1.2, 4.3, "Khách hàng\n(Đã đăng nhập)", color="#16a34a")
    draw_actor(11.8, 6.2, "Nhân viên\nvận hành", color="#d97706")
    draw_actor(11.8, 2.5, "Quản trị viên\n(Admin)", color="#dc2626")

    # Use cases
    use_cases = [
        (6.5, 7.6, "UC01: Xem thực đơn & Tìm kiếm món ăn"),
        (6.5, 6.8, "UC02: Trải nghiệm tương tác 3D món ăn"),
        (6.5, 6.0, "UC03: Đăng ký & Đăng nhập tài khoản"),
        (6.5, 5.2, "UC04: Quản lý giỏ hàng & Chọn Topping"),
        (6.5, 4.4, "UC05: Đặt hàng & Thanh toán (COD / VietQR)"),
        (6.5, 3.6, "UC06: Theo dõi đơn hàng & Đánh giá món"),
        (6.5, 2.8, "UC07: Quản lý đơn hàng & Trạng thái giao"),
        (6.5, 2.0, "UC08: Chấm công vào ca / tan ca"),
        (6.5, 1.2, "UC09: Quản lý thực đơn & Bảng lương nhân viên"),
        (6.5, 0.55, "UC10: Báo cáo doanh thu & Quản lý Voucher")
    ]

    for x, y, title in use_cases:
        ellipse = patches.FancyBboxPatch((x - 2.5, y - 0.28), 5.0, 0.56,
                                         boxstyle="round,pad=0.15", ec="#334155", fc="#ffffff", lw=1.5)
        ax.add_patch(ellipse)
        ax.text(x, y, title, ha='center', va='center', fontsize=9.5, fontweight='bold', color="#0f172a")

    # Associations
    def connect(x1, y1, x2, y2, color="#64748b"):
        ax.plot([x1, x2], [y1, y2], color=color, lw=1.3, linestyle='-')

    # Khách vãng lai
    connect(1.4, 7.0, 4.0, 7.6)
    connect(1.4, 7.0, 4.0, 6.8)
    connect(1.4, 7.0, 4.0, 6.0)

    # Khách hàng
    connect(1.4, 4.3, 4.0, 7.6)
    connect(1.4, 4.3, 4.0, 6.8)
    connect(1.4, 4.3, 4.0, 5.2)
    connect(1.4, 4.3, 4.0, 4.4)
    connect(1.4, 4.3, 4.0, 3.6)

    # Nhân viên
    connect(11.6, 6.2, 9.0, 7.6)
    connect(11.6, 6.2, 9.0, 2.8)
    connect(11.6, 6.2, 9.0, 2.0)

    # Admin
    connect(11.6, 2.5, 9.0, 1.2)
    connect(11.6, 2.5, 9.0, 0.55)
    connect(11.6, 2.5, 9.0, 2.8)

    save_chart(fig, "Hinh_3_1_UseCase_TongQuat.png")

# -------------------------------------------------------------
# 2. USE CASE PHÂN HỆ KHÁCH HÀNG (Hinh_3_2_UseCase_KhachHang.png)
# -------------------------------------------------------------
def make_usecase_customer():
    fig, ax = plt.subplots(figsize=(12, 8))
    ax.set_xlim(0, 12)
    ax.set_ylim(0, 8)
    ax.axis('off')

    rect = patches.FancyBboxPatch((3.0, 0.5), 7.8, 7.0, boxstyle="round,pad=0.2",
                                  ec="#16a34a", fc="#f0fdf4", lw=2, linestyle='--')
    ax.add_patch(rect)
    ax.text(6.9, 7.2, "PHÂN HỆ KHÁCH HÀNG (CUSTOMER PORTAL)", ha='center', va='center',
            fontsize=12, fontweight='bold', color="#15803d")

    # Draw Actor
    ax.plot([1.2, 1.2], [4.5 + 0.17, 4.5 - 0.25], color="#16a34a", lw=2.5)
    ax.plot([1.2 - 0.28, 1.2 + 0.28], [4.5 + 0.05, 4.5 + 0.05], color="#16a34a", lw=2.5)
    ax.plot([1.2, 1.2 - 0.22], [4.5 - 0.25, 4.5 - 0.65], color="#16a34a", lw=2.5)
    ax.plot([1.2, 1.2 + 0.22], [4.5 - 0.25, 4.5 - 0.65], color="#16a34a", lw=2.5)
    circle = patches.Circle((1.2, 4.5 + 0.35), 0.18, ec="#16a34a", fc="#dcfce7", lw=2)
    ax.add_patch(circle)
    ax.text(1.2, 3.6, "Khách hàng", ha='center', va='center', fontsize=11, fontweight='bold', color="#166534")

    ucs = [
        (6.0, 6.4, "Xem thực đơn & Bộ lọc món", "#ffffff"),
        (6.0, 5.3, "Xem mô hình 3D tương tác", "#ffffff"),
        (6.0, 4.2, "Thêm món vào giỏ hàng", "#ffffff"),
        (9.5, 4.2, "<<extend>>\nChọn Topping", "#fef3c7"),
        (6.0, 3.1, "Áp dụng mã giảm giá Voucher", "#ffffff"),
        (6.0, 2.0, "Đặt hàng & Thanh toán", "#ffffff"),
        (9.5, 2.0, "<<include>>\nTrừ tồn kho Atomic", "#fee2e2"),
        (6.0, 1.0, "Đánh giá sao & Bình luận món", "#ffffff"),
    ]

    for x, y, title, bg in ucs:
        w = 3.6 if "extend" not in title and "include" not in title else 2.6
        box = patches.FancyBboxPatch((x - w/2, y - 0.32), w, 0.64,
                                     boxstyle="round,pad=0.1", ec="#334155", fc=bg, lw=1.4)
        ax.add_patch(box)
        ax.text(x, y, title, ha='center', va='center', fontsize=9, fontweight='bold', color="#0f172a")

    # Connects
    for y in [6.4, 5.3, 4.2, 3.1, 2.0, 1.0]:
        ax.plot([1.4, 4.2], [4.5, y], color="#15803d", lw=1.2)

    # Include / Extend lines
    ax.annotate("", xy=(8.2, 4.2), xytext=(7.8, 4.2),
                arrowprops=dict(arrowstyle="->", color="#b45309", lw=1.5, linestyle="--"))
    ax.annotate("", xy=(8.2, 2.0), xytext=(7.8, 2.0),
                arrowprops=dict(arrowstyle="->", color="#b91c1c", lw=1.5, linestyle="--"))

    save_chart(fig, "Hinh_3_2_UseCase_KhachHang.png")

# -------------------------------------------------------------
# 3. USE CASE PHÂN HỆ ADMIN & NHÂN VIÊN (Hinh_3_3_UseCase_Admin_NhanVien.png)
# -------------------------------------------------------------
def make_usecase_admin_staff():
    fig, ax = plt.subplots(figsize=(13, 8))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 8)
    ax.axis('off')

    rect = patches.FancyBboxPatch((3.2, 0.4), 6.6, 7.2, boxstyle="round,pad=0.2",
                                  ec="#d97706", fc="#fffbeb", lw=2, linestyle='--')
    ax.add_patch(rect)
    ax.text(6.5, 7.3, "PHÂN HỆ QUẢN TRỊ & VẬN HÀNH (ADMIN & STAFF)", ha='center', va='center',
            fontsize=12, fontweight='bold', color="#92400e")

    # Staff Actor
    ax.plot([1.4, 1.4], [5.5 + 0.17, 5.5 - 0.25], color="#d97706", lw=2.5)
    ax.plot([1.4 - 0.28, 1.4 + 0.28], [5.5 + 0.05, 5.5 + 0.05], color="#d97706", lw=2.5)
    ax.plot([1.4, 1.4 - 0.22], [5.5 - 0.25, 5.5 - 0.65], color="#d97706", lw=2.5)
    ax.plot([1.4, 1.4 + 0.22], [5.5 - 0.25, 5.5 - 0.65], color="#d97706", lw=2.5)
    circle = patches.Circle((1.4, 5.5 + 0.35), 0.18, ec="#d97706", fc="#fef3c7", lw=2)
    ax.add_patch(circle)
    ax.text(1.4, 4.6, "Nhân viên\nvận hành", ha='center', va='center', fontsize=11, fontweight='bold', color="#b45309")

    # Admin Actor
    ax.plot([1.4, 1.4], [2.2 + 0.17, 2.2 - 0.25], color="#dc2626", lw=2.5)
    ax.plot([1.4 - 0.28, 1.4 + 0.28], [2.2 + 0.05, 2.2 + 0.05], color="#dc2626", lw=2.5)
    ax.plot([1.4, 1.4 - 0.22], [2.2 - 0.25, 2.2 - 0.65], color="#dc2626", lw=2.5)
    ax.plot([1.4, 1.4 + 0.22], [2.2 - 0.25, 2.2 - 0.65], color="#dc2626", lw=2.5)
    circle = patches.Circle((1.4, 2.2 + 0.35), 0.18, ec="#dc2626", fc="#fee2e2", lw=2)
    ax.add_patch(circle)
    ax.text(1.4, 1.3, "Quản trị viên\n(Admin)", ha='center', va='center', fontsize=11, fontweight='bold', color="#991b1b")

    admin_ucs = [
        (6.5, 6.4, "Bật/Tắt trạng thái còn món (Staff)", "#ffffff"),
        (6.5, 5.4, "Cập nhật tiến trình đơn (Chờ duyệt -> Giao)", "#ffffff"),
        (6.5, 4.4, "Chấm công theo ca (Vào ca / Tan ca)", "#ffffff"),
        (6.5, 3.4, "Thêm món mới & Quản lý tồn kho (Admin)", "#ffffff"),
        (6.5, 2.4, "Quản lý lương & Đồng bộ chấm công (Admin)", "#ffffff"),
        (6.5, 1.4, "Xem báo cáo doanh thu & Món bán chạy", "#ffffff"),
        (6.5, 0.65, "Tạo & Quản lý mã giảm giá Voucher", "#ffffff")
    ]

    for x, y, title, bg in admin_ucs:
        box = patches.FancyBboxPatch((x - 2.6, y - 0.3), 5.2, 0.6,
                                     boxstyle="round,pad=0.1", ec="#334155", fc=bg, lw=1.4)
        ax.add_patch(box)
        ax.text(x, y, title, ha='center', va='center', fontsize=9.5, fontweight='bold', color="#0f172a")

    # Staff connects
    ax.plot([1.6, 3.9], [5.5, 6.4], color="#d97706", lw=1.2)
    ax.plot([1.6, 3.9], [5.5, 5.4], color="#d97706", lw=1.2)
    ax.plot([1.6, 3.9], [5.5, 4.4], color="#d97706", lw=1.2)

    # Admin connects
    ax.plot([1.6, 3.9], [2.2, 3.4], color="#dc2626", lw=1.2)
    ax.plot([1.6, 3.9], [2.2, 2.4], color="#dc2626", lw=1.2)
    ax.plot([1.6, 3.9], [2.2, 1.4], color="#dc2626", lw=1.2)
    ax.plot([1.6, 3.9], [2.2, 0.65], color="#dc2626", lw=1.2)

    save_chart(fig, "Hinh_3_3_UseCase_Admin_NhanVien.png")

# -------------------------------------------------------------
# 4. BIỂU ĐỒ HOẠT ĐỘNG: ĐẶT HÀNG & ATOMIC STOCK (Hinh_3_4_Activity_DatHang_Atomic.png)
# -------------------------------------------------------------
def make_activity_order_atomic():
    fig, ax = plt.subplots(figsize=(11, 10))
    ax.set_xlim(0, 11)
    ax.set_ylim(0, 11)
    ax.axis('off')

    # Start Node
    start = patches.Circle((5.5, 10.3), 0.22, ec="#0f172a", fc="#0f172a")
    ax.add_patch(start)
    ax.text(5.5, 10.7, "Bắt đầu đặt món", ha='center', va='center', fontsize=10, fontweight='bold')

    nodes = [
        (5.5, 9.4, "Khách hàng chọn món & chọn Topping", "action"),
        (5.5, 8.4, "Bấm 'Thêm vào giỏ' -> Kiểm tra đăng nhập?", "decision"),
        (8.5, 8.4, "Chuyển trang Login\nYêu cầu đăng nhập", "action_red"),
        (5.5, 7.3, "Cập nhật giỏ hàng & Áp mã Voucher", "action"),
        (5.5, 6.2, "Điền thông tin giao hàng & Chọn thanh toán (VietQR/COD)", "action"),
        (5.5, 5.0, "Nhấn 'Xác nhận đặt hàng' -> Gửi POST /api/orders", "action"),
        (5.5, 3.8, "Database thực thi Atomic Lock:\nfindOneAndUpdate({ stock >= quantity })", "action_blue"),
        (5.5, 2.5, "Tồn kho đủ điều kiện?", "decision"),
        (2.0, 2.5, "Thất bại (Hết hàng):\nKích hoạt Rollback bù trừ\nTrả mã HTTP 409", "action_red"),
        (5.5, 1.2, "Thành công: Trừ kho nguyên tử,\nLưu đơn hàng vào MongoDB", "action_green"),
        (5.5, 0.2, "Hiển thị thông báo thành công & Chuyển hướng", "end")
    ]

    for x, y, text, ntype in nodes:
        if ntype == "action":
            b = patches.FancyBboxPatch((x - 2.2, y - 0.35), 4.4, 0.7, boxstyle="round,pad=0.1", ec="#334155", fc="#f8fafc", lw=1.5)
            ax.add_patch(b)
            ax.text(x, y, text, ha='center', va='center', fontsize=9, fontweight='bold')
        elif ntype == "decision":
            d = patches.Polygon([[x, y + 0.45], [x + 1.4, y], [x, y - 0.45], [x - 1.4, y]], ec="#d97706", fc="#fef3c7", lw=1.8)
            ax.add_patch(d)
            ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color="#b45309")
        elif ntype == "action_red":
            b = patches.FancyBboxPatch((x - 1.5, y - 0.35), 3.0, 0.7, boxstyle="round,pad=0.1", ec="#b91c1c", fc="#fee2e2", lw=1.5)
            ax.add_patch(b)
            ax.text(x, y, text, ha='center', va='center', fontsize=8.5, fontweight='bold', color="#991b1b")
        elif ntype == "action_green":
            b = patches.FancyBboxPatch((x - 2.2, y - 0.35), 4.4, 0.7, boxstyle="round,pad=0.1", ec="#15803d", fc="#dcfce7", lw=1.5)
            ax.add_patch(b)
            ax.text(x, y, text, ha='center', va='center', fontsize=9, fontweight='bold', color="#166534")
        elif ntype == "action_blue":
            b = patches.FancyBboxPatch((x - 2.3, y - 0.38), 4.6, 0.76, boxstyle="round,pad=0.1", ec="#0284c7", fc="#e0f2fe", lw=2)
            ax.add_patch(b)
            ax.text(x, y, text, ha='center', va='center', fontsize=9, fontweight='bold', color="#0369a1")
        elif ntype == "end":
            end_outer = patches.Circle((x, y), 0.24, ec="#0f172a", fc="none", lw=1.8)
            end_inner = patches.Circle((x, y), 0.16, ec="#0f172a", fc="#0f172a")
            ax.add_patch(end_outer)
            ax.add_patch(end_inner)
            ax.text(x + 2.5, y, text, ha='left', va='center', fontsize=9, fontweight='bold')

    # Arrows
    def arrow(x1, y1, x2, y2, label=""):
        ax.annotate("", xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="-|>", color="#334155", lw=1.6))
        if label:
            mx, my = (x1 + x2)/2, (y1 + y2)/2
            ax.text(mx + 0.15, my, label, fontsize=8.5, fontweight='bold', color="#b91c1c")

    arrow(5.5, 10.08, 5.5, 9.75)
    arrow(5.5, 9.05, 5.5, 8.85)
    arrow(6.9, 8.4, 7.0, 8.4, "Chưa")
    arrow(5.5, 7.95, 5.5, 7.65, "Đã ĐN")
    arrow(5.5, 6.95, 5.5, 6.55)
    arrow(5.5, 5.85, 5.5, 5.38)
    arrow(5.5, 4.62, 5.5, 4.18)
    arrow(5.5, 3.42, 5.5, 2.95)
    arrow(4.1, 2.5, 3.5, 2.5, "Không đủ (<=0)")
    arrow(5.5, 2.05, 5.5, 1.55, "Đủ stock (>=1)")
    arrow(5.5, 0.85, 5.5, 0.44)

    save_chart(fig, "Hinh_3_4_Activity_DatHang_Atomic.png")

# -------------------------------------------------------------
# 5. BIỂU ĐỒ TRÌNH TỰ: TRANH CHẤP RACE CONDITION (Hinh_3_5_Sequence_RaceCondition.png)
# -------------------------------------------------------------
def make_sequence_race_condition():
    fig, ax = plt.subplots(figsize=(13, 9))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 9)
    ax.axis('off')

    ax.text(6.5, 8.7, "BIỂU ĐỒ TRÌNH TỰ: GIẢI QUYẾT TRANH CHẤP ĐẶT HÀNG ĐỒNG THỜI (RACE CONDITION)",
            ha='center', va='center', fontsize=12, fontweight='bold', color="#0f172a")

    lifelines = [
        (1.5, "Khách hàng A\n(Người mua 1)"),
        (4.5, "Khách hàng B\n(Người mua 2)"),
        (7.5, "Backend Server\n(Express API)"),
        (10.8, "Database\n(MongoDB WiredTiger)")
    ]

    for x, title in lifelines:
        b = patches.FancyBboxPatch((x - 1.2, 7.7), 2.4, 0.7, boxstyle="round,pad=0.1", ec="#1e293b", fc="#e2e8f0", lw=1.5)
        ax.add_patch(b)
        ax.text(x, 8.05, title, ha='center', va='center', fontsize=9.5, fontweight='bold')
        ax.plot([x, x], [7.7, 0.5], color="#94a3b8", lw=1.5, linestyle='--')

    # Sequence Messages
    steps = [
        # Khách A và B cùng bấm đặt
        (1.5, 7.5, 7.2, "1: POST /api/orders (Mua món X, SL=1)", "#0284c7"),
        (4.5, 7.5, 6.7, "2: POST /api/orders (Mua món X, SL=1) [Chậm 0.001s]", "#d97706"),
        # Server gọi Mongo cho A
        (7.5, 10.8, 6.2, "3: findOneAndUpdate({ id: X, stock: {\\$gte: 1} }, {\\$inc: {stock: -1}})", "#0284c7"),
        # Mongo lock và trả cho A
        (10.8, 7.5, 5.5, "4: Trả về dish (stock từ 1 -> 0 thành công)", "#16a34a", True),
        # Server gọi Mongo cho B
        (7.5, 10.8, 4.8, "5: findOneAndUpdate({ id: X, stock: {\\$gte: 1} }, {\\$inc: {stock: -1}})", "#d97706"),
        # Mongo từ chối B
        (10.8, 7.5, 4.1, "6: Trả về null (stock hiện tại = 0, điều kiện SAI)", "#dc2626", True),
        # Server kích hoạt rollback nếu có và trả về A & B
        (7.5, 1.5, 3.3, "7: HTTP 201 Created (Đặt hàng thành công)", "#16a34a", True),
        (7.5, 4.5, 2.3, "8: HTTP 409 Conflict ('Món X vừa hết do có khách đặt trước')", "#dc2626", True),
        (4.5, 4.5, 1.3, "9: Hiển thị cảnh báo & Tự cập nhật 'Tạm hết món'", "#991b1b")
    ]

    for item in steps:
        if len(item) == 5:
            x1, x2, y, text, col = item
            is_dash = False
        else:
            x1, x2, y, text, col, is_dash = item

        ls = '--' if is_dash else '-'
        if x1 == x2: # Self call
            ax.annotate("", xy=(x1, y - 0.35), xytext=(x1, y),
                        arrowprops=dict(arrowstyle="->", color=col, lw=1.5))
            ax.text(x1 + 0.15, y - 0.18, text, fontsize=8.5, fontweight='bold', color=col)
        else:
            ax.annotate("", xy=(x2, y), xytext=(x1, y),
                        arrowprops=dict(arrowstyle="-|>", color=col, lw=1.6, linestyle=ls))
            ax.text((x1 + x2)/2, y + 0.14, text, ha='center', va='bottom', fontsize=8.5, fontweight='bold', color=col)

    # Highlight Atomic Critical section box
    crit_box = patches.FancyBboxPatch((6.8, 3.8), 4.8, 2.8, boxstyle="round,pad=0.1",
                                      ec="#2563eb", fc="#eff6ff", lw=1.8, linestyle=':')
    ax.add_patch(crit_box)
    ax.text(9.2, 6.4, "CRITICAL SECTION (Atomic Lock WiredTiger)", ha='center', va='center',
            fontsize=8.5, fontweight='bold', color="#1d4ed8")

    save_chart(fig, "Hinh_3_5_Sequence_RaceCondition.png")

# -------------------------------------------------------------
# 6. BIỂU ĐỒ LỚP MIỀN NGHIỆP VỤ (Hinh_3_6_Class_Diagram.png)
# -------------------------------------------------------------
def make_class_diagram():
    fig, ax = plt.subplots(figsize=(14, 10))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 10)
    ax.axis('off')

    ax.text(7.0, 9.7, "BIỂU ĐỒ LỚP MIỀN NGHIỆP VỤ (DOMAIN CLASS MODEL) - FOODVD",
            ha='center', va='center', fontsize=13, fontweight='bold', color="#0f172a")

    def draw_class(x, y, w, h, name, attrs, methods, color="#1e293b", bg="#f8fafc"):
        # Header
        h_head = 0.55
        h_attr = len(attrs) * 0.28 + 0.15
        h_op = len(methods) * 0.28 + 0.15
        total_h = h_head + h_attr + h_op

        rect = patches.FancyBboxPatch((x, y - total_h), w, total_h, boxstyle="square,pad=0",
                                      ec=color, fc=bg, lw=1.6)
        ax.add_patch(rect)
        # Header box
        head_box = patches.Rectangle((x, y - h_head), w, h_head, ec=color, fc="#e2e8f0", lw=1.6)
        ax.add_patch(head_box)
        ax.text(x + w/2, y - h_head/2, name, ha='center', va='center', fontsize=10, fontweight='bold')

        # Attributes
        curr_y = y - h_head - 0.22
        for a in attrs:
            ax.text(x + 0.15, curr_y, a, fontsize=8.2, va='center', fontfamily='monospace')
            curr_y -= 0.28

        # Divider
        ax.plot([x, x + w], [y - h_head - h_attr, y - h_head - h_attr], color=color, lw=1.2)

        # Methods
        curr_y = y - h_head - h_attr - 0.22
        for m in methods:
            ax.text(x + 0.15, curr_y, m, fontsize=8.2, va='center', fontfamily='monospace')
            curr_y -= 0.28

    # Classes
    draw_class(0.6, 9.0, 3.2, 0, "User",
               ["+ id: string", "+ name: string", "+ email: string", "+ password: string", "+ role: Role", "+ createdAt: Date"],
               ["+ login(): bool", "+ register(): bool", "+ updateProfile()"])

    draw_class(4.6, 9.0, 3.8, 0, "Dish (Sản phẩm)",
               ["+ id: number", "+ name: string", "+ category: string", "+ price: number", "+ promoPrice: number",
                "+ stock: number", "+ rating: number", "+ reviewsCount: number", "+ available: boolean", "+ toppings: string[]"],
               ["+ updateStock(qty: number)", "+ toggleAvailable()", "+ calculateRating()", "+ addReview()"])

    draw_class(9.4, 9.0, 3.8, 0, "Order (Đơn hàng)",
               ["+ id: string", "+ customerName: string", "+ phoneMasked: string", "+ addressMasked: string",
                "+ payment: PaymentMethod", "+ total: number", "+ status: OrderStatus", "+ items: CartItem[]"],
               ["+ advanceStatus()", "+ cancelOrder()", "+ verifyPayment()"])

    draw_class(0.6, 4.8, 3.2, 0, "StaffSalary (Bảng lương)",
               ["+ id: string", "+ name: string", "+ role: string", "+ shiftCount: number", "+ baseSalary: number",
                "+ bonus: number", "+ deduction: number"],
               ["+ calculateTotal(): number", "+ syncTimekeeping()", "+ updateSalary()"])

    draw_class(4.6, 4.8, 3.8, 0, "Timekeeping (Chấm công)",
               ["+ id: string", "+ staffId: string", "+ staffName: string", "+ date: string",
                "+ shift: string", "+ checkInTime: string", "+ checkOutTime: string", "+ status: string"],
               ["+ checkIn()", "+ checkOut()", "+ getWorkHours(): float"])

    draw_class(9.4, 4.8, 3.8, 0, "Review (Đánh giá)",
               ["+ id: string", "+ dishId: number", "+ userName: string", "+ userEmail: string",
                "+ rating: number (1..5)", "+ comment: string", "+ createdAt: string"],
               ["+ submitReview()", "+ validateComment()"])

    # Relationships Lines
    # User -> Order (1 - N)
    ax.annotate("", xy=(9.4, 7.2), xytext=(3.8, 7.2),
                arrowprops=dict(arrowstyle="->", color="#334155", lw=1.6))
    ax.text(4.0, 7.35, "1", fontsize=9, fontweight='bold')
    ax.text(9.2, 7.35, "0..*", fontsize=9, fontweight='bold')
    ax.text(6.6, 7.4, "tạo & quản lý", fontsize=8.5, ha='center', color="#475569")

    # Dish -> Order (N - N via CartItem)
    ax.plot([8.4, 9.4], [7.8, 7.8], color="#334155", lw=1.6)
    ax.text(8.5, 7.95, "1..*", fontsize=9, fontweight='bold')
    ax.text(9.2, 7.95, "1..*", fontsize=9, fontweight='bold')

    # Dish -> Review (1 - N)
    ax.annotate("", xy=(11.3, 5.0), xytext=(7.0, 6.2),
                arrowprops=dict(arrowstyle="->", color="#334155", lw=1.6))
    ax.text(8.5, 5.8, "1 : 0..* (được đánh giá)", fontsize=8.5, color="#475569")

    # Staff -> Timekeeping (1 - N)
    ax.annotate("", xy=(4.6, 3.2), xytext=(3.8, 3.2),
                arrowprops=dict(arrowstyle="->", color="#334155", lw=1.6))
    ax.text(4.2, 3.35, "1 : N", fontsize=8.5, color="#475569")

    save_chart(fig, "Hinh_3_6_Class_Diagram.png")

# -------------------------------------------------------------
# 7. SƠ ĐỒ CSDL MONGODB (Hinh_3_7_MongoDB_Schema.png)
# -------------------------------------------------------------
def make_mongodb_schema():
    fig, ax = plt.subplots(figsize=(14, 9))
    ax.set_xlim(0, 14)
    ax.set_ylim(0, 9)
    ax.axis('off')

    ax.text(7.0, 8.7, "THIẾT KẾ CƠ SỞ DỮ LIỆU MONGODB (COLLECTIONS SCHEMA) - FOODVD",
            ha='center', va='center', fontsize=13, fontweight='bold', color="#0f172a")

    def draw_collection(x, y, w, name, fields, color="#059669"):
        h = len(fields) * 0.3 + 0.6
        rect = patches.FancyBboxPatch((x, y - h), w, h, boxstyle="round,pad=0.08",
                                      ec=color, fc="#f0fdf4", lw=1.8)
        ax.add_patch(rect)
        # Header
        head = patches.FancyBboxPatch((x, y - 0.5), w, 0.5, boxstyle="round,pad=0.08",
                                      ec=color, fc=color, lw=1.8)
        ax.add_patch(head)
        ax.text(x + w/2, y - 0.25, f"📦 Collection: {name}", ha='center', va='center',
                fontsize=9.5, fontweight='bold', color="white")

        curr_y = y - 0.75
        for field in fields:
            ax.text(x + 0.15, curr_y, field, fontsize=8.2, va='center', fontfamily='monospace', color="#1e293b")
            curr_y -= 0.3

    draw_collection(0.6, 8.0, 3.8, "users",
                    ["_id: ObjectId (PK)", "name: String", "email: String (Index, Unique)",
                     "password: String", "role: 'customer'|'staff'|'admin'", "createdAt: Date"])

    draw_collection(5.0, 8.0, 4.2, "dishes",
                    ["_id: ObjectId (PK)", "id: Number (Index, Unique)", "name: String",
                     "category: String", "price: Number", "promoPrice: Number",
                     "stock: Number (Atomic Checked)", "rating: Number (Avg Stars)",
                     "reviewsCount: Number", "available: Boolean", "toppings: Array<String>"])

    draw_collection(9.8, 8.0, 3.8, "orders",
                    ["_id: ObjectId (PK)", "id: String (FVD-XXXXXX)", "customerName: String",
                     "phoneMasked: String", "addressMasked: String", "payment: 'COD'|'VietQR'",
                     "total: Number", "status: OrderStatus", "items: Array<CartItem>", "createdAt: String"])

    draw_collection(0.6, 4.2, 3.8, "vouchers",
                    ["_id: ObjectId (PK)", "code: String (Index, Unique)", "label: String",
                     "type: 'percent'|'fixed'", "value: Number", "min: Number", "active: Boolean"])

    draw_collection(5.0, 4.2, 4.2, "reviews",
                    ["_id: ObjectId (PK)", "id: String", "dishId: Number (Index)",
                     "userName: String", "userEmail: String", "rating: Number (1..5)",
                     "comment: String", "createdAt: String"])

    draw_collection(9.8, 4.2, 3.8, "timekeepings",
                    ["_id: ObjectId (PK)", "id: String", "staffId: String", "staffName: String",
                     "date: String (YYYY-MM-DD)", "shift: 'Sáng'|'Tối'", "checkInTime: String",
                     "checkOutTime: String", "status: 'Đang làm'|'Hoàn thành'"])

    save_chart(fig, "Hinh_3_7_MongoDB_Schema.png")

# -------------------------------------------------------------
# 8. BIỂU ĐỒ KIẾN TRÚC THÀNH PHẦN & TRIỂN KHAI (Hinh_3_8_Component_Deployment.png)
# -------------------------------------------------------------
def make_component_deployment():
    fig, ax = plt.subplots(figsize=(13, 8))
    ax.set_xlim(0, 13)
    ax.set_ylim(0, 8)
    ax.axis('off')

    ax.text(6.5, 7.7, "BIỂU ĐỒ KIẾN TRÚC THÀNH PHẦN & TRIỂN KHAI (COMPONENT & DEPLOYMENT)",
            ha='center', va='center', fontsize=12, fontweight='bold', color="#0f172a")

    # Layer 1: Client Node
    node1 = patches.FancyBboxPatch((0.6, 1.2), 3.4, 5.8, boxstyle="round,pad=0.2",
                                   ec="#0284c7", fc="#f0f9ff", lw=2)
    ax.add_patch(node1)
    ax.text(2.3, 6.7, "<<device>>\nClient Browser\n(Google Chrome / Edge)", ha='center', va='center',
            fontsize=10, fontweight='bold', color="#0369a1")

    c1 = patches.Rectangle((0.9, 4.5), 2.8, 1.0, ec="#0284c7", fc="#ffffff", lw=1.5)
    ax.add_patch(c1)
    ax.text(2.3, 5.0, "<<component>>\nReact 19 + Vite Web App", ha='center', va='center', fontsize=9, fontweight='bold')

    c2 = patches.Rectangle((0.9, 3.1), 2.8, 1.0, ec="#0284c7", fc="#ffffff", lw=1.5)
    ax.add_patch(c2)
    ax.text(2.3, 3.6, "<<component>>\n3D Engine (Model-Viewer)", ha='center', va='center', fontsize=9, fontweight='bold')

    c3 = patches.Rectangle((0.9, 1.7), 2.8, 1.0, ec="#0284c7", fc="#ffffff", lw=1.5)
    ax.add_patch(c3)
    ax.text(2.3, 2.2, "<<component>>\nLocal State & Cart Store", ha='center', va='center', fontsize=9, fontweight='bold')

    # Layer 2: Application Server Node
    node2 = patches.FancyBboxPatch((4.8, 1.2), 3.8, 5.8, boxstyle="round,pad=0.2",
                                   ec="#16a34a", fc="#f0fdf4", lw=2)
    ax.add_patch(node2)
    ax.text(6.7, 6.7, "<<execution environment>>\nNode.js v24 Server\n(Port 5000)", ha='center', va='center',
            fontsize=10, fontweight='bold', color="#15803d")

    s1 = patches.Rectangle((5.2, 4.7), 3.0, 0.9, ec="#16a34a", fc="#ffffff", lw=1.5)
    ax.add_patch(s1)
    ax.text(6.7, 5.15, "<<component>>\nExpress REST API Server", ha='center', va='center', fontsize=9, fontweight='bold')

    s2 = patches.Rectangle((5.2, 3.4), 3.0, 0.9, ec="#16a34a", fc="#ffffff", lw=1.5)
    ax.add_patch(s2)
    ax.text(6.7, 3.85, "<<component>>\nAtomic Stock Controller", ha='center', va='center', fontsize=9, fontweight='bold')

    s3 = patches.Rectangle((5.2, 2.0), 3.0, 1.0, ec="#16a34a", fc="#ffffff", lw=1.5)
    ax.add_patch(s3)
    ax.text(6.7, 2.5, "<<component>>\nMongoose ODM Layer", ha='center', va='center', fontsize=9, fontweight='bold')

    # Layer 3: Database Server Node
    node3 = patches.FancyBboxPatch((9.4, 1.2), 3.0, 5.8, boxstyle="round,pad=0.2",
                                   ec="#d97706", fc="#fffbeb", lw=2)
    ax.add_patch(node3)
    ax.text(10.9, 6.7, "<<database>>\nMongoDB v8.2 Server\n(Port 27017)", ha='center', va='center',
            fontsize=10, fontweight='bold', color="#b45309")

    d1 = patches.Rectangle((9.7, 4.3), 2.4, 1.4, ec="#d97706", fc="#ffffff", lw=1.5)
    ax.add_patch(d1)
    ax.text(10.9, 5.0, "<<engine>>\nWiredTiger\nDocument Lock Engine", ha='center', va='center', fontsize=9, fontweight='bold')

    d2 = patches.Rectangle((9.7, 2.2), 2.4, 1.4, ec="#d97706", fc="#ffffff", lw=1.5)
    ax.add_patch(d2)
    ax.text(10.9, 2.9, "<<storage>>\nFoodVD Database\n(Collections)", ha='center', va='center', fontsize=9, fontweight='bold')

    # Connections
    ax.annotate("", xy=(4.8, 5.0), xytext=(3.7, 5.0),
                arrowprops=dict(arrowstyle="<->", color="#334155", lw=2))
    ax.text(4.25, 5.25, "HTTP / JSON\nCORS API", ha='center', fontsize=8, fontweight='bold')

    ax.annotate("", xy=(9.4, 3.8), xytext=(8.6, 3.8),
                arrowprops=dict(arrowstyle="<->", color="#334155", lw=2))
    ax.text(9.0, 4.05, "TCP 27017\nMongoose", ha='center', fontsize=8, fontweight='bold')

    save_chart(fig, "Hinh_3_8_Component_Deployment.png")

# Execute all generator functions
if __name__ == "__main__":
    print("Generating all UML diagram images...")
    make_usecase_general()
    make_usecase_customer()
    make_usecase_admin_staff()
    make_activity_order_atomic()
    make_sequence_race_condition()
    make_class_diagram()
    make_mongodb_schema()
    make_component_deployment()
    print("ALL DIAGRAMS GENERATED SUCCESSFULLY!")
