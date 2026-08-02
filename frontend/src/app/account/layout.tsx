"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AddressBook, Package, SignOut, UserCircle } from "@phosphor-icons/react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { AuthGate } from "@/components/auth/auth-gate";
import { useAuthStore } from "@/stores/useAuthStore";

const navItems = [
  { name: "Đơn hàng", href: "/account/orders", icon: Package },
  { name: "Hồ sơ", href: "/account/profile", icon: UserCircle },
  { name: "Địa chỉ", href: "/account/addresses", icon: AddressBook },
];

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  function signOut() { logout(); router.replace("/"); }

  return (
    <AuthGate>
      <div className="flex min-h-dvh flex-col bg-canvas">
        <SiteHeader />
        <main id="main-content" className="page-shell flex-1 py-8 sm:py-12">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div><p className="eyebrow">Tài khoản</p><h1 className="mt-2 font-serif text-4xl font-medium tracking-[-0.04em] text-ink">Xin chào, {user?.fullName?.split(" ").at(-1)}.</h1></div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <aside>
              <nav aria-label="Tài khoản" className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:flex-col">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={`flex min-h-11 shrink-0 items-center gap-3 rounded-[10px] px-4 text-sm font-bold ${active ? "bg-ink text-surface" : "text-muted hover:bg-surface hover:text-ink"}`}><Icon /> {item.name}</Link>;
                })}
                <button type="button" onClick={signOut} className="flex min-h-11 shrink-0 items-center gap-3 rounded-[10px] px-4 text-sm font-bold text-danger hover:bg-danger/10"><SignOut /> Đăng xuất</button>
              </nav>
            </aside>
            <div className="min-w-0">{children}</div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </AuthGate>
  );
}
