import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { useAuthUserStore } from "../stores/auth-user.store";
import Navbar from "../components/navbar.component";
import Page404 from "../pages/404.page";

export interface MyRouterContext {
  queryClient: QueryClient;
}

function RootLayout() {
  const logoutStore = useAuthUserStore((s) => s.logoutStore);
  const user = useAuthUserStore((s) => s.user);

  return (
    <div>
      <Navbar user={user} logout={logoutStore} />
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <Page404/>,
});
