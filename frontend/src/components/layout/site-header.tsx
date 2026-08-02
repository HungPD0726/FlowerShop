"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { List, MagnifyingGlass, ShoppingBag, UserCircle, X } from "@phosphor-icons/react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/utils/format";

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Cửa hàng", href: "/products" },
  { label: "Sinh nhật", href: "/products?category=hoa-sinh-nhat" },
  { label: "Câu chuyện", href: "/about" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated } = useAuthStore();
  const { cart, toggleOpen } = useCartStore();

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const value = keyword.trim();
    if (!value) return;
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/products?keyword=${encodeURIComponent(value)}`);
  };

  return (
    <header className="sticky top-0 z-[30] py-3">
      <div className="page-shell relative flex h-[68px] items-center justify-between rounded-2xl border border-line/80 bg-surface/95 px-4 shadow-soft backdrop-blur-xl lg:px-6">
        <Link href="/" aria-label="Lá & Hoa, trang chủ" className="group flex min-w-fit items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl border border-ink/15 bg-canvas font-serif text-xl font-semibold text-ink transition-colors duration-500 group-hover:border-accent group-hover:text-accent">&</span>
          <span className="font-serif text-2xl font-semibold tracking-[-0.03em] text-ink">Lá & Hoa</span>
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href.split("?")[0]);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-semibold text-muted transition-colors duration-300 hover:bg-surface-muted hover:text-ink",
                  active && "bg-accent-soft text-accent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button aria-label="Tìm kiếm" aria-expanded={searchOpen} onClick={() => setSearchOpen((open) => !open)} className="hidden min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-surface-muted md:grid">
            {searchOpen ? <X /> : <MagnifyingGlass />}
          </button>
          <Link aria-label={isAuthenticated ? "Tài khoản" : "Đăng nhập"} href={isAuthenticated ? "/account/orders" : "/login"} className="grid min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-surface-muted">
            <UserCircle />
          </Link>
          <button aria-label={`Giỏ hàng, ${cart?.totalItems || 0} sản phẩm`} onClick={toggleOpen} className="relative grid min-h-11 min-w-11 place-items-center rounded-full bg-ink text-surface transition-transform duration-300 hover:-translate-y-0.5">
            <ShoppingBag />
            {(cart?.totalItems || 0) > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-surface">{cart?.totalItems}</span>}
          </button>

          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <button aria-label="Mở menu" className="grid min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-surface-muted lg:hidden"><List size={24} /></button>
            </DialogTrigger>
            <DialogContent title="Điều hướng" description="Tìm hoa theo dịp hoặc khám phá toàn bộ cửa hàng." className="max-w-md">
              <form onSubmit={submitSearch} className="relative mb-6">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input aria-label="Tìm kiếm sản phẩm" value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tên hoa, dịp tặng..." className="min-h-12 w-full rounded-full border border-line bg-canvas pl-12 pr-4 text-sm text-ink focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </form>
              <nav className="grid gap-2" aria-label="Điều hướng di động">
                {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-lg font-semibold text-ink hover:bg-surface-muted">{item.label}</Link>)}
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-lg font-semibold text-ink hover:bg-surface-muted">Liên hệ</Link>
              </nav>
            </DialogContent>
          </Dialog>
        </div>

        {searchOpen && (
          <form onSubmit={submitSearch} className="absolute inset-x-4 top-[calc(100%+0.5rem)] hidden rounded-2xl border border-line bg-surface p-3 shadow-float md:flex">
            <MagnifyingGlass className="ml-2 self-center text-muted" />
            <input autoFocus value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tìm tên hoa, dịp tặng hoặc màu sắc" className="min-h-11 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted" />
            <button className="rounded-full bg-accent px-5 text-sm font-semibold text-surface">Tìm hoa</button>
          </form>
        )}
      </div>
    </header>
  );
}
