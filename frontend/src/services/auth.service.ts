import api from "./api";
import { ApiResponse, JwtResponse, User } from "@/types";

export const authService = {
  async register(data: { fullName: string; email: string; phone?: string; password: string }) {
    const response = await api.post<ApiResponse<User>>("/auth/register", data);
    return response.data;
  },

  async login(data: { email: string; password: string }) {
    const response = await api.post<ApiResponse<JwtResponse>>("/auth/login", data);
    if (response.data.success && response.data.data.accessToken) {
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.data));
    }
    return response.data;
  },

  async logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  },

  async getCurrentUser() {
    const response = await api.get<ApiResponse<User>>("/auth/me");
    return response.data;
  },

  async changePassword(data: { currentPassword: string; newPassword: string }) {
    const response = await api.post<ApiResponse<void>>("/auth/change-password", data);
    return response.data;
  },
};
