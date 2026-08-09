"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Archive, CaretLeft, CaretRight, Flower, List, Package, SquaresFour, SignOut, Storefront, Tag, Ticket } from "@phosphor-icons/react";
import { AuthGate } from "@/components/auth/auth-gate";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/useAuthStore";

const navItems = [
  { name: "Tổng quan", href: "/admin/dashboard", icon: SquaresFour },
  { name: "Sản phẩm", href: "/admin/products", icon: Flower },
  { name: "Danh mục", href: "/admin/categories", icon: Tag },
  { name: "Đơn hàng", href: "/admin/orders", icon: Package },
  { name: "Tồn kho", href: "/admin/inventory", icon: Archive },
  { name: "Mã ưu đãi", href: "/admin/coupons", icon: Ticket },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const activeItem = navItems.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
  function signOut() { logout(); router.replace("/login"); }

  return (
    <AuthGate role="ROLE_ADMIN">
      <div className="admin-shell flex min-h-dvh bg-canvas text-ink">
        <aside className={`sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-line bg-surface transition-[width] duration-500 ease-editorial lg:flex ${collapsed ? "w-20" : "w-64"}`}>
          <Link href="/admin/dashboard" className="flex h-20 items-center gap-3 border-b border-line px-5"><span className="min-w-10 shrink-0 font-serif text-2xl font-semibold tracking-[-0.05em] text-accent">CH</span>{!collapsed && <span><span className="block text-lg font-extrabold tracking-[-0.03em]">Chạm Hoa</span><span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Quản trị</span></span>}</Link>
          <AdminNav pathname={pathname} collapsed={collapsed} />
          <div className="mt-auto border-t border-line p-3">
            {!collapsed && <p className="mb-2 truncate px-3 text-xs font-bold text-muted">{user?.fullName}</p>}
            <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold text-muted hover:bg-canvas hover:text-ink"><Storefront className="shrink-0" />{!collapsed && "Về cửa hàng"}</Link>
            <button type="button" onClick={signOut} className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-bold text-danger hover:bg-danger/10"><SignOut className="shrink-0" />{!collapsed && "Đăng xuất"}</button>
          </div>
          <button type="button" aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"} className="absolute -right-4 top-24 grid h-8 w-8 place-items-center rounded-full border border-line bg-surface text-muted shadow-soft" onClick={() => setCollapsed((value) => !value)}>{collapsed ? <CaretRight /> : <CaretLeft />}</button>
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
                <DialogTrigger asChild><button type="button" className="grid min-h-11 min-w-11 place-items-center rounded-full hover:bg-canvas lg:hidden" aria-label="Mở điều hướng quản trị"><List /></button></DialogTrigger>
                <DialogContent title="Quản trị Chạm Hoa" className="max-w-sm"><AdminNav pathname={pathname} onNavigate={() => setMobileOpen(false)} /><div className="mt-6 border-t border-line pt-4"><Link href="/" onClick={() => setMobileOpen(false)} className="flex min-h-11 items-center gap-3 rounded-[10px] px-4 text-sm font-bold text-muted"><Storefront /> Về cửa hàng</Link><button type="button" onClick={signOut} className="flex min-h-11 w-full items-center gap-3 rounded-[10px] px-4 text-sm font-bold text-danger"><SignOut /> Đăng xuất</button></div></DialogContent>
              </Dialog>
              <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">Quản trị</p><p className="text-sm font-bold text-ink">{activeItem?.name || "Chạm Hoa"}</p></div>
            </div>
            <span className="hidden rounded-full border border-line bg-canvas px-3 py-1.5 text-xs font-bold text-muted sm:block">{user?.fullName || "Quản trị viên"}</span>
          </header>
          <main id="main-content" className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </AuthGate>
  );
}

function AdminNav({ pathname, collapsed = false, onNavigate }: { pathname: string; collapsed?: boolean; onNavigate?: () => void }) {
  return <nav aria-label="Điều hướng quản trị" className="flex-1 space-y-1 p-3">{navItems.map((item) => { const Icon = item.icon; const active = pathname === item.href || pathname.startsWith(`${item.href}/`); return <Link key={item.href} href={item.href} onClick={onNavigate} aria-current={active ? "page" : undefined} title={collapsed ? item.name : undefined} className={`flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-bold ${active ? "bg-accent text-surface" : "text-muted hover:bg-canvas hover:text-ink"}`}><Icon className="shrink-0" />{!collapsed && item.name}</Link>; })}</nav>;
}
