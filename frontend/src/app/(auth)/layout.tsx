import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[1.05fr_0.95fr]">
      <section className="relative hidden min-h-dvh overflow-hidden lg:block">
        <Image src="/images/campaign/auth-still-life.png" alt="Bình hoa nghệ thuật trong không gian tối giản" fill priority sizes="53vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <p className="max-w-xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.04em] text-surface">Hoa là một cách để nhớ đến nhau.</p>
        </div>
      </section>
      <section className="flex min-h-dvh items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-baseline gap-2 text-ink" aria-label="Lá và Hoa, về trang chủ">
            <span className="font-serif text-3xl font-semibold tracking-[-0.04em]">Lá & Hoa</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </Link>
          <div className="mt-12">{children}</div>
        </div>
      </section>
    </main>
  );
}
