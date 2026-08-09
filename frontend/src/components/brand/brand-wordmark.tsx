import { cn } from "@/utils/format";

const sizeClasses = {
  sm: "text-[1.55rem]",
  md: "text-[1.9rem]",
  lg: "text-4xl",
};

export function BrandWordmark({
  size = "md",
  showTagline = true,
  className,
}: {
  size?: keyof typeof sizeClasses;
  showTagline?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col text-ink", className)}>
      <span className={cn("whitespace-nowrap font-serif font-semibold leading-[0.82] tracking-[-0.055em]", sizeClasses[size])}>
        Chạm <span className="italic text-accent">Hoa</span>
      </span>
      {showTagline && (
        <span className="mt-1.5 text-[7px] font-extrabold uppercase tracking-[0.23em] text-muted">
          Hoa tươi thiết kế
        </span>
      )}
    </span>
  );
}
