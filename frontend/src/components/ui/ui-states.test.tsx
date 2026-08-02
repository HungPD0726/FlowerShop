import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { StatusBadge } from "./status-badge";

describe("shared UI states", () => {
  it("announces and disables a loading button", () => {
    render(<Button isLoading>Đang lưu</Button>);
    expect(screen.getByRole("button", { name: "Đang lưu" })).toBeDisabled();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("renders a localized status badge", () => {
    render(<StatusBadge status="PENDING" />);
    expect(screen.getByText("Chờ xác nhận")).toBeInTheDocument();
  });
});
