import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "@/components/ui/toast";

const displayFont = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Lá & Hoa | Hoa tươi thiết kế theo từng dịp",
    template: "%s | Lá & Hoa",
  },
  description: "Hoa tươi thiết kế thủ công, giao trong ngày tại TP.HCM và Hà Nội.",
  openGraph: {
    title: "Lá & Hoa",
    description: "Hoa tươi thiết kế thủ công cho những lời muốn nói.",
    images: ["/images/campaign/hero-editorial.png"],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className={`${displayFont.variable} ${bodyFont.variable} antialiased`}>
        <a className="skip-link" href="#main-content">
          Bỏ qua điều hướng
        </a>
        <QueryProvider>
          {children}
          <ToastContainer />
        </QueryProvider>
      </body>
    </html>
  );
}
