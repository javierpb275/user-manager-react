import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TAuthUser } from "../types/user.types";

interface AuthUserState {
  authUser?: TAuthUser;
  loginStore: (authUser: TAuthUser) => void;
  logoutStore: () => void;
}

export const useAuthUserStore = create<AuthUserState>()(
  persist(
    (set) => ({
      authUser: undefined,
      loginStore: (authUser) => set(() => ({ authUser })),
      logoutStore: () => set(() => ({ authUser: undefined })),
    }),
    {
      name: "user-manager-authUser-storage-3b241101-e2bb-4255-8caf-4136c566a962",
    } // localStorage key
  )
);
