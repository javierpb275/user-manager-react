// stores/users-local.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TUser } from "../types/user.types";

interface LocalUsersState {
  users: TUser[];

  addUser: (user: TUser) => void;
  updateUser: (id: number, data: Partial<TUser>) => void;
  findUser: (id: number) => TUser | undefined;
}

export const useLocalUsersStore = create<LocalUsersState>()(
  persist(
    (set, get) => ({
      users: [],

      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((u) =>
            u.id === id ? { ...u, ...data } : u
          ),
        })),

      findUser: (id) => get().users.find((u) => u.id === id),
    }),
    { name: "user-manager-local-users" }
  )
);
