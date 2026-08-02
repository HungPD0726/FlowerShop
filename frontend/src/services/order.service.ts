import api from "./api";
import { ApiResponse, Order, PageResponse } from "@/types";
import { AddToCartData } from "./cart.service";

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  province: string;
  district: string;
  ward: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  senderName?: string;
  cardMessage?: string;
  hideSenderName?: boolean;
  customerNote?: string;
  couponCode?: string;
  paymentMethod: string;
  items: AddToCartData[];
}

export const orderService = {
  async createOrder(data: CreateOrderData) {
    const response = await api.post<ApiResponse<Order>>("/orders", data);
    return response.data;
  },

  async getMyOrders(page = 0, size = 10) {
    const response = await api.get<ApiResponse<PageResponse<Order>>>("/orders/my-orders", {
      params: { page, size },
    });
    return response.data;
  },

  async getOrderByCode(orderCode: string) {
    const response = await api.get<ApiResponse<Order>>(`/orders/${orderCode}`);
    return response.data;
  },

  async cancelOrder(orderCode: string, reason?: string) {
    const response = await api.patch<ApiResponse<Order>>(`/orders/${orderCode}/cancel`, null, {
      params: { reason },
    });
    return response.data;
  },
};
