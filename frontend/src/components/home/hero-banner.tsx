"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FlowerLotus } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? false : { y: 22 };

  return (
    <section className="page-shell pb-10 pt-3 sm:pb-14 lg:pt-5" aria-labelledby="home-hero-title">
      <div className="grid min-h-[min(700px,calc(100dvh-5rem))] overflow-hidden rounded-[28px] border border-line bg-surface shadow-float lg:grid-cols-[0.86fr_1.14fr]">
        <div className="relative flex flex-col justify-center bg-accent-soft px-7 py-12 sm:px-12 lg:px-14">
          <span className="absolute right-7 top-7 font-serif text-sm italic text-accent" aria-hidden="true">Nº 01</span>
          <FlowerLotus className="absolute -bottom-7 -left-5 text-accent/[0.08]" size={150} weight="thin" aria-hidden="true" />
          <motion.p
            initial={enter}
            animate={{ y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-kicker"
          >
            Thiết kế hoa theo từng câu chuyện
          </motion.p>
          <motion.h1
            id="home-hero-title"
            initial={enter}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[9ch] font-serif text-[clamp(3.65rem,6.6vw,6.4rem)] font-medium leading-[0.84] tracking-[-0.06em] text-ink"
          >
            <span className="block">Tặng hoa</span>
            <span className="block pl-[0.45em] italic text-accent">thật riêng.</span>
          </motion.h1>
          <motion.p
            initial={enter}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-sm text-sm leading-7 text-ink/75 sm:text-base"
          >
            Hoa tươi được kết thủ công cho từng dịp, giao đúng hẹn cùng lời nhắn của bạn.
          </motion.p>
          <motion.div
            initial={enter}
            animate={{ y: 0 }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="group gap-2">
              <Link href="/products">Chọn hoa <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/about">Câu chuyện cửa hàng</Link>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[440px] bg-[#f5d0c5] lg:min-h-full"
        >
          <Image
            src="/images/campaign/hero-blush.png"
            alt="Bó hoa hồng phấn, mẫu đơn và mao lương trong ánh sáng studio"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 56vw"
            className="object-cover object-center"
          />
          <div className="absolute bottom-5 left-5 max-w-[13rem] rounded-2xl border border-white/55 bg-surface/90 px-4 py-3 shadow-soft backdrop-blur-md sm:bottom-7 sm:left-7">
            <p className="font-serif text-lg font-semibold leading-none text-ink">Sắc hoa của riêng bạn</p>
            <p className="mt-1.5 text-[11px] leading-4 text-muted">Chọn theo dịp, màu sắc và lời muốn gửi.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
