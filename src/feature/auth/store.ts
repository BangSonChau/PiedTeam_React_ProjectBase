import { create } from "zustand";
import type { AuthState, AuthAction } from "@/feature/auth/type"
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<AuthState & AuthAction>()(
  persist(
    (set) => ({
      accessToken: null,
      role: null,

      setToken: (accessToken, role) => set({ accessToken: accessToken, role: role }),
      clearToken: () => set({ accessToken: null, role: null })

    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )

)