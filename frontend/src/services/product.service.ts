import api from "./api";
import { ApiResponse, Category, PageResponse, Product, Review } from "@/types";

export interface ProductFilters {
  keyword?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  flowerType?: string;
  color?: string;
  inStock?: boolean;
  sort?: string;
  page?: number;
  size?: number;
}

export const productService = {
  async getCategories() {
    const response = await api.get<ApiResponse<Category[]>>("/categories");
    return response.data;
  },

  async getProducts(params?: ProductFilters) {
    const response = await api.get<ApiResponse<PageResponse<Product>>>("/products", { params });
    return response.data;
  },

  async getFeaturedProducts() {
    const response = await api.get<ApiResponse<Product[]>>("/products/featured");
    return response.data;
  },

  async getBestSellers() {
    const response = await api.get<ApiResponse<Product[]>>("/products/best-sellers");
    return response.data;
  },

  async getNewArrivals() {
    const response = await api.get<ApiResponse<Product[]>>("/products/new-arrivals");
    return response.data;
  },

  async getProductBySlug(slug: string) {
    const response = await api.get<ApiResponse<Product>>(`/products/${slug}`);
    return response.data;
  },

  async getRelatedProducts(id: number) {
    const response = await api.get<ApiResponse<Product[]>>(`/products/${id}/related`);
    return response.data;
  },

  async getProductReviews(productId: number, page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<Review>>>(`/products/${productId}/reviews`, {
      params: { page, size },
    });
    return response.data;
  },
};
