// src/routes/__root.tsx

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { QueryClient } from '@tanstack/react-query'
import { useAuthUserStore } from '../stores/auth-user.store'

export interface MyRouterContext {
  queryClient: QueryClient
}

// ⬇️ Mueve el componente fuera y dale un nombre en mayúscula
function RootLayout() {
  const logoutStore = useAuthUserStore((s) => s.logoutStore);
  const user = useAuthUserStore((s) => s.user);

  return (
    <div>
      <header style={{ display: "flex", gap: 10 }}>
        <Link to="/users">USERS</Link>
        {!user && <Link to="/login">LOGIN</Link>}
        {!user && <Link to="/register">REGISTER</Link>}
        {user && (
          <button onClick={logoutStore}>
            LOG OUT ({user.first_name})
          </button>
        )}
      </header>

      <main>
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  );
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  notFoundComponent: () => <h1>404 — Not Found</h1>,
});
