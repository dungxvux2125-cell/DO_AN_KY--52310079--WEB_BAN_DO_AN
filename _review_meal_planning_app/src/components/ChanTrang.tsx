function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3>{title}</h3>
      {links.map((link) => (
        <p key={link}>{link}</p>
      ))}
    </div>
  )
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <FooterColumn title="FoodVD" links={["Về chúng tôi", "Hệ thống cửa hàng", "Tuyển dụng"]} />
        <FooterColumn title="Hỗ trợ" links={["Liên hệ", "Hướng dẫn đặt món", "Câu hỏi thường gặp"]} />
        <FooterColumn title="Chính sách" links={["Giao hàng", "Thanh toán", "Đổi trả", "Bảo mật"]} />
        <FooterColumn title="Tính năng" links={["VietQR", "Hóa đơn email", "AES-256", "Phân quyền nhân viên"]} />
      </div>
      <div className="footer-company">
        <div>
          <span className="brand-mark">F</span>
        </div>
        <div>
          <h3>Công ty Cổ phần Công nghệ FoodVD</h3>
          <p className="mt-4 footer-label">Trụ sở chính</p>
          <p>12 Nguyễn Huệ, Quận 1, TP.HCM, Việt Nam</p>
          <p className="mt-4 footer-label">Hotline</p>
          <p>0901 234 567 · support@foodvd.vn</p>
        </div>
        <div>
          <p className="footer-label">Văn phòng vận hành</p>
          <p>3/3 Duy Tân, Cầu Giấy, Hà Nội, Việt Nam</p>
          <p className="mt-4 footer-label">Kênh bán hàng</p>
          <p>sales@foodvd.vn</p>
        </div>
      </div>
      <p className="footer-copy">© 2026 FoodVD. Bảo lưu mọi quyền.</p>
    </footer>
  )
}
