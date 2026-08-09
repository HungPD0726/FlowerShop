import { create } from "zustand";
import { persist } from "zustand/middleware";

interface WishlistState {
  items: number[];
  toggle: (productId: number) => void;
  has: (productId: number) => boolean;
  count: () => number;
  clear: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) =>
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items.filter((id) => id !== productId)
            : [...state.items, productId],
        })),
      has: (productId) => get().items.includes(productId),
      count: () => get().items.length,
      clear: () => set({ items: [] }),
    }),
    { name: "flower-shop-wishlist" }
  )
);
