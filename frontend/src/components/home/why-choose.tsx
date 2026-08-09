import { Camera, ClockCountdown, NotePencil, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

const services = [
  { icon: ClockCountdown, title: "Giao hoa 2 giờ", description: "Chọn ngày và khung giờ phù hợp khi đặt hoa." },
  { icon: ShieldCheck, title: "Hoa tươi mỗi ngày", description: "Nguyên liệu được kiểm tra trước khi thực hiện." },
  { icon: Camera, title: "Ảnh trước khi giao", description: "Duyệt thành phẩm thực tế trước lúc giao đi." },
  { icon: NotePencil, title: "Thiệp viết riêng", description: "Gửi lời nhắn hoặc chọn ẩn tên người gửi." },
];

export function WhyChoose() {
  return (
    <section className="border-y border-line bg-surface" aria-label="Dịch vụ tại Chạm Hoa">
      <div className="page-shell grid sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, title, description }) => (
          <div key={title} className="grid grid-cols-[2.75rem_1fr] gap-4 border-b border-line px-2 py-8 last:border-b-0 sm:px-6 sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:border-r lg:px-7 lg:last:border-r-0">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-soft text-accent"><Icon size={22} /></span>
            <div><h2 className="text-sm font-bold text-ink">{title}</h2><p className="mt-1 text-xs leading-5 text-muted">{description}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
