import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarBlank, Clock, ArrowRight } from "@phosphor-icons/react/dist/ssr";

/* ── mock article database ── */
const ARTICLES_DB: Record<string, {
  title: string;
  category: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content: string[];
}> = {
  "cach-giu-hoa-tuoi-lau": {
    title: "7 Bí quyết giữ hoa tươi lâu tại nhà đến 7 ngày",
    category: "Mẹo hay",
    date: "28/07/2026",
    readTime: "5 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
    content: [
      "Hoa tươi luôn là món quà đầy ý nghĩa và là cách tuyệt vời để trang trí không gian sống. Tuy nhiên, nhiều người thường lo lắng rằng hoa sẽ héo nhanh chỉ sau vài ngày. Với 7 bí quyết dưới đây, bạn hoàn toàn có thể giữ hoa tươi lâu lên đến 7 ngày.",
      "1. Cắt chéo cuống hoa 45 độ: Trước khi cắm, hãy cắt cuống hoa nghiêng 45 độ để tăng diện tích tiếp xúc với nước. Điều này giúp hoa hút nước hiệu quả hơn và tươi lâu hơn đáng kể.",
      "2. Sử dụng nước ấm (không nóng): Hoa tươi hấp thu nước ấm nhanh hơn nước lạnh. Nhiệt độ lý tưởng khoảng 37-40°C, tương đương nhiệt độ cơ thể người.",
      "3. Thêm 1 thìa đường + vài giọt giấm trắng: Đường cung cấp dinh dưỡng cho hoa, trong khi giấm trắng giúp ngăn chặn vi khuẩn phát triển trong nước.",
      "4. Tỉa lá dưới mực nước: Lá ngâm trong nước sẽ phân hủy và tạo môi trường cho vi khuẩn. Hãy tỉa sạch tất cả lá bên dưới mực nước.",
      "5. Thay nước mỗi 2 ngày: Nước sạch là yếu tố quan trọng nhất. Mỗi lần thay nước, hãy rửa sạch bình và cắt lại cuống hoa khoảng 1cm.",
      "6. Tránh ánh nắng trực tiếp và hoa quả chín: Đặt hoa ở nơi thoáng mát, tránh ánh nắng trực tiếp. Hoa quả chín phát ra khí ethylene khiến hoa héo nhanh hơn.",
      "7. Đặt hoa trong phòng mát: Nhiệt độ lý tưởng để giữ hoa tươi là 18-22°C. Nếu phòng có điều hòa, hoa sẽ tươi lâu hơn rất nhiều.",
    ],
  },
  "y-nghia-mau-sac-hoa-hong": {
    title: "Ý nghĩa màu sắc hoa hồng trong tình yêu và cuộc sống",
    category: "Ý nghĩa hoa",
    date: "22/07/2026",
    readTime: "6 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
    content: [
      "Hoa hồng là loài hoa phổ biến nhất thế giới, và mỗi màu sắc đều ẩn chứa một ý nghĩa sâu sắc riêng. Hiểu rõ ngôn ngữ của hoa hồng sẽ giúp bạn truyền tải đúng thông điệp đến người nhận.",
      "Hoa hồng đỏ — Tình yêu nồng cháy: Là biểu tượng kinh điển của tình yêu mãnh liệt. Một bó hồng đỏ là cách tuyên bố tình cảm mạnh mẽ nhất, thích hợp cho Valentine, kỷ niệm ngày cưới.",
      "Hoa hồng trắng — Sự thuần khiết và kính trọng: Biểu trưng cho sự trong sáng, thanh cao và tôn trọng. Thường được dùng trong đám cưới hoặc để tặng người lớn tuổi.",
      "Hoa hồng hồng — Lòng biết ơn và ngưỡng mộ: Truyền tải thông điệp biết ơn, trân trọng và ngưỡng mộ. Là lựa chọn hoàn hảo để tặng mẹ, thầy cô hoặc bạn bè thân thiết.",
      "Hoa hồng vàng — Tình bạn và niềm vui: Tượng trưng cho tình bạn chân thành, niềm vui và sự ấm áp. Rất phù hợp để tặng bạn bè hoặc chúc mừng thành công.",
      "Hoa hồng cam — Sự nhiệt huyết và khao khát: Mang ý nghĩa của sự hăng hái, nhiệt tình và ham muốn. Thể hiện sự khởi đầu mới mẻ hoặc giai đoạn chuyển tiếp trong tình yêu.",
    ],
  },
  "chon-hoa-theo-dip": {
    title: "Hướng dẫn chọn hoa phù hợp cho mọi dịp lễ",
    category: "Hướng dẫn",
    date: "15/07/2026",
    readTime: "7 phút đọc",
    imageUrl: "/images/campaign/hero-blush.png",
    content: [
      "Việc chọn hoa phù hợp với từng dịp lễ không chỉ thể hiện sự tinh tế mà còn mang lại giá trị tinh thần lớn cho người nhận. Dưới đây là hướng dẫn chi tiết giúp bạn lựa chọn đúng loài hoa cho mọi khoảnh khắc quan trọng.",
      "Sinh nhật: Hoa hồng, hoa cẩm chướng hoặc hoa lily là những lựa chọn phổ biến. Màu sắc nên tươi sáng, mang lại cảm giác vui tươi và hạnh phúc.",
      "Kỷ niệm ngày cưới: Hoa hồng đỏ kết hợp hoa baby trắng tạo nên bó hoa lãng mạn, truyền tải thông điệp tình yêu vĩnh cửu.",
      "Khai trương: Kệ hoa hoặc lẵng hoa lớn với tông đỏ, cam, vàng tượng trưng cho sự thịnh vượng và may mắn.",
      "Chia buồn: Hoa ly trắng, hoa cúc trắng hoặc hoa lan trắng là lựa chọn trang trọng và phù hợp nhất cho các dịp chia buồn.",
      "Ngày Nhà giáo: Hoa hướng dương hoặc hoa cẩm chướng hồng thể hiện sự biết ơn và tôn trọng dành cho thầy cô.",
    ],
  },
};

const RELATED_ARTICLES = [
  { slug: "cach-giu-hoa-tuoi-lau", title: "7 Bí quyết giữ hoa tươi lâu tại nhà đến 7 ngày", category: "Mẹo hay" },
  { slug: "y-nghia-mau-sac-hoa-hong", title: "Ý nghĩa màu sắc hoa hồng trong tình yêu", category: "Ý nghĩa hoa" },
  { slug: "chon-hoa-theo-dip", title: "Hướng dẫn chọn hoa phù hợp cho mọi dịp lễ", category: "Hướng dẫn" },
];

export async function generateStaticParams() {
  return Object.keys(ARTICLES_DB).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = ARTICLES_DB[params.slug];
  return {
    title: article ? `${article.title} | Chạm Hoa` : "Bài viết | Chạm Hoa",
    description: article?.content[0]?.slice(0, 160) || "Bài viết về hoa tươi từ Chạm Hoa.",
  };
}

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES_DB[params.slug];

  if (!article) {
    return (
      <main className="page-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl font-bold text-ink">Bài viết không tồn tại</h1>
        <p className="mt-3 text-sm text-muted">Bài viết bạn tìm kiếm có thể đã bị gỡ hoặc đường dẫn không đúng.</p>
        <Link href="/articles" className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-xs font-bold text-white hover:bg-accent-hover">
          <ArrowLeft size={14} /> Quay lại danh sách
        </Link>
      </main>
    );
  }

  const related = RELATED_ARTICLES.filter((a) => a.slug !== params.slug).slice(0, 2);

  return (
    <main className="min-h-screen">
      {/* Hero Image */}
      <section className="relative h-[320px] overflow-hidden bg-cream sm:h-[420px]">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="page-shell">
            <span className="inline-block rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              {article.category}
            </span>
            <h1 className="mt-3 max-w-3xl font-serif text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>
            <div className="mt-3 flex items-center gap-4 text-xs text-white/80">
              <span className="flex items-center gap-1"><CalendarBlank size={13} /> {article.date}</span>
              <span className="flex items-center gap-1"><Clock size={13} /> {article.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="page-shell py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <Link href="/articles" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-accent-hover">
            <ArrowLeft size={14} /> Tất cả bài viết
          </Link>

          <div className="space-y-6">
            {article.content.map((paragraph, index) => (
              <p key={index} className={`text-base leading-[1.85] text-ink/85 ${index === 0 ? "text-lg font-medium leading-relaxed text-ink" : ""}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-14 border-t border-line/60 pt-10">
              <h3 className="font-serif text-xl font-bold text-ink">Bài viết liên quan</h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/articles/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-line/60 bg-surface p-5 shadow-card transition-shadow duration-500 hover:shadow-float"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">{r.category}</span>
                    <span className="mt-2 font-serif text-base font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-accent">
                      {r.title}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent">
                      Đọc tiếp <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
