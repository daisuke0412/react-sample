import { create } from 'zustand';
import type { LoginUser } from '../types/login-user';

interface UserState {
  user: LoginUser | null;
  setUser: (user: LoginUser) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));