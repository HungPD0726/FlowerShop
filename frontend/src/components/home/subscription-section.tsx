"use client";

import Link from "next/link";
import { Flower, CalendarCheck, ArrowRight } from "@phosphor-icons/react";

const PLANS = [
  {
    id: "weekly",
    name: "Hàng tuần",
    description: "Bó hoa tươi mới mỗi tuần, lý tưởng cho bàn ăn hoặc phòng khách luôn rực rỡ.",
    price: "350.000₫",
    frequency: "/tuần",
    discount: "Tiết kiệm 15%",
    popular: false,
  },
  {
    id: "biweekly",
    name: "2 tuần / lần",
    description: "Cân bằng hoàn hảo giữa hoa tươi mỗi ngày và ngân sách hợp lý.",
    price: "450.000₫",
    frequency: "/2 tuần",
    discount: "Tiết kiệm 12%",
    popular: true,
  },
  {
    id: "monthly",
    name: "Hàng tháng",
    description: "Mỗi tháng một bó hoa đặc biệt, bất ngờ và tinh tế cho không gian sống.",
    price: "650.000₫",
    frequency: "/tháng",
    discount: "Tiết kiệm 10%",
    popular: false,
  },
];

export function SubscriptionSection() {
  return (
    <section className="section-space page-shell">
      {/* heading */}
      <div className="mb-10 text-center">
        <span className="eyebrow">Dịch vụ đặc biệt</span>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
          Gói Hoa Tươi Định Kỳ
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Đăng ký nhận hoa tươi theo chu kỳ yêu thích — để không gian sống và làm việc của bạn luôn ngập tràn sắc hoa.
        </p>
      </div>

      {/* plan cards */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative flex flex-col rounded-[22px] border p-6 transition-shadow duration-500 hover:shadow-float ${
              plan.popular
                ? "border-accent bg-accent-soft/30 shadow-float"
                : "border-line/60 bg-surface shadow-card"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-soft">
                Phổ biến nhất
              </span>
            )}

            <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-accent-soft text-accent">
              {plan.id === "weekly" ? <Flower size={24} weight="duotone" /> : <CalendarCheck size={24} weight="duotone" />}
            </div>

            <h3 className="font-serif text-xl font-bold text-ink">{plan.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{plan.description}</p>

            <div className="mt-5">
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl font-bold text-ink">{plan.price}</span>
                <span className="text-xs text-muted">{plan.frequency}</span>
              </div>
              <span className="mt-1 inline-block rounded-md border border-accent/20 bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">
                {plan.discount}
              </span>
            </div>

            <Link
              href="/contact"
              className={`mt-5 flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] ${
                plan.popular
                  ? "bg-accent text-white shadow-soft hover:bg-accent-hover"
                  : "border border-accent/30 text-accent hover:bg-accent-soft"
              }`}
            >
              Đăng ký ngay <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
