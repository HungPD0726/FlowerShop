"use client";

import { Star } from "@phosphor-icons/react";

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  productName: string;
  verified: boolean;
}

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Ngọc Anh",
    avatar: "NA",
    rating: 5,
    date: "2 ngày trước",
    content: "Hoa rất tươi và bó rất đẹp! Giao hàng nhanh, đúng giờ. Người nhận rất thích, chắc chắn sẽ đặt lại.",
    productName: "Bó Hồng Pastel Phấn",
    verified: true,
  },
  {
    id: 2,
    author: "Minh Tuấn",
    avatar: "MT",
    rating: 5,
    date: "5 ngày trước",
    content: "Lần đầu đặt hoa online và rất bất ngờ với chất lượng. Hoa giữ được 5 ngày vẫn tươi, màu sắc rực rỡ.",
    productName: "Lẵng Hoa Mẫu Đơn Trắng",
    verified: true,
  },
  {
    id: 3,
    author: "Hương Giang",
    avatar: "HG",
    rating: 4,
    date: "1 tuần trước",
    content: "Hoa cẩm chướng hồng rất xinh, gói quà cẩn thận. Dịch vụ rất chuyên nghiệp và tận tâm.",
    productName: "Giỏ Hoa Cẩm Chướng Hồng",
    verified: true,
  },
  {
    id: 4,
    author: "Phương Linh",
    avatar: "PL",
    rating: 5,
    date: "2 tuần trước",
    content: "Bạn bè tặng sinh nhật bó hoa hướng dương, mình rất thích! Hoa to, đẹp, đóng gói sang trọng.",
    productName: "Bó Hoa Hướng Dương",
    verified: false,
  },
  {
    id: 5,
    author: "Đức Huy",
    avatar: "ĐH",
    rating: 5,
    date: "3 tuần trước",
    content: "Giao hoa đúng Valentine lúc 7h sáng, bạn gái rất bất ngờ và hạnh phúc. Cảm ơn Chạm Hoa rất nhiều!",
    productName: "Bó Hồng Đỏ Classic",
    verified: true,
  },
  {
    id: 6,
    author: "Thu Hà",
    avatar: "TH",
    rating: 5,
    date: "1 tháng trước",
    content: "Đặt hoa khai trương cho công ty, bên shop tư vấn nhiệt tình. Hoa đẹp, đúng phong cách yêu cầu.",
    productName: "Kệ Hoa Khai Trương",
    verified: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} weight={i < rating ? "fill" : "regular"} className={i < rating ? "text-amber-500" : "text-line"} />
      ))}
    </div>
  );
}

export function ReviewSection() {
  return (
    <section className="section-space page-shell">
      {/* heading */}
      <div className="mb-10 text-center">
        <span className="eyebrow">Cảm nhận khách hàng</span>
        <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl lg:text-[2.8rem]">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          Những cảm nhận từ khách hàng đã chọn Chạm Hoa.
        </p>
      </div>

      {/* review grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_REVIEWS.map((review) => (
          <article
            key={review.id}
            className="group flex flex-col rounded-[22px] border border-line/60 bg-surface p-6 shadow-card transition-shadow duration-500 hover:shadow-float"
          >
            {/* top: avatar + name */}
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent-soft font-serif text-sm font-bold text-accent">
                {review.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-bold text-ink">{review.author}</span>
                  {review.verified && (
                    <span className="shrink-0 rounded-md border border-accent/20 bg-accent-soft px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent">
                      Đã mua
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted">{review.date}</span>
              </div>
            </div>

            {/* rating */}
            <div className="mt-3">
              <StarRating rating={review.rating} />
            </div>

            {/* body */}
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/85">
              &ldquo;{review.content}&rdquo;
            </p>

            {/* product tag */}
            <div className="mt-4 border-t border-line/50 pt-3">
              <span className="text-[11px] font-semibold text-muted">
                Sản phẩm: <span className="text-accent">{review.productName}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
