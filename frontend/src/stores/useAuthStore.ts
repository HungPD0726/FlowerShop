import { create } from "zustand";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  hydrate: () => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  hasHydrated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    const rawUser = localStorage.getItem("user");
    let user: User | null = null;
    try {
      user = rawUser ? JSON.parse(rawUser) : null;
    } catch {
      localStorage.removeItem("user");
    }
    set({ user, isAuthenticated: Boolean(localStorage.getItem("accessToken")), hasHydrated: true });
  },
  setUser: (user) => {
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
    }
    set({ user, isAuthenticated: Boolean(user), hasHydrated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
    set({ user: null, isAuthenticated: false, hasHydrated: true });
  },
}));
