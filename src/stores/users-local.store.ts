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
          users: [user, ...state.users],
        })),
      updateUser: (id, data) =>
        set((state) => {
          const exists = state.users.some((u) => u.id === id);
          if (exists) {
            return {
              users: state.users.map((u) =>
                u.id === id ? { ...u, ...data } : u
              ),
            };
          }
          const newUser: TUser = {
            id,
            email: (data.email as string) || "",
            first_name: (data.first_name as string) || "",
            last_name: (data.last_name as string) || "",
            avatar: (data.avatar as string) || "",
          };
          return { users: [...state.users, newUser] };
        }),
      findUser: (id) => get().users.find((u) => u.id === id),
    }),
    { name: "user-manager-local-users" }
  )
);
