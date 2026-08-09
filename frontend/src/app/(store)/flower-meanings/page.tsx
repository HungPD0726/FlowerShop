import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { FlowerMeaningExplorer } from "@/components/flower-meanings/flower-meaning-explorer";
import { Skeleton } from "@/components/ui/feedback-state";
import { FLOWER_MEANINGS } from "@/data/flower-meanings";

export const metadata: Metadata = {
  title: "Ý nghĩa các loài hoa | Chạm Hoa",
  description:
    "Khám phá ý nghĩa của 10 loài hoa, thông điệp theo màu sắc, dịp tặng và những mẫu hoa phù hợp tại Chạm Hoa.",
  alternates: { canonical: "/flower-meanings" },
  openGraph: {
    title: "Ý nghĩa các loài hoa | Chạm Hoa",
    description: "Cẩm nang chọn hoa theo điều bạn muốn nói.",
    type: "website",
    images: [{ url: "/images/flower-meanings/peony.webp", width: 960, height: 1200, alt: "Hoa mẫu đơn hồng phấn" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Ý nghĩa các loài hoa",
  description: "Cẩm nang chọn hoa theo thông điệp, màu sắc, dịp tặng và người nhận.",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: FLOWER_MEANINGS.length,
    itemListElement: FLOWER_MEANINGS.map((flower, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Thing",
        name: flower.name,
        alternateName: flower.scientificName,
        description: flower.shortMeaning,
        image: flower.imageSrc,
      },
    })),
  },
};

function ExplorerFallback() {
  return (
    <section className="page-shell pb-20 pt-12" aria-label="Đang tải cẩm nang">
      <div className="grid gap-8 lg:grid-cols-[17.5rem_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-16" />)}
        </div>
        <Skeleton className="min-h-[42rem]" />
      </div>
    </section>
  );
}

export default function FlowerMeaningsPage() {
  return (
    <div id="flower-meanings-page" className="contents">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className="page-shell pb-8 pt-3 sm:pb-12 sm:pt-5" aria-labelledby="flower-meanings-title">
        <div className="grid min-h-[min(670px,calc(100dvh-5.5rem))] overflow-hidden rounded-[28px] border border-line bg-surface shadow-float lg:grid-cols-[0.88fr_1.12fr]">
          <div className="relative flex flex-col justify-center bg-accent-soft px-7 py-12 sm:px-12 lg:px-14">
            <p className="eyebrow">Cẩm nang botanical</p>
            <h1
              id="flower-meanings-title"
              className="mt-5 max-w-[9ch] font-serif text-[clamp(3.5rem,7vw,6.8rem)] font-medium leading-[0.86] tracking-[-0.055em] text-ink"
            >
              Hoa nói điều gì?
            </h1>
            <p className="mt-7 max-w-md text-sm leading-7 text-ink/75 sm:text-base">
              Mỗi loài hoa có một cách gợi nhắc về tình cảm. Hãy bắt đầu từ điều bạn muốn nói, rồi chọn màu sắc và dáng hoa phù hợp với người nhận.
            </p>
            <div className="mt-9 max-w-md border-l-2 border-accent pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-accent">Một lưu ý nhỏ</p>
              <p className="mt-2 text-sm leading-6 text-ink/70">
                Ý nghĩa trong cẩm nang là những cách diễn giải phổ biến. Lời nhắn riêng của bạn vẫn là phần quan trọng nhất của món quà.
              </p>
            </div>
          </div>

          <div className="relative min-h-[28rem] bg-surface-muted lg:min-h-full">
            <Image
              src="/images/flower-meanings/peony.webp"
              alt="Hoa mẫu đơn hồng phấn nở trên nền lá tối"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 56vw"
              className="object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-5 border-t border-white/60 pt-4 text-surface drop-shadow-sm sm:inset-x-8">
              <p className="max-w-xs font-serif text-xl font-semibold leading-tight">Mẫu đơn: viên mãn và một lời chúc đủ đầy.</p>
              <span className="font-mono text-xs tabular-nums">01 / 10</span>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<ExplorerFallback />}>
        <FlowerMeaningExplorer />
      </Suspense>
    </div>
  );
}
