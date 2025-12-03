import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useAuthUserStore } from "../stores/auth-user.store";

export const Route = createFileRoute("/__authenticated")({
  beforeLoad: async ({ location }) => {
    const authUser = useAuthUserStore.getState().user;
    if (!authUser) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
