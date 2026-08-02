import Link from "next/link";
import { Button } from "@/components/ui/button";

export function PolicyPage({ eyebrow, title, introduction, sections }: { eyebrow: string; title: string; introduction: string; sections: { title: string; content: string }[] }) {
  return (
    <div className="page-shell py-12 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <header><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl">{title}</h1><p className="mt-6 max-w-md text-sm leading-7 text-muted">{introduction}</p><Button asChild variant="outline" className="mt-7"><Link href="/contact">Liên hệ cửa hàng</Link></Button></header>
        <div className="divide-y divide-line border-y border-line">{sections.map((section, index) => <section key={section.title} className="grid gap-4 py-8 sm:grid-cols-[3rem_1fr]"><span className="text-xs font-bold tracking-[0.14em] text-accent">{String(index + 1).padStart(2, "0")}</span><div><h2 className="font-serif text-3xl font-semibold text-ink">{section.title}</h2><p className="mt-3 text-sm leading-7 text-muted">{section.content}</p></div></section>)}</div>
      </div>
    </div>
  );
}
