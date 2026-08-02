"use client";

import React, { useId } from "react";
import { cn } from "@/utils/format";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, id, children, ...props }, ref) => {
    const generatedId = useId();
    const selectId = id || generatedId;
    const messageId = `${selectId}-message`;

    return (
      <div className="flex w-full flex-col gap-2">
        {label && <label htmlFor={selectId} className="text-sm font-semibold text-ink">{label}</label>}
        <select
          ref={ref}
          id={selectId}
          aria-invalid={Boolean(error)}
          aria-describedby={error || helperText ? messageId : undefined}
          className={cn(
            "min-h-11 w-full rounded-[10px] border border-line bg-surface px-4 py-2.5 text-sm text-ink transition-[border-color,box-shadow] duration-300 ease-editorial focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10",
            error && "border-danger focus:border-danger focus:ring-danger/10",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {(error || helperText) && (
          <span id={messageId} className={cn("text-xs text-muted", error && "font-medium text-danger")}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
