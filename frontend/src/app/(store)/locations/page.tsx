"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, Lightning, CheckCircle, XCircle } from "@phosphor-icons/react";

interface StoreBranch {
  id: string;
  city: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

const BRANCHES: StoreBranch[] = [
  {
    id: "hcm-1",
    city: "TP. Hồ Chí Minh",
    name: "Chạm Hoa Quận 1",
    address: "128 Nguyễn Trãi, Phường Bến Thành, Quận 1, TP.HCM",
    phone: "090 123 4567",
    hours: "07:00 - 21:30 (Mỗi ngày)",
  },
  {
    id: "hcm-2",
    city: "TP. Hồ Chí Minh",
    name: "Chạm Hoa Quận 3",
    address: "45 Võ Văn Tần, Phường 6, Quận 3, TP.HCM",
    phone: "090 765 4321",
    hours: "08:00 - 21:00 (Mỗi ngày)",
  },
  {
    id: "hn-1",
    city: "Hà Nội",
    name: "Chạm Hoa Hoàn Kiếm",
    address: "88 Lý Thường Kiệt, Quận Hoàn Kiếm, Hà Nội",
    phone: "091 234 5678",
    hours: "07:30 - 21:00 (Mỗi ngày)",
  },
];

const RUSH_DISTRICTS = [
  "quận 1", "quận 3", "quận 5", "quận 10", "quận bình thạnh", "quận phú nhuận", "quận gò vấp", "thành phố thủ đức",
  "hoàn kiếm", "ba đình", "đống đa", "hai bà trưng", "cầu giấy",
];

export default function LocationsPage() {
  const [districtInput, setDistrictInput] = useState("");
  const [checkResult, setCheckResult] = useState<{ checked: boolean; available: boolean; message: string }>({
    checked: false,
    available: false,
    message: "",
  });

  const handleCheckRushDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    const query = districtInput.trim().toLowerCase();
    if (!query) return;

    const isCovered = RUSH_DISTRICTS.some((d) => query.includes(d) || d.includes(query));

    if (isCovered) {
      setCheckResult({
        checked: true,
        available: true,
        message: `Nơi bạn chọn ("${districtInput}") nằm trong khu vực giao hoa hỏa tốc 2 giờ của Chạm Hoa.`,
      });
    } else {
      setCheckResult({
        checked: true,
        available: false,
        message: `Khu vực "${districtInput}" áp dụng dịch vụ Giao Hoa Tiêu Chuẩn (từ 4-6 giờ hoặc đặt trước theo ngày).`,
      });
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-accent">
              <MapPin size={15} />
              Hệ thống cửa hàng & Giao hàng
            </span>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
              Cửa Hàng & Tra Cứu Giao Hỏa Tốc 2H
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-muted">
              Ghé thăm trực tiếp các chi nhánh của Chạm Hoa hoặc tra cứu xem địa chỉ của bạn có nằm trong khu vực giao hỏa tốc 2 giờ.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-shell pb-16 sm:pb-24 space-y-12">
        {/* 2H Rush Delivery Checker Panel */}
        <div className="rounded-[24px] border border-accent/30 bg-accent-soft/30 p-6 sm:p-8 shadow-card">
          <div className="max-w-xl space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
              <Lightning weight="fill" size={13} /> Kiểm tra hỏa tốc
            </span>
            <h3 className="font-serif text-2xl font-bold text-ink">Tra Cứu Bán Kính Giao Hoa 2 Giờ</h3>
            <p className="text-xs text-muted">Nhập tên Quận/Huyện của bạn (VD: Quận 1, Bình Thạnh, Cầu Giấy...)</p>
          </div>

          <form onSubmit={handleCheckRushDelivery} className="mt-5 flex flex-col gap-3 sm:flex-row sm:max-w-lg">
            <input
              type="text"
              value={districtInput}
              onChange={(e) => setDistrictInput(e.target.value)}
              placeholder="Nhập Quận/Huyện của bạn..."
              className="flex-1 rounded-xl border border-line bg-surface px-4 py-3 text-sm text-ink outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95 transition-all"
            >
              Kiểm tra ngay
            </button>
          </form>

          {/* Result Alert */}
          {checkResult.checked && (
            <div
              className={`mt-4 flex items-start gap-3 rounded-2xl p-4 border text-xs font-bold ${
                checkResult.available
                  ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                  : "bg-amber-50 border-amber-200 text-amber-800"
              }`}
            >
              {checkResult.available ? (
                <CheckCircle size={20} className="shrink-0 text-emerald-600" />
              ) : (
                <XCircle size={20} className="shrink-0 text-amber-600" />
              )}
              <p className="leading-relaxed">{checkResult.message}</p>
            </div>
          )}
        </div>

        {/* Store Branches Grid */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-ink mb-6">Danh Sách Chi Nhánh Studio</h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {BRANCHES.map((b) => (
              <div key={b.id} className="flex flex-col justify-between rounded-[22px] border border-line/60 bg-surface p-6 shadow-card transition-shadow hover:shadow-float">
                <div>
                  <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[10px] font-bold text-accent">
                    {b.city}
                  </span>
                  <h4 className="mt-3 font-serif text-lg font-bold text-ink">{b.name}</h4>
                  <div className="mt-4 space-y-2 text-xs text-muted">
                    <p className="flex items-start gap-2">
                      <MapPin size={16} className="shrink-0 text-accent" /> {b.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone size={16} className="shrink-0 text-accent" /> {b.phone}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} className="shrink-0 text-accent" /> {b.hours}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-line/50 pt-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
                  >
                    Xem chỉ đường Google Maps ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
