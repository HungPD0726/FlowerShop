import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { HeroBanner } from "@/components/home/hero-banner";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { NewArrivalShowcase, BestSellerRail } from "@/components/home/product-showcase";
import { StoryFeature } from "@/components/home/story-feature";
import { MeaningBanner } from "@/components/home/meaning-banner";
import { WhyChoose } from "@/components/home/why-choose";
import { productService } from "@/services/product.service";
import type { Category, Product } from "@/types";

export const revalidate = 60;

export default async function HomePage() {
  let categories: Category[] = [];
  let newArrivals: Product[] = [];
  let bestSellers: Product[] = [];

  try {
    const [categoryResponse, newResponse, bestResponse] = await Promise.all([
      productService.getCategories(),
      productService.getNewArrivals(),
      productService.getBestSellers(),
    ]);
    categories = categoryResponse.data || [];
    newArrivals = newResponse.data || [];
    bestSellers = bestResponse.data || [];
  } catch {
    // The storefront remains navigable while the API is temporarily unavailable.
  }

  const hasProducts = newArrivals.length > 0 || bestSellers.length > 0;

  return (
    <div className="overflow-hidden">
      <HeroBanner />
      <WhyChoose />
      <FeaturedCategories categories={categories} />
      <NewArrivalShowcase products={newArrivals} />
      <MeaningBanner />
      <StoryFeature />
      <BestSellerRail products={bestSellers} />
      {!hasProducts && (
        <section className="page-shell pb-16 sm:pb-24" role="status">
          <div className="rounded-[28px] border border-line bg-surface px-6 py-12 text-center">
            <h2 className="font-serif text-3xl font-semibold text-ink">Cửa hàng đang cập nhật sản phẩm.</h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted">Bạn vẫn có thể mở danh sách sản phẩm và thử tải lại khi kết nối ổn định.</p>
            <Link href="/products" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-6 text-sm font-bold text-surface hover:bg-accent-hover">Đến cửa hàng <ArrowRight /></Link>
          </div>
        </section>
      )}
    </div>
  );
}
