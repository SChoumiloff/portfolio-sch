import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (value) => set({ isAuthenticated: value }),
      checkAuth: async () => {
        try {
          const res = await fetch('/api/auth/check', {
            credentials: 'include'
          });
          const isAuth = res.ok;
          set({ isAuthenticated: isAuth });
          return isAuth;
        } catch (error) {
          set({ isAuthenticated: false });
          return false;
        }
      }
    }),
    {
      name: 'auth-storage'
    }
  )
); 