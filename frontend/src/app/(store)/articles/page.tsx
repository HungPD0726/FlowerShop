import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarBlank, Clock } from "@phosphor-icons/react/dist/ssr";

export const metadata = {
  title: "Bài viết & Mẹo chăm sóc hoa | Chạm Hoa",
  description: "Khám phá các bài viết về ý nghĩa hoa, mẹo giữ hoa tươi lâu và hướng dẫn chọn hoa theo dịp từ Chạm Hoa.",
};

const ARTICLES = [
  {
    slug: "cach-giu-hoa-tuoi-lau",
    title: "7 Bí quyết giữ hoa tươi lâu tại nhà đến 7 ngày",
    excerpt: "Những mẹo đơn giản nhưng hiệu quả giúp bó hoa của bạn luôn rực rỡ và tươi tắn trong nhiều ngày.",
    category: "Mẹo hay",
    date: "28/07/2026",
    readTime: "5 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    slug: "y-nghia-mau-sac-hoa-hong",
    title: "Ý nghĩa màu sắc hoa hồng trong tình yêu và cuộc sống",
    excerpt: "Mỗi màu hoa hồng mang một thông điệp riêng. Hãy cùng tìm hiểu để chọn đúng bó hoa truyền tải tâm ý.",
    category: "Ý nghĩa hoa",
    date: "22/07/2026",
    readTime: "6 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    slug: "chon-hoa-theo-dip",
    title: "Hướng dẫn chọn hoa phù hợp cho mọi dịp lễ",
    excerpt: "Từ sinh nhật, kỷ niệm, khai trương đến chia buồn — mỗi dịp cần một loài hoa phù hợp.",
    category: "Hướng dẫn",
    date: "15/07/2026",
    readTime: "7 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    slug: "hoa-phong-thuy-menh",
    title: "Chọn hoa theo phong thủy: Hoa nào hợp với mệnh bạn?",
    excerpt: "Khám phá cách chọn hoa đúng mệnh để mang lại tài lộc, sức khỏe và may mắn cho gia chủ.",
    category: "Phong thủy",
    date: "10/07/2026",
    readTime: "8 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    slug: "xu-huong-hoa-cuoi-2026",
    title: "Xu hướng hoa cưới 2026: Những mẫu hoa được yêu thích nhất",
    excerpt: "Tổng hợp các phong cách hoa cưới đang thịnh hành trong năm 2026 từ rustic đến minimalist.",
    category: "Xu hướng",
    date: "05/07/2026",
    readTime: "6 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
  {
    slug: "cach-trong-hoa-ban-cong",
    title: "Trồng hoa ban công chung cư: Những loài dễ chăm nhất",
    excerpt: "Không cần vườn rộng, ban công nhỏ cũng có thể trở thành khu vườn hoa xinh xắn quanh năm.",
    category: "Mẹo hay",
    date: "01/07/2026",
    readTime: "5 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
  },
];

export default function ArticlesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="max-w-2xl space-y-4">
            <span className="eyebrow">Blog & Cẩm nang</span>
            <h1 className="editorial-title">
              Mẹo Hay &<br />Cảm Hứng Hoa
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-muted">
              Khám phá thế giới hoa tươi qua các bài viết chuyên sâu — từ bí quyết chăm sóc, ý nghĩa các loài hoa, đến xu hướng hoa cưới mới nhất.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="page-shell pb-16 sm:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.map((article) => (
            <article
              key={article.slug}
              className="group flex flex-col overflow-hidden rounded-[22px] border border-line/60 bg-surface shadow-card transition-shadow duration-500 hover:shadow-float"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-cream">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-surface/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="flex items-center gap-4 text-[11px] text-muted">
                  <span className="flex items-center gap-1"><CalendarBlank size={12} /> {article.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                </div>
                <h2 className="mt-3 line-clamp-2 font-serif text-lg font-bold leading-tight text-ink transition-colors duration-300 group-hover:text-accent">
                  {article.title}
                </h2>
                <p className="mt-2 flex-1 line-clamp-2 text-sm leading-relaxed text-muted">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-accent transition-colors duration-300 hover:text-accent-hover"
                >
                  Đọc tiếp <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
