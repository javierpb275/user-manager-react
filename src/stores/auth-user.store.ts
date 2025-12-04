import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TUser } from "../types/user.types";

interface AuthUserState {
  user: TUser | null;
  loginStore: (user: TUser) => void;
  logoutStore: () => void;
}

export const useAuthUserStore = create<AuthUserState>()(
  persist(
    (set) => ({
      user: null,
      loginStore: (user) =>
        set(() => ({
          user,
        })),
      logoutStore: () =>
        set(() => ({
          user: null,
        })),
    }),
    {
      name: "user-manager-authUser-storage",
    }
  )
);
