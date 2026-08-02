import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="page-shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.8fr]">
          <div>
            <Link href="/" className="font-serif text-4xl font-semibold tracking-[-0.04em] text-ink">Lá & Hoa</Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">Hoa tươi thiết kế thủ công cho sinh nhật, tình yêu, khai trương và những dịp cần một lời nhắn tinh tế.</p>
            <div className="mt-7 grid gap-3 text-sm text-ink">
              <a className="flex items-start gap-3 hover:text-accent" href="tel:19006789"><Phone className="mt-0.5 text-accent" />1900 6789</a>
              <a className="flex items-start gap-3 hover:text-accent" href="mailto:contact@lahoa.vn"><EnvelopeSimple className="mt-0.5 text-accent" />contact@lahoa.vn</a>
              <span className="flex items-start gap-3"><MapPin className="mt-0.5 shrink-0 text-accent" />123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink">Khám phá</h2>
            <nav className="mt-5 grid gap-3 text-sm text-muted" aria-label="Liên kết cửa hàng">
              <Link className="hover:text-accent" href="/products">Cửa hàng</Link>
              <Link className="hover:text-accent" href="/products?category=hoa-sinh-nhat">Hoa sinh nhật</Link>
              <Link className="hover:text-accent" href="/products?category=hoa-tinh-yeu">Hoa tình yêu</Link>
              <Link className="hover:text-accent" href="/about">Câu chuyện Lá & Hoa</Link>
              <Link className="hover:text-accent" href="/contact">Liên hệ</Link>
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-bold text-ink">Thông tin</h2>
            <nav className="mt-5 grid gap-3 text-sm text-muted" aria-label="Chính sách cửa hàng">
              <Link className="hover:text-accent" href="/policies/shipping">Giao hàng</Link>
              <Link className="hover:text-accent" href="/policies/payment">Thanh toán</Link>
              <Link className="hover:text-accent" href="/policies/return">Đổi trả</Link>
            </nav>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lá & Hoa. Tất cả quyền được bảo lưu.</p>
          <p>Hoa tươi, thiết kế tại TP. Hồ Chí Minh.</p>
        </div>
      </div>
    </footer>
  );
}
