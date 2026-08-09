"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flower, Drop, Thermometer, Scissors, Sparkle, Clock, CheckCircle } from "@phosphor-icons/react";

interface FlowerGuide {
  id: string;
  name: string;
  scientificName: string;
  longevity: string;
  waterRatio: string;
  trimAngle: string;
  temp: string;
  description: string;
  tips: string[];
  imageUrl: string;
}

const GUIDES: FlowerGuide[] = [
  {
    id: "rose",
    name: "Hoa Hồng (Rose)",
    scientificName: "Rosa",
    longevity: "5 - 7 ngày",
    waterRatio: "1/2 bình nước ấm (38°C)",
    trimAngle: "Cắt vát 45° chìm dưới nước",
    temp: "18°C - 22°C (Phòng máy lạnh)",
    description: "Hoa hồng cần nhiều nước và môi trường thoáng mát. Luôn tỉa sạch toàn bộ lá dưới mực nước ngâm.",
    tips: [
      "Tỉa bớt các lá nằm dưới mực nước để tránh thối rữa và sinh vi khuẩn.",
      "Cắt cuống hoa nghiêng 45 độ mỗi 2 ngày để tăng diện tích tiếp xúc với nước.",
      "Thêm 1 thìa đường nhỏ + 2 giọt giấm trắng vào bình nước ngâm.",
    ],
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    id: "peony",
    name: "Hoa Mẫu Đơn (Peony)",
    scientificName: "Paeonia",
    longevity: "6 - 8 ngày",
    waterRatio: "2/3 bình nước mát",
    trimAngle: "Cắt vát 45° chéo 2cm",
    temp: "16°C - 20°C (Tránh gió quạt)",
    description: "Mẫu đơn là loài hoa kiêu sa, cánh nụ dày. Ngâm trong nước mát để hoa nở từ từ bền đẹp.",
    tips: [
      "Nếu hoa nụ chưa nở, ngâm cuống vào nước ấm khoảng 5 phút để kích thích cánh xòe nhẹ.",
      "Đặt hoa ở nơi kín gió, tránh ánh nắng mặt trời chiếu trực tiếp.",
      "Phun sương nhẹ lên cánh hoa vào mỗi buổi sáng sớm.",
    ],
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    id: "tulip",
    name: "Hoa Tulip Hà Lan",
    scientificName: "Tulipa",
    longevity: "4 - 6 ngày",
    waterRatio: "1/3 bình nước đá lạnh",
    trimAngle: "Cắt bằng vuông góc",
    temp: "15°C - 18°C (Thích môi trường lạnh)",
    description: "Tulip vẫn tiếp tục phát triển chiều dài sau khi cắt. Dùng ít nước lạnh để giữ hoa đứng dáng.",
    tips: [
      "Tulip vươn dài về phía ánh sáng, hãy xoay bình hoa hàng ngày để hoa đứng thẳng.",
      "Chỉ đổ khoảng 5-7cm nước lạnh vào đáy bình, có thể thả vài viên đá lạnh.",
      "Đâm nhẹ một lỗ nhỏ bằng kim ngay dưới đài hoa để ngăn hoa gục đầu.",
    ],
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    id: "sunflower",
    name: "Hoa Hướng Dương",
    scientificName: "Helianthus annuus",
    longevity: "7 - 10 ngày",
    waterRatio: "1/2 bình nước sạch",
    trimAngle: "Cắt vát 45° thân to",
    temp: "20°C - 25°C (Ánh sáng tự nhiên)",
    description: "Hướng dương có cành to khỏe, hút nhiều nước và có độ bền cao ngập tràn năng lượng.",
    tips: [
      "Thay nước ngâm hàng ngày vì thân hướng dương tiết ra nhiều chất nhầy.",
      "Rửa sạch phần chân cành bị nhớt mỗi lần thay nước.",
      "Cắt bỏ 1cm chân cành mỗi lần thay nước để giữ đường ống hút nước thông suốt.",
    ],
    imageUrl: "/images/campaign/hero-blush.png",
  },
];

export default function FlowerCarePage() {
  const [selectedGuide, setSelectedGuide] = useState<FlowerGuide>(GUIDES[0]);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <Sparkle weight="fill" size={14} />
              Cẩm nang hoa tươi
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Hướng Dẫn & Tính Tỉ Lệ Chăm Sóc Hoa
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Chọn loài hoa tươi trong bình của bạn để nhận ngay công thức chăm sóc chi tiết giúp hoa nở rực rỡ và bền đẹp đến 10 ngày.
            </p>
          </div>
        </div>
      </section>

      {/* Main Guide Section */}
      <section className="page-shell pb-16 sm:pb-24">
        {/* Flower Tabs */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line/60 pb-6">
          {GUIDES.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGuide(g)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                selectedGuide.id === g.id
                  ? "bg-accent text-white shadow-soft"
                  : "border border-line/70 bg-surface text-ink hover:border-accent/40"
              }`}
            >
              <Flower size={16} weight={selectedGuide.id === g.id ? "fill" : "regular"} />
              <span>{g.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Guide Details */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* Card left: Image + quick stats */}
          <div className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-line/60 bg-cream shadow-card">
              <Image src={selectedGuide.imageUrl} alt={selectedGuide.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-accent-soft">{selectedGuide.scientificName}</span>
                <h3 className="font-serif text-2xl font-bold">{selectedGuide.name}</h3>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-card">
                <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                  <Clock size={16} /> Độ bền tươi
                </span>
                <p className="mt-1 font-serif text-xl font-bold text-ink">{selectedGuide.longevity}</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-card">
                <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                  <Thermometer size={16} /> Nhiệt độ phòng
                </span>
                <p className="mt-1 font-serif text-base font-bold text-ink">{selectedGuide.temp}</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-card">
                <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                  <Drop size={16} /> Mực nước ngâm
                </span>
                <p className="mt-1 text-xs font-bold text-ink leading-snug">{selectedGuide.waterRatio}</p>
              </div>
              <div className="rounded-2xl border border-line/60 bg-surface p-4 shadow-card">
                <span className="flex items-center gap-1.5 text-xs font-bold text-accent">
                  <Scissors size={16} /> Vết cắt cành
                </span>
                <p className="mt-1 text-xs font-bold text-ink leading-snug">{selectedGuide.trimAngle}</p>
              </div>
            </div>
          </div>

          {/* Right: Detailed Tips & Formula */}
          <div className="space-y-6 rounded-[24px] border border-line/80 bg-surface p-6 shadow-card sm:p-8">
            <div>
              <span className="eyebrow">Bí quyết dưỡng hoa</span>
              <h3 className="mt-1 font-serif text-2xl font-bold text-ink">Quy Trình Chăm Sóc Đạt Chuẩn</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{selectedGuide.description}</p>
            </div>

            <div className="space-y-3 border-t border-line/50 pt-5">
              <h4 className="font-serif text-base font-bold text-ink">Các Bước Thực Hiện:</h4>
              {selectedGuide.tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 rounded-xl bg-accent-soft/30 p-3.5 border border-accent/15">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-white text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-xs font-medium leading-relaxed text-ink/90">{tip}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-cream/70 border border-line/50 p-4 text-xs text-muted leading-relaxed">
              💡 <strong>Mẹo nhỏ từ Florist:</strong> Cắt cuống hoa chìm dưới mực nước sẽ ngăn bọt khí đi vào làm nghẽn mạch dẫn nước của cành hoa.
            </div>

            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 text-xs font-bold text-white shadow-soft transition-all hover:bg-accent-hover active:scale-95"
            >
              <Flower size={16} weight="fill" /> Chọn Ngay Bó Hoa Tươi Mới
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
