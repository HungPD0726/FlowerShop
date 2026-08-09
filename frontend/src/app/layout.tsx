import "./globals.css";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { ToastContainer } from "@/components/ui/toast";
import { brand } from "@/config/brand";

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
    default: `${brand.name} | Hoa tươi thiết kế theo từng dịp`,
    template: `%s | ${brand.name}`,
  },
  description: "Hoa tươi thiết kế thủ công, giao trong ngày tại TP.HCM và Hà Nội.",
  openGraph: {
    title: brand.name,
    description: brand.description,
    images: ["/images/campaign/hero-blush.png"],
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
