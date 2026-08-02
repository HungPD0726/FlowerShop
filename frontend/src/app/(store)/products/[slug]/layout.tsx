import type { Metadata } from "next";
import { productService } from "@/services/product.service";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await productService.getProductBySlug(params.slug);
    const product = response.data;
    if (!product) return { title: "Sản phẩm" };
    return {
      title: product.name,
      description: product.shortDescription || product.description,
      openGraph: { title: product.name, description: product.shortDescription || product.description, images: product.mainImageUrl ? [{ url: product.mainImageUrl }] : [] },
    };
  } catch { return { title: "Sản phẩm" }; }
}

export default function ProductLayout({ children }: { children: React.ReactNode }) { return children; }
