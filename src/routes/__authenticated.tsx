// src/routes/__authenticated.tsx
import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";

export const Route = createFileRoute("/__authenticated")({
  beforeLoad: async ({ location }) => {
    const authUser = useAuthUserStore.getState().authUser;
    if (!authUser) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
