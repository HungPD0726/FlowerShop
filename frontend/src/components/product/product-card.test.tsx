import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "./product-card";
import { Product } from "@/types";

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; unoptimized?: boolean };
vi.mock("next/image", () => ({ default: ({ fill: _fill, priority: _priority, unoptimized: _unoptimized, ...props }: MockImageProps) => React.createElement("img", props) }));

const product: Product = { id: 1, category: { id: 1, name: "Hoa sinh nhật", slug: "hoa-sinh-nhat", isActive: true, displayOrder: 1, createdAt: "" }, name: "Bó hoa Bình Minh", slug: "bo-hoa-binh-minh", sku: "BH-01", basePrice: 500000, isFeatured: false, isNew: false, isBestSeller: false, isActive: true, soldCount: 0, averageRating: 4.8, reviewCount: 12, createdAt: "", images: [], variants: [{ id: 1, name: "Tiêu chuẩn", sku: "BH-01-S", price: 500000, stockQuantity: 0, isActive: true }] };

describe("ProductCard", () => {
  it("shows real rating and disables quick add when every variant is out of stock", () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText("4.8 (12)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /đã hết hàng/i })).toBeDisabled();
    expect(screen.getByText("Hết hàng")).toBeInTheDocument();
  });
});
