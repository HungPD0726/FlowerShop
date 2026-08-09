import Link from "next/link";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { BrandWordmark } from "@/components/brand/brand-wordmark";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="page-shell py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.7fr_0.7fr]">
          <div>
            <Link href="/" aria-label="Chạm Hoa, trang chủ"><BrandWordmark size="lg" showTagline={false} /></Link>
            <p className="mt-4 max-w-md text-sm leading-7 text-muted">Hoa tươi thiết kế thủ công cho những dịp cần một lời nhắn tinh tế.</p>
            <div className="mt-7 grid gap-3 text-sm text-ink">
              <a className="flex min-h-11 items-center gap-3 hover:text-accent" href="tel:19006789"><Phone className="text-accent" />1900 6789</a>
              <a className="flex min-h-11 items-center gap-3 hover:text-accent" href="mailto:contact@lahoa.vn"><EnvelopeSimple className="text-accent" />contact@lahoa.vn</a>
              <span className="flex items-start gap-3 py-3"><MapPin className="mt-0.5 shrink-0 text-accent" />123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh</span>
            </div>
          </div>

          <FooterNav title="Khám phá" label="Liên kết cửa hàng" links={[
            ["Cửa hàng", "/products"], ["Hoa sinh nhật", "/products?category=hoa-sinh-nhat"], ["Hoa tình yêu", "/products?category=hoa-tinh-yeu"], ["Về chúng tôi", "/about"], ["Liên hệ", "/contact"],
          ]} />
          <FooterNav title="Thông tin" label="Chính sách cửa hàng" links={[
            ["Giao hàng", "/policies/shipping"], ["Thanh toán", "/policies/payment"], ["Đổi trả", "/policies/return"],
          ]} />
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Chạm Hoa. Tất cả quyền được bảo lưu.</p>
          <p>Thiết kế hoa thủ công tại TP. Hồ Chí Minh.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterNav({ title, label, links }: { title: string; label: string; links: Array<[string, string]> }) {
  return <div><h2 className="text-sm font-bold text-ink">{title}</h2><nav className="mt-5 grid gap-1 text-sm text-muted" aria-label={label}>{links.map(([text, href]) => <Link key={href} className="flex min-h-10 items-center hover:text-accent" href={href}>{text}</Link>)}</nav></div>;
}
