"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type KeyboardEvent } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Confetti,
  FlowerLotus,
  FlowerTulip,
  HandHeart,
  Heart,
  TrendUp,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/feedback-state";
import {
  FLOWER_INTENTS,
  FLOWER_MEANINGS,
  getFlowerMeaning,
  type FlowerIntent,
  type FlowerMeaning,
} from "@/data/flower-meanings";
import { queryKeys } from "@/lib/query-keys";
import { productService, type ProductFilters } from "@/services/product.service";
import { cn } from "@/utils/format";

const intentIcons = {
  all: FlowerTulip,
  love: Heart,
  gratitude: HandHeart,
  celebration: Confetti,
  prosperity: TrendUp,
  peace: FlowerLotus,
} as const;

function isIntent(value: string | null): value is FlowerIntent {
  return FLOWER_INTENTS.some((intent) => intent.id !== "all" && intent.id === value);
}

function flowersForIntent(intent: "all" | FlowerIntent) {
  return intent === "all"
    ? FLOWER_MEANINGS
    : FLOWER_MEANINGS.filter((flower) => flower.intents.includes(intent));
}

export function FlowerMeaningExplorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const intentParam = searchParams.get("intent");
  const flowerParam = searchParams.get("flower");
  const selectedIntent: "all" | FlowerIntent = isIntent(intentParam) ? intentParam : "all";
  const filteredFlowers = flowersForIntent(selectedIntent);
  const requestedFlower = getFlowerMeaning(flowerParam);
  const activeFlower = requestedFlower && filteredFlowers.some((flower) => flower.id === requestedFlower.id)
    ? requestedFlower
    : filteredFlowers[0] ?? FLOWER_MEANINGS[0];

  const productFilters: ProductFilters = {
    flowerType: activeFlower.productFlowerType,
    inStock: true,
    sort: "bestseller",
    page: 0,
    size: 4,
  };
  const productQuery = useQuery({
    queryKey: queryKeys.products({ ...productFilters }),
    queryFn: () => productService.getProducts(productFilters),
  });
  const products = productQuery.data?.data.content ?? [];

  function replaceQuery(flowerId: string, intent: "all" | FlowerIntent) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("flower", flowerId);
    if (intent === "all") params.delete("intent");
    else params.set("intent", intent);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  useEffect(() => {
    const invalidIntent = intentParam !== null && intentParam !== "all" && !isIntent(intentParam);
    const invalidFlower = flowerParam !== null && activeFlower.id !== flowerParam;
    if (invalidIntent || invalidFlower) replaceQuery(activeFlower.id, selectedIntent);
    // URL repair only runs when the parsed selection changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFlower.id, flowerParam, intentParam, selectedIntent]);

  useEffect(() => {
    const activeTab = tabRefs.current[activeFlower.id];
    const tabList = activeTab?.parentElement;
    if (!activeTab || !tabList || tabList.scrollWidth <= tabList.clientWidth || typeof tabList.scrollTo !== "function") return;

    const centeredLeft = activeTab.offsetLeft - (tabList.clientWidth - activeTab.clientWidth) / 2;
    tabList.scrollTo({
      left: Math.max(0, centeredLeft),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeFlower.id, filteredFlowers.length, reduceMotion]);

  function selectIntent(intent: "all" | FlowerIntent) {
    const nextFlowers = flowersForIntent(intent);
    const nextFlower = nextFlowers.some((flower) => flower.id === activeFlower.id)
      ? activeFlower
      : nextFlowers[0];
    replaceQuery(nextFlower.id, intent);
  }

  function selectFlower(flower: FlowerMeaning, focusAfterSelection = false) {
    replaceQuery(flower.id, selectedIntent);
    if (focusAfterSelection) {
      requestAnimationFrame(() => tabRefs.current[flower.id]?.focus());
    }
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, flower: FlowerMeaning) {
    const currentIndex = filteredFlowers.findIndex((item) => item.id === flower.id);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (currentIndex + 1) % filteredFlowers.length;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (currentIndex - 1 + filteredFlowers.length) % filteredFlowers.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = filteredFlowers.length - 1;
    else return;

    event.preventDefault();
    selectFlower(filteredFlowers[nextIndex], true);
  }

  const allProductsHref = `/products?flowerType=${encodeURIComponent(activeFlower.productFlowerType)}&inStock=true&sort=bestseller`;

  return (
    <>
      <section className="page-shell pb-10 pt-8 sm:pb-14 sm:pt-12" aria-labelledby="meaning-filter-heading">
        <div className="flex flex-col gap-5 border-b border-line pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Chọn theo điều muốn nói</p>
            <h2 id="meaning-filter-heading" className="mt-2 font-serif text-3xl font-medium tracking-[-0.035em] text-ink sm:text-4xl">
              Một thông điệp, nhiều sắc hoa.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted">
            Lọc theo cảm xúc, sau đó dùng phím mũi tên hoặc chạm để đọc từng loài hoa.
          </p>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="Lọc theo thông điệp">
          {FLOWER_INTENTS.map((intent) => {
            const Icon = intentIcons[intent.id];
            const active = intent.id === selectedIntent;
            return (
              <button
                key={intent.id}
                type="button"
                aria-pressed={active}
                onClick={() => selectIntent(intent.id)}
                className={cn(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-xs font-bold transition-[transform,background-color,color,border-color] duration-300 hover:-translate-y-0.5",
                  active
                    ? "border-accent bg-accent text-surface"
                    : "border-line bg-surface text-ink hover:border-accent/45 hover:bg-accent-soft",
                )}
              >
                <Icon size={16} weight={active ? "fill" : "regular"} aria-hidden="true" />
                {intent.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-24" aria-label="Cẩm nang ý nghĩa hoa">
        <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12">
          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <h2 className="font-serif text-xl font-semibold text-ink">Mục lục loài hoa</h2>
              <span className="text-xs tabular-nums text-muted">{filteredFlowers.length} loài</span>
            </div>
            <div
              role="tablist"
              aria-label="Chọn loài hoa"
              className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 lg:max-h-[calc(100dvh-10rem)] lg:flex-col lg:gap-0 lg:overflow-y-auto lg:pr-2"
            >
              {filteredFlowers.map((flower, index) => {
                const active = activeFlower.id === flower.id;
                return (
                  <button
                    key={flower.id}
                    ref={(node) => { tabRefs.current[flower.id] = node; }}
                    id={`flower-tab-${flower.id}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-controls="flower-meaning-panel"
                    tabIndex={active ? 0 : -1}
                    onClick={() => selectFlower(flower)}
                    onKeyDown={(event) => handleTabKeyDown(event, flower)}
                    className={cn(
                      "group flex min-h-[7.25rem] w-[9.5rem] shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border text-left transition-[transform,background-color,border-color] duration-300 hover:-translate-y-0.5 lg:min-h-0 lg:w-full lg:flex-row lg:items-center lg:gap-3 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:px-1 lg:py-4 lg:hover:translate-x-1 lg:hover:translate-y-0",
                      active
                        ? "border-accent bg-accent-soft lg:border-line lg:bg-transparent"
                        : "border-line bg-surface lg:border-line lg:bg-transparent",
                    )}
                  >
                    <span className="relative block h-16 w-full overflow-hidden bg-surface-muted lg:h-12 lg:w-12 lg:shrink-0 lg:rounded-xl">
                      <Image
                        src={flower.imageSrc}
                        alt=""
                        fill
                        sizes="(max-width: 1023px) 152px, 48px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 lg:px-0 lg:py-0">
                      <span className={cn("hidden font-mono text-[10px] lg:block", active ? "text-accent" : "text-muted")}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0">
                        <span className={cn("block font-serif text-base font-semibold leading-tight", active ? "text-accent" : "text-ink")}>
                          {flower.name}
                        </span>
                        <span className="mt-0.5 hidden truncate text-[11px] text-muted lg:block">{flower.shortMeaning}</span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          <motion.article
            key={activeFlower.id}
            id="flower-meaning-panel"
            role="tabpanel"
            aria-labelledby={`flower-tab-${activeFlower.id}`}
            initial={reduceMotion ? false : { y: 12 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 overflow-hidden rounded-[28px] border border-line bg-surface shadow-float"
          >
            <div className="grid xl:grid-cols-[0.86fr_1.14fr]">
              <div className="relative aspect-[5/4] min-h-[18rem] overflow-hidden bg-surface-muted xl:aspect-auto xl:min-h-full">
                <Image
                  src={activeFlower.imageSrc}
                  alt={activeFlower.imageAlt}
                  fill
                  sizes="(max-width: 1279px) 100vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/55 bg-surface/88 px-4 py-3 backdrop-blur-md">
                  <p className="font-serif text-lg font-semibold text-ink">{activeFlower.scientificName}</p>
                  <p className="mt-0.5 text-xs text-muted">Tên khoa học hoặc tên chi phổ biến</p>
                </div>
              </div>

              <div className="px-5 py-7 sm:px-8 sm:py-10 xl:px-10">
                <p className="eyebrow">{activeFlower.shortMeaning}</p>
                <h2 className="mt-3 font-serif text-[clamp(2.45rem,5vw,4.7rem)] font-medium leading-[0.92] tracking-[-0.05em] text-ink">
                  {activeFlower.name}
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  {activeFlower.description}
                </p>

                <dl className="mt-8 divide-y divide-line border-y border-line">
                  {activeFlower.colors.map((color) => (
                    <div key={color.name} className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 py-4 sm:grid-cols-[8rem_minmax(0,1fr)]">
                      <dt className="flex items-center gap-2 text-sm font-bold text-ink">
                        <span
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 rounded-full border border-ink/10"
                          style={{ backgroundColor: color.hex }}
                        />
                        {color.name}
                      </dt>
                      <dd className="text-sm leading-6 text-muted">{color.message}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Dịp phù hợp</h3>
                    <ul className="mt-3 space-y-2 text-sm text-ink">
                      {activeFlower.occasions.map((occasion) => <li key={occasion}>• {occasion}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-accent">Có thể dành tặng</h3>
                    <ul className="mt-3 space-y-2 text-sm text-ink">
                      {activeFlower.recipients.map((recipient) => <li key={recipient}>• {recipient}</li>)}
                    </ul>
                  </div>
                </div>

                <aside className="mt-8 border-l-2 border-accent pl-4 text-sm leading-6 text-muted">
                  <span className="font-bold text-ink">Lưu ý văn hóa: </span>{activeFlower.note}
                </aside>
              </div>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-14 sm:py-20" aria-labelledby="meaning-products-heading">
        <div className="page-shell">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Từ ý nghĩa đến món quà</p>
              <h2 id="meaning-products-heading" className="mt-2 font-serif text-3xl font-medium tracking-[-0.035em] text-ink sm:text-5xl">
                Mẫu {activeFlower.name.toLocaleLowerCase("vi")} phù hợp.
              </h2>
            </div>
            <Link href={allProductsHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover">
              Xem tất cả <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          {productQuery.isLoading ? (
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Đang tải sản phẩm">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="space-y-3"><Skeleton className="aspect-square" /><Skeleton className="h-5 w-4/5" /><Skeleton className="h-4 w-2/5" /></div>
              ))}
            </div>
          ) : productQuery.isError ? (
            <div className="mt-8 flex min-h-52 flex-col items-start justify-center rounded-[24px] bg-canvas px-6 py-10 sm:px-10" role="alert">
              <h3 className="font-serif text-2xl font-semibold text-ink">Chưa tải được mẫu hoa</h3>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted">Kết nối chưa ổn định. Bạn có thể thử lại hoặc mở toàn bộ cửa hàng.</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => productQuery.refetch()}>Thử lại</Button>
                <Button asChild><Link href={allProductsHref}>Đến cửa hàng</Link></Button>
              </div>
            </div>
          ) : products.length ? (
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-6">
              {products.map((product) => <ProductCard key={product.id} product={product} density="compact" />)}
            </div>
          ) : (
            <div className="mt-8 flex min-h-52 flex-col items-start justify-center rounded-[24px] bg-canvas px-6 py-10 sm:px-10">
              <h3 className="font-serif text-2xl font-semibold text-ink">Cửa hàng đang cập nhật mẫu {activeFlower.name.toLocaleLowerCase("vi")}.</h3>
              <p className="mt-2 max-w-lg text-sm leading-6 text-muted">Ý nghĩa vẫn được lưu trong cẩm nang. Hãy xem các thiết kế khác đang có sẵn.</p>
              <Button asChild className="mt-5"><Link href="/products">Xem cửa hàng</Link></Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
