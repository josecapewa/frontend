import { create } from "zustand";

interface SessionStore {
  user: User | null;
  setUser: (user: User | null) => void;
  sessionExpired: boolean;
  setSessionExpired: (sessionExpired: boolean) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  removeSession: () => void;
}

export const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  token: null,
  sessionExpired: false,
  setSessionExpired: (sessionExpired) => set({ sessionExpired }),
  setToken: (token) => set({ token }),
  removeSession: () => set({ user: null, token: null }),
}));
