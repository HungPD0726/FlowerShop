import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | undefined | null): string {
  if (amount == null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function formatDate(dateString: string | undefined | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined | null): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getOrderStatusText(status: string): string {
  switch (status?.toUpperCase()) {
    case "PENDING": return "Chờ xử lý";
    case "CONFIRMED": return "Đã xác nhận";
    case "PREPARING": return "Đang cắm hoa";
    case "DELIVERING": return "Đang giao hàng";
    case "COMPLETED": return "Hoàn thành";
    case "CANCELLED": return "Đã hủy";
    case "REFUNDED": return "Đã hoàn tiền";
    default: return status || "Không xác định";
  }
}

export function getOrderStatusBadgeClass(status: string): string {
  switch (status?.toUpperCase()) {
    case "PENDING": return "bg-amber-100 text-amber-800 border-amber-200";
    case "CONFIRMED": return "bg-blue-100 text-blue-800 border-blue-200";
    case "PREPARING": return "bg-purple-100 text-purple-800 border-purple-200";
    case "DELIVERING": return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "COMPLETED": return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "CANCELLED": return "bg-rose-100 text-rose-800 border-rose-200";
    case "REFUNDED": return "bg-gray-100 text-gray-800 border-gray-200";
    default: return "bg-gray-100 text-gray-700 border-gray-200";
  }
}
