import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TUser } from "../types/user.types";

interface AuthUserState {
  user: TUser | null;
  token: string | null;

  loginStore: (user: TUser, token: string) => void;
  logoutStore: () => void;
}

export const useAuthUserStore = create<AuthUserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      loginStore: (user, token) =>
        set(() => ({
          user,
          token,
        })),

      logoutStore: () =>
        set(() => ({
          user: null,
          token: null,
        })),
    }),
    {
      name: "user-manager-authUser-storage-3b241101-e2bb-4255-8caf-4136c566a962",
    }
  )
);
