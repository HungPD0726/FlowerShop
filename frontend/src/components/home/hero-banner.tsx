"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { y: 28 };

  return (
    <section className="page-shell grid min-h-[calc(100dvh-92px)] items-center gap-8 pb-10 pt-5 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:pb-12">
      <motion.div initial={initial} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="order-2 max-w-2xl lg:order-1">
        <p className="eyebrow">Thiết kế hoa theo từng dịp</p>
        <h1 className="mt-5 font-serif text-[clamp(3.5rem,7vw,6.8rem)] font-medium leading-[0.9] tracking-[-0.055em] text-ink">
          Hoa nói thay điều bạn muốn gửi.
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg">Bó hoa thủ công, giao đúng hẹn và kèm lời nhắn riêng của bạn.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="group gap-3">
            <Link href="/products">Chọn hoa <ArrowRight className="transition-transform duration-500 group-hover:translate-x-1" /></Link>
          </Button>
          <Button asChild size="lg" variant="outline"><Link href="/about">Xem câu chuyện</Link></Button>
        </div>
      </motion.div>

      <motion.div initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="order-1 rounded-[1.5rem] bg-surface-muted p-2 shadow-float lg:order-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src="/images/campaign/hero-editorial.png" alt="Bó hoa anthurium đỏ, mao lương trắng và delphinium cobalt" fill priority sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" />
        </div>
      </motion.div>
    </section>
  );
}
