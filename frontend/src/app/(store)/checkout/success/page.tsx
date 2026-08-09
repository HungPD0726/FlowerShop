"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, House, Package } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/feedback-state";

export default function OrderSuccessPage() {
  return <Suspense fallback={<div className="page-shell py-20"><Skeleton className="mx-auto h-80 max-w-2xl" /></div>}><OrderSuccessContent /></Suspense>;
}

function OrderSuccessContent() {
  const orderCode = useSearchParams().get("code");
  return (
    <div className="page-shell py-16 text-center sm:py-24">
      <CheckCircle size={54} weight="fill" className="mx-auto text-success" />
      <p className="eyebrow mt-7">Cảm ơn bạn đã chọn Chạm Hoa</p>
      <h1 className="mx-auto mt-4 max-w-3xl font-serif text-5xl font-medium leading-[0.95] tracking-[-0.045em] text-ink sm:text-6xl">Đơn hoa đã được ghi nhận.</h1>
      {orderCode && <p className="mt-6 text-sm text-muted">Mã đơn hàng <strong className="font-mono text-accent">{orderCode}</strong></p>}
      <div className="mx-auto mt-9 max-w-xl rounded-[20px] border border-line bg-surface p-6 text-left text-sm leading-7 text-muted shadow-soft"><p>Cửa hàng sẽ xử lý theo thông tin người nhận, ngày giao và khung giờ bạn đã chọn.</p><p className="mt-3">Bạn có thể theo dõi trạng thái trong tài khoản hoặc liên hệ cửa hàng với mã đơn ở trên.</p></div>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Button asChild variant="outline" className="gap-2"><Link href="/account/orders"><Package /> Theo dõi đơn</Link></Button><Button asChild className="gap-2"><Link href="/"><House /> Về trang chủ</Link></Button></div>
    </div>
  );
}
