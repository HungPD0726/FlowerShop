import type { Metadata } from "next";
import Link from "next/link";
import { productService } from "@/services/product.service";
import { ProductCard } from "@/components/product/product-card";
import { EmptyState } from "@/components/ui/feedback-state";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try { const response = await productService.getCategories(); const category = response.data?.find((item) => item.slug === params.slug); return { title: category?.name || "Danh mục hoa", description: category?.description }; } catch { return { title: "Danh mục hoa" }; }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  let category;
  let products: Product[] = [];
  try {
    const [categoriesResponse, productsResponse] = await Promise.all([productService.getCategories(), productService.getProducts({ category: params.slug, size: 24 })]);
    category = categoriesResponse.data?.find((item) => item.slug === params.slug);
    products = productsResponse.data?.content || [];
  } catch { /* The empty state below keeps the route usable when the API is unavailable. */ }
  return <div className="page-shell py-12 sm:py-20"><header className="max-w-3xl"><p className="eyebrow">Danh mục</p><h1 className="mt-4 font-serif text-6xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-7xl">{category?.name || "Hoa theo dịp"}.</h1>{category?.description && <p className="mt-6 text-base leading-7 text-muted">{category.description}</p>}</header>{products.length ? <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-9 lg:grid-cols-4 lg:gap-6">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="mt-12"><EmptyState title="Chưa có sản phẩm trong danh mục" description="Bạn có thể xem toàn bộ thiết kế hoa đang có tại cửa hàng." action={<Button asChild><Link href="/products">Xem tất cả sản phẩm</Link></Button>} /></div>}</div>;
}
