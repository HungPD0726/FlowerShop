import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function MeaningBanner() {
  return (
    <section className="page-shell pb-16 sm:pb-24" aria-labelledby="meaning-heading">
      <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[22rem_22rem]">
        <div className="relative min-h-[24rem] overflow-hidden rounded-[28px] bg-accent-soft lg:col-span-5 lg:row-span-2 lg:min-h-0">
          <Image
            src="/images/flower-meanings/peony.webp"
            alt="Hoa mẫu đơn hồng nở rộ"
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.025]"
          />
          <span className="absolute left-5 top-5 rounded-full border border-white/50 bg-surface/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur-md">
            Cẩm nang botanical
          </span>
        </div>

        <div className="relative flex min-h-[23rem] flex-col justify-between overflow-hidden rounded-[28px] bg-accent px-7 py-9 text-surface sm:px-10 lg:col-span-7 lg:min-h-0 lg:px-12">
          <span className="font-serif text-sm italic text-surface" aria-hidden="true">Hoa & thông điệp</span>
          <div>
            <h2 id="meaning-heading" className="max-w-[12ch] font-serif text-4xl font-medium leading-[0.9] tracking-[-0.045em] sm:text-5xl">
              Mỗi cánh hoa, <span className="italic text-[#f3c8c1]">một điều muốn nói.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-6 text-surface">
              Khám phá ý nghĩa văn hóa phổ biến của từng loài hoa, màu sắc và dịp tặng để chọn lời nhắn phù hợp hơn.
            </p>
          </div>
          <Link href="/flower-meanings" className="group mt-7 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-surface px-5 text-sm font-bold text-accent hover:-translate-y-0.5">
            Mở cẩm nang hoa <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-[0.88fr_1.12fr] gap-4 lg:col-span-7">
          <div className="relative min-h-[16rem] overflow-hidden rounded-[28px] bg-surface-muted lg:min-h-0">
            <Image
              src="/images/flower-meanings/lotus.webp"
              alt="Hoa sen hồng giữa những tán lá xanh"
              fill
              sizes="(max-width: 1024px) 44vw, 24vw"
              className="object-cover"
            />
          </div>
          <div className="relative min-h-[16rem] overflow-hidden rounded-[28px] bg-surface-muted lg:min-h-0">
            <Image
              src="/images/flower-meanings/tulip.webp"
              alt="Những bông tulip trong ánh sáng tự nhiên"
              fill
              sizes="(max-width: 1024px) 56vw, 34vw"
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/40 bg-surface/90 px-4 py-3 backdrop-blur-md">
              <p className="font-serif text-lg font-semibold leading-none text-ink">Chọn bằng cảm xúc</p>
              <p className="mt-1 text-[11px] leading-4 text-muted">Tình yêu · Biết ơn · Bình an</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
