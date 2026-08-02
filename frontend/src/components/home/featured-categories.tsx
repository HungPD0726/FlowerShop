import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Category } from "@/types";
import { cn } from "@/utils/format";

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  const visible = categories.slice(0, 5);
  if (!visible.length) return null;

  return (
    <section className="section-space border-y border-line bg-surface">
      <div className="page-shell">
        <h2 className="max-w-3xl font-serif text-4xl font-medium leading-[0.95] tracking-[-0.04em] text-ink sm:text-6xl">Chọn hoa theo khoảnh khắc.</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">Tìm nhanh thiết kế phù hợp với điều bạn muốn chúc mừng, cảm ơn hoặc sẻ chia.</p>
        <div className="mt-10 grid auto-rows-[13rem] grid-cols-1 gap-4 md:grid-cols-2 md:auto-rows-[16rem] lg:grid-cols-4">
          {visible.map((category, index) => (
            <Link key={category.id} href={`/categories/${category.slug}`} className={cn("group relative overflow-hidden rounded-2xl bg-surface-muted", index === 0 && "md:row-span-2 lg:col-span-2", index === 3 && "lg:col-span-2")}>
              <Image src={category.imageUrl || "/images/campaign/hero-editorial.png"} alt={category.name} fill unoptimized={Boolean(category.imageUrl)} sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-ink/30" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-surface">
                <div><h3 className="font-serif text-2xl font-semibold">{category.name}</h3>{category.description && <p className="mt-1 line-clamp-1 text-xs text-surface/75">{category.description}</p>}</div>
                <ArrowUpRight className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
