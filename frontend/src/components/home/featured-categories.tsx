import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Category } from "@/types";

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  const items = categories.filter((category) => category.isActive).slice(0, 5);
  if (!items.length) return null;

  return (
    <section className="section-space" aria-labelledby="category-heading">
      <div className="page-shell">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="category-heading" className="max-w-2xl font-serif text-4xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-6xl">
            Hoa cho từng <span className="italic text-accent">dịp muốn nhớ.</span>
          </h2>
          <p className="max-w-xs text-sm leading-6 text-muted">Bắt đầu từ khoảnh khắc bạn muốn chúc mừng, sẻ chia hoặc nói lời cảm ơn.</p>
        </div>
        <div className="mt-9 grid auto-rows-[13rem] grid-cols-2 gap-3 sm:auto-rows-[15rem] lg:grid-cols-4 lg:gap-4">
          {items.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`group relative overflow-hidden rounded-[20px] bg-surface-muted ${index === 0 ? "col-span-2 row-span-2" : "col-span-1"} ${index === 3 ? "lg:col-span-2" : ""}`}
            >
              <Image
                src={category.imageUrl || "/images/campaign/hero-blush.png"}
                alt={category.name}
                fill
                sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 50vw, 25vw"}
                className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 font-serif text-sm italic text-white/80" aria-hidden="true">0{index + 1}</span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-surface sm:p-5">
                <h3 className={`${index === 0 ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl"} max-w-[11ch] font-serif font-semibold leading-none`}>{category.name}</h3>
                <span className="grid min-h-11 min-w-11 place-items-center rounded-full border border-white/50 bg-white/15 backdrop-blur-sm" aria-hidden="true"><ArrowUpRight /></span>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/products" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover">
          Xem toàn bộ cửa hàng <ArrowUpRight />
        </Link>
      </div>
    </section>
  );
}
