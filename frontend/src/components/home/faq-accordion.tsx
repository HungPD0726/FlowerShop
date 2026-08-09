"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/utils/format";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Chạm Hoa giao hoa trong bao lâu?",
    answer:
      "Chúng tôi hỗ trợ giao hoa hỏa tốc trong vòng 2 giờ đối với khu vực nội thành TP.HCM và Hà Nội. Với các tỉnh thành khác, thời gian giao hàng từ 1-2 ngày làm việc tùy khu vực.",
  },
  {
    question: "Hoa có bảo hành không? Hoa héo thì sao?",
    answer:
      "Chúng tôi cam kết bảo hành hoa tươi trong 3 ngày kể từ ngày giao. Nếu hoa bị hư hại hoặc không đúng mẫu, bạn chỉ cần gửi ảnh qua Zalo/Hotline, chúng tôi sẽ đổi bó hoa mới hoặc hoàn tiền 100%.",
  },
  {
    question: "Tôi có thể giấu tên người gửi trên thiệp không?",
    answer:
      "Hoàn toàn có thể! Khi đặt hàng, bạn chỉ cần bật tùy chọn 'Giấu tên người gửi' ở phần thiệp chúc mừng. Người nhận sẽ chỉ thấy lời nhắn mà không biết ai là người gửi.",
  },
  {
    question: "Tôi muốn thiết kế bó hoa theo ý riêng, có được không?",
    answer:
      "Chạm Hoa nhận thiết kế bó hoa theo yêu cầu riêng. Bạn có thể liên hệ qua Zalo hoặc trang Liên hệ, mô tả ý tưởng và chúng tôi sẽ tư vấn mẫu hoa phù hợp nhất.",
  },
  {
    question: "Phương thức thanh toán nào được hỗ trợ?",
    answer:
      "Chúng tôi hỗ trợ thanh toán COD (nhận hàng trả tiền), chuyển khoản ngân hàng, thẻ tín dụng/ghi nợ (Visa, MasterCard), và các ví điện tử như MoMo, ZaloPay, VNPay.",
  },
  {
    question: "Có dịch vụ đặt hoa định kỳ không?",
    answer:
      "Có! Chúng tôi cung cấp gói đặt hoa tươi định kỳ hàng tuần hoặc hàng tháng cho gia đình và văn phòng, được hưởng chiết khấu từ 10-15% so với giá lẻ.",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section-space page-shell">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* left – heading */}
        <div className="space-y-4">
          <span className="eyebrow">Hỏi đáp thường gặp</span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Tìm câu trả lời nhanh cho các thắc mắc phổ biến về dịch vụ hoa tươi, giao hàng và chính sách bảo hành của Chạm Hoa.
          </p>
        </div>

        {/* right – accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = index === openIndex;
            return (
              <div
                key={item.question}
                className={cn(
                  "rounded-2xl border transition-colors duration-300",
                  isOpen
                    ? "border-accent/25 bg-accent-soft/40"
                    : "border-line/60 bg-surface hover:border-line"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base font-semibold leading-snug text-ink sm:text-lg">
                    {item.question}
                  </span>
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                      isOpen ? "rotate-180 bg-accent text-white" : "bg-accent-soft text-accent"
                    )}
                  >
                    <CaretDown size={16} weight="bold" />
                  </span>
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-editorial",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
