import api from "./api";
import { Address, ApiResponse } from "@/types";
import { AddressFormValues } from "@/schemas/forms";

export const addressService = {
  async getAddresses() {
    const response = await api.get<ApiResponse<Address[]>>("/addresses");
    return response.data;
  },
  async createAddress(data: AddressFormValues) {
    const response = await api.post<ApiResponse<Address>>("/addresses", data);
    return response.data;
  },
  async updateAddress(id: number, data: AddressFormValues) {
    const response = await api.put<ApiResponse<Address>>(`/addresses/${id}`, data);
    return response.data;
  },
  async deleteAddress(id: number) {
    const response = await api.delete<ApiResponse<void>>(`/addresses/${id}`);
    return response.data;
  },
  async setDefaultAddress(id: number) {
    const response = await api.patch<ApiResponse<Address>>(`/addresses/${id}/default`);
    return response.data;
  },
};
