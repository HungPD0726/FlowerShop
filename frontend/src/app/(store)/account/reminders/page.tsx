"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, Calendar, Plus, Trash, ArrowRight } from "@phosphor-icons/react";
import { useUIStore } from "@/stores/useUIStore";

interface Reminder {
  id: string;
  title: string;
  recipientName: string;
  relationship: string;
  date: string; // YYYY-MM-DD
  note: string;
}

const DEFAULT_REMINDERS: Reminder[] = [
  { id: "1", title: "Sinh nhật Người Yêu", recipientName: "Ngọc Anh", relationship: "Người yêu", date: "2026-08-15", note: "Thích hoa hồng phấn Ohara và hoa baby trắng." },
  { id: "2", title: "Kỷ niệm 3 năm ngày cưới", recipientName: "Phương Thảo", relationship: "Vợ", date: "2026-09-20", note: "Đặt lẵng hoa mẫu đơn sang trọng." },
];

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [relationship, setRelationship] = useState("Người yêu");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const { addToast } = useUIStore();

  useEffect(() => {
    const saved = localStorage.getItem("flower-shop-reminders");
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch {
        setReminders(DEFAULT_REMINDERS);
      }
    } else {
      setReminders(DEFAULT_REMINDERS);
    }
  }, []);

  const saveReminders = (newItems: Reminder[]) => {
    setReminders(newItems);
    localStorage.setItem("flower-shop-reminders", JSON.stringify(newItems));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return;
    const item: Reminder = {
      id: Date.now().toString(),
      title,
      recipientName,
      relationship,
      date,
      note,
    };
    const updated = [item, ...reminders];
    saveReminders(updated);
    addToast("success", `Đã lưu lời nhắc "${title}"!`);
    setShowForm(false);
    setTitle("");
    setRecipientName("");
    setDate("");
    setNote("");
  };

  const handleDelete = (id: string) => {
    const updated = reminders.filter((r) => r.id !== id);
    saveReminders(updated);
    addToast("info", "Đã xóa lời nhắc.");
  };

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative py-10 md:py-14">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,var(--accent-soft)_0%,transparent_50%)]" />
        <div className="page-shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-line/50 pb-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-soft px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
                <Bell className="h-3.5 w-3.5" />
                Quản lý kỷ niệm
              </span>
              <h1 className="font-serif text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                Nhắc Nhở Ngày Kỷ Niệm
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted">
                Không bao giờ quên các dịp đặc biệt của người thương — hệ thống sẽ nhắc bạn trước 3 ngày.
              </p>
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-xs font-bold text-white shadow-soft hover:bg-accent-hover active:scale-95 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Thêm ngày kỷ niệm</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="page-shell pb-16 sm:pb-24">
        {/* Add Reminder Form Modal / Panel */}
        {showForm && (
          <form onSubmit={handleAdd} className="mb-10 rounded-[24px] border border-accent/30 bg-accent-soft/30 p-6 shadow-card space-y-4">
            <h3 className="font-serif text-lg font-bold text-ink">Thêm Ngày Kỷ Niệm Mới</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">Tên dịp (VD: Sinh nhật Vợ)</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nhập tên dịp kỷ niệm..."
                  className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">Tên người nhận</label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="VD: Ngọc Anh..."
                  className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">Ngày kỷ niệm</label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted">Mối quan hệ</label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
                >
                  <option value="Người yêu">Người yêu</option>
                  <option value="Vợ/Chồng">Vợ / Chồng</option>
                  <option value="Mẹ/Bố">Mẹ / Bố</option>
                  <option value="Bạn bè">Bạn bè</option>
                  <option value="Đối tác">Đối tác</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-muted">Ghi chú loại hoa thích</label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="VD: Thích hoa hồng Ohara cam hồng..."
                className="mt-1 w-full rounded-xl border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none focus:border-accent"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="rounded-full border border-line px-5 py-2 text-xs font-bold text-muted hover:bg-cream"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="rounded-full bg-accent px-6 py-2 text-xs font-bold text-white shadow-soft hover:bg-accent-hover"
              >
                Lưu lời nhắc
              </button>
            </div>
          </form>
        )}

        {/* Reminders List */}
        {reminders.length === 0 ? (
          <div className="text-center py-16 bg-surface rounded-[24px] border border-line/60 p-8 shadow-card">
            <Bell className="mx-auto h-12 w-12 text-muted/50" />
            <h3 className="mt-4 font-serif text-lg font-bold text-ink">Chưa có ngày kỷ niệm nào</h3>
            <p className="mt-1 text-xs text-muted">Thêm các dịp đặc biệt để nhận thông báo và gợi ý hoa thích hợp.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {reminders.map((r) => (
              <div
                key={r.id}
                className="flex flex-col justify-between rounded-[22px] border border-line/60 bg-surface p-6 shadow-card transition-shadow hover:shadow-float"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-accent/20 bg-accent-soft px-3 py-1 text-[10px] font-bold text-accent">
                      {r.relationship}
                    </span>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="text-muted hover:text-danger p-1 transition-colors"
                      title="Xóa lời nhắc"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-bold text-ink">{r.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-accent flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" /> Ngày: {r.date} ({r.recipientName})
                  </p>
                  {r.note && (
                    <p className="mt-3 text-xs text-muted bg-cream/60 rounded-xl p-3 border border-line/40">
                      💡 {r.note}
                    </p>
                  )}
                </div>

                <div className="mt-5 border-t border-line/50 pt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-muted">Nhắc trước 3 ngày</span>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-bold text-white shadow-soft hover:bg-accent-hover"
                  >
                    Đặt hoa mừng <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
