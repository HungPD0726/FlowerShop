import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Câu chuyện Lá & Hoa" };

export default function AboutPage() {
  return (
    <div>
      <section className="page-shell grid items-end gap-10 py-12 sm:py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="pb-4"><p className="eyebrow">Câu chuyện cửa hàng</p><h1 className="mt-4 font-serif text-6xl font-medium leading-[0.88] tracking-[-0.05em] text-ink sm:text-7xl">Chọn hoa theo người nhận, không theo khuôn mẫu.</h1><p className="mt-7 max-w-xl text-base leading-7 text-muted">Lá & Hoa xây dựng từng thiết kế từ dịp tặng, bảng màu và lời nhắn riêng. Mỗi bó hoa được hoàn thiện thủ công trước giờ giao.</p></div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl"><Image src="/images/campaign/atelier-story.png" alt="Nghệ nhân chuẩn bị một thiết kế hoa tại cửa hàng" fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /></div>
      </section>
      <section className="border-y border-line bg-surface"><div className="page-shell grid md:grid-cols-3"><Value number="01" title="Hoa theo mùa" text="Nguyên liệu được chọn theo chất lượng thực tế trong ngày." /><Value number="02" title="Phối riêng theo dịp" text="Bảng màu và dáng hoa được cân nhắc theo câu chuyện người gửi." /><Value number="03" title="Xác nhận thành phẩm" text="Cửa hàng gửi ảnh để khách kiểm tra thiết kế trước khi giao." /></div></section>
      <section className="page-shell py-16 text-center sm:py-24"><h2 className="mx-auto max-w-3xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-ink">Một lời nhắn tinh tế bắt đầu từ bó hoa phù hợp.</h2><Button asChild className="mt-8 gap-2"><Link href="/products">Chọn hoa <ArrowRight /></Link></Button></section>
    </div>
  );
}

function Value({ number, title, text }: { number: string; title: string; text: string }) {
  return <div className="border-b border-line p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:p-10"><span className="text-xs font-bold tracking-[0.14em] text-accent">{number}</span><h2 className="mt-7 font-serif text-3xl font-semibold text-ink">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{text}</p></div>;
}
