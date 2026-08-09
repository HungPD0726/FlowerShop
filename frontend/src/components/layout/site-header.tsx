"use client";

import Image from "next/image";
import Link from "next/link";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  CaretDown,
  Heart,
  List,
  MagnifyingGlass,
  Scales,
  ShoppingBag,
  UserCircle,
  X,
} from "@phosphor-icons/react";
import { BrandWordmark } from "@/components/brand/brand-wordmark";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/useAuthStore";
import { useCartStore } from "@/stores/useCartStore";
import { useCompareStore } from "@/stores/useCompareStore";
import { useWishlistStore } from "@/stores/useWishlistStore";
import { cn } from "@/utils/format";

const primaryNav = [
  { label: "Cửa hàng", href: "/products" },
  { label: "Ý nghĩa hoa", href: "/flower-meanings" },
  { label: "Tự phối", href: "/custom-bouquet" },
  { label: "Gợi ý hoa", href: "/flower-quiz" },
];

const exploreGroups = [
  {
    title: "Chọn hoa",
    links: [
      { label: "Tất cả sản phẩm", href: "/products" },
      { label: "Tự phối bó hoa", href: "/custom-bouquet" },
      { label: "Tìm hoa phù hợp", href: "/flower-quiz" },
      { label: "So sánh sản phẩm", href: "/compare" },
    ],
  },
  {
    title: "Đọc và hiểu",
    links: [
      { label: "Ý nghĩa các loài hoa", href: "/flower-meanings" },
      { label: "Chăm sóc hoa", href: "/flower-care" },
      { label: "Bài viết", href: "/articles" },
    ],
  },
  {
    title: "Ghé Chạm Hoa",
    links: [
      { label: "Cửa hàng và giao 2H", href: "/locations" },
      { label: "Về chúng tôi", href: "/about" },
      { label: "Liên hệ", href: "/contact" },
    ],
  },
];

const exploreHrefs = exploreGroups.flatMap((group) => group.links.map((link) => link.href));

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const headerRef = useRef<HTMLElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const cart = useCartStore((state) => state.cart);
  const toggleCart = useCartStore((state) => state.toggleOpen);
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const compareCount = useCompareStore((state) => state.items.length);

  useEffect(() => {
    setSearchOpen(false);
    setExploreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!exploreOpen) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setExploreOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [exploreOpen]);

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const value = keyword.trim();
    if (!value) return;
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/products?keyword=${encodeURIComponent(value)}`);
  }

  const accountHref = isAuthenticated ? "/account/orders" : "/login";
  const exploreActive = exploreHrefs.some((href) => pathname === href || pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-[30] border-b border-line/80 bg-surface/95 backdrop-blur-xl"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setExploreOpen(false);
          setSearchOpen(false);
        }
      }}
    >
      <div className="page-shell relative flex h-[72px] items-center justify-between gap-3 lg:gap-5">
        <Link href="/" aria-label="Chạm Hoa, trang chủ" className="shrink-0">
          <BrandWordmark size="md" />
        </Link>

        <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <DesktopNavLink key={item.href} item={item} active={active} />;
          })}
          <button
            type="button"
            aria-expanded={exploreOpen}
            aria-controls="explore-menu"
            onClick={() => {
              setExploreOpen((open) => !open);
              setSearchOpen(false);
            }}
            className={cn(
              "flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold text-muted transition-colors hover:bg-accent-soft hover:text-ink xl:px-4",
              (exploreOpen || exploreActive) && "bg-accent-soft text-accent"
            )}
          >
            Khám phá
            <CaretDown size={14} className={cn("transition-transform duration-300", exploreOpen && "rotate-180")} />
          </button>
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <button
            type="button"
            aria-label={searchOpen ? "Đóng tìm kiếm" : "Tìm kiếm"}
            aria-expanded={searchOpen}
            onClick={() => {
              setSearchOpen((open) => !open);
              setExploreOpen(false);
            }}
            className="grid min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-accent-soft"
          >
            {searchOpen ? <X size={20} /> : <MagnifyingGlass size={20} />}
          </button>
          <Link aria-label={`Yêu thích, ${wishlistCount} sản phẩm`} href="/wishlist" className="relative hidden min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-accent-soft md:grid">
            <Heart size={20} />
            <CountBadge value={wishlistCount} />
          </Link>
          <Link aria-label={isAuthenticated ? "Tài khoản" : "Đăng nhập"} href={accountHref} className="hidden min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-accent-soft sm:grid">
            <UserCircle size={21} />
          </Link>
          <button type="button" aria-label={`Giỏ hàng, ${cart?.totalItems || 0} sản phẩm`} onClick={toggleCart} className="inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-3.5 text-xs font-bold text-surface shadow-soft hover:bg-accent-hover active:scale-[0.98] sm:px-4">
            <ShoppingBag size={18} />
            <span className="hidden xl:inline">Giỏ hàng</span>
            <span className="tabular-nums">{cart?.totalItems || 0}</span>
          </button>

          <Dialog open={mobileOpen} onOpenChange={setMobileOpen}>
            <DialogTrigger asChild>
              <button type="button" aria-label="Mở menu" className="grid min-h-11 min-w-11 place-items-center rounded-full text-ink hover:bg-accent-soft lg:hidden">
                <List size={23} />
              </button>
            </DialogTrigger>
            <DialogContent title="Khám phá Chạm Hoa" description="Chọn hoa, đọc cẩm nang hoặc tìm cửa hàng gần bạn." className="max-w-xl">
              <form onSubmit={submitSearch} role="search" className="relative">
                <MagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
                <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tên hoa hoặc dịp tặng" className="h-12 w-full rounded-xl border border-line bg-canvas pl-11 pr-4 text-sm text-ink outline-none focus:border-accent focus:ring-4 focus:ring-accent/10" />
              </form>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {exploreGroups.map((group) => (
                  <MobileNavGroup key={group.title} title={group.title} links={group.links} onNavigate={() => setMobileOpen(false)} />
                ))}
              </div>

              <div className="mt-7 grid grid-cols-3 gap-2 border-t border-line pt-5">
                <MobileUtilityLink href="/wishlist" label="Yêu thích" onNavigate={() => setMobileOpen(false)} icon={<Heart size={19} />} count={wishlistCount} />
                <MobileUtilityLink href="/compare" label="So sánh" onNavigate={() => setMobileOpen(false)} icon={<Scales size={19} />} count={compareCount} />
                <MobileUtilityLink href={accountHref} label={isAuthenticated ? "Tài khoản" : "Đăng nhập"} onNavigate={() => setMobileOpen(false)} icon={<UserCircle size={20} />} />
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {exploreOpen && (
          <div id="explore-menu" className="absolute inset-x-0 top-[calc(100%+0.75rem)] hidden overflow-hidden rounded-[28px] border border-line bg-surface p-3 shadow-float lg:grid lg:grid-cols-[1fr_18rem]" role="region" aria-label="Menu khám phá">
            <div className="grid grid-cols-3 gap-3 p-5 xl:p-7">
              {exploreGroups.map((group) => (
                <div key={group.title}>
                  <p className="font-serif text-xl font-semibold text-ink">{group.title}</p>
                  <nav aria-label={group.title} className="mt-4 grid gap-1">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setExploreOpen(false)} className="group flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-semibold text-muted hover:bg-accent-soft hover:text-ink">
                        {link.label}
                        <ArrowRight size={14} className="text-accent opacity-0 transition-[transform,opacity] group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
            <Link href="/about" onClick={() => setExploreOpen(false)} className="group relative min-h-[16rem] overflow-hidden rounded-[20px]">
              <Image src="/images/campaign/atelier-blush.png" alt="Nghệ nhân Chạm Hoa đang hoàn thiện một bó hoa" fill sizes="18rem" className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.035]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-surface">
                <p className="font-serif text-2xl font-semibold leading-none">Câu chuyện Chạm Hoa</p>
                <span className="mt-2 inline-flex items-center gap-2 text-xs font-bold">Đọc thêm <ArrowRight /></span>
              </div>
            </Link>
          </div>
        )}

        {searchOpen && (
          <form onSubmit={submitSearch} role="search" className="absolute inset-x-0 top-[calc(100%+0.75rem)] flex items-center gap-2 rounded-[20px] border border-line bg-surface p-2 shadow-float">
            <MagnifyingGlass className="ml-3 shrink-0 text-muted" />
            <input autoFocus value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="Tìm tên hoa, dịp tặng hoặc màu sắc" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-ink outline-none" />
            <button type="submit" className="min-h-11 shrink-0 whitespace-nowrap rounded-full bg-accent px-5 text-xs font-bold text-surface hover:bg-accent-hover">Tìm hoa</button>
          </form>
        )}
      </div>
    </header>
  );
}

function DesktopNavLink({ item, active }: { item: { label: string; href: string }; active: boolean }) {
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined} className={cn("flex min-h-11 items-center rounded-full px-3.5 text-[13px] font-semibold text-muted transition-colors hover:bg-accent-soft hover:text-ink xl:px-4", active && "bg-accent-soft text-accent")}>
      {item.label}
    </Link>
  );
}

function CountBadge({ value }: { value: number }) {
  if (value < 1) return null;
  return <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold tabular-nums text-white">{value}</span>;
}

function MobileNavGroup({ title, links, onNavigate }: { title: string; links: Array<{ label: string; href: string }>; onNavigate: () => void }) {
  return (
    <section>
      <h2 className="font-serif text-xl font-semibold text-ink">{title}</h2>
      <nav aria-label={title} className="mt-2 grid gap-0.5">
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={onNavigate} className="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 text-sm font-semibold text-muted hover:bg-accent-soft hover:text-ink">
            {link.label}<ArrowRight size={14} className="text-accent" />
          </Link>
        ))}
      </nav>
    </section>
  );
}

function MobileUtilityLink({ href, label, onNavigate, icon, count = 0 }: { href: string; label: string; onNavigate: () => void; icon: React.ReactNode; count?: number }) {
  return (
    <Link href={href} onClick={onNavigate} className="relative flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl bg-canvas px-2 text-center text-[11px] font-bold text-ink hover:bg-accent-soft">
      {icon}<span>{label}</span><CountBadge value={count} />
    </Link>
  );
}
