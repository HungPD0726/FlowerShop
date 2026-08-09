import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { server } from "@/test/setup";
import { FlowerMeaningExplorer } from "./flower-meaning-explorer";

const navigation = vi.hoisted(() => ({
  search: "",
  replace: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/flower-meanings",
  useRouter: () => ({ replace: navigation.replace }),
  useSearchParams: () => new URLSearchParams(navigation.search),
}));

type MockImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
};

vi.mock("next/image", () => ({
  default: ({ fill: _fill, priority: _priority, sizes: _sizes, ...props }: MockImageProps) =>
    React.createElement("img", props),
}));

function renderExplorer() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <FlowerMeaningExplorer />
    </QueryClientProvider>,
  );
}

function emptyProducts() {
  return HttpResponse.json({
    success: true,
    message: "OK",
    timestamp: new Date(0).toISOString(),
    data: {
      content: [],
      page: 0,
      size: 4,
      totalElements: 0,
      totalPages: 0,
      first: true,
      last: true,
    },
  });
}

describe("FlowerMeaningExplorer", () => {
  beforeEach(() => {
    navigation.search = "";
    navigation.replace.mockReset();
    server.use(http.get("http://localhost:8080/api/v1/products", () => emptyProducts()));
  });

  it("requests four in-stock best sellers for the selected flowerType", async () => {
    const requestSpy = vi.fn();
    server.use(
      http.get("http://localhost:8080/api/v1/products", ({ request }) => {
        requestSpy(new URL(request.url).searchParams);
        return emptyProducts();
      }),
    );

    renderExplorer();

    expect(screen.getByRole("heading", { name: "Hoa hồng", level: 2 })).toBeInTheDocument();
    await waitFor(() => expect(requestSpy).toHaveBeenCalledOnce());
    const params = requestSpy.mock.calls[0][0] as URLSearchParams;
    expect(Object.fromEntries(params)).toMatchObject({
      flowerType: "Hoa Hồng",
      inStock: "true",
      sort: "bestseller",
      page: "0",
      size: "4",
    });
    expect(await screen.findByText(/đang cập nhật mẫu hoa hồng/i)).toBeInTheDocument();
  });

  it("selects the first valid flower when the intent changes and syncs the URL", async () => {
    const user = userEvent.setup();
    renderExplorer();

    await user.click(screen.getByRole("button", { name: "Bình an" }));

    expect(navigation.replace).toHaveBeenCalledWith(
      "/flower-meanings?flower=hoa-cam-tu-cau&intent=peace",
      { scroll: false },
    );
  });

  it("supports roving tab navigation with the arrow and boundary keys", () => {
    renderExplorer();
    const roseTab = screen.getByRole("tab", { name: /Hoa Hồng/i });

    fireEvent.keyDown(roseTab, { key: "ArrowRight" });
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/flower-meanings?flower=hoa-tulip",
      { scroll: false },
    );

    fireEvent.keyDown(roseTab, { key: "End" });
    expect(navigation.replace).toHaveBeenLastCalledWith(
      "/flower-meanings?flower=hoa-sen",
      { scroll: false },
    );
  });

  it("repairs invalid query parameters to the first flower", async () => {
    navigation.search = "flower=khong-ton-tai&intent=unknown";
    renderExplorer();

    await waitFor(() => {
      expect(navigation.replace).toHaveBeenCalledWith(
        "/flower-meanings?flower=hoa-hong",
        { scroll: false },
      );
    });
  });
});
