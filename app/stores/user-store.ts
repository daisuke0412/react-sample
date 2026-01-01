import { create } from 'zustand';
import type { LoginUser } from '../types/login-user';

interface UserState {
  user: LoginUser | null;
  login: (user: LoginUser) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));