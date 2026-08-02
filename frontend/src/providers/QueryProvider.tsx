"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { IconContext } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const hydrateAuth = useAuthStore((state) => state.hydrate);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
          mutations: { retry: 0 },
        },
      })
  );

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <IconContext.Provider value={{ size: 20, weight: "regular", mirrored: false }}>
        {children}
      </IconContext.Provider>
    </QueryClientProvider>
  );
}
