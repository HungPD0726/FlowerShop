"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";

export function StoryFeature() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="page-shell pb-16 pt-6 sm:pb-24" aria-labelledby="story-heading">
      <div className="relative grid gap-0 overflow-hidden rounded-[28px] border border-line bg-surface shadow-soft lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={reduceMotion ? false : { scale: 1.025 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-[390px] lg:min-h-[640px]"
        >
          <Image src="/images/campaign/atelier-blush.png" alt="Nghệ nhân đang hoàn thiện một bó hoa hồng phấn" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
        </motion.div>
        <div className="relative flex flex-col justify-center overflow-hidden px-7 py-12 sm:px-12 lg:px-14">
          <span className="absolute right-8 top-7 font-serif text-sm italic text-accent" aria-hidden="true">Nº 02</span>
          <p className="editorial-kicker">Từ bàn tay người làm hoa</p>
          <h2 id="story-heading" className="mt-4 font-serif text-4xl font-medium leading-[0.9] tracking-[-0.05em] text-ink sm:text-6xl">
            Mỗi bó hoa bắt đầu từ <span className="italic text-accent">người nhận.</span>
          </h2>
          <p className="mt-6 text-sm leading-7 text-muted">
            Chúng tôi chọn sắc độ, dáng hoa và cách gói theo dịp tặng. Thành phẩm được kiểm tra trước khi rời cửa hàng.
          </p>
          <Link href="/about" className="group mt-8 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-accent hover:text-accent-hover">
            Xem cách chúng tôi làm hoa <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <div className="relative mt-9 aspect-[16/9] w-[78%] self-end overflow-hidden rounded-[20px] border-4 border-canvas bg-surface-muted shadow-float sm:w-[66%] lg:absolute lg:bottom-8 lg:left-8 lg:mt-0 lg:w-[13rem]">
            <Image
              src="/images/flower-meanings/hydrangea.webp"
              alt="Cận cảnh hoa cẩm tú cầu"
              fill
              sizes="(max-width: 1024px) 54vw, 13rem"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
