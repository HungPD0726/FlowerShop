"use client";

import { ArrowClockwise, FlowerLotus } from "@phosphor-icons/react";
import { Button } from "./button";
import { cn } from "@/utils/format";

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("skeleton-shimmer rounded-2xl", className)} />;
}

export function EmptyState({ title, description, action, className }: { title: string; description: string; action?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("surface-panel flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center", className)}>
      <FlowerLotus size={34} weight="light" className="mb-5 text-accent" />
      <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Không thể tải dữ liệu", description = "Kết nối chưa thành công. Vui lòng thử lại.", onRetry }: { title?: string; description?: string; onRetry?: () => void }) {
  return (
    <div className="surface-panel flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center" role="alert">
      <h2 className="font-serif text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>
      {onRetry && (
        <Button className="mt-6 gap-2" variant="outline" onClick={onRetry}>
          <ArrowClockwise /> Thử lại
        </Button>
      )}
    </div>
  );
}
