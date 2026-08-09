import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types";

interface CompareState {
  items: Product[];
  add: (product: Product) => boolean;
  remove: (productId: number) => void;
  has: (productId: number) => boolean;
  clear: () => void;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => {
        const current = get().items;
        if (current.some((p) => p.id === product.id)) return false;
        if (current.length >= 3) return false; // max 3 items
        set({ items: [...current, product] });
        return true;
      },
      remove: (productId) => set((s) => ({ items: s.items.filter((p) => p.id !== productId) })),
      has: (productId) => get().items.some((p) => p.id === productId),
      clear: () => set({ items: [] }),
    }),
    { name: "flower-shop-compare" }
  )
);
