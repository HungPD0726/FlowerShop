import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, FlowerTulip, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Câu chuyện Chạm Hoa" };

const values = [
  { icon: FlowerTulip, title: "Chọn hoa theo mùa", text: "Nguyên liệu được chọn theo chất lượng thực tế trong ngày." },
  { icon: NotePencil, title: "Phối riêng theo dịp", text: "Bảng màu và dáng hoa được cân nhắc theo câu chuyện người gửi." },
  { icon: Camera, title: "Xác nhận thành phẩm", text: "Cửa hàng gửi ảnh để khách kiểm tra thiết kế trước khi giao." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="page-shell grid items-center gap-9 py-10 sm:py-16 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
        <div>
          <p className="editorial-kicker">Câu chuyện cửa hàng</p>
          <h1 className="mt-4 max-w-[10ch] font-serif text-5xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-7xl">Chọn hoa theo người nhận.</h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted">Chạm Hoa xây dựng từng thiết kế từ dịp tặng, bảng màu và lời nhắn riêng. Mỗi bó hoa được hoàn thiện thủ công trước giờ giao.</p>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-[28px] shadow-soft lg:aspect-[4/3]"><Image src="/images/campaign/atelier-blush.png" alt="Nghệ nhân chuẩn bị bó hoa hồng phấn tại bàn làm việc" fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /></div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="page-shell grid gap-0 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="flex items-center border-b border-line py-10 lg:border-b-0 lg:border-r lg:pr-12"><h2 className="font-serif text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-ink sm:text-5xl">Một bó hoa được làm như thế nào.</h2></div>
          <div className="py-3 lg:pl-12">
            {values.map(({ icon: Icon, title, text }) => <div key={title} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-7 last:border-b-0"><span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><Icon size={22} /></span><div><h3 className="font-serif text-2xl font-semibold text-ink">{title}</h3><p className="mt-2 text-sm leading-6 text-muted">{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 text-center sm:py-24"><h2 className="mx-auto max-w-3xl font-serif text-4xl font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl">Một lời nhắn tinh tế bắt đầu từ bó hoa phù hợp.</h2><Button asChild className="mt-8 gap-2"><Link href="/products">Chọn hoa <ArrowRight /></Link></Button></section>
    </div>
  );
}
