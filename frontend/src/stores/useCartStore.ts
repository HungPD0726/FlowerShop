import { create } from "zustand";
import { Cart, CartItem } from "@/types";

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  setCart: (cart: Cart | null) => void;
  setIsOpen: (isOpen: boolean) => void;
  toggleOpen: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isOpen: false,
  setCart: (cart) => set({ cart }),
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));
