import { cn } from "@/utils/format";

const labels: Record<string, string> = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  PREPARING: "Đang chuẩn bị",
  DELIVERING: "Đang giao",
  COMPLETED: "Hoàn tất",
  CANCELLED: "Đã hủy",
  PAID: "Đã thanh toán",
  UNPAID: "Chưa thanh toán",
  ACTIVE: "Đang hoạt động",
  INACTIVE: "Tạm ẩn",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const normalized = status.toUpperCase();
  const tone = normalized === "COMPLETED" || normalized === "PAID" || normalized === "ACTIVE"
    ? "border-success/25 bg-success/10 text-success"
    : normalized === "CANCELLED" || normalized === "INACTIVE"
      ? "border-danger/25 bg-danger/10 text-danger"
      : normalized === "PENDING" || normalized === "UNPAID"
        ? "border-warning/30 bg-warning/10 text-ink"
        : "border-accent/25 bg-accent-soft text-accent";
  return <span className={cn("inline-flex min-h-7 items-center rounded-full border px-3 text-[11px] font-bold", tone)}>{label || labels[normalized] || status}</span>;
}
