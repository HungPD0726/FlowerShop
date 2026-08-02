import api from "./api";
import { ApiResponse, Category, Coupon, CouponRequestData, DashboardSummary, Order, PageResponse, Product, ProductRequestData } from "@/types";
import { CategoryFormValues } from "@/schemas/forms";

export const adminService = {
  async getDashboardSummary() {
    const response = await api.get<ApiResponse<DashboardSummary>>("/admin/dashboard/summary");
    return response.data;
  },

  async getAdminProducts(keyword = "", page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<Product>>>("/admin/products", {
      params: { keyword, page, size },
    });
    return response.data;
  },

  async getAdminProduct(id: number) {
    const response = await api.get<ApiResponse<Product>>(`/admin/products/${id}`);
    return response.data;
  },

  async createProduct(data: ProductRequestData) {
    const response = await api.post<ApiResponse<Product>>("/admin/products", data);
    return response.data;
  },

  async updateProduct(id: number, data: Partial<ProductRequestData>) {
    const response = await api.put<ApiResponse<Product>>(`/admin/products/${id}`, data);
    return response.data;
  },

  async deleteProduct(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/admin/products/${id}`);
    return response.data;
  },

  async toggleProductStatus(id: number, isActive: boolean) {
    const response = await api.patch<ApiResponse<Product>>(`/admin/products/${id}/status`, null, { params: { isActive } });
    return response.data;
  },

  async uploadProductImage(id: number, file: File, isPrimary = false) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isPrimary", String(isPrimary));
    const response = await api.post<ApiResponse<unknown>>(`/admin/products/${id}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async deleteProductImage(productId: number, imageId: number) {
    const response = await api.delete<ApiResponse<void>>(`/admin/products/${productId}/images/${imageId}`);
    return response.data;
  },

  async getAdminCategories() {
    const response = await api.get<ApiResponse<Category[]>>("/admin/categories");
    return response.data;
  },

  async createCategory(data: CategoryFormValues) {
    const response = await api.post<ApiResponse<Category>>("/admin/categories", data);
    return response.data;
  },

  async updateCategory(id: number, data: CategoryFormValues) {
    const response = await api.put<ApiResponse<Category>>(`/admin/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/admin/categories/${id}`);
    return response.data;
  },

  async getAdminOrders(keyword = "", status = "", page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<Order>>>("/admin/orders", {
      params: { keyword, status, page, size },
    });
    return response.data;
  },

  async getAdminOrder(id: number) {
    const response = await api.get<ApiResponse<Order>>(`/admin/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: number, status: string, note?: string) {
    const response = await api.patch<ApiResponse<Order>>(`/admin/orders/${id}/status`, { status, note });
    return response.data;
  },

  async getAdminCoupons() {
    const response = await api.get<ApiResponse<Coupon[]>>("/admin/coupons");
    return response.data;
  },

  async createCoupon(data: CouponRequestData) {
    const response = await api.post<ApiResponse<Coupon>>("/admin/coupons", data);
    return response.data;
  },

  async updateCoupon(id: number, data: CouponRequestData) {
    const response = await api.put<ApiResponse<Coupon>>(`/admin/coupons/${id}`, data);
    return response.data;
  },

  async deleteCoupon(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/admin/coupons/${id}`);
    return response.data;
  },
};
