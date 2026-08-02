import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Camera, ClockCountdown, NotePencil } from "@phosphor-icons/react/dist/ssr";
import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { productService } from "@/services/product.service";
import { Category, Product } from "@/types";

export const revalidate = 60;

export default async function HomePage() {
  let categories: Category[] = [];
  let featured: Product[] = [];
  let bestSellers: Product[] = [];

  try {
    const [categoryResponse, featuredResponse, bestResponse] = await Promise.all([
      productService.getCategories(),
      productService.getFeaturedProducts(),
      productService.getBestSellers(),
    ]);
    categories = categoryResponse.data || [];
    featured = featuredResponse.data || [];
    bestSellers = bestResponse.data || [];
  } catch {
    // The campaign content remains usable while product APIs recover.
  }

  return (
    <>
      <HeroBanner />
      <FeaturedCategories categories={categories} />

      {bestSellers.length > 0 && (
        <section className="section-space">
          <div className="page-shell">
            <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">Những bó hoa được chọn nhiều.</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.slice(0, 7).map((product, index) => (
                <div key={product.id} className={index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}>
                  <ProductCard product={product} priority={index === 0} density={index === 0 ? "editorial" : "compact"} />
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="mt-10 gap-2"><Link href="/products?sort=bestseller">Xem thêm <ArrowRight /></Link></Button>
          </div>
        </section>
      )}

      <section className="section-space border-y border-line bg-surface">
        <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="rounded-[1.5rem] bg-surface-muted p-2 shadow-soft">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
              <Image src="/images/campaign/atelier-story.png" alt="Nghệ nhân Lá & Hoa đang cắt tỉa và sắp xếp hoa" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
            </div>
          </div>
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">Mỗi bó hoa bắt đầu từ người nhận.</h2>
            <p className="mt-6 text-base leading-7 text-muted">Chúng tôi chọn hoa trong ngày, phối màu theo dịp và hoàn thiện từng chi tiết trước giờ giao.</p>
            <Button asChild variant="outline" className="mt-7 gap-2"><Link href="/about">Về Lá & Hoa <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="section-space overflow-hidden">
          <div className="page-shell">
            <h2 className="font-serif text-4xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">Bộ sưu tập đang có tại cửa hàng.</h2>
            <div className="-mr-4 mt-9 flex snap-x gap-5 overflow-x-auto pb-6 pr-4 sm:-mr-6 sm:pr-6 lg:mr-0 lg:pr-0">
              {featured.slice(0, 8).map((product) => (
                <div key={product.id} className="w-[78vw] max-w-[22rem] shrink-0 snap-start sm:w-[42vw] lg:w-[24vw]">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-line bg-surface">
        <div className="page-shell grid md:grid-cols-3">
          <ServiceItem icon={<ClockCountdown size={28} weight="light" />} title="Giao hoa trong 2 giờ" description="Áp dụng tại khu vực nội thành TP.HCM và Hà Nội." />
          <ServiceItem icon={<Camera size={28} weight="light" />} title="Xác nhận trước khi giao" description="Nhận ảnh thành phẩm để kiểm tra thiết kế của bạn." />
          <ServiceItem icon={<NotePencil size={28} weight="light" />} title="Thiệp viết riêng" description="Thêm lời nhắn miễn phí cho từng người nhận." />
        </div>
      </section>
    </>
  );
}

function ServiceItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="border-b border-line px-6 py-9 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 lg:px-10">
      <div className="text-accent">{icon}</div>
      <h3 className="mt-5 text-sm font-bold text-ink">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-muted">{description}</p>
    </div>
  );
}
