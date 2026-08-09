import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

export function NewArrivalShowcase({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="page-shell pb-16 sm:pb-24" aria-labelledby="new-arrivals-heading">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-xl">
        <p className="editorial-kicker">Vừa hoàn thiện</p>
          <h2 id="new-arrivals-heading" className="mt-3 font-serif text-4xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-6xl">Những thiết kế <span className="italic text-accent">mới.</span></h2>
        </div>
        <Link href="/products?sort=newest" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover">Xem tất cả <ArrowRight /></Link>
      </div>
      <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {products.slice(0, 5).map((product, index) => (
          <div key={product.id} className={index === 0 ? "col-span-2 row-span-2" : "col-span-1"}>
            <ProductCard product={product} priority={index === 0} density={index === 0 ? "editorial" : "compact"} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function BestSellerRail({ products }: { products: Product[] }) {
  if (!products.length) return null;
  return (
    <section className="pb-16 sm:pb-24" aria-labelledby="best-seller-heading">
      <div className="page-shell">
        <h2 id="best-seller-heading" className="font-serif text-4xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-6xl">Được chọn <span className="italic text-accent">nhiều.</span></h2>
        <div className="mt-9 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-5 sm:gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div key={product.id} className="w-[78vw] max-w-[19rem] shrink-0 snap-start sm:w-[42vw] lg:w-[24vw]">
              <ProductCard product={product} density="compact" priority={index < 2} />
            </div>
          ))}
        </div>
        <Link href="/products?sort=bestseller" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover">Xem sản phẩm bán chạy <ArrowRight /></Link>
      </div>
    </section>
  );
}
