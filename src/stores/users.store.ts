import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TUser } from "../types/user.types";

interface UsersState {
  localUsers: TUser[];
  addUser: (user: TUser) => void;
  updateUser: (user: TUser) => void;
}

export const useUsersStore = create<UsersState>()(
  persist(
    (set, get) => ({
      localUsers: [],
      addUser: (user) => set({ localUsers: [...get().localUsers, user] }),
      updateUser: (user) =>
        set({
          localUsers: get().localUsers.map((u) => (u.id === user.id ? user : u)),
        }),
    }),
    { name: "user-manager-local-users" }
  )
);
