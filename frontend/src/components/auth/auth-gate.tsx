"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { Skeleton } from "@/components/ui/feedback-state";

export function AuthGate({ children, role }: { children: React.ReactNode; role?: "ROLE_ADMIN" | "ROLE_STAFF" }) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }
    if (role && !user?.roles.includes(role)) router.replace("/");
  }, [hasHydrated, isAuthenticated, pathname, role, router, user]);

  if (!hasHydrated || !isAuthenticated || (role && !user?.roles.includes(role))) {
    return (
      <div className="page-shell grid gap-4 py-12">
        <Skeleton className="h-16" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  return <>{children}</>;
}
