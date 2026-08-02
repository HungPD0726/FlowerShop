import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";

export const metadata = { title: "Liên hệ" };

export default function ContactPage() {
  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <header><p className="eyebrow">Chúng tôi ở đây</p><h1 className="mt-4 font-serif text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-7xl">Nói với chúng tôi về dịp tặng hoa.</h1><p className="mt-6 max-w-lg text-sm leading-7 text-muted">Liên hệ trực tiếp để được hỗ trợ về thiết kế, thời gian giao hoặc một đơn hàng đang xử lý.</p></header>
        <div className="divide-y divide-line border-y border-line">
          <ContactItem icon={<Phone />} label="Điện thoại" value="1900 6789" href="tel:19006789" />
          <ContactItem icon={<EnvelopeSimple />} label="Email" value="contact@lahoa.vn" href="mailto:contact@lahoa.vn" />
          <ContactItem icon={<MapPin />} label="Cửa hàng" value="123 Nguyễn Thị Minh Khai, Quận 1, TP. Hồ Chí Minh" />
        </div>
      </div>
    </div>
  );
}

function ContactItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = <><span className="text-accent">{icon}</span><span><span className="block text-xs font-bold uppercase tracking-[0.13em] text-muted">{label}</span><span className="mt-2 block font-serif text-2xl font-semibold text-ink">{value}</span></span></>;
  return href ? <a href={href} className="grid grid-cols-[2rem_1fr] gap-5 py-8 hover:bg-surface">{content}</a> : <div className="grid grid-cols-[2rem_1fr] gap-5 py-8">{content}</div>;
}
