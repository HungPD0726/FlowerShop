import Image from "next/image";
import Link from "next/link";
import { BrandWordmark } from "@/components/brand/brand-wordmark";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[1.12fr_0.88fr]">
      <section className="relative hidden min-h-dvh overflow-hidden lg:block">
        <Image src="/images/campaign/auth-blush.png" alt="Bình hoa mao lương hồng trong ánh sáng studio" fill priority sizes="56vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <p className="max-w-xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-surface">Hoa là một cách để nhớ đến nhau.</p>
        </div>
      </section>
      <section className="flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex text-ink" aria-label="Chạm Hoa, về trang chủ">
            <BrandWordmark size="md" />
          </Link>
          <div className="mt-12">{children}</div>
        </div>
      </section>
    </main>
  );
}
