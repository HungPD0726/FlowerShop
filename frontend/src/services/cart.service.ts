import api from "./api";
import { ApiResponse, Cart } from "@/types";

export interface AddToCartData {
  productId: number;
  variantId?: number;
  quantity: number;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
  cardMessage?: string;
  sessionId?: string;
}

export const cartService = {
  async getCart(sessionId?: string) {
    const response = await api.get<ApiResponse<Cart>>("/cart", { params: { sessionId } });
    return response.data;
  },

  async addToCart(data: AddToCartData) {
    const response = await api.post<ApiResponse<Cart>>("/cart/items", data);
    return response.data;
  },

  async updateCartItem(id: number, quantity: number) {
    const response = await api.put<ApiResponse<Cart>>(`/cart/items/${id}`, { quantity });
    return response.data;
  },

  async removeCartItem(id: number) {
    const response = await api.delete<ApiResponse<Cart>>(`/cart/items/${id}`);
    return response.data;
  },

  async clearCart(sessionId?: string) {
    const response = await api.delete<ApiResponse<void>>("/cart", { params: { sessionId } });
    return response.data;
  },
};
